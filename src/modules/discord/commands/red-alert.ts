import { addHours } from "date-fns";
import {
  ActionRowBuilder,
  AttachmentBuilder,
  AutocompleteInteraction,
  ButtonBuilder,
  ButtonInteraction,
  ButtonStyle,
  ChannelSelectMenuInteraction,
  ChatInputCommandInteraction,
  InteractionContextType,
  MentionableSelectMenuInteraction,
  MessageFlags,
  PermissionFlagsBits,
  RoleSelectMenuInteraction,
  SlashCommandBuilder,
  StringSelectMenuInteraction,
  UserSelectMenuInteraction,
} from "discord.js";
import { existsSync as fsExistsSync } from "fs";
import { kebabCase as _kebabCase } from "lodash";
import { CHANNEL_REDALERT_COOLDOWN, FALSE_ALARM_REQUIRED_COUNT } from "../../../constants/constants";
import { STARS } from "../../../constants/stars.constants";
import { Log } from "../../logging";
import { IRedAlertType } from "../../models/red-alert.model";
import { Discord } from "../discord";

export default {
  data: new SlashCommandBuilder()
    .setName("redalert")
    .setDescription("Sends a Red Alert message to the channel.")
    .setContexts(InteractionContextType.Guild)
    .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages)
    .addStringOption((stringOption) =>
      stringOption
        .setName("star")
        .setDescription("Select Star for Red Alert")
        .setRequired(true)
        .setChoices(
          Object.entries(STARS)
            .filter((s) => s[1].redAlerts)
            .map((s) => ({ name: s[1].name, value: s[0] }))
        )
    )
    .addStringOption((stringOption) =>
      stringOption.setName("type").setDescription("Select the type of Red Alert").setRequired(true).setAutocomplete(true)
    )
    .addStringOption((stringOption) =>
      stringOption.setName("variant").setDescription("Select the variant for this Red Alert").setRequired(false).setAutocomplete(true)
    ),
  execute: {
    async execute(interaction: ChatInputCommandInteraction) {
      if (Discord.inBL(interaction.user.id)) {
        await interaction.deferReply().catch();
        interaction.deleteReply().catch();
        return;
      }
      const type = interaction.options.getString("type");
      const variant = interaction.options.getString("variant");
      const currentTime = new Date().valueOf();
      if (!type) {
        await interaction.reply({ content: "You must pick an option.", flags: MessageFlags.Ephemeral }).catch(Log.error);
      } else if (
        Discord.channelRedAlertCooldown[interaction.channelId] &&
        Discord.channelRedAlertCooldown[interaction.channelId] + CHANNEL_REDALERT_COOLDOWN > currentTime
      ) {
        const cooldownRemaining = CHANNEL_REDALERT_COOLDOWN / 1000;
        Log.debug(`Red Alert called, but it's in cooldown for ${cooldownRemaining} seconds`);
        await interaction
          .reply({
            content: `Red Alert in cooldown, please wait ${cooldownRemaining} seconds...`,
            flags: MessageFlags.Ephemeral,
          })
          .catch(Log.error);
      } else {
        Discord.channelRedAlertCooldown[interaction.channelId] = new Date().valueOf();
        const star = interaction.options.getString("star");
        const starName = STARS[star].nameRole || STARS[star].name;
        // Finds a pingable role with the pattern @world-star
        let role = interaction.guild.roles.cache.find(
          (r) =>
            r.name.toLowerCase().replaceAll(/\s/g, "") === `${interaction.channel.name}-${starName}`.toLowerCase().replaceAll(/\s/g, "") &&
            r.mentionable
        );
        if (!role) {
          // In case there is no pingable @world-star role
          role = interaction.guild.roles.cache.find(
            (r) =>
              r.name.toLowerCase().replaceAll(/\s/g, "") === interaction.channel.name.toLowerCase().replaceAll(/\s/g, "") && r.mentionable
          );
        }

        const RED_ALERTS = Object.entries(STARS)
          .filter((s) => s[1].redAlerts)
          .map((s) => s[1].redAlerts)
          .reduce((pV, cV) => pV.concat(cV))
          .filter((a) => a);
        const redAlertType = RED_ALERTS.find((ra) => ra.name === type);
        const nextTimeframeInit = Math.floor(addHours(currentTime, 3).valueOf() / 1000);
        const nextTimeframeEnd = Math.floor(addHours(currentTime, 6).valueOf() / 1000);
        const redAlertMessage = `${role ? `<@&${role.id}> ` : ""}Red Alert incoming - ${starName} ${redAlertType.emoji} ${
          redAlertType.name
        } | Next estimated window: <t:${nextTimeframeInit}:t>-<t:${nextTimeframeEnd}:t>`;
        const replyPayload = {
          content: redAlertMessage,
          files: [],
          components: [addFalseAlarmButton()],
        };

        const chosenVariant = redAlertType.variants?.find((v) => v.name === variant);
        const imagePath = chosenVariant ? chosenVariant.image : redAlertType.image;
        if (fsExistsSync(imagePath)) {
          const image = new AttachmentBuilder(imagePath);
          replyPayload.files.push(image);
        }

        Log.log(`Red Alert | Role:${role?.name} | Star:${STARS[star].name} | Type:${redAlertType?.name} | Variant:${chosenVariant?.name}`);
        const interactionReply = await interaction.reply(replyPayload).catch(Log.error);
        if (!interactionReply) return;
        let falseAlarmRequests: Array<string> = [];
        const falseAlarmTimeout = 5; // In minutes
        interactionReply
          .createMessageComponentCollector({
            time: falseAlarmTimeout * 60 * 1000 + 1000,
          })
          .on("collect", async (c) => {
            if (c.customId === "false_alarm") {
              if (c.user.id === interaction.user.id) {
                await falseAlarm(c);
              } else if (!falseAlarmRequests.includes(c.user.id)) {
                falseAlarmRequests.push(c.user.id);
                if (falseAlarmRequests.length >= FALSE_ALARM_REQUIRED_COUNT) {
                  await falseAlarm(c);
                } else {
                  await setFalseAlarmCounter(c, falseAlarmRequests.length);
                }
              } else if (falseAlarmRequests.includes(c.user.id)) {
                falseAlarmRequests = falseAlarmRequests.filter((u) => u !== c.user.id);
                await setFalseAlarmCounter(c, falseAlarmRequests.length);
              }
            }
          });
        setTimeout(() => {
          interaction.editReply({ components: [] }).catch(() => Log.error("ERROR: Red Alert-RemoveFalseAlarmButton"));
        }, falseAlarmTimeout * 60 * 1000);

        if (!chosenVariant && redAlertType.variants?.length > 1) {
          const interactionReplyVariants = await interaction
            .followUp({
              content: "Please pick a variant, if you know it...",
              components: addRedAlertButtons(redAlertType),
              flags: MessageFlags.Ephemeral,
            })
            .catch(Log.error);
          if (!interactionReplyVariants) return;
          interactionReplyVariants.createMessageComponentCollector({}).on("collect", async (c) => {
            const variant = redAlertType.variants?.find((v) => _kebabCase(v.name) === c.customId);
            if (variant) {
              if (c.user.id === interaction.user.id) {
                Log.log(
                  `Red Alert-Pick Variant | Role:${role?.name} | Star:${STARS[star].name}  | Type:${redAlertType?.name} | Variant:${variant?.name}`
                );
                await setVariant(c, interaction, redAlertType);
                c.update({
                  content: `Thank you! Switching to ${redAlertType.name} - ${variant.name}.`,
                }).catch(Log.error);
                setTimeout(() => {
                  c.deleteReply().catch((err) => Log.error("ERROR: Red Alert-Variant-DeleteReply", err, interaction, c));
                }, 5 * 60 * 1000);
              }
            }
          });
        }
      }
    },
  },
  autocomplete: {
    async autocomplete(interaction: AutocompleteInteraction) {
      if (interaction.isAutocomplete()) {
        if (interaction.options.get("variant")?.focused && interaction.options.get("type")?.value) {
          const redAlertType = interaction.options.getString("type");
          const RED_ALERTS = Object.entries(STARS)
            .filter((s) => s[1].redAlerts)
            .map((s) => s[1].redAlerts)
            .reduce((pV, cV) => pV.concat(cV))
            .filter((a) => a);
          const variants = RED_ALERTS.find((rat) => rat.name === redAlertType)?.variants;
          if (variants && variants.length > 1) {
            const variantAutoCompleteOptions = variants.map((v) => ({ name: v.name, value: v.name }));
            await interaction.respond(variantAutoCompleteOptions).catch(Log.error);
          } else {
            await interaction.respond([{ name: "No variants information available", value: "" }]).catch(Log.error);
          }
        } else if (interaction.options.get("type")?.focused && interaction.options.get("star")?.value) {
          const star = interaction.options.getString("star");
          const redAlertTypesOnStar = STARS[star].redAlerts;
          const typesAutoCompleteOptions = redAlertTypesOnStar.map((v) => ({ name: v.name, value: v.name }));
          await interaction.respond(typesAutoCompleteOptions).catch(Log.error);
        }
      }
    },
  },
};

function addRedAlertButtons(redAlertType: IRedAlertType): ActionRowBuilder<ButtonBuilder>[] {
  const buttonRows = [];

  if (redAlertType?.variants && redAlertType.variants.length > 1) {
    const variantButtons = new ActionRowBuilder<ButtonBuilder>();
    for (const element of redAlertType.variants) {
      variantButtons.addComponents(addVariantButtons(element.name));
    }
    buttonRows.push(variantButtons);
  }

  return buttonRows;
}

function addVariantButtons(variantName: string) {
  return new ButtonBuilder()
    .setCustomId(`${_kebabCase(variantName)}`)
    .setLabel(variantName)
    .setStyle(ButtonStyle.Primary);
}
function addFalseAlarmButton(counter = 0) {
  return new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setCustomId("false_alarm")
      .setLabel(`Report False Alarm${getCounter(counter)}`)
      .setStyle(ButtonStyle.Secondary)
  );
}

function getCounter(counter: number) {
  if (counter) {
    return ` (${counter}/${FALSE_ALARM_REQUIRED_COUNT})`;
  }
  return ``;
}

async function setVariant(
  c:
    | ButtonInteraction
    | StringSelectMenuInteraction
    | UserSelectMenuInteraction
    | RoleSelectMenuInteraction
    | MentionableSelectMenuInteraction
    | ChannelSelectMenuInteraction,
  interaction: ChatInputCommandInteraction,
  redAlertType: IRedAlertType
) {
  if (interaction.id) {
    const variant = redAlertType.variants.find((v) => _kebabCase(v.name) === c.customId);
    const image = new AttachmentBuilder(variant.image);
    await interaction.editReply({ files: [image] }).catch((err) => Log.error("ERROR: Red Alert-FalseAlarm", err, interaction));
  }
}

async function falseAlarm(
  c:
    | ButtonInteraction
    | StringSelectMenuInteraction
    | UserSelectMenuInteraction
    | RoleSelectMenuInteraction
    | MentionableSelectMenuInteraction
    | ChannelSelectMenuInteraction
) {
  await c.update({ content: "**IT WAS A FALSE ALARM!!!**", components: [], files: [] }).catch(Log.error);
  setTimeout(async () => {
    return await c.deleteReply().catch((err) => Log.error("ERROR: Red Alert-FalseAlarm", err, c));
  }, 10000);
}

async function setFalseAlarmCounter(
  c:
    | ButtonInteraction
    | StringSelectMenuInteraction
    | UserSelectMenuInteraction
    | RoleSelectMenuInteraction
    | MentionableSelectMenuInteraction
    | ChannelSelectMenuInteraction,
  counter: number
) {
  await c.update({ components: [addFalseAlarmButton(counter)] }).catch((err) => Log.error("ERROR: Red Alert-FalseAlarmCounter", err, c));
}

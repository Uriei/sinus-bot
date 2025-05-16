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
import { kebabCase as _kebabCase } from "lodash";
import { CHANNEL_REDALERT_COOLDOWN, FALSE_ALARM_REQUIRED_COUNT, RED_ALERT_TYPES } from "../../../constants";
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
        .setName("type")
        .setDescription("Select the type of Red Alert")
        .setRequired(true)
        .setChoices(RED_ALERT_TYPES.map((a) => ({ name: a.name, value: a.name })))
    )
    .addStringOption((stringOption) =>
      stringOption.setName("variant").setDescription("Select the variant for this Red Alert").setRequired(false).setAutocomplete(true)
    ),
  execute: {
    async execute(interaction: ChatInputCommandInteraction) {
      const type = interaction.options.getString("type");
      const variant = interaction.options.getString("variant");
      const currentTime = new Date().valueOf();
      if (!type) {
        await interaction.reply({ content: "You must pick an option.", flags: MessageFlags.Ephemeral });
      } else if (
        Discord.channelRedAlertCooldown[interaction.channelId] &&
        Discord.channelRedAlertCooldown[interaction.channelId] + CHANNEL_REDALERT_COOLDOWN > currentTime
      ) {
        await interaction.reply({
          content: `Red Alert in cooldown, please wait ${CHANNEL_REDALERT_COOLDOWN / 1000} seconds...`,
          flags: MessageFlags.Ephemeral,
        });
      } else {
        Discord.channelRedAlertCooldown[interaction.channelId] = new Date().valueOf();
        const role = interaction.guild.roles.cache.find(
          (r) => r.name.toLowerCase() === interaction.channel.name.toLowerCase() && r.mentionable
        );

        const redAlertType = RED_ALERT_TYPES.find((ra) => ra.name === type);
        const nextTimeframeInit = Math.floor(addHours(currentTime, 3).valueOf() / 1000);
        const nextTimeframeEnd = Math.floor(addHours(currentTime, 6).valueOf() / 1000);
        const redAlertMessage = `${role ? `<@&${role.id}> ` : ""}Red Alert incoming - ${redAlertType.emoji} ${
          redAlertType.name
        } | Next estimated window: <t:${nextTimeframeInit}:t>-<t:${nextTimeframeEnd}:t>`;
        const chosenVariant = redAlertType.variants?.find((v) => v.name === variant);
        const image = new AttachmentBuilder(chosenVariant ? chosenVariant.image : redAlertType.image);

        const interactionReply = await interaction.reply({
          content: redAlertMessage,
          files: [image],
          components: [addFalseAlarmButton()],
        });

        let falseAlarmRequests: Array<string> = [];
        interactionReply
          .createMessageComponentCollector({
            time: 5 * 60 * 1000,
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
          })
          .on("end", () => {
            if (interaction.id) {
              try {
                interaction.editReply({ components: [] });
              } catch (error) {
                console.error("ERROR: Red Alert-OnEnd", error, interaction);
              }
            }
          });

        if (!chosenVariant && redAlertType.variants?.length > 1) {
          const interactionReplyVariants = await interaction.followUp({
            content: "Please pick a variant, if you know it...",
            components: addRedAlertButtons(redAlertType),
            flags: MessageFlags.Ephemeral,
          });
          interactionReplyVariants.createMessageComponentCollector({}).on("collect", async (c) => {
            const variant = redAlertType.variants?.find((v) => _kebabCase(v.name) === c.customId);
            if (variant) {
              if (c.user.id === interaction.user.id) {
                await setVariant(c, interaction, redAlertType);
                c.update({
                  content: `Thank you! Switching to ${redAlertType.name} - ${variant.name}.`,
                });
                setTimeout(() => {
                  try {
                    c.deleteReply();
                  } catch (error) {
                    console.error("ERROR: Red Alert-Variant-DeleteReply", error, interaction, c);
                  }
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
        if (interaction.options.get("variant").focused && interaction.options.get("type").value) {
          const redAlertType = interaction.options.getString("type");
          const variants = RED_ALERT_TYPES.find((rat) => rat.name === redAlertType)?.variants;
          if (variants && variants.length > 1) {
            const variantAutoCompleteOptions = variants.map((v) => ({ name: v.name, value: v.name }));
            await interaction.respond(variantAutoCompleteOptions);
          } else {
            await interaction.respond([{ name: "No variants information available", value: "" }]);
          }
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
    await interaction.editReply({ files: [image] });
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
  await c.update({ content: "**IT WAS A FALSE ALARM!!!**", components: [], files: [] });
  setTimeout(async () => {
    try {
      return await c.deleteReply();
    } catch (error) {
      console.error("ERROR: Red Alert-FalseAlarm", error, c);
    }
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
  try {
    await c.update({ components: [addFalseAlarmButton(counter)] });
  } catch (error) {
    console.error("ERROR: Red Alert-FalseAlarmCounter", error, c);
  }
}

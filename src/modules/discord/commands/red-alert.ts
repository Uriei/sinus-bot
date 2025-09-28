import { addHours } from "date-fns";
import {
  ActionRowBuilder,
  APIEmbed,
  AttachmentBuilder,
  AutocompleteInteraction,
  ButtonBuilder,
  ButtonInteraction,
  ButtonStyle,
  ChannelSelectMenuInteraction,
  ChatInputCommandInteraction,
  InteractionContextType,
  InteractionEditReplyOptions,
  InteractionReplyOptions,
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
import { CHANNEL_REDALERT_COOLDOWN, FALSE_ALARM_REQUIRED_COUNT, LANGS } from "../../../constants/constants";
import { STARS_DATA } from "../../../constants/stars.constants";
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
          Object.entries(STARS_DATA)
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
        await interaction.deleteReply().catch();
        return;
      }
      const type = interaction.options.getString("type");
      const variant = interaction.options.getString("variant");
      const currentTime = new Date().valueOf();
      if (!type) {
        await interaction
          .reply({ content: "You must pick an option.", flags: MessageFlags.Ephemeral })
          .catch((err) => Log.error("ERROR: Red Alert-SendMustPick | ", err));
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
          .catch((err) => Log.error("ERROR: Red Alert-SendCooldownReply | ", err));
      } else {
        Discord.channelRedAlertCooldown[interaction.channelId] = new Date().valueOf();
        const star = interaction.options.getString("star");
        const starName = STARS_DATA[star].nameRole || STARS_DATA[star].name;
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

        const RED_ALERTS = Object.entries(STARS_DATA)
          .filter((s) => s[1].redAlerts)
          .map((s) => s[1].redAlerts)
          .reduce((pV, cV) => pV.concat(cV))
          .filter((a) => a);
        const redAlertType = RED_ALERTS.find((ra) => ra.name === type);
        if (!redAlertType || !STARS_DATA[star]) {
          const replyPayload: InteractionReplyOptions = {
            content: "Invalid selection, please use the selections provided by the bot.",
            flags: MessageFlags.Ephemeral,
          };
          await interaction.reply(replyPayload).catch((err) => Log.error("ERROR: Red Alert-SendInvalidSelectionReply | ", err));
          Log.error(`ERROR: Red Alert-BadData | Role:${role?.name} | Star:${STARS_DATA[star]?.name}  | Type:${redAlertType?.name}`);
          return;
        }
        const nextTimeframeInit = Math.floor(addHours(currentTime, 3).valueOf() / 1000);
        const nextTimeframeEnd = Math.floor(addHours(currentTime, 6).valueOf() / 1000);
        const redAlertMessage = `${role ? `<@&${role.id}> ` : ""}Red Alert incoming - ${starName} ${redAlertType.emoji} ${
          redAlertType.name
        } | Next estimated window: <t:${nextTimeframeInit}:t>-<t:${nextTimeframeEnd}:t>`;
        const replyPayload = {
          content: redAlertMessage,
          files: [],
          components: addRedAlertButtons(redAlertType),
        };

        const chosenVariant = redAlertType.variants?.find((v) => v.name === variant);
        const imagePath = chosenVariant ? chosenVariant.image : redAlertType.image;
        if (fsExistsSync(imagePath)) {
          const image = new AttachmentBuilder(imagePath);
          replyPayload.files.push(image);
        }

        Log.log(
          `Red Alert | Role:${role?.name} | Star:${STARS_DATA[star].name} | Type:${redAlertType?.name} | Variant:${chosenVariant?.name}`
        );
        const interactionReply = await interaction
          .reply(replyPayload)
          .catch((err) => Log.error("ERROR: Red Alert-SendInteractionReply | ", err));
        if (!interactionReply) return;
        let falseAlarmRequests: Array<string> = [];
        const falseAlarmTimeout = 5; // In minutes
        interactionReply
          .createMessageComponentCollector({
            time: falseAlarmTimeout * 60 * 1000 + 1000,
          })
          .on("collect", async (c) => {
            if (c.customId === "false_alarm") {
              await c.deferUpdate();
              if (c.user.id === interaction.user.id) {
                await falseAlarm(c);
              } else if (!falseAlarmRequests.includes(c.user.id)) {
                falseAlarmRequests.push(c.user.id);
                if (falseAlarmRequests.length >= FALSE_ALARM_REQUIRED_COUNT) {
                  await falseAlarm(c);
                } else {
                  await setFalseAlarmCounter(c, redAlertType, falseAlarmRequests.length);
                }
              } else if (falseAlarmRequests.includes(c.user.id)) {
                falseAlarmRequests = falseAlarmRequests.filter((u) => u !== c.user.id);
                await setFalseAlarmCounter(c, redAlertType, falseAlarmRequests.length);
              }
            } else if (c.customId === "hints") {
              await c.deferReply({ flags: MessageFlags.Ephemeral });
              const hintsPayload: InteractionReplyOptions = {
                embeds: getRedAlertHints(c.locale, redAlertType),
                components: getHintsLangsButtonRow(redAlertType),
                flags: MessageFlags.Ephemeral,
                withResponse: true,
              };
              Log.log(
                `Red Alert-Hints | Role:${role?.name} | Star:${STARS_DATA[star].name} | Type:${redAlertType?.name} | Locale:${c.locale}`
              );
              (await c.followUp(hintsPayload)).createMessageComponentCollector().on("collect", async (ch) => {
                if (ch.customId.startsWith("hintLang-")) {
                  const lang = ch.customId.substring(ch.customId.indexOf("-") + 1);
                  Log.log(
                    `Red Alert-HintsLang | Role:${role?.name} | Star:${STARS_DATA[star].name} | Type:${redAlertType?.name} | Lang:${lang}`
                  );
                  const hintsPayload: InteractionEditReplyOptions = {
                    embeds: getRedAlertHints(lang, redAlertType),
                  };
                  await c.editReply(hintsPayload);
                  await ch.update({});
                }
              });
            }
          });
        setTimeout(async () => {
          const components = [];
          const hintsButton = addHintsButton(redAlertType);
          if (hintsButton) {
            components.push(new ActionRowBuilder<ButtonBuilder>({ components: [hintsButton] }));
          }
          await interaction.editReply({ components: components }).catch(() => Log.error("ERROR: Red Alert-RemoveFalseAlarmButton"));
        }, falseAlarmTimeout * 60 * 1000);

        if (!chosenVariant && hasMultipleVariantData(redAlertType)) {
          const interactionReplyVariants = await interaction
            .followUp({
              content: "Please pick a variant, if you know it...",
              components: addRedAlertVariantButtons(redAlertType),
              flags: MessageFlags.Ephemeral,
            })
            .catch((err) => Log.error("ERROR: Red Alert-SendPickVariant | ", err));
          if (!interactionReplyVariants) return;
          interactionReplyVariants.createMessageComponentCollector({}).on("collect", async (cVariantButton) => {
            const variant = redAlertType.variants?.find((v) => _kebabCase(v.name) === cVariantButton.customId);
            if (variant) {
              if (cVariantButton.user.id === interaction.user.id) {
                Log.log(
                  `Red Alert-Pick Variant | Role:${role?.name} | Star:${STARS_DATA[star].name}  | Type:${redAlertType?.name} | Variant:${variant?.name}`
                );
                await setVariant(cVariantButton, interaction, redAlertType);
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
          const RED_ALERTS = Object.entries(STARS_DATA)
            .filter((s) => s[1].redAlerts)
            .map((s) => s[1].redAlerts)
            .reduce((pV, cV) => pV.concat(cV))
            .filter((a) => a);
          const variants = RED_ALERTS.find((rat) => rat.name === redAlertType)?.variants;
          if (variants && variants.length > 1) {
            const variantAutoCompleteOptions = variants.map((v) => ({ name: v.name, value: v.name }));
            await interaction
              .respond(variantAutoCompleteOptions)
              .catch((err) => Log.error("ERROR: Red Alert-AutoCompleteSendVariantOptions | ", err));
          } else {
            await interaction
              .respond([{ name: "No variants information available", value: "" }])
              .catch((err) => Log.error("ERROR: Red Alert-AutoCompleteSendNoVariants | ", err));
          }
        } else if (interaction.options.get("type")?.focused && interaction.options.get("star")?.value) {
          const star = interaction.options.getString("star");
          const redAlertTypesOnStar = STARS_DATA[star].redAlerts;
          const typesAutoCompleteOptions = redAlertTypesOnStar.map((v) => ({ name: v.name, value: v.name }));
          await interaction
            .respond(typesAutoCompleteOptions)
            .catch((err) => Log.error("ERROR: Red Alert-AutoCompleteSendTypesOptions | ", err));
        }
      }
    },
  },
};

function addRedAlertButtons(redAlertType: IRedAlertType, falseAlarmCounter = 0): ActionRowBuilder<ButtonBuilder>[] {
  const firstRow = new ActionRowBuilder<ButtonBuilder>();
  const hintsButton = addHintsButton(redAlertType);
  if (hintsButton) {
    firstRow.addComponents(hintsButton);
  }
  firstRow.addComponents(addFalseAlarmButton(falseAlarmCounter));
  return [firstRow];
}

function addRedAlertVariantButtons(redAlertType: IRedAlertType): ActionRowBuilder<ButtonBuilder>[] {
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
  return new ButtonBuilder()
    .setCustomId("false_alarm")
    .setLabel(`Report False Alarm${getCounter(counter)}`)
    .setStyle(ButtonStyle.Secondary);
}
function addHintsButton(redAlertType: IRedAlertType) {
  if (redAlertType?.variants && redAlertType.variants.length > 1) {
    return new ButtonBuilder().setCustomId("hints").setLabel(`NPC hints`).setStyle(ButtonStyle.Primary);
  }
  return null;
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
  await c
    .editReply({ content: "**IT WAS A FALSE ALARM!!!**", components: [], files: [] })
    .catch((err) => Log.error("ERROR: Red Alert-SendFalseAlarmReply | ", err));
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
  redAlertType: IRedAlertType,
  counter: number
) {
  await c
    .editReply({ components: addRedAlertButtons(redAlertType, counter) })
    .catch((err) => Log.error("ERROR: Red Alert-FalseAlarmCounter", err, c));
}
function getRedAlertHints(lang: string, redAlertType: IRedAlertType): APIEmbed[] {
  const embed: APIEmbed = {};
  if (!LANGS[lang]) {
    lang = "en-US";
  }
  let description = `## ${redAlertType.name}\n`;
  const variants = redAlertType.variants?.filter((v) => v.hints?.[lang]?.length > 0);
  if (variants) {
    for (const variant of variants) {
      description += `### ${variant.name}\n`;
      for (const line of variant.hints[lang]) {
        description += `- ${line}\n`;
      }
    }
    description += `\n-# If you find any error with a hint translation, please tell me or open an [issue](https://github.com/Uriei/sinus-bot/issues) on GitHub.`;
  } else {
    description += `Sorry, we don't have the translation for this hint yet.\nYou can contribute by making a screenshot of the hints ingame and opening an [issue](https://github.com/Uriei/sinus-bot/issues) on GitHub with them. Thank you.\n`;
  }
  embed.description = description;
  return [embed];
}
function getHintsLangsButtonRow(redAlertType: IRedAlertType): ActionRowBuilder<ButtonBuilder>[] {
  const firstRow = new ActionRowBuilder<ButtonBuilder>();
  const hintsLangs = Object.entries(redAlertType.variants?.[0].hints)
    .filter((vh) => vh[1]?.length > 0)
    .map((vh) => vh[0]);
  for (const lang of hintsLangs) {
    firstRow.addComponents(new ButtonBuilder().setCustomId(`hintLang-${lang}`).setLabel(`${LANGS[lang]}`).setStyle(ButtonStyle.Primary));
  }
  return [firstRow];
}

function hasMultipleVariantData(redAlertType: IRedAlertType): boolean {
  return redAlertType.variants?.filter((v) => fsExistsSync(v.image)).length > 1 || false;
}

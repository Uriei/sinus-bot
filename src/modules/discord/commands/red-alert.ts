import {
  ActionRowBuilder,
  AttachmentBuilder,
  ButtonBuilder,
  ButtonInteraction,
  ButtonStyle,
  ChannelSelectMenuInteraction,
  ChatInputCommandInteraction,
  MentionableSelectMenuInteraction,
  MessageFlags,
  RoleSelectMenuInteraction,
  SlashCommandBuilder,
  StringSelectMenuInteraction,
  UserSelectMenuInteraction,
} from "discord.js";
import { CHANNEL_REDALERT_COOLDOWN, FALSE_ALARM_REQUIRED_COUNT, RED_ALERT_TYPES } from "../../../constants";
import { Discord } from "../discord";
import { addHours } from "date-fns";

export default {
  data: new SlashCommandBuilder()
    .setName("redalert")
    .setDescription("Sends a Red Alert message to the channel.")
    .addStringOption((stringOption) =>
      stringOption
        .setName("type")
        .setDescription("Select the type of Red Alert")
        .setRequired(true)
        .setChoices(RED_ALERT_TYPES.map((a) => ({ name: a.name, value: a.name })))
    ),
  execute: {
    async execute(interaction: ChatInputCommandInteraction) {
      const type = interaction.options.getString("type");
      const currentTime = new Date().valueOf();
      if (!interaction.inCachedGuild()) {
        await interaction.reply({ content: "You can't use this command in Direct Messages.", flags: MessageFlags.Ephemeral });
      } else if (!type) {
        await interaction.reply({ content: "You must pick an option.", flags: MessageFlags.Ephemeral });
      } else if (
        Discord.channelRedAlertCooldown[interaction.channelId] &&
        Discord.channelRedAlertCooldown[interaction.channelId] + CHANNEL_REDALERT_COOLDOWN > currentTime
      ) {
        await interaction.reply({ content: "Red Alert in cooldown...", flags: MessageFlags.Ephemeral });
        console.debug(
          `Red Alert Cooldown triggered: user:${interaction.user.username}, channelCooldownTime:${
            Discord.channelRedAlertCooldown[interaction.channelId]
          }, currentTime:${currentTime}`
        );
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
        const image = new AttachmentBuilder(redAlertType.image);
        const interactionReply = await interaction.reply({ content: redAlertMessage, files: [image], components: [addFalseAlarmButton()] });
        let falseAlarmRequests: Array<string> = [];
        interactionReply
          .createMessageComponentCollector({
            time: 60000,
          })
          .on("collect", async (c) => {
            if (c.customId === "false_alarm") {
              if (c.user.id === interaction.user.id) {
                await falseAlert(c);
              } else if (!falseAlarmRequests.includes(c.user.id)) {
                falseAlarmRequests.push(c.user.id);
                if (falseAlarmRequests.length >= FALSE_ALARM_REQUIRED_COUNT) {
                  await falseAlert(c);
                } else {
                  await setFalseAlertCounter(c, falseAlarmRequests.length);
                }
              } else if (falseAlarmRequests.includes(c.user.id)) {
                falseAlarmRequests = falseAlarmRequests.filter((u) => u !== c.user.id);
                await setFalseAlertCounter(c, falseAlarmRequests.length);
              }
            }
          })
          .on("end", () => {
            interaction.editReply({ components: [] });
          });
      }
    },
  },
};

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

async function falseAlert(
  c:
    | ButtonInteraction<"cached">
    | StringSelectMenuInteraction<"cached">
    | UserSelectMenuInteraction<"cached">
    | RoleSelectMenuInteraction<"cached">
    | MentionableSelectMenuInteraction<"cached">
    | ChannelSelectMenuInteraction<"cached">
) {
  await c.update({ content: "**IT WAS A FALSE ALARM!!!**", components: [], files: [] });
  setTimeout(async () => {
    return await c.deleteReply();
  }, 10000);
}
async function setFalseAlertCounter(
  c:
    | ButtonInteraction<"cached">
    | StringSelectMenuInteraction<"cached">
    | UserSelectMenuInteraction<"cached">
    | RoleSelectMenuInteraction<"cached">
    | MentionableSelectMenuInteraction<"cached">
    | ChannelSelectMenuInteraction<"cached">,
  counter: number
) {
  await c.update({ components: [addFalseAlarmButton(counter)] });
}

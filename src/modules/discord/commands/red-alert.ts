import { AttachmentBuilder, ChatInputCommandInteraction, MessageFlags, SlashCommandBuilder } from "discord.js";
import { CHANNEL_REDALERT_COOLDOWN, RED_ALERT_TYPES } from "../../../constants";
import { Discord } from "../discord";

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
        const role = interaction.guild.roles.cache.find((r) => r.name === interaction.channel.name && r.mentionable);
        const redAlertType = RED_ALERT_TYPES.find((ra) => ra.name === type);
        const redAlertMessage = `${role ? `<@&${role.id}> ` : ""}Red Alert incoming - ${redAlertType.emoji} ${redAlertType.name}`;
        const image = new AttachmentBuilder(redAlertType.image);
        await interaction.reply({ content: redAlertMessage, options: { allowedMentions: { roles: [role?.id] } }, files: [image] });
      }
    },
  },
};

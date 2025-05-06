import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { RED_ALERT_TYPES } from "../../../constants";

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
      if (!type) {
        await interaction.reply({ content: "You must pick an option." });
      } else {
        const role = interaction.guild.roles.cache.find((r) => r.name === interaction.channel.name && r.mentionable);
        const redAlertType = RED_ALERT_TYPES.find((ra) => ra.name === type);
        const redAlertMessage = `${role ? `@${role.name} ` : ""}Red Alert incoming - ${redAlertType.emoji} ${redAlertType.name}`;
        await interaction.reply({ content: redAlertMessage });
      }
    },
  },
};

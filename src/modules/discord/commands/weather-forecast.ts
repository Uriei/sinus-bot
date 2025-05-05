import { AutocompleteInteraction, ChatInputCommandInteraction, MessageFlags, SlashCommandBuilder } from "discord.js";

import { getNextWeatherForecast } from "../../../worker/weather-update";
import { formatWeatherForecastForDiscord } from "../../utils";

export default {
  data: new SlashCommandBuilder()
    .setName("weather-forecast")
    .setDescription("Shows the weather forecast for Sinus Ardorum in the next X hours. (Max 24 hours)")

    .addNumberOption((numberOption) =>
      numberOption
        .setName("hours")
        .setDescription("Hours to forecast")
        .setMinValue(1)
        .setMaxValue(24)
        .setAutocomplete(true)
        .setRequired(false)
    ),
  execute: {
    async execute(interaction: ChatInputCommandInteraction) {
      await interaction.deferReply({ flags: MessageFlags.Ephemeral });
      const hours = interaction.options.getNumber("hours") || 6;
      const weatherForecastDiscordFormatted = formatWeatherForecastForDiscord(getNextWeatherForecast(hours), hours);

      await interaction.editReply({ embeds: weatherForecastDiscordFormatted });
    },
  },
  autocomplete: {
    async autocomplete(interaction: AutocompleteInteraction) {
      await interaction.respond([
        { name: "6 hours", value: 6 },
        { name: "12 hours", value: 12 },
        { name: "18 hours", value: 18 },
        { name: "24 hours", value: 24 },
      ]);
    },
  },
};

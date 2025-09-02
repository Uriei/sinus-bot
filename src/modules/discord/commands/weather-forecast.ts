import { AutocompleteInteraction, ChatInputCommandInteraction, MessageFlags, SlashCommandBuilder } from "discord.js";

import { ALARM_SOUNDS } from "../../../constants/weather.constants";
import { getNextWeatherForecast } from "../../../worker/weather-update";
import { formatWeatherForecastForDiscord, formatWeatherForecastMacroAlarm } from "../../utils";
import { Discord } from "../discord";
import { STARS } from "../../../constants/stars.constants";

export default {
  data: new SlashCommandBuilder()
    .setName("weather-forecast")
    .setDescription("Shows the weather forecast for Sinus Ardorum in the next X hours. (Max 24 hours)")
    .addSubcommand((subCommandOption) =>
      subCommandOption
        .setName("forecast")
        .setDescription("Shows forecast as a list")
        .addStringOption((stringOption) =>
          stringOption
            .setName("star")
            .setDescription("Select Star for Red Alert")
            .setRequired(true)
            .setChoices(Object.entries(STARS).map((s) => ({ name: s[1].name, value: s[0] })))
        )
        .addNumberOption((numberOption) =>
          numberOption.setName("hours").setDescription("Hours to forecast").setAutocomplete(true).setRequired(false)
        )
    )
    .addSubcommand((subCommandOption) =>
      subCommandOption
        .setName("alarm-macro")
        .setDescription("Prints forecast as a FFXIV macro with /alarm")
        .addStringOption((stringOption) =>
          stringOption
            .setName("star")
            .setDescription("Select Star for Red Alert")
            .setRequired(true)
            .setChoices(Object.entries(STARS).map((s) => ({ name: s[1].name, value: s[0] })))
        )
        .addNumberOption((numberOption) =>
          numberOption.setName("hours").setDescription("Hours to forecast").setAutocomplete(true).setRequired(false)
        )
        .addNumberOption((numberOption) =>
          numberOption
            .setName("reminder")
            .setDescription("How many minutes prior to sound the alarm")
            .setAutocomplete(true)
            .setRequired(false)
        )
        .addStringOption((stringOption) =>
          stringOption.setName("sound").setDescription("Pick the alarm sound").setRequired(false).setChoices(ALARM_SOUNDS)
        )
    ),
  execute: {
    async execute(interaction: ChatInputCommandInteraction) {
      if (Discord.inBL(interaction.user.id)) {
        await interaction.deferReply().catch();
        interaction.deleteReply().catch();
        return;
      }
      await interaction.deferReply({ flags: MessageFlags.Ephemeral });
      let star = interaction.options.getString("star");
      let hours = interaction.options.getNumber("hours") || 6;
      if (interaction.options.getSubcommand(true) === "forecast") {
        const embed = formatWeatherForecastForDiscord(star, getNextWeatherForecast(star, hours), hours);

        await interaction.editReply({ embeds: embed });
      } else if (interaction.options.getSubcommand(true) === "alarm-macro") {
        hours = hours > 24 ? 24 : hours;
        const reminder = interaction.options.getNumber("reminder") || 3;
        const sound = interaction.options.getString("sound") || ALARM_SOUNDS[0].value;
        const embed = formatWeatherForecastMacroAlarm(star, getNextWeatherForecast(star, hours), hours, reminder, sound);

        await interaction.editReply({ embeds: embed });
      }
    },
  },
  autocomplete: {
    async autocomplete(interaction: AutocompleteInteraction) {
      if (interaction.isAutocomplete()) {
        if (interaction.options.get("hours").focused) {
          await interaction.respond([
            { name: "6 hours", value: 6 },
            { name: "12 hours", value: 12 },
            { name: "18 hours", value: 18 },
            { name: "24 hours", value: 24 },
          ]);
        } else if (interaction.options.get("reminder").focused) {
          await interaction.respond([
            { name: "1 minute", value: 1 },
            { name: "2 minutes", value: 2 },
            { name: "3 minutes", value: 3 },
            { name: "5 minutes", value: 5 },
            { name: "10 minutes", value: 10 },
          ]);
        }
      }
    },
  },
};

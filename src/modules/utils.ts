import { APIEmbed, APIEmbedField, EmbedBuilder } from "discord.js";
import { IWeatherReport } from "./models/weather-report.model";

const DEFAULT_COLOR = 0x033280;

export function formatWeatherForecastForDiscord(weatherReport: IWeatherReport[], hours: number): Array<APIEmbed> {
  const embed = new EmbedBuilder().setColor(DEFAULT_COLOR).setTitle(`Sinus Ardorum Weather Forecast for the next ${hours} hours`);

  for (let index = 0; index < weatherReport.length; index++) {
    const element = weatherReport[index];
    const nextElement = index < weatherReport.length - 1 ? weatherReport[index + 1] : null;
    let value = "";
    if (index === 0) {
      value += "Now";
    } else {
      value += `<t:${element.date / 1000}:T>`;
    }
    if (nextElement) {
      value += ` :arrow_right: <t:${nextElement.date / 1000}:T>`;
    } else {
      value += ` :arrow_right: Outside Forecast`;
    }

    const field: APIEmbedField = {
      name: `${element.emoji} ${element.name}`,
      value: value,
      inline: false,
    };

    embed.addFields(field);
  }

  return [embed.toJSON()];
}

export function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

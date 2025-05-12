import { addHours, formatDuration, intervalToDuration } from "date-fns";
import { APIEmbed, APIEmbedField, EmbedBuilder } from "discord.js";
import { IWeatherReport } from "./models/weather-report.model";

const DEFAULT_COLOR = 0x033280;

export function formatWeatherForecastForDiscord(weatherReport: IWeatherReport[], hours: number): Array<APIEmbed> {
  const reportHourLimit = addHours(new Date(), hours).valueOf();
  const embed = new EmbedBuilder().setColor(DEFAULT_COLOR).setTitle(`Sinus Ardorum Weather Forecast for the next ${hours} hours`);

  for (let index = 0; index < weatherReport.length && index < 24; index++) {
    const element = weatherReport[index];
    if (element.date >= reportHourLimit) {
      break;
    }
    const nextElement = index < weatherReport.length - 1 ? weatherReport[index + 1] : null;
    let value = "";
    if (index === 0) {
      value += "Now";
    } else {
      value += `<t:${element.date / 1000}:T>`;
    }
    if (nextElement) {
      value += ` ► <t:${nextElement.date / 1000}:T>`;
      value += ` :watch: ${calculateDuration(element.date, nextElement.date)}`;
    } else {
      value += ` ► Outside Forecast`;
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

function calculateDuration(init: number, end: number): string {
  return formatDuration(intervalToDuration({ start: init, end: end }), { zero: false });
}

export function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

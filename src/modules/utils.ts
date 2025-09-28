import { addHours, format, formatDuration, intervalToDuration } from "date-fns";
import { APIEmbed, APIEmbedField, EmbedBuilder } from "discord.js";
import { JOB_NAMES, TIMERESTRICTED_MISSIONS } from "../constants/jobs.constants";
import { STARS_DATA } from "../constants/stars.constants";
import { ALARM_SOUNDS } from "../constants/weather.constants";
import { ITimeRestrictedMission, ITimeRestrictedMissionJob } from "./models/jobs.model";
import { IWeatherReport } from "./models/weather-report.model";

const DEFAULT_COLOR = 0x033280;

export function formatWeatherForecastForDiscord(star: string, weatherReport: IWeatherReport[], hours: number): Array<APIEmbed> {
  const starName = STARS_DATA[star].name;
  const reportHourLimit = addHours(new Date(), hours).valueOf();
  const embed = new EmbedBuilder().setColor(DEFAULT_COLOR).setTitle(`${starName} Weather Forecast for the next ${hours} hours`);

  for (let index = 0; index < weatherReport.length && index < 23; index++) {
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
    const name = element.important ? `${element.emoji} ${element.name} ❗` : `${element.emoji} ${element.name}`;
    const field: APIEmbedField = {
      name: name,
      value: value,
      inline: false,
    };

    embed.addFields(field);
  }
  const endField: APIEmbedField = { name: "", value: "❗ denotes weather with restricted missions available.", inline: false };
  embed.addFields(endField);

  return [embed.toJSON()];
}

export function formatWeatherForecastMacroAlarm(
  star: string,
  weatherReport: IWeatherReport[],
  hours: number,
  reminder: number,
  sound: string
): Array<APIEmbed> {
  const starName = STARS_DATA[star].name;
  const reportHourLimit = addHours(new Date(), hours).valueOf();
  const embed = new EmbedBuilder()
    .setColor(DEFAULT_COLOR)
    .setTitle(`${starName} Weather Forecast Macro Alarm for the next ${hours} hours (or 15 lines)`);
  let content = "";
  let linesCount = 0;

  for (let index = 1; index < weatherReport.length && linesCount < 15; index++) {
    const element = weatherReport[index];
    if (element.date >= reportHourLimit) {
      break;
    }
    if (!element.important) {
      continue;
    }
    content += `/alarm "${element.name}" st ${formatDateServerTime(element.date)} ${reminder} ${sound}\n`;
    linesCount++;
  }
  content = `\`\`\`\n${content.trim()}\n\`\`\``;
  embed.setDescription(content);
  return [embed.toJSON()];
}

export function formatJobTimersForDiscord(star: string, jobs: string[]): Array<APIEmbed> {
  const starName = STARS_DATA[star].name;
  const embed = new EmbedBuilder()
    .setColor(DEFAULT_COLOR)
    .setTitle(`${starName} Time-Restricted Missions`)
    .setDescription("For the selected jobs:");

  const starRestrictedMissions: ITimeRestrictedMission = TIMERESTRICTED_MISSIONS[star];

  const finalTimers = [];
  for (const job of jobs) {
    const jobTimers: ITimeRestrictedMissionJob[] = starRestrictedMissions[job];
    for (const timer of jobTimers) {
      const eorzeaTime = timer.eorzeaTime;
      const needsBaseUnlock = timer.needsBaseUnlock;

      let timerToAdd = finalTimers.find((t) => t?.eorzeaTime === eorzeaTime);
      if (!timerToAdd) {
        timerToAdd = { eorzeaTime, jobs: [] };
        finalTimers.push(timerToAdd);
      }
      timerToAdd.jobs.push({ job, needsBaseUnlock });
    }
  }
  finalTimers.sort((a, b) => a.eorzeaTime - b.eorzeaTime);

  for (const timer of finalTimers) {
    const name = timer.eorzeaTime.replace(/(\d\d)(\d\d)/, "$1:$2").trim();
    const value = timer.jobs
      .map((j) => `${JOB_NAMES[j.job]}${j.needsBaseUnlock ? "\\*" : ""}`)
      .sort((a: string, b: string) => a.localeCompare(b))
      .join(", ")
      .trim();

    const field: APIEmbedField = {
      name: name,
      value: value,
      inline: false,
    };

    embed.addFields(field);
  }

  const endField: APIEmbedField = {
    name: "",
    value: "\\* An asterisk denotes that the mission might be locked behind World progression.",
    inline: false,
  };
  embed.addFields(endField);

  return [embed.toJSON()];
}

export function formatJobTimersMacroAlarm(
  star: string,
  jobs: string[],
  reminder: number = 3,
  sound: string = ALARM_SOUNDS[0].value
): Array<APIEmbed> {
  const starName = STARS_DATA[star].name;
  const embed = new EmbedBuilder().setColor(DEFAULT_COLOR).setTitle(`${starName} Time-Restricted Missions Alarms`);
  let content = "";
  let linesCount = 0;

  const starRestrictedMissions: ITimeRestrictedMission = TIMERESTRICTED_MISSIONS[star];

  const finalTimers = [];
  for (const job of jobs) {
    const jobTimers: ITimeRestrictedMissionJob[] = starRestrictedMissions[job];
    for (const timer of jobTimers) {
      const eorzeaTime = timer.eorzeaTime;
      const needsBaseUnlock = timer.needsBaseUnlock;

      let timerToAdd = finalTimers.find((t) => t?.eorzeaTime === eorzeaTime);
      if (!timerToAdd) {
        timerToAdd = { eorzeaTime, jobs: [] };
        finalTimers.push(timerToAdd);
      }
      timerToAdd.jobs.push({ job, needsBaseUnlock });
    }
  }
  finalTimers.sort((a, b) => a.eorzeaTime - b.eorzeaTime);

  for (const timer of finalTimers) {
    if (linesCount >= 15) {
      break;
    }
    const name: string = (
      timer.jobs
        .map((j) => `${j.job}${j.needsBaseUnlock ? "*" : ""}`)
        .sort((a: string, b: string) => a.localeCompare(b))
        .join("/")
        .trim() as string
    ).slice(0, 20);
    const value = timer.eorzeaTime.replace(/\D/, "").trim();

    content += `/alarm "${name}" et rp ${value} ${reminder} ${sound}\n`;
    linesCount++;
  }

  content = `\`\`\`\n${content.trim()}\n\`\`\``;
  content +=
    "\\* An asterisk denotes that the mission might be locked behind World progression.\nThe name of the alarm might be truncated to 20 characters if you've selected many jobs.";
  embed.setDescription(content);
  return [embed.toJSON()];
}

export function generateMessageEmbed(title: string, description?: string) {
  const embed = new EmbedBuilder().setColor(DEFAULT_COLOR).setTitle(title);
  if (description) {
    embed.setDescription(description);
  }
  return [embed.toJSON()];
}

function formatDateServerTime(date: number): string {
  return format(date, "HHmm");
}

function calculateDuration(init: number, end: number): string {
  return formatDuration(intervalToDuration({ start: init, end: end }), { zero: false });
}

export function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

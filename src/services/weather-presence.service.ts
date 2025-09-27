import { formatDistance } from "date-fns";
import { STARS_DATA } from "../constants/stars.constants";
import { Discord } from "../modules/discord/discord";
import { Log } from "../modules/logging";
import { IWeatherReport } from "../modules/models/weather-report.model";
import { getNextWeatherForecast } from "../worker/weather-update";

export class WeatherPresenceService {
  private static instance: WeatherPresenceService;
  private interval: number = -1;
  private static _timeoutCallback: NodeJS.Timeout;
  public get timeoutCallback(): NodeJS.Timeout {
    return WeatherPresenceService._timeoutCallback;
  }
  private set timeoutCallback(value: NodeJS.Timeout) {
    WeatherPresenceService._timeoutCallback = value;
  }
  private discord: Discord | null = null;
  private static STAR_INDEX = 99999;

  private constructor() {}

  public static async getInstance(): Promise<WeatherPresenceService> {
    if (WeatherPresenceService.instance) {
      return WeatherPresenceService.instance;
    } else {
      WeatherPresenceService.instance = new WeatherPresenceService();
      WeatherPresenceService.instance.discord = await Discord.getInstance();
      return WeatherPresenceService.instance;
    }
  }

  public async start(interval: number = 120000) {
    if (interval < 60000) {
      Log.error("Interval can't be lower than 60000ms, 1 minute.");
    } else {
      this.interval = interval;
    }
    setTimeout(() => {
      this.runWeatherPresenceService();
    }, 5000);
  }

  private async runWeatherPresenceService() {
    try {
      Log.debug("Weather Presence Service: Checking for weather forecast.");
      const star = this.getNextStar();
      const weatherForecast = getNextWeatherForecast(star, 24);
      const newPresence = getCustomPresence(star, weatherForecast);
      this.discord.setPresence("online", newPresence);
      Log.debug(`Weather Presence Service: Setting Bot Presence to "${newPresence}"`);
    } catch (error) {
      Log.error("Weather Presence Service: ERROR:", error);
    }

    this.scheduleNextRun();
  }

  private scheduleNextRun() {
    if (this.timeoutCallback) {
      clearTimeout(this.timeoutCallback);
    }
    this.timeoutCallback = setTimeout(() => {
      this.runWeatherPresenceService();
    }, this.interval);
  }

  private getNextStar(): string {
    const STAR_COUNT = Object.entries(STARS_DATA).filter((s) => s[1].weather).length;
    WeatherPresenceService.STAR_INDEX++;
    if (WeatherPresenceService.STAR_INDEX > STAR_COUNT - 1) {
      WeatherPresenceService.STAR_INDEX = 0;
    }
    return Object.entries(STARS_DATA)
      .filter((s) => s[1].weather)
      .map((s) => s[0])[WeatherPresenceService.STAR_INDEX];
  }
}

function getCustomPresence(star: string, weatherForecast: IWeatherReport[]): string {
  const starName = STARS_DATA[star].nameShort || STARS_DATA[star].name;
  if (weatherForecast.length === 1) {
    return `${starName}: ${weatherForecast[0].name} for the foreseeable future.`;
  } else if (weatherForecast.length > 1) {
    if (weatherForecast[0].important) {
      return `${starName}: ${weatherForecast[0].name} for ${getNextTime(weatherForecast[1].date)}${
        weatherForecast[1].important ? ", then " + weatherForecast[1].name : ""
      }.`;
    } else {
      return `${starName}: ${weatherForecast[1].name} ${getNextTime(weatherForecast[1].date, "in ")}.`;
    }
  }
  return null;
}
function getNextTime(date: number, prefix = ""): string {
  return `${prefix}${formatDistance(new Date(date), new Date())}`;
}

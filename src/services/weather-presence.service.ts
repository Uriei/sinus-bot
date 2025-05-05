import { formatDistance } from "date-fns";
import { Discord } from "../modules/discord/discord";
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
      console.error("Interval can't be lower than 60000ms, 1 minute.");
    } else {
      this.interval = interval;
    }
    setTimeout(() => {
      this.runWeatherPresenceService();
    }, 5000);
  }

  private async runWeatherPresenceService() {
    try {
      console.debug("Weather Presence Service: Checking for weather forecast.");
      const weatherForecast = getNextWeatherForecast(24);
      const newPresence = getCustomPresence(weatherForecast);
      this.discord.setPresence("CUSTOM", newPresence);
      console.debug(`Weather Presence Service: Setting Bot Presence to "${newPresence}"`);
    } catch (error) {
      console.error("Weather Presence Service: ERROR:", error);
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
}

function getCustomPresence(weatherForecast: IWeatherReport[]): string {
  if (weatherForecast.length === 1) {
    return `${weatherForecast[0].name} for the foreseeable future.`;
  } else if (weatherForecast.length > 1) {
    if (weatherForecast[0].important) {
      return `${weatherForecast[0].name} for ${getNextTime(weatherForecast[1].date)}${
        weatherForecast[1].important ? ", then " + weatherForecast[1].name : ""
      }.`;
    } else {
      return `${weatherForecast[1].name} ${getNextTime(weatherForecast[1].date, "in ")}.`;
    }
  }
  return null;
}
function getNextTime(date: number, prefix = ""): string {
  return `${prefix}${formatDistance(new Date(date), new Date())}`;
}

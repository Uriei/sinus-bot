import { STARS } from "../constants/stars.constants";
import { IWeatherReport } from "../modules/models/weather-report.model";

function calculateForecastTarget(lDate: Date): number {
  const unixSeconds = lDate.valueOf() / 1000;
  const eorzeanHours = Math.floor(unixSeconds / 175);
  const eorzeanDays = Math.floor(eorzeanHours / 24) << 0;
  const eorzeaHour = eorzeanHours % 24;
  let timeChunk = eorzeaHour - (eorzeanHours % 8);
  timeChunk = (timeChunk + 8) % 24;
  const seed = eorzeanDays * 100 + timeChunk;
  const step1 = ((seed << 11) ^ seed) >>> 0;
  const step2 = ((step1 >>> 8) ^ step1) >>> 0;
  const weatherChance = step2 % 100;
  return weatherChance;
}

function getWeatherForecast(star: string) {
  const currentStep = calculateForecastTarget(new Date());
  const weatherForecast = STARS[star].weather.find((weather) => currentStep <= weather.rate);
  return weatherForecast;
}
export function getWeatherForecastIcon(star: string) {
  return getWeatherForecast(star).emoji;
}
export function getWeatherForecastName(star: string) {
  return getWeatherForecast(star).name;
}

export function getNextWeatherForecast(star: string, maxHours: number = 24): Array<IWeatherReport> {
  const weatherArray: Array<IWeatherReport> = [];
  const currentDate = new Date(new Date().setMilliseconds(0));
  const maxDate = new Date().setHours(new Date().getHours() + maxHours + 6);

  while (currentDate.valueOf() < maxDate.valueOf()) {
    const currentChance = calculateForecastTarget(currentDate);
    const weatherForecast = STARS[star].weather.find((weather) => currentChance < weather.rate);

    if (weatherArray.length === 0 || weatherArray[weatherArray.length - 1].name !== weatherForecast.name) {
      const newWeather: IWeatherReport = {
        ...weatherForecast,
        date: currentDate.valueOf(),
        weatherChance: currentChance,
      };
      weatherArray.push(newWeather);
    }

    currentDate.setSeconds(currentDate.getSeconds() + 1);
  }
  return weatherArray;
}

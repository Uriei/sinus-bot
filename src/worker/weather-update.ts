import { SINUS_ARDORUM_WEATHER } from "../constants";
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

function getWeatherForecast() {
  const currentStep = calculateForecastTarget(new Date());
  const weatherForecast = SINUS_ARDORUM_WEATHER.find((weather) => currentStep <= weather.rate);
  return weatherForecast;
}
export function getWeatherForecastIcon() {
  return getWeatherForecast().emoji;
}
export function getWeatherForecastName() {
  return getWeatherForecast().name;
}

export function getNextWeatherForecast(maxHours: number = 24): Array<IWeatherReport> {
  const weatherArray: Array<IWeatherReport> = [];
  const currentDate = new Date(new Date().setMilliseconds(0));
  const maxDate = new Date().setHours(new Date().getHours() + maxHours);

  while (currentDate.valueOf() < maxDate.valueOf()) {
    const currentChance = calculateForecastTarget(currentDate);
    const weatherForecast = SINUS_ARDORUM_WEATHER.find((weather) => currentChance < weather.rate);

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

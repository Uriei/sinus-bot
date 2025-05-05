import { IWeatherData } from "./modules/models/weather-report.model";

export const WEATHER_EMOJIS = {
  MOON_DUST: "<:moondust:1367875156914999336>",
  UMBRAL_WIND: "<:umbralwind:1367875129463275603>",
  FAIR_SKIES: "<:fairskies:1367874950479745044>",
};
export const SINUS_ARDORUM_WEATHER: Array<IWeatherData> = [
  {
    rate: 15,
    emoji: WEATHER_EMOJIS.MOON_DUST,
    name: "Moon Dust",
    important: true,
  },
  {
    rate: 85,
    emoji: WEATHER_EMOJIS.FAIR_SKIES,
    name: "Fair Skies",
    important: false,
  },
  {
    rate: 100,
    emoji: WEATHER_EMOJIS.UMBRAL_WIND,
    name: "Umbral Wind",
    important: true,
  },
];

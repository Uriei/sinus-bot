import { IWeatherData } from "./modules/models/weather-report.model";
import * as path from "path";

export const WEATHER_EMOJIS = {
  MOON_DUST: "<:moondust:1369561645151551558>",
  UMBRAL_WIND: "<:umbralwind:1369561668132274177>",
  FAIR_SKIES: "<:fairskies:1369561680278978631>",
  METEOR_SHOWER: "<:meteorshower:1369565029824860211>",
  SPORING_MIST: "<:sporingmist:1369565042231611412>",
  ASTROMAGNETIC_STORM: "<:astromagneticstorm:1369563775719575624>",
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

export const RED_ALERT_TYPES = [
  {
    name: "Meteor Shower",
    emoji: WEATHER_EMOJIS.METEOR_SHOWER,
    image: path.resolve("./assets/red-alerts/ra-meteorshower.png"),
  },
  { name: "Sporing Mist", emoji: WEATHER_EMOJIS.SPORING_MIST, image: path.resolve("./assets/red-alerts/ra-sporingmist.png") },
  {
    name: "Astromagnetic Storm",
    emoji: WEATHER_EMOJIS.ASTROMAGNETIC_STORM,
    image: path.resolve("./assets/red-alerts/ra-astromagneticstorm.png"),
  },
];

export const CHANNEL_REDALERT_COOLDOWN = 30 * 1000; // Milliseconds
export const FALSE_ALARM_REQUIRED_COUNT = 3;

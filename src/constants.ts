import * as dotenv from "dotenv";
import * as path from "path";
import { IRedAlertType } from "./modules/models/red-alert.model";
import { IWeatherData } from "./modules/models/weather-report.model";
dotenv.config();

const TESTING = process.env.ENV === "TESTING";

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

export const RED_ALERT_TYPES: Array<IRedAlertType> = [
  {
    name: "Meteor Shower",
    emoji: WEATHER_EMOJIS.METEOR_SHOWER,
    image: path.resolve("./assets/red-alerts/ra-meteorshower.png"),
    variants: [
      {
        name: "Variant A",
        classes: ["ARM", "GSM", "BSM", "LTW", "MIN"],
        image: path.resolve("./assets/red-alerts/ra-meteorshower-a.png"),
      },
      {
        name: "Variant B",
        classes: ["BSM", "ARM", "LTW", "ALC", "CUL", "BTN"],
        image: path.resolve("./assets/red-alerts/ra-meteorshower-b.png"),
      },
    ],
  },
  {
    name: "Sporing Mist",
    emoji: WEATHER_EMOJIS.SPORING_MIST,
    image: path.resolve("./assets/red-alerts/ra-sporingmist.png"),
    variants: [
      {
        name: "Variant A",
        classes: ["BSM", "ALC", "CRP", "WVR", "BTN"],
        image: path.resolve("./assets/red-alerts/ra-sporingmist-a.png"),
      },
      {
        name: "Variant B",
        classes: ["CUL", "BTN", "FSH", "CRP", "LTW", "WVR"],
        image: path.resolve("./assets/red-alerts/ra-sporingmist-b.png"),
      },
    ],
  },
  {
    name: "Astromagnetic Storm",
    emoji: WEATHER_EMOJIS.ASTROMAGNETIC_STORM,
    image: path.resolve("./assets/red-alerts/ra-astromagneticstorm.png"),
    variants: [
      {
        name: "Variant A",
        classes: ["MIN", "FSH", "ARM", "GSM", "ALC"],
        image: path.resolve("./assets/red-alerts/ra-astromagneticstorm-a.png"),
      },
      {
        name: "Variant B",
        classes: ["CUL", "MIN", "FSH", "CRP", "GSM", "WVR"],
        image: path.resolve("./assets/red-alerts/ra-astromagneticstorm-b.png"),
      },
    ],
  },
];

export const CHANNEL_REDALERT_COOLDOWN = TESTING ? 0 : 30 * 1000; // Milliseconds
export const FALSE_ALARM_REQUIRED_COUNT = 3;
export const ALARM_SOUNDS = [
  { name: "Bell", value: "se00" },
  { name: "Music Box", value: "se01" },
  { name: "Prelude", value: "se02" },
  { name: "Chocobo", value: "se03" },
  { name: "La Noscea", value: "se04" },
  { name: "Festival", value: "se05" },
];

export type CLASS_DOL_LIST = "BTN" | "MIN" | "FSH";
export type CLASS_DOH_LIST = "LTW" | "WVR" | "CRP" | "BSM" | "ARM" | "GSM" | "ALC" | "CUL";
export type CLASS_LIST = CLASS_DOH_LIST | CLASS_DOL_LIST;

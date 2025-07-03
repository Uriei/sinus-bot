import * as dotenv from "dotenv";
import * as path from "path";
import { IRedAlertType } from "../modules/models/red-alert.model";
import { WEATHER_EMOJIS } from "./weather.constants";
dotenv.config();

const TESTING = process.env.ENV === "TESTING";
export const RED_ALERT_TYPES: Array<IRedAlertType> = [
  {
    name: "Meteor Shower",
    emoji: WEATHER_EMOJIS.METEOR_SHOWER,
    image: path.resolve("./assets/red-alerts/sinus-ardorum/ra-meteorshower.png"),
    variants: [
      {
        name: "Variant A",
        classes: ["ARM", "GSM", "BSM", "LTW", "MIN"],
        image: path.resolve("./assets/red-alerts/sinus-ardorum/ra-meteorshower-a.png"),
      },
      {
        name: "Variant B",
        classes: ["BSM", "ARM", "LTW", "ALC", "CUL", "BTN"],
        image: path.resolve("./assets/red-alerts/sinus-ardorum/ra-meteorshower-b.png"),
      },
    ],
  },
  {
    name: "Sporing Mist",
    emoji: WEATHER_EMOJIS.SPORING_MIST,
    image: path.resolve("./assets/red-alerts/sinus-ardorum/ra-sporingmist.png"),
    variants: [
      {
        name: "Variant A",
        classes: ["BSM", "ALC", "CRP", "WVR", "BTN"],
        image: path.resolve("./assets/red-alerts/sinus-ardorum/ra-sporingmist-a.png"),
      },
      {
        name: "Variant B",
        classes: ["CUL", "BTN", "FSH", "CRP", "LTW", "WVR"],
        image: path.resolve("./assets/red-alerts/sinus-ardorum/ra-sporingmist-b.png"),
      },
    ],
  },
  {
    name: "Astromagnetic Storm",
    emoji: WEATHER_EMOJIS.ASTROMAGNETIC_STORM,
    image: path.resolve("./assets/red-alerts/sinus-ardorum/ra-astromagneticstorm.png"),
    variants: [
      {
        name: "Variant A",
        classes: ["MIN", "FSH", "ARM", "GSM", "ALC"],
        image: path.resolve("./assets/red-alerts/sinus-ardorum/ra-astromagneticstorm-a.png"),
      },
      {
        name: "Variant B",
        classes: ["CUL", "MIN", "FSH", "CRP", "GSM", "WVR"],
        image: path.resolve("./assets/red-alerts/sinus-ardorum/ra-astromagneticstorm-b.png"),
      },
    ],
  },
];

export const CHANNEL_REDALERT_COOLDOWN = TESTING ? 0 : 30 * 1000; // Milliseconds
export const FALSE_ALARM_REQUIRED_COUNT = 3;

export type CLASS_DOL_LIST = "BTN" | "MIN" | "FSH";
export type CLASS_DOH_LIST = "LTW" | "WVR" | "CRP" | "BSM" | "ARM" | "GSM" | "ALC" | "CUL";
export type CLASS_LIST = CLASS_DOH_LIST | CLASS_DOL_LIST;

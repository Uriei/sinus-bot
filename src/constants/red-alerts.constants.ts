import * as path from "path";
import { IRedAlertType } from "../modules/models/red-alert.model";
import { WEATHER_EMOJIS } from "./weather.constants";

export const RED_ALERT_SINUS_ARDORUM: Array<IRedAlertType> = [
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

export const RED_ALERT_PHAENNA: Array<IRedAlertType> = [
  {
    name: "Thunderstorms",
    emoji: WEATHER_EMOJIS.THUNDERSTORMS,
    image: path.resolve("./assets/red-alerts/phaenna/ra-thunderstorms.png"),
    variants: [
      {
        name: "Variant A",
        classes: ["CRP", "LTW", "ALC", "GSM", "WVR"],
        image: path.resolve("./assets/red-alerts/phaenna/ra-thunderstorms-a.png"),
      },
    ],
  },
  {
    name: "Annealing Winds",
    emoji: WEATHER_EMOJIS.ANNEALING_WINDS,
    image: path.resolve("./assets/red-alerts/phaenna/ra-annealingwinds.png"),
    variants: [
      {
        name: "Variant A",
        classes: ["BSM", "LTW", "BTN", "CUL", "MIN", "FSH"],
        image: path.resolve("./assets/red-alerts/phaenna/ra-annealingwinds-a.png"),
      },
    ],
  },
  {
    name: "Glass Rain",
    emoji: WEATHER_EMOJIS.GLASSRAIN,
    image: path.resolve("./assets/red-alerts/phaenna/ra-glassrain.png"),
    variants: [
      {
        name: "Variant A",
        classes: [],
        image: path.resolve("./assets/red-alerts/phaenna/ra-glassrain-a.png"),
      },
    ],
  },
];

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
        classes: ["BSM", "LTW", "MIN", "ARM", "GSM"],
        image: path.resolve("./assets/red-alerts/sinus-ardorum/ra-meteorshower-a.png"),
        hints: {
          en: [
            "A meteor shower is heading right for us!",
            "It might damage our facilities and equipment...",
            "We must safeguard the essentials first!",
          ],
          fr: [],
          de: [],
          jp: [],
        },
      },
      {
        name: "Variant B",
        classes: ["BSM", "ARM", "LTW", "ALC", "CUL", "BTN"],
        image: path.resolve("./assets/red-alerts/sinus-ardorum/ra-meteorshower-b.png"),
        hints: {
          en: [
            "A meteor shower is heading right for us!",
            "It could cause irreparable damage to the surface...",
            "We have to act swiftly and fix the problems as they arise!",
          ],
          fr: [],
          de: [],
          jp: [],
        },
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
        hints: {
          en: [
            "There's been a sharp rise of harmful spores in the air!",
            "We have to stop them from spreading...",
            "We'll be in trouble if the spores keep multiplying...",
          ],
          fr: [],
          de: [],
          jp: [],
        },
      },
      {
        name: "Variant B",
        classes: ["CRP", "LTW", "WVR", "CUL", "BTN", "FSH"],
        image: path.resolve("./assets/red-alerts/sinus-ardorum/ra-sporingmist-b.png"),
        hints: {
          en: [
            "There's been a sharp rise of harmful spores in the air!",
            "We'll barely be able to see our hands in front of our faces...",
            "We must remain calm!",
          ],
          fr: [],
          de: [],
          jp: [],
        },
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
        hints: {
          en: [
            "A massive astromagnetic storm is approaching!",
            "The delicate equipment might not make it through...",
            "We'll have to prepare for the worst!",
          ],
          fr: [],
          de: [],
          jp: [],
        },
      },
      {
        name: "Variant B",
        classes: ["CUL", "MIN", "FSH", "CRP", "GSM", "WVR"],
        image: path.resolve("./assets/red-alerts/sinus-ardorum/ra-astromagneticstorm-b.png"),
        hints: {
          en: [
            "A massive astromagnetic storm is approaching!",
            "Will our transport system be able to handle it?",
            "We have to prepare immediately!",
          ],
          fr: [],
          de: [],
          jp: [],
        },
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
        hints: {
          en: [
            "Severe thunderstorms are approaching!",
            "Our machinery could be in grave danger!",
            "We'll need to ensure we have ample supplies.",
          ],
          fr: [
            "Un violent orage est annoncé!",
            "Ça risque de faire des dégâts sur nos appareils...",
            "Nous devons inspecter nos dispositifs de contre-mesure.",
          ],
          de: [],
          jp: [],
        },
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
        hints: {
          en: [
            "Annealing winds are approaching! We expect temperatures to plummet...",
            "We'll need to ensure the cave doesn't freeze over...",
            "Be ready for anything!",
          ],
          fr: [
            "Des fortes baisses de températures sont prévues!",
            "Il vaut mieux se méfier des baisses de température dans la grotte.",
            "Des préparatifs sont nécéssaires.",
          ],
          de: [],
          jp: [],
        },
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
        classes: ["CRP", "ARM", "LTW", "CUL", "FSH"],
        image: path.resolve("./assets/red-alerts/phaenna/ra-glassrain-a.png"),
        hints: {
          en: [],
          fr: [],
          de: [],
          jp: [],
        },
      },
    ],
  },
];

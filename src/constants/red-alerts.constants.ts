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
          fr: [
            "Groupe de météorites en approche !",
            "Les installations et le matériel risquent d'être endommagés...",
            "Il faut protéger les équipements essentiels avant tout !",
          ],
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
          fr: [
            "Nuage de spores en cours de formation !",
            "Il faut l'empêcher de grossir, sinon...",
            "On risque vite de se retrouver envahis !",
          ],
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
          fr: ["Nuage de spores en cours de formation !", "On risque de ne plus rien voir !", "Restons calmes et tout se passera bien !"],
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
          fr: [
            "Une terrible tempête magnétique s'approche !",
            "J'espère qu'elle ne va pas trop perturber nos opérations...",
            "Nous devrions nous préparer au pire...",
          ],
          de: [
            "Ein gigantischer Magnetsturm ist vorhergesagt!",
            "Ob der Gütertransport dem wohl standhält..?",
            "Kümmern wir uns umgehend um Gegenmaßnahmen!",
          ],
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
          fr: [
            "Une terrible tempête magnétique s'approche !",
            "J'espère qu'elle ne va pas trop perturber nos opérations...",
            "Nous devrions nous préparer au pire...",
          ],
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
          de: [
            "Ein heftiges Unwetter ist vorhergesagt!",
            "Hoffentlich werden die Maschinen nicht beschädigt...",
            "Alle Abwehrsysteme müssen überprüft werden.",
          ],
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
          de: [
            "Eine starke Temperatursenkung aufgrund einer Kältefront ist vorhergesagt.",
            "Wir dürfen die Kälte innerhalb der Grotte nicht unterschätzen.",
            "Wir müssen immer auf alles vorbereitet sein!",
          ],
          jp: ["寒冷気流の影響で\n気温低下を予測", "洞窟内の冷え込みに\n注意しなければ", "備えねばなるまい"],
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
          en: [
            "We've got large quantities of glass rain incoming!",
            "The way the wind's blowing, the crater might suffer damage.",
            "Let's prepare for the worst and hope for the best.",
          ],
          fr: [
            "Des pluies de verre sont en approche ! Et elles vont arriver très vite !",
            "Avec un vent aussi violent, il va y avoir des dégâts dans le fond du gouffre...",
            "Il vaut mieux se préparer au pire.",
          ],
          de: [
            "Starker Glasregen ist in Kürze vorhergesagt!",
            "Diese Windrichtung... Ich mache mir Sorgen um den Kapselgrund.",
            "Lasst uns für den Notfall gewappnet sein.",
          ],
          jp: [],
        },
      },
    ],
  },
];

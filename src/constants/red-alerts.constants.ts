import * as path from "path";
import { IRedAlertType } from "../modules/models/red-alert.model";
import { JOBS } from "./jobs.constants";
import { WEATHER_EMOJIS } from "./weather.constants";

export const RED_ALERT_SINUS_ARDORUM: Array<IRedAlertType> = [
  {
    name: "Astromagnetic Storm",
    emoji: WEATHER_EMOJIS.ASTROMAGNETIC_STORM,
    image: path.resolve("./assets/red-alerts/sinus-ardorum/ra-astromagneticstorm.png"),
    variants: [
      {
        name: "Variant A",
        classes: [JOBS.MIN, JOBS.FSH, JOBS.ARM, JOBS.GSM, JOBS.ALC],
        image: path.resolve("./assets/red-alerts/sinus-ardorum/ra-astromagneticstorm-a.png"),
        hints: {
          "en-US": [
            "A massive astromagnetic storm is approaching!",
            "The delicate equipment might not make it through...",
            "We'll have to prepare for the worst!",
          ],
          fr: [
            "Une terrible tempête magnétique s'approche !",
            "Nos équipements de mesure risquent d'être endommagés...",
            "Il faut se préparer au pire !",
          ],
          de: [
            "Ein gigantischer Magnetsturm ist vorhergesagt!",
            "Für unsere Präzisionsinstrumente sieht das gar nicht gut aus ...",
            "Bereiten wir uns gebührend vor!",
          ],
          ja: ["大規模な磁気嵐が\n予測されます！", "精密機器が\n故障するかも…", "備えねばなるまい"],
        },
      },
      {
        name: "Variant B",
        classes: [JOBS.CUL, JOBS.MIN, JOBS.FSH, JOBS.CRP, JOBS.GSM, JOBS.WVR],
        image: path.resolve("./assets/red-alerts/sinus-ardorum/ra-astromagneticstorm-b.png"),
        hints: {
          "en-US": [
            "A massive astromagnetic storm is approaching!",
            "Will our transport system be able to handle it?",
            "We have to prepare immediately!",
          ],
          fr: [
            "Une terrible tempête magnétique s'approche !",
            "J'espère qu'elle ne va pas trop perturber nos opérations...",
            "Nous devrions nous préparer au pire...",
          ],
          de: [
            "Ein gigantischer Magnetsturm ist vorhergesagt!",
            "Ob der Gütertransport dem wohl standhält ...?",
            "Kümmern wir uns umgehend um Gegenmaßnahmen!",
          ],
          ja: ["大規模な磁気嵐が\n予測されます！", "物流への影響が\n心配だな…！", "対策を検討しよう"],
        },
      },
    ],
  },
  {
    name: "Meteor Shower",
    emoji: WEATHER_EMOJIS.METEOR_SHOWER,
    image: path.resolve("./assets/red-alerts/sinus-ardorum/ra-meteorshower.png"),
    variants: [
      {
        name: "Variant A",
        classes: [JOBS.BSM, JOBS.LTW, JOBS.MIN, JOBS.ARM, JOBS.GSM],
        image: path.resolve("./assets/red-alerts/sinus-ardorum/ra-meteorshower-a.png"),
        hints: {
          "en-US": [
            "A meteor shower is heading right for us!",
            "It might damage our facilities and equipment...",
            "We must safeguard the essentials first!",
          ],
          fr: [
            "Groupe de météorites en approche !",
            "Les installations et le matériel risquent d'être endommagés...",
            "Il faut protéger les équipements essentiels avant tout !",
          ],
          de: [
            "Ein Meteorschauer hat Kurs auf uns genommen!!",
            "Stationsstrukturen und Maschinerie könnten schweren Schaden davontragen ...",
            "Wir müssen den Schutz essenzieller Gerätschaften priorisieren!",
          ],
          ja: ["小隕石群の接近を感知！", "施設や機材に\n被害が出るかも…", "重要機材には\n保護を施すとしよう"],
        },
      },
      {
        name: "Variant B",
        classes: [JOBS.BSM, JOBS.ARM, JOBS.LTW, JOBS.ALC, JOBS.CUL, JOBS.BTN],
        image: path.resolve("./assets/red-alerts/sinus-ardorum/ra-meteorshower-b.png"),
        hints: {
          "en-US": [
            "A meteor shower is headed right for us!",
            "It could cause irreparable damage to the surface...",
            "We have to act swiftly and fix the problems as they arise!",
          ],
          fr: [
            "Groupe de météorites en approche !",
            "Je me demande si on peut en tirer quelque chose ?",
            "Agissons avec diligence contre cette menace !",
          ],
          de: [
            "Ein Meteorschauer hat Kurs auf uns genommen!!",
            "Es bleibt uns nur zu hoffen, dass sein Einschlag nicht alles umwirft, wofür wir gearbeitet haben ...",
            "Wir müssen flexibel bleiben und uns der Situation anpassen!",
          ],
          ja: ["小隕石群の接近を感知！", "地表への衝突で\n何がもたらされるのか…", "臨機応変にいこう！"],
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
        classes: [JOBS.BSM, JOBS.ALC, JOBS.CRP, JOBS.WVR, JOBS.BTN],
        image: path.resolve("./assets/red-alerts/sinus-ardorum/ra-sporingmist-a.png"),
        hints: {
          "en-US": [
            "There's been a sharp rise of harmful spores in the air!",
            "We have to stop them from spreading...",
            "We'll be in trouble if the spores keep multiplying...",
          ],
          fr: [
            "Nuage de spores en cours de formation !",
            "Il faut l'empêcher de grossir, sinon...",
            "On risque vite de se retrouver envahis !",
          ],
          de: [
            "Anzeichen für vermehrtes Sporenaufkommen wurden gemessen!",
            "Die Sporen müssen schnell eingedämmt werden ...",
            "Wenn die sich so weitervermehren, haben wir ein echtes Problem ...",
          ],
          ja: ["胞子霧発生の予兆を観測！", "拡大を防がないと…", "厄介な奴らが繁殖するか…！"],
        },
      },
      {
        name: "Variant B",
        classes: [JOBS.CRP, JOBS.LTW, JOBS.WVR, JOBS.CUL, JOBS.BTN, JOBS.FSH],
        image: path.resolve("./assets/red-alerts/sinus-ardorum/ra-sporingmist-b.png"),
        hints: {
          "en-US": [
            "There's been a sharp rise of harmful spores in the air!",
            "We'll barely be able to see our hands in front of our faces...",
            "We must remain calm!",
          ],
          fr: ["Nuage de spores en cours de formation !", "On risque de ne plus rien voir !", "Restons calmes et tout se passera bien !"],
          de: [
            "Anzeichen für vermehrtes Sporenaufkommen wurden gemessen!",
            "Bald vernebelt es uns die Sicht komplett.",
            "In Zeiten wie diesen müssen wir einen kühlen Kopf bewahren!",
          ],
          ja: ["胞子霧発生の予兆を観測！", "視界が悪くなりそうだ", "冷静な判断が\n求められるぞ！"],
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
        classes: [JOBS.CRP, JOBS.LTW, JOBS.ALC, JOBS.GSM, JOBS.WVR],
        image: path.resolve("./assets/red-alerts/phaenna/ra-thunderstorms-a.png"),
        hints: {
          "en-US": [
            "Severe thunderstorms are approaching!",
            "Our machinery could be in grave danger!",
            "We'll need to ensure we have ample supplies.",
          ],
          fr: [
            "Un violent orage est annoncé !",
            "Ça risque de faire des dégâts sur nos appareils...",
            "Nous devons inspecter nos dispositifs de contre-mesure.",
          ],
          de: [
            "Ein heftiges Unwetter ist vorhergesagt!",
            "Hoffentlich werden die Maschinen nicht beschädigt ...",
            "Alle Abwehrsysteme müssen überprüft werden.",
          ],
          ja: ["激しい雷雨が\n予測されます！", "機器への影響が\n心配だ…！", "対策用品を点検せねば"],
        },
      },
      {
        name: "Variant B",
        classes: [JOBS.GSM, JOBS.WVR, JOBS.BTN, JOBS.BSM, JOBS.ALC, JOBS.MIN],
        image: path.resolve("./assets/red-alerts/phaenna/ra-thunderstorms-b.png"),
        hints: {
          "en-US": [
            "Severe thunderstorms are approaching!",
            "If the storms get too close, we're in trouble...",
            "It's time we prepared the backup systems.",
          ],
          fr: [
            "Un violent orage est annoncé !",
            "Si ça arrive jusqu'ici, on est mal...",
            "Il va falloir mettre en route notre fameux système !",
          ],
          de: [
            "Ein heftiges Unwetter ist vorhergesagt!",
            "Wenn das zu nah kommt ... könnte das übel ausgehen.",
            "Ich muss das eine System noch vorbereiten.",
          ],
          ja: ["激しい雷雨が\n予測されます！", "近くに来るならば…\nマズいかもしれないな", "例のシステムの\n準備をしておこう"],
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
        classes: [JOBS.BSM, JOBS.LTW, JOBS.BTN, JOBS.CUL, JOBS.MIN, JOBS.FSH],
        image: path.resolve("./assets/red-alerts/phaenna/ra-annealingwinds-a.png"),
        hints: {
          "en-US": [
            "Annealing winds are approaching! We expect temperatures to plummet...",
            "We'll need to ensure the cave doesn't freeze over...",
            "Be ready for anything!",
          ],
          fr: [
            "Des fortes baisses de températures sont prévues !",
            "Il vaut mieux se méfier des baisses de température dans la grotte.",
            "Des préparatifs sont nécessaires.",
          ],
          de: [
            "Eine starke Temperatursenkung aufgrund einer Kältefront ist vorhergesagt!",
            "Wir dürfen die Kälte innerhalb der Grotte nicht unter­schätzen.",
            "Wir müssen immer auf alles vorbereitet sein!",
          ],
          ja: ["寒冷気流の影響で\n気温低下を予測！", "洞窟内の冷え込みに\n注意しなければ", "備えねばなるまい"],
        },
      },
      {
        name: "Variant B",
        classes: [JOBS.ARM, JOBS.CUL, JOBS.FSH, JOBS.CRP, JOBS.BTN],
        image: path.resolve("./assets/red-alerts/phaenna/ra-annealingwinds-b.png"),
        hints: {
          "en-US": [
            "Annealing winds are on their way... Expect severe drops in temperature.",
            "The frigid air might force a system shutdown...",
            "Best we prepare a few contingency plans.",
          ],
          fr: [
            "Des fortes baisses de températures sont prévues !",
            "Je crains que la chute de la température ne cause des pannes électriques...",
            "Essayons de réfléchir à un plan de secours !",
          ],
          de: [
            "Eine starke Temperatursenkung aufgrund einer Kältefront ist vorhergesagt!",
            "Wenn es zu sehr abkühlt, könnte das die Systeme abschalten.",
            "Ein Plan B für alle Fälle würde nicht schaden.",
          ],
          ja: ["寒冷気流の影響で\n気温低下を予測！", "低温化による\nシステムダウンが心配だ", "バックアッププランも\n検討しよう"],
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
        classes: [JOBS.CRP, JOBS.ARM, JOBS.LTW, JOBS.CUL, JOBS.FSH],
        image: path.resolve("./assets/red-alerts/phaenna/ra-glassrain-a.png"),
        hints: {
          "en-US": [
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
            "Diese Windrichtung ... Ich mache mir Sorgen um den Kapselgrund.",
            "Lasst uns für den Notfall gewappnet sein.",
          ],
          ja: [
            "グラスレインの発生を観測！\nもうじき到来します！",
            "この風向きでは\n大穴下がマズそうだな…",
            "もしもに備えて\n準備をしておこう",
          ],
        },
      },
      {
        name: "Variant B",
        classes: [JOBS.BSM, JOBS.WVR, JOBS.ALC, JOBS.ARM, JOBS.GSM, JOBS.MIN],
        image: path.resolve("./assets/red-alerts/phaenna/ra-glassrain-b.png"),
        hints: {
          "en-US": [
            "We've observed an oncoming glass dust storm...",
            "Take care not to slip on the dust as it approaches.",
            "Right. Safety first. Act with due caution.",
          ],
          fr: [
            "Des pluies de verre sont en approche ! Et elles vont arriver très vite !",
            "Attention à ne pas glisser à cause de la poussière de verre !",
            "Nous devons rappeler à chacun d'assurer sa sécurité avant tout.",
          ],
          de: [
            "Starker Glasregen ist in Kürze vorhergesagt!",
            "Der Staub macht den Boden ziemlich rutschig. Seid vorsichtig!",
            "Denkt immer dran: Sicherheit geht vor!",
          ],
          ja: [
            "グラスレインの発生を観測！\nもうじき到来します！",
            "粉塵によるスリップも\n十分注意せねば",
            "安全第一の判断を\n呼びかけるとしよう",
          ],
        },
      },
    ],
  },
];

export const RED_ALERT_OIZYS: Array<IRedAlertType> = [
  {
    name: "Bubble Bloom",
    emoji: WEATHER_EMOJIS.BUBBLE_BLOOM,
    image: path.resolve("./assets/red-alerts/oizys/ra-bubblebloom.png"),
    variants: [
      {
        name: "Variant A",
        classes: [JOBS.CRP, JOBS.CUL, JOBS.BTN, JOBS.GSM, JOBS.MIN, JOBS.FSH],
        image: path.resolve("./assets/red-alerts/oizys/ra-bubblebloom-a.png"),
        hints: {
          "en-US": [
            "Our sensors indicate a floating seawater event is in progress.",
            'One of those "bubble blooms," is it?',
            "Oizys is in a dramatic—albeit brief—shift in conditions.",
          ],
        },
      },
    ],
  },
  {
    name: "Gravitational Anomaly",
    emoji: WEATHER_EMOJIS.GRAVITATIONAL_ANOMALY,
    image: path.resolve("./assets/red-alerts/oizys/ra-gravitationalanomaly.png"),
    variants: [
      {
        name: "Variant A",
        classes: [JOBS.ARM, JOBS.GSM, JOBS.WVR, JOBS.BSM, JOBS.LTW],
        image: path.resolve("./assets/red-alerts/oizys/ra-gravitationalanomaly-a.png"),
        hints: {
          "en-US": [
            "We're detecting an increase in local gravity fluctuations!",
            "What happens if these gravitational phenomena keep getting worse...?",
            "Let's keep our eyes open, shall we?",
          ],
        },
      },
    ],
  },
  {
    name: "Gale-force Winds",
    emoji: WEATHER_EMOJIS.GALEFORCE_WINDS,
    image: path.resolve("./assets/red-alerts/oizys/ra-galeforcewinds.png"),
    variants: [
      {
        name: "Variant A",
        classes: [JOBS.FSH, JOBS.CRP, JOBS.ALC, JOBS.ARM, JOBS.LTW, JOBS.CUL],
        image: path.resolve("./assets/red-alerts/oizys/ra-galeforcewinds-a.png"),
      },
    ],
  },
];

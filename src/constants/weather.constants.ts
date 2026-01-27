import { IWeatherData } from "../modules/models/weather-report.model";

export const WEATHER_EMOJIS = {
  ANNEALING_WINDS: "<:annealingwinds:1412459057410740274>",
  ASTROMAGNETIC_STORM: "<:astromagneticstorm:1369563775719575624>",
  BUBBLE_BLOOM: "<:bubblebloom:1465657179762851951>",
  CLOUDS: "<:clouds:1412390614875639808>",
  FAIR_SKIES: "<:fairskies:1369561680278978631>",
  GLASSRAIN: "<:glassrain:1412771742128013433>",
  GRAVITATIONAL_ANOMALY: "<:gravitationalanomaly:1465661474188951552>",
  METEOR_SHOWER: "<:meteorshower:1369565029824860211>",
  MOON_DUST: "<:moondust:1369561645151551558>",
  RAIN: "<:rain:1412487034723106958>",
  SPORING_MIST: "<:sporingmist:1369565042231611412>",
  THUNDERSTORMS: "<:thunderstorm:1412394500319477840>",
  UMBRAL_WIND: "<:umbralwind:1369561668132274177>",
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
export const PHAENNA_WEATHER: Array<IWeatherData> = [
  {
    rate: 60,
    emoji: WEATHER_EMOJIS.FAIR_SKIES,
    name: "Fair Skies",
    important: false,
  },
  {
    rate: 80,
    emoji: WEATHER_EMOJIS.CLOUDS,
    name: "Clouds",
    important: true,
  },
  {
    rate: 100,
    emoji: WEATHER_EMOJIS.RAIN,
    name: "Rain",
    important: true,
  },
];
export const OIZYS_WEATHER: Array<IWeatherData> = [
  {
    rate: 100,
    emoji: WEATHER_EMOJIS.FAIR_SKIES,
    name: "Unknown",
    important: false,
  },
];

export const ALARM_SOUNDS = [
  { name: "Bell", value: "se00" },
  { name: "Music Box", value: "se01" },
  { name: "Prelude", value: "se02" },
  { name: "Chocobo", value: "se03" },
  { name: "La Noscea", value: "se04" },
  { name: "Festival", value: "se05" },
];

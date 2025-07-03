import { IWeatherData } from "../modules/models/weather-report.model";

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

export const ALARM_SOUNDS = [
  { name: "Bell", value: "se00" },
  { name: "Music Box", value: "se01" },
  { name: "Prelude", value: "se02" },
  { name: "Chocobo", value: "se03" },
  { name: "La Noscea", value: "se04" },
  { name: "Festival", value: "se05" },
];

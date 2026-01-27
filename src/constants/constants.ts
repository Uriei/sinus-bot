import * as dotenv from "dotenv";
dotenv.config();

export const TESTING_ENV = process.env.ENV === "TESTING";

export const CHANNEL_REDALERT_COOLDOWN = TESTING_ENV ? 0 : 30 * 1000; // Milliseconds
export const FALSE_ALARM_REQUIRED_COUNT = 3;

export const LANGS = {
  "en-US": "English",
  de: "Deutsch",
  fr: "Français",
  ja: "日本語",
};

export const ALARM_SOUNDS = [
  { name: "Bell", value: "se00" },
  { name: "Music Box", value: "se01" },
  { name: "Prelude", value: "se02" },
  { name: "Chocobo", value: "se03" },
  { name: "La Noscea", value: "se04" },
  { name: "Festival", value: "se05" },
];

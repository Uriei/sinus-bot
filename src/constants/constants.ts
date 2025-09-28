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

import * as dotenv from "dotenv";
dotenv.config();

const TESTING = process.env.ENV === "TESTING";

export const CHANNEL_REDALERT_COOLDOWN = TESTING ? 0 : 30 * 1000; // Milliseconds
export const FALSE_ALARM_REQUIRED_COUNT = 3;

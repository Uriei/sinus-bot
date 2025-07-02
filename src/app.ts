import * as dotenv from "dotenv";
dotenv.config();
import { Discord } from "./modules/discord/discord";
import { Log } from "./modules/logging";
import { WeatherPresenceService } from "./services/weather-presence.service";

let discord: Discord;
let weatherPresenceService: WeatherPresenceService;

async function app() {
  discord = await Discord.getInstance();
  weatherPresenceService = await WeatherPresenceService.getInstance();
  weatherPresenceService.start(60000);
  Log.log("Sinus Bot online.");
}

async function shutdown() {
  discord.setPresence("idle");
  Log.log("Closing Sinus Bot.");
  // Stop all timeout intervals
  discord.disconnect();
  clearInterval(discord.discordKeepAliveInterval);
  clearInterval(weatherPresenceService.timeoutCallback);

  Log.log("Sinus Bot offline.");
  process.exit(0);
}

process.on("SIGBREAK", shutdown);
process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);

app();

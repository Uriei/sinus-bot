import * as dotenv from "dotenv";
dotenv.config();
import { Discord } from "./modules/discord/discord";
import { setLogLevel } from "./modules/logging";
import { WeatherPresenceService } from "./services/weather-presence.service";
setLogLevel();

let discord: Discord;
let weatherPresenceService: WeatherPresenceService;

async function app() {
  discord = await Discord.getInstance();
  weatherPresenceService = await WeatherPresenceService.getInstance();
  weatherPresenceService.start(60000);
  console.log("Sinus Bot online.");
}

async function shutdown() {
  discord.setPresence("idle");
  console.log("Closing Sinus Bot.");
  // Stop all timeout intervals
  discord.disconnect();
  clearInterval(discord.discordKeepAliveInterval);
  clearInterval(weatherPresenceService.timeoutCallback);

  console.log("Sinus Bot offline.");
  process.exit(0);
}

process.on("SIGBREAK", shutdown);
process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);

app();

import { ActivityType, Client, Events, GatewayIntentBits, MessageFlags, PresenceStatusData, REST, Routes } from "discord.js";
import { readdirSync as fsReaddirSync } from "fs";
import { get as _get, has as _has, set as _set } from "lodash";
import * as path from "path";
import { IChannelRedAlertCooldown } from "../models/red-alert.model";

class Discord {
  private static _discordKeepAliveInterval: NodeJS.Timeout;
  public get discordKeepAliveInterval(): NodeJS.Timeout {
    return Discord._discordKeepAliveInterval;
  }

  private static instance: Discord;
  private client: Client;
  private slashCommands: {
    [key: string]: {
      data: any;
      execute: any;
      autocomplete: any;
    };
  };
  private slashCommandsAdmin: {
    [key: string]: {
      data: any;
      execute: any;
      autocomplete: any;
    };
  };
  private botToken: string = "";
  private botClientId: string = "";

  public static channelRedAlertCooldown: IChannelRedAlertCooldown = {};

  private constructor() {
    this.getCredentialInfo();
    this.client = new Client({ intents: [GatewayIntentBits.Guilds], allowedMentions: { parse: ["users", "roles"], repliedUser: true } });
    this.client.on("warn", console.warn);
    this.slashCommands = {};
    this.slashCommandsAdmin = {};
    this.fillSlashCommands();
    this.registerSlashCommandsDiscord();
    this.registerSlashCommandsAdminDiscord();
    this.registerSlashCommandsInteractions();

    this.login().then().catch();

    Discord._discordKeepAliveInterval = setInterval(() => {
      if (!this.client.isReady()) {
        this.login().then().catch();
      }
    }, 300000);
  }

  public static getInstance(): Promise<Discord> {
    if (Discord.instance) {
      return Promise.resolve(Discord.instance);
    } else {
      Discord.instance = new Discord();
      return Promise.resolve(Discord.instance);
    }
  }

  private fillSlashCommands() {
    const commandsPath = path.join(__dirname, "commands");
    const commandFiles = fsReaddirSync(commandsPath).filter((file) => file.endsWith(".js"));

    for (const file of commandFiles) {
      const filePath = path.join(commandsPath, file);
      const command = require(filePath)?.default || {};
      // Set a new item in the Collection with the key as the command name and the value as the exported module
      if ("data" in command && "execute" in command) {
        _set(filePath.includes("admin-") ? this.slashCommandsAdmin : this.slashCommands, [command.data.name, "execute"], command.execute);
        _set(
          filePath.includes("admin-") ? this.slashCommandsAdmin : this.slashCommands,
          [command.data.name, "autocomplete"],
          command.autocomplete
        );
        _set(filePath.includes("admin-") ? this.slashCommandsAdmin : this.slashCommands, [command.data.name, "data"], command.data);
      } else {
        console.warn(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
      }
    }
  }

  private registerSlashCommandsInteractions() {
    this.client.on(Events.InteractionCreate, async (interaction) => {
      if (interaction.isChatInputCommand()) {
        const command = _get({ ...this.slashCommands, ...this.slashCommandsAdmin }, [interaction.commandName, "execute"]);
        if (!command) {
          console.error(`No command matching ${interaction.commandName} was found.`);
          return;
        }

        try {
          await command.execute(interaction);
        } catch (error) {
          console.error(error);
          await interaction.reply({
            content: "There was an error while executing this command!",
            flags: MessageFlags.Ephemeral,
          });
        }
      } else if (interaction.isAutocomplete()) {
        const command = _get({ ...this.slashCommands, ...this.slashCommandsAdmin }, [interaction.commandName, "autocomplete"]);
        if (!command) {
          return;
        }

        try {
          await command.autocomplete(interaction);
        } catch (error) {
          console.error(error);
        }
      } else {
        return;
      }
    });
  }

  private async registerSlashCommandsDiscord() {
    const rest = new REST({ version: "10" }).setToken(this.botToken);
    const commands = [];
    for (const command of Object.keys(this.slashCommands)) {
      if (_has(this.slashCommands, [command, "data"])) {
        commands.push(_get(this.slashCommands, [command, "data"]));
      }
    }

    try {
      const data = (await rest.put(Routes.applicationCommands(this.botClientId), {
        body: commands,
      })) as Array<any>;
      console.log(`Loaded ${data.length} SlashCommands.`);
    } catch (error) {
      console.error("Error loading SlashCommands", error);
    }
  }
  private async registerSlashCommandsAdminDiscord() {
    const DEV_GUILD_ID = process.env.DEV_GUILD_ID || "";
    if (!DEV_GUILD_ID) {
      return;
    }
    const rest = new REST({ version: "10" }).setToken(this.botToken);
    const commands = [];
    for (const command of Object.keys(this.slashCommandsAdmin)) {
      if (_has(this.slashCommandsAdmin, [command, "data"])) {
        commands.push(_get(this.slashCommandsAdmin, [command, "data"]));
      }
    }

    try {
      const data = (await rest.put(Routes.applicationGuildCommands(this.botClientId, DEV_GUILD_ID), {
        body: commands,
      })) as Array<any>;
      console.log(`Loaded ${data.length} admin SlashCommands.`);
    } catch (error) {
      console.error("Error loading Admin SlashCommands", error);
    }
  }

  private getCredentialInfo() {
    if (process.env.DISCORD_BOT_TOKEN && process.env.DISCORD_CLIENT_ID) {
      console.log("Discord credentials found on Environment.");
      this.botToken = process.env.DISCORD_BOT_TOKEN || "";
      this.botClientId = process.env.DISCORD_CLIENT_ID || "";
    } else {
      console.error("Discord credentials not found on Environment.");
      process.exit(1);
    }
  }

  async login() {
    if (!this.botToken) {
      this.getCredentialInfo();
    }
    const res = await this.client.login(this.botToken);

    if (res) {
      console.log("Discord logged in.");
    } else {
      console.error("Discord login failed.");
    }
    return res;
  }

  public disconnect() {
    this.client.destroy();
  }

  public setPresence(status: PresenceStatusData = "online", customPresence?: string): void {
    let activities = [];
    if (status !== "online") {
      activities = [
        {
          name: "Restarting...",
          type: ActivityType.Custom,
          state: "Restarting...",
        },
      ];
    } else {
      activities = [
        {
          name: "Sinus Ardorum weather forecast...",
          type: customPresence ? ActivityType.Custom : ActivityType.Watching,
          state: customPresence,
        },
      ];
    }
    this.client.user?.setPresence({
      status: status,
      afk: status !== "online",
      activities: activities,
    });
  }
}

export { Discord };

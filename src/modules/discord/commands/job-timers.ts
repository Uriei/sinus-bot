import { AutocompleteInteraction, ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

// TODO
export default {
  data: new SlashCommandBuilder(),

  execute: {
    async execute(interaction: ChatInputCommandInteraction) {},
  },
  autocomplete: {
    async autocomplete(interaction: AutocompleteInteraction) {},
  },
};

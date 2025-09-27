import {
  ActionRowBuilder,
  AutocompleteInteraction,
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
} from "discord.js";
import { STARS_DATA } from "../../../constants/stars.constants";

// TODO
export default {
  data: new SlashCommandBuilder()
    .setName("job-timers")
    .setDescription("Prints the commands to set an ingame alarm for Time-Limited missions for the jobs selected."),
  execute: {
    async execute(interaction: ChatInputCommandInteraction) {
      const select = new StringSelectMenuBuilder()
        .setCustomId("starter")
        .setPlaceholder("Make a selection!")
        .addOptions(
          new StringSelectMenuOptionBuilder()
            .setLabel("Bulbasaur")
            .setDescription("The dual-type Grass/Poison Seed Pokémon.")
            .setValue("bulbasaur"),
          new StringSelectMenuOptionBuilder().setLabel("Charmander").setDescription("The Fire-type Lizard Pokémon.").setValue("charmander"),
          new StringSelectMenuOptionBuilder()
            .setLabel("Squirtle")
            .setDescription("The Water-type Tiny Turtle Pokémon.")
            .setValue("squirtle")
        );

      const row = new ActionRowBuilder().addComponents(select);

      await interaction.reply({
        content: "Choose your starter!",
        components: [row],
      });
    },
  },
  autocomplete: {
    async autocomplete(interaction: AutocompleteInteraction) {},
  },
};

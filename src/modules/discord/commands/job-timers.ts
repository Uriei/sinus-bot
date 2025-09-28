import {
  ActionRowBuilder,
  AutocompleteInteraction,
  BitFieldResolvable,
  ButtonBuilder,
  ButtonStyle,
  ChatInputCommandInteraction,
  EmbedBuilder,
  MessageFlags,
  SelectMenuOptionBuilder,
  SlashCommandBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuInteraction,
  StringSelectMenuOptionBuilder,
} from "discord.js";
import { TESTING_ENV } from "../../../constants/constants";
import { JOB_EMOJIS, JOB_NAMES, JOBS, TIMERESTRICTED_MISSIONS } from "../../../constants/jobs.constants";
import { STARS, STARS_DATA } from "../../../constants/stars.constants";
import { formatJobTimersForDiscord, formatJobTimersMacroAlarm, generateMessageEmbed } from "../../utils";

export default {
  data: new SlashCommandBuilder()
    .setName("job-timers")
    .setDescription("Prints the commands to set an ingame alarm for Time-Limited missions for the jobs selected.")
    .addStringOption((stringOption) =>
      stringOption
        .setName("star")
        .setDescription("Select Star Job timers")
        .setRequired(true)
        .setChoices(Object.values(STARS).map((s) => ({ name: STARS_DATA[s].name, value: s })))
    ),
  execute: {
    async execute(interaction: ChatInputCommandInteraction) {
      const star = interaction.options.getString("star");
      const starName = STARS_DATA[star].name;
      let flags: BitFieldResolvable<"Ephemeral", MessageFlags.Ephemeral> = [];
      if (interaction.inGuild()) {
        flags = MessageFlags.Ephemeral;
      }
      await interaction.deferReply({ flags });

      let options = generateJobOptions(star);
      const jobSelection = new StringSelectMenuBuilder()
        .setCustomId("jobs")
        .setPlaceholder("Make a selection!")
        .addOptions(options)
        .setMinValues(1)
        .setMaxValues(options.length);
      const selectorRow = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(jobSelection);

      const reply = await interaction.editReply({
        embeds: generateMessageEmbed(
          `${starName} Time-Restricted Missions`,
          "Select the jobs for which you want to set the timers on the selector below."
        ),
        components: [selectorRow],
      });

      let selectedJobs = [];
      reply.createMessageComponentCollector().on("collect", async (c: StringSelectMenuInteraction) => {
        if (c.customId === "jobs") {
          await c.deferUpdate();
          selectedJobs = c.values;
          options = updateJobSelection(options, selectedJobs);
          await interaction.editReply({
            content: "",
            embeds: formatJobTimersForDiscord(star, selectedJobs),
            components: [selectorRow, convertToMacroButton()],
          });
        } else if (c.customId === "jobTimers-macro") {
          await c.deferUpdate();
          options = updateJobSelection(options, selectedJobs);
          await interaction.editReply({
            content: "",
            embeds: formatJobTimersMacroAlarm(star, selectedJobs),
            components: [selectorRow],
          });
        }
      });
    },
  },
  autocomplete: {
    async autocomplete(interaction: AutocompleteInteraction) {},
  },
};

function generateJobOptions(star: string): SelectMenuOptionBuilder[] {
  const options: SelectMenuOptionBuilder[] = [];
  for (const job in JOBS) {
    const newOption = new StringSelectMenuOptionBuilder().setLabel(job).setDescription(JOB_NAMES[job]).setValue(job);
    if (!TESTING_ENV) {
      // Yes, because DiscordJS explodes if I send the wrong emoji ID, so in my test environment it breaks.
      newOption.setEmoji(JOB_EMOJIS[job]);
    }

    options.push(newOption);
  }

  return options;
}

function updateJobSelection(options: SelectMenuOptionBuilder[], values: string[]): SelectMenuOptionBuilder[] {
  for (const op of options) {
    op.setDefault(values.includes(op.data.value));
  }

  return options;
}
function convertToMacroButton(): ActionRowBuilder<ButtonBuilder> {
  const actionRow = new ActionRowBuilder<ButtonBuilder>();
  const button = new ButtonBuilder().setCustomId(`jobTimers-macro`).setLabel(`Convert to Macro`).setStyle(ButtonStyle.Primary);
  actionRow.addComponents(button);
  return actionRow;
}

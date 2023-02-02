import { ChatInputCommand, Command } from "@sapphire/framework";
import { isMessageInstance } from "@sapphire/discord.js-utilities";
import { Message, EmbedBuilder, ApplicationCommandManager, ActionRowBuilder, Events, StringSelectMenuBuilder, ActionRow, ApplicationCommandType } from "discord.js";
import { ApplyOptions } from "@sapphire/decorators";

@ApplyOptions<Command.Options>({
  preconditions: ["blacklistCheck"],
})
export class HelpCommand extends Command {
  public override registerApplicationCommands(registry: ChatInputCommand.Registry) {
    registry.registerChatInputCommand((builder) =>
      builder
        .setName("help")
        .setDescription("Generate a list of commands")
        .addStringOption((option) =>
          option.setName("command").setDescription("The command that you want to see more info on.").setChoices({ name: "ping", value: "ping" }, { name: "ah", value: "ah" })
        )
        .addStringOption((option) => option.setName("module").setDescription("The moudle that you want to see more info on."))
    );
  }

  public async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
    let categories = this.container.stores.get("commands").categories.filter((c) => c !== "dev");
    let str = "";
    categories.reverse().map((c) => (str += `\`${c}\`, `));
    str = str.substring(0, str.length - 2);
    let embed = new EmbedBuilder()
      .setAuthor({ name: "Help", iconURL: this.container.client.user.displayAvatarURL() })
      .setDescription(
        "Commands are put into categories named `modules`. Using the selection menu you can get a list of commands under a module. If further assistance is needed feel free to join our [support server](https://discord.gg/komibot)."
      )
      .setFields({ name: "Modules", value: str })
      .setTimestamp()
      .setColor("#91e3e2")
      .setFooter({
        text: "Use /help <module> to get more detail on a module.",
      });

    // Get more info on a command or module
    const getCommand = interaction.options.getString("command", false);
    const getModule = interaction.options.getString("module", false);

    if (getCommand) {
      const command = this.container.stores.get("commands").get(getCommand);
      const embed = new EmbedBuilder()
        // .setAuthor({ name: interaction.user.username, iconURL: interaction.user.avatarURL() })
        .setTitle(command.name)
        // `${command.aliases.length >= 1 ? command.aliases : "There's no available aliases."}
        .setDescription(`${command.description}`)
        .setColor("#91e3e2")
        .setFooter({
          text: "Optional params showed in []",
        });
      return await interaction.reply({ embeds: [embed] });
    }

    if (getModule) {
      let description: string = "";
      const module = this.container.stores
        .get("commands")
        .categories.filter((c) => c)
        .includes(getModule);
      console.log(module);

      switch (getModule) {
        case "economy": {
          description = "testers";
          break;
        }
        case "general": {
          description = "yeppers";
          break;
        }
        default: {
          description = "That module doesn't exist.";
        }
      }

      const embed = new EmbedBuilder()
        .setAuthor({ name: interaction.user.username, iconURL: interaction.user.avatarURL() })
        .setTitle(module ? getModule : "Module not found")
        .setDescription(description)
        .setColor(module ? "#91e3e2" : "#a8324a");
      return await interaction.reply({ embeds: [embed] });
    }

    // Row Builder
    let options = [];
    for (let i = 0; i < categories.length; i++) {
      options.push({
        label: categories[i].charAt(0).toUpperCase() + categories[i].slice(1),
        value: categories[i],
      });
    }

    const selectMenu = new StringSelectMenuBuilder().setCustomId("select").setPlaceholder("Nothing selected").addOptions(options);

    const row = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(selectMenu);

    await interaction.reply({ embeds: [embed], components: [row] });
  }
}

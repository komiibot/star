import { ChatInputCommand, Command } from "@sapphire/framework";
import { ApplyOptions } from "@sapphire/decorators";
import { CustomEmbed } from "#utils/embed";
import axios from "axios";
import { wrapCodeBlock } from "#utils/codeblock";

@ApplyOptions<Command.Options>({
  preconditions: ["blacklistCheck"],
})
export class TriviaCommand extends Command {
  public override registerApplicationCommands(registry: ChatInputCommand.Registry) {
    registry.registerChatInputCommand((builder) =>
      builder
        .setName("trivia")
        .setDescription("Answer trivia questions to earn some currency")
    );
  }

  public async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
    try {
      await interaction.deferReply();

      const response = await axios.get("https://opentdb.com/api.php?amount=1");
      console.log(response.data)
      
      return interaction.editReply({ content: `${JSON.stringify(response.data)}` })
    } catch (e) {
      await this.container.log.error("commands.economy", `Something went wrong with command: trivia\n${e.stack}`);
      await interaction.editReply({
        embeds: [new CustomEmbed(true, "Something went wrong trying to run the command.").setFooter({ text: "This has been logged to our developers." })],
      });
    }
  }
}

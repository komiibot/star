import { ChatInputCommand, Command } from "@sapphire/framework";
import { isMessageInstance } from "@sapphire/discord.js-utilities";
import { ApplyOptions } from "@sapphire/decorators";

@ApplyOptions<Command.Options>({
  preconditions: ["blacklistCheck"],
})
export class PollCommand extends Command {
  public override registerApplicationCommands(registry: ChatInputCommand.Registry) {
    registry.registerChatInputCommand((builder) => builder.setName("poll").setDescription("Create a poll for members to react to."));
  }

  public async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
    console.log("lel");
  }
}

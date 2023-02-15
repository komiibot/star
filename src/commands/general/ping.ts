import { ChatInputCommand, Command } from "@sapphire/framework";
import { isMessageInstance } from "@sapphire/discord.js-utilities";
import { ApplyOptions } from "@sapphire/decorators";
import { Message } from "discord.js";

@ApplyOptions<Command.Options>({
  preconditions: ["blacklistCheck"],
  description: "Ping the bot to see if it is alive.",
})
export class PingCommand extends Command {
  public override registerApplicationCommands(registry: ChatInputCommand.Registry) {
    registry.registerChatInputCommand((builder) => builder.setName("ping").setDescription("Ping the bot to see if it is alive."));
  }

  public async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
    const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true });
    interaction.editReply(`Pong! ${sent.createdTimestamp - interaction.createdTimestamp}ms`);
  }

  public async messageRun(msg: Message) {
    const sent = await msg.channel.send({ content: 'Pinging...' });
    sent.edit(`Pong! ${sent.createdTimestamp - msg.createdTimestamp}ms`);
  }
}

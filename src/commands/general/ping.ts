import { ChatInputCommand, Command } from "@sapphire/framework";
import { isMessageInstance } from "@sapphire/discord.js-utilities";
import { ApplyOptions } from "@sapphire/decorators";

@ApplyOptions<Command.Options>({
  preconditions: ["blacklistCheck"],
  description: "Ping the bot to see if it is alive.",
})
export class PingCommand extends Command {
  public override registerApplicationCommands(registry: ChatInputCommand.Registry) {
    registry.registerChatInputCommand((builder) => builder.setName("ping").setDescription("Ping the bot to see if it is alive."));
  }

  public async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
    const msg = await interaction.reply({ content: `Pinging...`, ephemeral: true, fetchReply: true });

    if (isMessageInstance(msg)) {
      const diff = msg.createdTimestamp - interaction.createdTimestamp;
      const ping = Math.round(this.container.client.ws.ping);
      return interaction.editReply(`Pong!\nBOT: ${ping}ms. \nWS: ${diff}ms.`);
    }

    return interaction.editReply("Something went wrong when trying to recieve the ping.");
  }
}

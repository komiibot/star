import { Events, Listener, type ChatInputCommandErrorPayload } from '@sapphire/framework';

export class ChatInputCommandError extends Listener<typeof Events.ChatInputCommandError> {
  public run(error: Error, payload: ChatInputCommandErrorPayload) {
    return this.container.log.error(
      "Events.Commands",
      `${error}\n${payload.command.name} was ran by ${payload.interaction.user.tag} (${payload.interaction.user.id}) in ${payload.interaction.guild.name} (${payload.interaction.guild.id})`
    );
  }
}

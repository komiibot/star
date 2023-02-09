import { Events, Listener, type ChatInputCommandDeniedPayload, type UserError } from "@sapphire/framework";

export class ChatInputCommandDenied extends Listener<typeof Events.ChatInputCommandDenied> {
  public run(error: UserError, payload: ChatInputCommandDeniedPayload) {
    return this.container.log(
      "error",
      "Events.Commands",
      `${error}\n${payload.command.name} was ran by ${payload.interaction.user.tag} (${payload.interaction.user.id}) in ${payload.interaction.guild.name} (${payload.interaction.guild.id})`,
      { timestamp: true }
    );
  }
}

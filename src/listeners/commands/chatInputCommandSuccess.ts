import { Events, Listener, LogLevel, type ChatInputCommandSuccessPayload } from "@sapphire/framework";

export class ChatInputCommandSuccess extends Listener<typeof Events.ChatInputCommandSuccess> {
  public override run(payload: ChatInputCommandSuccessPayload) {
    return this.container.log.custom(
      "Events.Commands",
      `${payload.command.name} was ran by ${payload.interaction.user.tag} (${payload.interaction.user.id}) in ${payload.interaction.guild.name} (${payload.interaction.guild.id})`
    );
  }

  //   public override onLoad() {
  //     this.enabled = true;
  //     if (!this.enabled) return this.unload();
  //   }
}

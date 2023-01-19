import { Precondition } from '@sapphire/framework';
import type { CommandInteraction, ContextMenuCommandInteraction, Message } from 'discord.js';

export class DeveloperOnlyPrecondition extends Precondition {
  public override async messageRun(message: Message) {
    return this.checkUser(message.author.id);
  }

  public override async chatInputRun(interaction: CommandInteraction) {
    return this.checkUser(interaction.user.id);
  }

  public override async contextMenuRun(interaction: ContextMenuCommandInteraction) {
    return this.checkUser(interaction.user.id);
  }

  private async checkUser(userId: string) {
    return process.env.DEVELOPERS.split(", ").includes(userId)
      ? this.ok()
      : this.error()
  }
}
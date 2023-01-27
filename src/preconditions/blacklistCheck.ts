import { Precondition } from '@sapphire/framework';
import { CommandInteraction, ContextMenuCommandInteraction, Message } from 'discord.js';

export class BlacklistPrecondition extends Precondition {
  public override async messageRun(msg: Message) {
    return this.checkUser(msg);
  }

  public override async chatInputRun(interaction: CommandInteraction) {
    return this.checkUser(interaction);
  }

  public override async contextMenuRun(interaction: ContextMenuCommandInteraction) {
    return this.checkUser(interaction);
  }

  private async checkUser(user: Message | CommandInteraction | ContextMenuCommandInteraction) {
    const mem = await this.container.prisma.users.findFirst({
      where: {
        id: user.member.user.id as string
      }
    });

    if (mem.blacklisted === true) {
      user.reply({ content: "You have been blacklisted from Komi. If you think you have been wrongfully blacklisted, please join our support server: https://discord.gg/komibot", ephemeral: true });
      return this.error({ message: "You have been blacklisted from Komi. If you think you have been wrongfully blacklisted, please join our support server: https://discord.gg/komibot" })
    }
    
    return this.ok();
  }
}
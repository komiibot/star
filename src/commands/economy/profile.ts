import { ChatInputCommand, Command } from "@sapphire/framework";
import { ApplyOptions } from "@sapphire/decorators";
import { CustomEmbed } from "#utils/embed";

@ApplyOptions<Command.Options>({
  preconditions: ["blacklistCheck"],
})
export class ProfileCommand extends Command {
  public override registerApplicationCommands(registry: ChatInputCommand.Registry) {
    registry.registerChatInputCommand((builder) =>
      builder
        .setName("profile")
        .setDescription("Check your profile.")
        .addUserOption((option) => option.setName("user").setDescription("Check out another users profile.").setRequired(false))
    );
  }

  public async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
    await interaction.deferReply();

    const getUser = interaction.options.getUser("user");

    const user = await this.container.prisma.economy.findFirst({
      where: {
        userId: getUser ? getUser.id : interaction.user.id,
      },
    });

    const users = await this.container.prisma.users.findFirst({
      where: {
        id: getUser ? getUser.id : interaction.user.id,
      },
    });

    let badge: string = "";

    if (process.env.BOT_OWNER.split(", ").includes(interaction.user.id) && !getUser) {
      badge = "<:admin:1070787895104905267><:developer:1070786891600900216>";
    }

    switch (users.userType) {
      case "DEVELOPER": {
        badge = "<:developer:1070786891600900216> ";
        break;
      }
      case "STAFF": {
        badge = "<:moderator:1070578062363721749>";
        break;
      }
      case "PREMIUM": {
        badge = "<:premium:1070578064179875860>";
        break;
      }
    }

    const name = getUser ? getUser.username : interaction.user.username;

    try {
      await interaction.editReply({
        embeds: [
          new CustomEmbed()
            .setDescription(`${badge ? badge : "No badges"}`)
            .setAuthor({ name: `${name}`, iconURL: getUser ? getUser.displayAvatarURL() : interaction.user.displayAvatarURL() }),
        ],
      });
    } catch (e) {
      await this.container.log("error", "commands.economy", `Something went wrong with command: stats\n${e.stack}`, { timestamp: true, client: this.container.client });
      return await interaction.editReply({
        embeds: [new CustomEmbed(true, "Something went wrong trying to run the command.").setFooter({ text: "This has been logged to our developers." })],
      });
    }
  }
}

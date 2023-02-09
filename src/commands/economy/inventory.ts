import { ChatInputCommand, Command } from "@sapphire/framework";
import { ApplyOptions } from "@sapphire/decorators";
import { CustomEmbed } from "#utils/embed";

@ApplyOptions<Command.Options>({
  preconditions: ["blacklistCheck"],
})
export class InventoryCommand extends Command {
  public override registerApplicationCommands(registry: ChatInputCommand.Registry) {
    registry.registerChatInputCommand((builder) => builder.setName("inventory").setDescription("Get a list of the items in your inventory."));
  }

  public async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
    // await interaction.deferReply();

    const user = await this.container.prisma.inventory.findMany({
      where: {
        userId: interaction.user.id,
      },
    });

    const items = user.map((x) => x.item);

    await interaction.reply({
      embeds:
        items.length >= 1 ? [new CustomEmbed().setDescription(items.join(", ")).setColor()] : [new CustomEmbed().setDescription("You have no items in your inventory").setColor()],
    });
  }
}

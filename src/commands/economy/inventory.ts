import { ChatInputCommand, Command } from '@sapphire/framework';
import { ApplyOptions } from '@sapphire/decorators';

@ApplyOptions<Command.Options>({
	preconditions: ["blacklistCheck"]
})

export class PollCommand extends Command {
    public override registerApplicationCommands(registry: ChatInputCommand.Registry) {
        registry.registerChatInputCommand((builder) =>
          builder.setName('inventory').setDescription('Get a list of the items in your inventory.')
        );
      }
    
      public async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
        await interaction.deferReply();

        const user = await this.container.prisma.inventory.findUnique({ 
            where: {
                userId: interaction.user.id
            },
        });

        await interaction.editReply({ content: `${user.items.length > 1 ? user.items : "You have no items in your inventory."}` })
    }
}
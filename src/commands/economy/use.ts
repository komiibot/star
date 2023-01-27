import { ChatInputCommand, Command } from '@sapphire/framework';
import { ApplyOptions } from '@sapphire/decorators';
import { CustomEmbed } from '#utils/embed';

@ApplyOptions<Command.Options>({
    preconditions: ["blacklistCheck"]
})

export class PollCommand extends Command {
    public override registerApplicationCommands(registry: ChatInputCommand.Registry) {
        registry.registerChatInputCommand((builder) =>
            builder
                .setName("use")
                .setDescription("Use an item in your inventory.")
                .addStringOption((option) =>
            option
                .setName("item")
                .setDescription("Choose the item you want to use.")
                .setRequired(true)
            )
        );
    }

    public async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
        await interaction.deferReply();

        const getItem = interaction.options.getString("item", false);

        const user = await this.container.prisma.inventory.findUnique({
            where: {
                userId: interaction.user.id
            },
        });

        switch(getItem) {
            case "bronze_crate": {
                const items = this.container.utils.percentageChance(["padlock", "mask", "hammer", "pickaxe"], [5, 2, 80, 80])
                return await interaction.editReply({ embeds: [new CustomEmbed().setColor().setDescription(`${items}`)] });
            }
        }

        if(!user.items.includes(getItem)) {
            await interaction.editReply({ embeds: [new CustomEmbed(true, "You don't own that item.")] });
        }
    }
}
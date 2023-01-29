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

        const user = await this.container.prisma.inventory.findFirst({
            where: {
                userId: interaction.user.id
            },
        });

        try {
            switch(getItem) {
                case "bronze_crate": {
                    const items = this.container.utils.percentageChance(["padlock", "mask", "hammer", "pickaxe"], [5, 2, 80, 80])
                    return await interaction.editReply({ embeds: [new CustomEmbed().setColor().setDescription(`${items}`)] });
                }
            }
    
            if(!user.item.includes(getItem)) {
                await interaction.editReply({ embeds: [new CustomEmbed(true, "You don't own that item.")] });
            }
            
        } catch(e) {
            await this.container.log("error", "commands.economy", `Something went wrong with command use: ${e.stack}`, { timestamp: true, client: this.container.client })
            await interaction.editReply({ embeds: [new CustomEmbed(true, "Something went wrong trying to run that command, this has been logged to our developers.")] });
        }
    }
}
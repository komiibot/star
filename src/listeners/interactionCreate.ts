import { ApplyOptions } from "@sapphire/decorators";
import { Events, Listener, ListenerOptions } from "@sapphire/framework";
import { BaseInteraction, ChannelType, Interaction, Message, MessageComponent, MessageComponentInteraction } from "discord.js";

@ApplyOptions<ListenerOptions>({ event: Events.InteractionCreate })
export default class InteractionListener extends Listener<typeof Events.InteractionCreate>
{
    public async run(interaction: Interaction)
    {
        if (interaction.isChannelSelectMenu() && interaction.customId === 'select')
        {
            console.log("Hello")
            console.log(interaction.values[0])
            switch(interaction.values[0]) {
                case "general": {
                    await interaction.update(`The user selected general!`);
                    console.log("Hello general?")
                    break;
                }
                case "admin": {
                    console.log("Hello admin?")
                    await interaction.update(`The user selected admin!`);
                    break;
                }
            }
        }
    }
}
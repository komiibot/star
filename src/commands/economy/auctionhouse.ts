import { ChatInputCommand, Command } from "@sapphire/framework";
import { ApplyOptions } from "@sapphire/decorators";
import { Subcommand } from "@sapphire/plugin-subcommands";
import { CustomEmbed } from "#utils/embed";
import { TextChannel } from "discord.js";

@ApplyOptions<Command.Options>({
  preconditions: ["blacklistCheck"],
  description: "Join our official server to use the auction house. https://discord.gg/komibot",
})
export class AuctionHouseCommand extends Subcommand {
  public constructor(context: Subcommand.Context, options: Subcommand.Options) {
    super(context, {
      ...options,
      name: "ah",
      subcommands: [
        {
          name: "create",
          chatInputRun: "createInput",
        },
        {
          name: "list",
          chatInputRun: "listInput",
        },
      ],
    });
  }

  public override registerApplicationCommands(registry: ChatInputCommand.Registry) {
    registry.registerChatInputCommand(
      (builder) =>
        builder
          .setName("ah")
          .setDescription("A place to find what you need, or make some money for yourself. List some items!")
          .addSubcommand((command) =>
            command
              .setName("create")
              .setDescription("List some items to create an auction!")
              .addStringOption((option) => option.setName("item").setDescription("The item you want to auction off.").setAutocomplete(true).setRequired(true))
              .addNumberOption((option) => option.setName("amount").setDescription("Amount of them item you are auctioning.").setRequired(true))
              .addNumberOption((option) => option.setName("price").setDescription("The Price of the item you're auctioning, others will pay this amount.").setRequired(true))
          )
          .addSubcommand((command) => command.setName("action").setDescription("Get a list of actions for your items on the AH. (Remove, cancel, edit)"))
          .addSubcommand((command) => command.setName("list").setDescription("Get the list of items you're currently auctioning.")),
      {
        guildIds: ["1063684563588632577"],
      }
    );
  }

  public async createInput(interaction: Command.ChatInputCommandInteraction) {
    await interaction.deferReply();

    const channel = this.container.client.channels.cache.get("1070423672227115069") as TextChannel;

    const time = Math.floor(Date.now() / 1000);

    const items = await this.container.modules.getItems();

    const item = interaction.options.getString("item");
    const amount = interaction.options.getNumber("amount");
    let price = interaction.options.getNumber("price");

    const inventory = await this.container.modules.getInventory(interaction?.member);
    const emoji = items.find((x) => x.id === item).emoji;
    const itemName = items.find((x) => x.id === item).name;

    if (!inventory.length) return interaction.editReply({ embeds: [new CustomEmbed(true, `Something went wrong trying to execute that command.`)] });

    // sanity checks
    if (inventory.find((x) => x.item.includes(item)).amount === 0 || !inventory.find((x) => x.item === item) || inventory.filter((x) => x.item.includes(item)).length === 0) {
      return interaction.editReply({ embeds: [new CustomEmbed(true, `You don't own ${item}`)] });
    }

    if (inventory.find((x) => x.item).amount <= amount) {
      return interaction.editReply({ embeds: [new CustomEmbed(true, `You don't own ${amount} ${item}${amount > 1 ? "'s" : ""}`)] });
    }

    if (amount > 2) price = price * amount;

    const hook = await channel.send({
      embeds: [
        new this.container.utils.CustomEmbed()
          .setFooter({ text: "Auction House" })
          .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL() })
          .setDescription(`Item listed since: <t:${time}:R>\n\n**${amount}** ${emoji}${itemName}${amount > 1 ? "s" : ""} for **$${this.container.utils.taxItem(price, 4)}**`)
          .setColor("Random"),
      ],
    });

    return interaction.editReply({
      embeds: [
        new this.container.utils.CustomEmbed()
          .setDescription(`Successfully listed your [auction](https://discord.com/channels/1063684563588632577/1070423672227115069/${hook.id}).`)
          .setColor(),
      ],
    });
  }

  public async listInput(interaction: Command.ChatInputCommandInteraction) {}
}

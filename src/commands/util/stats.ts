import { ChatInputCommand, Command } from "@sapphire/framework";
import { ApplyOptions } from "@sapphire/decorators";
import os from "systeminformation";
import platform from "node:os";
import { CustomEmbed } from "#utils/embed";
import { wrapCodeBlock } from "#utils/codeblock";
import moment from "moment";

const getVersion = (name: string) => {
  const data = require("child_process").execSync(`npm view ${name} version`);
  return data;
};

@ApplyOptions<Command.Options>({
  preconditions: ["blacklistCheck"],
})
export class StatsCommand extends Command {
  public override registerApplicationCommands(registry: ChatInputCommand.Registry) {
    registry.registerChatInputCommand((builder) => builder.setName("stats").setDescription("Get stats on the bot."));
  }

  private bytesToSize(bytes) {
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    if (bytes === 0) return "n/a";
    // @ts-ignore
    const i = parseInt(Math.floor(Math.log(Math.abs(bytes)) / Math.log(1024)), 10);
    if (i === 0) return `${bytes} ${sizes[i]}`;
    return `${(bytes / 1024 ** i).toFixed(1)} ${sizes[i]}`;
  }

  private msToDHM(ms: number, maxPrecission = 3) {
    const duration = moment.duration(ms);

    const items = [];
    items.push({ timeUnit: "d", value: Math.floor(duration.asDays()) });
    items.push({ timeUnit: "h", value: duration.hours() });
    items.push({ timeUnit: "m", value: duration.minutes() });
    items.push({ timeUnit: "s", value: duration.seconds() });

    const formattedItems = items.reduce((accumulator, { value, timeUnit }) => {
      if (accumulator.length >= maxPrecission || (accumulator.length === 0 && value === 0)) {
        return accumulator;
      }

      accumulator.push(`${value}${timeUnit}`);
      return accumulator;
    }, []);

    return formattedItems.length !== 0 ? formattedItems.join(" ") : "-";
  }

  public async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
    await interaction.deferReply();
    const cpu = await os.cpu();
    const mem = await os.mem();

    try {
      return await interaction.editReply({
        embeds: [
          new CustomEmbed()
            .setTitle("Stats")
            .setDescription(
              wrapCodeBlock(`fix
ID: ${this.container.client.id}
Users: ${this.container.client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)}
Guilds: ${(await this.container.client.guilds.fetch()).size}
---------- INFO ---------
Platform: ${platform.type()}
Uptime: ${this.msToDHM(os.time().uptime, 4)}
Version: ${this.container.utils.VERSION}
Library: discord.js v${getVersion("discord.js")}Node: ${process.version}
---------- CPU ----------
Manufacturer: ${cpu.manufacturer}
Cores: ${cpu.cores}
Speed: ${cpu.speed}
---------- MEMORY ----------
Total: ${this.bytesToSize(mem.total)}
Used: ${this.bytesToSize(mem.used)}
`)
            )
            .setColor(),
        ],
      });
    } catch (err) {
      await this.container.log("error", "commands.economy", `Something went wrong with command: stats\n${err.stack}`, { timestamp: true, client: this.container.client });
      await interaction.editReply({
        embeds: [new CustomEmbed(true, "Something went wrong trying to run the command.").setFooter({ text: "This has been logged to our developers." })],
      });
    }
  }
}

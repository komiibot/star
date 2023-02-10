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

  private msToDHM(duration: number) {
    const portions: string[] = [];
  
    const msInHour = 1000 * 60 * 60;
    const hours = Math.trunc(duration / msInHour);
    if (hours > 0) {
      portions.push(hours + 'h');
      duration = duration - (hours * msInHour);
    }
  
    const msInMinute = 1000 * 60;
    const minutes = Math.trunc(duration / msInMinute);
    if (minutes > 0) {
      portions.push(minutes + 'm');
      duration = duration - (minutes * msInMinute);
    }
  
    const seconds = Math.trunc(duration / 1000);
    if (seconds > 0) {
      portions.push(seconds + 's');
    }
  
    return portions.join(' ');
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
Users: ${this.container.client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0).toLocaleString()}
Guilds: ${(await this.container.client.guilds.fetch()).size.toLocaleString()}
---------- INFO ---------
Platform: ${platform.type()}
Uptime: ${this.msToDHM(this.container.client.uptime)}
Version: ${this.container.utils.VERSION}
Library: discord.js v${getVersion("discord.js")}Node: ${process.version}
---------- CPU ----------
Manufacturer: ${cpu.manufacturer}
Cores: ${cpu.cores}
Speed: ${cpu.speed} MHz
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

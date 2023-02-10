import { Args, Command } from "@sapphire/framework";
import { Message } from "discord.js";
import { inspect } from "node:util";
import { fetch, FetchMethods, FetchResultTypes } from "@sapphire/fetch";

interface HastebinResponse {
  key: string;
}

export class EvalCommand extends Command {
  public constructor(context: Command.Context, options: Command.Options) {
    super(context, {
      ...options,
      name: "eval",
      aliases: ["e"],
      preconditions: ["developerOnly"],
      description: "Evaluate some code.",
    });
  }

  private async post(result: string, language = "ts") {
    const hastebinUrl = "https://hst.sh";
    const { key } = await fetch<HastebinResponse>(
      `${hastebinUrl}/documents`,
      {
        method: FetchMethods.Post,
        body: result,
      },
      FetchResultTypes.JSON
    );
    return `${hastebinUrl}/${key}.${language}`;
  }

  private async eval(msg: Message, args: Args, code: string) {
    let success: boolean;
    let result: unknown;

    const message = msg;

    try {
      if (args.getFlags("async")) code = `(async () => {\n${code}\n})();`;

      result = eval(code);

      success = true;
    } catch (err) {
      result = err;
      success = false;
    }

    if (typeof result !== "string") {
      result =
        result instanceof Error
          ? result.stack
          : args.getFlags("json")
          ? JSON.stringify(result, null, 4)
          : inspect(result, {
              depth: Number(args.getOption("depth") ?? 0) || 0,
              showHidden: args.getFlags("showHidden", "hidden"),
            });
    }
    return {
      success,
      result: this.container.utils.clean(result as string),
    };
  }

  public async messageRun(msg: Message, args: Args) {
    let code = await args.rest("string");

    const { result, success } = await this.eval(msg, args, code);

    if (!success) {
      return msg.channel.send({
        embeds: [new this.container.utils.CustomEmbed(true, result).setFooter({ text: msg.author.username, iconURL: msg.author.avatarURL() }).setTimestamp()],
      });
    }

    return msg.channel.send({
      embeds: [
        new this.container.utils.CustomEmbed()
          .setTitle("Input")
          .setDescription(code.length > 2000 ? await this.post(code) : this.container.utils.wrapCodeBlock(code))
          .addFields({ name: "Output", value: this.container.utils.wrapCodeBlock(result) })
          .setFooter({ text: msg.author.username, iconURL: msg.author.avatarURL() })
          .setTimestamp()
          .setColor(),
      ],
    });
  }
}

import { Args, Command } from "@sapphire/framework";
import { Message } from "discord.js";
import { inspect } from "node:util";

export class EvalCommand extends Command {
  public constructor(context: Command.Context, options: Command.Options) {
    super(context, {
      ...options,
      name: "eval",
      aliases: ["e", "ev"],
      preconditions: ["developerOnly"],
      description: "Evaluate some code.",
      flags: ["async", "silent", "json", "showHidden", "hidden"],
      options: ["depth"]
    });
  }

  private async eval(msg: Message, args: Args, code: string) {
    let success: boolean;
    let result: unknown;

    const message = msg;

    try {
      if (args.getFlags("async")) code = `(async () => {\n${code}\n})();`;

      console.log(code)
      result = await eval(code);

      success = true;
    } catch (err) {
      result = err;
      success = false;
    }

    if (typeof result !== 'string') {
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
    let code = await args.rest('string');

    const { result, success } = await this.eval(msg, args, code);

    if (args.getFlags('silent')) {
			if (!success && result) await this.container.log("error", "Eval Error", result)
      if(success && result) await this.container.log("info", "Eval", result)
			return null;
		}

    if (!success) {
      return msg.channel.send({
        embeds: [new this.container.utils.CustomEmbed(true, result).setFooter({ text: msg.author.username, iconURL: msg.member.avatarURL() }).setTimestamp()],
      });
    }

    this.container.log("debug", "Debug", result)

    return msg.channel.send({
      embeds: [
        new this.container.utils.CustomEmbed()
          .setTitle("Input")
          .setDescription(code.length > 2000 ? "Too long" :this.container.utils.wrapCodeBlock(code))
          .addFields({ name: "Output", value: result.length > 2000 ? await this.container.utils.postHaste(result) : this.container.utils.wrapCodeBlock(result) })
          .setFooter({ text: msg.author.username, iconURL: msg.member.avatarURL() })
          .setTimestamp()
          .setColor(),
      ],
    });
  }
}

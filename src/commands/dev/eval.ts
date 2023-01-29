import { Command } from '@sapphire/framework';
import { Client, Message, EmbedBuilder } from 'discord.js';

async function clean(text) {
  if (text && text.constructor.name == "Promise")
    text = await text;
  if (typeof text !== "string")
    text = require("util").inspect(text, { depth: 1 });

  text = text
    .replace(/`/g, "`" + String.fromCharCode(8203))
    .replace(/@/g, "@" + String.fromCharCode(8203));
  return text;
}

export class EvalCommand extends Command {
  public constructor(context: Command.Context, options: Command.Options) {
    super(context, {
      ...options,
      name: 'eval',
      aliases: [],
      preconditions: ["developerOnly"],
      description: 'Run javascript code from the bot.'
    });
  }

  public async messageRun(msg: Message) {
    if (msg.content.toLowerCase().includes('client.token')) return;
    let args: any = msg.content.split(" ").splice(1);

    const clean = async (text) => {
      if (text && text.constructor.name == "Promise")
        text = await text;
      if (typeof text !== "string")
        text = require("util").inspect(text, { depth: 1 });

      text = text
        .replace(/`/g, "`" + String.fromCharCode(8203))
        .replace(/@/g, "@" + String.fromCharCode(8203));
      return text;
    }

    if (/--silent|--s/.test(args[0])) {
      args = msg.content.split(' ').splice(2).join(' ');
      const cleaned = await clean(args)
      return msg.channel.send(cleaned);
    } else {

      try {
        let evaled = await eval(args.join(' '));
        if (typeof evaled !== 'string')
          evaled = require('util').inspect(evaled);

        const cleaned = await clean(evaled)

        let input = `**Input**\n\`\`\`${(args as any).join(' ')}\`\`\`\n**Output**:\n\`\`\`${cleaned}\`\`\``;
        let embed = new EmbedBuilder()
          .setTitle('Input')
          .setDescription(input)
          .setTimestamp()
          .setColor('#91e3e2')
          .setFooter({
            text: 'Eval',
            iconURL: msg.member.user.avatarURL()
          });
        return msg.channel.send({ embeds: [embed] });
      } catch (e) {
        let embed = new EmbedBuilder()
          .setTitle('Error')
          .setDescription(`An error occured. ${e}`)
          .setTimestamp()
          .setColor('#d9576c')
          .setFooter({
            text: 'Eval',
            iconURL: msg.member.user.avatarURL()
          });
        return msg.channel.send({ embeds: [embed] });
      }
    }
  }
}
import { SapphireClient } from "@sapphire/framework";
import colors from "chalk";
import dayjs from "dayjs";
import { EmbedBuilder } from "discord.js";

interface Options {
  timestamp?: boolean;
  client?: SapphireClient
}

export async function log(
  level: string,
  title: string,
  msg: string,
  options?: Options,
) {
  let timestamp;

  if (level === undefined) {
    return console.error(colors.red("Level argument is required for Logger."));
  }

  if (title === undefined) {
    return console.error(colors.red("Title argument is required for Logger."));
  }

  if (msg === undefined) {
    return console.error(colors.red("Message argument is required for Logger."));
  }

  if (options?.timestamp) {
    timestamp = dayjs(Date.now()).format("HH:mm:ss");
  }

  if(options?.client) {
    const embed = new EmbedBuilder()
    .setTitle('Komi Error')
    .setDescription(`${msg}`)
    .setTimestamp()
    .setColor('#d9576c'); 
    (await options.client.fetchWebhook("1067673952996040704", process.env.WEBHOOK_TOKEN as string)).send({ embeds: [embed] })
  }


  switch (level) {
    case "info": {
      console.log(
        colors.green(`${timestamp ? `[${timestamp}]:` : ""} ${title} | ${msg}`)
      );
      break;
    }
    case "warn": {
      console.log(
        colors.yellow(`${timestamp ? `[${timestamp}]:` : ""} ${title} | ${msg}`)
      );
      break;
    }
    case "error": {
      console.log(
        colors.red(`${timestamp ? `[${timestamp}]:` : ""} ${title} | ${msg}`)
      );
      break;
    }
    case "debug": {
      console.log(
        colors.cyan(`${timestamp ? `[${timestamp}]:` : ""} ${title} | ${msg}`)
      );
      break;
    }
    case "cron": {
      console.log(
        colors.cyan(`${timestamp ? `[${timestamp}]:` : ""} ${title} | ${msg}`)
      );
      break;
    }
    case "prisma": {
      console.log(
        colors.magenta(`${timestamp ? `[${timestamp}]:` : ""} ${title} | ${msg}`)
      );
      break;
    }
  }
}

export async function prisma(title: string, msg: string, timestamp?: boolean) {
  return log("prisma", title, msg, {
    timestamp: timestamp ? timestamp : false,
  });
}
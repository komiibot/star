import { SapphireClient } from "@sapphire/framework";
import colors from "chalk";
import dayjs from "dayjs";
import { CustomEmbed } from "./embed";
import fs from "fs";
import util from "node:util";

interface Options {
  timestamp?: boolean;
  client?: SapphireClient;
  color?: string;
}

async function upsertFile(filepath: string, data: string) {
  try {
    await fs.promises.appendFile(filepath, data);
  } catch (err) {
    await fs.promises.writeFile(filepath, "");
  }
}

export async function log(level: string, title: string, msg: string, options?: Options) {
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
    timestamp = dayjs(Date.now()).format("HH:mm:ss | l");
  }

  if (options?.client) {
    const embed = new CustomEmbed(true, msg, "Error").setTimestamp();
    // (await options.client.fetchWebhook("1067673952996040704", process.env.WEBHOOK_TOKEN as string)).send({ embeds: [embed] });
  }

  switch (level) {
    case "info": {
      console.log(colors.green(`${timestamp ? `[${timestamp}]:` : ""} ${title} | ${msg}`));
      break;
    }
    case "warn": {
      console.log(colors.yellow(`${timestamp ? `[${timestamp}]:` : ""} ${title} | ${msg}`));
      break;
    }
    case "error": {
      const date = dayjs(new Date()).format('DD/MM/YYYY');
      upsertFile(`./logs/${date.replaceAll("/", "-")}_error.log`, util.format(`${timestamp ? `[${timestamp}]` : ""} ${title} | ${msg}\n\n`));
      console.log(colors.red(`${timestamp ? `[${timestamp}]:` : ""} ${title} | ${msg}`));
      break;
    }
    case "debug": {
      console.log(colors.yellow(`${timestamp ? `[${timestamp}]:` : ""} ${title} | ${msg}`));
      break;
    }
    case "prisma": {
      console.log(colors.magenta(`${timestamp ? `[${timestamp}]:` : ""} ${title} | ${msg}`));
      break;
    }
    case "custom": {
      console.log(colors.hex(options.color ? options.color : "#FFA500")(`${timestamp ? `[${timestamp}]:` : ""} ${title} | ${msg}`));
      break;
    }
  }
}

export async function prisma(title: string, msg: string, timestamp?: boolean) {
  return log("prisma", title, msg, {
    timestamp: timestamp ? timestamp : false,
  });
}

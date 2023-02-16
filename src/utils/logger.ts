import colors from "chalk";
import dayjs from "dayjs";
import fs from "fs";
import { sentryClient } from "index";
import util from "node:util";

async function upsertFile(filepath: string, data: string) {
  try {
    await fs.promises.appendFile(filepath, data);
  } catch (err) {
    await fs.promises.writeFile(filepath, "");
  }
}

interface Options {
  sentry?: {
    dsn: string
    logLevel: string;
  };
  metrics?: boolean;
  format?: string;
}

export default class Logger {
  options?: Options;
  timestamp?: string;
  title: string;
  msg: string;
  format: string;

  constructor(options?: Options) {
    this.options = options;

    this.timestamp = dayjs(Date.now()).format("HH:mm:ss | l");
  }

  async info(title: string, msg: string) {
    console.log(colors.green(`[${this.timestamp}]: ${title} | ${msg}`));
  }

  async warn(title: string, msg: string) {
    console.log(colors.yellow(`[${this.timestamp}]: ${title} | ${msg}`));
  }

  async error(title: string, msg: string) {
    console.log(colors.red(`[${this.timestamp}]: ${title} | ${msg}`));
  }

  async prisma(title: string, msg: string) {
    console.log(colors.magenta(`[${this.timestamp}]: ${title} | ${msg}`));
  }

  async custom(title: string, msg: string, color?: string) {
    console.log(colors.hex(color ? color : "#FFA500")(`[${this.timestamp}]: ${title} | ${msg}`));
  }

  async save(path: string, data: string, title: string, msg: string) {
    const date = dayjs(new Date()).format('DD/MM/YYYY');
    upsertFile(`./logs/${date.replaceAll("/", "-")}_error.log`, util.format(`${this.timestamp}: ${title} | ${msg}\n\n`));
  }
}

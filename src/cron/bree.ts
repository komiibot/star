import Bree from "bree";
import Graceful from "@ladjs/graceful";
import Logger from "#utils/logger";
import path from "path";

export const logger = new Logger();

export const bree = new Bree({
  root: path.join(__dirname, "jobs"),

  workerMessageHandler: async (msg) => {
    if (msg.message) {
      await logger.custom("[JOBS]", `${msg.name} - ${msg.message}`, "#eb42a1");
    }
  },
  errorHandler: async (msg) => {
    await logger.error("[JOBS]", `${msg.name} - ${msg.message}`);
  },

  jobs: [
    {
        name: "resetCommands",
        interval: "10s"
    }
  ]
});

export default async function runJobs() {
  await logger.custom("[JOBS]", "Getting cron jobs ready.", "#6de7ed")

  await bree.start();
}

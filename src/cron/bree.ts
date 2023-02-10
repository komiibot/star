import Bree from "bree";
import Graceful from "@ladjs/graceful";
import { log } from "#utils/logger";
import path from "path";

export const bree = new Bree({
  root: path.join(__dirname, "jobs"),

  workerMessageHandler: async (msg) => {
    if (msg.message) {
      await log("custom", "[JOBS]", `${msg.name} - ${msg.message}`, { timestamp: true, color: "#eb42a1" });
    }
  },
  errorHandler: async (msg) => {
    await log("error", "[JOBS]", `${msg.name} - ${msg.message}`, { timestamp: true, color: "#eb42a1" });
  },

  jobs: [
    {
        name: "resetCommands",
        interval: "10s"
    }
  ]
});

export default async function runJobs() {
  await log("custom", "[JOBS]", "Getting cron jobs ready.", { timestamp: true, color: "#6de7ed" })

  await bree.start();
}

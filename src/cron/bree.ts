import Bree from "bree";
import Graceful from "@ladjs/graceful";
import { log } from "#utils/logger";
import path from "path";

export const bree = new Bree({
  root: path.join(__dirname, "jobs"),

  workerMessageHandler: async (msg) => {
    if (msg.message) {
      await log("custom", "Komi.Jobs", `${msg.name} - ${msg.message}`, { timestamp: true, color: "#eb42a1" });
    }
  },
  errorHandler: async (msg) => {
    await log("error", "Komi.Jobs", `${msg.name} - ${msg.message}`, { timestamp: true, color: "#eb42a1" });
  },

  jobs: [
    {
        name: "resetCommands",
        interval: "1h"
    }
  ]
});

export default async function runJobs() {
  const graceful = new Graceful({ brees: [bree] });
  graceful.listen();

  await bree.start();
}

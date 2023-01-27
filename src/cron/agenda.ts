import Agenda from "agenda";
import dayjs from "dayjs";
import path from "path";
import { log as logger } from "#utils/logger";

const agenda = new Agenda({
    db: {
        address: process.env.MONGO_URL as string,
        collection: "komiJobs"
    }
})

export async function runJobs() {
    await agenda.start();

    agenda.on("start", (job) => {
        logger("cron", "Komi.Jobs", `[${job.attrs.name}] is starting`);
    })
    agenda.on("success", (job) => {
        logger("cron", "Komi.Jobs", `[${job.attrs.name}] was successful`);
    })
    agenda.on("fail", (error, job) => {
        logger("error", "Komi.Jobs", `[${job.attrs.name}] failed: ${error}`);
    })
}

export default agenda;
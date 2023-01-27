import dayjs from "dayjs";
import isTomorrow from "dayjs/plugin/isTomorrow";
dayjs.extend(isTomorrow)
import agenda from "../agenda";

agenda.define("dailyStreak", async (job) => {
    const days = dayjs().add(1, 'day').subtract(2, "hours").toDate();


})
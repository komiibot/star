import dayjs from "dayjs";
import isTomorrow from "dayjs/plugin/isTomorrow";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(isTomorrow);
dayjs.extend(relativeTime);
import agenda from "../agenda";

agenda.define("resetAuctions", async (job) => {
  
});

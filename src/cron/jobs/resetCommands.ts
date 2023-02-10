import { redis } from "../../index";
import { log } from "#utils/logger";

(async () => {
  log("info", "[JOBS]", "Clearing command count from redis.");
  const keys = await redis.keys("*:commands_ran");
  await redis.del(keys);
})();
import { redis } from "../../index";
import Logger from "#utils/logger";

export const logger = new Logger();

(async () => {
  logger.info("[JOBS]", "Clearing command count from redis.");
  const keys = await redis.keys("*:commands_ran");
  await redis.del(keys);
})();
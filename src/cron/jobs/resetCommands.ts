import { redis } from "../../index";
import { log } from "#utils/logger";

(async () => {
    await redis.del("*:commands_ran");
});
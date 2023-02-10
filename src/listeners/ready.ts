import { Events, Listener, Logger } from "@sapphire/framework";
import { ApplyOptions } from "@sapphire/decorators";
import { IS_PROD } from "#utils/consts";
import { syncItems } from "../modules/economy/inventory";
import { redis } from "../index";
import runJobs from "../cron/bree";

@ApplyOptions<Listener.Options>({ once: true })
export class UserListener extends Listener<typeof Events.ClientReady> {
  public async run() {
    await this.printInfo();
  }

  private async printInfo() {
    const guilds = this.container.client.guilds.cache.size;

    this.container.log("info", "Events.Ready", `Komi${IS_PROD === true ? "" : " [DEV]"} Version ${this.container.utils.VERSION}`, { timestamp: true });
    this.container.log("info", "Events.Ready", `Successfully loaded ${this.container.stores.get("commands").size} commands!`, { timestamp: true });
    this.container.log("info", "Events.Ready", `Serving ${guilds} harem${guilds > 1 ? "s" : ""}!`, { timestamp: true });
    this.container.log("prisma", "[PRISMA]", "Successfully connected to the database.", { timestamp: true });

    await redis.connect().then(() => {
      this.container.log("custom", "[REDIS]", "Successfully connected to redis.", { timestamp: true });
    }).catch((e) => this.container.log("error", "[REDIS]", `Error: ${e}`, { timestamp: true }));

    await syncItems();
  }
}

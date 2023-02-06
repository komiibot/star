import { Events, Listener, Logger } from "@sapphire/framework";
import { ApplyOptions } from "@sapphire/decorators";
import { IS_PROD } from "#utils/consts";
import { syncItems } from "#modules/economy/inventory";

@ApplyOptions<Listener.Options>({ once: true })
export class UserListener extends Listener<typeof Events.ClientReady> {
  public async run() {
    await this.printInfo();
  }

  private async printInfo() {
    const guilds = this.container.client.guilds.cache.size;
    const color = "#fc03ad";

    this.container.log("info", "Events.Ready", `Komi${IS_PROD === true ? "" : " [DEV]"} Version ${this.container.utils.VERSION}`, { timestamp: true, color: color });
    this.container.log("info", "Events.Ready", `Successfully loaded ${this.container.stores.get("commands").size} commands!`, { timestamp: true, color: color });
    this.container.log("info", "Events.Ready", `Serving ${guilds} harem${guilds > 1 ? "s" : ""}!`, { timestamp: true, color: color });
    this.container.log("prisma", "[PRISMA]", "Successfully connected to the database.", { timestamp: true });
    this.container.log("custom", "[REDIS]", "Successfully connected to redis.", { timestamp: true });

    await syncItems();
  }
}

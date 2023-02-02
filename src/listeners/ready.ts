import { Events, Listener, Logger } from "@sapphire/framework";
import { ApplyOptions } from "@sapphire/decorators";
import { IS_PROD } from "#utils/consts";
import { syncItems } from "#modules/index";

@ApplyOptions<Listener.Options>({ once: true })
export class UserListener extends Listener<typeof Events.ClientReady> {
  public async run() {
    await this.printInfo();
  }

  private async printInfo() {
    const env = IS_PROD === true ? "PRODUCTION" : "DEVELOPMENT";
    const guilds = this.container.client.guilds.cache.size;

    this.container.log("prisma", "Events.Ready", `Komi [${env}] Version ${this.container.utils.VERSION}`);
    this.container.log("prisma", "Events.Ready", `Successfully loaded ${this.container.stores.get("commands").size} commands!`);
    this.container.log("prisma", "Events.Ready", `Serving ${guilds} harem${guilds > 1 ? "s" : ""}!`);

    await syncItems();
  }
}

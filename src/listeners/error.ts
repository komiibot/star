import { Events, Listener, LogLevel, type Logger } from '@sapphire/framework';

export class UserListener extends Listener<typeof Events.Error> {
	public override run(error: Error) {
		this.container.log.error("Unhandled Error", `${error}`)
	}

	public override async onLoad() {
		if (this.container.log == undefined) await this.unload();
        return super.onLoad();
	}
}
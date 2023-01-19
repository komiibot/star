import { commandModule, CommandType } from "@sern/handler";
import { prisma } from "../../index";

export default commandModule({
	type: CommandType.Text,
	description: "Blacklist a user, or guild",
	alias: ["bl"],
	execute: async (ctx, args) => {
		if (!["583925649807245322", "1048860807842234469", "199801459469058048"].includes(ctx.user.id)) return;

        // ctx.channel.send("1063684564750442598", "")
    }
});

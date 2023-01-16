import { commandModule, CommandType } from "@sern/handler";
import { publish } from "../../plugins/publish";

export default commandModule({
    type: CommandType.Both,
    plugins: [publish()],
    description: "Check your, or someone elses balance.",
    alias : [],
    execute: async (ctx, args) => {
        await ctx.reply({ content: "Pong!" });
    },
});
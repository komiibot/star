import { commandModule, CommandType } from "@sern/handler";
import { publish } from "../../plugins/publish";

export default commandModule({
    type: CommandType.Both,
    plugins: [publish()],
    description: "A ping command",
    alias : ["pong"],
    execute: async (ctx, args) => {
        await ctx.reply({ content: "Pong!" });
    },
});
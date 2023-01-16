"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const handler_1 = require("@sern/handler");
const discord_js_1 = require("discord.js");
const util_1 = require("util");
const leveling = __importStar(require("../../modules/leveling"));
exports.default = (0, handler_1.commandModule)({
    type: handler_1.CommandType.Text,
    description: "Eval something",
    alias: ["ev"],
    execute: async (ctx, args) => {
        var _a;
        if (!["583925649807245322", "434008547139911681", "1048860807842234469", "199801459469058048"].includes(ctx.user.id))
            return;
        leveling;
        let code = args[1];
        code = code.join(" ");
        if (code.includes("await")) {
            const ar = code.split(";");
            const last = ar.pop();
            code = `(async () => {\n${ar.join(";\n")}\nreturn ${(_a = last === null || last === void 0 ? void 0 : last.trim()) !== null && _a !== void 0 ? _a : " "}\n\n})();`;
        }
        const { channel, guild, client, user, member, message: msg } = ctx;
        if (["TOKEN", "process.env", "token"].some((e) => code.includes(e)) &&
            ctx.user.id !== "1063701909690646598")
            return ctx.message.react("❌");
        let result;
        try {
            result = eval(code);
        }
        catch (error) {
            result = error;
        }
        if (result instanceof Promise)
            result = await result.catch((e) => new Error(e.message));
        if (typeof result !== "string") {
            result = (0, util_1.inspect)(result, {
                depth: 0,
            });
        }
        result = "```js\n" + result + "\n```";
        if (result.length > 2000) {
            channel.send("Result is too long to send");
        }
        ctx.channel.send({ content: result });
        function send(id, ping = false) {
            var _a, _b;
            const channel = client.channels.cache.get(id);
            if (!channel)
                return;
            const embed = new discord_js_1.EmbedBuilder()
                .setColor(0xcc5279)
                .setTitle("v2 is out!")
                .setThumbnail((_b = (_a = client.user) === null || _a === void 0 ? void 0 : _a.displayAvatarURL()) !== null && _b !== void 0 ? _b : "")
                .setImage("https://raw.githubusercontent.com/sern-handler/.github/main/banner.png")
                .setAuthor({ name: "sern", url: "https://sern.dev/" })
                .setDescription(`__**Quick Look:**__\n\n${text()}\n\nThank you all for being patient!`)
                .setFooter({ text: "Supports DJS v14.7 and above" })
                .setTimestamp();
            const content = ping ? "@everyone" : undefined;
            channel.isTextBased() && channel.send({ content, embeds: [embed] });
            return "Done sir";
        }
    },
});
function text() {
    const obj = [
        {
            name: `[CLI](https://github.com/sern-handler/cli):`,
            value: `\` - \` Updated templates for v2`,
        },
        {
            name: `[@sern/handler](https://www.npmjs.com/package/@sern/handler):`,
            value: `\` - \` Read blog (I wrote everything here) https://sern.dev/blog`,
        },
        {
            name: `[Website](https://sern.dev)`,
            value: `\` - \` Blog 2.0`,
        },
        // {
        // 	name: `[Community bot](https://github.com/sern-handler/sern-community)`,
        // 	value: `\` - \` Documentation at your hands in this server!\n\` - \` Autocompletes\n\` - \` Tag System\n\` - \` Features all the plugins in [this repository](https://github.com/sern-handler/awesome-plugins)`,
        // },
    ];
    return obj.map(({ name, value }) => `**${name}**\n${value}`).join("\n\n");
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZhbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tYW5kcy9kZXZlbG9wZXIvZXZhbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMkNBQTJEO0FBQzNELDJDQUEwQztBQUMxQywrQkFBK0I7QUFFL0IsaUVBQW1EO0FBRW5ELGtCQUFlLElBQUEsdUJBQWEsRUFBQztJQUM1QixJQUFJLEVBQUUscUJBQVcsQ0FBQyxJQUFJO0lBQ3RCLFdBQVcsRUFBRSxnQkFBZ0I7SUFDN0IsS0FBSyxFQUFFLENBQUMsSUFBSSxDQUFDO0lBQ2IsT0FBTyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUU7O1FBQzVCLElBQUksQ0FBQyxDQUFDLG9CQUFvQixFQUFFLG9CQUFvQixFQUFFLHFCQUFxQixFQUFFLG9CQUFvQixDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO1lBQUUsT0FBTztRQUM3SCxRQUFRLENBQUM7UUFFVCxJQUFJLElBQUksR0FBc0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXRDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBVyxDQUFDO1FBQ2hDLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUMzQixNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzNCLE1BQU0sSUFBSSxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUN0QixJQUFJLEdBQUcsbUJBQW1CLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQ3ZDLE1BQUEsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLElBQUksRUFBRSxtQ0FBSSxHQUNqQixXQUFXLENBQUM7U0FDWjtRQUNELE1BQU0sRUFBRSxPQUFP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QW1FO1NBQzFFO1FBQ0Q7WUFDQyxJQUFJLEVBQUUsNkJBQTZCO1lBQ25DLEtBQUssRUFBRSxrQkFBa0I7U0FDekI7UUFDRCxJQUFJO1FBQ0osNEVBQTRFO1FBQzVFLG9OQUFvTjtRQUNwTixLQUFLO0tBQ0wsQ0FBQztJQUNGLE9BQU8sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsQ0FBQyxLQUFLLElBQUksT0FBTyxLQUFLLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUMzRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY29tbWFuZE1vZHVsZSwgQ29tbWFuZFR5cGUgfSBmcm9tIFwiQHNlcm4vaGFuZGxlclwiO1xyXG5pbXBvcnQgeyBFbWJlZEJ1aWxkZXIgfSBmcm9tIFwiZGlzY29yZC5qc1wiO1xyXG5pbXBvcnQgeyBpbnNwZWN0IH0gZnJvbSBcInV0aWxcIjtcclxuaW1wb3J0IHsgcHJpc21hIH0gZnJvbSBcIi4uLy4uL2luZGV4XCI7XHJcbmltcG9ydCAqIGFzIGxldmVsaW5nIGZyb20gXCIuLi8uLi9tb2R1bGVzL2xldmVsaW5nXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb21tYW5kTW9kdWxlKHtcclxuXHR0eXBlOiBDb21tYW5kVHlwZS5UZXh0LFxyXG5cdGRlc2NyaXB0aW9uOiBcIkV2YWwgc29tZXRoaW5nXCIsXHJcblx0YWxpYXM6IFtcImV2XCJdLFxyXG5cdGV4ZWN1dGU6IGFzeW5jIChjdHgsIGFyZ3MpID0+IHtcclxuXHRcdGlmICghW1wiNTgzOTI1NjQ5ODA3MjQ1MzIyXCIsIFwiNDM0MDA4NTQ3MTM5OTExNjgxXCIsIFwiMTA0ODg2MDgwNzg0MjIzNDQ2OVwiLCBcIjE5OTgwMTQ1OTQ2OTA1ODA0OFwiXS5pbmNsdWRlcyhjdHgudXNlci5pZCkpIHJldHVybjtcclxuXHRcdGxldmVsaW5nO1xyXG5cclxuXHRcdGxldCBjb2RlOiBzdHJpbmdbXSB8IHN0cmluZyA9IGFyZ3NbMV07XHJcblxyXG5cdFx0Y29kZSA9IGNvZGUuam9pbihcIiBcIikgYXMgc3RyaW5nO1xyXG5cdFx0aWYgKGNvZGUuaW5jbHVkZXMoXCJhd2FpdFwiKSkge1xyXG5cdFx0XHRjb25zdCBhciA9IGNvZGUuc3BsaXQoXCI7XCIpO1xyXG5cdFx0XHRjb25zdCBsYXN0ID0gYXIucG9wKCk7XHJcblx0XHRcdGNvZGUgPSBgKGFzeW5jICgpID0+IHtcXG4ke2FyLmpvaW4oXCI7XFxuXCIpfVxcbnJldHVybiAke1xyXG5cdFx0XHRcdGxhc3Q/LnRyaW0oKSA/PyBcIiBcIlxyXG5cdFx0XHR9XFxuXFxufSkoKTtgO1xyXG5cdFx0fVxyXG5cdFx0Y29uc3QgeyBjaGFubmVsLCBndWlsZCwgY2xpZW50LCB1c2VyLCBtZW1iZXIsIG1lc3NhZ2U6IG1zZyB9ID0gY3R4O1xyXG5cdFx0aWYgKFxyXG5cdFx0XHRbXCJUT0tFTlwiLCBcInByb2Nlc3MuZW52XCIsIFwidG9rZW5cIl0uc29tZSgoZSkgPT4gY29kZS5pbmNsdWRlcyhlKSkgJiZcclxuXHRcdFx0Y3R4LnVzZXIuaWQgIT09IFwiMTA2MzcwMTkwOTY5MDY0NjU5OFwiXHJcblx0XHQpXHJcblx0XHRcdHJldHVybiBjdHgubWVzc2FnZS5yZWFjdChcIuKdjFwiKTtcclxuXHJcblx0XHRsZXQgcmVzdWx0OiB1bmtub3duIHwgc3RyaW5nO1xyXG5cclxuXHRcdHRyeSB7XHJcblx0XHRcdHJlc3VsdCA9IGV2YWwoY29kZSk7XHJcblx0XHR9IGNhdGNoIChlcnJvcikge1xyXG5cdFx0XHRyZXN1bHQgPSBlcnJvcjtcclxuXHRcdH1cclxuXHRcdGlmIChyZXN1bHQgaW5zdGFuY2VvZiBQcm9taXNlKVxyXG5cdFx0XHRyZXN1bHQgPSBhd2FpdCByZXN1bHQuY2F0Y2goKGU6IEVycm9yKSA9PiBuZXcgRXJyb3IoZS5tZXNzYWdlKSk7XHJcblx0XHRpZiAodHlwZW9mIHJlc3VsdCAhPT0gXCJzdHJpbmdcIikge1xyXG5cdFx0XHRyZXN1bHQgPSBpbnNwZWN0KHJlc3VsdCwge1xyXG5cdFx0XHRcdGRlcHRoOiAwLFxyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXN1bHQgPSBcImBgYGpzXFxuXCIgKyByZXN1bHQgKyBcIlxcbmBgYFwiO1xyXG5cclxuXHRcdGlmICgocmVzdWx0IGFzIHN0cmluZykubGVuZ3RoID4gMjAwMCkge1xyXG5cdFx0XHRjaGFubmVsIS5zZW5kKFwiUmVzdWx0IGlzIHRvbyBsb25nIHRvIHNlbmRcIik7XHJcblx0XHR9XHJcblxyXG5cdFx0Y3R4LmNoYW5uZWwhLnNlbmQoeyBjb250ZW50OiByZXN1bHQgYXMgc3RyaW5nIH0pO1xyXG5cclxuXHRcdGZ1bmN0aW9uIHNlbmQoaWQ6IHN0cmluZywgcGluZyA9IGZhbHNlKSB7XHJcblx0XHRcdGNvbnN0IGNoYW5uZWwgPSBjbGllbnQuY2hhbm5lbHMuY2FjaGUuZ2V0KGlkKTtcclxuXHRcdFx0aWYgKCFjaGFubmVsKSByZXR1cm47XHJcblx0XHRcdGNvbnN0IGVtYmVkID0gbmV3IEVtYmVkQnVpbGRlcigpXHJcblx0XHRcdFx0LnNldENvbG9yKDB4Y2M1Mjc5KVxyXG5cdFx0XHRcdC5zZXRUaXRsZShcInYyIGlzIG91dCFcIilcclxuXHRcdFx0XHQuc2V0VGh1bWJuYWlsKGNsaWVudC51c2VyPy5kaXNwbGF5QXZhdGFyVVJMKCkgPz8gXCJcIilcclxuXHRcdFx0XHQuc2V0SW1hZ2UoXHJcblx0XHRcdFx0XHRcImh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9zZXJuLWhhbmRsZXIvLmdpdGh1Yi9tYWluL2Jhbm5lci5wbmdcIlxyXG5cdFx0XHRcdClcclxuXHRcdFx0XHQuc2V0QXV0aG9yKHsgbmFtZTogXCJzZXJuXCIsIHVybDogXCJodHRwczovL3Nlcm4uZGV2L1wiIH0pXHJcblx0XHRcdFx0LnNldERlc2NyaXB0aW9uKFxyXG5cdFx0XHRcdFx0YF9fKipRdWljayBMb29rOioqX19cXG5cXG4ke3RleHQoKX1cXG5cXG5UaGFuayB5b3UgYWxsIGZvciBiZWluZyBwYXRpZW50IWBcclxuXHRcdFx0XHQpXHJcblx0XHRcdFx0LnNldEZvb3Rlcih7IHRleHQ6IFwiU3VwcG9ydHMgREpTIHYxNC43IGFuZCBhYm92ZVwiIH0pXHJcblx0XHRcdFx0LnNldFRpbWVzdGFtcCgpO1xyXG5cdFx0XHRjb25zdCBjb250ZW50ID0gcGluZyA/IFwiQGV2ZXJ5b25lXCIgOiB1bmRlZmluZWQ7XHJcblx0XHRcdGNoYW5uZWwuaXNUZXh0QmFzZWQoKSAmJiBjaGFubmVsLnNlbmQoeyBjb250ZW50LCBlbWJlZHM6IFtlbWJlZF0gfSk7XHJcblx0XHRcdHJldHVybiBcIkRvbmUgc2lyXCI7XHJcblx0XHR9XHJcblx0fSxcclxufSk7XHJcblxyXG5mdW5jdGlvbiB0ZXh0KCkge1xyXG5cdGNvbnN0IG9iaiA9IFtcclxuXHRcdHtcclxuXHRcdFx0bmFtZTogYFtDTEldKGh0dHBzOi8vZ2l0aHViLmNvbS9zZXJuLWhhbmRsZXIvY2xpKTpgLFxyXG5cdFx0XHR2YWx1ZTogYFxcYCAtIFxcYCBVcGRhdGVkIHRlbXBsYXRlcyBmb3IgdjJgLFxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFx0bmFtZTogYFtAc2Vybi9oYW5kbGVyXShodHRwczovL3d3dy5ucG1qcy5jb20vcGFja2FnZS9Ac2Vybi9oYW5kbGVyKTpgLFxyXG5cdFx0XHR2YWx1ZTogYFxcYCAtIFxcYCBSZWFkIGJsb2cgKEkgd3JvdGUgZXZlcnl0aGluZyBoZXJlKSBodHRwczovL3Nlcm4uZGV2L2Jsb2dgLFxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFx0bmFtZTogYFtXZWJzaXRlXShodHRwczovL3Nlcm4uZGV2KWAsXHJcblx0XHRcdHZhbHVlOiBgXFxgIC0gXFxgIEJsb2cgMi4wYCxcclxuXHRcdH0sXHJcblx0XHQvLyB7XHJcblx0XHQvLyBcdG5hbWU6IGBbQ29tbXVuaXR5IGJvdF0oaHR0cHM6Ly9naXRodWIuY29tL3Nlcm4taGFuZGxlci9zZXJuLWNvbW11bml0eSlgLFxyXG5cdFx0Ly8gXHR2YWx1ZTogYFxcYCAtIFxcYCBEb2N1bWVudGF0aW9uIGF0IHlvdXIgaGFuZHMgaW4gdGhpcyBzZXJ2ZXIhXFxuXFxgIC0gXFxgIEF1dG9jb21wbGV0ZXNcXG5cXGAgLSBcXGAgVGFnIFN5c3RlbVxcblxcYCAtIFxcYCBGZWF0dXJlcyBhbGwgdGhlIHBsdWdpbnMgaW4gW3RoaXMgcmVwb3NpdG9yeV0oaHR0cHM6Ly9naXRodWIuY29tL3Nlcm4taGFuZGxlci9hd2Vzb21lLXBsdWdpbnMpYCxcclxuXHRcdC8vIH0sXHJcblx0XTtcclxuXHRyZXR1cm4gb2JqLm1hcCgoeyBuYW1lLCB2YWx1ZSB9KSA9PiBgKioke25hbWV9KipcXG4ke3ZhbHVlfWApLmpvaW4oXCJcXG5cXG5cIik7XHJcbn0iXX0=
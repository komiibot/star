"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handler_1 = require("@sern/handler");
const publish_1 = require("../../plugins/publish");
const index_1 = require("../../index");
exports.default = (0, handler_1.commandModule)({
    type: handler_1.CommandType.Both,
    plugins: [(0, publish_1.publish)()],
    description: "Check your, or someone elses balance.",
    alias: [],
    execute: async (ctx, args) => {
        const economy = await index_1.prisma.economy.findFirst({
            where: {
                userId: ctx === null || ctx === void 0 ? void 0 : ctx.message.author.id,
            },
        });
        if (!economy)
            return ctx.reply("I was unable to find that user.");
        await ctx.reply({ content: `Cash: ${economy.cash}\nBank: ${economy.bank}\nNetworth: ${economy.networth}` });
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW52ZW50b3J5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbW1hbmRzL2Vjb25vbXkvaW52ZW50b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMkNBQTJEO0FBQzNELG1EQUFnRDtBQUNoRCx1Q0FBcUM7QUFFckMsa0JBQWUsSUFBQSx1QkFBYSxFQUFDO0lBQ3pCLElBQUksRUFBRSxxQkFBVyxDQUFDLElBQUk7SUFDdEIsT0FBTyxFQUFFLENBQUMsSUFBQSxpQkFBTyxHQUFFLENBQUM7SUFDcEIsV0FBVyxFQUFFLHVDQUF1QztJQUNwRCxLQUFLLEVBQUcsRUFBRTtJQUNWLE9BQU8sRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFO1FBQ3pCLE1BQU0sT0FBTyxHQUFHLE1BQU0sY0FBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUM7WUFDM0MsS0FBSyxFQUFFO2dCQUNILE1BQU0sRUFBRSxHQUFHLGFBQUgsR0FBRyx1QkFBSCxHQUFHLENBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFO2FBQ2pDO1NBQ0osQ0FBQyxDQUFDO1FBRUgsSUFBRyxDQUFDLE9BQU87WUFBRSxPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsaUNBQWlDLENBQUMsQ0FBQztRQUVqRSxNQUFNLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxPQUFPLEVBQUUsU0FBUyxPQUFPLENBQUMsSUFBSSxXQUFXLE9BQU8sQ0FBQyxJQUFJLGVBQWUsT0FBTyxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNoSCxDQUFDO0NBQ0osQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY29tbWFuZE1vZHVsZSwgQ29tbWFuZFR5cGUgfSBmcm9tIFwiQHNlcm4vaGFuZGxlclwiO1xyXG5pbXBvcnQgeyBwdWJsaXNoIH0gZnJvbSBcIi4uLy4uL3BsdWdpbnMvcHVibGlzaFwiO1xyXG5pbXBvcnQgeyBwcmlzbWEgfSBmcm9tIFwiLi4vLi4vaW5kZXhcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbW1hbmRNb2R1bGUoe1xyXG4gICAgdHlwZTogQ29tbWFuZFR5cGUuQm90aCxcclxuICAgIHBsdWdpbnM6IFtwdWJsaXNoKCldLFxyXG4gICAgZGVzY3JpcHRpb246IFwiQ2hlY2sgeW91ciwgb3Igc29tZW9uZSBlbHNlcyBiYWxhbmNlLlwiLFxyXG4gICAgYWxpYXMgOiBbXSxcclxuICAgIGV4ZWN1dGU6IGFzeW5jIChjdHgsIGFyZ3MpID0+IHtcclxuICAgICAgICBjb25zdCBlY29ub215ID0gYXdhaXQgcHJpc21hLmVjb25vbXkuZmluZEZpcnN0KHtcclxuICAgICAgICAgICAgd2hlcmU6IHtcclxuICAgICAgICAgICAgICAgIHVzZXJJZDogY3R4Py5tZXNzYWdlLmF1dGhvci5pZCxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYoIWVjb25vbXkpIHJldHVybiBjdHgucmVwbHkoXCJJIHdhcyB1bmFibGUgdG8gZmluZCB0aGF0IHVzZXIuXCIpO1xyXG5cclxuICAgICAgICBhd2FpdCBjdHgucmVwbHkoeyBjb250ZW50OiBgQ2FzaDogJHtlY29ub215LmNhc2h9XFxuQmFuazogJHtlY29ub215LmJhbmt9XFxuTmV0d29ydGg6ICR7ZWNvbm9teS5uZXR3b3J0aH1gIH0pO1xyXG4gICAgfSxcclxufSk7Il19
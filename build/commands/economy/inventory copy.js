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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW52ZW50b3J5IGNvcHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tbWFuZHMvZWNvbm9teS9pbnZlbnRvcnkgY29weS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDJDQUEyRDtBQUMzRCxtREFBZ0Q7QUFDaEQsdUNBQXFDO0FBRXJDLGtCQUFlLElBQUEsdUJBQWEsRUFBQztJQUN6QixJQUFJLEVBQUUscUJBQVcsQ0FBQyxJQUFJO0lBQ3RCLE9BQU8sRUFBRSxDQUFDLElBQUEsaUJBQU8sR0FBRSxDQUFDO0lBQ3BCLFdBQVcsRUFBRSx1Q0FBdUM7SUFDcEQsS0FBSyxFQUFHLEVBQUU7SUFDVixPQUFPLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRTtRQUN6QixNQUFNLE9BQU8sR0FBRyxNQUFNLGNBQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDO1lBQzNDLEtBQUssRUFBRTtnQkFDSCxNQUFNLEVBQUUsR0FBRyxhQUFILEdBQUcsdUJBQUgsR0FBRyxDQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRTthQUNqQztTQUNKLENBQUMsQ0FBQztRQUVILElBQUcsQ0FBQyxPQUFPO1lBQUUsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7UUFFakUsTUFBTSxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsT0FBTyxFQUFFLFNBQVMsT0FBTyxDQUFDLElBQUksV0FBVyxPQUFPLENBQUMsSUFBSSxlQUFlLE9BQU8sQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDaEgsQ0FBQztDQUNKLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNvbW1hbmRNb2R1bGUsIENvbW1hbmRUeXBlIH0gZnJvbSBcIkBzZXJuL2hhbmRsZXJcIjtcclxuaW1wb3J0IHsgcHVibGlzaCB9IGZyb20gXCIuLi8uLi9wbHVnaW5zL3B1Ymxpc2hcIjtcclxuaW1wb3J0IHsgcHJpc21hIH0gZnJvbSBcIi4uLy4uL2luZGV4XCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb21tYW5kTW9kdWxlKHtcclxuICAgIHR5cGU6IENvbW1hbmRUeXBlLkJvdGgsXHJcbiAgICBwbHVnaW5zOiBbcHVibGlzaCgpXSxcclxuICAgIGRlc2NyaXB0aW9uOiBcIkNoZWNrIHlvdXIsIG9yIHNvbWVvbmUgZWxzZXMgYmFsYW5jZS5cIixcclxuICAgIGFsaWFzIDogW10sXHJcbiAgICBleGVjdXRlOiBhc3luYyAoY3R4LCBhcmdzKSA9PiB7XHJcbiAgICAgICAgY29uc3QgZWNvbm9teSA9IGF3YWl0IHByaXNtYS5lY29ub215LmZpbmRGaXJzdCh7XHJcbiAgICAgICAgICAgIHdoZXJlOiB7XHJcbiAgICAgICAgICAgICAgICB1c2VySWQ6IGN0eD8ubWVzc2FnZS5hdXRob3IuaWQsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmKCFlY29ub215KSByZXR1cm4gY3R4LnJlcGx5KFwiSSB3YXMgdW5hYmxlIHRvIGZpbmQgdGhhdCB1c2VyLlwiKTtcclxuXHJcbiAgICAgICAgYXdhaXQgY3R4LnJlcGx5KHsgY29udGVudDogYENhc2g6ICR7ZWNvbm9teS5jYXNofVxcbkJhbms6ICR7ZWNvbm9teS5iYW5rfVxcbk5ldHdvcnRoOiAke2Vjb25vbXkubmV0d29ydGh9YCB9KTtcclxuICAgIH0sXHJcbn0pOyJdfQ==
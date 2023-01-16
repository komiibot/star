"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handler_1 = require("@sern/handler");
const publish_1 = require("../../plugins/publish");
const modules_1 = require("../../modules");
const index_1 = require("../../index");
exports.default = (0, handler_1.commandModule)({
    type: handler_1.CommandType.Both,
    plugins: [(0, publish_1.publish)()],
    description: "Check your current XP.",
    alias: [],
    execute: async (ctx, args) => {
        const levels = await index_1.prisma.leveling.findFirst({
            where: {
                userId: ctx === null || ctx === void 0 ? void 0 : ctx.message.author.id,
            },
        });
        let neededxp = 0;
        for (let i = 0; i < levels.level + 1; i++) {
            neededxp += (0, modules_1.GetGlobalXP)(i);
        }
        let newXp = levels.currentXp - neededxp;
        return ctx.reply({ content: `Level ${levels.level}\nCurrentXP: ${levels.currentXp}\nNeeded XP: ${newXp}/${(0, modules_1.GetGlobalXP)(levels.level + 1)}` });
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieHAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tbWFuZHMvZWNvbm9teS94cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDJDQUEyRDtBQUMzRCxtREFBZ0Q7QUFDaEQsMkNBQTRDO0FBRTVDLHVDQUFxQztBQUVyQyxrQkFBZSxJQUFBLHVCQUFhLEVBQUM7SUFDekIsSUFBSSxFQUFFLHFCQUFXLENBQUMsSUFBSTtJQUN0QixPQUFPLEVBQUUsQ0FBQyxJQUFBLGlCQUFPLEdBQUUsQ0FBQztJQUNwQixXQUFXLEVBQUUsd0JBQXdCO0lBQ3JDLEtBQUssRUFBRyxFQUFFO0lBQ1YsT0FBTyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUU7UUFDekIsTUFBTSxNQUFNLEdBQUcsTUFBTSxjQUFNLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQztZQUMzQyxLQUFLLEVBQUU7Z0JBQ0gsTUFBTSxFQUFFLEdBQUcsYUFBSCxHQUFHLHVCQUFILEdBQUcsQ0FBRSxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUU7YUFDakM7U0FDSixDQUFDLENBQUM7UUFFSCxJQUFJLFFBQVEsR0FBRyxDQUFDLENBQUM7UUFDakIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3ZDLFFBQVEsSUFBSSxJQUFBLHFCQUFXLEVBQUMsQ0FBQyxDQUFDLENBQUE7U0FDN0I7UUFDRCxJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztRQUN4QyxPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxPQUFPLEVBQUUsU0FBUyxNQUFNLENBQUMsS0FBSyxnQkFBZ0IsTUFBTSxDQUFDLFNBQVMsZ0JBQWdCLEtBQUssSUFBSSxJQUFBLHFCQUFXLEVBQUMsTUFBTSxDQUFDLEtBQUssR0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUMvSSxDQUFDO0NBQ0osQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY29tbWFuZE1vZHVsZSwgQ29tbWFuZFR5cGUgfSBmcm9tIFwiQHNlcm4vaGFuZGxlclwiO1xyXG5pbXBvcnQgeyBwdWJsaXNoIH0gZnJvbSBcIi4uLy4uL3BsdWdpbnMvcHVibGlzaFwiO1xyXG5pbXBvcnQgeyBHZXRHbG9iYWxYUCB9IGZyb20gXCIuLi8uLi9tb2R1bGVzXCI7XHJcbmltcG9ydCBmcyBmcm9tIFwiZnNcIjtcclxuaW1wb3J0IHsgcHJpc21hIH0gZnJvbSBcIi4uLy4uL2luZGV4XCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb21tYW5kTW9kdWxlKHtcclxuICAgIHR5cGU6IENvbW1hbmRUeXBlLkJvdGgsXHJcbiAgICBwbHVnaW5zOiBbcHVibGlzaCgpXSxcclxuICAgIGRlc2NyaXB0aW9uOiBcIkNoZWNrIHlvdXIgY3VycmVudCBYUC5cIixcclxuICAgIGFsaWFzIDogW10sXHJcbiAgICBleGVjdXRlOiBhc3luYyAoY3R4LCBhcmdzKSA9PiB7ICAgICAgICBcclxuICAgICAgICBjb25zdCBsZXZlbHMgPSBhd2FpdCBwcmlzbWEubGV2ZWxpbmcuZmluZEZpcnN0KHtcclxuICAgICAgICAgICAgd2hlcmU6IHtcclxuICAgICAgICAgICAgICAgIHVzZXJJZDogY3R4Py5tZXNzYWdlLmF1dGhvci5pZCxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgbmVlZGVkeHAgPSAwO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGV2ZWxzLmxldmVsICsgMTsgaSsrKSB7XHJcbiAgICAgICAgICAgIG5lZWRlZHhwICs9IEdldEdsb2JhbFhQKGkpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBuZXdYcCA9IGxldmVscy5jdXJyZW50WHAgLSBuZWVkZWR4cDtcclxuICAgICAgICByZXR1cm4gY3R4LnJlcGx5KHsgY29udGVudDogYExldmVsICR7bGV2ZWxzLmxldmVsfVxcbkN1cnJlbnRYUDogJHtsZXZlbHMuY3VycmVudFhwfVxcbk5lZWRlZCBYUDogJHtuZXdYcH0vJHtHZXRHbG9iYWxYUChsZXZlbHMubGV2ZWwrMSl9YCB9KTtcclxuICAgIH0sXHJcbn0pOyJdfQ==
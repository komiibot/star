"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handler_1 = require("@sern/handler");
const publish_1 = require("../../plugins/publish");
exports.default = (0, handler_1.commandModule)({
    type: handler_1.CommandType.Both,
    plugins: [(0, publish_1.publish)()],
    description: "A ping command",
    alias: ["pong"],
    execute: async (ctx, args) => {
        await ctx.reply({ content: "Pong!" });
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tYW5kcy9nZW5lcmFsL3BpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwyQ0FBMkQ7QUFDM0QsbURBQWdEO0FBRWhELGtCQUFlLElBQUEsdUJBQWEsRUFBQztJQUN6QixJQUFJLEVBQUUscUJBQVcsQ0FBQyxJQUFJO0lBQ3RCLE9BQU8sRUFBRSxDQUFDLElBQUEsaUJBQU8sR0FBRSxDQUFDO0lBQ3BCLFdBQVcsRUFBRSxnQkFBZ0I7SUFDN0IsS0FBSyxFQUFHLENBQUMsTUFBTSxDQUFDO0lBQ2hCLE9BQU8sRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFO1FBQ3pCLE1BQU0sR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO0lBQzFDLENBQUM7Q0FDSixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjb21tYW5kTW9kdWxlLCBDb21tYW5kVHlwZSB9IGZyb20gXCJAc2Vybi9oYW5kbGVyXCI7XHJcbmltcG9ydCB7IHB1Ymxpc2ggfSBmcm9tIFwiLi4vLi4vcGx1Z2lucy9wdWJsaXNoXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb21tYW5kTW9kdWxlKHtcclxuICAgIHR5cGU6IENvbW1hbmRUeXBlLkJvdGgsXHJcbiAgICBwbHVnaW5zOiBbcHVibGlzaCgpXSxcclxuICAgIGRlc2NyaXB0aW9uOiBcIkEgcGluZyBjb21tYW5kXCIsXHJcbiAgICBhbGlhcyA6IFtcInBvbmdcIl0sXHJcbiAgICBleGVjdXRlOiBhc3luYyAoY3R4LCBhcmdzKSA9PiB7XHJcbiAgICAgICAgYXdhaXQgY3R4LnJlcGx5KHsgY29udGVudDogXCJQb25nIVwiIH0pO1xyXG4gICAgfSxcclxufSk7Il19
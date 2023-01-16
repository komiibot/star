"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handler_1 = require("@sern/handler");
const publish_1 = require("../../plugins/publish");
exports.default = (0, handler_1.commandModule)({
    type: handler_1.CommandType.Both,
    plugins: [(0, publish_1.publish)()],
    description: "Check your, or someone elses balance.",
    alias: [],
    execute: async (ctx, args) => {
        await ctx.reply({ content: "Pong!" });
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFsYW5jZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tYW5kcy9lY29ub215L2JhbGFuY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwyQ0FBMkQ7QUFDM0QsbURBQWdEO0FBRWhELGtCQUFlLElBQUEsdUJBQWEsRUFBQztJQUN6QixJQUFJLEVBQUUscUJBQVcsQ0FBQyxJQUFJO0lBQ3RCLE9BQU8sRUFBRSxDQUFDLElBQUEsaUJBQU8sR0FBRSxDQUFDO0lBQ3BCLFdBQVcsRUFBRSx1Q0FBdUM7SUFDcEQsS0FBSyxFQUFHLEVBQUU7SUFDVixPQUFPLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRTtRQUN6QixNQUFNLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztJQUMxQyxDQUFDO0NBQ0osQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY29tbWFuZE1vZHVsZSwgQ29tbWFuZFR5cGUgfSBmcm9tIFwiQHNlcm4vaGFuZGxlclwiO1xyXG5pbXBvcnQgeyBwdWJsaXNoIH0gZnJvbSBcIi4uLy4uL3BsdWdpbnMvcHVibGlzaFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29tbWFuZE1vZHVsZSh7XHJcbiAgICB0eXBlOiBDb21tYW5kVHlwZS5Cb3RoLFxyXG4gICAgcGx1Z2luczogW3B1Ymxpc2goKV0sXHJcbiAgICBkZXNjcmlwdGlvbjogXCJDaGVjayB5b3VyLCBvciBzb21lb25lIGVsc2VzIGJhbGFuY2UuXCIsXHJcbiAgICBhbGlhcyA6IFtdLFxyXG4gICAgZXhlY3V0ZTogYXN5bmMgKGN0eCwgYXJncykgPT4ge1xyXG4gICAgICAgIGF3YWl0IGN0eC5yZXBseSh7IGNvbnRlbnQ6IFwiUG9uZyFcIiB9KTtcclxuICAgIH0sXHJcbn0pOyJdfQ==
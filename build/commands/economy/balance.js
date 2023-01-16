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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFsYW5jZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tYW5kcy9lY29ub215L2JhbGFuY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwyQ0FBMkQ7QUFDM0QsbURBQWdEO0FBQ2hELHVDQUFxQztBQUVyQyxrQkFBZSxJQUFBLHVCQUFhLEVBQUM7SUFDekIsSUFBSSxFQUFFLHFCQUFXLENBQUMsSUFBSTtJQUN0QixPQUFPLEVBQUUsQ0FBQyxJQUFBLGlCQUFPLEdBQUUsQ0FBQztJQUNwQixXQUFXLEVBQUUsdUNBQXVDO0lBQ3BELEtBQUssRUFBRyxFQUFFO0lBQ1YsT0FBTyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUU7UUFFekIsTUFBTSxPQUFPLEdBQUcsTUFBTSxjQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQztZQUMzQyxLQUFLLEVBQUU7Z0JBQ0gsTUFBTSxFQUFFLEdBQUcsYUFBSCxHQUFHLHVCQUFILEdBQUcsQ0FBRSxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUU7YUFDakM7U0FDSixDQUFDLENBQUM7UUFFSCxJQUFHLENBQUMsT0FBTztZQUFFLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO1FBRWpFLE1BQU0sR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLE9BQU8sRUFBRSxTQUFTLE9BQU8sQ0FBQyxJQUFJLFdBQVcsT0FBTyxDQUFDLElBQUksZUFBZSxPQUFPLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ2hILENBQUM7Q0FDSixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjb21tYW5kTW9kdWxlLCBDb21tYW5kVHlwZSB9IGZyb20gXCJAc2Vybi9oYW5kbGVyXCI7XHJcbmltcG9ydCB7IHB1Ymxpc2ggfSBmcm9tIFwiLi4vLi4vcGx1Z2lucy9wdWJsaXNoXCI7XHJcbmltcG9ydCB7IHByaXNtYSB9IGZyb20gXCIuLi8uLi9pbmRleFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29tbWFuZE1vZHVsZSh7XHJcbiAgICB0eXBlOiBDb21tYW5kVHlwZS5Cb3RoLFxyXG4gICAgcGx1Z2luczogW3B1Ymxpc2goKV0sXHJcbiAgICBkZXNjcmlwdGlvbjogXCJDaGVjayB5b3VyLCBvciBzb21lb25lIGVsc2VzIGJhbGFuY2UuXCIsXHJcbiAgICBhbGlhcyA6IFtdLFxyXG4gICAgZXhlY3V0ZTogYXN5bmMgKGN0eCwgYXJncykgPT4ge1xyXG5cclxuICAgICAgICBjb25zdCBlY29ub215ID0gYXdhaXQgcHJpc21hLmVjb25vbXkuZmluZEZpcnN0KHtcclxuICAgICAgICAgICAgd2hlcmU6IHtcclxuICAgICAgICAgICAgICAgIHVzZXJJZDogY3R4Py5tZXNzYWdlLmF1dGhvci5pZCxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYoIWVjb25vbXkpIHJldHVybiBjdHgucmVwbHkoXCJJIHdhcyB1bmFibGUgdG8gZmluZCB0aGF0IHVzZXIuXCIpO1xyXG5cclxuICAgICAgICBhd2FpdCBjdHgucmVwbHkoeyBjb250ZW50OiBgQ2FzaDogJHtlY29ub215LmNhc2h9XFxuQmFuazogJHtlY29ub215LmJhbmt9XFxuTmV0d29ydGg6ICR7ZWNvbm9teS5uZXR3b3J0aH1gIH0pO1xyXG4gICAgfSxcclxufSk7Il19
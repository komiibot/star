"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findGuild = exports.deleteGuild = exports.createGuild = void 0;
const index_1 = require("../index");
const logger_1 = require("./logger");
async function createGuild(guild) {
    const has = await index_1.prisma.guild.findFirst({
        where: {
            id: guild.id
        }
    });
    if (has)
        return;
    (0, logger_1.prisma)("prisma:createGuild", `Creating new guild with ID: ${guild.id}`);
    await index_1.prisma.guild.create({
        data: {
            id: guild.id
        }
    });
}
exports.createGuild = createGuild;
async function deleteGuild(guild) {
    const has = await index_1.prisma.guild.findFirst({
        where: {
            id: guild.id
        }
    });
    if (!has)
        return;
    (0, logger_1.prisma)("prisma:guildDelete", `Deleting entry for guild ID: ${guild.id}`);
    await index_1.prisma.guild.delete({
        where: {
            id: guild.id
        }
    });
}
exports.deleteGuild = deleteGuild;
async function findGuild(guild) {
    const g = await index_1.prisma.guild.findFirst({
        where: {
            id: guild.id
        }
    });
    if (!g)
        return this.createGuild(guild);
    this.id = g.id;
    return g;
}
exports.findGuild = findGuild;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3VpbGQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbW9kdWxlcy9ndWlsZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxvQ0FBa0M7QUFDbEMscUNBQTRDO0FBRXJDLEtBQUssVUFBVSxXQUFXLENBQUMsS0FBWTtJQUMxQyxNQUFNLEdBQUcsR0FBRyxNQUFNLGNBQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDO1FBQ3JDLEtBQUssRUFBRTtZQUNILEVBQUUsRUFBRSxLQUFLLENBQUMsRUFBRTtTQUNmO0tBQ0osQ0FBQyxDQUFDO0lBRUgsSUFBSSxHQUFHO1FBQUUsT0FBTztJQUVoQixJQUFBLGVBQU0sRUFBQyxvQkFBb0IsRUFBRSwrQkFBK0IsS0FBSyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDeEUsTUFBTSxjQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztRQUN0QixJQUFJLEVBQUU7WUFDRixFQUFFLEVBQUUsS0FBSyxDQUFDLEVBQUU7U0FDZjtLQUNKLENBQUMsQ0FBQTtBQUNOLENBQUM7QUFmRCxrQ0FlQztBQUVNLEtBQUssVUFBVSxXQUFXLENBQUMsS0FBWTtJQUMxQyxNQUFNLEdBQUcsR0FBRyxNQUFNLGNBQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDO1FBQ3JDLEtBQUssRUFBRTtZQUNILEVBQUUsRUFBRSxLQUFLLENBQUMsRUFBRTtTQUNmO0tBQ0osQ0FBQyxDQUFDO0lBRUgsSUFBSSxDQUFDLEdBQUc7UUFBRSxPQUFPO0lBRWpCLElBQUEsZUFBTSxFQUFDLG9CQUFvQixFQUFFLGdDQUFnQyxLQUFLLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUN6RSxNQUFNLGNBQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO1FBQ3RCLEtBQUssRUFBRTtZQUNILEVBQUUsRUFBRSxLQUFLLENBQUMsRUFBRTtTQUNmO0tBQ0osQ0FBQyxDQUFBO0FBQ04sQ0FBQztBQWZELGtDQWVDO0FBRU0sS0FBSyxVQUFVLFNBQVMsQ0FBQyxLQUFZO0lBQ3hDLE1BQU0sQ0FBQyxHQUFHLE1BQU0sY0FBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUM7UUFDbkMsS0FBSyxFQUFFO1lBQ0gsRUFBRSxFQUFFLEtBQUssQ0FBQyxFQUFFO1NBQ2Y7S0FDSixDQUFDLENBQUM7SUFFSCxJQUFJLENBQUMsQ0FBQztRQUFFLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUV2QyxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFFZixPQUFPLENBQUMsQ0FBQztBQUNiLENBQUM7QUFaRCw4QkFZQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEd1aWxkIH0gZnJvbSBcImRpc2NvcmQuanNcIjtcclxuaW1wb3J0IHsgcHJpc21hIH0gZnJvbSBcIi4uL2luZGV4XCI7XHJcbmltcG9ydCB7IHByaXNtYSBhcyBMb2dnZXIgfSBmcm9tIFwiLi9sb2dnZXJcIjtcclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjcmVhdGVHdWlsZChndWlsZDogR3VpbGQpOiBQcm9taXNlPHVua25vd24+IHtcclxuICAgIGNvbnN0IGhhcyA9IGF3YWl0IHByaXNtYS5ndWlsZC5maW5kRmlyc3Qoe1xyXG4gICAgICAgIHdoZXJlOiB7XHJcbiAgICAgICAgICAgIGlkOiBndWlsZC5pZFxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGlmIChoYXMpIHJldHVybjtcclxuXHJcbiAgICBMb2dnZXIoXCJwcmlzbWE6Y3JlYXRlR3VpbGRcIiwgYENyZWF0aW5nIG5ldyBndWlsZCB3aXRoIElEOiAke2d1aWxkLmlkfWApO1xyXG4gICAgYXdhaXQgcHJpc21hLmd1aWxkLmNyZWF0ZSh7XHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICBpZDogZ3VpbGQuaWRcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZGVsZXRlR3VpbGQoZ3VpbGQ6IEd1aWxkKTogUHJvbWlzZTx1bmtub3duPiB7XHJcbiAgICBjb25zdCBoYXMgPSBhd2FpdCBwcmlzbWEuZ3VpbGQuZmluZEZpcnN0KHtcclxuICAgICAgICB3aGVyZToge1xyXG4gICAgICAgICAgICBpZDogZ3VpbGQuaWRcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoIWhhcykgcmV0dXJuO1xyXG5cclxuICAgIExvZ2dlcihcInByaXNtYTpndWlsZERlbGV0ZVwiLCBgRGVsZXRpbmcgZW50cnkgZm9yIGd1aWxkIElEOiAke2d1aWxkLmlkfWApO1xyXG4gICAgYXdhaXQgcHJpc21hLmd1aWxkLmRlbGV0ZSh7XHJcbiAgICAgICAgd2hlcmU6IHtcclxuICAgICAgICAgICAgaWQ6IGd1aWxkLmlkXHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGZpbmRHdWlsZChndWlsZDogR3VpbGQpOiBQcm9taXNlPHVua25vd24+IHtcclxuICAgIGNvbnN0IGcgPSBhd2FpdCBwcmlzbWEuZ3VpbGQuZmluZEZpcnN0KHtcclxuICAgICAgICB3aGVyZToge1xyXG4gICAgICAgICAgICBpZDogZ3VpbGQuaWRcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoIWcpIHJldHVybiB0aGlzLmNyZWF0ZUd1aWxkKGd1aWxkKTtcclxuXHJcbiAgICB0aGlzLmlkID0gZy5pZDtcclxuXHJcbiAgICByZXR1cm4gZztcclxufSJdfQ==
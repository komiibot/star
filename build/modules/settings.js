"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSettings = exports.findUser = exports.createUser = exports.findGuild = exports.deleteGuild = exports.createGuild = void 0;
const index_1 = require("../index");
const logger_1 = require("#utils/logger");
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
        return createGuild(guild);
    return g;
}
exports.findGuild = findGuild;
async function createUser(user) {
    const has = await index_1.prisma.users.findFirst({
        where: {
            id: user.id
        }
    });
    if (has)
        return;
    (0, logger_1.prisma)("prisma:createUser", `Creating new user with ID: ${user.id}`);
    await index_1.prisma.users.create({
        data: {
            id: user.id
        }
    });
    await index_1.prisma.leveling.create({
        data: {
            userId: user.id
        }
    });
    await index_1.prisma.inventory.create({
        data: {
            userId: user.id
        }
    });
}
exports.createUser = createUser;
async function findUser(user) {
    const mem = await index_1.prisma.users.findFirst({
        where: {
            id: user.id
        }
    });
    if (!mem)
        return createUser(user);
    return mem;
}
exports.findUser = findUser;
async function getSettings(guild) {
    const find = await index_1.prisma.settings.findFirst({
        where: {
            guildId: guild.id,
        },
    });
    if (!find)
        await index_1.prisma.settings.create({
            data: {
                guildId: guild.id
            }
        });
    return find;
}
exports.getSettings = getSettings;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dGluZ3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbW9kdWxlcy9zZXR0aW5ncy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSxvQ0FBa0M7QUFDbEMsMENBQWlEO0FBRTFDLEtBQUssVUFBVSxXQUFXLENBQUMsS0FBWTtJQUMxQyxNQUFNLEdBQUcsR0FBRyxNQUFNLGNBQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDO1FBQ3JDLEtBQUssRUFBRTtZQUNILEVBQUUsRUFBRSxLQUFLLENBQUMsRUFBRTtTQUNmO0tBQ0osQ0FBQyxDQUFDO0lBRUgsSUFBSSxHQUFHO1FBQUUsT0FBTztJQUVoQixJQUFBLGVBQU0sRUFBQyxvQkFBb0IsRUFBRSwrQkFBK0IsS0FBSyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDeEUsTUFBTSxjQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztRQUN0QixJQUFJLEVBQUU7WUFDRixFQUFFLEVBQUUsS0FBSyxDQUFDLEVBQUU7U0FDZjtLQUNKLENBQUMsQ0FBQTtBQUNOLENBQUM7QUFmRCxrQ0FlQztBQUVNLEtBQUssVUFBVSxXQUFXLENBQUMsS0FBWTtJQUMxQyxNQUFNLEdBQUcsR0FBRyxNQUFNLGNBQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDO1FBQ3JDLEtBQUssRUFBRTtZQUNILEVBQUUsRUFBRSxLQUFLLENBQUMsRUFBRTtTQUNmO0tBQ0osQ0FBQyxDQUFDO0lBRUgsSUFBSSxDQUFDLEdBQUc7UUFBRSxPQUFPO0lBRWpCLElBQUEsZUFBTSxFQUFDLG9CQUFvQixFQUFFLGdDQUFnQyxLQUFLLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUN6RSxNQUFNLGNBQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO1FBQ3RCLEtBQUssRUFBRTtZQUNILEVBQUUsRUFBRSxLQUFLLENBQUMsRUFBRTtTQUNmO0tBQ0osQ0FBQyxDQUFBO0FBQ04sQ0FBQztBQWZELGtDQWVDO0FBRU0sS0FBSyxVQUFVLFNBQVMsQ0FBQyxLQUFZO0lBQ3hDLE1BQU0sQ0FBQyxHQUFHLE1BQU0sY0FBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUM7UUFDbkMsS0FBSyxFQUFFO1lBQ0gsRUFBRSxFQUFFLEtBQUssQ0FBQyxFQUFFO1NBQ2Y7S0FDSixDQUFDLENBQUM7SUFFSCxJQUFJLENBQUMsQ0FBQztRQUFFLE9BQU8sV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBRWxDLE9BQU8sQ0FBQyxDQUFDO0FBQ2IsQ0FBQztBQVZELDhCQVVDO0FBRU0sS0FBSyxVQUFVLFVBQVUsQ0FBQyxJQUFpQjtJQUM5QyxNQUFNLEdBQUcsR0FBRyxNQUFNLGNBQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDO1FBQ3JDLEtBQUssRUFBRTtZQUNILEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRTtTQUNkO0tBQ0osQ0FBQyxDQUFDO0lBRUgsSUFBSSxHQUFHO1FBQUUsT0FBTztJQUVoQixJQUFBLGVBQU0sRUFBQyxtQkFBbUIsRUFBRSw4QkFBOEIsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDckUsTUFBTSxjQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztRQUN0QixJQUFJLEVBQUU7WUFDRixFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUU7U0FDZDtLQUNKLENBQUMsQ0FBQTtJQUNGLE1BQU0sY0FBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUM7UUFDekIsSUFBSSxFQUFFO1lBQ0YsTUFBTSxFQUFFLElBQUksQ0FBQyxFQUFFO1NBQ2xCO0tBQ0osQ0FBQyxDQUFDO0lBQ0gsTUFBTSxjQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQztRQUMxQixJQUFJLEVBQUU7WUFDRixNQUFNLEVBQUUsSUFBSSxDQUFDLEVBQUU7U0FDbEI7S0FDSixDQUFDLENBQUM7QUFDUCxDQUFDO0FBekJELGdDQXlCQztBQUVNLEtBQUssVUFBVSxRQUFRLENBQUMsSUFBaUI7SUFDNUMsTUFBTSxHQUFHLEdBQUcsTUFBTSxjQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQztRQUNyQyxLQUFLLEVBQUU7WUFDSCxFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUU7U0FDZDtLQUNKLENBQVUsQ0FBQztJQUVaLElBQUksQ0FBQyxHQUFHO1FBQUUsT0FBTyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFbEMsT0FBTyxHQUFZLENBQUM7QUFDeEIsQ0FBQztBQVZELDRCQVVDO0FBRU0sS0FBSyxVQUFVLFdBQVcsQ0FBQyxLQUFZO0lBQzFDLE1BQU0sSUFBSSxHQUFHLE1BQU0sY0FBTSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUM7UUFDekMsS0FBSyxFQUFFO1lBQ0gsT0FBTyxFQUFFLEtBQUssQ0FBQyxFQUFFO1NBQ3BCO0tBQ0osQ0FBQyxDQUFDO0lBRUgsSUFBSSxDQUFDLElBQUk7UUFBRSxNQUFNLGNBQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO1lBQ3BDLElBQUksRUFBRTtnQkFDRixPQUFPLEVBQUUsS0FBSyxDQUFDLEVBQVk7YUFDOUI7U0FDSixDQUFDLENBQUE7SUFFRixPQUFPLElBQUssQ0FBQztBQUNqQixDQUFDO0FBZEQsa0NBY0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBVc2VycyB9IGZyb20gXCJAcHJpc21hL2NsaWVudFwiO1xyXG5pbXBvcnQgeyBHdWlsZCwgR3VpbGRNZW1iZXIgfSBmcm9tIFwiZGlzY29yZC5qc1wiO1xyXG5pbXBvcnQgeyBwcmlzbWEgfSBmcm9tIFwiLi4vaW5kZXhcIjtcclxuaW1wb3J0IHsgcHJpc21hIGFzIExvZ2dlciB9IGZyb20gXCIjdXRpbHMvbG9nZ2VyXCI7XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY3JlYXRlR3VpbGQoZ3VpbGQ6IEd1aWxkKTogUHJvbWlzZTx1bmtub3duPiB7XHJcbiAgICBjb25zdCBoYXMgPSBhd2FpdCBwcmlzbWEuZ3VpbGQuZmluZEZpcnN0KHtcclxuICAgICAgICB3aGVyZToge1xyXG4gICAgICAgICAgICBpZDogZ3VpbGQuaWRcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoaGFzKSByZXR1cm47XHJcblxyXG4gICAgTG9nZ2VyKFwicHJpc21hOmNyZWF0ZUd1aWxkXCIsIGBDcmVhdGluZyBuZXcgZ3VpbGQgd2l0aCBJRDogJHtndWlsZC5pZH1gKTtcclxuICAgIGF3YWl0IHByaXNtYS5ndWlsZC5jcmVhdGUoe1xyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgaWQ6IGd1aWxkLmlkXHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGRlbGV0ZUd1aWxkKGd1aWxkOiBHdWlsZCk6IFByb21pc2U8dW5rbm93bj4ge1xyXG4gICAgY29uc3QgaGFzID0gYXdhaXQgcHJpc21hLmd1aWxkLmZpbmRGaXJzdCh7XHJcbiAgICAgICAgd2hlcmU6IHtcclxuICAgICAgICAgICAgaWQ6IGd1aWxkLmlkXHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKCFoYXMpIHJldHVybjtcclxuXHJcbiAgICBMb2dnZXIoXCJwcmlzbWE6Z3VpbGREZWxldGVcIiwgYERlbGV0aW5nIGVudHJ5IGZvciBndWlsZCBJRDogJHtndWlsZC5pZH1gKTtcclxuICAgIGF3YWl0IHByaXNtYS5ndWlsZC5kZWxldGUoe1xyXG4gICAgICAgIHdoZXJlOiB7XHJcbiAgICAgICAgICAgIGlkOiBndWlsZC5pZFxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBmaW5kR3VpbGQoZ3VpbGQ6IEd1aWxkKTogUHJvbWlzZTx1bmtub3duPiB7XHJcbiAgICBjb25zdCBnID0gYXdhaXQgcHJpc21hLmd1aWxkLmZpbmRGaXJzdCh7XHJcbiAgICAgICAgd2hlcmU6IHtcclxuICAgICAgICAgICAgaWQ6IGd1aWxkLmlkXHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKCFnKSByZXR1cm4gY3JlYXRlR3VpbGQoZ3VpbGQpO1xyXG5cclxuICAgIHJldHVybiBnO1xyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY3JlYXRlVXNlcih1c2VyOiBHdWlsZE1lbWJlcik6IFByb21pc2U8dW5rbm93bj4ge1xyXG4gICAgY29uc3QgaGFzID0gYXdhaXQgcHJpc21hLnVzZXJzLmZpbmRGaXJzdCh7XHJcbiAgICAgICAgd2hlcmU6IHtcclxuICAgICAgICAgICAgaWQ6IHVzZXIuaWRcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoaGFzKSByZXR1cm47XHJcblxyXG4gICAgTG9nZ2VyKFwicHJpc21hOmNyZWF0ZVVzZXJcIiwgYENyZWF0aW5nIG5ldyB1c2VyIHdpdGggSUQ6ICR7dXNlci5pZH1gKTtcclxuICAgIGF3YWl0IHByaXNtYS51c2Vycy5jcmVhdGUoe1xyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgaWQ6IHVzZXIuaWRcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG4gICAgYXdhaXQgcHJpc21hLmxldmVsaW5nLmNyZWF0ZSh7XHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICB1c2VySWQ6IHVzZXIuaWRcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIGF3YWl0IHByaXNtYS5pbnZlbnRvcnkuY3JlYXRlKHtcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgIHVzZXJJZDogdXNlci5pZFxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZmluZFVzZXIodXNlcjogR3VpbGRNZW1iZXIpOiBQcm9taXNlPHVua25vd24+IHtcclxuICAgIGNvbnN0IG1lbSA9IGF3YWl0IHByaXNtYS51c2Vycy5maW5kRmlyc3Qoe1xyXG4gICAgICAgIHdoZXJlOiB7XHJcbiAgICAgICAgICAgIGlkOiB1c2VyLmlkXHJcbiAgICAgICAgfVxyXG4gICAgfSkgYXMgVXNlcnM7XHJcblxyXG4gICAgaWYgKCFtZW0pIHJldHVybiBjcmVhdGVVc2VyKHVzZXIpO1xyXG5cclxuICAgIHJldHVybiBtZW0gYXMgVXNlcnM7XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRTZXR0aW5ncyhndWlsZDogR3VpbGQpOiBQcm9taXNlPHVua25vd24+IHtcclxuICAgIGNvbnN0IGZpbmQgPSBhd2FpdCBwcmlzbWEuc2V0dGluZ3MuZmluZEZpcnN0KHtcclxuICAgICAgICB3aGVyZToge1xyXG4gICAgICAgICAgICBndWlsZElkOiBndWlsZC5pZCxcclxuICAgICAgICB9LFxyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKCFmaW5kKSBhd2FpdCBwcmlzbWEuc2V0dGluZ3MuY3JlYXRlKHtcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgIGd1aWxkSWQ6IGd1aWxkLmlkIGFzIHN0cmluZ1xyXG4gICAgICAgIH1cclxuICAgIH0pXHJcblxyXG4gICAgcmV0dXJuIGZpbmQhO1xyXG59Il19
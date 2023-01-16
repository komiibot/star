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
const index_1 = require("../index");
const modules_1 = require("../modules");
const leveling = __importStar(require("../modules/leveling"));
exports.default = (0, handler_1.eventModule)({
    type: handler_1.EventType.Discord,
    plugins: [],
    name: "messageCreate",
    async execute(msg) {
        if (msg.author.bot || msg.author.id === msg.client.user.id || msg.channel.type === discord_js_1.ChannelType.DM)
            return;
        await (0, modules_1.findUser)(msg.member);
        await (0, modules_1.findGuild)(msg.guild);
        await (0, modules_1.getSettings)(msg.guild);
        const settings = await index_1.prisma.settings.findFirst({
            where: {
                guildId: msg === null || msg === void 0 ? void 0 : msg.guild.id,
            },
        });
        const levels = await index_1.prisma.leveling.findFirst({
            where: {
                userId: msg === null || msg === void 0 ? void 0 : msg.author.id,
            },
        });
        const user = await index_1.prisma.users.findFirst({
            where: {
                id: msg === null || msg === void 0 ? void 0 : msg.author.id,
            },
        });
        if (settings.leveling === true) {
            return await leveling.levelHandler(msg, levels, user);
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZUNyZWF0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ldmVudHMvbWVzc2FnZUNyZWF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMkNBQXVEO0FBQ3ZELDJDQUEwRDtBQUMxRCxvQ0FBa0M7QUFDbEMsd0NBQThEO0FBQzlELDhEQUFnRDtBQUVoRCxrQkFBZSxJQUFBLHFCQUFXLEVBQUM7SUFDdkIsSUFBSSxFQUFFLG1CQUFTLENBQUMsT0FBTztJQUN2QixPQUFPLEVBQUcsRUFBRTtJQUNaLElBQUksRUFBRSxlQUFlO0lBQ3JCLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBWTtRQUN4QixJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxLQUFLLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSyxDQUFDLEVBQUUsSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksS0FBSyx3QkFBVyxDQUFDLEVBQUU7WUFBRSxPQUFPO1FBRTNHLE1BQU0sSUFBQSxrQkFBUSxFQUFDLEdBQUcsQ0FBQyxNQUFPLENBQUMsQ0FBQztRQUM1QixNQUFNLElBQUEsbUJBQVMsRUFBQyxHQUFHLENBQUMsS0FBTSxDQUFDLENBQUM7UUFDNUIsTUFBTSxJQUFBLHFCQUFXLEVBQUMsR0FBRyxDQUFDLEtBQU0sQ0FBQyxDQUFDO1FBRWhDLE1BQU0sUUFBUSxHQUFHLE1BQU0sY0FBTSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUM7WUFDN0MsS0FBSyxFQUFFO2dCQUNILE9BQU8sRUFBRSxHQUFHLGFBQUgsR0FBRyx1QkFBSCxHQUFHLENBQUUsS0FBSyxDQUFDLEVBQUU7YUFDekI7U0FDSCxDQUFDLENBQUM7UUFFSCxNQUFNLE1BQU0sR0FBRyxNQUFNLGNBQU0sQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDO1lBQzlDLEtBQUssRUFBRTtnQkFDSCxNQUFNLEVBQUUsR0FBRyxhQUFILEdBQUcsdUJBQUgsR0FBRyxDQUFFLE1BQU0sQ0FBQyxFQUFFO2FBQ3pCO1NBQ0QsQ0FBQyxDQUFDO1FBRUgsTUFBTSxJQUFJLEdBQUcsTUFBTSxjQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQztZQUN6QyxLQUFLLEVBQUU7Z0JBQ0gsRUFBRSxFQUFFLEdBQUcsYUFBSCxHQUFHLHVCQUFILEdBQUcsQ0FBRSxNQUFNLENBQUMsRUFBRTthQUNyQjtTQUNELENBQUMsQ0FBQztRQUVILElBQUksUUFBUSxDQUFDLFFBQVEsS0FBSyxJQUFJLEVBQUU7WUFDL0IsT0FBTyxNQUFNLFFBQVEsQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztTQUN0RDtJQUNGLENBQUM7Q0FDRixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBldmVudE1vZHVsZSwgRXZlbnRUeXBlIH0gZnJvbSBcIkBzZXJuL2hhbmRsZXJcIjtcclxuaW1wb3J0IHsgQ2hhbm5lbFR5cGUsIEV2ZW50cywgTWVzc2FnZSB9IGZyb20gXCJkaXNjb3JkLmpzXCI7XHJcbmltcG9ydCB7IHByaXNtYSB9IGZyb20gXCIuLi9pbmRleFwiO1xyXG5pbXBvcnQgeyBmaW5kR3VpbGQsIGZpbmRVc2VyLCBnZXRTZXR0aW5ncyB9IGZyb20gXCIuLi9tb2R1bGVzXCI7XHJcbmltcG9ydCAqIGFzIGxldmVsaW5nIGZyb20gXCIuLi9tb2R1bGVzL2xldmVsaW5nXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBldmVudE1vZHVsZSh7XHJcbiAgICB0eXBlOiBFdmVudFR5cGUuRGlzY29yZCxcclxuICAgIHBsdWdpbnMgOiBbXSxcclxuICAgIG5hbWU6IFwibWVzc2FnZUNyZWF0ZVwiLFxyXG4gICAgYXN5bmMgZXhlY3V0ZShtc2c6IE1lc3NhZ2UpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgaWYgKG1zZy5hdXRob3IuYm90IHx8IG1zZy5hdXRob3IuaWQgPT09IG1zZy5jbGllbnQudXNlciEuaWQgfHwgbXNnLmNoYW5uZWwudHlwZSA9PT0gQ2hhbm5lbFR5cGUuRE0pIHJldHVybjtcclxuICAgICAgXHJcbiAgICAgIGF3YWl0IGZpbmRVc2VyKG1zZy5tZW1iZXIhKTtcclxuICAgICAgYXdhaXQgZmluZEd1aWxkKG1zZy5ndWlsZCEpO1xyXG4gICAgICBhd2FpdCBnZXRTZXR0aW5ncyhtc2cuZ3VpbGQhKTtcclxuXHJcbiAgICBjb25zdCBzZXR0aW5ncyA9IGF3YWl0IHByaXNtYS5zZXR0aW5ncy5maW5kRmlyc3Qoe1xyXG4gICAgICAgIHdoZXJlOiB7XHJcbiAgICAgICAgICAgIGd1aWxkSWQ6IG1zZz8uZ3VpbGQuaWQsXHJcbiAgICAgICAgfSxcclxuICAgICB9KTtcclxuXHJcbiAgICAgY29uc3QgbGV2ZWxzID0gYXdhaXQgcHJpc21hLmxldmVsaW5nLmZpbmRGaXJzdCh7XHJcbiAgICAgIHdoZXJlOiB7XHJcbiAgICAgICAgICB1c2VySWQ6IG1zZz8uYXV0aG9yLmlkLFxyXG4gICAgICB9LFxyXG4gICAgIH0pO1xyXG5cclxuICAgICBjb25zdCB1c2VyID0gYXdhaXQgcHJpc21hLnVzZXJzLmZpbmRGaXJzdCh7XHJcbiAgICAgIHdoZXJlOiB7XHJcbiAgICAgICAgICBpZDogbXNnPy5hdXRob3IuaWQsXHJcbiAgICAgIH0sXHJcbiAgICAgfSk7XHJcblxyXG4gICAgIGlmIChzZXR0aW5ncy5sZXZlbGluZyA9PT0gdHJ1ZSkge1xyXG4gICAgICByZXR1cm4gYXdhaXQgbGV2ZWxpbmcubGV2ZWxIYW5kbGVyKG1zZywgbGV2ZWxzLCB1c2VyKTtcclxuICAgICB9XHJcbiAgICB9XHJcbiAgfSk7Il19
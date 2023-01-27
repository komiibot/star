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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const framework_1 = require("@sapphire/framework");
const discord_js_1 = require("discord.js");
const client_1 = require("@prisma/client");
const logger_1 = require("#utils/logger");
const utils = __importStar(require("#utils/index"));
const settings = __importStar(require("#modules/settings"));
const leveling = __importStar(require("#modules/economy/leveling"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.prisma = new client_1.PrismaClient();
framework_1.container.prisma = exports.prisma;
framework_1.container.log = logger_1.log;
framework_1.container.prismaLog = logger_1.prisma;
framework_1.container.utils = utils;
framework_1.container.settings = settings;
framework_1.container.leveling = leveling;
const client = new framework_1.SapphireClient({
    intents: [
        discord_js_1.GatewayIntentBits.Guilds,
        discord_js_1.GatewayIntentBits.GuildMembers,
        discord_js_1.GatewayIntentBits.GuildMessages,
        discord_js_1.GatewayIntentBits.MessageContent,
    ],
    loadMessageCommandListeners: true,
    defaultPrefix: "k?"
});
process.on("unhandledRejection", (err) => {
    (0, logger_1.log)("error", "Error", `Unhandled Rejection: ${err.stack}`);
});
process.on("uncaughtException", err => {
    (0, logger_1.log)("error", "Error", `Unhandled Exception: ${err}`, { timestamp: true, client: client });
});
client.login(process.env.TOKEN);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtREFBZ0U7QUFDaEUsMkNBQStDO0FBQy9DLDJDQUE4QztBQUM5QywwQ0FBeUQ7QUFDekQsb0RBQXNDO0FBQ3RDLDREQUE4QztBQUM5QyxvRUFBc0Q7QUFDdEQsb0RBQTRCO0FBQzVCLGdCQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7QUFFSCxRQUFBLE1BQU0sR0FBRyxJQUFJLHFCQUFZLEVBQUUsQ0FBQztBQUV6QyxxQkFBUyxDQUFDLE1BQU0sR0FBRyxjQUFNLENBQUM7QUFDMUIscUJBQVMsQ0FBQyxHQUFHLEdBQUcsWUFBRyxDQUFDO0FBQ3BCLHFCQUFTLENBQUMsU0FBUyxHQUFHLGVBQVMsQ0FBQztBQUNoQyxxQkFBUyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7QUFDeEIscUJBQVMsQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0FBQzlCLHFCQUFTLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztBQW9COUIsTUFBTSxNQUFNLEdBQUcsSUFBSSwwQkFBYyxDQUFDO0lBQ2pDLE9BQU8sRUFBRTtRQUNSLDhCQUFpQixDQUFDLE1BQU07UUFDeEIsOEJBQWlCLENBQUMsWUFBWTtRQUM5Qiw4QkFBaUIsQ0FBQyxhQUFhO1FBQy9CLDhCQUFpQixDQUFDLGNBQWM7S0FDaEM7SUFDRCwyQkFBMkIsRUFBRSxJQUFJO0lBQ2pDLGFBQWEsRUFBRSxJQUFJO0NBQ25CLENBQUMsQ0FBQztBQUVILE9BQU8sQ0FBQyxFQUFFLENBQUMsb0JBQW9CLEVBQUUsQ0FBQyxHQUFRLEVBQUUsRUFBRTtJQUM3QyxJQUFBLFlBQUcsRUFBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLHdCQUF3QixHQUFHLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztBQUM1RCxDQUFDLENBQUMsQ0FBQztBQUVILE9BQU8sQ0FBQyxFQUFFLENBQUMsbUJBQW1CLEVBQUUsR0FBRyxDQUFDLEVBQUU7SUFDckMsSUFBQSxZQUFHLEVBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSx3QkFBd0IsR0FBRyxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO0FBQzNGLENBQUMsQ0FBQyxDQUFDO0FBRUgsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY29udGFpbmVyLCBTYXBwaGlyZUNsaWVudCB9IGZyb20gJ0BzYXBwaGlyZS9mcmFtZXdvcmsnO1xyXG5pbXBvcnQgeyBHYXRld2F5SW50ZW50Qml0cyB9IGZyb20gXCJkaXNjb3JkLmpzXCI7XHJcbmltcG9ydCB7IFByaXNtYUNsaWVudCB9IGZyb20gXCJAcHJpc21hL2NsaWVudFwiO1xyXG5pbXBvcnQgeyBsb2csIHByaXNtYSBhcyBwcmlzbWFMb2cgfSBmcm9tIFwiI3V0aWxzL2xvZ2dlclwiO1xyXG5pbXBvcnQgKiBhcyB1dGlscyBmcm9tIFwiI3V0aWxzL2luZGV4XCI7XHJcbmltcG9ydCAqIGFzIHNldHRpbmdzIGZyb20gXCIjbW9kdWxlcy9zZXR0aW5nc1wiO1xyXG5pbXBvcnQgKiBhcyBsZXZlbGluZyBmcm9tIFwiI21vZHVsZXMvZWNvbm9teS9sZXZlbGluZ1wiO1xyXG5pbXBvcnQgZG90ZW52IGZyb20gXCJkb3RlbnZcIjtcclxuZG90ZW52LmNvbmZpZygpO1xyXG5cclxuZXhwb3J0IGNvbnN0IHByaXNtYSA9IG5ldyBQcmlzbWFDbGllbnQoKTtcclxuXHJcbmNvbnRhaW5lci5wcmlzbWEgPSBwcmlzbWE7XHJcbmNvbnRhaW5lci5sb2cgPSBsb2c7XHJcbmNvbnRhaW5lci5wcmlzbWFMb2cgPSBwcmlzbWFMb2c7XHJcbmNvbnRhaW5lci51dGlscyA9IHV0aWxzO1xyXG5jb250YWluZXIuc2V0dGluZ3MgPSBzZXR0aW5ncztcclxuY29udGFpbmVyLmxldmVsaW5nID0gbGV2ZWxpbmc7XHJcblxyXG5kZWNsYXJlIG1vZHVsZSAnQHNhcHBoaXJlL3BpZWNlcycge1xyXG5cdGludGVyZmFjZSBDb250YWluZXIge1xyXG5cdFx0cHJpc21hOiB0eXBlb2YgcHJpc21hO1xyXG5cdFx0bG9nOiB0eXBlb2YgbG9nO1xyXG5cdFx0cHJpc21hTG9nOiB0eXBlb2YgcHJpc21hTG9nO1xyXG5cdFx0dXRpbHM6IHR5cGVvZiB1dGlscztcclxuXHRcdHNldHRpbmdzOiB0eXBlb2Ygc2V0dGluZ3M7XHJcblx0XHRsZXZlbGluZzogdHlwZW9mIGxldmVsaW5nO1xyXG5cdH1cclxufVxyXG5cclxuZGVjbGFyZSBtb2R1bGUgJ0BzYXBwaGlyZS9mcmFtZXdvcmsnIHtcclxuXHRpbnRlcmZhY2UgUHJlY29uZGl0aW9ucyB7XHJcblx0ICBkZXZlbG9wZXJPbmx5OiBuZXZlcjtcclxuXHQgIGJsYWNrbGlzdENoZWNrOiBuZXZlcjtcclxuXHR9XHJcbiAgfVxyXG5cclxuY29uc3QgY2xpZW50ID0gbmV3IFNhcHBoaXJlQ2xpZW50KHtcclxuXHRpbnRlbnRzOiBbXHJcblx0XHRHYXRld2F5SW50ZW50Qml0cy5HdWlsZHMsXHJcblx0XHRHYXRld2F5SW50ZW50Qml0cy5HdWlsZE1lbWJlcnMsXHJcblx0XHRHYXRld2F5SW50ZW50Qml0cy5HdWlsZE1lc3NhZ2VzLFxyXG5cdFx0R2F0ZXdheUludGVudEJpdHMuTWVzc2FnZUNvbnRlbnQsXHJcblx0XSxcclxuXHRsb2FkTWVzc2FnZUNvbW1hbmRMaXN0ZW5lcnM6IHRydWUsXHJcblx0ZGVmYXVsdFByZWZpeDogXCJrP1wiXHJcbn0pO1xyXG5cclxucHJvY2Vzcy5vbihcInVuaGFuZGxlZFJlamVjdGlvblwiLCAoZXJyOiBhbnkpID0+IHtcclxuXHRsb2coXCJlcnJvclwiLCBcIkVycm9yXCIsIGBVbmhhbmRsZWQgUmVqZWN0aW9uOiAke2Vyci5zdGFja31gKTtcclxufSk7XHJcblxyXG5wcm9jZXNzLm9uKFwidW5jYXVnaHRFeGNlcHRpb25cIiwgZXJyID0+IHtcclxuXHRsb2coXCJlcnJvclwiLCBcIkVycm9yXCIsIGBVbmhhbmRsZWQgRXhjZXB0aW9uOiAke2Vycn1gLCB7IHRpbWVzdGFtcDogdHJ1ZSwgY2xpZW50OiBjbGllbnQgfSk7XHJcbn0pO1xyXG5cclxuY2xpZW50LmxvZ2luKHByb2Nlc3MuZW52LlRPS0VOKTsiXX0=
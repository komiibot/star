"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useContainer = exports.prisma = void 0;
const discord_js_1 = require("discord.js");
const handler_1 = require("@sern/handler");
const client_1 = require("@prisma/client");
const dotenv_1 = __importDefault(require("dotenv"));
const chalk_1 = __importDefault(require("chalk"));
dotenv_1.default.config();
const client = new discord_js_1.Client({
    intents: [
        discord_js_1.GatewayIntentBits.Guilds,
        discord_js_1.GatewayIntentBits.GuildMembers,
        discord_js_1.GatewayIntentBits.GuildMessages,
        discord_js_1.GatewayIntentBits.MessageContent,
    ],
});
exports.prisma = new client_1.PrismaClient();
exports.useContainer = handler_1.Sern.makeDependencies({
    build: root => root
        .add({ "@sern/client": (0, handler_1.single)(client) })
        .add({ "@sern/logger": (0, handler_1.single)(new handler_1.DefaultLogging()) })
});
handler_1.Sern.init({
    defaultPrefix: process.env.PREFIX,
    commands: "build/commands",
    events: "build/events",
    containerConfig: {
        get: exports.useContainer
    }
});
const logo = ` ███▄    █ ▓█████  ██ ▄█▀ ▒█████   ███▄ ▄███▓ ██▓
██ ▀█   █ ▓█   ▀  ██▄█▒ ▒██▒  ██▒▓██▒▀█▀ ██▒▓██▒
▓██  ▀█ ██▒▒███   ▓███▄░ ▒██░  ██▒▓██    ▓██░▒██▒
▓██▒  ▐▌██▒▒▓█  ▄ ▓██ █▄ ▒██   ██░▒██    ▒██ ░██░
▒██░   ▓██░░▒████▒▒██▒ █▄░ ████▓▒░▒██▒   ░██▒░██░
░ ▒░   ▒ ▒ ░░ ▒░ ░▒ ▒▒ ▓▒░ ▒░▒░▒░ ░ ▒░   ░  ░░▓  
░ ░░   ░ ▒░ ░ ░  ░░ ░▒ ▒░  ░ ▒ ▒░ ░  ░      ░ ▒ ░
  ░   ░ ░    ░   ░ ░░ ░ ░ ░ ░ ▒  ░      ░    ▒ ░
		░    ░  ░░  ░       ░ ░         ░    ░  
												`;
console.log(chalk_1.default.magenta(logo));
client.login(process.env.TOKEN);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsMkNBQXNFO0FBQ3RFLDJDQUFxRjtBQUNyRiwyQ0FBOEM7QUFDOUMsb0RBQTRCO0FBQzVCLGtEQUEwQjtBQUMxQixnQkFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBRWhCLE1BQU0sTUFBTSxHQUFHLElBQUksbUJBQU0sQ0FBQztJQUN6QixPQUFPLEVBQUU7UUFDUiw4QkFBaUIsQ0FBQyxNQUFNO1FBQ3hCLDhCQUFpQixDQUFDLFlBQVk7UUFDOUIsOEJBQWlCLENBQUMsYUFBYTtRQUMvQiw4QkFBaUIsQ0FBQyxjQUFjO0tBQ2hDO0NBQ0QsQ0FBQyxDQUFDO0FBRVUsUUFBQSxNQUFNLEdBQUcsSUFBSSxxQkFBWSxFQUFFLENBQUM7QUFPNUIsUUFBQSxZQUFZLEdBQUcsY0FBSSxDQUFDLGdCQUFnQixDQUFpQjtJQUNqRSxLQUFLLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJO1NBQ2pCLEdBQUcsQ0FBQyxFQUFFLGNBQWMsRUFBRSxJQUFBLGdCQUFNLEVBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztTQUN2QyxHQUFHLENBQUMsRUFBRSxjQUFjLEVBQUUsSUFBQSxnQkFBTSxFQUFDLElBQUksd0JBQWMsRUFBRSxDQUFDLEVBQUUsQ0FBQztDQUN2RCxDQUFDLENBQUM7QUFFSCxjQUFJLENBQUMsSUFBSSxDQUFDO0lBQ1QsYUFBYSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBZ0I7SUFDM0MsUUFBUSxFQUFFLGdCQUFnQjtJQUMxQixNQUFNLEVBQUUsY0FBYztJQUN0QixlQUFlLEVBQUU7UUFDaEIsR0FBRyxFQUFFLG9CQUFZO0tBQ2pCO0NBQ0QsQ0FBQyxDQUFDO0FBRUgsTUFBTSxJQUFJLEdBQUc7Ozs7Ozs7OzthQVNBLENBQUE7QUFDYixPQUFPLENBQUMsR0FBRyxDQUFDLGVBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztBQUVqQyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDbGllbnQsIEdhdGV3YXlJbnRlbnRCaXRzLCBUaHJlYWRDaGFubmVsIH0gZnJvbSBcImRpc2NvcmQuanNcIjtcclxuaW1wb3J0IHsgRGVmYXVsdExvZ2dpbmcsIERlcGVuZGVuY2llcywgU2Vybiwgc2luZ2xlLCBTaW5nbGV0b24gfSBmcm9tIFwiQHNlcm4vaGFuZGxlclwiXHJcbmltcG9ydCB7IFByaXNtYUNsaWVudCB9IGZyb20gXCJAcHJpc21hL2NsaWVudFwiO1xyXG5pbXBvcnQgZG90ZW52IGZyb20gXCJkb3RlbnZcIjtcclxuaW1wb3J0IGNoYWxrIGZyb20gXCJjaGFsa1wiO1xyXG5kb3RlbnYuY29uZmlnKCk7XHJcblxyXG5jb25zdCBjbGllbnQgPSBuZXcgQ2xpZW50KHtcclxuXHRpbnRlbnRzOiBbXHJcblx0XHRHYXRld2F5SW50ZW50Qml0cy5HdWlsZHMsXHJcblx0XHRHYXRld2F5SW50ZW50Qml0cy5HdWlsZE1lbWJlcnMsXHJcblx0XHRHYXRld2F5SW50ZW50Qml0cy5HdWlsZE1lc3NhZ2VzLFxyXG5cdFx0R2F0ZXdheUludGVudEJpdHMuTWVzc2FnZUNvbnRlbnQsXHJcblx0XSxcclxufSk7XHJcblxyXG5leHBvcnQgY29uc3QgcHJpc21hID0gbmV3IFByaXNtYUNsaWVudCgpO1xyXG5cclxuaW50ZXJmYWNlIE15RGVwZW5kZW5jaWVzIGV4dGVuZHMgRGVwZW5kZW5jaWVzIHtcclxuXHRcIkBzZXJuL2NsaWVudFwiOiBTaW5nbGV0b248Q2xpZW50PjtcclxuXHRcIkBzZXJuL2xvZ2dlclwiOiBTaW5nbGV0b248RGVmYXVsdExvZ2dpbmc+XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCB1c2VDb250YWluZXIgPSBTZXJuLm1ha2VEZXBlbmRlbmNpZXM8TXlEZXBlbmRlbmNpZXM+KHtcclxuXHRidWlsZDogcm9vdCA9PiByb290XHJcblx0XHQuYWRkKHsgXCJAc2Vybi9jbGllbnRcIjogc2luZ2xlKGNsaWVudCkgfSlcclxuXHRcdC5hZGQoeyBcIkBzZXJuL2xvZ2dlclwiOiBzaW5nbGUobmV3IERlZmF1bHRMb2dnaW5nKCkpIH0pXHJcbn0pO1xyXG5cclxuU2Vybi5pbml0KHtcclxuXHRkZWZhdWx0UHJlZml4OiBwcm9jZXNzLmVudi5QUkVGSVggYXMgc3RyaW5nLFxyXG5cdGNvbW1hbmRzOiBcImJ1aWxkL2NvbW1hbmRzXCIsXHJcblx0ZXZlbnRzOiBcImJ1aWxkL2V2ZW50c1wiLFxyXG5cdGNvbnRhaW5lckNvbmZpZzoge1xyXG5cdFx0Z2V0OiB1c2VDb250YWluZXJcclxuXHR9XHJcbn0pO1xyXG5cclxuY29uc3QgbG9nbyA9IGAg4paI4paI4paI4paEICAgIOKWiCDilpPilojilojilojilojiloggIOKWiOKWiCDiloTilojiloAg4paS4paI4paI4paI4paI4paIICAg4paI4paI4paI4paEIOKWhOKWiOKWiOKWiOKWkyDilojilojilpNcclxu4paI4paIIOKWgOKWiCAgIOKWiCDilpPiloggICDiloAgIOKWiOKWiOKWhOKWiOKWkiDilpLilojilojilpIgIOKWiOKWiOKWkuKWk+KWiOKWiOKWkuKWgOKWiOKWgCDilojilojilpLilpPilojilojilpJcclxu4paT4paI4paIICDiloDilogg4paI4paI4paS4paS4paI4paI4paIICAg4paT4paI4paI4paI4paE4paRIOKWkuKWiOKWiOKWkSAg4paI4paI4paS4paT4paI4paIICAgIOKWk+KWiOKWiOKWkeKWkuKWiOKWiOKWklxyXG7ilpPilojilojilpIgIOKWkOKWjOKWiOKWiOKWkuKWkuKWk+KWiCAg4paEIOKWk+KWiOKWiCDilojiloQg4paS4paI4paIICAg4paI4paI4paR4paS4paI4paIICAgIOKWkuKWiOKWiCDilpHilojilojilpFcclxu4paS4paI4paI4paRICAg4paT4paI4paI4paR4paR4paS4paI4paI4paI4paI4paS4paS4paI4paI4paSIOKWiOKWhOKWkSDilojilojilojilojilpPilpLilpHilpLilojilojilpIgICDilpHilojilojilpLilpHilojilojilpFcclxu4paRIOKWkuKWkSAgIOKWkiDilpIg4paR4paRIOKWkuKWkSDilpHilpIg4paS4paSIOKWk+KWkuKWkSDilpLilpHilpLilpHilpLilpEg4paRIOKWkuKWkSAgIOKWkSAg4paR4paR4paTICBcclxu4paRIOKWkeKWkSAgIOKWkSDilpLilpEg4paRIOKWkSAg4paR4paRIOKWkeKWkiDilpLilpEgIOKWkSDilpIg4paS4paRIOKWkSAg4paRICAgICAg4paRIOKWkiDilpFcclxuICDilpEgICDilpEg4paRICAgIOKWkSAgIOKWkSDilpHilpEg4paRIOKWkSDilpEg4paRIOKWkiAg4paRICAgICAg4paRICAgIOKWkiDilpFcclxuXHRcdOKWkSAgICDilpEgIOKWkeKWkSAg4paRICAgICAgIOKWkSDilpEgICAgICAgICDilpEgICAg4paRICBcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0YFxyXG5jb25zb2xlLmxvZyhjaGFsay5tYWdlbnRhKGxvZ28pKTtcclxuXHJcbmNsaWVudC5sb2dpbihwcm9jZXNzLmVudi5UT0tFTik7Il19
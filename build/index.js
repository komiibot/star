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
    // .add({ "@sern/logger": single(new DefaultLogging()) })
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
console.log(chalk_1.default.red(logo));
client.login(process.env.TOKEN);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsMkNBQXNFO0FBQ3RFLDJDQUFxRjtBQUNyRiwyQ0FBOEM7QUFDOUMsb0RBQTRCO0FBQzVCLGtEQUEwQjtBQUMxQixnQkFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBRWhCLE1BQU0sTUFBTSxHQUFHLElBQUksbUJBQU0sQ0FBQztJQUN6QixPQUFPLEVBQUU7UUFDUiw4QkFBaUIsQ0FBQyxNQUFNO1FBQ3hCLDhCQUFpQixDQUFDLFlBQVk7UUFDOUIsOEJBQWlCLENBQUMsYUFBYTtRQUMvQiw4QkFBaUIsQ0FBQyxjQUFjO0tBQ2hDO0NBQ0QsQ0FBQyxDQUFDO0FBRVUsUUFBQSxNQUFNLEdBQUcsSUFBSSxxQkFBWSxFQUFFLENBQUM7QUFPNUIsUUFBQSxZQUFZLEdBQUcsY0FBSSxDQUFDLGdCQUFnQixDQUFpQjtJQUNqRSxLQUFLLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJO1NBQ2pCLEdBQUcsQ0FBQyxFQUFFLGNBQWMsRUFBRSxJQUFBLGdCQUFNLEVBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztJQUN4Qyx5REFBeUQ7Q0FDMUQsQ0FBQyxDQUFDO0FBRUgsY0FBSSxDQUFDLElBQUksQ0FBQztJQUNULGFBQWEsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQWdCO0lBQzNDLFFBQVEsRUFBRSxnQkFBZ0I7SUFDMUIsTUFBTSxFQUFFLGNBQWM7SUFDdEIsZUFBZSxFQUFFO1FBQ2hCLEdBQUcsRUFBRSxvQkFBWTtLQUNqQjtDQUNELENBQUMsQ0FBQztBQUVILE1BQU0sSUFBSSxHQUFHOzs7Ozs7Ozs7YUFTQSxDQUFBO0FBQ2IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7QUFFN0IsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2xpZW50LCBHYXRld2F5SW50ZW50Qml0cywgVGhyZWFkQ2hhbm5lbCB9IGZyb20gXCJkaXNjb3JkLmpzXCI7XHJcbmltcG9ydCB7IERlZmF1bHRMb2dnaW5nLCBEZXBlbmRlbmNpZXMsIFNlcm4sIHNpbmdsZSwgU2luZ2xldG9uIH0gZnJvbSBcIkBzZXJuL2hhbmRsZXJcIlxyXG5pbXBvcnQgeyBQcmlzbWFDbGllbnQgfSBmcm9tIFwiQHByaXNtYS9jbGllbnRcIjtcclxuaW1wb3J0IGRvdGVudiBmcm9tIFwiZG90ZW52XCI7XHJcbmltcG9ydCBjaGFsayBmcm9tIFwiY2hhbGtcIjtcclxuZG90ZW52LmNvbmZpZygpO1xyXG5cclxuY29uc3QgY2xpZW50ID0gbmV3IENsaWVudCh7XHJcblx0aW50ZW50czogW1xyXG5cdFx0R2F0ZXdheUludGVudEJpdHMuR3VpbGRzLFxyXG5cdFx0R2F0ZXdheUludGVudEJpdHMuR3VpbGRNZW1iZXJzLFxyXG5cdFx0R2F0ZXdheUludGVudEJpdHMuR3VpbGRNZXNzYWdlcyxcclxuXHRcdEdhdGV3YXlJbnRlbnRCaXRzLk1lc3NhZ2VDb250ZW50LFxyXG5cdF0sXHJcbn0pO1xyXG5cclxuZXhwb3J0IGNvbnN0IHByaXNtYSA9IG5ldyBQcmlzbWFDbGllbnQoKTtcclxuXHJcbmludGVyZmFjZSBNeURlcGVuZGVuY2llcyBleHRlbmRzIERlcGVuZGVuY2llcyB7XHJcblx0XCJAc2Vybi9jbGllbnRcIjogU2luZ2xldG9uPENsaWVudD47XHJcblx0Ly8gXCJAc2Vybi9sb2dnZXJcIjogU2luZ2xldG9uPERlZmF1bHRMb2dnaW5nPlxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgdXNlQ29udGFpbmVyID0gU2Vybi5tYWtlRGVwZW5kZW5jaWVzPE15RGVwZW5kZW5jaWVzPih7XHJcblx0YnVpbGQ6IHJvb3QgPT4gcm9vdFxyXG5cdFx0LmFkZCh7IFwiQHNlcm4vY2xpZW50XCI6IHNpbmdsZShjbGllbnQpIH0pXHJcblx0XHQvLyAuYWRkKHsgXCJAc2Vybi9sb2dnZXJcIjogc2luZ2xlKG5ldyBEZWZhdWx0TG9nZ2luZygpKSB9KVxyXG59KTtcclxuXHJcblNlcm4uaW5pdCh7XHJcblx0ZGVmYXVsdFByZWZpeDogcHJvY2Vzcy5lbnYuUFJFRklYIGFzIHN0cmluZyxcclxuXHRjb21tYW5kczogXCJidWlsZC9jb21tYW5kc1wiLFxyXG5cdGV2ZW50czogXCJidWlsZC9ldmVudHNcIixcclxuXHRjb250YWluZXJDb25maWc6IHtcclxuXHRcdGdldDogdXNlQ29udGFpbmVyXHJcblx0fVxyXG59KTtcclxuXHJcbmNvbnN0IGxvZ28gPSBgIOKWiOKWiOKWiOKWhCAgICDilogg4paT4paI4paI4paI4paI4paIICDilojilogg4paE4paI4paAIOKWkuKWiOKWiOKWiOKWiOKWiCAgIOKWiOKWiOKWiOKWhCDiloTilojilojilojilpMg4paI4paI4paTXHJcbuKWiOKWiCDiloDiloggICDilogg4paT4paIICAg4paAICDilojilojiloTilojilpIg4paS4paI4paI4paSICDilojilojilpLilpPilojilojilpLiloDilojiloAg4paI4paI4paS4paT4paI4paI4paSXHJcbuKWk+KWiOKWiCAg4paA4paIIOKWiOKWiOKWkuKWkuKWiOKWiOKWiCAgIOKWk+KWiOKWiOKWiOKWhOKWkSDilpLilojilojilpEgIOKWiOKWiOKWkuKWk+KWiOKWiCAgICDilpPilojilojilpHilpLilojilojilpJcclxu4paT4paI4paI4paSICDilpDilozilojilojilpLilpLilpPiloggIOKWhCDilpPilojilogg4paI4paEIOKWkuKWiOKWiCAgIOKWiOKWiOKWkeKWkuKWiOKWiCAgICDilpLilojilogg4paR4paI4paI4paRXHJcbuKWkuKWiOKWiOKWkSAgIOKWk+KWiOKWiOKWkeKWkeKWkuKWiOKWiOKWiOKWiOKWkuKWkuKWiOKWiOKWkiDilojiloTilpEg4paI4paI4paI4paI4paT4paS4paR4paS4paI4paI4paSICAg4paR4paI4paI4paS4paR4paI4paI4paRXHJcbuKWkSDilpLilpEgICDilpIg4paSIOKWkeKWkSDilpLilpEg4paR4paSIOKWkuKWkiDilpPilpLilpEg4paS4paR4paS4paR4paS4paRIOKWkSDilpLilpEgICDilpEgIOKWkeKWkeKWkyAgXHJcbuKWkSDilpHilpEgICDilpEg4paS4paRIOKWkSDilpEgIOKWkeKWkSDilpHilpIg4paS4paRICDilpEg4paSIOKWkuKWkSDilpEgIOKWkSAgICAgIOKWkSDilpIg4paRXHJcbiAg4paRICAg4paRIOKWkSAgICDilpEgICDilpEg4paR4paRIOKWkSDilpEg4paRIOKWkSDilpIgIOKWkSAgICAgIOKWkSAgICDilpIg4paRXHJcblx0XHTilpEgICAg4paRICDilpHilpEgIOKWkSAgICAgICDilpEg4paRICAgICAgICAg4paRICAgIOKWkSAgXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGBcclxuY29uc29sZS5sb2coY2hhbGsucmVkKGxvZ28pKTtcclxuXHJcbmNsaWVudC5sb2dpbihwcm9jZXNzLmVudi5UT0tFTik7Il19
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useContainer = void 0;
const discord_js_1 = require("discord.js");
const handler_1 = require("@sern/handler");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const client = new discord_js_1.Client({
    intents: [
        discord_js_1.GatewayIntentBits.Guilds,
        discord_js_1.GatewayIntentBits.GuildMembers,
        discord_js_1.GatewayIntentBits.GuildMessages,
        discord_js_1.GatewayIntentBits.MessageContent,
    ],
});
exports.useContainer = handler_1.Sern.makeDependencies({
    build: root => root
        .add({ '@sern/client': (0, handler_1.single)(client) })
        .add({ '@sern/logger': (0, handler_1.single)(new handler_1.DefaultLogging()) })
});
handler_1.Sern.init({
    defaultPrefix: '?',
    commands: 'build/commands',
    events: 'build/events',
    containerConfig: {
        get: exports.useContainer
    }
});
client.login(process.env.TOKEN);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsMkNBQW9GO0FBQ3BGLDJDQUFxRjtBQUNyRixvREFBNEI7QUFFNUIsZ0JBQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUVoQixNQUFNLE1BQU0sR0FBRyxJQUFJLG1CQUFNLENBQUM7SUFDekIsT0FBTyxFQUFFO1FBQ1IsOEJBQWlCLENBQUMsTUFBTTtRQUN4Qiw4QkFBaUIsQ0FBQyxZQUFZO1FBQzlCLDhCQUFpQixDQUFDLGFBQWE7UUFDL0IsOEJBQWlCLENBQUMsY0FBYztLQUNoQztDQUNELENBQUMsQ0FBQztBQU9VLFFBQUEsWUFBWSxHQUFHLGNBQUksQ0FBQyxnQkFBZ0IsQ0FBaUI7SUFDOUQsS0FBSyxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSTtTQUNkLEdBQUcsQ0FBQyxFQUFFLGNBQWMsRUFBRSxJQUFBLGdCQUFNLEVBQUMsTUFBTSxDQUFDLEVBQUcsQ0FBQztTQUN4QyxHQUFHLENBQUMsRUFBRSxjQUFjLEVBQUUsSUFBQSxnQkFBTSxFQUFDLElBQUksd0JBQWMsRUFBRSxDQUFDLEVBQUUsQ0FBQztDQUM3RCxDQUFDLENBQUM7QUFFSCxjQUFJLENBQUMsSUFBSSxDQUFDO0lBQ1QsYUFBYSxFQUFFLEdBQUc7SUFDbEIsUUFBUSxFQUFFLGdCQUFnQjtJQUMxQixNQUFNLEVBQUUsY0FBYztJQUN0QixlQUFlLEVBQUU7UUFDVixHQUFHLEVBQUUsb0JBQVk7S0FDdkI7Q0FDRCxDQUFDLENBQUM7QUFFSCxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBY3Rpdml0eVR5cGUsIENsaWVudCwgR2F0ZXdheUludGVudEJpdHMsIFRocmVhZENoYW5uZWwgfSBmcm9tICdkaXNjb3JkLmpzJztcclxuaW1wb3J0IHsgRGVmYXVsdExvZ2dpbmcsIERlcGVuZGVuY2llcywgU2Vybiwgc2luZ2xlLCBTaW5nbGV0b24gfSBmcm9tICdAc2Vybi9oYW5kbGVyJ1xyXG5pbXBvcnQgZG90ZW52IGZyb20gJ2RvdGVudic7XHJcbmltcG9ydCBtb25nb29zZSBmcm9tICdtb25nb29zZSc7XHJcbmRvdGVudi5jb25maWcoKTtcclxuXHJcbmNvbnN0IGNsaWVudCA9IG5ldyBDbGllbnQoe1xyXG5cdGludGVudHM6IFtcclxuXHRcdEdhdGV3YXlJbnRlbnRCaXRzLkd1aWxkcyxcclxuXHRcdEdhdGV3YXlJbnRlbnRCaXRzLkd1aWxkTWVtYmVycyxcclxuXHRcdEdhdGV3YXlJbnRlbnRCaXRzLkd1aWxkTWVzc2FnZXMsXHJcblx0XHRHYXRld2F5SW50ZW50Qml0cy5NZXNzYWdlQ29udGVudCxcclxuXHRdLFxyXG59KTtcclxuXHJcbmludGVyZmFjZSBNeURlcGVuZGVuY2llcyBleHRlbmRzIERlcGVuZGVuY2llcyB7XHJcbiAgICAnQHNlcm4vY2xpZW50JyA6IFNpbmdsZXRvbjxDbGllbnQ+O1xyXG4gICAgJ0BzZXJuL2xvZ2dlcicgOiBTaW5nbGV0b248RGVmYXVsdExvZ2dpbmc+XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCB1c2VDb250YWluZXIgPSBTZXJuLm1ha2VEZXBlbmRlbmNpZXM8TXlEZXBlbmRlbmNpZXM+KHtcclxuICAgIGJ1aWxkOiByb290ID0+IHJvb3RcclxuICAgICAgICAuYWRkKHsgJ0BzZXJuL2NsaWVudCc6IHNpbmdsZShjbGllbnQpICB9KSBcclxuICAgICAgICAuYWRkKHsgJ0BzZXJuL2xvZ2dlcic6IHNpbmdsZShuZXcgRGVmYXVsdExvZ2dpbmcoKSkgfSlcclxufSk7XHJcblxyXG5TZXJuLmluaXQoe1xyXG5cdGRlZmF1bHRQcmVmaXg6ICc/JyxcclxuXHRjb21tYW5kczogJ2J1aWxkL2NvbW1hbmRzJyxcclxuXHRldmVudHM6ICdidWlsZC9ldmVudHMnLFxyXG5cdGNvbnRhaW5lckNvbmZpZzoge1xyXG4gICAgICAgIGdldDogdXNlQ29udGFpbmVyXHJcblx0fVxyXG59KTtcclxuXHJcbmNsaWVudC5sb2dpbihwcm9jZXNzLmVudi5UT0tFTik7Il19
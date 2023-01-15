"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = exports.log = void 0;
const chalk_1 = __importDefault(require("chalk"));
const dayjs_1 = __importDefault(require("dayjs"));
async function log(level, title, msg, options) {
    let timestamp;
    if (level === undefined) {
        return console.error(chalk_1.default.red("Level argument is required for Logger."));
    }
    if (title === undefined) {
        return console.error(chalk_1.default.red("Title argument is required for Logger."));
    }
    if (msg === undefined) {
        return console.error(chalk_1.default.red("Message argument is required for Logger."));
    }
    if (options === null || options === void 0 ? void 0 : options.timestamp) {
        timestamp = (0, dayjs_1.default)(Date.now()).format("HH:mm:ss");
    }
    switch (level) {
        case "info": {
            console.log(chalk_1.default.green(`${timestamp ? `[${timestamp}]:` : ""} ${title} | ${msg}`));
            break;
        }
        case "warn": {
            console.log(chalk_1.default.yellow(`${timestamp ? `[${timestamp}]:` : ""} ${title} | ${msg}`));
            break;
        }
        case "error": {
            console.log(chalk_1.default.red(`${timestamp ? `[${timestamp}]:` : ""} ${title} | ${msg}`));
            break;
        }
        case "debug": {
            console.log(chalk_1.default.cyan(`${timestamp ? `[${timestamp}]:` : ""} ${title} | ${msg}`));
            break;
        }
        case "prisma": {
            console.log(chalk_1.default.magenta(`${timestamp ? `[${timestamp}]:` : ""} ${title} | ${msg}`));
            break;
        }
    }
}
exports.log = log;
async function prisma(title, msg, timestamp) {
    return log("prisma", title, msg, {
        timestamp: timestamp ? timestamp : false,
    });
}
exports.prisma = prisma;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21vZHVsZXMvbG9nZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGtEQUEwQjtBQUMxQixrREFBMEI7QUFNbkIsS0FBSyxVQUFVLEdBQUcsQ0FDdkIsS0FBYSxFQUNiLEtBQWEsRUFDYixHQUFXLEVBQ1gsT0FBaUI7SUFFakIsSUFBSSxTQUFTLENBQUM7SUFFZCxJQUFJLEtBQUssS0FBSyxTQUFTLEVBQUU7UUFDdkIsT0FBTyxPQUFPLENBQUMsS0FBSyxDQUFDLGVBQUssQ0FBQyxHQUFHLENBQUMsd0NBQXdDLENBQUMsQ0FBQyxDQUFDO0tBQzNFO0lBRUQsSUFBSSxLQUFLLEtBQUssU0FBUyxFQUFFO1FBQ3ZCLE9BQU8sT0FBTyxDQUFDLEtBQUssQ0FBQyxlQUFLLENBQUMsR0FBRyxDQUFDLHdDQUF3QyxDQUFDLENBQUMsQ0FBQztLQUMzRTtJQUVELElBQUksR0FBRyxLQUFLLFNBQVMsRUFBRTtRQUNyQixPQUFPLE9BQU8sQ0FBQyxLQUFLLENBQUMsZUFBSyxDQUFDLEdBQUcsQ0FBQywwQ0FBMEMsQ0FBQyxDQUFDLENBQUM7S0FDN0U7SUFFRCxJQUFJLE9BQU8sYUFBUCxPQUFPLHVCQUFQLE9BQU8sQ0FBRSxTQUFTLEVBQUU7UUFDdEIsU0FBUyxHQUFHLElBQUEsZUFBSyxFQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztLQUNsRDtJQUVELFFBQVEsS0FBSyxFQUFFO1FBQ2IsS0FBSyxNQUFNLENBQUMsQ0FBQztZQUNYLE9BQU8sQ0FBQyxHQUFHLENBQ1QsZUFBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxTQUFTLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLEtBQUssTUFBTSxHQUFHLEVBQUUsQ0FBQyxDQUN2RSxDQUFDO1lBQ0YsTUFBTTtTQUNQO1FBQ0QsS0FBSyxNQUFNLENBQUMsQ0FBQztZQUNYLE9BQU8sQ0FBQyxHQUFHLENBQ1QsZUFBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxTQUFTLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLEtBQUssTUFBTSxHQUFHLEVBQUUsQ0FBQyxDQUN4RSxDQUFDO1lBQ0YsTUFBTTtTQUNQO1FBQ0QsS0FBSyxPQUFPLENBQUMsQ0FBQztZQUNaLE9BQU8sQ0FBQyxHQUFHLENBQ1QsZUFBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxTQUFTLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLEtBQUssTUFBTSxHQUFHLEVBQUUsQ0FBQyxDQUNyRSxDQUFDO1lBQ0YsTUFBTTtTQUNQO1FBQ0QsS0FBSyxPQUFPLENBQUMsQ0FBQztZQUNaLE9BQU8sQ0FBQyxHQUFHLENBQ1QsZUFBSyxDQUFDLElBQUksQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxTQUFTLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLEtBQUssTUFBTSxHQUFHLEVBQUUsQ0FBQyxDQUN0RSxDQUFDO1lBQ0YsTUFBTTtTQUNQO1FBQ0QsS0FBSyxRQUFRLENBQUMsQ0FBQztZQUNiLE9BQU8sQ0FBQyxHQUFHLENBQ1QsZUFBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxTQUFTLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLEtBQUssTUFBTSxHQUFHLEVBQUUsQ0FBQyxDQUN6RSxDQUFDO1lBQ0YsTUFBTTtTQUNQO0tBQ0Y7QUFDSCxDQUFDO0FBeERELGtCQXdEQztBQUVNLEtBQUssVUFBVSxNQUFNLENBQUMsS0FBYSxFQUFFLEdBQVcsRUFBRSxTQUFtQjtJQUMxRSxPQUFPLEdBQUcsQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRTtRQUMvQixTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEtBQUs7S0FDekMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQUpELHdCQUlDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNoYWxrIGZyb20gXCJjaGFsa1wiO1xyXG5pbXBvcnQgZGF5anMgZnJvbSBcImRheWpzXCI7XHJcblxyXG5pbnRlcmZhY2UgT3B0aW9ucyB7XHJcbiAgdGltZXN0YW1wPzogYm9vbGVhbjtcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGxvZyhcclxuICBsZXZlbDogc3RyaW5nLFxyXG4gIHRpdGxlOiBzdHJpbmcsXHJcbiAgbXNnOiBzdHJpbmcsXHJcbiAgb3B0aW9ucz86IE9wdGlvbnNcclxuKSB7XHJcbiAgbGV0IHRpbWVzdGFtcDtcclxuXHJcbiAgaWYgKGxldmVsID09PSB1bmRlZmluZWQpIHtcclxuICAgIHJldHVybiBjb25zb2xlLmVycm9yKGNoYWxrLnJlZChcIkxldmVsIGFyZ3VtZW50IGlzIHJlcXVpcmVkIGZvciBMb2dnZXIuXCIpKTtcclxuICB9XHJcblxyXG4gIGlmICh0aXRsZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICByZXR1cm4gY29uc29sZS5lcnJvcihjaGFsay5yZWQoXCJUaXRsZSBhcmd1bWVudCBpcyByZXF1aXJlZCBmb3IgTG9nZ2VyLlwiKSk7XHJcbiAgfVxyXG5cclxuICBpZiAobXNnID09PSB1bmRlZmluZWQpIHtcclxuICAgIHJldHVybiBjb25zb2xlLmVycm9yKGNoYWxrLnJlZChcIk1lc3NhZ2UgYXJndW1lbnQgaXMgcmVxdWlyZWQgZm9yIExvZ2dlci5cIikpO1xyXG4gIH1cclxuXHJcbiAgaWYgKG9wdGlvbnM/LnRpbWVzdGFtcCkge1xyXG4gICAgdGltZXN0YW1wID0gZGF5anMoRGF0ZS5ub3coKSkuZm9ybWF0KFwiSEg6bW06c3NcIik7XHJcbiAgfVxyXG5cclxuICBzd2l0Y2ggKGxldmVsKSB7XHJcbiAgICBjYXNlIFwiaW5mb1wiOiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFxyXG4gICAgICAgIGNoYWxrLmdyZWVuKGAke3RpbWVzdGFtcCA/IGBbJHt0aW1lc3RhbXB9XTpgIDogXCJcIn0gJHt0aXRsZX0gfCAke21zZ31gKVxyXG4gICAgICApO1xyXG4gICAgICBicmVhaztcclxuICAgIH1cclxuICAgIGNhc2UgXCJ3YXJuXCI6IHtcclxuICAgICAgY29uc29sZS5sb2coXHJcbiAgICAgICAgY2hhbGsueWVsbG93KGAke3RpbWVzdGFtcCA/IGBbJHt0aW1lc3RhbXB9XTpgIDogXCJcIn0gJHt0aXRsZX0gfCAke21zZ31gKVxyXG4gICAgICApO1xyXG4gICAgICBicmVhaztcclxuICAgIH1cclxuICAgIGNhc2UgXCJlcnJvclwiOiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFxyXG4gICAgICAgIGNoYWxrLnJlZChgJHt0aW1lc3RhbXAgPyBgWyR7dGltZXN0YW1wfV06YCA6IFwiXCJ9ICR7dGl0bGV9IHwgJHttc2d9YClcclxuICAgICAgKTtcclxuICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgICBjYXNlIFwiZGVidWdcIjoge1xyXG4gICAgICBjb25zb2xlLmxvZyhcclxuICAgICAgICBjaGFsay5jeWFuKGAke3RpbWVzdGFtcCA/IGBbJHt0aW1lc3RhbXB9XTpgIDogXCJcIn0gJHt0aXRsZX0gfCAke21zZ31gKVxyXG4gICAgICApO1xyXG4gICAgICBicmVhaztcclxuICAgIH1cclxuICAgIGNhc2UgXCJwcmlzbWFcIjoge1xyXG4gICAgICBjb25zb2xlLmxvZyhcclxuICAgICAgICBjaGFsay5tYWdlbnRhKGAke3RpbWVzdGFtcCA/IGBbJHt0aW1lc3RhbXB9XTpgIDogXCJcIn0gJHt0aXRsZX0gfCAke21zZ31gKVxyXG4gICAgICApO1xyXG4gICAgICBicmVhaztcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBwcmlzbWEodGl0bGU6IHN0cmluZywgbXNnOiBzdHJpbmcsIHRpbWVzdGFtcD86IGJvb2xlYW4pIHtcclxuICByZXR1cm4gbG9nKFwicHJpc21hXCIsIHRpdGxlLCBtc2csIHtcclxuICAgIHRpbWVzdGFtcDogdGltZXN0YW1wID8gdGltZXN0YW1wIDogZmFsc2UsXHJcbiAgfSk7XHJcbn0iXX0=
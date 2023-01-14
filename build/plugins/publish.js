"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandTypeRaw = exports.optionsTransformer = exports.publish = void 0;
const handler_1 = require("@sern/handler");
const discord_js_1 = require("discord.js");
const index_js_1 = require("../index.js");
function publish(options) {
    return {
        type: handler_1.PluginType.Command,
        description: "Manage Application Commands",
        name: "slash-auto-publish",
        async execute({ mod: module }, controller) {
            // Users need to provide their own useContainer function.
            const [client] = (0, index_js_1.useContainer)("@sern/client");
            const defaultOptions = {
                guildIds: [],
                dmPermission: undefined,
                defaultMemberPermissions: null,
            };
            options = { ...defaultOptions, ...options };
            let { defaultMemberPermissions, dmPermission, guildIds } = options;
            function c(e) {
                console.error("publish command didnt work for", module.name);
                console.error(e);
            }
            const log = (...message) => () => console.log(...message);
            const logged = (...message) => log(message);
            /**
             * a local function that returns either one value or the other,
             * depending on {t}'s CommandType. If the commandtype of
             * this module is CommandType.Both or CommandType.Text or CommandType.Slash,
             * return 'is', else return 'els'
             * @param t
             * @returns S | T
             */
            const appCmd = (t) => {
                return (is, els) => (t & handler_1.CommandType.Both) !== 0 ? is : els;
            };
            const curAppType = exports.CommandTypeRaw[module.type];
            const createCommandData = () => {
                var _a;
                const cmd = appCmd(module.type);
                return {
                    name: module.name,
                    type: curAppType,
                    description: cmd(module.description, ""),
                    options: cmd(optionsTransformer((_a = module.options) !== null && _a !== void 0 ? _a : []), []),
                    defaultMemberPermissions,
                    dmPermission,
                };
            };
            try {
                const commandData = createCommandData();
                if (!guildIds.length) {
                    const cmd = (await client.application.commands.fetch()).find((c) => c.name === module.name && c.type === curAppType);
                    if (cmd) {
                        if (!cmd.equals(commandData, true)) {
                            logged(`Found differences in global command ${module.name}`);
                            cmd.edit(commandData).then(log(`${module.name} updated with new data successfully!`));
                        }
                        return controller.next();
                    }
                    client
                        .application.commands.create(commandData)
                        .then(log("Command created", module.name))
                        .catch(c);
                    return controller.next();
                }
                for (const id of guildIds) {
                    const guild = await client.guilds.fetch(id).catch(c);
                    if (!guild)
                        continue;
                    const guildCmd = (await guild.commands.fetch()).find((c) => c.name === module.name && c.type === curAppType);
                    if (guildCmd) {
                        if (!guildCmd.equals(commandData, true)) {
                            logged(`Found differences in command ${module.name}`);
                            guildCmd
                                .edit(commandData)
                                .then(log(`${module.name} updated with new data successfully!`))
                                .catch(c);
                            continue;
                        }
                        continue;
                    }
                    guild.commands
                        .create(commandData)
                        .then(log("Guild Command created", module.name, guild.name))
                        .catch(c);
                }
                return controller.next();
            }
            catch (e) {
                logged("Command did not register" + module.name);
                logged(e);
                return controller.stop();
            }
        },
    };
}
exports.publish = publish;
function optionsTransformer(ops) {
    return ops.map((el) => el.autocomplete ? (({ command, ...el }) => el)(el) : el);
}
exports.optionsTransformer = optionsTransformer;
exports.CommandTypeRaw = {
    [handler_1.CommandType.Both]: discord_js_1.ApplicationCommandType.ChatInput,
    [handler_1.CommandType.CtxUser]: discord_js_1.ApplicationCommandType.Message,
    [handler_1.CommandType.CtxMsg]: discord_js_1.ApplicationCommandType.User,
    [handler_1.CommandType.Slash]: discord_js_1.ApplicationCommandType.ChatInput,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVibGlzaC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9wbHVnaW5zL3B1Ymxpc2gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMkNBTXVCO0FBQ3ZCLDJDQUlvQjtBQUVwQiwwQ0FBMkM7QUFFM0MsU0FBZ0IsT0FBTyxDQUN0QixPQUF3QjtJQU94QixPQUFPO1FBQ04sSUFBSSxFQUFFLG9CQUFVLENBQUMsT0FBTztRQUN4QixXQUFXLEVBQUUsNkJBQTZCO1FBQzFDLElBQUksRUFBRSxvQkFBb0I7UUFDMUIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsRUFBRSxVQUFVO1lBQ3hDLHlEQUF5RDtZQUN6RCxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBQSx1QkFBWSxFQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQzlDLE1BQU0sY0FBYyxHQUFHO2dCQUN0QixRQUFRLEVBQUUsRUFBRTtnQkFDWixZQUFZLEVBQUUsU0FBUztnQkFDdkIsd0JBQXdCLEVBQUUsSUFBSTthQUM5QixDQUFDO1lBRUYsT0FBTyxHQUFHLEVBQUUsR0FBRyxjQUFjLEVBQUUsR0FBRyxPQUFPLEVBQ3JCLENBQUM7WUFDckIsSUFBSSxFQUFFLHdCQUF3QixFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsR0FDdkQsT0FBeUMsQ0FBQztZQUUzQyxTQUFTLENBQUMsQ0FBQyxDQUFVO2dCQUNwQixPQUFPLENBQUMsS0FBSyxDQUFDLGdDQUFnQyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDN0QsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNsQixDQUFDO1lBQ0QsTUFBTSxHQUFHLEdBQ1IsQ0FBQyxHQUFHLE9BQWMsRUFBRSxFQUFFLENBQ3RCLEdBQUcsRUFBRSxDQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQztZQUMxQixNQUFNLE1BQU0sR0FBRyxD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QUMsQ0FBQyxDQUFDLEVBQUUsQ0FDdkQsQ0FBQztBQUNILENBQUM7QUFKRCxnREFJQztBQUVZLFFBQUEsY0FBYyxHQUFHO0lBQzdCLENBQUMscUJBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxtQ0FBc0IsQ0FBQyxTQUFTO0lBQ3BELENBQUMscUJBQVcsQ0FBQyxPQUFPLENBQUMsRUFBRSxtQ0FBc0IsQ0FBQyxPQUFPO0lBQ3JELENBQUMscUJBQVcsQ0FBQyxNQUFNLENBQUMsRUFBRSxtQ0FBc0IsQ0FBQyxJQUFJO0lBQ2pELENBQUMscUJBQVcsQ0FBQyxLQUFLLENBQUMsRUFBRSxtQ0FBc0IsQ0FBQyxTQUFTO0NBQzVDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG5cdENvbW1hbmRQbHVnaW4sXHJcblx0Q29tbWFuZFR5cGUsXHJcblx0UGx1Z2luVHlwZSxcclxuXHRTZXJuT3B0aW9uc0RhdGEsXHJcblx0U2xhc2hDb21tYW5kLFxyXG59IGZyb20gXCJAc2Vybi9oYW5kbGVyXCI7XHJcbmltcG9ydCB7XHJcblx0QXBwbGljYXRpb25Db21tYW5kRGF0YSxcclxuXHRBcHBsaWNhdGlvbkNvbW1hbmRUeXBlLFxyXG5cdFBlcm1pc3Npb25SZXNvbHZhYmxlLFxyXG59IGZyb20gXCJkaXNjb3JkLmpzXCI7XHJcblxyXG5pbXBvcnQgeyB1c2VDb250YWluZXIgfSBmcm9tIFwiLi4vaW5kZXguanNcIjtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBwdWJsaXNoKFxyXG5cdG9wdGlvbnM/OiBQdWJsaXNoT3B0aW9uc1xyXG4pOiBDb21tYW5kUGx1Z2luPFxyXG5cdHwgQ29tbWFuZFR5cGUuU2xhc2hcclxuXHR8IENvbW1hbmRUeXBlLkJvdGhcclxuXHR8IENvbW1hbmRUeXBlLkN0eFVzZXJcclxuXHR8IENvbW1hbmRUeXBlLkN0eE1zZ1xyXG4+IHtcclxuXHRyZXR1cm4ge1xyXG5cdFx0dHlwZTogUGx1Z2luVHlwZS5Db21tYW5kLFxyXG5cdFx0ZGVzY3JpcHRpb246IFwiTWFuYWdlIEFwcGxpY2F0aW9uIENvbW1hbmRzXCIsXHJcblx0XHRuYW1lOiBcInNsYXNoLWF1dG8tcHVibGlzaFwiLFxyXG5cdFx0YXN5bmMgZXhlY3V0ZSh7IG1vZDogbW9kdWxlIH0sIGNvbnRyb2xsZXIpIHtcclxuXHRcdFx0Ly8gVXNlcnMgbmVlZCB0byBwcm92aWRlIHRoZWlyIG93biB1c2VDb250YWluZXIgZnVuY3Rpb24uXHJcblx0XHRcdGNvbnN0IFtjbGllbnRdID0gdXNlQ29udGFpbmVyKFwiQHNlcm4vY2xpZW50XCIpO1xyXG5cdFx0XHRjb25zdCBkZWZhdWx0T3B0aW9ucyA9IHtcclxuXHRcdFx0XHRndWlsZElkczogW10sXHJcblx0XHRcdFx0ZG1QZXJtaXNzaW9uOiB1bmRlZmluZWQsXHJcblx0XHRcdFx0ZGVmYXVsdE1lbWJlclBlcm1pc3Npb25zOiBudWxsLFxyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0b3B0aW9ucyA9IHsgLi4uZGVmYXVsdE9wdGlvbnMsIC4uLm9wdGlvbnMgfSBhcyBQdWJsaXNoT3B0aW9ucyAmXHJcblx0XHRcdFx0VmFsaWRQdWJsaXNoT3B0aW9ucztcclxuXHRcdFx0bGV0IHsgZGVmYXVsdE1lbWJlclBlcm1pc3Npb25zLCBkbVBlcm1pc3Npb24sIGd1aWxkSWRzIH0gPVxyXG5cdFx0XHRcdG9wdGlvbnMgYXMgdW5rbm93biBhcyBWYWxpZFB1Ymxpc2hPcHRpb25zO1xyXG5cclxuXHRcdFx0ZnVuY3Rpb24gYyhlOiB1bmtub3duKSB7XHJcblx0XHRcdFx0Y29uc29sZS5lcnJvcihcInB1Ymxpc2ggY29tbWFuZCBkaWRudCB3b3JrIGZvclwiLCBtb2R1bGUubmFtZSk7XHJcblx0XHRcdFx0Y29uc29sZS5lcnJvcihlKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRjb25zdCBsb2cgPVxyXG5cdFx0XHRcdCguLi5tZXNzYWdlOiBhbnlbXSkgPT5cclxuXHRcdFx0XHQoKSA9PlxyXG5cdFx0XHRcdFx0Y29uc29sZS5sb2coLi4ubWVzc2FnZSk7XHJcblx0XHRcdGNvbnN0IGxvZ2dlZCA9ICguLi5tZXNzYWdlOiBhbnlbXSkgPT4gbG9nKG1lc3NhZ2UpO1xyXG5cdFx0XHQvKipcclxuXHRcdFx0ICogYSBsb2NhbCBmdW5jdGlvbiB0aGF0IHJldHVybnMgZWl0aGVyIG9uZSB2YWx1ZSBvciB0aGUgb3RoZXIsXHJcblx0XHRcdCAqIGRlcGVuZGluZyBvbiB7dH0ncyBDb21tYW5kVHlwZS4gSWYgdGhlIGNvbW1hbmR0eXBlIG9mXHJcblx0XHRcdCAqIHRoaXMgbW9kdWxlIGlzIENvbW1hbmRUeXBlLkJvdGggb3IgQ29tbWFuZFR5cGUuVGV4dCBvciBDb21tYW5kVHlwZS5TbGFzaCxcclxuXHRcdFx0ICogcmV0dXJuICdpcycsIGVsc2UgcmV0dXJuICdlbHMnXHJcblx0XHRcdCAqIEBwYXJhbSB0XHJcblx0XHRcdCAqIEByZXR1cm5zIFMgfCBUXHJcblx0XHRcdCAqL1xyXG5cdFx0XHRjb25zdCBhcHBDbWQgPSA8ViBleHRlbmRzIENvbW1hbmRUeXBlLCBTLCBUPih0OiBWKSA9PiB7XHJcblx0XHRcdFx0cmV0dXJuIChpczogUywgZWxzOiBUKSA9PlxyXG5cdFx0XHRcdFx0KHQgJiBDb21tYW5kVHlwZS5Cb3RoKSAhPT0gMCA/IGlzIDogZWxzO1xyXG5cdFx0XHR9O1xyXG5cdFx0XHRjb25zdCBjdXJBcHBUeXBlID0gQ29tbWFuZFR5cGVSYXdbbW9kdWxlLnR5cGVdO1xyXG5cdFx0XHRjb25zdCBjcmVhdGVDb21tYW5kRGF0YSA9ICgpID0+IHtcclxuXHRcdFx0XHRjb25zdCBjbWQgPSBhcHBDbWQobW9kdWxlLnR5cGUpO1xyXG5cdFx0XHRcdHJldHVybiB7XHJcblx0XHRcdFx0XHRuYW1lOiBtb2R1bGUubmFtZSxcclxuXHRcdFx0XHRcdHR5cGU6IGN1ckFwcFR5cGUsXHJcblx0XHRcdFx0XHRkZXNjcmlwdGlvbjogY21kKG1vZHVsZS5kZXNjcmlwdGlvbiwgXCJcIiksXHJcblx0XHRcdFx0XHRvcHRpb25zOiBjbWQoXHJcblx0XHRcdFx0XHRcdG9wdGlvbnNUcmFuc2Zvcm1lcihcclxuXHRcdFx0XHRcdFx0XHQobW9kdWxlIGFzIFNsYXNoQ29tbWFuZCkub3B0aW9ucyA/PyBbXVxyXG5cdFx0XHRcdFx0XHQpLFxyXG5cdFx0XHRcdFx0XHRbXVxyXG5cdFx0XHRcdFx0KSxcclxuXHRcdFx0XHRcdGRlZmF1bHRNZW1iZXJQZXJtaXNzaW9ucyxcclxuXHRcdFx0XHRcdGRtUGVybWlzc2lvbixcclxuXHRcdFx0XHR9IGFzIEFwcGxpY2F0aW9uQ29tbWFuZERhdGE7XHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHR0cnkge1xyXG5cdFx0XHRcdGNvbnN0IGNvbW1hbmREYXRhID0gY3JlYXRlQ29tbWFuZERhdGEoKTtcclxuXHJcblx0XHRcdFx0aWYgKCFndWlsZElkcy5sZW5ndGgpIHtcclxuXHRcdFx0XHRcdGNvbnN0IGNtZCA9IChcclxuXHRcdFx0XHRcdFx0YXdhaXQgY2xpZW50LmFwcGxpY2F0aW9uIS5jb21tYW5kcy5mZXRjaCgpXHJcblx0XHRcdFx0XHQpLmZpbmQoXHJcblx0XHRcdFx0XHRcdChjKSA9PiBjLm5hbWUgPT09IG1vZHVsZS5uYW1lICYmIGMudHlwZSA9PT0gY3VyQXBwVHlwZVxyXG5cdFx0XHRcdFx0KTtcclxuXHRcdFx0XHRcdGlmIChjbWQpIHtcclxuXHRcdFx0XHRcdFx0aWYgKCFjbWQuZXF1YWxzKGNvbW1hbmREYXRhLCB0cnVlKSkge1xyXG5cdFx0XHRcdFx0XHRcdGxvZ2dlZChcclxuXHRcdFx0XHRcdFx0XHRcdGBGb3VuZCBkaWZmZXJlbmNlcyBpbiBnbG9iYWwgY29tbWFuZCAke21vZHVsZS5uYW1lfWBcclxuXHRcdFx0XHRcdFx0XHQpO1xyXG5cdFx0XHRcdFx0XHRcdGNtZC5lZGl0KGNvbW1hbmREYXRhKS50aGVuKFxyXG5cdFx0XHRcdFx0XHRcdFx0bG9nKFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRgJHttb2R1bGUubmFtZX0gdXBkYXRlZCB3aXRoIG5ldyBkYXRhIHN1Y2Nlc3NmdWxseSFgXHJcblx0XHRcdFx0XHRcdFx0XHQpXHJcblx0XHRcdFx0XHRcdFx0KTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRyZXR1cm4gY29udHJvbGxlci5uZXh0KCk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRjbGllbnRcclxuXHRcdFx0XHRcdFx0LmFwcGxpY2F0aW9uIS5jb21tYW5kcy5jcmVhdGUoY29tbWFuZERhdGEpXHJcblx0XHRcdFx0XHRcdC50aGVuKGxvZyhcIkNvbW1hbmQgY3JlYXRlZFwiLCBtb2R1bGUubmFtZSkpXHJcblx0XHRcdFx0XHRcdC5jYXRjaChjKTtcclxuXHRcdFx0XHRcdHJldHVybiBjb250cm9sbGVyLm5leHQoKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGZvciAoY29uc3QgaWQgb2YgZ3VpbGRJZHMpIHtcclxuXHRcdFx0XHRcdGNvbnN0IGd1aWxkID0gYXdhaXQgY2xpZW50Lmd1aWxkcy5mZXRjaChpZCkuY2F0Y2goYyk7XHJcblx0XHRcdFx0XHRpZiAoIWd1aWxkKSBjb250aW51ZTtcclxuXHRcdFx0XHRcdGNvbnN0IGd1aWxkQ21kID0gKGF3YWl0IGd1aWxkLmNvbW1hbmRzLmZldGNoKCkpLmZpbmQoXHJcblx0XHRcdFx0XHRcdChjKSA9PiBjLm5hbWUgPT09IG1vZHVsZS5uYW1lICYmIGMudHlwZSA9PT0gY3VyQXBwVHlwZVxyXG5cdFx0XHRcdFx0KTtcclxuXHRcdFx0XHRcdGlmIChndWlsZENtZCkge1xyXG5cdFx0XHRcdFx0XHRpZiAoIWd1aWxkQ21kLmVxdWFscyhjb21tYW5kRGF0YSwgdHJ1ZSkpIHtcclxuXHRcdFx0XHRcdFx0XHRsb2dnZWQoXHJcblx0XHRcdFx0XHRcdFx0XHRgRm91bmQgZGlmZmVyZW5jZXMgaW4gY29tbWFuZCAke21vZHVsZS5uYW1lfWBcclxuXHRcdFx0XHRcdFx0XHQpO1xyXG5cdFx0XHRcdFx0XHRcdGd1aWxkQ21kXHJcblx0XHRcdFx0XHRcdFx0XHQuZWRpdChjb21tYW5kRGF0YSlcclxuXHRcdFx0XHRcdFx0XHRcdC50aGVuKFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRsb2coXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0YCR7bW9kdWxlLm5hbWV9IHVwZGF0ZWQgd2l0aCBuZXcgZGF0YSBzdWNjZXNzZnVsbHkhYFxyXG5cdFx0XHRcdFx0XHRcdFx0XHQpXHJcblx0XHRcdFx0XHRcdFx0XHQpXHJcblx0XHRcdFx0XHRcdFx0XHQuY2F0Y2goYyk7XHJcblx0XHRcdFx0XHRcdFx0Y29udGludWU7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0Y29udGludWU7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRndWlsZC5jb21tYW5kc1xyXG5cdFx0XHRcdFx0XHQuY3JlYXRlKGNvbW1hbmREYXRhKVxyXG5cdFx0XHRcdFx0XHQudGhlbihcclxuXHRcdFx0XHRcdFx0XHRsb2coXHJcblx0XHRcdFx0XHRcdFx0XHRcIkd1aWxkIENvbW1hbmQgY3JlYXRlZFwiLFxyXG5cdFx0XHRcdFx0XHRcdFx0bW9kdWxlLm5hbWUsXHJcblx0XHRcdFx0XHRcdFx0XHRndWlsZC5uYW1lXHJcblx0XHRcdFx0XHRcdFx0KVxyXG5cdFx0XHRcdFx0XHQpXHJcblx0XHRcdFx0XHRcdC5jYXRjaChjKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0cmV0dXJuIGNvbnRyb2xsZXIubmV4dCgpO1xyXG5cdFx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdFx0bG9nZ2VkKFwiQ29tbWFuZCBkaWQgbm90IHJlZ2lzdGVyXCIgKyBtb2R1bGUubmFtZSk7XHJcblx0XHRcdFx0bG9nZ2VkKGUpO1xyXG5cdFx0XHRcdHJldHVybiBjb250cm9sbGVyLnN0b3AoKTtcclxuXHRcdFx0fVxyXG5cdFx0fSxcclxuXHR9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gb3B0aW9uc1RyYW5zZm9ybWVyKG9wczogQXJyYXk8U2Vybk9wdGlvbnNEYXRhPikge1xyXG5cdHJldHVybiBvcHMubWFwKChlbCkgPT5cclxuXHRcdGVsLmF1dG9jb21wbGV0ZSA/ICgoeyBjb21tYW5kLCAuLi5lbCB9KSA9PiBlbCkoZWwpIDogZWxcclxuXHQpO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgQ29tbWFuZFR5cGVSYXcgPSB7XHJcblx0W0NvbW1hbmRUeXBlLkJvdGhdOiBBcHBsaWNhdGlvbkNvbW1hbmRUeXBlLkNoYXRJbnB1dCxcclxuXHRbQ29tbWFuZFR5cGUuQ3R4VXNlcl06IEFwcGxpY2F0aW9uQ29tbWFuZFR5cGUuTWVzc2FnZSxcclxuXHRbQ29tbWFuZFR5cGUuQ3R4TXNnXTogQXBwbGljYXRpb25Db21tYW5kVHlwZS5Vc2VyLFxyXG5cdFtDb21tYW5kVHlwZS5TbGFzaF06IEFwcGxpY2F0aW9uQ29tbWFuZFR5cGUuQ2hhdElucHV0LFxyXG59IGFzIGNvbnN0O1xyXG5cclxuZXhwb3J0IHR5cGUgTm9uRW1wdHlBcnJheTxUIGV4dGVuZHMgYCR7bnVtYmVyfWAgPSBgJHtudW1iZXJ9YD4gPSBbVCwgLi4uVFtdXTtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgVmFsaWRQdWJsaXNoT3B0aW9ucyB7XHJcblx0Z3VpbGRJZHM6IHN0cmluZ1tdO1xyXG5cdGRtUGVybWlzc2lvbjogYm9vbGVhbjtcclxuXHRkZWZhdWx0TWVtYmVyUGVybWlzc2lvbnM6IFBlcm1pc3Npb25SZXNvbHZhYmxlO1xyXG59XHJcbmludGVyZmFjZSBHdWlsZFB1Ymxpc2hPcHRpb25zIHtcclxuXHRndWlsZElkcz86IE5vbkVtcHR5QXJyYXk7XHJcblx0ZGVmYXVsdE1lbWJlclBlcm1pc3Npb25zPzogUGVybWlzc2lvblJlc29sdmFibGU7XHJcblx0ZG1QZXJtaXNzaW9uPzogbmV2ZXI7XHJcbn1cclxuaW50ZXJmYWNlIEdsb2JhbFB1Ymxpc2hPcHRpb25zIHtcclxuXHRkZWZhdWx0TWVtYmVyUGVybWlzc2lvbnM/OiBQZXJtaXNzaW9uUmVzb2x2YWJsZTtcclxuXHRkbVBlcm1pc3Npb24/OiBmYWxzZTtcclxuXHRndWlsZElkcz86IG5ldmVyO1xyXG59XHJcblxyXG50eXBlIEJhc2VQdWJsaXNoT3B0aW9ucyA9IEd1aWxkUHVibGlzaE9wdGlvbnMgfCBHbG9iYWxQdWJsaXNoT3B0aW9ucztcclxuXHJcbmV4cG9ydCB0eXBlIFB1Ymxpc2hPcHRpb25zID0gQmFzZVB1Ymxpc2hPcHRpb25zICZcclxuXHQoXHJcblx0XHR8IFJlcXVpcmVkPFBpY2s8QmFzZVB1Ymxpc2hPcHRpb25zLCBcImRlZmF1bHRNZW1iZXJQZXJtaXNzaW9uc1wiPj5cclxuXHRcdHwgKFxyXG5cdFx0XHRcdHwgUmVxdWlyZWQ8UGljazxCYXNlUHVibGlzaE9wdGlvbnMsIFwiZG1QZXJtaXNzaW9uXCI+PlxyXG5cdFx0XHRcdHwgUmVxdWlyZWQ8UGljazxCYXNlUHVibGlzaE9wdGlvbnMsIFwiZ3VpbGRJZHNcIj4+XHJcblx0XHQgIClcclxuXHQpO1xyXG4iXX0=
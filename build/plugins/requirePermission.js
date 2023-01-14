"use strict";
/**
 * This is perm check, it allows users to parse the permission you want and let the plugin do the rest. (check bot or user for that perm).
 *
 * @author @Benzo-Fury [<@762918086349029386>]
 * @author @needhamgary [<@342314924804014081>]
 * @version 1.1.0
 * @example
 * ```ts
 * import { requirePermission } from "../plugins/myPermCheck";
 * import { commandModule, CommandType } from "@sern/handler";
 * export default commandModule({
 *  plugins: [ requirePermission<CommandType>('target', 'permission', 'No response (optional)') ],
 *  execute: (ctx) => {
 * 		//your code here
 *  }
 * })
 * ```
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.requirePermission = void 0;
const handler_1 = require("@sern/handler");
function payload(resp) {
    return { fetchReply: true, content: resp };
}
function requirePermission(target, perm, response) {
    return {
        type: handler_1.PluginType.Event,
        description: "Checks bot/user perms",
        async execute(event, controller) {
            const [ctx] = event;
            if (ctx.guild === null) {
                ctx.reply(payload("This command cannot be used here"));
                console.warn("PermCheck > A command stopped because we couldn't check a users permissions (was used in dms)"); //delete this line if you dont want to be notified when a command is used outside of a guild/server
                return controller.stop();
            }
            switch (target) {
                case "bot":
                    if (!(await ctx.guild.members.fetchMe({
                        cache: false,
                    })).permissions.has(perm)) {
                        if (!response)
                            response = `I cannot use this command, please give me \`${perm}\` permission.`;
                        await ctx.reply(payload(response));
                        return controller.stop();
                    }
                    return controller.next();
                case "user":
                    if (!ctx.member.permissions.has(perm)) {
                        if (!response)
                            response = `You cannot use this command because you are missing \`${perm}\` permission.`;
                        await ctx.reply(payload(response));
                        return controller.stop();
                    }
                    return controller.next();
                default:
                    console.warn("Perm Check >>> You didn't specify user or bot.");
                    ctx.reply(payload("User or Bot was not specified."));
                    return controller.stop();
            }
        },
    };
}
exports.requirePermission = requirePermission;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWlyZVBlcm1pc3Npb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcGx1Z2lucy9yZXF1aXJlUGVybWlzc2lvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUJHOzs7QUFHSCwyQ0FLdUI7QUFFdkIsU0FBUyxPQUFPLENBQUMsSUFBYTtJQUM3QixPQUFPLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFXLENBQUM7QUFDckQsQ0FBQztBQUVELFNBQWdCLGlCQUFpQixDQUNoQyxNQUFzQixFQUN0QixJQUEwQixFQUMxQixRQUFpQjtJQUVqQixPQUFPO1FBQ04sSUFBSSxFQUFFLG9CQUFVLENBQUMsS0FBSztRQUN0QixXQUFXLEVBQUUsdUJBQXVCO1FBQ3BDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLFVBQXNCO1lBQzFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUM7WUFDcEIsSUFBSSxHQUFHLENBQUMsS0FBSyxLQUFLLElBQUksRUFBRTtnQkFDdkIsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsa0NBQWtDLENBQUMsQ0FBQyxDQUFDO2dCQUN2RCxPQUFPLENBQUMsSUFBSSxDQUNYLCtGQUErRixDQUMvRixDQUFDLENBQUMsbUdBQW1HO2dCQUN0RyxPQUFPLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUN6QjtZQUNELFFBQVEsTUFBTSxFQUFFO2dCQUNmLEtBQUssS0FBSztvQkFDVCxJQUNDLENBQ0MsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQzt3QkFDaEMsS0FBSyxFQUFFLEtBQUs7cUJBQ1osQ0FBRSxDQUNILENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFDdEI7d0JBQ0QsSUFBSSxDQUFDLFFBQVE7NEJBQ1osUUFBUSxHQUFHLCtDQUErQyxJQUFJLGdCQUFnQixDQUFDO3dCQUNoRixNQUFNLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7d0JBQ25DLE9BQU8sVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDO3FCQUN6QjtvQkFDRCxPQUFPLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDMUIsS0FBSyxNQUFNO29CQUNWLElBQUksQ0FBRSxHQUFHLENBQUMsTUFBdUIsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFO3dCQUN4RCxJQUFJLENBQUMsUUFBUTs0QkFDWixRQUFRLEdBQUcseURBQXlELElBQUksZ0JBQWdCLENBQUM7d0JBQzFGLE1BQU0sR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQzt3QkFDbkMsT0FBTyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUM7cUJBQ3pCO29CQUNELE9BQU8sVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUMxQjtvQkFDQyxPQUFPLENBQUMsSUFBSSxDQUNYLGdEQUFnRCxDQUNoRCxDQUFDO29CQUNGLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLGdDQUFnQyxDQUFDLENBQUMsQ0FBQztvQkFDckQsT0FBTyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDMUI7UUFDRixDQUFDO0tBQ0QsQ0FBQztBQUNILENBQUM7QUFqREQsOENBaURDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIFRoaXMgaXMgcGVybSBjaGVjaywgaXQgYWxsb3dzIHVzZXJzIHRvIHBhcnNlIHRoZSBwZXJtaXNzaW9uIHlvdSB3YW50IGFuZCBsZXQgdGhlIHBsdWdpbiBkbyB0aGUgcmVzdC4gKGNoZWNrIGJvdCBvciB1c2VyIGZvciB0aGF0IHBlcm0pLlxyXG4gKlxyXG4gKiBAYXV0aG9yIEBCZW56by1GdXJ5IFs8QDc2MjkxODA4NjM0OTAyOTM4Nj5dXHJcbiAqIEBhdXRob3IgQG5lZWRoYW1nYXJ5IFs8QDM0MjMxNDkyNDgwNDAxNDA4MT5dXHJcbiAqIEB2ZXJzaW9uIDEuMS4wXHJcbiAqIEBleGFtcGxlXHJcbiAqIGBgYHRzXHJcbiAqIGltcG9ydCB7IHJlcXVpcmVQZXJtaXNzaW9uIH0gZnJvbSBcIi4uL3BsdWdpbnMvbXlQZXJtQ2hlY2tcIjtcclxuICogaW1wb3J0IHsgY29tbWFuZE1vZHVsZSwgQ29tbWFuZFR5cGUgfSBmcm9tIFwiQHNlcm4vaGFuZGxlclwiO1xyXG4gKiBleHBvcnQgZGVmYXVsdCBjb21tYW5kTW9kdWxlKHtcclxuICogIHBsdWdpbnM6IFsgcmVxdWlyZVBlcm1pc3Npb248Q29tbWFuZFR5cGU+KCd0YXJnZXQnLCAncGVybWlzc2lvbicsICdObyByZXNwb25zZSAob3B0aW9uYWwpJykgXSxcclxuICogIGV4ZWN1dGU6IChjdHgpID0+IHtcclxuICogXHRcdC8veW91ciBjb2RlIGhlcmVcclxuICogIH1cclxuICogfSlcclxuICogYGBgXHJcbiAqL1xyXG5cclxuaW1wb3J0IHR5cGUgeyBHdWlsZE1lbWJlciwgUGVybWlzc2lvblJlc29sdmFibGUgfSBmcm9tIFwiZGlzY29yZC5qc1wiO1xyXG5pbXBvcnQge1xyXG5cdENvbW1hbmRUeXBlLFxyXG5cdENvbnRyb2xsZXIsXHJcblx0RXZlbnRQbHVnaW4sXHJcblx0UGx1Z2luVHlwZSxcclxufSBmcm9tIFwiQHNlcm4vaGFuZGxlclwiO1xyXG5cclxuZnVuY3Rpb24gcGF5bG9hZChyZXNwPzogc3RyaW5nKSB7XHJcblx0cmV0dXJuIHsgZmV0Y2hSZXBseTogdHJ1ZSwgY29udGVudDogcmVzcCB9IGFzIGNvbnN0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcmVxdWlyZVBlcm1pc3Npb248VCBleHRlbmRzIENvbW1hbmRUeXBlPihcclxuXHR0YXJnZXQ6IFwidXNlclwiIHwgXCJib3RcIixcclxuXHRwZXJtOiBQZXJtaXNzaW9uUmVzb2x2YWJsZSxcclxuXHRyZXNwb25zZT86IHN0cmluZ1xyXG4pOiBFdmVudFBsdWdpbjxUPiB7XHJcblx0cmV0dXJuIHtcclxuXHRcdHR5cGU6IFBsdWdpblR5cGUuRXZlbnQsXHJcblx0XHRkZXNjcmlwdGlvbjogXCJDaGVja3MgYm90L3VzZXIgcGVybXNcIixcclxuXHRcdGFzeW5jIGV4ZWN1dGUoZXZlbnQsIGNvbnRyb2xsZXI6IENvbnRyb2xsZXIpIHtcclxuXHRcdFx0Y29uc3QgW2N0eF0gPSBldmVudDtcclxuXHRcdFx0aWYgKGN0eC5ndWlsZCA9PT0gbnVsbCkge1xyXG5cdFx0XHRcdGN0eC5yZXBseShwYXlsb2FkKFwiVGhpcyBjb21tYW5kIGNhbm5vdCBiZSB1c2VkIGhlcmVcIikpO1xyXG5cdFx0XHRcdGNvbnNvbGUud2FybihcclxuXHRcdFx0XHRcdFwiUGVybUNoZWNrID4gQSBjb21tYW5kIHN0b3BwZWQgYmVjYXVzZSB3ZSBjb3VsZG4ndCBjaGVjayBhIHVzZXJzIHBlcm1pc3Npb25zICh3YXMgdXNlZCBpbiBkbXMpXCJcclxuXHRcdFx0XHQpOyAvL2RlbGV0ZSB0aGlzIGxpbmUgaWYgeW91IGRvbnQgd2FudCB0byBiZSBub3RpZmllZCB3aGVuIGEgY29tbWFuZCBpcyB1c2VkIG91dHNpZGUgb2YgYSBndWlsZC9zZXJ2ZXJcclxuXHRcdFx0XHRyZXR1cm4gY29udHJvbGxlci5zdG9wKCk7XHJcblx0XHRcdH1cclxuXHRcdFx0c3dpdGNoICh0YXJnZXQpIHtcclxuXHRcdFx0XHRjYXNlIFwiYm90XCI6XHJcblx0XHRcdFx0XHRpZiAoXHJcblx0XHRcdFx0XHRcdCEoXHJcblx0XHRcdFx0XHRcdFx0KGF3YWl0IGN0eC5ndWlsZC5tZW1iZXJzLmZldGNoTWUoe1xyXG5cdFx0XHRcdFx0XHRcdFx0Y2FjaGU6IGZhbHNlLFxyXG5cdFx0XHRcdFx0XHRcdH0pISkgYXMgR3VpbGRNZW1iZXJcclxuXHRcdFx0XHRcdFx0KS5wZXJtaXNzaW9ucy5oYXMocGVybSlcclxuXHRcdFx0XHRcdCkge1xyXG5cdFx0XHRcdFx0XHRpZiAoIXJlc3BvbnNlKVxyXG5cdFx0XHRcdFx0XHRcdHJlc3BvbnNlID0gYEkgY2Fubm90IHVzZSB0aGlzIGNvbW1hbmQsIHBsZWFzZSBnaXZlIG1lIFxcYCR7cGVybX1cXGAgcGVybWlzc2lvbi5gO1xyXG5cdFx0XHRcdFx0XHRhd2FpdCBjdHgucmVwbHkocGF5bG9hZChyZXNwb25zZSkpO1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gY29udHJvbGxlci5zdG9wKCk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRyZXR1cm4gY29udHJvbGxlci5uZXh0KCk7XHJcblx0XHRcdFx0Y2FzZSBcInVzZXJcIjpcclxuXHRcdFx0XHRcdGlmICghKGN0eC5tZW1iZXIhIGFzIEd1aWxkTWVtYmVyKS5wZXJtaXNzaW9ucy5oYXMocGVybSkpIHtcclxuXHRcdFx0XHRcdFx0aWYgKCFyZXNwb25zZSlcclxuXHRcdFx0XHRcdFx0XHRyZXNwb25zZSA9IGBZb3UgY2Fubm90IHVzZSB0aGlzIGNvbW1hbmQgYmVjYXVzZSB5b3UgYXJlIG1pc3NpbmcgXFxgJHtwZXJtfVxcYCBwZXJtaXNzaW9uLmA7XHJcblx0XHRcdFx0XHRcdGF3YWl0IGN0eC5yZXBseShwYXlsb2FkKHJlc3BvbnNlKSk7XHJcblx0XHRcdFx0XHRcdHJldHVybiBjb250cm9sbGVyLnN0b3AoKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdHJldHVybiBjb250cm9sbGVyLm5leHQoKTtcclxuXHRcdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdFx0Y29uc29sZS53YXJuKFxyXG5cdFx0XHRcdFx0XHRcIlBlcm0gQ2hlY2sgPj4+IFlvdSBkaWRuJ3Qgc3BlY2lmeSB1c2VyIG9yIGJvdC5cIlxyXG5cdFx0XHRcdFx0KTtcclxuXHRcdFx0XHRcdGN0eC5yZXBseShwYXlsb2FkKFwiVXNlciBvciBCb3Qgd2FzIG5vdCBzcGVjaWZpZWQuXCIpKTtcclxuXHRcdFx0XHRcdHJldHVybiBjb250cm9sbGVyLnN0b3AoKTtcclxuXHRcdFx0fVxyXG5cdFx0fSxcclxuXHR9O1xyXG59XHJcbiJdfQ==
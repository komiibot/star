"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handler_1 = require("@sern/handler");
const publish_1 = require("../../plugins/publish");
const discord_js_1 = require("discord.js");
const __1 = require("../..");
const assert_1 = require("assert");
exports.default = (0, handler_1.commandModule)({
    type: handler_1.CommandType.Both,
    plugins: [(0, publish_1.publish)()],
    description: 'Shows you this menu.',
    alias: [],
    execute: async (ctx) => {
        var _a, _b, _c, _d;
        const [commands] = (0, __1.useContainer)('@sern/store');
        const embed = new discord_js_1.EmbedBuilder()
            .setTitle('Help Menu')
            // TODO: create a function to get current guild prefix.
            .setDescription(`Here are all the commands you can use, prefix is ?`)
            .setColor('Random')
            .setTimestamp()
            .setFooter({ text: ctx.user.username, iconURL: ctx.user.avatarURL() || undefined });
        for (const [name, command] of commands.BothCommands) {
            (0, assert_1.ok)(handler_1.CommandType.Both === command.type, 'Error: Found invalid command');
            let desc = (_a = command.description) !== null && _a !== void 0 ? _a : 'No description';
            let nameTitle = name !== null && name !== void 0 ? name : 'No name';
            const options = (_b = command.options) !== null && _b !== void 0 ? _b : [];
            if (options.length > 0) {
                for (const option of options) {
                    nameTitle += ` [${option.name}]`;
                }
            }
            const alias = (_d = (_c = command.alias) === null || _c === void 0 ? void 0 : _c.join(', ')) !== null && _d !== void 0 ? _d : [];
            if (alias.length > 0)
                desc += `\nAliases: ${alias}`;
            embed.addFields({ name: nameTitle, value: desc });
        }
        ctx.channel.send({ embeds: [embed] });
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tYW5kcy9nZW5lcmFsL2hlbHAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwyQ0FBMkQ7QUFDM0QsbURBQStDO0FBQy9DLDJDQUEwQztBQUMxQyw2QkFBcUM7QUFDckMsbUNBQTRCO0FBRzVCLGtCQUFlLElBQUEsdUJBQWEsRUFBQztJQUM1QixJQUFJLEVBQUUscUJBQVcsQ0FBQyxJQUFJO0lBQ3RCLE9BQU8sRUFBRSxDQUFDLElBQUEsaUJBQU8sR0FBRSxDQUFDO0lBQ3BCLFdBQVcsRUFBRSxzQkFBc0I7SUFDbkMsS0FBSyxFQUFHLEVBQUU7SUFDVixPQUFPLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxFQUFFOztRQUNoQixNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsSUFBQSxnQkFBWSxFQUFDLGFBQWEsQ0FBQyxDQUFBO1FBRTlDLE1BQU0sS0FBSyxHQUFHLElBQUkseUJBQVksRUFBRTthQUMzQixRQUFRLENBQUMsV0FBVyxDQUFDO1lBQ3RCLHVEQUF1RDthQUN0RCxjQUFjLENBQUMsb0RBQW9ELENBQUM7YUFDcEUsUUFBUSxDQUFDLFFBQVEsQ0FBQzthQUNsQixZQUFZLEVBQUU7YUFDZCxTQUFTLENBQUMsRUFBRSxJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsT0FBTyxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksU0FBUyxFQUFFLENBQUMsQ0FBQTtRQUV2RixLQUFJLE1BQU0sQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUksUUFBUSxDQUFDLFlBQVksRUFBRTtZQUNoRCxJQUFBLFdBQUUsRUFBQyxxQkFBVyxDQUFDLElBQUksS0FBSyxPQUFPLENBQUMsSUFBSSxFQUFFLDhCQUE4QixDQUFDLENBQUM7WUFFdEUsSUFBSSxJQUFJLEdBQUcsTUFBQSxPQUFPLENBQUMsV0FBVyxtQ0FBSSxnQkFBZ0IsQ0FBQztZQUNuRCxJQUFJLFNBQVMsR0FBRyxJQUFJLGFBQUosSUFBSSxjQUFKLElBQUksR0FBSSxTQUFTLENBQUM7WUFFbEMsTUFBTSxPQUFPLEdBQUcsTUFBQSxPQUFPLENBQUMsT0FBTyxtQ0FBSSxFQUFFLENBQUM7WUFDdEMsSUFBSSxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDcEIsS0FBSyxNQUFNLE1BQU0sSUFBSSxPQUFPLEVBQUU7b0JBQzFCLFNBQVMsSUFBSSxLQUFLLE1BQU0sQ0FBQyxJQUFJLEdBQUcsQ0FBQztpQkFDcEM7YUFDSjtZQUVELE1BQU0sS0FBSyxHQUFHLE1BQUEsTUFBQSxPQUFPLENBQUMsS0FBSywwQ0FBRSxJQUFJLENBQUMsSUFBSSxDQUFDLG1DQUFJLEVBQUUsQ0FBQztZQUM5QyxJQUFJLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQztnQkFBRSxJQUFJLElBQUksY0FBYyxLQUFLLEVBQUUsQ0FBQztZQUVwRCxLQUFLLENBQUMsU0FBUyxDQUFDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQTtTQUNuRDtRQUVELEdBQUcsQ0FBQyxPQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUMsQ0FBQyxDQUFBO0lBQ3pDLENBQUM7Q0FDSixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjb21tYW5kTW9kdWxlLCBDb21tYW5kVHlwZSB9IGZyb20gJ0BzZXJuL2hhbmRsZXInO1xyXG5pbXBvcnQgeyBwdWJsaXNoIH0gZnJvbSAnLi4vLi4vcGx1Z2lucy9wdWJsaXNoJ1xyXG5pbXBvcnQgeyBFbWJlZEJ1aWxkZXIgfSBmcm9tICdkaXNjb3JkLmpzJztcclxuaW1wb3J0IHsgdXNlQ29udGFpbmVyIH0gZnJvbSAnLi4vLi4nO1xyXG5pbXBvcnQgeyBvayB9IGZyb20gJ2Fzc2VydCc7XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29tbWFuZE1vZHVsZSh7XHJcblx0dHlwZTogQ29tbWFuZFR5cGUuQm90aCxcclxuXHRwbHVnaW5zOiBbcHVibGlzaCgpXSxcclxuXHRkZXNjcmlwdGlvbjogJ1Nob3dzIHlvdSB0aGlzIG1lbnUuJyxcclxuXHRhbGlhcyA6IFtdLFxyXG5cdGV4ZWN1dGU6IGFzeW5jIChjdHgpID0+IHtcclxuICAgICAgICBjb25zdCBbY29tbWFuZHNdID0gdXNlQ29udGFpbmVyKCdAc2Vybi9zdG9yZScpXHJcblxyXG4gICAgICAgIGNvbnN0IGVtYmVkID0gbmV3IEVtYmVkQnVpbGRlcigpXHJcbiAgICAgICAgICAgIC5zZXRUaXRsZSgnSGVscCBNZW51JylcclxuICAgICAgICAgICAgLy8gVE9ETzogY3JlYXRlIGEgZnVuY3Rpb24gdG8gZ2V0IGN1cnJlbnQgZ3VpbGQgcHJlZml4LlxyXG4gICAgICAgICAgICAuc2V0RGVzY3JpcHRpb24oYEhlcmUgYXJlIGFsbCB0aGUgY29tbWFuZHMgeW91IGNhbiB1c2UsIHByZWZpeCBpcyA/YClcclxuICAgICAgICAgICAgLnNldENvbG9yKCdSYW5kb20nKVxyXG4gICAgICAgICAgICAuc2V0VGltZXN0YW1wKClcclxuICAgICAgICAgICAgLnNldEZvb3Rlcih7IHRleHQ6IGN0eC51c2VyLnVzZXJuYW1lLCBpY29uVVJMOiBjdHgudXNlci5hdmF0YXJVUkwoKSB8fCB1bmRlZmluZWQgfSlcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgZm9yKGNvbnN0IFtuYW1lLCBjb21tYW5kXSBvZiBjb21tYW5kcy5Cb3RoQ29tbWFuZHMpIHtcclxuICAgICAgICAgICAgb2soQ29tbWFuZFR5cGUuQm90aCA9PT0gY29tbWFuZC50eXBlLCAnRXJyb3I6IEZvdW5kIGludmFsaWQgY29tbWFuZCcpO1xyXG5cclxuICAgICAgICAgICAgbGV0IGRlc2MgPSBjb21tYW5kLmRlc2NyaXB0aW9uID8/ICdObyBkZXNjcmlwdGlvbic7XHJcbiAgICAgICAgICAgIGxldCBuYW1lVGl0bGUgPSBuYW1lID8/ICdObyBuYW1lJztcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbnMgPSBjb21tYW5kLm9wdGlvbnMgPz8gW107XHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIGZvciAoY29uc3Qgb3B0aW9uIG9mIG9wdGlvbnMpIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lVGl0bGUgKz0gYCBbJHtvcHRpb24ubmFtZX1dYDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGFsaWFzID0gY29tbWFuZC5hbGlhcz8uam9pbignLCAnKSA/PyBbXTsgXHJcbiAgICAgICAgICAgIGlmIChhbGlhcy5sZW5ndGggPiAwKSBkZXNjICs9IGBcXG5BbGlhc2VzOiAke2FsaWFzfWA7XHJcblxyXG4gICAgICAgICAgICBlbWJlZC5hZGRGaWVsZHMoeyBuYW1lOiBuYW1lVGl0bGUsIHZhbHVlOiBkZXNjfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGN0eC5jaGFubmVsIS5zZW5kKHsgZW1iZWRzOiBbZW1iZWRdfSlcclxuICAgIH0sXHJcbn0pOyJdfQ==
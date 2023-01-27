"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PingCommand = void 0;
const framework_1 = require("@sapphire/framework");
const discord_js_utilities_1 = require("@sapphire/discord.js-utilities");
const decorators_1 = require("@sapphire/decorators");
let PingCommand = class PingCommand extends framework_1.Command {
    registerApplicationCommands(registry) {
        registry.registerChatInputCommand((builder) => builder.setName('ping').setDescription('Ping bot to see if it is alive'));
    }
    async chatInputRun(interaction) {
        const msg = await interaction.reply({ content: `Pinging...`, ephemeral: true, fetchReply: true });
        if ((0, discord_js_utilities_1.isMessageInstance)(msg)) {
            const diff = msg.createdTimestamp - interaction.createdTimestamp;
            const ping = Math.round(this.container.client.ws.ping);
            return interaction.editReply(`Pong!\nBOT: ${ping}ms. \nWS: ${diff}ms.`);
        }
        return interaction.editReply('Something went wrong when trying to recieve the ping.');
    }
};
PingCommand = __decorate([
    (0, decorators_1.ApplyOptions)({
        preconditions: ["blacklistCheck"]
    })
], PingCommand);
exports.PingCommand = PingCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tYW5kcy9nZW5lcmFsL3BpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsbURBQWdFO0FBQ2hFLHlFQUFtRTtBQUNuRSxxREFBb0Q7QUFNN0MsSUFBTSxXQUFXLEdBQWpCLE1BQU0sV0FBWSxTQUFRLG1CQUFPO0lBQ3BCLDJCQUEyQixDQUFDLFFBQW1DO1FBQzNFLFFBQVEsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQzVDLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsY0FBYyxDQUFDLGdDQUFnQyxDQUFDLENBQ3pFLENBQUM7SUFDSixDQUFDO0lBRU0sS0FBSyxDQUFDLFlBQVksQ0FBQyxXQUFnRDtRQUN4RSxNQUFNLEdBQUcsR0FBRyxNQUFNLFdBQVcsQ0FBQyxLQUFLLENBQUMsRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7UUFFbEcsSUFBSSxJQUFBLHdDQUFpQixFQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQzFCLE1BQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQyxnQkFBZ0IsR0FBRyxXQUFXLENBQUMsZ0JBQWdCLENBQUM7WUFDakUsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdkQsT0FBTyxXQUFXLENBQUMsU0FBUyxDQUFDLGVBQWUsSUFBSSxhQUFhLElBQUksS0FBSyxDQUFDLENBQUM7U0FDekU7UUFFRCxPQUFPLFdBQVcsQ0FBQyxTQUFTLENBQUMsdURBQXVELENBQUMsQ0FBQztJQUMxRixDQUFDO0NBQ0osQ0FBQTtBQWxCWSxXQUFXO0lBSnZCLElBQUEseUJBQVksRUFBa0I7UUFDOUIsYUFBYSxFQUFFLENBQUMsZ0JBQWdCLENBQUM7S0FDakMsQ0FBQztHQUVXLFdBQVcsQ0FrQnZCO0FBbEJZLGtDQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhdElucHV0Q29tbWFuZCwgQ29tbWFuZCB9IGZyb20gJ0BzYXBwaGlyZS9mcmFtZXdvcmsnO1xyXG5pbXBvcnQgeyBpc01lc3NhZ2VJbnN0YW5jZSB9IGZyb20gJ0BzYXBwaGlyZS9kaXNjb3JkLmpzLXV0aWxpdGllcyc7XHJcbmltcG9ydCB7IEFwcGx5T3B0aW9ucyB9IGZyb20gJ0BzYXBwaGlyZS9kZWNvcmF0b3JzJztcclxuXHJcbkBBcHBseU9wdGlvbnM8Q29tbWFuZC5PcHRpb25zPih7XHJcblx0cHJlY29uZGl0aW9uczogW1wiYmxhY2tsaXN0Q2hlY2tcIl1cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBQaW5nQ29tbWFuZCBleHRlbmRzIENvbW1hbmQge1xyXG4gICAgcHVibGljIG92ZXJyaWRlIHJlZ2lzdGVyQXBwbGljYXRpb25Db21tYW5kcyhyZWdpc3RyeTogQ2hhdElucHV0Q29tbWFuZC5SZWdpc3RyeSkge1xyXG4gICAgICAgIHJlZ2lzdHJ5LnJlZ2lzdGVyQ2hhdElucHV0Q29tbWFuZCgoYnVpbGRlcikgPT5cclxuICAgICAgICAgIGJ1aWxkZXIuc2V0TmFtZSgncGluZycpLnNldERlc2NyaXB0aW9uKCdQaW5nIGJvdCB0byBzZWUgaWYgaXQgaXMgYWxpdmUnKVxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgIFxyXG4gICAgICBwdWJsaWMgYXN5bmMgY2hhdElucHV0UnVuKGludGVyYWN0aW9uOiBDb21tYW5kLkNoYXRJbnB1dENvbW1hbmRJbnRlcmFjdGlvbikge1xyXG4gICAgICAgIGNvbnN0IG1zZyA9IGF3YWl0IGludGVyYWN0aW9uLnJlcGx5KHsgY29udGVudDogYFBpbmdpbmcuLi5gLCBlcGhlbWVyYWw6IHRydWUsIGZldGNoUmVwbHk6IHRydWUgfSk7XHJcbiAgICBcclxuICAgICAgICBpZiAoaXNNZXNzYWdlSW5zdGFuY2UobXNnKSkge1xyXG4gICAgICAgICAgY29uc3QgZGlmZiA9IG1zZy5jcmVhdGVkVGltZXN0YW1wIC0gaW50ZXJhY3Rpb24uY3JlYXRlZFRpbWVzdGFtcDtcclxuICAgICAgICAgIGNvbnN0IHBpbmcgPSBNYXRoLnJvdW5kKHRoaXMuY29udGFpbmVyLmNsaWVudC53cy5waW5nKTtcclxuICAgICAgICAgIHJldHVybiBpbnRlcmFjdGlvbi5lZGl0UmVwbHkoYFBvbmchXFxuQk9UOiAke3Bpbmd9bXMuIFxcbldTOiAke2RpZmZ9bXMuYCk7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgcmV0dXJuIGludGVyYWN0aW9uLmVkaXRSZXBseSgnU29tZXRoaW5nIHdlbnQgd3Jvbmcgd2hlbiB0cnlpbmcgdG8gcmVjaWV2ZSB0aGUgcGluZy4nKTtcclxuICAgIH1cclxufSJdfQ==
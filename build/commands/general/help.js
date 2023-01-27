"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelpCommand = void 0;
const framework_1 = require("@sapphire/framework");
const discord_js_1 = require("discord.js");
const decorators_1 = require("@sapphire/decorators");
let HelpCommand = class HelpCommand extends framework_1.Command {
    registerApplicationCommands(registry) {
        registry.registerChatInputCommand((builder) => builder.setName('help')
            .setDescription('Generate a list of commands')
            .addStringOption((option) => option.setName("command")
            .setDescription("The command that you want to see more info on.")
            .setChoices({ name: "ping", value: "ping" }))
            .addStringOption((option) => option.setName("module")
            .setDescription("The moudle that you want to see more info on.")));
    }
    async chatInputRun(interaction) {
        let categories = this.container.stores.get("commands").categories.filter(c => c !== "dev");
        let str = '**Modules**\n';
        categories.reverse().map(c => str += `\`${c}\`, `);
        str = str.substring(0, str.length - 2);
        let embed = new discord_js_1.EmbedBuilder()
            .setTitle('Help')
            .setDescription(str)
            .setTimestamp()
            .setColor('#89CFF0')
            .setFooter({
            text: 'test',
            iconURL: interaction.user.avatarURL()
        });
        // Get more info on a command or module
        const getCommand = interaction.options.getString("command", false);
        const getModule = interaction.options.getString("module", false);
        if (getCommand) {
            let command = this.container.stores.get("commands").get(getCommand);
            let embed = new discord_js_1.EmbedBuilder()
                .setAuthor({ name: interaction.user.username, iconURL: interaction.user.avatarURL() })
                .setTitle(command.name)
                .setDescription(`${command.aliases.length >= 1 ? command.aliases : "There's no available aliases."}\n\nDescription: ${command.description}`)
                .setTimestamp()
                .setColor('#d9576c')
                .setFooter({
                text: 'Optional params showed in []'
            });
            console.log(command);
            return await interaction.reply({ embeds: [embed] });
        }
        // Row Builder
        let options = [];
        for (var i = 0; i < categories.length; i++) {
            options.push({
                label: categories[i].charAt(0).toUpperCase() + categories[i].slice(1),
                value: categories[i]
            });
        }
        const selectMenu = new discord_js_1.StringSelectMenuBuilder()
            .setCustomId('select')
            .setPlaceholder('Nothing selected')
            .addOptions(options);
        const row = new discord_js_1.ActionRowBuilder().addComponents(selectMenu);
        await interaction.reply({ embeds: [embed], components: [row] });
    }
};
HelpCommand = __decorate([
    (0, decorators_1.ApplyOptions)({
        preconditions: ["blacklistCheck"]
    })
], HelpCommand);
exports.HelpCommand = HelpCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tYW5kcy9nZW5lcmFsL2hlbHAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsbURBQWdFO0FBRWhFLDJDQUFvSztBQUNwSyxxREFBb0Q7QUFNN0MsSUFBTSxXQUFXLEdBQWpCLE1BQU0sV0FBWSxTQUFRLG1CQUFPO0lBQ3BCLDJCQUEyQixDQUFDLFFBQW1DO1FBQzNFLFFBQVEsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQzFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO2FBQ3RCLGNBQWMsQ0FBQyw2QkFBNkIsQ0FBQzthQUM3QyxlQUFlLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUN4QixNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQzthQUN4QixjQUFjLENBQUMsZ0RBQWdELENBQUM7YUFDaEUsVUFBVSxDQUNQLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLENBQ2xDLENBQ0o7YUFDQSxlQUFlLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUN4QixNQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQzthQUN2QixjQUFjLENBQUMsK0NBQStDLENBQUMsQ0FDbkUsQ0FDSixDQUFDO0lBQ04sQ0FBQztJQUVNLEtBQUssQ0FBQyxZQUFZLENBQUMsV0FBZ0Q7UUFDdEUsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxDQUFDLENBQUM7UUFDM0YsSUFBSSxHQUFHLEdBQUcsZUFBZSxDQUFDO1FBQzFCLFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVB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QyxFQUFFLENBQUMsQ0FBQztJQUNwRSxDQUFDO0NBQ0osQ0FBQTtBQXZFWSxXQUFXO0lBSnZCLElBQUEseUJBQVksRUFBa0I7UUFDOUIsYUFBYSxFQUFFLENBQUMsZ0JBQWdCLENBQUM7S0FDakMsQ0FBQztHQUVXLFdBQVcsQ0F1RXZCO0FBdkVZLGtDQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhdElucHV0Q29tbWFuZCwgQ29tbWFuZCB9IGZyb20gJ0BzYXBwaGlyZS9mcmFtZXdvcmsnO1xyXG5pbXBvcnQgeyBpc01lc3NhZ2VJbnN0YW5jZSB9IGZyb20gJ0BzYXBwaGlyZS9kaXNjb3JkLmpzLXV0aWxpdGllcyc7XHJcbmltcG9ydCB7IE1lc3NhZ2UsIEVtYmVkQnVpbGRlciwgQXBwbGljYXRpb25Db21tYW5kTWFuYWdlciwgQWN0aW9uUm93QnVpbGRlciwgRXZlbnRzLCBTdHJpbmdTZWxlY3RNZW51QnVpbGRlciwgQWN0aW9uUm93LCBBcHBsaWNhdGlvbkNvbW1hbmRUeXBlIH0gZnJvbSAnZGlzY29yZC5qcyc7XHJcbmltcG9ydCB7IEFwcGx5T3B0aW9ucyB9IGZyb20gJ0BzYXBwaGlyZS9kZWNvcmF0b3JzJztcclxuXHJcbkBBcHBseU9wdGlvbnM8Q29tbWFuZC5PcHRpb25zPih7XHJcblx0cHJlY29uZGl0aW9uczogW1wiYmxhY2tsaXN0Q2hlY2tcIl1cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBIZWxwQ29tbWFuZCBleHRlbmRzIENvbW1hbmQge1xyXG4gICAgcHVibGljIG92ZXJyaWRlIHJlZ2lzdGVyQXBwbGljYXRpb25Db21tYW5kcyhyZWdpc3RyeTogQ2hhdElucHV0Q29tbWFuZC5SZWdpc3RyeSkge1xyXG4gICAgICAgIHJlZ2lzdHJ5LnJlZ2lzdGVyQ2hhdElucHV0Q29tbWFuZCgoYnVpbGRlcikgPT5cclxuICAgICAgICAgICAgYnVpbGRlci5zZXROYW1lKCdoZWxwJylcclxuICAgICAgICAgICAgLnNldERlc2NyaXB0aW9uKCdHZW5lcmF0ZSBhIGxpc3Qgb2YgY29tbWFuZHMnKVxyXG4gICAgICAgICAgICAuYWRkU3RyaW5nT3B0aW9uKChvcHRpb24pID0+XHJcbiAgICAgICAgICAgICAgICBvcHRpb24uc2V0TmFtZShcImNvbW1hbmRcIilcclxuICAgICAgICAgICAgICAgIC5zZXREZXNjcmlwdGlvbihcIlRoZSBjb21tYW5kIHRoYXQgeW91IHdhbnQgdG8gc2VlIG1vcmUgaW5mbyBvbi5cIilcclxuICAgICAgICAgICAgICAgIC5zZXRDaG9pY2VzKFxyXG4gICAgICAgICAgICAgICAgICAgIHsgbmFtZTogXCJwaW5nXCIsIHZhbHVlOiBcInBpbmdcIiB9XHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgLmFkZFN0cmluZ09wdGlvbigob3B0aW9uKSA9PlxyXG4gICAgICAgICAgICAgICAgb3B0aW9uLnNldE5hbWUoXCJtb2R1bGVcIilcclxuICAgICAgICAgICAgICAgIC5zZXREZXNjcmlwdGlvbihcIlRoZSBtb3VkbGUgdGhhdCB5b3Ugd2FudCB0byBzZWUgbW9yZSBpbmZvIG9uLlwiKVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgY2hhdElucHV0UnVuKGludGVyYWN0aW9uOiBDb21tYW5kLkNoYXRJbnB1dENvbW1hbmRJbnRlcmFjdGlvbikge1xyXG4gICAgICAgIGxldCBjYXRlZ29yaWVzID0gdGhpcy5jb250YWluZXIuc3RvcmVzLmdldChcImNvbW1hbmRzXCIpLmNhdGVnb3JpZXMuZmlsdGVyKGMgPT4gYyAhPT0gXCJkZXZcIik7XHJcbiAgICAgICAgbGV0IHN0ciA9ICcqKk1vZHVsZXMqKlxcbic7XHJcbiAgICAgICAgY2F0ZWdvcmllcy5yZXZlcnNlKCkubWFwKGMgPT4gc3RyICs9IGBcXGAke2N9XFxgLCBgKTtcclxuICAgICAgICBzdHIgPSBzdHIuc3Vic3RyaW5nKDAsIHN0ci5sZW5ndGggLSAyKTtcclxuICAgICAgICBsZXQgZW1iZWQgPSBuZXcgRW1iZWRCdWlsZGVyKClcclxuICAgICAgICAgICAgLnNldFRpdGxlKCdIZWxwJylcclxuICAgICAgICAgICAgLnNldERlc2NyaXB0aW9uKHN0cilcclxuICAgICAgICAgICAgLnNldFRpbWVzdGFtcCgpXHJcbiAgICAgICAgICAgIC5zZXRDb2xvcignIzg5Q0ZGMCcpXHJcbiAgICAgICAgICAgIC5zZXRGb290ZXIoe1xyXG4gICAgICAgICAgICAgICAgdGV4dDogJ3Rlc3QnLFxyXG4gICAgICAgICAgICAgICAgaWNvblVSTDogaW50ZXJhY3Rpb24udXNlci5hdmF0YXJVUkwoKVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBHZXQgbW9yZSBpbmZvIG9uIGEgY29tbWFuZCBvciBtb2R1bGVcclxuICAgICAgICBjb25zdCBnZXRDb21tYW5kID0gaW50ZXJhY3Rpb24ub3B0aW9ucy5nZXRTdHJpbmcoXCJjb21tYW5kXCIsIGZhbHNlKTtcclxuICAgICAgICBjb25zdCBnZXRNb2R1bGUgPSBpbnRlcmFjdGlvbi5vcHRpb25zLmdldFN0cmluZyhcIm1vZHVsZVwiLCBmYWxzZSk7XHJcblxyXG4gICAgICAgIGlmKGdldENvbW1hbmQpIHtcclxuICAgICAgICAgICAgbGV0IGNvbW1hbmQgPSB0aGlzLmNvbnRhaW5lci5zdG9yZXMuZ2V0KFwiY29tbWFuZHNcIikuZ2V0KGdldENvbW1hbmQpXHJcbiAgICAgICAgICAgIGxldCBlbWJlZCA9IG5ldyBFbWJlZEJ1aWxkZXIoKVxyXG4gICAgICAgICAgICAuc2V0QXV0aG9yKHsgbmFtZTogaW50ZXJhY3Rpb24udXNlci51c2VybmFtZSwgaWNvblVSTDogaW50ZXJhY3Rpb24udXNlci5hdmF0YXJVUkwoKSB9KVxyXG4gICAgICAgICAgICAuc2V0VGl0bGUoY29tbWFuZC5uYW1lKVxyXG4gICAgICAgICAgICAuc2V0RGVzY3JpcHRpb24oYCR7Y29tbWFuZC5hbGlhc2VzLmxlbmd0aCA+PSAxID8gY29tbWFuZC5hbGlhc2VzIDogXCJUaGVyZSdzIG5vIGF2YWlsYWJsZSBhbGlhc2VzLlwifVxcblxcbkRlc2NyaXB0aW9uOiAke2NvbW1hbmQuZGVzY3JpcHRpb259YClcclxuICAgICAgICAgICAgLnNldFRpbWVzdGFtcCgpXHJcbiAgICAgICAgICAgIC5zZXRDb2xvcignI2Q5NTc2YycpXHJcbiAgICAgICAgICAgIC5zZXRGb290ZXIoe1xyXG4gICAgICAgICAgICAgICAgdGV4dDogJ09wdGlvbmFsIHBhcmFtcyBzaG93ZWQgaW4gW10nXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhjb21tYW5kKVxyXG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgaW50ZXJhY3Rpb24ucmVwbHkoeyBlbWJlZHM6IFtlbWJlZF0gfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBSb3cgQnVpbGRlclxyXG4gICAgICAgIGxldCBvcHRpb25zID0gW107XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjYXRlZ29yaWVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIG9wdGlvbnMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBsYWJlbDogY2F0ZWdvcmllc1tpXS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIGNhdGVnb3JpZXNbaV0uc2xpY2UoMSksXHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogY2F0ZWdvcmllc1tpXVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3Qgc2VsZWN0TWVudSA9IG5ldyBTdHJpbmdTZWxlY3RNZW51QnVpbGRlcigpXHJcbiAgICAgICAgICAgIC5zZXRDdXN0b21JZCgnc2VsZWN0JylcclxuICAgICAgICAgICAgLnNldFBsYWNlaG9sZGVyKCdOb3RoaW5nIHNlbGVjdGVkJylcclxuICAgICAgICAgICAgLmFkZE9wdGlvbnMob3B0aW9ucylcclxuXHJcbiAgICAgICAgY29uc3Qgcm93ID0gbmV3IEFjdGlvblJvd0J1aWxkZXI8U3RyaW5nU2VsZWN0TWVudUJ1aWxkZXI+KCkuYWRkQ29tcG9uZW50cyhzZWxlY3RNZW51KVxyXG5cclxuICAgICAgICBhd2FpdCBpbnRlcmFjdGlvbi5yZXBseSh7IGVtYmVkczogW2VtYmVkXSwgY29tcG9uZW50czogW3Jvd10gfSk7XHJcbiAgICB9XHJcbn0iXX0=
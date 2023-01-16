"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handler_1 = require("@sern/handler");
const publish_1 = require("../../plugins/publish");
const modules_1 = require("../../modules");
const index_1 = require("../../index");
exports.default = (0, handler_1.commandModule)({
    type: handler_1.CommandType.Both,
    plugins: [(0, publish_1.publish)()],
    description: "Check your current XP.",
    alias: [],
    execute: async (ctx, args) => {
        const levels = await index_1.prisma.leveling.findFirst({
            where: {
                userId: ctx === null || ctx === void 0 ? void 0 : ctx.message.author.id,
            },
        });
        let LevelUpXp = 0;
        for (var i = 2; i < levels.level + 2; i++) {
            console.log(`${i} hello`);
            LevelUpXp += (0, modules_1.GetGlobalXP)(i);
        }
        // console.log(LevelUpXp)
        let XpLeftLevelUp = LevelUpXp - levels.currentXp;
        // console.log(XpLeftLevelUp)
        let XpNeededLevelUp = (0, modules_1.GetGlobalXP)(levels.level + 1);
        return ctx.reply({ content: `Level ${levels.level}\nCurrentXP: ${levels.currentXp}\nNeeded XP: ${XpNeededLevelUp - XpLeftLevelUp}/${XpNeededLevelUp}` });
        // let neededXp = 0;
        // for (let i = 1; i < levels.level + 1; i++) {
        //     // console.log(i)
        //     neededXp += GetGlobalXP(i);
        //     console.log(neededXp);
        // }
        // ctx.reply({ content: `${neededXp}`});
        // let newXp = neededXp - levels.currentXp;
        // return ctx.reply({ content: `Level ${levels.level}\nCurrentXP: ${levels.currentXp}\nNeeded XP: ${GetGlobalXP(levels.level+1)-newXp}/${GetGlobalXP(levels.level+1)}` });
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieHAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tbWFuZHMvZWNvbm9teS94cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDJDQUEyRDtBQUMzRCxtREFBZ0Q7QUFDaEQsMkNBQTRDO0FBRTVDLHVDQUFxQztBQUVyQyxrQkFBZSxJQUFBLHVCQUFhLEVBQUM7SUFDekIsSUFBSSxFQUFFLHFCQUFXLENBQUMsSUFBSTtJQUN0QixPQUFPLEVBQUUsQ0FBQyxJQUFBLGlCQUFPLEdBQUUsQ0FBQztJQUNwQixXQUFXLEVBQUUsd0JBQXdCO0lBQ3JDLEtBQUssRUFBRyxFQUFFO0lBQ1YsT0FBTyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUU7UUFDekIsTUFBTSxNQUFNLEdBQUcsTUFBTSxjQUFNLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQztZQUMzQyxLQUFLLEVBQUU7Z0JBQ0gsTUFBTSxFQUFFLEdBQUcsYUFBSCxHQUFHLHVCQUFILEdBQUcsQ0FBRSxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUU7YUFDakM7U0FDSixDQUFDLENBQUM7UUFFSCxJQUFJLFNBQVMsR0FBRyxDQUFDLENBQUM7UUFDbEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3ZDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFBO1lBQ3pCLFNBQVMsSUFBSSxJQUFBLHFCQUFXLEVBQUMsQ0FBQyxDQUFDLENBQUM7U0FDL0I7UUFDRCx5QkFBeUI7UUFFekIsSUFBSSxhQUFhLEdBQUcsU0FBUyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUM7UUFDakQsNkJBQTZCO1FBQzdCLElBQUksZUFBZSxHQUFHLElBQUEscUJBQVcsRUFBQyxNQUFNLENBQUMsS0FBSyxHQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xELE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLE9BQU8sRUFBRSxTQUFTLE1BQU0sQ0FBQyxLQUFLLGdCQUFnQixNQUFNLENBQUMsU0FBUyxnQkFBZ0IsZUFBZSxHQUFHLGFBQWEsSUFBSSxlQUFlLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFekosb0JBQW9CO1FBQ3BCLCtDQUErQztRQUMvQyx3QkFBd0I7UUFDeEIsa0NBQWtDO1FBQ2xDLDZCQUE2QjtRQUM3QixJQUFJO1FBQ0osd0NBQXdDO1FBQ3hDLDJDQUEyQztRQUMzQywwS0FBMEs7SUFDOUssQ0FBQztDQUNKLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNvbW1hbmRNb2R1bGUsIENvbW1hbmRUeXBlIH0gZnJvbSBcIkBzZXJuL2hhbmRsZXJcIjtcclxuaW1wb3J0IHsgcHVibGlzaCB9IGZyb20gXCIuLi8uLi9wbHVnaW5zL3B1Ymxpc2hcIjtcclxuaW1wb3J0IHsgR2V0R2xvYmFsWFAgfSBmcm9tIFwiLi4vLi4vbW9kdWxlc1wiO1xyXG5pbXBvcnQgZnMgZnJvbSBcImZzXCI7XHJcbmltcG9ydCB7IHByaXNtYSB9IGZyb20gXCIuLi8uLi9pbmRleFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29tbWFuZE1vZHVsZSh7XHJcbiAgICB0eXBlOiBDb21tYW5kVHlwZS5Cb3RoLFxyXG4gICAgcGx1Z2luczogW3B1Ymxpc2goKV0sXHJcbiAgICBkZXNjcmlwdGlvbjogXCJDaGVjayB5b3VyIGN1cnJlbnQgWFAuXCIsXHJcbiAgICBhbGlhcyA6IFtdLFxyXG4gICAgZXhlY3V0ZTogYXN5bmMgKGN0eCwgYXJncykgPT4geyAgICAgICAgXHJcbiAgICAgICAgY29uc3QgbGV2ZWxzID0gYXdhaXQgcHJpc21hLmxldmVsaW5nLmZpbmRGaXJzdCh7XHJcbiAgICAgICAgICAgIHdoZXJlOiB7XHJcbiAgICAgICAgICAgICAgICB1c2VySWQ6IGN0eD8ubWVzc2FnZS5hdXRob3IuaWQsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGxldCBMZXZlbFVwWHAgPSAwO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAyOyBpIDwgbGV2ZWxzLmxldmVsICsgMjsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGAke2l9IGhlbGxvYClcclxuICAgICAgICAgICAgTGV2ZWxVcFhwICs9IEdldEdsb2JhbFhQKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhMZXZlbFVwWHApXHJcblxyXG4gICAgICAgIGxldCBYcExlZnRMZXZlbFVwID0gTGV2ZWxVcFhwIC0gbGV2ZWxzLmN1cnJlbnRYcDtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhYcExlZnRMZXZlbFVwKVxyXG4gICAgICAgIGxldCBYcE5lZWRlZExldmVsVXAgPSBHZXRHbG9iYWxYUChsZXZlbHMubGV2ZWwrMSk7XHJcbiAgICAgICAgcmV0dXJuIGN0eC5yZXBseSh7IGNvbnRlbnQ6IGBMZXZlbCAke2xldmVscy5sZXZlbH1cXG5DdXJyZW50WFA6ICR7bGV2ZWxzLmN1cnJlbnRYcH1cXG5OZWVkZWQgWFA6ICR7WHBOZWVkZWRMZXZlbFVwIC0gWHBMZWZ0TGV2ZWxVcH0vJHtYcE5lZWRlZExldmVsVXB9YCB9KTtcclxuXHJcbiAgICAgICAgLy8gbGV0IG5lZWRlZFhwID0gMDtcclxuICAgICAgICAvLyBmb3IgKGxldCBpID0gMTsgaSA8IGxldmVscy5sZXZlbCArIDE7IGkrKykge1xyXG4gICAgICAgIC8vICAgICAvLyBjb25zb2xlLmxvZyhpKVxyXG4gICAgICAgIC8vICAgICBuZWVkZWRYcCArPSBHZXRHbG9iYWxYUChpKTtcclxuICAgICAgICAvLyAgICAgY29uc29sZS5sb2cobmVlZGVkWHApO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvLyBjdHgucmVwbHkoeyBjb250ZW50OiBgJHtuZWVkZWRYcH1gfSk7XHJcbiAgICAgICAgLy8gbGV0IG5ld1hwID0gbmVlZGVkWHAgLSBsZXZlbHMuY3VycmVudFhwO1xyXG4gICAgICAgIC8vIHJldHVybiBjdHgucmVwbHkoeyBjb250ZW50OiBgTGV2ZWwgJHtsZXZlbHMubGV2ZWx9XFxuQ3VycmVudFhQOiAke2xldmVscy5jdXJyZW50WHB9XFxuTmVlZGVkIFhQOiAke0dldEdsb2JhbFhQKGxldmVscy5sZXZlbCsxKS1uZXdYcH0vJHtHZXRHbG9iYWxYUChsZXZlbHMubGV2ZWwrMSl9YCB9KTtcclxuICAgIH0sXHJcbn0pOyJdfQ==
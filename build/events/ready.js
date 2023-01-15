"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handler_1 = require("@sern/handler");
exports.default = (0, handler_1.eventModule)({
    type: handler_1.EventType.Discord,
    plugins: [],
    name: "ready",
    async execute() {
        console.log("Client is online and ready");
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhZHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZXZlbnRzL3JlYWR5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMkNBQXVEO0FBRXZELGtCQUFlLElBQUEscUJBQVcsRUFBQztJQUN2QixJQUFJLEVBQUUsbUJBQVMsQ0FBQyxPQUFPO0lBQ3ZCLE9BQU8sRUFBRyxFQUFFO0lBQ1osSUFBSSxFQUFFLE9BQU87SUFDYixLQUFLLENBQUMsT0FBTztRQUNYLE9BQU8sQ0FBQyxHQUFHLENBQUMsNEJBQTRCLENBQUMsQ0FBQztJQUM1QyxDQUFDO0NBQ0YsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZXZlbnRNb2R1bGUsIEV2ZW50VHlwZSB9IGZyb20gXCJAc2Vybi9oYW5kbGVyXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBldmVudE1vZHVsZSh7XHJcbiAgICB0eXBlOiBFdmVudFR5cGUuRGlzY29yZCxcclxuICAgIHBsdWdpbnMgOiBbXSxcclxuICAgIG5hbWU6IFwicmVhZHlcIixcclxuICAgIGFzeW5jIGV4ZWN1dGUoKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiQ2xpZW50IGlzIG9ubGluZSBhbmQgcmVhZHlcIik7IFxyXG4gICAgfVxyXG4gIH0pOyJdfQ==
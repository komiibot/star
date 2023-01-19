"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserListener = void 0;
const framework_1 = require("@sapphire/framework");
// @ApplyOptions<Listener.Options>({ once: true })
class UserListener extends framework_1.Listener {
    run() {
        this.printInfo();
    }
    printInfo() {
        const { logger } = this.container;
        logger.info("TEST");
    }
}
exports.UserListener = UserListener;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhZHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZXZlbnRzL3JlYWR5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLG1EQUErRDtBQUcvRCxrREFBa0Q7QUFDbEQsTUFBYSxZQUFhLFNBQVEsb0JBQW1DO0lBQzVELEdBQUc7UUFDUixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDbkIsQ0FBQztJQUVPLFNBQVM7UUFDZixNQUFNLEVBQUUsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUNsQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQ3JCLENBQUM7Q0FDRjtBQVRELG9DQVNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRXZlbnRzLCBMaXN0ZW5lciwgTG9nZ2VyIH0gZnJvbSBcIkBzYXBwaGlyZS9mcmFtZXdvcmtcIjtcclxuaW1wb3J0IHsgQXBwbHlPcHRpb25zIH0gZnJvbSAnQHNhcHBoaXJlL2RlY29yYXRvcnMnO1xyXG5cclxuLy8gQEFwcGx5T3B0aW9uczxMaXN0ZW5lci5PcHRpb25zPih7IG9uY2U6IHRydWUgfSlcclxuZXhwb3J0IGNsYXNzIFVzZXJMaXN0ZW5lciBleHRlbmRzIExpc3RlbmVyPHR5cGVvZiBFdmVudHMuQ2xpZW50UmVhZHk+IHtcclxuICBwdWJsaWMgcnVuKCkge1xyXG4gICAgdGhpcy5wcmludEluZm8oKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgcHJpbnRJbmZvKCkge1xyXG4gICAgY29uc3QgeyBsb2dnZXIgfSA9IHRoaXMuY29udGFpbmVyO1xyXG4gICAgbG9nZ2VyLmluZm8oXCJURVNUXCIpXHJcbiAgfVxyXG59Il19
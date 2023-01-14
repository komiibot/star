import { eventModule, EventType } from "@sern/handler";
import { Events } from "discord.js";

export default eventModule({
    type: EventType.Discord,
    plugins : [],
    name: "ready",
    async execute() {
      console.log("Client is online and ready"); 
    }
  });
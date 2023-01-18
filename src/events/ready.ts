import { eventModule, EventType } from "@sern/handler";

export default eventModule({
    type: EventType.Discord,
    plugins : [],
    name: "ready",
    async execute() {
      console.log("Ready and logged in.")
    }
  });
import { ColorResolvable, Interaction, WebhookClient } from "discord.js";
import { redis } from "../index";
import dayjs from "dayjs";
import { log } from "./logger";
import { CustomEmbed } from "./embed";

// how many times user has set off the anticheat before prompted with a captcha
async function setFlagCount(id: string, count: number) {
  const key = `${id}:flags`;

  if (await redis.exists(key)) {
    await redis.incr(key);
  } else {
    await redis.set(key, "1");
  }
}

// how many economy commands the user has ran
async function getCommands(id: string) {
  const key = `${id}:commands_ran`;
  if (await redis.exists(key)) {
    return await redis.get(key);
  }
  return;
}

// get creation time when user started using economy commands
async function getDate(id: string) {
  const key = `${id}:commands_created`;
  if (await redis.exists(key)) {
    return await redis.get(key);
  }
  return;
}

async function logAndWebhook(name: string, discrim: string, id: string, description: string, color?: ColorResolvable) {
  const webhook = new WebhookClient({ id: "1071770552752164904", token: process.env.WEBHOOK_ANTICHEAT_TOKEN });

  await webhook.send({
    embeds: [
      new CustomEmbed()
        .setTitle("Anticheat Detection")
        .setFields([
          {
            name: "User",
            value: `${name}#${discrim} (${id})`,
          },
        ])
        .setDescription(description)
        .setTimestamp()
        .setColor(color ? color : "Yellow"),
    ],
  });

  await log("custom", "Anticheat.Log", `User ${name}#${discrim} (${id}) has set off the anticheat. ${description}`, { timestamp: true, color: "#3c55b0" });

  return webhook.destroy();
}

export async function run(interaction: Interaction) {
  const user = interaction.member.user.id;
  const key = `${user}:commands_ran`;
  const created = `${user}:commands_created`;

  // check if the redis key exists, increment value, if not set one.
  if (await redis.exists(key)) {
    console.log("Incrementing user", key);
    await redis.incr(key);
    await redis.set(created, Date.now());
  } else {
    console.log("Adding user", key);
    await redis.set(key, "1");
    await redis.set(created, Date.now());
  }

  // get creation time when user started using economy commands
  const timeSince = await getDate(user);
  const time = dayjs(Date.now()).diff(timeSince, "h");

  if ((await getCommands(user)) >= "200" && time >= 1) {
    await logAndWebhook(interaction.member.user.username, interaction.member.user.discriminator, user, `User has used ${await getCommands(user)} commands within an hour.`, "Red");
  }

  // if user account isn't a week old with the bot and they are trying to use trade, flag as suspicious.
  if (interaction.isCommand() && interaction.commandName === "rob") {
    await logAndWebhook(
      interaction.member.user.username,
      interaction.member.user.discriminator,
      user,
      `User tried using the **rob** command, but their account isn't even a week old.`
    );
  }
}

import { CaptchaGenerator } from "captcha-canvas";
import { redis } from "../index";
import voice from "soundoftext-js";
import { Client, ColorResolvable, CommandInteraction, GuildMember, Interaction, Message, WebhookClient } from "discord.js";
import { CustomEmbed } from "./embed";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { logger } from "../index";
import { percentageChance } from "./random";
import fs from "fs";
import request from "request";

dayjs.extend(localizedFormat);

const colors = ["deeppink", "red", "#9c46e3", "#a2e346"];
const generator = new CaptchaGenerator().setDecoy({ opacity: 0.6, total: 25 });
const timestamp = dayjs(Date.now()).format("LLLL");

let verified: boolean = false;
let failed: boolean = false;

let text: string;

export async function createCaptcha() {
  text = Math.random().toString(36).substring(2, 10);

  generator.setCaptcha({ colors, text });
  return { captcha: await generator.generate(), text };
}

// TODO: this currently doesn't work as intended, it uses the last generated mp3 file.
function getVoiceCaptcha() {
  text = Math.random().toString(36).substring(2, 8);
  return new Promise((resolve, reject) => {
    console.log(text);
    voice.sounds
      .create({ text: text.split("").join(" "), voice: "en-US" })
      .then((soundUrl) => {
        resolve([soundUrl]);
      })
      .catch((e) => {
        reject(e);
      });
  }).then((result) => {
    request
      .get(result[0])
      .on("error", function (e) {
        console.log(e);
      })
      .pipe(fs.createWriteStream("./captcha.mp3"));
  });
}

async function logAndWebhook(description: string, embedDescription: string, embedColor: ColorResolvable, result: Message | CommandInteraction) {
  await logger.custom(
    "Anticheat.Captcha",
    description,
    "#3c55b0"
  );

  const webhook = new WebhookClient({
    id: "1071770552752164904",
    token: process.env.WEBHOOK_ANTICHEAT_TOKEN as string,
  });

  await webhook.send({
    embeds: [
      new CustomEmbed()
        .setTitle("Anticheat Detection")
        .setDescription(embedDescription)
        .setFields([
          {
            name: "User",
            value: `${result.member.user.username}#${result.member.user.discriminator} (${result.member.user.id})`,
          },
        ])
        .setTimestamp()
        .setColor(embedColor),
    ],
  });

  return webhook.destroy();
}

export async function setLocked(member: string, locked: boolean) {
  const key = `${member}:locked`;
  if(locked === true) {
    await redis.set(key, "1")
  } else {
    await redis.set(key, "0")
  }
}

export async function sendCaptcha(result: Message) {
  const { captcha, text } = await createCaptcha();

  let files;

  const chance = percentageChance(["voice", "captcha"], [0, 100]);

  const collector = (collect: Message) => collect.author.id === result.author.id;

  const embed = new CustomEmbed()
    .setTitle("You have been suspected as a bot.")
    .setDescription(
      "Using any kind of external methods is against the bot guidelines, and will result in a blacklist if caught. Failing multiple captchas may lead to a temporary ban."
    )
    .setColor("Red");

  if (chance === "voice") {
    embed.setFooter({ text: "If inaudiable, click the retry button." });
    getVoiceCaptcha();
    files = [
      {
        attachment: "./captcha.mp3",
      },
    ];
  }

  if (chance === "captcha") {
    files = [
      {
        attachment: captcha,
        name: "captcha.png",
      },
    ];
    embed.setImage("attachment://captcha.png");
  }

  await result.channel.send({
    embeds: [embed],
    files,
  });

  await logAndWebhook(
    `Sending captcha to user ${result.member.user.username}#${result.member.user.discriminator} with ID ${result.member.user.id}. Awaiting a response.`,
    "Sending user captcha.",
    "Green",
    result
  );

  const response = await result.channel.awaitMessages({ filter: collector, max: 1, time: 40000, errors: ["time"] }).then((msg) => {
    console.log("Hello world")
    return msg.first();
  }).catch(async () => {
    failed = true;
    await logAndWebhook(
      `Sending captcha to user ${result.member.user.username}#${result.member.user.discriminator} with ID ${result.member.user.id}. Awaiting a response.`,
      "Captcha failed, time exceeded.",
      "Red",
      result
    );
  });

  if (failed || !response) return;

  if (response.content.toLowerCase() == text) {
    await setLocked(result.member.id, false);
    await logAndWebhook(
      `${result.member.user.username}#${result.member.user.discriminator} with ID ${result.member.user.id}. User passed captcha`,
      "Captcha passed.",
      "#3c55b0",
      result
    );
    return response.react("👍");
  } else {
    await logAndWebhook(
      `Sending captcha to user ${result.member.user.username}#${result.member.user.discriminator} with ID ${result.member.user.id}. User failed captcha.`,
      "Captcha failed.",
      "Red",
      result
    );
  }
}

import { WAMessage } from "@whiskeysockets/baileys";
import fs from "fs";
import { Sticker, StickerTypes } from "wa-sticker-formatter";
import { MsgInfoObj } from "../../interfaces/msgInfoObj";
import { Bot } from "../../interfaces/Bot";
import getRandomFileName from "../../functions/getRandomFileName";
import { prefix } from "../../utils/constants";

const gis = require("g-i-s");

const handler = async (bot: Bot, msg: WAMessage, msgInfoObj: MsgInfoObj) => {
  const { reply, args, from } = msgInfoObj;

  if (args.length === 0) {
    const message = `❌ Query is not given! \nSend ${prefix}ss query`;
    await reply(message);
    return;
  }

  const name = args.join(" ");

  gis(name, async (error: any, results: any[]) => {
    if (error) {
      console.log(error);
      await reply(error);
    } else {
      if (results.length === 0) {
        await reply("❌ No result found!");
        return;
      }
      for (let i = 0; i <= 1; ++i) {
        let index = 0;
        if (results.length > 20) {
          index = Math.floor(Math.random() * 20);
        } else if (results.length > 10) {
          index = Math.floor(Math.random() * 10);
        }
        const img = results[index].url;
        console.log(img);

        const packName = "BOT 🤖";
        const authorName = "pvxcommunity.com";
        const stickerMake = new Sticker(img, {
          pack: packName,
          author: authorName,
          type: StickerTypes.FULL,
          quality: 100,
        });

        const stickerFileName = getRandomFileName(".webp");

        // eslint-disable-next-line no-await-in-loop
        await stickerMake.toFile(stickerFileName);
        // eslint-disable-next-line no-await-in-loop
        await bot.sendMessage(
          from,
          {
            sticker: fs.readFileSync(stickerFileName),
          },
          { quoted: msg, mediaUploadTimeoutMs: 1000 * 60 }
        );
        fs.unlinkSync(stickerFileName);
      }
    }
  });
};

const stickersearch = () => {
  const cmd = ["stickersearch", "ss"];

  return { cmd, handler };
};

export default stickersearch;

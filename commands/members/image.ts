import {
  WAMessage,
  downloadContentFromMessage,
  toBuffer,
} from "@adiwajshing/baileys";
import { MsgInfoObj } from "../../interface/msgInfoObj";

const fs = require("fs");
const { writeFile } = require("fs/promises");

export const command = () => {
  let cmd = ["image", "img", "toimg"];

  return { cmd, handler };
};

const getRandom = (ext: string) => {
  return `${Math.floor(Math.random() * 10000)}${ext}`;
};

const handler = async (bot: any, msg: WAMessage, msgInfoObj: MsgInfoObj) => {
  let { isMedia, isTaggedSticker, reply, from } = msgInfoObj;

  if (
    (isMedia && !msg.message?.stickerMessage?.isAnimated) ||
    isTaggedSticker
  ) {
    let downloadFilePath;
    if (msg.message?.stickerMessage) {
      downloadFilePath = msg.message.stickerMessage;
    } else {
      downloadFilePath =
        msg.message?.extendedTextMessage?.contextInfo?.quotedMessage
          ?.stickerMessage;
    }

    if (!downloadFilePath) return;

    const stream = await downloadContentFromMessage(downloadFilePath, "image");
    const buffer = await toBuffer(stream);

    const media = getRandom(".jpeg");
    await writeFile(media, buffer);

    await bot.sendMessage(
      from,
      {
        image: fs.readFileSync(media),
      },
      {
        mimetype: "image/png",
        quoted: msg,
        mediaUploadTimeoutMs: 1000 * 30,
      }
    );
    try {
      fs.unlinkSync(media);
    } catch (error) {
      console.log("Problem with deleting media");
      // reply(error.toString());
    }
  } else {
    await reply(
      "❌ There is some problem!\nTag a non-animated sticker with command to convert to Image!"
    );
  }
};

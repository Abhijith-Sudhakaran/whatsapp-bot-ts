import { WAMessage } from "@adiwajshing/baileys";
import { MsgInfoObj } from "../../interface/msgInfoObj";

const {
  downloadContentFromMessage,
  toBuffer,
} = require("@adiwajshing/baileys");

const { Exif } = require("wa-sticker-formatter");

export const command = () => {
  let cmd = ["steal"];

  return { cmd, handler };
};

const handler = async (bot: any, msg: WAMessage, msgInfoObj: MsgInfoObj) => {
  let { isTaggedSticker, reply, args, from } = msgInfoObj;

  let packName = "BOT 🤖";
  let authorName = "pvxcommunity.com";

  if (isTaggedSticker) {
    if (args.length) {
      packName = args.join(" ");
    }

    let downloadFilePath =
      msg.message?.extendedTextMessage?.contextInfo?.quotedMessage
        ?.stickerMessage;
    const stream = await downloadContentFromMessage(
      downloadFilePath,
      "sticker"
    );
    const buffer = await toBuffer(stream);

    const webpWithExif = await new Exif({
      pack: packName,
      author: authorName,
    }).add(buffer);

    await bot.sendMessage(
      from,
      { sticker: webpWithExif },
      {
        mimetype: "sticker",
        mediaUploadTimeoutMs: 1000 * 30,
      }
    );
    return;
  }
  await reply("❌ Tag a sticker!");
};

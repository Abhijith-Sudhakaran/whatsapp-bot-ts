const {
  MessageType,
  Mimetype,
  downloadContentFromMessage,
} = require("@adiwajshing/baileys");

const fs = require("fs");
const { Sticker, StickerTypes } = require("wa-sticker-formatter");

const getRandom = (ext) => {
  return `${Math.floor(Math.random() * 10000)}${ext}`;
};

module.exports.command = () => {
  let cmd = ["steal"];

  return { cmd, handler };
};

const handler = async (bot, msg, from, args, msgInfoObj) => {
  let { isTaggedSticker, reply } = msgInfoObj;

  let packName = "BOT 🤖";
  let authorName = "pvxcommunity.com";
  if (isTaggedSticker) {
    let downloadFilePath =
      msg.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage;
    const stream = await downloadContentFromMessage(
      downloadFilePath,
      "sticker"
    );
    let buffer = Buffer.from([]);
    for await (const chunk of stream) {
      buffer = Buffer.concat([buffer, chunk]);
    }

    const sticker = new Sticker(buffer, {
      pack: packName,
      author: authorName,
      type: StickerTypes.DEFAULT,
      quality: 100,
    });
    await bot.sendMessage(from, await sticker.toMessage(), { quoted: msg });
    return;
  }
  await reply("❌ Tag a sticker!");
};

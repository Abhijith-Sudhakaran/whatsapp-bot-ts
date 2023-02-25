const { UltimateTextToImage } = require("ultimate-text-to-image");
const { Sticker, StickerTypes } = require("wa-sticker-formatter");
const fs = require("fs");

module.exports.command = () => {
  return { cmd: ["text"], handler: handler };
};

const getRandom = (ext) => {
  return `${Math.floor(Math.random() * 10000)}${ext}`;
};

const handler = async (bot, msg, from, msgInfoObj) => {
  let { reply } = msgInfoObj;

  let message = "";
  if (
    msg.message.extendedTextMessage &&
    msg.message.extendedTextMessage.contextInfo &&
    msg.message.extendedTextMessage.contextInfo.quotedMessage &&
    msg.message.extendedTextMessage.contextInfo.quotedMessage.conversation
  ) {
    //quoted message
    message =
      msg.message.extendedTextMessage.contextInfo.quotedMessage.conversation;
  } else {
    //not a quoted message
    if (
      msg.message.extendedTextMessage &&
      msg.message.extendedTextMessage.text
    ) {
      // message has url, member mentioned
      message = msg.message.extendedTextMessage.text.slice(5);
    } else {
      // simple text message
      message = msg.message.conversation.slice(5);
    }
  }

  if (!message) {
    reply("❌ Empty message!");
    return;
  }

  const textToImage = new UltimateTextToImage(message, {
    width: 500,
    height: 500,
    fontFamily: "Arial",
    fontColor: "#00FF00",
    fontSize: 56,
    minFontSize: 10,
    lineHeight: 40,
    autoWrapLineHeightMultiplier: 1.2,
    margin: 20,
    marginBottom: 40,
    align: "center",
    valign: "middle",
  }).render();

  const buffer = textToImage.toBuffer(); // png by default

  let packName = "BOT 🤖";
  let authorName = "pvxcommunity.com";
  stickerMake = new Sticker(buffer, {
    pack: packName,
    author: authorName,
  });

  const stickerFileName = getRandom(".webp");
  await stickerMake.toFile(stickerFileName);
  await bot.sendMessage(
    from,
    {
      sticker: fs.readFileSync(stickerFileName),
    },
    {
      quoted: msg,
      mimetype: "sticker",
      mediaUploadTimeoutMs: 1000 * 30,
    }
  );
  try {
    fs.unlinkSync(stickerFileName);
  } catch {
    console.log("error in deleting file.");
  }
};

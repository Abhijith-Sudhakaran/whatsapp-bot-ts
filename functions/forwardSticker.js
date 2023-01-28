const {
  downloadContentFromMessage,
  toBuffer,
} = require("@adiwajshing/baileys");
const { Sticker, StickerTypes } = require("wa-sticker-formatter");
const { LoggerTg } = require("./loggerBot");

const pvxstickeronly1 = "919557666582-1628610549@g.us";
const pvxstickeronly2 = "919557666582-1586018947@g.us";
let countSent = 1;
let countIn = 0,
  countErr = 0;

module.exports.forwardSticker = async (sendMessage, downloadFilePath) => {
  try {
    countIn += 1;
    let stream = await downloadContentFromMessage(downloadFilePath, "sticker");

    let quality = 100;
    if (downloadFilePath.fileLength > 1024 * 1024) {
      //if size above 1mb
      quality = 75;
    }

    let buffer = await toBuffer(stream);
    stream.destroy();

    let sticker = new Sticker(buffer, {
      pack: "BOT 🤖",
      author: "pvxcommunity.com",
      quality: quality,
    });

    let stickerMesssage = await sticker.toMessage();

    // 1000*60*60*24 = 86400ms = 1 day
    await sendMessage(pvxstickeronly1, stickerMesssage, {
      mimetype: "sticker",
      ephemeralExpiration: 86400,
      mediaUploadTimeoutMs: 1000 * 30,
    });
    await sendMessage(pvxstickeronly2, stickerMesssage, {
      mimetype: "sticker",
      ephemeralExpiration: 86400,
      mediaUploadTimeoutMs: 1000 * 30,
    });

    countSent += 1;
  } catch (err) {
    console.log(err);
    await LoggerTg(`ERROR: [FORWARD-STICKER]\n${err.toString()}`);
    countErr += 1;
  }

  console.log(`${countSent} sticker sent! In:${countIn}, Err:${countErr}`);
};

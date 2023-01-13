const { MessageType, Mimetype } = require("@adiwajshing/baileys");

const axios = require("axios");

const getQuote = async () => {
  try {
    let url = "https://zenquotes.io/api/random";
    let { data } = await axios.get(url);
    let quote = "💬 " + data[0].q;
    // console.log(quote);
    return quote;
  } catch (err) {
    console.log(err);
    // return "❌ SOME ERROR CAME!";
    return err.toString();
  }
};

module.exports.command = () => {
  return { cmd: ["quote"], handler: handler };
};

const handler = async (bot, msg, from, args, msgInfoObj) => {
  let { prefix } = msgInfoObj;

  let text = await getQuote();
  await bot.sendMessage(from, { text }, { quoted: msg });
};

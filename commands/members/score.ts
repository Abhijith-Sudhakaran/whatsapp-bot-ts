import { WAMessage } from "@adiwajshing/baileys";
import { MsgInfoObj } from "../../interface/msgInfoObj";
import { Bot } from "../../interface/Bot";

const { getCricketScore } = require("../../functions/cricket");

export const command = () => {
  let cmd = ["score"];

  return { cmd, handler };
};

const handler = async (bot: Bot, msg: WAMessage, msgInfoObj: MsgInfoObj) => {
  let { groupDesc, reply, from } = msgInfoObj;
  const descErrorMessage = `❌ ERROR
- Group description is empty.
- Put match ID in starting of group description. 
- Get match ID from cricbuzz today match url.
- example: https://www.cricbuzz.com/live-cricket-scores/37572/mi-vs-kkr-34th-match-indian-premier-league-2021 
- so match ID is 37572 !
# If you've put correct match ID in description starting and still facing this error then contact developer by !dev`;

  if (!groupDesc) {
    await reply(descErrorMessage);
    return;
  }

  let matchId = groupDesc.slice(0, 5);
  if (isNaN(Number(matchId))) {
    await reply(descErrorMessage);
    return;
  }

  let response = await getCricketScore(matchId);

  //response.info have "MO" only when command is startc
  //   if (response.info === "ER") {
  //     await reply(`❌ ERROR
  // - Group description starting is "${matchId}"
  // - Put match ID in starting of group description.
  // - Get match ID from cricbuzz today match url.
  // - example: https://www.cricbuzz.com/live-cricket-scores/37572/mi-vs-kkr-34th-match-indian-premier-league-2021
  // - so match ID is 37572 !
  // # If you've put correct match ID in description starting and still facing this error then contact developer by !dev`);

  //     return;
  //   }
  await bot.sendMessage(from, { text: response.message }, { quoted: msg });
};

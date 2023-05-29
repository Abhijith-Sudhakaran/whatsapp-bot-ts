import { WAMessage } from "@adiwajshing/baileys";
import { MsgInfoObj } from "../../interface/msgInfoObj";
import { Bot } from "../../interface/Bot";
import { getVotingData, setVotingData } from "../../db/VotingDB";

export const startvote = () => {
  const cmd = ["startvote"];

  return { cmd, handler };
};

const handler = async (bot: Bot, msg: WAMessage, msgInfoObj: MsgInfoObj) => {
  const { prefix, reply, sender, args, from } = msgInfoObj;
  if (args.length === 0) {
    await reply(
      `❌ Give some values seperated with # to vote on like ${prefix}startvote #title #name1 #name2 #name3`
    );
    return;
  }
  const res = await getVotingData(from);
  const votingResult = res[0];

  if (votingResult.is_started) {
    await reply(
      `❌ Voting already going on, Stop by ${prefix}stopvote command`
    );
    return;
  }
  const body = msg.message?.conversation;
  if (!body) {
    await reply(`❌ Body is empty!`);
    return;
  }

  // let voteChoices = body.trim().replace(/ +/, ",").split(/,/).slice(1);
  const voteList = body.trim().split("#");
  const voteTitle = voteList[1].trim();
  const voteChoices = voteList.slice(2);

  if (voteChoices.length < 2) {
    await reply("❌ Give more than 1 voting choices!");
    return;
  }

  const voteListCount = new Array(voteChoices.length).fill(0); //[0,0,0]
  const voteListMember = [];
  for (let i = 0; i < voteChoices.length; ++i) voteListMember.push([]);

  await setVotingData(
    from,
    true,
    sender,
    voteTitle,
    voteChoices,
    voteListCount,
    voteListMember,
    []
  );

  //CHECK THIS ONCE, AND USE SAME VARIABLE AS USED IN FUNCTION SIGNATURE
  const res2 = await getVotingData(from);
  const votingResult2 = res2[0];

  let voteMsg = `*Voting started!*\nsend "${prefix}vote number" to vote\n\n*🗣️ ${voteTitle}*`;

  votingResult2.choices.forEach((name: string, index: number) => {
    voteMsg += `\n${index + 1} for [${name.trim()}]`;
  });

  voteMsg += `\n\n_send ${prefix}checkvote or ${prefix}cv to see current status and ${prefix}stopvote to stop voting and see the result._`;
  await reply(voteMsg);
};

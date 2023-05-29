import { WAMessage } from "@adiwajshing/baileys";
import { MsgInfoObj } from "../../interface/msgInfoObj";
import { Bot } from "../../interface/Bot";

export const helpo = () => {
  const cmd = ["helpo"];

  return { cmd, handler };
};

const handler = async (bot: Bot, msg: WAMessage, msgInfoObj: MsgInfoObj) => {
  const { prefix, reply } = msgInfoObj;
  const more = String.fromCharCode(8206);
  const readMore = more.repeat(4001);

  const text = `*─「 🔥 <{PVX}> BOT 🔥 」─*
  ${readMore}
_Restricted command for owner only!_
  
📛 *${prefix}test query* ✔
  - _Execute code with whatsapp directly!_

📛 *${prefix}broadcast* ✔
  - _Broadcast a message to all groups!_  
Alias: *${prefix}bc*

📛 *${prefix}gname* ✔
  - _Save all group name in DB!_  
  
📛 *${prefix}setlink* ✔
  - _Save group link in DB!_   

📛 *${prefix}setlink number* ✔
  - _Enable/Disable group link in website!_ 

📛 *${prefix}getlink* ✔
  - Get all group links from DB!_  

📛 *${prefix}groupbackup* ❌
  - _Take backup of group in DB!_  

📛 *${prefix}countstats* ❌
  - _Get stats of number of command used!_  

📛 *${prefix}tg* ✔
  - _Make TG to WA stickers!_
  @tgstowebpbot <- animated 128px.zip
  @Stickerdownloadbot <- non-animated webp.zip

📛 *${prefix}stg* ❌
  - _Stop TG to WA stickers!_
  
📛 *${prefix}startvotepvx* ❌
  - _Start vote for all pvx groups!_
  
📛 *${prefix}stopvotepvx* ❌
  - _Stop vote for all pvx groups!_

📛 *${prefix}donationadd* ✔
  - _add by giving after command #name #amount!_
Alias: *${prefix}da*

send ${prefix}source for sourcecode of BOT
✔️ more cool commands coming...`;

  await reply(text);
};

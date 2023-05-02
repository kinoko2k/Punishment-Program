const discord = require("discord.js");
const client = new discord.Client();

client.login("TOKEN");

client.on("ready", async () => {
  console.log("GBAN.jsが起動しました。");
  client.user.setActivity(require("discord.js").version + client.guilds.size)
});

client.on("messageCreate", async message => {
  if (message.author.bot) return;
  if (!message.content.startsWith("!")) return;
  if (message.author.id === "実行できる人のID") return message.channel.send("BOT管理者の使用権限がありません。");

  const args = message.content.slice(2).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (command === "gban") {
    const gbanid = args[0];
    const reason = message.content.replace(`!gban ${gbanid}`, "");

    const m = await message.channel.send("GBANを執行しています...Loading Now...");

    client.guilds.cache.forEach(async g => {
      try {
        if (await g.me.permissions.has("BAN_MEMBERS")) {
          await g.bans.create(gbanid, {reason: `BOTによりGBANされました。理由: ${reason}`});
        } else {
          console.log(g.name + "でのGBANに失敗しました。");
        }
      } catch(err) {
        client.channels.cache.get("ErrorSendChannelID").send("GBAN執行エラー: " + g.name + "(" + g.id + ")" + "でのGBANの執行に失敗しました。\n" + err);
      }
    });

    client.channels.cache.filter(ch => ch.name === "OO-gbans").forEach(ch => {
      try {
        ch.send({
          embeds: [
            {
              title: "BOT | GBAN",
              description: "BOTが危険なユーザーをGBANしました。",
              fields: [
                {
                  name: "ユーザー名",
                  value: `<@!${gbanid}>`
                },
                {
                  name: "ユーザーID",
                  value: gbanid
                },
                {
                  name: "理由",
                  value: reason
                }
              ],
              color: 0xdc143c
            }
          ]
        });
      } catch(err) {
        client.channels.cache.get("ErrorSendChannelID").send("GBANお知らせ送信エラー: " + ch.guild.name + "(" + ch.guild.id + ")" + "でのGBANのお知らせの送信に失敗しました。\n" + err);
      }
    });

    m.edit("GBAN執行が完了しました。")
  }
  
  if (command === "ungban") {
    const gbanid = args[0];
    const reason = args.slice(1).join(" ");
    const m = await message.channel.send("GBAN解除しています...");

    client.guilds.cache.forEach(g => {
      try {
        if (g.me.permissions.has("BAN_MEMBERS")) { // BAN権限必要
          g.members.unban(gbanid, `BOTによりGBAN解除されました。理由: ${reason}`);
        } else {
          console.log(g.name + "でのGBANに失敗しました。");
        }
      } catch(err) {
        client.channels.cache.get("ErrorSendChannelID").send("GBAN解除エラー: " + g.name + "(" + g.id + ")" + "でのGBAN解除に失敗しました。\n" + err);
      }
    });

    client.channels.cache.filter(ch => ch.name == "OO-gbans").forEach(ch => {
      try {
        ch.send({
          embeds: [
            {
              title: "BOT | GBAN解除",
              description: "BOTがユーザーのGBANを解除しました。",
              fields: [
                {
                  name: "ユーザー名",
                  value: `<@!${gbanid}>`
                },
                {
                  name: "ユーザーID",
                  value: gbanid
                },
                {
                  name: "理由",
                  value: reason
                }
              ],
              color: 0x6495ed
            }
          ]
        });
      } catch(err) {
        client.channels.cache.get("ErrorSendChannelID").send("GBAN解除お知らせ送信エラー: " + ch.guild.name + "(" + ch.guild.id + ")" + "でのGBAN解除のお知らせの送信に失敗しました。\n" + err);
      }
    });

    m.edit("GBAN解除が完了しました。");
  }
});
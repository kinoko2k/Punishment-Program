const { Client } = require("discord.js");
const Keyv = require("keyv");

const client = new Client();
const gmute = new Keyv("sqlite://gmute.sqlite", { table: "gmute" });

client.on("ready", async () => {
  console.log("GMUTE.jsが起動しました。");
  client.user.setActivity(`Discord.js v${require("discord.js").version} ${client.guilds.cache.size}`);
});

client.on("messageCreate", async message => {
    if (message.author.bot) return;
    const args = message.content.slice(2).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    var admin = "";
    if (message.author.id === "管理者のユーザーID") {
      admin = ":crown:";
    }
    if (message.channel.name == "global-chat") {
      const gmute = (await gmute.get(message.author.id)) || { score: 0, reason: 0 };
      if (gmute.score != 0) return;
      message.delete();
      const ch_name = "global-chat";
      client.channels.cache.forEach(ch => {
        if (ch.name === ch_name) {
          ch.send({
            embeds: [
              {
                title: `${admin}${message.author.tag}(${message.author.id})`,
                description: message.content,
                color: 0x800080,
                timestamp: new Date(),
                footer: {
                  text: message.guild.name + "(" + message.guild.id + ")",
                },
                thumbnail: {
                  url: `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png`,
                },
              },
            ],
          });
        }
      });
    }
    if (command === "gmute") {
        if (message.author.id === "管理者のID") {
          return message.channel.send("あなたはBOT管理者ではありません");
        }
        const [a, r] = args;
        const b = await message.channel.send("Gmuteの準備をしています...");
        const gmute = (await gmutes.get(a)) || { score: 0, reason: 0 };
        const muteuser = (await client.users.fetch(a)).tag;
        gmutes.set(a, { score: 1, reason: r });
        if (gmute.score == 1) {
          b.edit(`${muteuser}(${message.author.id})をGmuteしました。\n追加理由: ${r}`);
        }
      }
  
      if (command === "ungmute") {
        if (message.author.id === "管理者のID") {
          return message.channel.send("あなたはBOT管理者ではありません");
        }
        const [a, r] = args;
        const b = await message.channel.send("Gmute解除の準備をしています...");
        const gmute = (await gmutes.get(a)) || { score: 0, reason: 0 };
        const muteuser = (await client.users.fetch(a)).tag;
        gmutes.set(a, { score: 0, reason: r });
        if (gmute.score == 1) {
          b.edit(`${muteuser}(${message.author.id})のGmuteを解除しました。\n解除理由: ${r}`);
        }
      }
    }
);

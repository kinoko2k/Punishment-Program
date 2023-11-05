const { Client, GatewayIntentBits, Intents, EmbedBuilder } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.DirectMessages,
  ],
});

client.on('ready', () => {
  console.log(`${client.user.tag} でログインしました！`);
});

const channelId = 'CHANNEL_ID'; // ここにBan&KickのログチャンネルIDを入力
let banCount = 0; // ban回数は0に定義する
let kickCount = 0; // kick回数は0に定義する

client.on('messageCreate', async (message) => {
  if (!message.guild) return;
  if (message.content.startsWith('!ban')) {
    const member = message.guild.members.cache.get(message.author.id);

    if (!member.permissions.has('BAN_MEMBERS')) {
      return message.reply('BAN権限がありません！');
    }

    const args = message.content.slice('!ban'.length).trim().split(/ +/);
    const userId = args[0];

    if (!userId) {
      return message.reply('ユーザIDを指定してください！');
    }

    const user = await client.users.fetch(userId);
    
    if (user) {
      banCount++;
      const deleteMessageDays = 7;
      const reason = args.slice(1).join(' ') || 'None';

      const banEmbed = new EmbedBuilder()
        .setColor('#ff0000')
        .setTitle(`ユーザ ${user.tag} がBanされました`)
        .setAuthor({
          name: message.author.tag,
          iconURL: message.author.displayAvatarURL({ dynamic: true }),
        })
        .setThumbnail(user.displayAvatarURL({ dynamic: true }))
        .addFields(
          { name: 'ユーザID', value: user.id },
          { name: 'Ban番号', value: banCount.toString() },
          { name: '理由', value: args.slice(1).join(' ') || 'None' },
          { name: '時間', value: new Date().toLocaleString() }
        );

      const channel = client.channels.cache.get(channelIdd);
      if (channel) {
        channel.send({ embeds: [banEmbed] });
        message.reply(`ユーザ ${user.tag} がBanされました。`);
      } else {
        message.reply('指定されたチャンネルが見つかりません！');
      }
      await message.guild.members.ban(user, { reason, days: deleteMessageDays });
    } else {
      message.reply('ユーザを見つけることができませんでした。');
    }
  }
});

client.on('messageCreate', async (message) => {
  if (!message.guild) return;
  if (message.content.startsWith('!kick')) {
    const member = message.guild.members.cache.get(message.author.id);

    if (!member.permissions.has('KICK_MEMBERS')) {
      return message.reply('kick権限がありません！');
    }

    const args = message.content.slice('!kick'.length).trim().split(/ +/);
    const userId = args[0];

    if (!userId) {
      return message.reply('ユーザIDを指定してください！');
    }

    const user = await client.users.fetch(userId);

    if (user) {
      kickCount++;
      const deleteMessageDays = 7;
      const reason = args.slice(1).join(' ') || 'None';

      const kickEmbed = new EmbedBuilder()
        .setColor('#115600')
        .setTitle(`ユーザ ${user.tag} がKickされました`)
        .setAuthor({
          name: message.author.tag,
          iconURL: message.author.displayAvatarURL({ dynamic: true }),
        })
        .setThumbnail(user.displayAvatarURL({ dynamic: true }))
        .addFields(
          { name: 'ユーザID', value: user.id },
          { name: 'Kick番号', value: kickCount.toString() },
          { name: '理由', value: args.slice(1).join(' ') || 'None' },
          { name: '時間', value: new Date().toLocaleString() }
        );

      const channel = client.channels.cache.get(channelIdd);
      if (channel) {
        channel.send({ embeds: [kickEmbed] });
        message.reply(`ユーザ ${user.tag} がkickされました。`);
      } else {
        message.reply('指定されたチャンネルが見つかりません！');
      }
      await message.guild.members.kick(user, { reason, days: deleteMessageDays });
    } else {
      message.reply('ユーザを見つけることができませんでした。');
    }
  }
});

// TOKENを読み込む
client.login("TOKEN");

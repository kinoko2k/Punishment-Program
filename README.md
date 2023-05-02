# Punishment-Program
GlobalBANやGlobalMUTEなどのプログラムです。

Discord.js@v12

[`GlobalChatGMute.js`](https://github.com/kinoko2k/Punishment-Program/commit/fb395c658997c7310c8ce86d2d476b5263cc5622)

[`GlobalBAN.js`](https://github.com/kinoko2k/Punishment-Program/commit/c2246ec11531ada1ba81dedd11e5e979b0adc7d5)

Discord.js@v13

[`GlobalChatGMute.js`](https://github.com/kinoko2k/Punishment-Program/commit/5ffee9bb75939aa835860dd990021a503e7febf5)

[`GlobalBAN.js`](https://github.com/kinoko2k/Punishment-Program/commit/5ffee9bb75939aa835860dd990021a503e7febf5)

## Package
**Discord.js@v13**
```js
npm install discord.js@13
```

## Code
**GlobalBan.js**
```js
if (message.author.id === "実行できる人のID") return message.channel.send("BOT管理者の使用権限がありません。");
```
のIDに管理者IDを設定することで実行できるようになります。

**GlobalMute.js**
```js
var admin = "";
if (message.author.id === "管理者のID") {
admin = ":crown:";
}
```
管理者IDを設定することで、GlobalChat内の表示が👑になります。

var admin = ""にはユーザーのリアクションを入れれば管理者以外はその表示になります。

```js
if(message.author.id === "管理者のID") return message.channel.send("あなたはBOT管理者ではありません");
```
のIDに管理者IDを設定することで実行できるようになります。

作成者の名前いらない気がするけどLICENSEだけ守って。

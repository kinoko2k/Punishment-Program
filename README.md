# Punishment-Program
GlobalBANやGlobalMUTEなどのプログラムです。

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

使う場合は、BOTの詳細などに製作者の名前を提示してください。

~~~

製作者のTwitter:[@kinoko1216](https://twitter.com/kinoko1216)

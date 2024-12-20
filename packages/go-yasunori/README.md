# go-yasunori

## Syntax

```
yasunori
yasunori -list
yasunori id [id...]
```

### Non arguments

Show ramdom

- API: `https://api.yasunori.dev/awesome/random`

### `-list`

Show yasunori entries.

- API: `https://api.yasunori.dev/awesome`

### id

Show specified entry of ID number.

- API: `https://api.yasunori.dev/awesome/{id}`

## Run

```bash
$ go run . 19
    id: 19
    date: 2024-09-26
    at: vim-jp #times-yasunori
    senpan: takeokunn
    meta: Inspired by [ルイズコピペ](https://dic.pixiv.net/a/%E3%83%AB%E3%82%A4%E3%82%BA%E3%82%B3%E3%83%94%E3%83%9A)


yasunori！yasunori！yasunori！yasunoriぅぅうううわぁああああああああああああああああああああああん！！！
あぁああああ…ああ…あっあっー！あぁああああああ！！！yasunoriyasunoriyasunoriぅううぁわぁああああ！！！
あぁクンカクンカ！クンカクンカ！スーハースーハー！スーハースーハー！いい匂いだなぁ…くんくん
んはぁっ！yasunoriたんの黒髪ショートの髪をクンカクンカしたいお！クンカクンカ！あぁあ！！
間違えた！モフモフしたいお！モフモフ！モフモフ！髪髪モフモフ！カリカリモフモフ…きゅんきゅんきゅい！！
vim-jpのyasunoriたんかわいかったよぅ！！あぁぁああ…あああ…あっあぁああああ！！ふぁぁあああんんっ！！
OS削除されて良かったねyasunoriたん！あぁあああああ！かわいい！yasunoriたん！かわいい！あっああぁああ！
awesome-yasunoriも出来て嬉し…いやぁああああああ！！！にゃああああああああん！！ぎゃああああああああ！！
ぐあああああああああああ！！！vim-jpなんて現実じゃない！！！！あ…twitterもよく考えたら…
y a s u n o r i ち ゃ ん は 現実 じ ゃ な い？にゃあああああああああああああん！！うぁああああああああああ！！
そんなぁああああああ！！いやぁぁぁあああああああああ！！はぁああああああん！！vim-jpぁああああ！！
この！ちきしょー！やめてやる！！現実なんかやめ…て…え！？見…てる？vim-jpのyasunoriちゃんが僕を見てる？
vim-jpのyasunoriちゃんが僕を見てるぞ！yasunoriちゃんが僕を見てるぞ！vim-jpのyasunoriちゃんが僕を見てるぞ！！
vim-jpのyasunoriちゃんが僕に話しかけてるぞ！！！よかった…世の中まだまだ捨てたモンじゃないんだねっ！
いやっほぉおおおおおおお！！！僕にはyasunoriちゃんがいる！！やったよnatsukium！！ひとりでできるもん！！！
あ、vim-jpのyasunoriちゃああああああああああああああん！！いやぁあああああああああああああああ！！！！
あっあんああっああんあアリスエ様ぁあ！！k、kuuー！！こまもかぁああああああ！！！tomoyaｧぁあああ！！
ううっうぅうう！！俺の想いよyasunoriへ届け！！vim-jpのyasunoriへ届け！
```

## Build

```bash
$ go build
$ ./go-yasunori 1
    id: 1
    date: 2024-06-25
    at: vim-jp radioお便り
    senpan: takeokunn
    meta:

tomoyaさん、ありすえさんこんにちは。
はじめまして、yasunoriの母です。

yasunoriがソフトウェアエンジニアを志してから様子がおかしくなってしまいました。
家ですれ違う時「Vim....Vim....」という独り言をずっと唱えていたり、部屋からは「設定させていただきありがとうございます!!」という大声が聞こえてきたり、
「会合があるから東京に行ってくる、帰りは遅くなる」と言い残して出て行き、帰ってくると満面の笑みで「Vimはいいぞ」と一言言って自室に篭るようになりました。

tomoyaさんありすえさんもVimコミュニティの人達だと伺いましたが、息子の身に一体何が起きてしまったのか教えていただけると幸いです。
```

### Performance

1. `go run`
```bash
$ go run . 1
real	0m0.760s
user	0m0.220s
sys 	0m0.360s
```

2. Compiled binary
```bash
$ ./go-yasunori 1
real	0m0.200s
user	0m0.000s
sys 	0m0.000s
```

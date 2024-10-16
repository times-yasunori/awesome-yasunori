import { http, HttpResponse } from "msw";

export const awesomeIdHandlers = [
  http.get("https://api.yasunori.dev/awesome/1", () => {
    const response = {
      at: "vim-jp radioお便り",
      content:
        "tomoyaさん、ありすえさんこんにちは。\nはじめまして、yasunoriの母です。\n\nyasunoriがソフトウェアエンジニアを志してから様子がおかしくなってしまいました。\n家ですれ違う時「Vim....Vim....」という独り言をずっと唱えていたり、部屋からは「設定させていただきありがとうございます!!」という大声が聞こえてきたり、\n「会合があるから東京に行ってくる、帰りは遅くなる」と言い残して出て行き、帰ってくると満面の笑みで「Vimはいいぞ」と一言言って自室に篭るようになりました。\n\ntomoyaさんありすえさんもVimコミュニティの人達だと伺いましたが、息子の身に一体何が起きてしまったのか教えていただけると幸いです。\n",
      date: "2024-06-25",
      id: 1,
      meta: "",
      senpan: "takeokunn",
      title: "yasunoriの母",
    };
    return HttpResponse.json(response);
  }),
  http.get("https://api.yasunori.dev/awesome/0", () => {
    return HttpResponse.json(null, { status: 404 });
  }),
];

export const awesomeHandler = http.get(
  "https://api.yasunori.dev/awesome",
  () => {
    const response = [
      {
        at: "vim-jp #times-yasunori",
        content:
          "lang-yasunori作るとしたら brain-yasu**ri 作りたい\n\n言語仕様\n1. `y` ポインタをインクリメントする。ポインタをptrとすると、C言語の「ptr++;」に相当する。\n2. `a` ポインタをデクリメントする。C言語の「ptr--;」に相当。\n3. `s` ポインタが指す値をインクリメントする。C言語の「(*ptr)++;」に相当。\n4. `u` ポインタが指す値をデクリメントする。C言語の「(*ptr)--;」に相当。\n5. `n` ポインタが指す値を出力に書き出す。C言語の「putchar(*ptr);」に相当。\n6. `o` 入力から1バイト読み込んで、ポインタが指す先に代入する。C言語の「*ptr=getchar();」に相当。\n7. `r` ポインタが指す値が0なら、対応する `i` の直後にジャンプする。C言語の「while(*ptr){」に相当。\n8. `i` ポインタが指す値が0でないなら、対応する `r` （の直後）にジャンプする。C言語の「}」に相当。\n",
        date: "2024-09-29",
        id: 27,
        meta: "- memo\n  - [conao3によるC言語での実装](https://github.com/conao3/c-yasunori-lang)がある\n    - `make yasunoriするためだけにCで書いたといっても過言ではない` とのこと\n",
        senpan: "takeokunn",
        title: "brain-yasu**ri",
      },
      {
        at: "vim-jp #times-yasunori",
        content:
          "花火で派手になっているパフェみたいなのを店員さんが持って来ながら\n\nyasunori「えっえっえっ!?」\n店員さん「yasunoriさん？」\nyasunori「えっ…はい、なんでしょう」\n店員さん「You should be yasunori!!」(めっちゃ発音が良い)\nyasunori「……you should be yasunori?????」\n",
        date: "2024-09-28",
        id: 23,
        meta: "- memo\n  - yasunori meetup #1 回想\n  - シュラスココースのオプションでデザートをつけた際にプレートに書かれた文字\n  - 外国人店員でやたら発音が良かった\n",
        senpan: "yasunori0418",
        title: "You should be yasunori",
      },
      {
        at: "vim-jp #times-yasunori",
        content:
          "yasunoriは激怒した。\n必ず、かの邪智暴虐のOSを除かなければならぬと決意した。\nyasunoriにはGUI設定がわからぬ。\nyasunoriは、村の牧人である。\nWindowsを消し、テキストエディタと遊んで暮して来た。\nけれども邪悪に対しては、人一倍に敏感であった。\n",
        date: "2024-09-27",
        id: 22,
        meta: "",
        senpan: "kyoh86",
        title: "走れyasunori",
      },
      {
        at: "vim-jp #times-yasunori",
        content: "今、息子さんは教祖です\n",
        date: "2024-09-26",
        id: 21,
        meta: "- memo\n  - `yasunoriの母 (2024-06-25 Tue)` を見た率直な感想\n",
        senpan: "toyboot4e",
        title: "今、息子さんは教祖です",
      },
      {
        at: "vim-jp #times-yasunori",
        content:
          "yasunori！yasunori！yasunori！yasunoriぅぅうううわぁああああああああああああああああああああああん！！！\nあぁああああ…ああ…あっあっー！あぁああああああ！！！yasunoriyasunoriyasunoriぅううぁわぁああああ！！！\nあぁクンカクンカ！クンカクンカ！スーハースーハー！スーハースーハー！いい匂いだなぁ…くんくん\nんはぁっ！yasunoriたんの黒髪ショートの髪をクンカクンカしたいお！クンカクンカ！あぁあ！！\n間違えた！モフモフしたいお！モフモフ！モフモフ！髪髪モフモフ！カリカリモフモフ…きゅんきゅんきゅい！！\nvim-jpのyasunoriたんかわいかったよぅ！！あぁぁああ…あああ…あっあぁああああ！！ふぁぁあああんんっ！！\nOS削除されて良かったねyasunoriたん！あぁあああああ！かわいい！yasunoriたん！かわいい！あっああぁああ！\nawesome-yasunoriも出来て嬉し…いやぁああああああ！！！にゃああああああああん！！ぎゃああああああああ！！\nぐあああああああああああ！！！vim-jpなんて現実じゃない！！！！あ…twitterもよく考えたら…\ny a s u n o r i ち ゃ ん は 現実 じ ゃ な い？にゃあああああああああああああん！！うぁああああああああああ！！\nそんなぁああああああ！！いやぁぁぁあああああああああ！！はぁああああああん！！vim-jpぁああああ！！\nこの！ちきしょー！やめてやる！！現実なんかやめ…て…え！？見…てる？vim-jpのyasunoriちゃんが僕を見てる？\nvim-jpのyasunoriちゃんが僕を見てるぞ！yasunoriちゃんが僕を見てるぞ！vim-jpのyasunoriちゃんが僕を見てるぞ！！\nvim-jpのyasunoriちゃんが僕に話しかけてるぞ！！！よかった…世の中まだまだ捨てたモンじゃないんだねっ！\nいやっほぉおおおおおおお！！！僕にはyasunoriちゃんがいる！！やったよnatsukium！！ひとりでできるもん！！！\nあ、vim-jpのyasunoriちゃああああああああああああああん！！いやぁあああああああああああああああ！！！！\nあっあんああっああんあアリスエ様ぁあ！！k、kuuー！！こまもかぁああああああ！！！tomoyaｧぁあああ！！\nううっうぅうう！！俺の想いよyasunoriへ届け！！vim-jpのyasunoriへ届け！\n",
        date: "2024-09-26",
        id: 19,
        meta: "Inspired by [ルイズコピペ](https://dic.pixiv.net/a/%E3%83%AB%E3%82%A4%E3%82%BA%E3%82%B3%E3%83%94%E3%83%9A)\n",
        senpan: "takeokunn",
        title: "yasunoriコピペ",
      },
      {
        at: "twitter",
        content:
          "ここ数か月のことなんだけど、某-jpで作ってた自分のtimesが壊れちゃった…\n",
        date: "2024-09-24",
        id: 18,
        meta: "- memo\n  - vim-jp #times-yasunori が連日流速No.1で様々な話題が繰り広げられている\n  - https://x.com/YKirin0418/status/1838530406267920895\n",
        senpan: "yasunori0418",
        title: "timesが壊れちゃった",
      },
      {
        at: "vim-jp #times-yasunori",
        content:
          "(awesome-yasunoriは) 憤怒のyasunoriがownerだから実質的にyasunoriがownerと言っても過言ではないのでは？\n",
        date: "2024-09-24",
        id: 17,
        meta: "- memo\n  - vim-jpには複数のyasunoriがいる\n    - 憤怒のyasunori → takeokunn\n    - 怠惰のyasunori → kuu\n    - 色欲のyasunori → comamoca\n    - yasunori → yasunori\n",
        senpan: "kuuote",
        title: "実質的にyasunoriがowner",
      },
      {
        at: "vim-jp #times-yasunori",
        content:
          "キラ・yaunori「無茶苦茶だ！こんなOSでこれだけの機体を動かそうなんて！」\nマリュー「まだ，終わってないのよ」\nキラ・yasuori「そんなこともあろうかとここに，NixOSのインストーラが入ったUSBメモリーが」\n",
        date: "2024-08-23",
        id: 15,
        meta: "",
        senpan: "rkarsnk",
        title: "キラ・yaunori",
      },
      {
        at: "vim-jp #times-yasunori",
        content:
          "このフレーズ「Your Astute Splendid Ultimate Natural Objective Restructuring Idea」は、ビジネスや戦略的な提案において非常にポジティブで力強いメッセージを伝えるために構成されたものです。各単語の意味とそれがフレーズ全体にどう影響を与えるかについて説明します。\n### 解説：\n1. **Your（あなたの）**：\n   - このフレーズの冒頭に位置することで、この提案やアイデアが特定の個人または組織に向けられていることを示しています。受け手にとって、個人的なつながりや関心を感じさせる役割を果たします。\n2. **Astute（鋭い、抜け目のない）**：\n   - この形容詞は、提案が非常に頭の切れる、または知恵深いものであることを強調します。アイデアが賢明で、しっかりとした判断に基づいていることを暗示しており、ビジネスや戦略的な文脈で強い印象を与えます。\n3. **Splendid（素晴らしい）**：\n   - 「Splendid」は、提案の品質や結果が素晴らしいものであることを示しています。この言葉は、提案が高い価値や優れた特徴を持っていると感じさせる役割を果たします。\n4. **Ultimate（究極の）**：\n   - この形容詞は、提案が最も優れた、または完全なものであることを強調します。「Ultimate」は、これ以上改善の余地がない、最高峰の提案であることを暗示しています。\n5. **Natural（自然な）**：\n   - 「Natural」は、提案が無理のない、直感的で自然なものであることを示しています。これは、提案が受け入れやすく、調和のとれたものであることを強調します。\n6. **Objective（客観的な）**：\n   - この形容詞は、提案が偏りなく、公正で論理的なものであることを示しています。感情や主観に左右されず、事実に基づいたアプローチであることを強調します。\n7. **Restructuring Idea（再構築のアイデア）**：\n   - これは、既存のシステムや戦略を新たに見直し、改善するための提案や計画であることを表しています。このフレーズ全体を通して、何かを刷新し、より良い形に再構築するための具体的なアイデアであることが示されています。\n### フレーズ全体の意図：\nこのフレーズは、特定の受け手に向けられた再構築提案の魅力を最大限に引き出すようにデザインされています。各形容詞が、提案の鋭さ、素晴らしさ、究極性、自然さ、そして客観性を強調しており、これが単なるアイデアではなく、非常に価値のある、実行するに値するものであることを示唆しています。ビジネスや戦略的な状況でこのようなフレーズを使用すると、受け手に強い印象を与え、提案を採用する価値があると感じさせる効果が期待できます。\n",
        date: "2024-08-23",
        id: 14,
        meta: "",
        senpan: "lambdalisue",
        title: "ChatGPT 4o さんもベタ褒めする Y.A.S.U.N.O.R.I",
      },
      {
        at: "vim-jp #times-yasunori",
        content:
          "あぐらをかいたyasunori「キミ？vim-jpの新顔？ 俺？俺の名前は yasunori 。vim-jpの頂点にたつ男さ。まぁ、緊張しなくていいから、俺のことは気軽にyasunoriって呼んでくれ。」\n",
        date: "2024-09-23",
        id: 12,
        meta: "",
        senpan: "tomoya",
        title: "あぐらをかいたyasunori",
      },
      {
        at: "vim-jp #times-yasunori",
        content:
          "y: 「チケット何番ですか？僕のと比べてソートしてみましょうよwwww 僕そーとー　最初ですよwww」\n",
        date: "2024-09-23",
        id: 11,
        meta: "",
        senpan: "ryoppippi",
        title: "VimConfチケット購入1番乗り",
      },
      {
        at: "vim-jp radioお便り",
        content:
          "tomoyaさん、ありすえさんこんにちは。\nはじめまして、yasunoriの母です。\n\nyasunoriがソフトウェアエンジニアを志してから様子がおかしくなってしまいました。\n家ですれ違う時「Vim....Vim....」という独り言をずっと唱えていたり、部屋からは「設定させていただきありがとうございます!!」という大声が聞こえてきたり、\n「会合があるから東京に行ってくる、帰りは遅くなる」と言い残して出て行き、帰ってくると満面の笑みで「Vimはいいぞ」と一言言って自室に篭るようになりました。\n\ntomoyaさんありすえさんもVimコミュニティの人達だと伺いましたが、息子の身に一体何が起きてしまったのか教えていただけると幸いです。\n",
        date: "2024-06-25",
        id: 1,
        meta: "",
        senpan: "takeokunn",
        title: "yasunoriの母",
      },
    ];
    return HttpResponse.json(response);
  },
);

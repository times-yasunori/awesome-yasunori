import { monthlyPostsAggregate, senpanAggregate } from "./aggregate";

describe("monthlyPostsAggregate", () => {
  test("return aggregateed data", () => {
    const source = [
      {
        id: 52,
        title: "特技はyasunori",
        date: "2024-10-13",
        at: "vim-jp #times-comamoca",
        senpan: "comamoca",
        content: "content",
        meta: "meta",
      },
      {
        id: 51,
        title: "最高に「YASUNORI！」ってやつだァァァァァ",
        date: "2024-10-10",
        at: "vim-jp #times-yasunori",
        senpan: "tomoya",
        content: "content",
        meta: "meta",
      },
      {
        id: 50,
        title: "YASUNORYYYYYYYYYYYY！！",
        date: "2024-09-10",
        at: "vim-jp #times-yasunori",
        senpan: "tomoya",
        content: "content",
        meta: "meta",
      },
      {
        id: 49,
        title: "ねぇ、今から消えるよ",
        date: "2024-08-10",
        at: "vim-jp #times-yasunori",
        senpan: "natsukium",
        content: "content",
        meta: "meta",
      },
    ];
    expect(monthlyPostsAggregate(source)).toStrictEqual([
      {
        year: 2024,
        month: 8,
        yearMonth: "2024-08",
        amount: 1,
      },
      {
        year: 2024,
        month: 9,
        yearMonth: "2024-09",
        amount: 1,
      },
      {
        year: 2024,
        month: 10,
        yearMonth: "2024-10",
        amount: 2,
      },
    ]);
  });
});

describe("senpanAggregate", () => {
  test("return aggregateed data", () => {
    const source = [
      {
        id: 52,
        title: "特技はyasunori",
        date: "2024-10-13",
        at: "vim-jp #times-comamoca",
        senpan: "comamoca",
        content: "content",
        meta: "meta",
      },
      {
        id: 51,
        title: "最高に「YASUNORI！」ってやつだァァァァァ",
        date: "2024-10-10",
        at: "vim-jp #times-yasunori",
        senpan: "tomoya",
        content: "content",
        meta: "meta",
      },
      {
        id: 50,
        title: "YASUNORYYYYYYYYYYYY！！",
        date: "2024-09-10",
        at: "vim-jp #times-yasunori",
        senpan: "tomoya",
        content: "content",
        meta: "meta",
      },
      {
        id: 49,
        title: "ねぇ、今から消えるよ",
        date: "2024-08-10",
        at: "vim-jp #times-yasunori",
        senpan: "natsukium",
        content: "content",
        meta: "meta",
      },
    ];
    expect(senpanAggregate(source)).toStrictEqual([
      {
        senpan: "tomoya",
        amount: 2,
      },
      {
        senpan: "comamoca",
        amount: 1,
      },
      {
        senpan: "natsukium",
        amount: 1,
      },
    ]);
  });
});

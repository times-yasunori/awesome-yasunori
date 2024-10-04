import app from "./index";

describe("Test GET /", () => {
  test("Should return 200 response", async () => {
    const res = await app.request("http://localhost/");
    expect(res.status).toBe(200);
  });

  test("Should return message response", async () => {
    const res = await app.request("http://localhost/");
    const parsed = await res.json();
    expect(parsed).toStrictEqual({
      message:
        "Here is Yasunori APIs. <https://github.com/times-yasunori/awesome-yasunori/packages/api>",
    });
  });
});

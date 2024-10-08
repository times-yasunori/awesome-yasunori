using System.Text.Json;
using Yasunori.Net;

namespace test;

[TestClass]
public class UnitTest1
{
    static string JSON_1 = """
        {"id":1,"title":"yasunoriの母","date":"2024-06-25","at":"vim-jp radioお便り","senpan":"takeokunn","content":"tomoyaさん、ありすえさんこんにちは。\nはじめまして、yasunoriの母です。\n\nyasunoriがソフトウェアエンジニアを志してから様子がおかしくなってしまいました。\n","meta":""}
        """;

    /// 行末スペースは重要！！
    static string[] MarkdownText_1 = """
        # yasunoriの母
        ```yaml
        id: 1
        date: 2024-06-25
        at: vim-jp radioお便り
        senpan: takeokunn
        ```

        tomoyaさん、ありすえさんこんにちは。  
        はじめまして、yasunoriの母です。

        yasunoriがソフトウェアエンジニアを志してから様子がおかしくなってしまいました。
        """.Split('\n');
    static JsonSerializerOptions JsonOption = new()
    {
        PropertyNameCaseInsensitive = true,
    };

    public YasunoriData? Test_1_Json { get; }
    public UnitTest1()
    {
        Test_1_Json = JsonSerializer.Deserialize<YasunoriData>(JSON_1, JsonOption);
    }
    [TestMethod("Test Desrialized Json")]
    public void TestMethod1()
    {
        var yasu = Test_1_Json;
        Assert.IsInstanceOfType<YasunoriData>(yasu);
        Console.WriteLine(yasu.ToString());

        Assert.AreEqual<uint>(1, yasu.Id, "'Id' property");
        Assert.AreEqual<string>("yasunoriの母", yasu.Title, "'Title' property");
        Assert.AreEqual<string>("2024-06-25", yasu.Date, "'Date' property");
        Assert.AreEqual<string>("vim-jp radioお便り", yasu.At, "'At' property");
        Assert.AreEqual<string>("takeokunn", yasu.Senpan, "'Senpan' property");
        Assert.IsTrue(yasu.Content.StartsWith("tomoyaさん、ありすえさんこんにちは。"), "'Content' property");
        Assert.AreEqual<string>("takeokunn", yasu.Senpan);
        Assert.AreEqual<string>("", yasu.Meta);
    }

    [TestMethod("Test Markdown Text")]
    public void TestMethod2()
    {
        Assert.IsNotNull(Test_1_Json);
        var md = Markdown.BuildText(Test_1_Json).Trim();
        var lines = md.Split('\n');
        Assert.AreEqual<int>(MarkdownText_1.Length, lines.Length);
        for (var i = 0; i < lines.Length; i++)
        {
            Assert.AreEqual<string>(MarkdownText_1[i], lines[i], $"Line {i+1}");
        }
    }
}

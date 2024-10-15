using Yasunori.Net;

namespace test;

[TestClass]
public class UnitTest2
{
    const string SixelStart = "\x1bPq";
    const string SixelEnd = "\x1b\\";

    const string PROJ_DIR = "../../..";

    [TestMethod("Sixel Test - test_1.png")]
    public void TestMethod1()
    {
        var resultFileInfo = new FileInfo(PROJ_DIR + "/data/test_1_sixel.out");
        var result = File.ReadAllText(resultFileInfo.FullName).Trim();

        var imageFileInfo = new FileInfo(PROJ_DIR + "/data/test_1.png");
        Assert.IsTrue(imageFileInfo.Exists);
        using var fs = imageFileInfo.OpenRead();

        var sixel = Sixel.Encode(fs);

        Assert.IsTrue(sixel.StartsWith(SixelStart));
        Assert.IsTrue(sixel.EndsWith(SixelEnd));

        var resultArray = result.Split('#');
        var sixelArray = sixel.Split('#');
        for (var i = 1; i < resultArray.Length; i++)
        {
            Assert.AreEqual<string>(resultArray[i], sixelArray[i], $"[{i}]");
        }
        Assert.AreEqual<int>(resultArray.Length, sixelArray.Length);
    }

    [TestMethod("Sixel Test - test_2.png")]
    public void TestMethod2()
    {
        var resultFileInfo = new FileInfo(PROJ_DIR + "/data/test_2_sixel.out");
        var result = File.ReadAllText(resultFileInfo.FullName).Trim();

        var imageFileInfo = new FileInfo(PROJ_DIR + "/data/test_2.png");
        Assert.IsTrue(imageFileInfo.Exists);
        using var fs = imageFileInfo.OpenRead();

        var sixel = Sixel.Encode(fs);

        Assert.IsTrue(sixel.StartsWith(SixelStart));
        Assert.IsTrue(sixel.EndsWith(SixelEnd));

        var resultArray = result.Split('#');
        var sixelArray = sixel.Split('#');
        for (var i = 1; i < resultArray.Length; i++)
        {
            Assert.AreEqual<string>(resultArray[i], sixelArray[i], $"[{i}]");
        }
        Assert.AreEqual<int>(resultArray.Length, sixelArray.Length);
    }
}

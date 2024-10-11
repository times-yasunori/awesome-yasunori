using CommandLine;
using Yasunori.Net;

namespace Yasunori;

class Program
{
    private static void Main(string[] args)
    {
        Parser.Default.ParseArguments<Options>(args)
            .WithParsed(options =>
            {
                if (options.ShowList)
                {
                    var task = Client.GetAll();
                    task.Wait();
                    foreach (var y in task.Result.OrderBy(yasu => yasu.Id))
                    {
                        Console.WriteLine(y.ToString());
                    }
                    return;
                }
                var ids = options.IdList.ToArray();
                if (ids.Length == 0)
                {
                    if (options.ShowAsImage)
                    {
                        var task = Client.GetOGP();
                        task.Wait();
                        Console.WriteLine(Sixel.Encode(task.Result));
                    }
                    else
                    {
                        var task = Client.GetRandom();
                        task.Wait();
                        Console.WriteLine(Markdown.RenderAsVT100(task.Result));
                    }
                    return;
                }

                if (options.ShowAsImage)
                {
                    var tasks = new List<Task<Stream>>();
                    foreach (var id in ids)
                    {
                        tasks.Add(Client.GetOGP(id));
                    }
                    Task.WaitAll(tasks.ToArray());
                    foreach (var task in tasks)
                    {
                        Console.WriteLine(Sixel.Encode(task.Result));
                    }
                }
                else
                {
                    var tasks = new List<Task<YasunoriData>>();
                    foreach (var id in ids)
                    {
                        tasks.Add(Client.GetById(id));
                    }
                    Task.WaitAll(tasks.ToArray());
                    foreach (var task in tasks)
                    {
                        Console.WriteLine(Markdown.RenderAsVT100(task.Result));
                    }
                }
            });
    }
}

class Options
{
    [Option('l', "list", Required = false, HelpText = "Show Yasunori list")]
    public bool ShowList { get; set; }

    [Option('i', "image", Required = false, HelpText = "Show OGP Image (Required Sixel supported terminal)")]
    public bool ShowAsImage { get; set; }

    [Value(0, MetaName = "id")]
    public IEnumerable<uint> IdList { get; set; } = [];
}

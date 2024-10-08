using System.Net.Http.Json;
using System.Text;
using Microsoft.PowerShell.MarkdownRender;

namespace Yasunori;

class Program
{
    const string BASE_URL = "https://api.yasunori.dev/";

    private static void Main(string[] args)
    {
        if (args.Length == 0)
        {
            var task = GetYasunori<Yasunori>("/awesome/random");
            task.Wait();
            Console.WriteLine(RenderMarkdown(CreateMarkdown(task.Result)));
        }
        else if (args[0] == "-list")
        {
            var task = GetYasunori<Yasunori[]>("/awesome");
            task.Wait();
            foreach (var y in task.Result.OrderBy(yasu => yasu.Id))
            {
                Console.WriteLine($"{y.Id,3:d} {y.Date} {y.Title}");
            }
        }
        else
        {
            var tasks = new List<Task<Yasunori>>();
            foreach (var arg in args)
            {
                if (uint.TryParse(arg, out var id))
                {
                    tasks.Add(GetYasunori<Yasunori>($"/awesome/{id}"));
                }
            }
            Task.WaitAll(tasks.ToArray());
            foreach (var task in tasks)
            {
                Console.WriteLine(RenderMarkdown(CreateMarkdown(task.Result)));
            }
        }
    }

    private static string RenderMarkdown(string md)
    {
        var option = new PSMarkdownOptionInfo()
        {
            EnableVT100Encoding = true,
        };
        var result = MarkdownConverter.Convert(md, MarkdownConversionType.VT100, option);
        return result.VT100EncodedString;
    }

    private static string CreateMarkdown(Yasunori y)
    {
        var sb = new StringBuilder();
        sb.AppendLine($"# {y.Title}");
        sb.AppendLine($"```yaml");
        sb.AppendLine($"id: {y.Id}");
        sb.AppendLine($"date: {y.Date}");
        sb.AppendLine($"at: {y.At}");
        sb.AppendLine($"senpan: {y.Senpan}");
        if (!string.IsNullOrEmpty(y.Meta))
        {
            sb.AppendLine($"meta: |-");
            foreach (var line in y.Meta.Trim().Split('\n'))
            {
                sb.AppendLine($"  {line}");
            }
        }
        sb.AppendLine("```");
        sb.AppendLine();
        foreach (var p in y.Content.Trim().Split("\n\n"))
        {
            foreach (var line in p.Split('\n'))
            {
                sb.AppendLine($"{line}  ");
            }
            sb.AppendLine();
        }
        return sb.ToString();
    }

    private static void PrintError(params string[] lines)
    {
        var fg = Console.ForegroundColor;
        Console.ForegroundColor = ConsoleColor.Red;
        foreach (var line in lines)
        {
            Console.WriteLine(line);
        }
        Console.ForegroundColor = fg;
    }

    private static async Task<T> GetYasunori<T>(string path)
    {
        try
        {
            var yasunori = await Client.GetFromJsonAsync<T>(path);
            if (yasunori == null)
            {
                throw new Exception("犯人は Yasunori されてしまった！！");
            }
            return yasunori;
        }
        catch (HttpRequestException e)
        {
            PrintError($"Error: {e.StatusCode:d} {e.StatusCode}",
                       $"       {e.Message}");
            throw;
        }

    }

    private static HttpClient Client = new HttpClient()
    {
        BaseAddress = new Uri(BASE_URL)
    };
}

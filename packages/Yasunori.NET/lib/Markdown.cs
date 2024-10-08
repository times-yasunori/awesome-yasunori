using System.Text;
using Microsoft.PowerShell.MarkdownRender;

namespace Yasunori.Net;

public class Markdown
{
    public static string RenderAsVT100(string md)
    {
        var option = new PSMarkdownOptionInfo()
        {
            EnableVT100Encoding = true,
        };
        var result = MarkdownConverter.Convert(md, MarkdownConversionType.VT100, option);
        return result.VT100EncodedString;
    }

    public static string RenderAsVT100(YasunoriData y)
    {
        return RenderAsVT100(BuildText(y));
    }

    public static string BuildText(YasunoriData y)
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
}

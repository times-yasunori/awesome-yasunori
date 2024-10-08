namespace Yasunori.Net;

public class YasunoriData
{
    public uint Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Date { get; set; } = string.Empty;
    public string At { get; set; } = string.Empty;
    public string Senpan { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
    public string Meta { get ; set; } = string.Empty;

    public override string ToString()
    {
        return $"{Id,3:d} {Date} {Title}";
    }
}

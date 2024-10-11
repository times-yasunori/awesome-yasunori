using System.Net.Http.Json;

namespace Yasunori.Net;

public sealed class Client
{
    public const string BASE_URL = "https://api.yasunori.dev/";
    public const string ROOT_PATH = "/awesome";
    public const string RANDOM_PATH = "/awesome/random";

    private static string GetIdPath(uint id)
    {
        return $"/awesome/{id}";
    }

    public static async Task<YasunoriData> GetRandom()
    {
        return await GetYasunori<YasunoriData>(RANDOM_PATH);
    }

    public static async Task<YasunoriData> GetById(uint id)
    {
        return await GetYasunori<YasunoriData>(GetIdPath(id));
    }

    public static async Task<YasunoriData[]> GetAll()
    {
        return await GetYasunori<YasunoriData[]>(ROOT_PATH);
    }

    public static async Task<T> GetYasunori<T>(string path)
    {
        var yasunori = await HttpClient.GetFromJsonAsync<T>(path);
        if (yasunori == null)
        {
            throw new Exception("犯人は Yasunori されてしまった！！");
        }
        return yasunori;
    }

    private static Lazy<HttpClient> _client = new(() => new HttpClient() { BaseAddress = new Uri(BASE_URL) });
    private static HttpClient HttpClient => _client.Value;

    public const string OGP_URL = "https://image.yasunori.dev";
    public const string OGP_PATH = "/ogp";

    public static async Task<Stream> GetOGP()
    {
        return await ImgClinet.GetStreamAsync(OGP_PATH);
    }

    public static async Task<Stream> GetOGP(uint id)
    {
        return await ImgClinet.GetStreamAsync($"{OGP_PATH}?id={id}");
    }

    private static Lazy<HttpClient> _imgClient = new(() => new HttpClient() { BaseAddress = new Uri(OGP_URL) });
    private static HttpClient ImgClinet => _imgClient.Value;
}

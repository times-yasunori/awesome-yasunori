using Yasunori.Net;

namespace Yasunori;

class Program
{
    private static void Main(string[] args)
    {
        if (args.Length == 0)
        {
            var task = Client.GetRandom();
            task.Wait();
            Console.WriteLine(Markdown.RenderAsVT100(task.Result));
        }
        else if (args[0] == "-list")
        {
            var task = Client.GetAll();
            task.Wait();
            foreach (var y in task.Result.OrderBy(yasu => yasu.Id))
            {
                Console.WriteLine(y.ToString());
            }
        }
        else
        {
            var tasks = new List<Task<YasunoriData>>();
            foreach (var arg in args)
            {
                if (uint.TryParse(arg, out var id))
                {
                    tasks.Add(Client.GetById(id));
                }
            }
            Task.WaitAll(tasks.ToArray());
            foreach (var task in tasks)
            {
                Console.WriteLine(Markdown.RenderAsVT100(task.Result));
            }
        }
    }
}

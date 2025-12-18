using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Najiz.Framework.Web.HostFactory;

namespace Todos
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateWebHostBuilder(args).Build().Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHostFactory.CreateWebHostBuilder<Startup>(args, typeof(Program).Assembly);
    }
}

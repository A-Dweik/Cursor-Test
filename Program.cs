using System.Reflection;
using Microsoft.AspNetCore.Hosting;
using Najiz.Framework.Web.Host;
using Najiz.Framework.Web.Host.Extensions;

namespace Najiz.SweetMachine
{
    public class Program
    {
        public static void Main(string[] args)
        {
            WebHostFactory.CreateSpaWebHost<Startup>(args, builder =>
            {
                builder.RegisterAssembly(Assembly.GetAssembly(typeof(Najiz.NLog.Web.Startup)));
                builder.RegisterAssembly(Assembly.GetAssembly(typeof(Najiz.ApplicationInsights.Startup)));
                builder.RegisterAssembly(Assembly.GetAssembly(typeof(Najiz.Web.Security.Startup)));
                builder.RegisterAssembly(Assembly.GetAssembly(typeof(Najiz.Security.OpenIdConnect.Abstractions.Startup)));
                builder.RegisterAssembly(Assembly.GetAssembly(typeof(Najiz.Web.Security.JwtBearer.Startup)));
                builder.RegisterAssembly(Assembly.GetAssembly(typeof(Najiz.Portal.Web.Abstractions.Startup)));
                builder.RegisterAssembly(Assembly.GetAssembly(typeof(Najiz.DataProtection.keyStorage.Abstractions.Startup)));
                builder.RegisterAssembly(Assembly.GetAssembly(typeof(Startup)));
                builder.RegisterAssembly(Assembly.GetAssembly(typeof(Najiz.Framework.DistributedCaching.Startup)));
            }).Run();
        }
    }
}

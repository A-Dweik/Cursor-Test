using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Najiz.Framework.Web.Startup;

namespace Todos
{
    public class Startup : WebHostSpaStartup
    {
        public Startup(IConfiguration configuration, IWebHostEnvironment env)
            : base(configuration, env)
        {
        }

        protected override void ConfigureServices(IServiceCollection services)
        {
            base.ConfigureServices(services);
            services.AddControllers();
        }

        protected override void ConfigureSpaApplication(ISpaBuilder spa)
        {
            spa.Options.SourcePath = "ClientApp";

            if (Env.IsDevelopment())
            {
                spa.UseVueCli(npmScript: "serve");
            }
        }

        protected override string RootPath => "dist";
    }
}

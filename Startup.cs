using System;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Najiz.Framework.Web.Host;
using Najiz.CarRental.Data;
using Microsoft.EntityFrameworkCore;

namespace Najiz.CarRental
{
    public class Startup : WebHostSpaStartup
    {
        public Startup(IConfiguration configuration, IWebHostEnvironment environment)
            : base(configuration, environment)
        {

        }

        protected override string RootPath => "dist";
        protected override string SourcePath => "";
        protected override Action<ISpaBuilder> SpaBuilder => spa =>
        {
            if (spa.ApplicationBuilder.ApplicationServices.GetService<IWebHostEnvironment>().IsDevelopment())
            {
                //spa.UseVueCli(npmScript: "serve");
            }
        };

        protected override void ConfigureMoreServices(IServiceCollection services)
        {
            base.ConfigureMoreServices(services);

            // Add EF Core In-Memory Database
            services.AddDbContext<CarRentalDbContext>(options =>
                options.UseInMemoryDatabase("CarRentalDb"));

            // Add Controllers
            services.AddControllers()
                .AddNewtonsoftJson(options =>
                {
                    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
                });
        }
    }
}

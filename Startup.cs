using System;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Najiz.Framework.Web.Host;
using Microsoft.EntityFrameworkCore;
using Najiz.CarRentalApp.Models;

namespace Najiz.CarRentalApp
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

        protected override void ConfigureApplicationServices(IServiceCollection services)
        {
            base.ConfigureApplicationServices(services);
            
            // Add EF Core In-Memory Database
            services.AddDbContext<CarRentalDbContext>(options =>
                options.UseInMemoryDatabase("CarRentalDb"));
        }
    }
}

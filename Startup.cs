using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.Extensions;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using Najiz.CarRentalApp.Models;

namespace Najiz.CarRentalApp
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            
            // Add EF Core In-Memory Database
            services.AddDbContext<CarRentalDbContext>(options =>
                options.UseInMemoryDatabase("CarRentalDb"));

            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "dist";
            });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, CarRentalDbContext dbContext)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            // Ensure database is created and seeded
            dbContext.Database.EnsureCreated();

            // Serve static files from wwwroot and dist
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                
                // Fallback to SPA for any non-API routes
                endpoints.MapFallbackToFile("index.html");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";
                
                if (env.IsDevelopment())
                {
                    // spa.UseVueCli(npmScript: "serve");
                }
            });
        }
    }
}

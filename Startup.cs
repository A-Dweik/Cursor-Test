using System;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using Najiz.Framework.Web.Host;
using ContractVerification.Data;

namespace Najiz.ContractVerification
{
    public class Startup : WebHostSpaStartup
    {
        private readonly IConfiguration _configuration;

        public Startup(IConfiguration configuration, IWebHostEnvironment environment)
            : base(configuration, environment)
        {
            _configuration = configuration;
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

        public override void ConfigureServices(IServiceCollection services)
        {
            base.ConfigureServices(services);

            // Register DbContext with SQL Server
            var connectionString = _configuration.GetConnectionString("ContractDatabase");
            services.AddDbContext<ContractDbContext>(options =>
                options.UseSqlServer(
                    connectionString,
                    sqlOptions => sqlOptions.EnableRetryOnFailure(
                        maxRetryCount: 5,
                        maxRetryDelay: TimeSpan.FromSeconds(30),
                        errorNumbersToAdd: null
                    )
                )
            );
        }
    }
}

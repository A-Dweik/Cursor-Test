using System.IO;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace ContractVerification.Data
{
    /// <summary>
    /// Design-time factory for ContractDbContext.
    /// This allows Entity Framework Core tools (like migrations) to instantiate the DbContext.
    /// </summary>
    public class ContractDbContextFactory : IDesignTimeDbContextFactory<ContractDbContext>
    {
        public ContractDbContext CreateDbContext(string[] args)
        {
            // Build configuration
            var configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .Build();

            // Get connection string
            var connectionString = configuration.GetConnectionString("ContractDatabase");

            // Build DbContextOptions
            var optionsBuilder = new DbContextOptionsBuilder<ContractDbContext>();
            optionsBuilder.UseSqlServer(connectionString);

            return new ContractDbContext(optionsBuilder.Options);
        }
    }
}

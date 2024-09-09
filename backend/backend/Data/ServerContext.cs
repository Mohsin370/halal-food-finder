using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class ServerContext : DbContext
    {
        public DbSet<Restaurant> Restaurants { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                var configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json")
                .Build();

                // Retrieve connection string from configuration
                var connectionString = configuration.GetConnectionString("DefaultConnection");

                // Use SQL Server with the retrieved connection string
                optionsBuilder.UseSqlServer(connectionString);
            }
        }


    }
}

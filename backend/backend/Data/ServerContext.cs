using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class ServerContext : DbContext
    {
        public DbSet<Restaurant> Restaurants { get; set; } = null!;
        public DbSet<CuisineType> CuisineTypes { get; set; } = null!;
        public DbSet<HalalStatus> HalalStatuses { get; set; } = null!;
        public DbSet<RestaurantType> RestaurantTypes { get; set; } = null!;
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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //Seeder Function Calls
            seedCuisineType(modelBuilder);


            //Indexing
            modelBuilder.Entity<Restaurant>()
                .HasIndex(r => r.City);

            modelBuilder.Entity<Restaurant>()
                .HasIndex(r => r.State);

            modelBuilder.Entity<Restaurant>()
                .HasIndex(r => r.Country);

            modelBuilder.Entity<Restaurant>()
               .HasIndex(r => r.Lat);

            modelBuilder.Entity<Restaurant>()
               .HasIndex(r => r.Lng);
        }

        private void seedCuisineType(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<CuisineType>().HasData(
                new CuisineType { Id = 1, Name = "Afghani" },
                new CuisineType { Id = 2, Name = "Pakistani" },
                new CuisineType { Id = 3, Name = "Indian" }
            );
        }
    }
}

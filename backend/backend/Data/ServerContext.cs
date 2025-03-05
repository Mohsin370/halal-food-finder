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
            SeedRestaurantType(modelBuilder);
            seedCuisineType(modelBuilder);
            SeedHalalStatuse(modelBuilder);


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
        
        private void SeedRestaurantType(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<RestaurantType>().HasData(
                new RestaurantType { Id = 1, Name = "Fast Food" },
                new RestaurantType { Id = 1, Name = "Casual Dinning" },
                new RestaurantType { Id = 1, Name = "Fine Dinning" },
                new RestaurantType { Id = 1, Name = "Take Away" },
                new RestaurantType { Id = 1, Name = "Food Truck" },
                new RestaurantType { Id = 1, Name = "Cafe" }


                );
        }

        private void SeedHalalStatuse(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<HalalStatus>().HasData(
                new HalalStatus { Id = 1, Status = "Certified Halal" },
                new HalalStatus { Id = 2, Status = "Partially Halal" },
                new HalalStatus { Id = 3, Status = "Vegeterian" }

                );
        }

        private void seedCuisineType(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<CuisineType>().HasData(
                new CuisineType { Id = 1, Name = "Afghani" },
                new CuisineType { Id = 2, Name = "Pakistani" },
                new CuisineType { Id = 3, Name = "Indian" },
                new CuisineType { Id = 4, Name = "Labanese" },
                new CuisineType { Id = 5, Name = "Thai" },
                new CuisineType { Id = 6, Name = "Indonesian" },
                new CuisineType { Id = 7, Name = "Mexican" },
                new CuisineType { Id = 8, Name = "Chinese" },
                new CuisineType { Id = 9, Name = "Korean" },
                new CuisineType { Id = 10, Name = "Italian" }

            );
        }
    }
}

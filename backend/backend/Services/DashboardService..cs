using backend.Data;
using backend.DTOs;
using backend.Helpers;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class DashboardService : IDashboardService
    {
        private readonly ServerContext _serverContext;

        public DashboardService(ServerContext serverContext)
        {
            _serverContext = serverContext;
        }
        public async Task<RestaurantStatsDto> GetRestaurantStats()
        {
            var RestaurantCount = await _serverContext.Restaurants.CountAsync();
            var RTypeStatsCollection = await _serverContext.Restaurants
                .GroupBy(r => r.RestaurantType)
                .Select(t => new StatsByCategory
                {
                    Name = t.Key.Name,
                    Count = t.Count()
                }).ToListAsync();
            var RStatusCollection = await _serverContext.Restaurants
                .GroupBy(r => r.HalalStatus)
                .Select(t => new StatsByCategory
                {
                    Name = t.Key.Status,
                    Count = t.Count()
                }).ToListAsync();

            var RCuisineCollections = await _serverContext.Restaurants
               .GroupBy(r => r.CuisineType)
               .Select(t => new StatsByCategory
               {
                   Name = t.Key.Name,
                   Count = t.Count()
               }).ToListAsync();


            RestaurantStatsDto stats = new()
            {
                RestaurantCount = RestaurantCount,
                StatsbyType = RTypeStatsCollection,
                StatsByStatus = RStatusCollection,
                StatsByCuisine = RCuisineCollections,

            };


            return stats;
        }
    }
}

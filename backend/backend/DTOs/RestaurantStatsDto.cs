namespace backend.DTOs
{
    public class RestaurantStatsDto
    {
        public int RestaurantCount;
        public required IEnumerable<StatsByCategory> StatsbyType;
        public required IEnumerable<StatsByCategory> StatsByStatus;
        public required IEnumerable<StatsByCategory> StatsByCuisine;
        
    }

    public class StatsByCategory
    {
        public string Name { get; set; } = string.Empty;
        public int Count { get; set; }
    }
}

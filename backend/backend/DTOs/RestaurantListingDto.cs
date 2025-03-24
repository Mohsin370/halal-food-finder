namespace backend.DTOs
{
    public class RestaurantListingDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string Image { get; set; } = null!;
        public string Suburb { get; set; } = null!;
        public string City { get; set; } = null!;
        public bool IsFeatured { get; set; }
        public RestaurantTypeDto RestaurantType { get; set; } = null!;
        public CuisineTypeDto CuisineType { get; internal set; } = null!;
    }
}

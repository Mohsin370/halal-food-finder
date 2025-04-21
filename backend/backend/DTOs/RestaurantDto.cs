namespace backend.DTOs
{
    public class RestaurantDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string Image { get; set; } = null!;
        public string Suburb { get; set; } = null!;
        public string Description { get; set; } = null!;
        public string City { get; set; } = null!;
        public bool IsFeatured { get; set; }
        public int userRatingCount { get; set; }
        public string PlaceId { get; set; } = null!;
        public double rating { get; set; }
        public string Address { get; set; } = null!;
        public RestaurantTypeDto RestaurantType { get; set; } = new RestaurantTypeDto();
        public CuisineTypeDto CuisineType { get; internal set; } = null!;

        public HalalStatusDto HalalStatus { get; set; } = new HalalStatusDto();

        public DateTime CreatedAt { get; set; }

    }
}

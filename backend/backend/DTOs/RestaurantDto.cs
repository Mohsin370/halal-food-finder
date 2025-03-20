namespace backend.DTOs
{
    public class RestaurantDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string Image { get; set; } = null!;
        public string Suburb { get; set; } = null!;
        public string City { get; set; } = null!;
        public bool IsFeatured { get; set; }
        public RestaurantTypeDto RestaurantType { get; set; } = new RestaurantTypeDto();
        public DateTime CreatedAt { get; set; }

    }
}

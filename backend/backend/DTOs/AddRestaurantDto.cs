namespace backend.DTOs
{
    public class AddRestaurantDto
    {
        public string Name { get; set; } = null!;
        public string Image { get; set; } = null!;
        public string Description { get; set; } = null!;
        public string Address { get; set; } = null!;
        public string Suburb { get; set; } = null!;
        public string City { get; set; } = null!;
        public string Country { get; set; } = null!;
        public string State { get; set; } = null!;
        public string PostCode { get; set; } = null!;
        public string Lat { get; set; } = null!;
        public string Lng { get; set; } = null!;

        public string IsFeatured { get; set; } = null!;
        public int cuisineTypeId { get; set; }
        public int restaurantTypeId { get; set; }
        public int halalStatusId { get; set; }

    }
}

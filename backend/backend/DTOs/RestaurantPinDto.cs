using backend.Models;

namespace backend.DTOs
{
    public class RestaurantPinDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string Image { get; set; } = null!;
        public string Lat { get; set; } = null!;
        public string Lng { get; set; } = null!;
        public string Address { get; set; } = null!;
        public string PostCode { get; set; } = null!;


        public CuisineTypeDto CuisineType { get; set; } = new CuisineTypeDto();
        public HalalStatusDto HalalStatus { get; set; } = new HalalStatusDto();
        public RestaurantTypeDto RestaurantType { get; set; } = new RestaurantTypeDto();
    }


}

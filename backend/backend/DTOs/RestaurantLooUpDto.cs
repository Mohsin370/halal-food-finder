using backend.Models;

namespace backend.DTOs
{
    public class RestaurantLookUpDto
    {
        public IReadOnlyList<RestaurantTypeDto> RestaurantType { get; set; } = new List<RestaurantTypeDto>();
        public IReadOnlyList<HalalStatusDto> HalalStatus { get; set; } = new List<HalalStatusDto>();
        public IReadOnlyList<CuisineTypeDto> CuisineType { get; set; } = new List<CuisineTypeDto>();
    }


    public class CuisineTypeDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
    }

    public class RestaurantTypeDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
    }

    public class HalalStatusDto
    {
        public int Id { get; set; }
        public string Status { get; set; } = null!;
        public string Description { get; set; } = null!;
    }
}

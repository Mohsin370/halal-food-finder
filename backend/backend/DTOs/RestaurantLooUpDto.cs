using backend.Models;

namespace backend.DTOs
{
    public class RestaurantLooUpDto
    { 
        public List<RestaurantType> RestaurantType { get; set; } = new List<RestaurantType> ();
        public List<HalalStatus> HalalStatus { get; set; } = new List<HalalStatus>();
    
        public List<CuisineType> CuisineType { get; set;} = new List<CuisineType>();
    }
}

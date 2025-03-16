using backend.DTOs;

namespace backend.Services
{
    public interface IRestaurantService
    {
        Task<IEnumerable<RestaurantDto>> RecentlyAddedAsync();
        Task<RestaurantLookUpDto> RestaurantLookUpAsync();

        Task<IEnumerable<RestaurantPinDto>> RestaurantPinLocation();
    
    }
}

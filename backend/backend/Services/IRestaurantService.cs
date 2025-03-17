using backend.DTOs;
using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Services
{
    public interface IRestaurantService
    {
        Task<IEnumerable<RestaurantDto>> RecentlyAddedAsync();
        Task<RestaurantLookUpDto> RestaurantLookUpAsync();
        Task<IEnumerable<RestaurantPinDto>> RestaurantPinLocation();
        Task<Restaurant> PostRestaurant(AddRestaurantDto dto);

    }
}

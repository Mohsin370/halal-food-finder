using backend.DTOs;
using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Services
{
    public interface IRestaurantService
    {
        Task<IEnumerable<RestaurantDto>> RecentlyAddedAsync();
        Task<IEnumerable<RestaurantDto>> FeaturedRestaurants();
        Task<RestaurantDetailsDto> RestaurantById(int id);
        bool RestaurantAlreadyExists(string placeId);
        Task<RestaurantLookUpDto> RestaurantLookUpAsync();
        Task<IEnumerable<RestaurantPinDto>> RestaurantPinLocation();
        Task<Restaurant> PostRestaurant(AddRestaurantDto dto);
        Task<IEnumerable<RestaurantListingDto>> RestaurantListing(int? cuisineType, double? lat, double? lng);
        
    }
}

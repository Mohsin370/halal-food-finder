using backend.Data;
using backend.DTOs;
using backend.Helpers;
using backend.Models;
using Humanizer;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class RestaurantService : IRestaurantService
    {
        private readonly ServerContext _serverContext;
        private readonly CloudinaryFTP _cloudinaryFTP;
        public RestaurantService(ServerContext serverContext, CloudinaryFTP cloudinaryFTP)
        {
            _serverContext = serverContext;
            _cloudinaryFTP = cloudinaryFTP;
        }

        public async Task<IEnumerable<RestaurantDto>> RecentlyAddedAsync()
        {
            var restaurants = await _serverContext.Restaurants
                .AsNoTracking()
                .OrderByDescending(x => x.CreatedAt)
                .Take(10)
                .Select(r => new RestaurantDto
                {
                    Id = r.Id,
                    Name = r.Name,
                    Image = r.Image,
                    Suburb = r.Suburb,
                    IsFeatured = r.isFeatured,
                    RestaurantType = new RestaurantTypeDto
                    {
                        Id = r.RestaurantType.Id,
                        Name = r.RestaurantType.Name,
                    },
                    City = r.City,
                    CreatedAt = r.CreatedAt
                })
                .ToListAsync();

            return restaurants;

        }

        public async Task<IEnumerable<RestaurantDto>> FeaturedRestaurants()
        {
            var restaurants = await _serverContext.Restaurants
                .AsNoTracking()
                .Where(x=> x.isFeatured == true)
                .OrderByDescending(x => x.CreatedAt)
                .Take(10)
                .Select(r => new RestaurantDto
                {
                    Id = r.Id,
                    Name = r.Name,
                    Image = r.Image,
                    Suburb = r.Suburb,
                    IsFeatured = r.isFeatured,
                    RestaurantType = new RestaurantTypeDto
                    {
                        Id = r.RestaurantType.Id,
                        Name = r.RestaurantType.Name,
                    },
                    City = r.City,
                    CreatedAt = r.CreatedAt
                })
                .ToListAsync();

            return restaurants;

        }

        public async Task<RestaurantLookUpDto> RestaurantLookUpAsync()
        {

            var RestaurantType = await _serverContext.RestaurantTypes
                .AsNoTracking()
                .Select(r => new RestaurantTypeDto
                {
                    Id = r.Id,
                    Name = r.Name
                }).ToListAsync();

            var CuisineType = await _serverContext.CuisineTypes
                .AsNoTracking()
                .Select(r => new CuisineTypeDto
                {
                    Id = r.Id,
                    Name = r.Name
                }).ToListAsync();

            var HalalStatus = await _serverContext.HalalStatuses
                .AsNoTracking()
                .Select(r => new HalalStatusDto
                {
                    Id = r.Id,
                    Status = r.Status
                })
                .ToListAsync();

            var lookupDto = new RestaurantLookUpDto
            {
                RestaurantType = RestaurantType,
                CuisineType = CuisineType,
                HalalStatus = HalalStatus
            };

            return lookupDto;
        }

        public async Task<IEnumerable<RestaurantPinDto>> RestaurantPinLocation()
        {
            var restaurants = await _serverContext.Restaurants
              .AsNoTracking()
              .Select(r => new RestaurantPinDto
              {
                  Id = r.Id,
                  Name = r.Name,
                  Lat = r.Lat,
                  Lng = r.Lng,
                  Address = r.Address,
                  Image = r.Image,
                  PostCode = r.PostCode,
                  CuisineType = new CuisineTypeDto
                  {
                      Id = r.CuisineType.Id,
                      Name = r.CuisineType.Name
                  },
                  HalalStatus = new HalalStatusDto
                  {
                      Id = r.HalalStatus.Id,
                      Status = r.HalalStatus.Status
                  },
                  RestaurantType = new RestaurantTypeDto
                  {
                      Id = r.RestaurantType.Id,
                      Name = r.RestaurantType.Name
                  }
              })
              .ToListAsync();

            return restaurants;

        }

        public async Task<Restaurant> PostRestaurant(AddRestaurantDto dto)
        {
            var uploadResponse = await _cloudinaryFTP.UploadImage(dto.Image);

            if (uploadResponse.Error != null)
            {
                throw new Exception($"Image upload failed: {uploadResponse.Error.Message}");
            }


            var restaurant = new Restaurant
            {
                Name = dto.Name,
                Image = uploadResponse.SecureUrl.ToString(),
                Description = dto.Description,
                Address = dto.Address,
                Suburb = dto.Suburb,
                City = dto.City,
                Country = dto.Country,
                State = dto.State,
                PostCode = dto.PostCode,
                Lat = dto.Lat,
                Lng = dto.Lng,
                isFeatured = Convert.ToBoolean(dto.IsFeatured),
                CuisineTypeId = dto.cuisineTypeId,
                RestaurantTypeId = dto.restaurantTypeId,
                HalalStatusId = dto.halalStatusId
            };

            _serverContext.Restaurants.Add(restaurant);
            await _serverContext.SaveChangesAsync();
            return restaurant;

        }

        public async Task<IEnumerable<RestaurantListingDto>> RestaurantListing()
        {
            var listing = await _serverContext.Restaurants
                .Select(r => new RestaurantListingDto
                {
                    Id = r.Id,
                    Name = r.Name,
                    Image = r.Image,
                    Suburb = r.Suburb,
                    City = r.City,
                    IsFeatured = r.isFeatured,
                    RestaurantType = new RestaurantTypeDto
                    {
                        Id = r.RestaurantType.Id,
                        Name = r.RestaurantType.Name

                    }
                }).ToListAsync();
            return listing;
        }
    }
}

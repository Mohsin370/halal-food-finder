using backend.Data;
using backend.DTOs;
using backend.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class RestaurantService : IRestaurantService
    {
        private readonly ServerContext _serverContext;
        public RestaurantService(ServerContext serverContext)
        {
            _serverContext = serverContext;
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
                    Postcode = r.PostCode,
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
    }
}

using backend.Data;
using backend.DTOs;
using backend.Helpers;
using backend.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NetTopologySuite;
using NetTopologySuite.Geometries;

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
                    Rating = r.rating,
                    userRatingCount = r.userRatingCount,
                    PlaceId = r.PlaceId,
                    RestaurantType = new RestaurantTypeDto
                    {
                        Id = r.RestaurantType.Id,
                        Name = r.RestaurantType.Name,
                    },
                    CuisineType = new CuisineTypeDto
                    {
                        Id = r.CuisineType.Id,
                        Name = r.CuisineType.Name,
                    },
                    CreatedAt = r.CreatedAt
                })
                .ToListAsync();

            return restaurants;

        }

        public async Task<IEnumerable<RestaurantDto>> FeaturedRestaurants()
        {
            var restaurants = await _serverContext.Restaurants
                .AsNoTracking()
                .Where(x => x.isFeatured == true)
                .OrderByDescending(x => x.CreatedAt)
                .Take(10)
                .Select(r => new RestaurantDto
                {
                    Id = r.Id,
                    Name = r.Name,
                    Image = r.Image,
                    Suburb = r.Suburb,
                    IsFeatured = r.isFeatured,
                    Rating = r.rating,
                    userRatingCount = r.userRatingCount,
                    PlaceId = r.PlaceId,
                    RestaurantType = new RestaurantTypeDto
                    {
                        Id = r.RestaurantType.Id,
                        Name = r.RestaurantType.Name,
                    },
                    CuisineType = new CuisineTypeDto
                    {
                        Id = r.CuisineType.Id,
                        Name = r.CuisineType.Name,
                    },
                    CreatedAt = r.CreatedAt
                })
                .ToListAsync();

            return restaurants;
        }

        public async Task<RestaurantDetailsDto> RestaurantById(int id)
        {
            var restaurantById = await _serverContext.Restaurants
                .Where(r => r.Id == id )
                .Select(r => new RestaurantDetailsDto
                {
                    Id = r.Id,
                    Name = r.Name,
                    Image = r.Image,
                    Description = r.Description,
                    Suburb = r.Suburb,
                    IsFeatured = r.isFeatured,
                    Rating = r.rating,
                    userRatingCount = r.userRatingCount,
                    PlaceId = r.PlaceId,
                    Address = r.Address,
                    Lat = double.Parse(r.Lat),
                    Lng = double.Parse(r.Lng),
                    Reviews = r.Reviews.Select(rv => new Review
                    {
                        Id = rv.Id,
                        ReviewerName = rv.ReviewerName,
                        Description = rv.Description,
                        Rating = rv.Rating,
                        Date = rv.Date,
                        RestaurantId = r.Id
                    }),
                    RestaurantType = new RestaurantTypeDto
                    {
                        Id = r.RestaurantType.Id,
                        Name = r.RestaurantType.Name,
                    },
                    CuisineType = new CuisineTypeDto
                    {
                        Id = r.CuisineType.Id,
                        Name = r.CuisineType.Name,
                    },
                    HalalStatus = new HalalStatusDto
                    {
                        Id = r.HalalStatus.Id,
                        Status = r.HalalStatus.Status,
                        Description = r.HalalStatus.Description,
                    },
                    City = r.City,
                    CreatedAt = r.CreatedAt
                }).FirstOrDefaultAsync();

            return restaurantById;

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
                    Status = r.Status,
                    Description = r.Description
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
                      Status = r.HalalStatus.Status,
                      Description = r.HalalStatus.Description
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
            if (RestaurantAlreadyExists(dto.PlaceId))
            {
                return null;
            }

            var uploadResponse = await _cloudinaryFTP.UploadImage(dto.Image);
            var geometryFactory = NtsGeometryServices.Instance.CreateGeometryFactory(srid: 4326);

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
                PlaceId = dto.PlaceId,
                rating = dto.rating,
                userRatingCount = dto.userRatingCount,
                Location = new Point(new Coordinate(double.Parse(dto.Lng), double.Parse(dto.Lat))),
                isFeatured = Convert.ToBoolean(dto.IsFeatured),
                CuisineTypeId = dto.cuisineTypeId,
                RestaurantTypeId = dto.restaurantTypeId,
                HalalStatusId = dto.halalStatusId
            };

            _serverContext.Restaurants.Add(restaurant);
            await _serverContext.SaveChangesAsync();
            return restaurant;

        }

        public async Task<IEnumerable<RestaurantDto>> RestaurantListing(int? cuisineType, double? lat, double? lng)
        {
            var query = _serverContext.Restaurants.AsQueryable();
            if (cuisineType.HasValue)
            {
                query = query.Where(r => r.CuisineType.Id == cuisineType);
            }

            if (lat.HasValue && lng.HasValue)
            {
                var userLocation = new Point(lng.Value, lat.Value) { SRID = 4326 };
                query = query.OrderBy(r => r.Location.Distance(userLocation));
            }


            var listing = await query
                .Select(r => new RestaurantDto
                {
                    Id = r.Id,
                    Name = r.Name,
                    Image = r.Image,
                    Suburb = r.Suburb,
                    IsFeatured = r.isFeatured,
                    Rating = r.rating,
                    userRatingCount = r.userRatingCount,
                    PlaceId = r.PlaceId,
                    RestaurantType = new RestaurantTypeDto
                    {
                        Id = r.RestaurantType.Id,
                        Name = r.RestaurantType.Name
                    },
                    CuisineType = new CuisineTypeDto
                    {
                        Id = r.CuisineType.Id,
                        Name = r.CuisineType.Name
                    },
                })
                .ToListAsync();
            return listing;
        }

        public bool RestaurantAlreadyExists(string placeId)
        {
            return _serverContext.Restaurants.Any(e => e.PlaceId == placeId);

        }
    }
}

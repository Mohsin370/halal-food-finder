using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;
using backend.DTOs;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore.Internal;
using backend.Services;
using Humanizer;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RestaurantsController : ControllerBase
    {
        private readonly ServerContext _context;
        private readonly IRestaurantService _restaurantService;

        public RestaurantsController(ServerContext context, RestaurantService restaurantService, Import_Data import)
        {
            _context = context;
            _restaurantService = restaurantService;
        }

        // GET: api/Restaurants/recent
        [HttpGet("recent")]
        public async Task<ActionResult<IEnumerable<RestaurantDto>>> GetRestaurants()
        {

            var restaurants = await _restaurantService.RecentlyAddedAsync();
            if (restaurants == null)
            {
                return NotFound();
            }
            return Ok(restaurants);
        }


        // GET: api/Restaurants/recent
        [HttpGet("featured")]
        public async Task<ActionResult<IEnumerable<RestaurantDto>>> FeaturedRestaurants()
        {
            var restaurants = await _restaurantService.FeaturedRestaurants();
            if (restaurants == null)
            {
                return NotFound();
            }
            return Ok(restaurants);
        }

        // GET: api/Restaurants/lookup
        [HttpGet("lookup")]
        public async Task<ActionResult<RestaurantLookUpDto>> GetRestaurantLookups()
        {
            var lookupDto = await _restaurantService.RestaurantLookUpAsync();
            return Ok(lookupDto);
        }

        // GET: api/Restaurants/5
        [HttpGet("{id}")]
        public async Task<ActionResult<RestaurantDetailsDto>> GetRestaurant(int id)
        {
            var restaurant = await _restaurantService.RestaurantById(id);

            if (restaurant == null)
            {
                return NotFound();
            }

            return restaurant;
        }

        [HttpGet("listing")]
        public async Task<ActionResult<IEnumerable<RestaurantDto>>> RestaurantListing(int? cuisineType, double? lat, double? lng)
        {
            try
            {
                var listing = await _restaurantService.RestaurantListing(cuisineType, lat, lng);
                return Ok(listing);
            }
            catch (ArgumentException ex)
            {
                // Handle known argument-related issues
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                // Log the exception (not shown here)
                return StatusCode(500, "An unexpected error occurred. Please try again later.");
            }
        }

        // GET: api/Restaurants/mapPin
        [HttpGet("mapPin")]
        public async Task<ActionResult<RestaurantPinDto>> GetRestaurantPinLocation()
        {
            var restaurants = await _restaurantService.RestaurantPinLocation();

            if (restaurants == null)
            {
                return NotFound();
            }
            return Ok(restaurants);
        }


        // PUT: api/Restaurants/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRestaurant(int id, Restaurant restaurant)
        {
            if (id != restaurant.Id)
            {
                return BadRequest();
            }

            _context.Entry(restaurant).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RestaurantExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Restaurants
        [HttpPost]
        public async Task<IActionResult> PostRestaurant([FromBody] AddRestaurantDto dto)
        {
            try
            {
                var restaurant = await _restaurantService.PostRestaurant(dto);
                if (restaurant == null)
                {
                    return Conflict("A restaurant with this PlaceId already exists.");
                }
                return CreatedAtAction("GetRestaurant", new { id = restaurant.Id }, restaurant);
            }
            catch (ValidationException ex)
            {
                return BadRequest(new { message = "Validation Failed!", error = ex.Message });
            }
        }

        // DELETE: api/Restaurants/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRestaurant(int id)
        {
            var restaurant = await _context.Restaurants.FindAsync(id);
            if (restaurant == null)
            {
                return NotFound();
            }

            _context.Restaurants.Remove(restaurant);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RestaurantExists(int id)
        {
            return _context.Restaurants.Any(e => e.Id == id);
        }
    }
}

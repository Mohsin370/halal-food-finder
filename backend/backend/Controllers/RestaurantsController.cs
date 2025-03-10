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

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RestaurantsController : ControllerBase
    {
        private readonly ServerContext _context;

        public RestaurantsController(ServerContext context)
        {
            _context = context;
        }

        // GET: api/Restaurants
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Restaurant>>> GetRestaurants()
        {
            return await _context.Restaurants.ToListAsync();
        }

        [HttpGet("lookup")]
        public async Task<ActionResult<RestaurantLooUpDto>> GetRestaurantLookups()
        {
            var HalalStatus = await _context.HalalStatuses.ToListAsync();
            var CuisineType = await _context.CuisineTypes.ToListAsync();
            var RestaurantType = await _context.RestaurantTypes.ToListAsync();

            var lookupDto =  new RestaurantLooUpDto
            {
                RestaurantType = await _context.RestaurantTypes.ToListAsync(),
                HalalStatus = await _context.HalalStatuses.ToListAsync(),
                CuisineType = await _context.CuisineTypes.ToListAsync(),
            };

            return Ok(lookupDto);

        }

        // GET: api/Restaurants/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Restaurant>> GetRestaurant(int id)
        {
            var restaurant = await _context.Restaurants.FindAsync(id);

            if (restaurant == null)
            {
                return NotFound();
            }

            return restaurant;
        }


        public class RestaurantDTO()
        {
            public Restaurant Restaurant { get; set; }
            public CuisineType CuisineType { get; set; }
            public HalalStatus HalalStatus { get; set; }
            public RestaurantType restaurantType { get; set; }
        }

        // GET: api/Restaurants/mapPin
        [HttpGet("mapPin")]
        public async Task<IActionResult> GetRestaurantPinLocation()
        {
            var restaurant = await _context.Restaurants
              //  .Join(r  => r.RestaurantType)
                .Include(r=>r.RestaurantType)
                .Include(r=>r.HalalStatus)
                .Include(r=>r.CuisineType)
                .ToListAsync();

            if (restaurant == null)
            {
                return NotFound();
            }
            return Ok(restaurant);
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
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Restaurant>> PostRestaurant(Restaurant restaurant)
        {
            try{
                _context.Restaurants.Add(restaurant);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetRestaurant", new { id = restaurant.Id }, restaurant);
            }catch(ValidationException ex)
            {
                return BadRequest( new { message="Validation Failed!", error = ex.Message });
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

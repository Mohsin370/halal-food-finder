using backend.Data;
using backend.DTOs;
using backend.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GooglePlacesController : ControllerBase
    {
        private readonly ServerContext _context;
        private readonly IGooglePlacesService _googleService;

        public GooglePlacesController(ServerContext context, GooglePlaceService googlePlaceService)
        {
            _context = context;
            _googleService = googlePlaceService;
        }

        [HttpGet("autoComplete")]
        public async Task<IActionResult> AutoComplete(string input)
        {
            if (string.IsNullOrWhiteSpace(input))
                return BadRequest("Input cannot be empty.");

            var result = await _googleService.AutoComplete(input);

            //if (result.Contains("Error") || result.Contains("Request failed"))
            //    return StatusCode(500, result);

            return Ok(result);
        }


        [HttpGet("placeDetails")]
        public async Task<IActionResult> placeDetails(string placeId)
        {
            if (string.IsNullOrWhiteSpace(placeId))
                return BadRequest("Input cannot be empty.");

            // Read 'X-Goog-FieldMask' from the incoming request
            if (!Request.Headers.TryGetValue("X-Goog-FieldMask", out var fieldMask))
            {
                return BadRequest("Missing required header: X-Goog-FieldMask");
            }

            var result = await _googleService.PlaceDetails(placeId, fieldMask.ToString());

            if (result == null)
            {
                return StatusCode(500, "Error fetching place details.");
            }

            return Ok(result);
        }

    }
}

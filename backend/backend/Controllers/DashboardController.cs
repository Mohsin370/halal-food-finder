using backend.DTOs;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private readonly DashboardService _dashboardService;
        public DashboardController(DashboardService dashboardService)
        {
            _dashboardService = dashboardService;
        }

        // GET: api/<Dashboard>
        [HttpGet("stats")]
        public async Task<ActionResult<RestaurantStatsDto>> GetRestaurantStats()
        {
            try
            {
                var stats = await _dashboardService.GetRestaurantStats();
                return Ok(stats);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // GET api/<Dashboard>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<Dashboard>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<Dashboard>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<Dashboard>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}

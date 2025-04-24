using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;


namespace backend.Services
{
    public class Import_Data
    {
        private readonly GooglePlaceService _googlePlacesService;
        private readonly ServerContext _context;

        public Import_Data(GooglePlaceService googlePlacesService, ServerContext serverContext)
        {
            _googlePlacesService = googlePlacesService;
            _context = serverContext;
        }

        public class GooglePlaceDetailsResponse
        {
            public List<Reviews> reviews { get; set; }
        }


        public class Reviews
        {
            public DateTime publishTime { get; set; }
            public int rating { get; set; }
            public AuthorAttribution authorAttribution { get; set; }

            public Text text { get; set; }
        }
        public class Text
        {
            public string text { get; set; } // Reviewer's display name
        }
        public class AuthorAttribution
        {
            public string displayName { get; set; } // Reviewer's display name
        }

        public async Task ImportReview()
        {
            var restaurants = await _context.Restaurants.ToListAsync();

            foreach (var restaurant in restaurants)
            {
                var response = await _googlePlacesService.PlaceDetails(restaurant.PlaceId, "reviews");
                var parsed = JsonConvert.DeserializeObject<GooglePlaceDetailsResponse>(response);

                if (parsed.reviews != null && parsed.reviews.Any())
                {

                    var reviewEntries = parsed.reviews?.Select(r => new Review
                    {
                        ReviewerName = r.authorAttribution.displayName,
                        Description = r.text.text,
                        Rating = r.rating,
                        Date = r.publishTime,
                        RestaurantId = restaurant.Id
                    });

                    await _context.Reviews.AddRangeAsync(reviewEntries);
                    await _context.SaveChangesAsync();
                }
            }


        }
    }
}

using System.Text.Json;
using System.Web;

namespace backend.Services
{
    public class GooglePlaceService: IGooglePlacesService
    {
        private readonly HttpClient _httpClient;
        private readonly string _apiKey;
        private const string placesEndPoint = "https://places.googleapis.com/v1/places:";

        public GooglePlaceService( HttpClient httpClient, IConfiguration configuration)
        {
            _httpClient = httpClient;
            _apiKey = configuration["GooglePlaces:ApiKey"];

        }

        public async Task<string> AutoComplete(string? input)
        {
            var encodedInput = HttpUtility.UrlEncode(input);
            var url = $"{placesEndPoint}autocomplete";
            _httpClient.DefaultRequestHeaders.Add("X-Goog-Api-Key", _apiKey);
            _httpClient.DefaultRequestHeaders.Add("X-Goog-FieldMask", "suggestions.placePrediction.placeId,suggestions.placePrediction.text.text");
            var payload = new
            {
                input
            };
            string jsonRequest = JsonSerializer.Serialize(payload);
            var content = new StringContent(jsonRequest);
            try
            {
                var response = await _httpClient.PostAsync(url, content);
                response.EnsureSuccessStatusCode();

                var result = await response.Content.ReadAsStringAsync();
                return result;
                //return JsonConvert.DeserializeObject<GoogleAutocompleteResponseDto>(result);
            }
            catch (HttpRequestException)
            {
                return null;  // Return null in case of an error
            }
        }

    }
}

using backend.Data;
using backend.DTOs;
using CloudinaryDotNet;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Web;

namespace backend.Services
{
    public class GooglePlaceService: IGooglePlacesService
    {
        private readonly HttpClient _httpClient;
        private readonly string _apiKey;
        private const string placesEndPoint = "https://maps.googleapis.com/maps/api/place/autocomplete/json?";

        public GooglePlaceService( HttpClient httpClient, IConfiguration configuration)
        {
            _httpClient = httpClient;
            _apiKey = configuration["GooglePlaces:ApiKey"];

        }

        public async Task<string> AutoComplete(string? input)
        {
            var encodedInput = HttpUtility.UrlEncode(input);
            var url = $"{placesEndPoint}input={encodedInput}&types=geocode&key={_apiKey}";

            try
            {
                var response = await _httpClient.GetAsync(url);
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

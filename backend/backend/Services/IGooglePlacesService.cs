using backend.DTOs;

namespace backend.Services
{
    public interface IGooglePlacesService
    {
        Task<string> AutoComplete(string input);
        Task<string> PlaceDetails(string placeId, string fieldMask);

    }
}

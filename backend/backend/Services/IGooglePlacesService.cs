using backend.DTOs;

namespace backend.Services
{
    public interface IGooglePlacesService
    {
        Task<string> AutoComplete(string input);
        
    }
}

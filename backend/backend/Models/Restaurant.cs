using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using backend.Data;
using Microsoft.AspNetCore.Http.HttpResults;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace backend.Models
{
    public class Restaurant
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string? Name { get; set; }
        [Required]
        public string? Image { get; set; }
        [Required]
        public string? Address { get; set; }
        [Required]
        public string? Suburb { get; set; }
        [Required]
        public string? City { get; set; }
        [Required]
        public string? Country { get; set; }
        [Required]
        public string? State { get; set; }
        [Required]
        public string? PostCode { get; set;  }

        [Required]
        public string? Lat { get; set; }

        [Required]
        public string? Lng { get; set; }

        [Required]
        public int CuisineTypeId { get; set; }
        [JsonIgnore]

        public CuisineType CuisineType { get; set; }

        [Required]
        public int RestaurantTypeId { get; set; }
        [JsonIgnore]
        public RestaurantType RestaurantType { get; set; }

        [Required]
        public int HalalStatusId { get; set; }
        [JsonIgnore]

        public HalalStatus HalalStatus { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;


    }


}
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using backend.Data;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.OpenApi;
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
        [Column(TypeName = "decimal(9,6)")]
        public string? Lat { get; set; }

        [Required]
        [Column(TypeName = "decimal(9,6)")]
        public string? Lng { get; set; }

        [Required]
        public int CuisineTypeId { get; set; }
        public CuisineType CuisineType { get; set; }

        [Required]
        public int RestaurantTypeId { get; set; }
        public RestaurantType RestaurantType { get; set; }

        [Required]
        public int HalalStatusId { get; set; }
        public HalalStatus HalalStatus { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;


    }


}
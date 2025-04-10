using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using NetTopologySuite.Geometries;

namespace backend.Models
{
    public class Restaurant
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; } = null!;
        [Required]
        public string Description { get; set; } = null!;
        [Required]
        public string Image { get; set; } = null!;
        [Required]
        public string Address { get; set; } = null!;
        [Required]
        public string Suburb { get; set; } = null!;
        [Required]
        public string City { get; set; } = null!;
        [Required]
        public string Country { get; set; } = null!;
        [Required]
        public string State { get; set; } = null!;
        [Required]
        public string PostCode { get; set; } = null!;

        [Required]
        public string Lat { get; set; } = null!;

        [Required]
        public string Lng { get; set; } = null!;

        [Column(TypeName = "geometry (point, 4326)")]
        [Required]
        public Point Location { get; set; }

        [Required]
        public string PlaceId { get; set; } = null!;

        [Required]
        public double rating { get; set; }

        [Required] 
        public int userRatingCount { get; set; }


        [Required]
        public bool isFeatured { get; set; } = false;

        [Required]
        public int CuisineTypeId { get; set; }

        public CuisineType CuisineType { get; set; } = null!;

        [Required]
        public int RestaurantTypeId { get; set; }
        public RestaurantType RestaurantType { get; set; } = null!;

        [Required]
        public int HalalStatusId { get; set; }
        public HalalStatus HalalStatus { get; set; } = null!;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;


    }


}
using System.ComponentModel.DataAnnotations;
using backend.Data;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.OpenApi;
using Microsoft.EntityFrameworkCore;

namespace backend.Models
{
    public class Restaurant
    {
        [Key]
        public int id { get; set; }
        [Required]
        public string? Name { get; set; }
        [Required]
        public string? Image { get; set; }
        [Required]
        public string? Suburb { get; set; }
        public string? City { get; set; }
        [Required]
        public string? Country { get; set; }
        [Required]
        public string? State { get; set; }
        [Required]
        public string? PostCode { get; set;  }
        [Required]
        public string? lat { get; set; }
        [Required]
        public string? lng { get; set; }

    }


}
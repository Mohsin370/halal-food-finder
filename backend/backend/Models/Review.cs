using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace backend.Models
{
    public class Review
    {
        [Key]
        public int Id { get; set; }
        public string ReviewerName { get; set; }
        public string Description { get; set; }
        public int Rating { get; set; }
        public DateTime Date { get; set; }


        [Required]
        public int RestaurantId { get; set; }
        [JsonIgnore]
        public Restaurant Restaurant { get; set; }

    }
}

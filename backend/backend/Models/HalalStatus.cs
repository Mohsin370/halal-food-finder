using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class HalalStatus
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string? Status { get; set; }
    }
}

using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class HalalStatus
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public int Status { get; set; }
    }
}

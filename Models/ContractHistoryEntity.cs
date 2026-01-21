using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ContractVerification.Models
{
    [Table("ContractHistory")]
    public class ContractHistoryEntity
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int ContractId { get; set; }

        [Required]
        public ContractStatus OldStatus { get; set; }

        [Required]
        public ContractStatus NewStatus { get; set; }

        [Required]
        [MaxLength(200)]
        public string ChangedBy { get; set; }

        [Required]
        public DateTime ChangedAt { get; set; }

        [MaxLength(1000)]
        public string Comment { get; set; }
    }
}

using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ContractVerification.Models
{
    [Table("Contracts")]
    public class ContractEntity
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string ContractNumber { get; set; }

        [Required]
        public ContractType Type { get; set; }

        [Required]
        public ContractStatus Status { get; set; }

        [Required]
        [MaxLength(200)]
        public string SellerName { get; set; }

        [Required]
        [MaxLength(200)]
        public string BuyerName { get; set; }

        [Required]
        [MaxLength(500)]
        public string PropertyAddress { get; set; }

        [Required]
        [Column(TypeName = "decimal(18, 2)")]
        public decimal ContractAmount { get; set; }

        [Required]
        [MaxLength(200)]
        public string CreatedBy { get; set; }

        [Required]
        public DateTime CreatedAt { get; set; }

        public DateTime? UpdatedAt { get; set; }
    }

    public enum ContractType
    {
        Sale = 1,
        Rental = 2
    }

    public enum ContractStatus
    {
        Pending = 1,
        UnderReview = 2,
        Verified = 3,
        Rejected = 4
    }
}

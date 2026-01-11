using System;
using System.ComponentModel.DataAnnotations;

namespace Najiz.CarRental.Models
{
    public class Rental
    {
        public int Id { get; set; }

        [Required]
        public int CarId { get; set; }

        public Car Car { get; set; }

        [Required]
        [StringLength(100)]
        public string CustomerName { get; set; }

        [Required]
        [StringLength(20)]
        public string CustomerPhone { get; set; }

        [StringLength(100)]
        public string CustomerEmail { get; set; }

        [Required]
        [StringLength(50)]
        public string NationalId { get; set; }

        [Required]
        public DateTime StartDate { get; set; }

        [Required]
        public DateTime EndDate { get; set; }

        public decimal TotalCost { get; set; }

        [Required]
        [StringLength(20)]
        public string Status { get; set; } = "Active"; // Active, Completed, Cancelled

        [StringLength(500)]
        public string Notes { get; set; }

        public DateTime CreatedDate { get; set; } = DateTime.Now;
    }
}

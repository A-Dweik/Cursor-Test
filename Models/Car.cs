using System.ComponentModel.DataAnnotations;

namespace Najiz.CarRental.Models
{
    public class Car
    {
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Brand { get; set; }

        [Required]
        [StringLength(100)]
        public string Model { get; set; }

        [Required]
        public int Year { get; set; }

        [Required]
        [StringLength(50)]
        public string Color { get; set; }

        [Required]
        [StringLength(20)]
        public string PlateNumber { get; set; }

        [Required]
        public decimal DailyRate { get; set; }

        public bool IsAvailable { get; set; } = true;

        [StringLength(500)]
        public string Description { get; set; }

        [StringLength(50)]
        public string FuelType { get; set; }

        public int Seats { get; set; }

        [StringLength(50)]
        public string Transmission { get; set; }
    }
}

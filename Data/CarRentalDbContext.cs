using Microsoft.EntityFrameworkCore;
using Najiz.CarRental.Models;
using System;

namespace Najiz.CarRental.Data
{
    public class CarRentalDbContext : DbContext
    {
        public CarRentalDbContext(DbContextOptions<CarRentalDbContext> options)
            : base(options)
        {
        }

        public DbSet<Car> Cars { get; set; }
        public DbSet<Rental> Rentals { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Seed initial data
            modelBuilder.Entity<Car>().HasData(
                new Car
                {
                    Id = 1,
                    Brand = "تويوتا",
                    Model = "كامري",
                    Year = 2023,
                    Color = "أبيض",
                    PlateNumber = "أ ب ج 1234",
                    DailyRate = 150,
                    IsAvailable = true,
                    Description = "سيارة عائلية مريحة وموفرة للوقود",
                    FuelType = "بنزين",
                    Seats = 5,
                    Transmission = "أوتوماتيك"
                },
                new Car
                {
                    Id = 2,
                    Brand = "هوندا",
                    Model = "أكورد",
                    Year = 2023,
                    Color = "أسود",
                    PlateNumber = "د هـ و 5678",
                    DailyRate = 160,
                    IsAvailable = true,
                    Description = "سيارة أنيقة بمواصفات عالية",
                    FuelType = "بنزين",
                    Seats = 5,
                    Transmission = "أوتوماتيك"
                },
                new Car
                {
                    Id = 3,
                    Brand = "نيسان",
                    Model = "التيما",
                    Year = 2022,
                    Color = "فضي",
                    PlateNumber = "ز ح ط 9012",
                    DailyRate = 140,
                    IsAvailable = true,
                    Description = "سيارة عملية واقتصادية",
                    FuelType = "بنزين",
                    Seats = 5,
                    Transmission = "أوتوماتيك"
                },
                new Car
                {
                    Id = 4,
                    Brand = "هيونداي",
                    Model = "سوناتا",
                    Year = 2023,
                    Color = "أزرق",
                    PlateNumber = "ي ك ل 3456",
                    DailyRate = 145,
                    IsAvailable = true,
                    Description = "سيارة حديثة بتقنيات متطورة",
                    FuelType = "هايبرد",
                    Seats = 5,
                    Transmission = "أوتوماتيك"
                },
                new Car
                {
                    Id = 5,
                    Brand = "كيا",
                    Model = "أوبتيما",
                    Year = 2022,
                    Color = "أحمر",
                    PlateNumber = "م ن س 7890",
                    DailyRate = 135,
                    IsAvailable = false,
                    Description = "سيارة رياضية بأداء ممتاز",
                    FuelType = "بنزين",
                    Seats = 5,
                    Transmission = "أوتوماتيك"
                }
            );

            // Seed a sample rental
            modelBuilder.Entity<Rental>().HasData(
                new Rental
                {
                    Id = 1,
                    CarId = 5,
                    CustomerName = "أحمد محمد علي",
                    CustomerPhone = "0501234567",
                    CustomerEmail = "ahmed@example.com",
                    NationalId = "1234567890",
                    StartDate = DateTime.Now.AddDays(-2),
                    EndDate = DateTime.Now.AddDays(5),
                    TotalCost = 945, // 7 days * 135
                    Status = "Active",
                    Notes = "عقد إيجار تجريبي",
                    CreatedDate = DateTime.Now.AddDays(-2)
                }
            );
        }
    }
}

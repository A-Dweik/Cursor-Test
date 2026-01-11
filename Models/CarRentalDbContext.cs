using Microsoft.EntityFrameworkCore;
using System;

namespace Najiz.CarRentalApp.Models
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

            // Seed some initial car data
            var seedDate = new DateTime(2024, 1, 1, 0, 0, 0, DateTimeKind.Utc);
            
            modelBuilder.Entity<Car>().HasData(
                new Car
                {
                    Id = 1,
                    Make = "تويوتا",
                    Model = "كامري",
                    Year = 2023,
                    Color = "أبيض",
                    PlateNumber = "أ ب ج ١٢٣٤",
                    DailyRate = 200,
                    IsAvailable = true,
                    ImageUrl = "https://via.placeholder.com/300x200?text=Toyota+Camry",
                    Description = "سيارة عائلية فاخرة ومريحة",
                    CreatedAt = seedDate
                },
                new Car
                {
                    Id = 2,
                    Make = "هوندا",
                    Model = "أكورد",
                    Year = 2022,
                    Color = "أسود",
                    PlateNumber = "د هـ و ٥٦٧٨",
                    DailyRate = 180,
                    IsAvailable = true,
                    ImageUrl = "https://via.placeholder.com/300x200?text=Honda+Accord",
                    Description = "سيارة موثوقة واقتصادية",
                    CreatedAt = seedDate
                },
                new Car
                {
                    Id = 3,
                    Make = "نيسان",
                    Model = "التيما",
                    Year = 2023,
                    Color = "فضي",
                    PlateNumber = "ز ح ط ٩٠١٢",
                    DailyRate = 190,
                    IsAvailable = true,
                    ImageUrl = "https://via.placeholder.com/300x200?text=Nissan+Altima",
                    Description = "سيارة عصرية بتقنيات متقدمة",
                    CreatedAt = seedDate
                },
                new Car
                {
                    Id = 4,
                    Make = "هيونداي",
                    Model = "سوناتا",
                    Year = 2022,
                    Color = "أزرق",
                    PlateNumber = "ي ك ل ٣٤٥٦",
                    DailyRate = 170,
                    IsAvailable = true,
                    ImageUrl = "https://via.placeholder.com/300x200?text=Hyundai+Sonata",
                    Description = "سيارة بتصميم رياضي أنيق",
                    CreatedAt = seedDate
                },
                new Car
                {
                    Id = 5,
                    Make = "كيا",
                    Model = "أوبتيما",
                    Year = 2021,
                    Color = "أحمر",
                    PlateNumber = "م ن س ٧٨٩٠",
                    DailyRate = 160,
                    IsAvailable = false,
                    ImageUrl = "https://via.placeholder.com/300x200?text=Kia+Optima",
                    Description = "سيارة متعددة الاستخدامات",
                    CreatedAt = seedDate
                }
            );
        }
    }
}

using System;
using ContractVerification.Models;
using Microsoft.EntityFrameworkCore;

namespace ContractVerification.Data
{
    public class ContractDbContext : DbContext
    {
        public ContractDbContext(DbContextOptions<ContractDbContext> options)
            : base(options)
        {
        }

        public DbSet<ContractEntity> Contracts { get; set; }
        public DbSet<ContractHistoryEntity> ContractHistory { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure Contracts table
            modelBuilder.Entity<ContractEntity>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.ContractNumber).IsRequired().HasMaxLength(50);
                entity.Property(e => e.Type).IsRequired();
                entity.Property(e => e.Status).IsRequired();
                entity.Property(e => e.SellerName).IsRequired().HasMaxLength(200);
                entity.Property(e => e.BuyerName).IsRequired().HasMaxLength(200);
                entity.Property(e => e.PropertyAddress).IsRequired().HasMaxLength(500);
                entity.Property(e => e.ContractAmount).IsRequired().HasColumnType("decimal(18,2)");
                entity.Property(e => e.CreatedBy).IsRequired().HasMaxLength(200);
                entity.Property(e => e.CreatedAt).IsRequired();

                // Indexes
                entity.HasIndex(e => e.ContractNumber).IsUnique();
                entity.HasIndex(e => e.Status);
                entity.HasIndex(e => e.Type);
                entity.HasIndex(e => e.CreatedBy);
                entity.HasIndex(e => e.CreatedAt);
            });

            // Configure ContractHistory table
            modelBuilder.Entity<ContractHistoryEntity>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.ContractId).IsRequired();
                entity.Property(e => e.OldStatus).IsRequired();
                entity.Property(e => e.NewStatus).IsRequired();
                entity.Property(e => e.ChangedBy).IsRequired().HasMaxLength(200);
                entity.Property(e => e.ChangedAt).IsRequired();
                entity.Property(e => e.Comment).HasMaxLength(1000);

                // Foreign key relationship
                entity.HasOne<ContractEntity>()
                    .WithMany()
                    .HasForeignKey(e => e.ContractId)
                    .OnDelete(DeleteBehavior.Cascade);

                // Indexes
                entity.HasIndex(e => e.ContractId);
                entity.HasIndex(e => e.ChangedAt);
            });

            // Seed data for demo/testing
            SeedData(modelBuilder);
        }

        private void SeedData(ModelBuilder modelBuilder)
        {
            // Seed sample contracts
            modelBuilder.Entity<ContractEntity>().HasData(
                new ContractEntity
                {
                    Id = 1,
                    ContractNumber = "CV-2026-001",
                    Type = ContractType.Sale,
                    Status = ContractStatus.Pending,
                    SellerName = "محمد أحمد العلي",
                    BuyerName = "خالد سعد المطيري",
                    PropertyAddress = "الرياض - حي النرجس - فيلا دوبلكس 450م²",
                    ContractAmount = 2500000,
                    CreatedBy = "test",
                    CreatedAt = new DateTime(2026, 1, 15, 10, 30, 0),
                    UpdatedAt = new DateTime(2026, 1, 15, 10, 30, 0)
                },
                new ContractEntity
                {
                    Id = 2,
                    ContractNumber = "CR-2026-045",
                    Type = ContractType.Rental,
                    Status = ContractStatus.Verified,
                    SellerName = "سعد عبدالله الغامدي",
                    BuyerName = "أحمد علي الزهراني",
                    PropertyAddress = "جدة - حي الروضة - شقة مفروشة 180م²",
                    ContractAmount = 3500,
                    CreatedBy = "test2",
                    CreatedAt = new DateTime(2026, 1, 12, 14, 20, 0),
                    UpdatedAt = new DateTime(2026, 1, 13, 9, 15, 0)
                },
                new ContractEntity
                {
                    Id = 3,
                    ContractNumber = "CV-2026-002",
                    Type = ContractType.Sale,
                    Status = ContractStatus.Verified,
                    SellerName = "فهد محمد القحطاني",
                    BuyerName = "عبدالرحمن سليمان الدوسري",
                    PropertyAddress = "الدمام - حي الفيصلية - أرض سكنية 600م²",
                    ContractAmount = 1200000,
                    CreatedBy = "test",
                    CreatedAt = new DateTime(2026, 1, 10, 11, 0, 0),
                    UpdatedAt = new DateTime(2026, 1, 11, 10, 30, 0)
                },
                new ContractEntity
                {
                    Id = 4,
                    ContractNumber = "CR-2026-046",
                    Type = ContractType.Rental,
                    Status = ContractStatus.Rejected,
                    SellerName = "شركة العقارات المتقدمة",
                    BuyerName = "مؤسسة التقنية الحديثة",
                    PropertyAddress = "الرياض - حي العليا - مكتب تجاري 120م²",
                    ContractAmount = 8000,
                    CreatedBy = "test1",
                    CreatedAt = new DateTime(2026, 1, 8, 9, 45, 0),
                    UpdatedAt = new DateTime(2026, 1, 9, 16, 20, 0)
                },
                new ContractEntity
                {
                    Id = 5,
                    ContractNumber = "CV-2026-003",
                    Type = ContractType.Sale,
                    Status = ContractStatus.Pending,
                    SellerName = "ناصر عبدالعزيز الشهري",
                    BuyerName = "مجموعة الاستثمار العقاري",
                    PropertyAddress = "مكة المكرمة - حي العزيزية - عمارة سكنية 1200م²",
                    ContractAmount = 5800000,
                    CreatedBy = "test",
                    CreatedAt = new DateTime(2026, 1, 18, 13, 15, 0),
                    UpdatedAt = new DateTime(2026, 1, 18, 13, 15, 0)
                },
                new ContractEntity
                {
                    Id = 6,
                    ContractNumber = "CR-2026-047",
                    Type = ContractType.Rental,
                    Status = ContractStatus.Verified,
                    SellerName = "عبدالله حسن العتيبي",
                    BuyerName = "مؤسسة التجارة الحديثة",
                    PropertyAddress = "الخبر - حي الكورنيش - محل تجاري 85م²",
                    ContractAmount = 4200,
                    CreatedBy = "test2",
                    CreatedAt = new DateTime(2026, 1, 5, 10, 30, 0),
                    UpdatedAt = new DateTime(2026, 1, 6, 14, 45, 0)
                },
                new ContractEntity
                {
                    Id = 7,
                    ContractNumber = "CV-2026-004",
                    Type = ContractType.Sale,
                    Status = ContractStatus.UnderReview,
                    SellerName = "سالم محمد الحربي",
                    BuyerName = "فيصل أحمد الغامدي",
                    PropertyAddress = "الطائف - حي الشفا - فيلا 350م²",
                    ContractAmount = 1800000,
                    CreatedBy = "test1",
                    CreatedAt = new DateTime(2026, 1, 14, 15, 0, 0),
                    UpdatedAt = new DateTime(2026, 1, 16, 11, 20, 0)
                },
                new ContractEntity
                {
                    Id = 8,
                    ContractNumber = "CR-2026-048",
                    Type = ContractType.Rental,
                    Status = ContractStatus.Pending,
                    SellerName = "يوسف عبدالرحمن المطيري",
                    BuyerName = "خالد سليمان الدوسري",
                    PropertyAddress = "المدينة المنورة - حي العزيزية - شقة 140م²",
                    ContractAmount = 2800,
                    CreatedBy = "test",
                    CreatedAt = new DateTime(2026, 1, 17, 9, 30, 0),
                    UpdatedAt = new DateTime(2026, 1, 17, 9, 30, 0)
                },
                new ContractEntity
                {
                    Id = 9,
                    ContractNumber = "CV-2026-005",
                    Type = ContractType.Sale,
                    Status = ContractStatus.Verified,
                    SellerName = "عبدالملك فهد الشمري",
                    BuyerName = "ماجد سعد القحطاني",
                    PropertyAddress = "أبها - حي الموظفين - أرض تجارية 800م²",
                    ContractAmount = 2100000,
                    CreatedBy = "test2",
                    CreatedAt = new DateTime(2026, 1, 11, 12, 45, 0),
                    UpdatedAt = new DateTime(2026, 1, 12, 16, 30, 0)
                },
                new ContractEntity
                {
                    Id = 10,
                    ContractNumber = "CR-2026-049",
                    Type = ContractType.Rental,
                    Status = ContractStatus.UnderReview,
                    SellerName = "مؤسسة البناء الحديث",
                    BuyerName = "شركة التطوير العقاري",
                    PropertyAddress = "تبوك - حي السلام - مستودع 500م²",
                    ContractAmount = 6500,
                    CreatedBy = "test1",
                    CreatedAt = new DateTime(2026, 1, 16, 14, 20, 0),
                    UpdatedAt = new DateTime(2026, 1, 17, 10, 15, 0)
                }
            );

            // Seed sample history
            modelBuilder.Entity<ContractHistoryEntity>().HasData(
                new ContractHistoryEntity
                {
                    Id = 1,
                    ContractId = 2,
                    OldStatus = ContractStatus.Pending,
                    NewStatus = ContractStatus.UnderReview,
                    ChangedBy = "عبدالله محمد مروان محمد",
                    ChangedAt = new DateTime(2026, 1, 12, 16, 0, 0),
                    Comment = "تم استلام العقد وبدء عملية المراجعة"
                },
                new ContractHistoryEntity
                {
                    Id = 2,
                    ContractId = 2,
                    OldStatus = ContractStatus.UnderReview,
                    NewStatus = ContractStatus.Verified,
                    ChangedBy = "عبدالله محمد مروان محمد",
                    ChangedAt = new DateTime(2026, 1, 13, 9, 15, 0),
                    Comment = "تم التحقق من جميع المستندات والتوقيع الإلكتروني"
                },
                new ContractHistoryEntity
                {
                    Id = 3,
                    ContractId = 3,
                    OldStatus = ContractStatus.Pending,
                    NewStatus = ContractStatus.Verified,
                    ChangedBy = "عبدالله محمد مروان محمد",
                    ChangedAt = new DateTime(2026, 1, 11, 10, 30, 0),
                    Comment = "عقد مكتمل ومطابق للشروط"
                },
                new ContractHistoryEntity
                {
                    Id = 4,
                    ContractId = 4,
                    OldStatus = ContractStatus.Pending,
                    NewStatus = ContractStatus.Rejected,
                    ChangedBy = "عبدالله محمد مروان محمد",
                    ChangedAt = new DateTime(2026, 1, 9, 16, 20, 0),
                    Comment = "المستندات المرفقة غير مكتملة"
                }
            );
        }
    }
}

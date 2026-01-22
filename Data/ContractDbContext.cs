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
                entity.Property(e => e.SellerIdNumber).IsRequired().HasMaxLength(20);
                entity.Property(e => e.BuyerName).IsRequired().HasMaxLength(200);
                entity.Property(e => e.BuyerIdNumber).IsRequired().HasMaxLength(20);
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
                entity.HasIndex(e => e.SellerIdNumber);
                entity.HasIndex(e => e.BuyerIdNumber);
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
            // Seed sample contracts with workflow stages
            modelBuilder.Entity<ContractEntity>().HasData(
                new ContractEntity
                {
                    Id = 1,
                    ContractNumber = "CV-2026-001",
                    Type = ContractType.Sale,
                    Status = ContractStatus.Submitted,  // Stage 1: Awaiting initial review
                    SellerName = "محمد أحمد العلي",
                    SellerIdNumber = "1023456789",
                    BuyerName = "خالد سعد المطيري",
                    BuyerIdNumber = "1098765432",
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
                    Status = ContractStatus.FinalApproved,  // Stage 4: Fully approved
                    SellerName = "سعد عبدالله الغامدي",
                    SellerIdNumber = "1034567890",
                    BuyerName = "أحمد علي الزهراني",
                    BuyerIdNumber = "1087654321",
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
                    Status = ContractStatus.FinalApproved,  // Stage 4: Fully approved
                    SellerName = "فهد محمد القحطاني",
                    SellerIdNumber = "1045678901",
                    BuyerName = "عبدالرحمن سليمان الدوسري",
                    BuyerIdNumber = "1076543210",
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
                    SellerIdNumber = "7001234567",
                    BuyerName = "مؤسسة التقنية الحديثة",
                    BuyerIdNumber = "7007654321",
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
                    Status = ContractStatus.Submitted,  // Stage 1: Awaiting initial review
                    SellerName = "ناصر عبدالعزيز الشهري",
                    SellerIdNumber = "1056789012",
                    BuyerName = "مجموعة الاستثمار العقاري",
                    BuyerIdNumber = "7002345678",
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
                    Status = ContractStatus.FinalApproved,  // Stage 4: Fully approved
                    SellerName = "عبدالله حسن العتيبي",
                    SellerIdNumber = "1067890123",
                    BuyerName = "مؤسسة التجارة الحديثة",
                    BuyerIdNumber = "7003456789",
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
                    Status = ContractStatus.InitialApproved,  // Stage 2: Initial approval granted
                    SellerName = "سالم محمد الحربي",
                    SellerIdNumber = "1078901234",
                    BuyerName = "فيصل أحمد الغامدي",
                    BuyerIdNumber = "1065432109",
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
                    Status = ContractStatus.Submitted,  // Stage 1: Awaiting initial review
                    SellerName = "يوسف عبدالرحمن المطيري",
                    SellerIdNumber = "1089012345",
                    BuyerName = "خالد سليمان الدوسري",
                    BuyerIdNumber = "1054321098",
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
                    Status = ContractStatus.ManagerApproved,  // Stage 3: Manager approved, awaiting final
                    SellerName = "عبدالملك فهد الشمري",
                    SellerIdNumber = "1090123456",
                    BuyerName = "ماجد سعد القحطاني",
                    BuyerIdNumber = "1043210987",
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
                    Status = ContractStatus.InitialApproved,  // Stage 2: Initial approval granted
                    SellerName = "مؤسسة البناء الحديث",
                    SellerIdNumber = "7004567890",
                    BuyerName = "شركة التطوير العقاري",
                    BuyerIdNumber = "7008765432",
                    PropertyAddress = "تبوك - حي السلام - مستودع 500م²",
                    ContractAmount = 6500,
                    CreatedBy = "test1",
                    CreatedAt = new DateTime(2026, 1, 16, 14, 20, 0),
                    UpdatedAt = new DateTime(2026, 1, 17, 10, 15, 0)
                }
            );

            // Seed sample history with workflow progression
            modelBuilder.Entity<ContractHistoryEntity>().HasData(
                // Contract 2 history - Full workflow progression
                new ContractHistoryEntity
                {
                    Id = 1,
                    ContractId = 2,
                    OldStatus = ContractStatus.Submitted,
                    NewStatus = ContractStatus.InitialApproved,
                    ChangedBy = "مراجع أول",
                    ChangedAt = new DateTime(2026, 1, 12, 16, 0, 0),
                    Comment = "تم المراجعة الأولية والموافقة"
                },
                new ContractHistoryEntity
                {
                    Id = 2,
                    ContractId = 2,
                    OldStatus = ContractStatus.InitialApproved,
                    NewStatus = ContractStatus.ManagerApproved,
                    ChangedBy = "مدير الإدارة",
                    ChangedAt = new DateTime(2026, 1, 13, 9, 0, 0),
                    Comment = "تمت موافقة المدير"
                },
                new ContractHistoryEntity
                {
                    Id = 3,
                    ContractId = 2,
                    OldStatus = ContractStatus.ManagerApproved,
                    NewStatus = ContractStatus.FinalApproved,
                    ChangedBy = "الموافقة النهائية",
                    ChangedAt = new DateTime(2026, 1, 13, 9, 15, 0),
                    Comment = "تم التحقق من جميع المستندات والموافقة النهائية"
                },
                // Contract 3 history - Quick approval (skipped to final)
                new ContractHistoryEntity
                {
                    Id = 4,
                    ContractId = 3,
                    OldStatus = ContractStatus.Submitted,
                    NewStatus = ContractStatus.InitialApproved,
                    ChangedBy = "مراجع أول",
                    ChangedAt = new DateTime(2026, 1, 10, 14, 0, 0),
                    Comment = "موافقة أولية"
                },
                new ContractHistoryEntity
                {
                    Id = 5,
                    ContractId = 3,
                    OldStatus = ContractStatus.InitialApproved,
                    NewStatus = ContractStatus.ManagerApproved,
                    ChangedBy = "مدير الإدارة",
                    ChangedAt = new DateTime(2026, 1, 11, 9, 0, 0),
                    Comment = "موافقة المدير"
                },
                new ContractHistoryEntity
                {
                    Id = 6,
                    ContractId = 3,
                    OldStatus = ContractStatus.ManagerApproved,
                    NewStatus = ContractStatus.FinalApproved,
                    ChangedBy = "الموافقة النهائية",
                    ChangedAt = new DateTime(2026, 1, 11, 10, 30, 0),
                    Comment = "عقد مكتمل ومطابق للشروط - موافقة نهائية"
                },
                // Contract 4 history - Rejected
                new ContractHistoryEntity
                {
                    Id = 7,
                    ContractId = 4,
                    OldStatus = ContractStatus.Submitted,
                    NewStatus = ContractStatus.Rejected,
                    ChangedBy = "مراجع أول",
                    ChangedAt = new DateTime(2026, 1, 9, 16, 20, 0),
                    Comment = "المستندات المرفقة غير مكتملة"
                },
                // Contract 6 history - Full workflow
                new ContractHistoryEntity
                {
                    Id = 8,
                    ContractId = 6,
                    OldStatus = ContractStatus.Submitted,
                    NewStatus = ContractStatus.InitialApproved,
                    ChangedBy = "مراجع أول",
                    ChangedAt = new DateTime(2026, 1, 5, 14, 0, 0),
                    Comment = "موافقة أولية"
                },
                new ContractHistoryEntity
                {
                    Id = 9,
                    ContractId = 6,
                    OldStatus = ContractStatus.InitialApproved,
                    NewStatus = ContractStatus.ManagerApproved,
                    ChangedBy = "مدير الإدارة",
                    ChangedAt = new DateTime(2026, 1, 6, 10, 0, 0),
                    Comment = "موافقة المدير"
                },
                new ContractHistoryEntity
                {
                    Id = 10,
                    ContractId = 6,
                    OldStatus = ContractStatus.ManagerApproved,
                    NewStatus = ContractStatus.FinalApproved,
                    ChangedBy = "الموافقة النهائية",
                    ChangedAt = new DateTime(2026, 1, 6, 14, 45, 0),
                    Comment = "موافقة نهائية"
                },
                // Contract 7 history - At initial approval stage
                new ContractHistoryEntity
                {
                    Id = 11,
                    ContractId = 7,
                    OldStatus = ContractStatus.Submitted,
                    NewStatus = ContractStatus.InitialApproved,
                    ChangedBy = "مراجع أول",
                    ChangedAt = new DateTime(2026, 1, 16, 11, 20, 0),
                    Comment = "موافقة أولية - في انتظار موافقة المدير"
                },
                // Contract 9 history - At manager approval stage
                new ContractHistoryEntity
                {
                    Id = 12,
                    ContractId = 9,
                    OldStatus = ContractStatus.Submitted,
                    NewStatus = ContractStatus.InitialApproved,
                    ChangedBy = "مراجع أول",
                    ChangedAt = new DateTime(2026, 1, 11, 15, 0, 0),
                    Comment = "موافقة أولية"
                },
                new ContractHistoryEntity
                {
                    Id = 13,
                    ContractId = 9,
                    OldStatus = ContractStatus.InitialApproved,
                    NewStatus = ContractStatus.ManagerApproved,
                    ChangedBy = "مدير الإدارة",
                    ChangedAt = new DateTime(2026, 1, 12, 16, 30, 0),
                    Comment = "موافقة المدير - في انتظار الموافقة النهائية"
                },
                // Contract 10 history - At initial approval stage
                new ContractHistoryEntity
                {
                    Id = 14,
                    ContractId = 10,
                    OldStatus = ContractStatus.Submitted,
                    NewStatus = ContractStatus.InitialApproved,
                    ChangedBy = "مراجع أول",
                    ChangedAt = new DateTime(2026, 1, 17, 10, 15, 0),
                    Comment = "موافقة أولية"
                }
            );
        }
    }
}

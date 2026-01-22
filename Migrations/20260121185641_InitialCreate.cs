using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ContractVerification.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Contracts",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ContractNumber = table.Column<string>(maxLength: 50, nullable: false),
                    Type = table.Column<int>(nullable: false),
                    Status = table.Column<int>(nullable: false),
                    SellerName = table.Column<string>(maxLength: 200, nullable: false),
                    BuyerName = table.Column<string>(maxLength: 200, nullable: false),
                    PropertyAddress = table.Column<string>(maxLength: 500, nullable: false),
                    ContractAmount = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    CreatedBy = table.Column<string>(maxLength: 200, nullable: false),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    UpdatedAt = table.Column<DateTime>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Contracts", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ContractHistory",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ContractId = table.Column<int>(nullable: false),
                    OldStatus = table.Column<int>(nullable: false),
                    NewStatus = table.Column<int>(nullable: false),
                    ChangedBy = table.Column<string>(maxLength: 200, nullable: false),
                    ChangedAt = table.Column<DateTime>(nullable: false),
                    Comment = table.Column<string>(maxLength: 1000, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ContractHistory", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ContractHistory_Contracts_ContractId",
                        column: x => x.ContractId,
                        principalTable: "Contracts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ContractHistory_ChangedAt",
                table: "ContractHistory",
                column: "ChangedAt");

            migrationBuilder.CreateIndex(
                name: "IX_ContractHistory_ContractId",
                table: "ContractHistory",
                column: "ContractId");

            migrationBuilder.CreateIndex(
                name: "IX_Contracts_ContractNumber",
                table: "Contracts",
                column: "ContractNumber",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Contracts_CreatedAt",
                table: "Contracts",
                column: "CreatedAt");

            migrationBuilder.CreateIndex(
                name: "IX_Contracts_CreatedBy",
                table: "Contracts",
                column: "CreatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_Contracts_Status",
                table: "Contracts",
                column: "Status");

            migrationBuilder.CreateIndex(
                name: "IX_Contracts_Type",
                table: "Contracts",
                column: "Type");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ContractHistory");

            migrationBuilder.DropTable(
                name: "Contracts");
        }
    }
}

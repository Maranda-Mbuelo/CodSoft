using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProjectManagementTool.Migrations
{
    public partial class SecondMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "owner",
                table: "Projects",
                newName: "Owner");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Owner",
                table: "Projects",
                newName: "owner");
        }
    }
}

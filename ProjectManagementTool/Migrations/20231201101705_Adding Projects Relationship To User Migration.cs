using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProjectManagementTool.Migrations
{
    public partial class AddingProjectsRelationshipToUserMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Projects_Users_OwnerUserUserId",
                table: "Projects");

            migrationBuilder.DropIndex(
                name: "IX_Projects_OwnerUserUserId",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "OwnerUserUserId",
                table: "Projects");

            migrationBuilder.CreateIndex(
                name: "IX_Projects_Owner",
                table: "Projects",
                column: "Owner");

            migrationBuilder.AddForeignKey(
                name: "FK_Projects_Users_Owner",
                table: "Projects",
                column: "Owner",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Projects_Users_Owner",
                table: "Projects");

            migrationBuilder.DropIndex(
                name: "IX_Projects_Owner",
                table: "Projects");

            migrationBuilder.AddColumn<Guid>(
                name: "OwnerUserUserId",
                table: "Projects",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Projects_OwnerUserUserId",
                table: "Projects",
                column: "OwnerUserUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Projects_Users_OwnerUserUserId",
                table: "Projects",
                column: "OwnerUserUserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

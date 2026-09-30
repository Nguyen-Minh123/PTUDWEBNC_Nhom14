using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CulinaryBlog.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class MergeFinalSchema : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Recipes_AspNetUsers_AuthorId1",
                table: "Recipes");

            migrationBuilder.DropForeignKey(
                name: "FK_Recipes_Categories_CategoryId1",
                table: "Recipes");

            migrationBuilder.DropIndex(
                name: "IX_Recipes_AuthorId1",
                table: "Recipes");

            migrationBuilder.DropIndex(
                name: "IX_Recipes_CategoryId1",
                table: "Recipes");

            migrationBuilder.DropColumn(
                name: "AuthorId1",
                table: "Recipes");

            migrationBuilder.DropColumn(
                name: "CategoryId1",
                table: "Recipes");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AuthorId1",
                table: "Recipes",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "CategoryId1",
                table: "Recipes",
                type: "uuid",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Recipes_AuthorId1",
                table: "Recipes",
                column: "AuthorId1");

            migrationBuilder.CreateIndex(
                name: "IX_Recipes_CategoryId1",
                table: "Recipes",
                column: "CategoryId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Recipes_AspNetUsers_AuthorId1",
                table: "Recipes",
                column: "AuthorId1",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Recipes_Categories_CategoryId1",
                table: "Recipes",
                column: "CategoryId1",
                principalTable: "Categories",
                principalColumn: "Id");
        }
    }
}

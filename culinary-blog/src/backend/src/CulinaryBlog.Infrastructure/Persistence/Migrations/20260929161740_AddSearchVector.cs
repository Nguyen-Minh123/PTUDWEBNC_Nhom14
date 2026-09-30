using System;
using Microsoft.EntityFrameworkCore.Migrations;
using NpgsqlTypes;

#nullable disable

namespace CulinaryBlog.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddSearchVector : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("Npgsql:PostgresExtension:unaccent", ",,");

            migrationBuilder.Sql("ALTER FUNCTION unaccent(text) IMMUTABLE;");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "RefreshTokens");

            migrationBuilder.AddColumn<string>(
                name: "Token",
                table: "RefreshTokens",
                type: "character varying(200)",
                maxLength: 200,
                nullable: false,
                defaultValue: "");

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

            migrationBuilder.AddColumn<NpgsqlTsVector>(
                name: "SearchVector",
                table: "Recipes",
                type: "tsvector",
                nullable: true,
                computedColumnSql: "to_tsvector('simple', unaccent(coalesce(\"Title\", '')) || ' ' || unaccent(coalesce(\"Description\", '')) || ' ' || unaccent(coalesce(\"Instructions\", '')))",
                stored: true);

            migrationBuilder.CreateIndex(
                name: "IX_Recipes_AuthorId1",
                table: "Recipes",
                column: "AuthorId1");

            migrationBuilder.CreateIndex(
                name: "IX_Recipes_CategoryId1",
                table: "Recipes",
                column: "CategoryId1");

            migrationBuilder.CreateIndex(
                name: "IX_Recipes_SearchVector",
                table: "Recipes",
                column: "SearchVector")
                .Annotation("Npgsql:IndexMethod", "GIN");

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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

            migrationBuilder.DropIndex(
                name: "IX_Recipes_SearchVector",
                table: "Recipes");

            migrationBuilder.DropColumn(
                name: "SearchVector",
                table: "Recipes");

            migrationBuilder.DropColumn(
                name: "Token",
                table: "RefreshTokens");

            migrationBuilder.DropColumn(
                name: "AuthorId1",
                table: "Recipes");

            migrationBuilder.DropColumn(
                name: "CategoryId1",
                table: "Recipes");

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "RefreshTokens",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }
    }
}

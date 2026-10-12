using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CulinaryBlog.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class UsePostgresXminRowVersion : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(name: "RowVersion", table: "RecipeSteps");
            migrationBuilder.DropColumn(name: "RowVersion", table: "Recipes");
            migrationBuilder.DropColumn(name: "RowVersion", table: "RecipeIngredients");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<byte[]>(
                name: "RowVersion",
                table: "RecipeSteps",
                type: "bytea",
                rowVersion: true,
                nullable: false,
                defaultValueSql: "decode('', 'hex')");
            migrationBuilder.AddColumn<byte[]>(
                name: "RowVersion",
                table: "Recipes",
                type: "bytea",
                rowVersion: true,
                nullable: false,
                defaultValueSql: "decode('', 'hex')");
            migrationBuilder.AddColumn<byte[]>(
                name: "RowVersion",
                table: "RecipeIngredients",
                type: "bytea",
                rowVersion: true,
                nullable: false,
                defaultValueSql: "decode('', 'hex')");

            migrationBuilder.Sql("ALTER TABLE \"RecipeSteps\" ALTER COLUMN \"RowVersion\" DROP DEFAULT;");
            migrationBuilder.Sql("ALTER TABLE \"Recipes\" ALTER COLUMN \"RowVersion\" DROP DEFAULT;");
            migrationBuilder.Sql("ALTER TABLE \"RecipeIngredients\" ALTER COLUMN \"RowVersion\" DROP DEFAULT;");
        }
    }
}

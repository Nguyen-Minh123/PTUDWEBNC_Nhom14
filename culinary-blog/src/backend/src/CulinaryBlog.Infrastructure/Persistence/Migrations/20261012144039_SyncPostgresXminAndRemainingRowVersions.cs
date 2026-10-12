using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CulinaryBlog.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class SyncPostgresXminAndRemainingRowVersions : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("ALTER TABLE \"Categories\" DROP COLUMN IF EXISTS \"RowVersion\";");
            migrationBuilder.Sql("ALTER TABLE \"RecipeImages\" DROP COLUMN IF EXISTS \"RowVersion\";");
            migrationBuilder.Sql("ALTER TABLE \"RecipeSteps\" DROP COLUMN IF EXISTS \"RowVersion\";");
            migrationBuilder.Sql("ALTER TABLE \"Recipes\" DROP COLUMN IF EXISTS \"RowVersion\";");
            migrationBuilder.Sql("ALTER TABLE \"RecipeIngredients\" DROP COLUMN IF EXISTS \"RowVersion\";");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
        }
    }
}

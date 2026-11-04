using Microsoft.EntityFrameworkCore.Migrations;

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

            migrationBuilder.Sql(
                """
                CREATE TABLE IF NOT EXISTS "RefreshTokens" (
                    "Id" uuid NOT NULL,
                    "CreatedAt" timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
                    "ExpiresAt" timestamp with time zone NOT NULL,
                    "IsRevoked" boolean NOT NULL,
                    "IsUsed" boolean NOT NULL,
                    "ReplacedByTokenHash" text,
                    "TokenHash" character varying(64) NOT NULL DEFAULT '',
                    "UserId" text NOT NULL,
                    CONSTRAINT "PK_RefreshTokens" PRIMARY KEY ("Id"),
                    CONSTRAINT "FK_RefreshTokens_AspNetUsers_UserId"
                        FOREIGN KEY ("UserId") REFERENCES "AspNetUsers" ("Id") ON DELETE CASCADE
                );

                ALTER TABLE "RefreshTokens" DROP COLUMN IF EXISTS "CreatedAt";
                ALTER TABLE "RefreshTokens"
                    ADD COLUMN IF NOT EXISTS "Token" character varying(200) NOT NULL DEFAULT '';
                ALTER TABLE "RefreshTokens"
                    ADD COLUMN IF NOT EXISTS "TokenHash" character varying(64) NOT NULL DEFAULT '';
                ALTER TABLE "RefreshTokens" ALTER COLUMN "Token" DROP DEFAULT;
                ALTER TABLE "RefreshTokens" ALTER COLUMN "TokenHash" DROP DEFAULT;

                ALTER TABLE "AspNetUsers"
                    ADD COLUMN IF NOT EXISTS "FirstName" text NOT NULL DEFAULT '';
                ALTER TABLE "AspNetUsers" ALTER COLUMN "FirstName" DROP DEFAULT;
                ALTER TABLE "AspNetUsers"
                    ADD COLUMN IF NOT EXISTS "LastName" text NOT NULL DEFAULT '';
                ALTER TABLE "AspNetUsers" ALTER COLUMN "LastName" DROP DEFAULT;

                CREATE INDEX IF NOT EXISTS "IX_RefreshTokens_TokenHash" ON "RefreshTokens" ("TokenHash");
                CREATE INDEX IF NOT EXISTS "IX_RefreshTokens_UserId" ON "RefreshTokens" ("UserId");
                """);

            migrationBuilder.Sql(
                """
                DO $$
                BEGIN
                    IF NOT EXISTS (
                        SELECT 1
                        FROM pg_constraint
                        WHERE conname = 'FK_RefreshTokens_AspNetUsers_UserId'
                          AND conrelid = '"RefreshTokens"'::regclass
                    ) THEN
                        ALTER TABLE "RefreshTokens"
                            ADD CONSTRAINT "FK_RefreshTokens_AspNetUsers_UserId"
                            FOREIGN KEY ("UserId") REFERENCES "AspNetUsers" ("Id") ON DELETE CASCADE;
                    END IF;
                END $$;
                """);

            migrationBuilder.Sql(
                """
                ALTER TABLE "Recipes" ADD COLUMN IF NOT EXISTS "AuthorId1" text;
                ALTER TABLE "Recipes" ADD COLUMN IF NOT EXISTS "CategoryId1" uuid;
                ALTER TABLE "Recipes"
                    ADD COLUMN IF NOT EXISTS "SearchVector" tsvector
                    GENERATED ALWAYS AS (
                        to_tsvector('simple', unaccent(coalesce("Title", '')) || ' ' ||
                            unaccent(coalesce("Description", '')) || ' ' ||
                            unaccent(coalesce("Instructions", '')))
                    ) STORED;

                CREATE INDEX IF NOT EXISTS "IX_Recipes_AuthorId1" ON "Recipes" ("AuthorId1");
                CREATE INDEX IF NOT EXISTS "IX_Recipes_CategoryId1" ON "Recipes" ("CategoryId1");
                CREATE INDEX IF NOT EXISTS "IX_Recipes_SearchVector" ON "Recipes" USING GIN ("SearchVector");

                DO $$
                BEGIN
                    IF NOT EXISTS (
                        SELECT 1 FROM pg_constraint
                        WHERE conname = 'FK_Recipes_AspNetUsers_AuthorId1'
                          AND conrelid = '"Recipes"'::regclass
                    ) THEN
                        ALTER TABLE "Recipes"
                            ADD CONSTRAINT "FK_Recipes_AspNetUsers_AuthorId1"
                            FOREIGN KEY ("AuthorId1") REFERENCES "AspNetUsers" ("Id");
                    END IF;

                    IF NOT EXISTS (
                        SELECT 1 FROM pg_constraint
                        WHERE conname = 'FK_Recipes_Categories_CategoryId1'
                          AND conrelid = '"Recipes"'::regclass
                    ) THEN
                        ALTER TABLE "Recipes"
                            ADD CONSTRAINT "FK_Recipes_Categories_CategoryId1"
                            FOREIGN KEY ("CategoryId1") REFERENCES "Categories" ("Id");
                    END IF;
                END $$;
                """);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(
                """
                ALTER TABLE "Recipes" DROP CONSTRAINT IF EXISTS "FK_Recipes_AspNetUsers_AuthorId1";
                DROP INDEX IF EXISTS "IX_Recipes_AuthorId1";
                DROP INDEX IF EXISTS "IX_Recipes_SearchVector";
                ALTER TABLE "Recipes" DROP COLUMN IF EXISTS "SearchVector";
                ALTER TABLE "Recipes" DROP COLUMN IF EXISTS "AuthorId1";
                """);
        }
    }
}

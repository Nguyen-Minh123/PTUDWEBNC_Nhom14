using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CulinaryBlog.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class RepairRefreshTokenAndUserSchema : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(
                """
                ALTER TABLE "AspNetUsers"
                    ADD COLUMN IF NOT EXISTS "FirstName" text NOT NULL DEFAULT '';
                ALTER TABLE "AspNetUsers" ALTER COLUMN "FirstName" DROP DEFAULT;
                ALTER TABLE "AspNetUsers"
                    ADD COLUMN IF NOT EXISTS "LastName" text NOT NULL DEFAULT '';
                ALTER TABLE "AspNetUsers" ALTER COLUMN "LastName" DROP DEFAULT;

                CREATE TABLE IF NOT EXISTS "RefreshTokens" (
                    "Id" uuid NOT NULL,
                    "ExpiresAt" timestamp with time zone NOT NULL,
                    "IsRevoked" boolean NOT NULL DEFAULT FALSE,
                    "IsUsed" boolean NOT NULL DEFAULT FALSE,
                    "ReplacedByTokenHash" text,
                    "Token" character varying(200) NOT NULL DEFAULT '',
                    "TokenHash" character varying(64) NOT NULL DEFAULT '',
                    "UserId" text NOT NULL,
                    CONSTRAINT "PK_RefreshTokens" PRIMARY KEY ("Id")
                );

                ALTER TABLE "RefreshTokens"
                    ADD COLUMN IF NOT EXISTS "ExpiresAt" timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP;
                ALTER TABLE "RefreshTokens"
                    ADD COLUMN IF NOT EXISTS "IsRevoked" boolean NOT NULL DEFAULT FALSE;
                ALTER TABLE "RefreshTokens"
                    ADD COLUMN IF NOT EXISTS "IsUsed" boolean NOT NULL DEFAULT FALSE;
                ALTER TABLE "RefreshTokens"
                    ADD COLUMN IF NOT EXISTS "ReplacedByTokenHash" text;
                ALTER TABLE "RefreshTokens"
                    ADD COLUMN IF NOT EXISTS "Token" character varying(200) NOT NULL DEFAULT '';
                ALTER TABLE "RefreshTokens"
                    ADD COLUMN IF NOT EXISTS "TokenHash" character varying(64) NOT NULL DEFAULT '';
                ALTER TABLE "RefreshTokens"
                    ADD COLUMN IF NOT EXISTS "UserId" text NOT NULL DEFAULT '';

                ALTER TABLE "RefreshTokens" ALTER COLUMN "IsRevoked" DROP DEFAULT;
                ALTER TABLE "RefreshTokens" ALTER COLUMN "IsUsed" DROP DEFAULT;
                ALTER TABLE "RefreshTokens" ALTER COLUMN "Token" DROP DEFAULT;
                ALTER TABLE "RefreshTokens" ALTER COLUMN "TokenHash" DROP DEFAULT;
                ALTER TABLE "RefreshTokens" ALTER COLUMN "UserId" DROP DEFAULT;

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

                CREATE INDEX IF NOT EXISTS "IX_RefreshTokens_TokenHash" ON "RefreshTokens" ("TokenHash");
                CREATE INDEX IF NOT EXISTS "IX_RefreshTokens_UserId" ON "RefreshTokens" ("UserId");
                """);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
        }
    }
}

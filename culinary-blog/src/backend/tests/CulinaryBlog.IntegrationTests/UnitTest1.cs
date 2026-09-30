using System.Diagnostics;
using CulinaryBlog.Domain.Entities;
using CulinaryBlog.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Npgsql;
using Xunit.Abstractions;

namespace CulinaryBlog.IntegrationTests;

public class UnitTest1
{
    private readonly ITestOutputHelper _output;

    public UnitTest1(ITestOutputHelper output)
    {
        _output = output;
    }

    [Fact]
    public async Task Unaccent_matches_accented_text_in_full_text_search()
    {
        await using var connection = new NpgsqlConnection(GetConnectionString());
        await connection.OpenAsync();

        await using (var extensionCommand = new NpgsqlCommand("CREATE EXTENSION IF NOT EXISTS unaccent;", connection))
        {
            await extensionCommand.ExecuteNonQueryAsync();
        }

        await using var command = new NpgsqlCommand(
            """
            SELECT
                to_tsvector('simple', unaccent(@document)) @@ plainto_tsquery('simple', unaccent(@matchingQuery)),
                to_tsvector('simple', unaccent(@document)) @@ plainto_tsquery('simple', unaccent(@differentQuery));
            """,
            connection);
        command.Parameters.AddWithValue("document", "Cà phê sữa đá ở Sài Gòn");
        command.Parameters.AddWithValue("matchingQuery", "ca phe sua da o sai gon");
        command.Parameters.AddWithValue("differentQuery", "pho bo");

        await using var reader = await command.ExecuteReaderAsync();
        Assert.True(await reader.ReadAsync());
        Assert.True(reader.GetBoolean(0));
        Assert.False(reader.GetBoolean(1));
    }

    [Fact]
    public async Task AsNoTracking_reports_query_timing_and_does_not_track_entities()
    {
        await using var dbContext = CreateDbContext();
        await dbContext.Database.MigrateAsync();

        if (!await dbContext.Recipes.AnyAsync())
        {
            await new RecipeDataSeeder(dbContext).SeedAsync();
        }

        await LoadRecipesAsync(asNoTracking: false);
        dbContext.ChangeTracker.Clear();
        await LoadRecipesAsync(asNoTracking: true);
        dbContext.ChangeTracker.Clear();

        const int iterations = 10;
        var trackedTimer = Stopwatch.StartNew();
        var trackedRecipeCount = 0;
        var trackedEntityCount = 0;

        for (var iteration = 0; iteration < iterations; iteration++)
        {
            dbContext.ChangeTracker.Clear();
            var recipes = await LoadRecipesAsync(asNoTracking: false);
            trackedRecipeCount = recipes.Count;
            trackedEntityCount = dbContext.ChangeTracker.Entries().Count();
        }

        trackedTimer.Stop();

        var noTrackingTimer = Stopwatch.StartNew();
        var noTrackingRecipeCount = 0;

        for (var iteration = 0; iteration < iterations; iteration++)
        {
            dbContext.ChangeTracker.Clear();
            noTrackingRecipeCount = (await LoadRecipesAsync(asNoTracking: true)).Count;
        }

        noTrackingTimer.Stop();

        Assert.Equal(trackedRecipeCount, noTrackingRecipeCount);
        Assert.True(trackedEntityCount > 0);
        Assert.Empty(dbContext.ChangeTracker.Entries());

        _output.WriteLine(
            "Tracking: {0:F2} ms/query; AsNoTracking: {1:F2} ms/query; tracked entities: {2}",
            trackedTimer.Elapsed.TotalMilliseconds / iterations,
            noTrackingTimer.Elapsed.TotalMilliseconds / iterations,
            trackedEntityCount);

        async Task<List<Recipe>> LoadRecipesAsync(bool asNoTracking)
        {
            IQueryable<Recipe> query = dbContext.Recipes
                .Include(recipe => recipe.Ingredients)
                .Include(recipe => recipe.Steps)
                .AsSplitQuery();

            if (asNoTracking)
            {
                query = query.AsNoTracking();
            }

            return await query.ToListAsync();
        }
    }

    private static string GetConnectionString() =>
        Environment.GetEnvironmentVariable("ConnectionStrings__DefaultConnection")
        ?? "Host=localhost;Port=5432;Database=CulinaryBlogDb;Username=postgres;Password=postgres";

    private static CulinaryBlogDbContext CreateDbContext()
    {
        var options = new DbContextOptionsBuilder<CulinaryBlogDbContext>()
            .UseNpgsql(GetConnectionString())
            .Options;

        return new CulinaryBlogDbContext(options);

    }
}

using Npgsql;

namespace CulinaryBlog.IntegrationTests;

public class UnitTest1
{
    [Fact]
    public async Task Unaccent_matches_accented_text_in_full_text_search()
    {
        var connectionString = Environment.GetEnvironmentVariable("ConnectionStrings__DefaultConnection")
            ?? "Host=localhost;Port=5432;Database=CulinaryBlogDb;Username=postgres;Password=postgres";
        await using var connection = new NpgsqlConnection(connectionString);
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
}

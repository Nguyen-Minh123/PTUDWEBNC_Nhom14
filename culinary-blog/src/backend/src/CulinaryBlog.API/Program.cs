var builder = WebApplication.CreateBuilder(args);

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapGet("/", () => "Hello World! Culinary Blog Backend is running on .NET 10.");
}

app.Run();
namespace CulinaryBlog.Domain.Entities;

public class RecipeIngredient : BaseEntity
{
    private RecipeIngredient()
    {
    }

    internal RecipeIngredient(string name, decimal? quantity, string? unit)
    {
        if (string.IsNullOrWhiteSpace(name))
        {
            throw new ArgumentException("Ingredient name is required.", nameof(name));
        }

        if (quantity is < 0)
        {
            throw new ArgumentOutOfRangeException(nameof(quantity), "Ingredient quantity cannot be negative.");
        }

        Name = name.Trim();
        Quantity = quantity;
        Unit = string.IsNullOrWhiteSpace(unit) ? null : unit.Trim();
    }

    public string Name { get; private set; } = null!;

    public decimal? Quantity { get; private set; }

    public string? Unit { get; private set; }
}

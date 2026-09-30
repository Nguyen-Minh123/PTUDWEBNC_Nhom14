using Bogus;
using CulinaryBlog.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace CulinaryBlog.Infrastructure.Persistence;

public sealed class RecipeDataSeeder(CulinaryBlogDbContext dbContext)
{
    private static readonly string[] DishNames =
    [
        "Beef Pho",
        "Chicken Curry",
        "Lemongrass Pork",
        "Vegetable Spring Rolls",
        "Garlic Fried Rice",
        "Caramelized Fish",
        "Coconut Pancakes",
        "Tomato Noodle Soup",
        "Grilled Pork Vermicelli",
        "Beef Stew with Baguette",
        "Shrimp and Glass Noodle Salad",
        "Crispy Rice Crepes",
        "Sweet and Sour Fish",
        "Braised Pork with Eggs",
        "Mushroom Congee",
        "Chili Lemongrass Tofu",
        "Chicken and Cabbage Salad",
        "Garnish with fresh herbs and serve while warm."
    ];

    private static readonly string[] IngredientNames =
    [
        "Beef", "Chicken", "Pork", "Tofu", "Shrimp", "Fish",
        "Garlic", "Onion", "Ginger", "Lemongrass", "Chili",
        "Rice", "Noodles", "Cabbage", "Tomato", "Mushroom",
        "Fish Sauce", "Soy Sauce", "Coconut Milk", "Sugar"
    ];

    private static readonly string[] CookingInstructions =
    [
        "Prepare the ingredients.",
        "Heat oil in a pan.",
        "Stir-fry until fragrant.",
        "Add main ingredients and cook.",
        "Pour in the sauce and simmer.",
        "Taste and adjust seasoning.",
        "Serve hot with rice or noodles.",
        "Garnish with herbs."
    ];

    public async Task SeedAsync(CancellationToken cancellationToken = default)
    {
        if (await dbContext.Recipes.AnyAsync(cancellationToken))
        {
            return;
        }

        // Must have at least one Category to create a Recipe.
        // We do NOT insert a Category here — RowVersion is DB-generated and cannot be set manually.
        var category = await dbContext.Categories.FirstOrDefaultAsync(cancellationToken);
        if (category == null)
        {
            // No categories seeded yet — skip recipe seeding.
            return;
        }

        var authorId = "seeder-user-id";

        var faker = new Faker("en");
        var recipes = DishNames
            .Select(dishName => CreateRecipe(faker, dishName, category.Id, authorId))
            .ToArray();

        await dbContext.Recipes.AddRangeAsync(recipes, cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken);
    }

    private static Recipe CreateRecipe(Faker faker, string dishName, Guid categoryId, string authorId)
    {
        var slug = dishName.ToLowerInvariant().Replace(' ', '-');
        var nutrition = new RecipeNutrition
        {
            Calories = faker.Random.Decimal(100, 800),
            Protein = faker.Random.Decimal(5, 60),
            Carbohydrates = faker.Random.Decimal(10, 120),
            Fat = faker.Random.Decimal(1, 50),
            Fiber = faker.Random.Decimal(1, 30),
            Sodium = faker.Random.Decimal(1, 80)
        };

        var recipe = new Recipe(
            title: dishName,
            slug: slug,
            description: faker.Lorem.Paragraph(),
            instructions: "Follow the steps.",
            prepTime: faker.Random.Int(10, 60),
            cookTime: faker.Random.Int(15, 120),
            servings: faker.Random.Int(2, 6),
            difficulty: faker.PickRandom<RecipeDifficulty>(),
            categoryId: categoryId,
            authorId: authorId,
            nutrition: nutrition
        );

        for (var index = 0; index < faker.Random.Int(4, 8); index++)
        {
            var ingredient = new RecipeIngredient(recipe.Id,
                faker.PickRandom(IngredientNames),
                faker.Random.Decimal(1, 500),
                faker.PickRandom("g", "ml", "tbsp", "tsp"));
            recipe.AddIngredient(ingredient);
        }

        var instructions = faker.Random.ArrayElements(CookingInstructions, faker.Random.Int(3, 8));
        var stepCount = 1;
        foreach (var instruction in instructions)
        {
            var step = new RecipeStep(recipe.Id, stepCount, "Step " + stepCount, instruction); stepCount++;
            recipe.AddStep(step);
        }

        recipe.Publish();

        return recipe;
    }
}

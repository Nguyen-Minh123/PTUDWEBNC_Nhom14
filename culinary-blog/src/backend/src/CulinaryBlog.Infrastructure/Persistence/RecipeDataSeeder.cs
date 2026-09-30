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
        "Wonton Noodle Soup",
        "Caramelized Ginger Chicken",
        "Crispy Tofu Rice Bowl",
        "Pumpkin Coconut Soup",
        "Stir-Fried Morning Glory",
        "Pork and Shrimp Dumplings",
        "Turmeric Fish with Dill",
        "Roasted Duck Noodle Soup"
    ];

    private static readonly string[] IngredientNames =
    [
        "rice noodles",
        "fish sauce",
        "lemongrass",
        "coconut milk",
        "fresh ginger",
        "garlic",
        "shallots",
        "bean sprouts",
        "fresh basil",
        "chicken breast",
        "pork shoulder",
        "white rice"
    ];

    private static readonly string[] CookingInstructions =
    [
        "Rinse and prepare the ingredients before cooking.",
        "Heat a pan over medium heat and add a little oil.",
        "Cook the aromatics until fragrant, stirring regularly.",
        "Add the main ingredients and cook until lightly browned.",
        "Pour in the sauce and simmer until the flavors combine.",
        "Season to taste and cook until the ingredients are tender.",
        "Garnish with fresh herbs and serve while warm."
    ];

    public async Task SeedAsync(CancellationToken cancellationToken = default)
    {
        if (await dbContext.Recipes.AnyAsync(cancellationToken))
        {
            return;
        }

        var faker = new Faker("en");
        var recipes = DishNames
            .Select(dishName => CreateRecipe(faker, dishName))
            .ToArray();

        await dbContext.Recipes.AddRangeAsync(recipes, cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken);
    }

    private static Recipe CreateRecipe(Faker faker, string dishName)
    {
        var recipe = new Recipe(dishName);

        for (var index = 0; index < faker.Random.Int(4, 8); index++)
        {
            recipe.AddIngredient(
                faker.PickRandom(IngredientNames),
                faker.Random.Decimal(1, 500),
                faker.PickRandom("g", "ml", "tbsp", "tsp"));
        }

        var instructions = faker.Random.ArrayElements(CookingInstructions, faker.Random.Int(3, 8));
        foreach (var instruction in instructions)
        {
            recipe.AddStep(instruction);
        }

        recipe.SetNutritionInfo(new NutritionInfo(
            faker.Random.Decimal(100, 800),
            faker.Random.Decimal(5, 60),
            faker.Random.Decimal(10, 120),
            faker.Random.Decimal(1, 50),
            faker.Random.Decimal(1, 30),
            faker.Random.Decimal(1, 80)));
        recipe.Publish();

        return recipe;
    }
}
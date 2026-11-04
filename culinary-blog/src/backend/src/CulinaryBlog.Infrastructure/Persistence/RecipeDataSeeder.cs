using Bogus;
using CulinaryBlog.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace CulinaryBlog.Infrastructure.Persistence;

public sealed class RecipeDataSeeder(CulinaryBlogDbContext dbContext)
{
    private const string SeederUserId = "seeder-user-id";

    private static readonly (string Name, string Slug, string Description)[] CategoryDefinitions =
    [
        ("Món chính", "mon-chinh", "Các món ăn chính cho bữa cơm gia đình."),
        ("Món chay", "mon-chay", "Các món ăn sử dụng rau củ và nguyên liệu thực vật."),
        ("Món tráng miệng", "mon-trang-mieng", "Các món ngọt dùng sau bữa ăn."),
        ("Đồ uống", "do-uong", "Các thức uống giải khát và sinh tố.")
    ];

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

        var categories = await EnsureCategoriesAsync(cancellationToken);
        var author = await dbContext.Users
            .SingleOrDefaultAsync(user => user.Id == SeederUserId, cancellationToken);

        if (author is null)
        {
            author = new ApplicationUser("seeder@culinaryblog.local", "Seeder Chef")
            {
                Id = SeederUserId
            };
            await dbContext.Users.AddAsync(author, cancellationToken);
        }

        var faker = new Faker("en");
        var recipes = DishNames
            .Select((dishName, index) =>
            {
                var category = categories[CategoryDefinitions[index % CategoryDefinitions.Length].Name];
                return CreateRecipe(faker, dishName, category.Id, author.Id);
            })
            .ToArray();

        await dbContext.Recipes.AddRangeAsync(recipes, cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken);
    }

    private async Task<Dictionary<string, Category>> EnsureCategoriesAsync(
        CancellationToken cancellationToken)
    {
        var categories = await dbContext.Categories.ToListAsync(cancellationToken);
        var categoriesByName = categories.ToDictionary(category => category.Name, StringComparer.Ordinal);

        foreach (var (name, slug, description) in CategoryDefinitions)
        {
            if (categoriesByName.ContainsKey(name))
            {
                continue;
            }

            var category = new Category(name, slug, description, orderIndex: categoriesByName.Count);
            await dbContext.Categories.AddAsync(category, cancellationToken);
            categoriesByName.Add(name, category);
        }

        return categoriesByName;
    }

    private static Recipe CreateRecipe(
        Faker faker,
        string dishName,
        Guid categoryId,
        string authorId)
    {
        var slug = dishName.ToLowerInvariant().Replace(' ', '-');
        var instructions = faker.Random
            .ArrayElements(CookingInstructions, faker.Random.Int(3, CookingInstructions.Length));
        var recipe = new Recipe(
            title: dishName,
            slug: slug,
            description: faker.Lorem.Sentence(),
            instructions: string.Join(Environment.NewLine, instructions),
            prepTime: faker.Random.Int(5, 45),
            cookTime: faker.Random.Int(10, 120),
            servings: faker.Random.Int(1, 8),
            difficulty: faker.PickRandom<RecipeDifficulty>(),
            categoryId: categoryId,
            authorId: authorId,
            nutrition: new RecipeNutrition
            {
                Calories = faker.Random.Decimal(100, 800),
                Protein = faker.Random.Decimal(5, 60),
                Carbohydrates = faker.Random.Decimal(10, 120),
                Fat = faker.Random.Decimal(1, 50),
                Fiber = faker.Random.Decimal(1, 30),
                Sodium = faker.Random.Decimal(100, 3000)
            });

        var ingredientCount = faker.Random.Int(4, 8);
        for (var index = 0; index < ingredientCount; index++)
        {
            recipe.AddIngredient(new RecipeIngredient(
                recipe.Id,
                faker.PickRandom(IngredientNames),
                faker.Random.Decimal(1, 500),
                faker.PickRandom("g", "ml", "tbsp", "tsp"),
                orderIndex: index));
        }

        for (var index = 0; index < instructions.Length; index++)
        {
            recipe.AddStep(new RecipeStep(
                recipe.Id,
                stepNumber: index + 1,
                title: $"Step {index + 1}",
                description: instructions[index],
                timerMinutes: faker.Random.Int(1, 30)));
        }

        recipe.Publish();
        return recipe;
    }
}

using Bogus;
using CulinaryBlog.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace CulinaryBlog.Infrastructure.Persistence;

public sealed class RecipeDataSeeder(CulinaryBlogDbContext dbContext)
{
    private static readonly (string Name, string Slug, string Description, string? ImageUrl)[] Categories =
    [
        ("Món chính", "mon-chinh", "Các món ăn mạnh mẽ, hấp dẫn và giàu dinh dưỡng cho bữa cơm gia đình.", null),
        ("Món chay", "mon-chay", "Cách làm phong phú với rau củ, đậu, hạt và nguyên liệu không sử dụng thịt.", null),
        ("Món tráng miệng", "mon-trang-mieng", "Bánh ngọt, món ăn nhẹ và các món kết thúc bữa ăn vừa ngon vừa hấp dẫn.", null),
        ("Đồ uống", "do-uong", "Các thức uống giải khát, sinh tố và hỗn hợp thơm ngon cho mọi thời điểm.", null)
    ];

    private static readonly (string CategoryName, string[] DishNames)[] DishesByCategory =
    [
        ("Món chính",
        [
            "Beef Pho",
            "Chicken Curry",
            "Lemongrass Pork",
            "Garlic Fried Rice",
            "Braised Pork with Eggs",
            "Grilled Pork Vermicelli"
        ]),
        ("Món chay",
        [
            "Chili Lemongrass Tofu",
            "Mushroom Congee",
            "Vegetable Spring Rolls",
            "Tomato Noodle Soup",
            "Coconut Pancakes"
        ]),
        ("Món tráng miệng",
        [
            "Sweet and Sour Fish",
            "Crispy Rice Crepes",
            "Caramelized Fish",
            "Coconut Pancakes",
            "Fruit Yogurt Bowl"
        ]),
        ("Đồ uống",
        [
            "Iced Lemongrass Tea",
            "Coconut Cooler",
            "Mango Smoothie",
            "Citrus Mint Soda"
        ])
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

        if (!await dbContext.Categories.AnyAsync(cancellationToken))
        {
            var seededCategories = Categories
                .Select((category, index) => new Category(category.Name, category.Slug, category.Description, category.ImageUrl, index))
                .ToList();

            await dbContext.Categories.AddRangeAsync(seededCategories, cancellationToken);
            await dbContext.SaveChangesAsync(cancellationToken);
        }

        var categories = await dbContext.Categories
            .OrderBy(x => x.OrderIndex)
            .ToListAsync(cancellationToken);

        if (categories.Count == 0)
        {
            return;
        }

        var authorId = "seeder-user-id";
        var faker = new Faker("en");
        var recipes = new List<Recipe>();

        foreach (var (categoryName, dishNames) in DishesByCategory)
        {
            var category = categories.First(x => x.Name == categoryName);
            foreach (var dishName in dishNames)
            {
                recipes.Add(CreateRecipe(faker, dishName, category.Id, authorId));
            }
        }

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
            var ingredient = new RecipeIngredient(
                recipe.Id,
                faker.PickRandom(IngredientNames),
                faker.Random.Decimal(1, 500),
                faker.PickRandom("g", "ml", "tbsp", "tsp"));
            recipe.AddIngredient(ingredient);
        }

        var stepCount = 1;
        foreach (var instruction in faker.Random.ArrayElements(CookingInstructions, faker.Random.Int(3, CookingInstructions.Length)))
        {
            var step = new RecipeStep(recipe.Id, stepCount, "Step " + stepCount, instruction);
            recipe.AddStep(step);
            stepCount++;
        }

        recipe.Publish();

        return recipe;
    }
}

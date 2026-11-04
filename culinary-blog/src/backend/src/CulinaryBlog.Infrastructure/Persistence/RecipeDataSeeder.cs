using Bogus;
using CulinaryBlog.Application.Common.Security;
using CulinaryBlog.Domain.Entities;
using Microsoft.AspNetCore.Identity;
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
        await EnsureUsersAndRolesAsync(cancellationToken);

        if (await dbContext.Recipes.AnyAsync(cancellationToken))
        {
            return;
        }

        var categories = await EnsureCategoriesAsync(cancellationToken);
        var author = await dbContext.Users
            .SingleAsync(user => user.Id == SeederUserId, cancellationToken);

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

    private async Task EnsureUsersAndRolesAsync(CancellationToken cancellationToken)
    {
        var hasher = new PasswordHasher<ApplicationUser>();

        var demoUsers = new (string Id, string Email, string DisplayName, string FirstName, string LastName, string Bio, string AvatarUrl, string Role)[]
        {
            (
                SeederUserId,
                "seeder@culinaryblog.local",
                "Chef Nguyễn Minh (Master Chef)",
                "Minh",
                "Nguyễn",
                "Đầu bếp trưởng với hơn 12 năm kinh nghiệm nghiên cứu ẩm thực truyền thống Việt Nam và Á Âu.",
                "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&auto=format&fit=crop&q=80",
                UserRoleHelper.Author
            ),
            (
                "admin-user-id",
                "admin@culinary.com",
                "Quản Trị Viên Hệ Thống",
                "Admin",
                "Culinary",
                "Quản trị viên hệ thống Culinary Blog - phụ trách kiểm duyệt nội dung và quản lý cộng đồng đầu bếp.",
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
                UserRoleHelper.Admin
            ),
            (
                "chef-hieu-id",
                "chef.hieu@culinary.com",
                "Chef Bùi Trung Hiếu",
                "Hiếu",
                "Bùi Trung",
                "Chuyên gia các món nước và phở truyền thống Hà Nội, đam mê chia sẻ bí quyết nấu ăn gia đình.",
                "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&auto=format&fit=crop&q=80",
                UserRoleHelper.Author
            ),
            (
                "chef-khai-id",
                "chef.khai@culinary.com",
                "Chef Nguyễn Thế Khải",
                "Khải",
                "Nguyễn Thế",
                "Đầu bếp chuyên món chay thanh đạm và thực dưỡng hiện đại dành cho người bận rộn.",
                "https://images.unsplash.com/photo-1566554273541-37a9ca77b91f?w=400&auto=format&fit=crop&q=80",
                UserRoleHelper.Author
            ),
            (
                "member-huy-id",
                "member.huy@culinary.com",
                "Phan Thanh Huy",
                "Huy",
                "Phan Thanh",
                "Người yêu ẩm thực đường phố Sài Gòn và thích sưu tầm các công thức bánh ngọt dễ làm.",
                "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80",
                UserRoleHelper.User
            )
        };

        var anyChanged = false;
        foreach (var item in demoUsers)
        {
            var existing = await dbContext.Users
                .FirstOrDefaultAsync(u => u.Id == item.Id || u.Email == item.Email, cancellationToken);

            if (existing is null)
            {
                existing = new ApplicationUser(item.Email, item.DisplayName, item.Bio, item.AvatarUrl)
                {
                    Id = item.Id,
                    FirstName = item.FirstName,
                    LastName = item.LastName,
                    EmailConfirmed = true
                };
                existing.PasswordHash = hasher.HashPassword(existing, "Password123!");
                await dbContext.Users.AddAsync(existing, cancellationToken);
                await UserRoleHelper.AssignRoleAsync(dbContext, existing.Id, item.Role, cancellationToken);
                anyChanged = true;
            }
        }

        if (anyChanged)
        {
            await dbContext.SaveChangesAsync(cancellationToken);
        }
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

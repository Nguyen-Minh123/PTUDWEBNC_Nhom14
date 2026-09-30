using CulinaryBlog.Application.Common.Interfaces;
using CulinaryBlog.Application.Features.Recipes;
using CulinaryBlog.Application.Features.Recipes.Commands;
using CulinaryBlog.Application.Recipes.Commands.DeleteRecipe;
using CulinaryBlog.Domain.Entities;
using CulinaryBlog.Domain.Exceptions;

namespace CulinaryBlog.UnitTests;

public sealed class RecipeLifecycleCommandTests
{
    [Fact]
    public async Task Create_saves_a_draft_with_normalized_slug()
    {
        var unitOfWork = new FakeUnitOfWork();
        var handler = new CreateRecipeCommandHandler(unitOfWork);

        var result = await handler.Handle(CreateCommand("My Recipe"), CancellationToken.None);

        Assert.Equal("my-recipe", result.Slug);
        Assert.Equal("author-1", result.AuthorId);
        Assert.Equal(RecipeStatus.Draft, result.Status);
        Assert.Equal(1, unitOfWork.SaveCount);
    }

    [Fact]
    public async Task Create_rejects_duplicate_slug()
    {
        var unitOfWork = new FakeUnitOfWork();
        var handler = new CreateRecipeCommandHandler(unitOfWork);
        await handler.Handle(CreateCommand("My Recipe"), CancellationToken.None);

        await Assert.ThrowsAsync<RecipeSlugConflictException>(
            () => handler.Handle(CreateCommand("My Recipe"), CancellationToken.None));

        Assert.Equal(1, unitOfWork.SaveCount);
    }

    [Fact]
    public async Task Publish_rejects_recipe_without_ingredients_or_steps()
    {
        var recipe = CreateEntity();
        var unitOfWork = new FakeUnitOfWork(recipe);
        var handler = new PublishRecipeCommandHandler(unitOfWork);

        await Assert.ThrowsAsync<DomainException>(
            () => handler.Handle(new PublishRecipeCommand(recipe.Id), CancellationToken.None));

        Assert.Equal(RecipeStatus.Draft, recipe.Status);
        Assert.Equal(0, unitOfWork.SaveCount);
    }

    [Fact]
    public async Task Publish_changes_complete_recipe_to_published()
    {
        var recipe = CreateEntity();
        recipe.AddIngredient(new RecipeIngredient(recipe.Id, "Rice"));
        recipe.AddStep(new RecipeStep(recipe.Id, 1, "Prepare", "Prepare the ingredients."));
        var unitOfWork = new FakeUnitOfWork(recipe);
        var handler = new PublishRecipeCommandHandler(unitOfWork);

        var result = await handler.Handle(new PublishRecipeCommand(recipe.Id), CancellationToken.None);

        Assert.Equal(RecipeStatus.Published, result!.Status);
        Assert.NotNull(result.PublishedAt);
        Assert.Equal(1, unitOfWork.SaveCount);
    }

    [Fact]
    public async Task Archive_changes_recipe_status()
    {
        var recipe = CreateEntity();
        var unitOfWork = new FakeUnitOfWork(recipe);
        var handler = new ArchiveRecipeCommandHandler(unitOfWork);

        var result = await handler.Handle(new ArchiveRecipeCommand(recipe.Id), CancellationToken.None);

        Assert.Equal(RecipeStatus.Archived, result!.Status);
        Assert.Equal(1, unitOfWork.SaveCount);
    }

    [Fact]
    public async Task Delete_soft_deletes_recipe()
    {
        var recipe = CreateEntity();
        var unitOfWork = new FakeUnitOfWork(recipe);
        var handler = new DeleteRecipeCommandHandler(unitOfWork);

        var deleted = await handler.Handle(new DeleteRecipeCommand(recipe.Id), CancellationToken.None);

        Assert.True(deleted);
        Assert.True(recipe.IsDeleted);
        Assert.Equal(1, unitOfWork.SaveCount);
    }

    private static CreateRecipeCommand CreateCommand(string slug) => new(
        "My Recipe",
        slug,
        "A sample recipe.",
        "Prepare and cook.",
        10,
        20,
        2,
        RecipeDifficulty.Easy,
        Guid.NewGuid(),
        "author-1",
        null);

    private static Recipe CreateEntity() => new(
        "My Recipe",
        "my-recipe",
        "A sample recipe.",
        "Prepare and cook.",
        10,
        20,
        2,
        RecipeDifficulty.Easy,
        Guid.NewGuid(),
        "author-1");

    private sealed class FakeUnitOfWork : IUnitOfWork
    {
        public FakeUnitOfWork(params Recipe[] recipes)
        {
            Recipes = new FakeRecipeRepository(recipes);
        }

        public IRecipeRepository Recipes { get; }
        public int SaveCount { get; private set; }

        public Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            SaveCount++;
            return Task.FromResult(1);
        }
    }

    private sealed class FakeRecipeRepository : IRecipeRepository
    {
        private readonly List<Recipe> _recipes;

        public FakeRecipeRepository(IEnumerable<Recipe> recipes)
        {
            _recipes = recipes.ToList();
        }

        public Task<Recipe?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default) =>
            Task.FromResult(_recipes.FirstOrDefault(recipe => recipe.Id == id));

        public Task<Recipe?> GetByIdWithDetailsAsync(Guid id, CancellationToken cancellationToken = default) =>
            GetByIdAsync(id, cancellationToken);

        public Task<Recipe?> GetBySlugAsync(string slug, CancellationToken cancellationToken = default) =>
            Task.FromResult(_recipes.FirstOrDefault(recipe => recipe.Slug == slug));

        public Task<Recipe?> GetBySlugWithDetailsAsync(string slug, CancellationToken cancellationToken = default) =>
            GetBySlugAsync(slug, cancellationToken);

        public Task<bool> SlugExistsAsync(
            string slug,
            Guid? excludeRecipeId = null,
            CancellationToken cancellationToken = default) =>
            Task.FromResult(_recipes.Any(recipe =>
                recipe.Slug == slug && recipe.Id != excludeRecipeId));

        public Task AddAsync(Recipe recipe, CancellationToken cancellationToken = default)
        {
            _recipes.Add(recipe);
            return Task.CompletedTask;
        }

        public void Update(Recipe recipe)
        {
        }

        public void Remove(Recipe recipe) => _recipes.Remove(recipe);

        public Task<IReadOnlyList<Recipe>> GetPagedAsync(
            int page,
            int pageSize,
            Guid? categoryId = null,
            RecipeStatus? status = null,
            string? keyword = null,
            CancellationToken cancellationToken = default) =>
            Task.FromResult<IReadOnlyList<Recipe>>(_recipes);

        public Task<int> CountAsync(
            Guid? categoryId = null,
            RecipeStatus? status = null,
            string? keyword = null,
            CancellationToken cancellationToken = default) =>
            Task.FromResult(_recipes.Count);
    }
}
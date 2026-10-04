using CulinaryBlog.Domain.Entities;
using MediatR;

namespace CulinaryBlog.Application.Features.Recipes.Commands;

public sealed record CreateRecipeCommand(
    string Title,
    string Slug,
    string Description,
    string Instructions,
    int PrepTime,
    int CookTime,
    int Servings,
    RecipeDifficulty Difficulty,
    Guid CategoryId,
    string AuthorId,
    RecipeNutrition? Nutrition = null) : IRequest<Recipe>;

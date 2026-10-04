using CulinaryBlog.Domain.Entities;
using MediatR;

namespace CulinaryBlog.Application.Features.Recipes.Commands;

public sealed record PublishRecipeCommand(Guid Id) : IRequest<Recipe?>;

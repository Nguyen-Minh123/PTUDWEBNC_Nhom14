using CulinaryBlog.Application.Common.DTOs;
using MediatR;

namespace CulinaryBlog.Application.Features.Categories.Commands.CreateCategory;

public record CreateCategoryCommand(
    string Name,
    string? Slug,
    string? Description,
    string? ImageUrl,
    int OrderIndex) : IRequest<CategoryDto>;

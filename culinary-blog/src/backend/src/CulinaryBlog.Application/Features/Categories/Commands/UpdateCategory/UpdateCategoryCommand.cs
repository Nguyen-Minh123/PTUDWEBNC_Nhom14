using CulinaryBlog.Application.Common.DTOs;
using MediatR;

namespace CulinaryBlog.Application.Features.Categories.Commands.UpdateCategory;

public record UpdateCategoryCommand(
    Guid Id,
    string Name,
    string? Slug,
    string? Description,
    string? ImageUrl,
    int OrderIndex) : IRequest<CategoryDto?>;

using CulinaryBlog.Application.Common.DTOs;
using MediatR;

namespace CulinaryBlog.Application.Features.Categories.Queries.GetAllCategories;

public record GetAllCategoriesQuery : IRequest<List<CategoryDto>>;

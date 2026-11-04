using CulinaryBlog.Application.Common.DTOs;
using MediatR;

namespace CulinaryBlog.Application.Features.Categories.Queries.GetCategoryById;

public record GetCategoryByIdQuery(Guid Id) : IRequest<CategoryDto>;

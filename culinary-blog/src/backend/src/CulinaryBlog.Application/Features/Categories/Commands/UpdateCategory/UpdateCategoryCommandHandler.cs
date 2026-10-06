using CulinaryBlog.Application.Common.DTOs;
using CulinaryBlog.Application.Common.Interfaces;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CulinaryBlog.Application.Features.Categories.Commands.UpdateCategory;

public class UpdateCategoryCommandHandler : IRequestHandler<UpdateCategoryCommand, CategoryDto?>
{
    private readonly IApplicationDbContext _dbContext;

    public UpdateCategoryCommandHandler(IApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<CategoryDto?> Handle(UpdateCategoryCommand request, CancellationToken cancellationToken)
    {
        var category = await _dbContext.Categories
            .FirstOrDefaultAsync(c => c.Id == request.Id, cancellationToken);

        if (category == null)
        {
            throw CulinaryBlog.Domain.Exceptions.CategoryNotFoundException.ById(request.Id);
        }

        category.UpdateDetails(
            request.Name,
            request.Slug,
            request.Description,
            request.ImageUrl,
            request.OrderIndex);

        await _dbContext.SaveChangesAsync(cancellationToken);

        return category.Adapt<CategoryDto>();
    }
}

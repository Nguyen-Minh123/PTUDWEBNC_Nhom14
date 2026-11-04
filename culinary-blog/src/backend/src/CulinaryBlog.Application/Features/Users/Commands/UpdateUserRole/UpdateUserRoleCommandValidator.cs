using CulinaryBlog.Application.Common.Security;
using FluentValidation;

namespace CulinaryBlog.Application.Features.Users.Commands.UpdateUserRole;

public class UpdateUserRoleCommandValidator : AbstractValidator<UpdateUserRoleCommand>
{
    public UpdateUserRoleCommandValidator()
    {
        RuleFor(x => x.UserId)
            .NotEmpty().WithMessage("Mã người dùng (UserId) không được để trống.");

        RuleFor(x => x.Role)
            .NotEmpty().WithMessage("Vai trò (Role) không được để trống.")
            .Must(role => UserRoleHelper.NormalizeRoleName(role) != null)
            .WithMessage("Vai trò không hợp lệ. Chỉ chấp nhận: Admin, Author, hoặc User.");
    }
}

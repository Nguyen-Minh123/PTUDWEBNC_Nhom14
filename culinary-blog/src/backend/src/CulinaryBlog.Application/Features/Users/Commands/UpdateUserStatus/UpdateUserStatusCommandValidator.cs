using FluentValidation;

namespace CulinaryBlog.Application.Features.Users.Commands.UpdateUserStatus;

public class UpdateUserStatusCommandValidator : AbstractValidator<UpdateUserStatusCommand>
{
    public UpdateUserStatusCommandValidator()
    {
        RuleFor(x => x.UserId)
            .NotEmpty().WithMessage("Mã người dùng (UserId) không được để trống.");

        RuleFor(x => x.LockoutDays)
            .GreaterThan(0)
            .When(x => x.LockoutDays.HasValue)
            .WithMessage("Số ngày khóa tài khoản (LockoutDays) phải lớn hơn 0.");

        RuleFor(x => x.Reason)
            .MaximumLength(500)
            .When(x => !string.IsNullOrWhiteSpace(x.Reason))
            .WithMessage("Lý do khóa tài khoản không được vượt quá 500 ký tự.");
    }
}

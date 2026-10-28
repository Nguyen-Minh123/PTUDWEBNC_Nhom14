using FluentValidation;

namespace CulinaryBlog.Application.Features.Auth.Commands.ChangePassword;

public class ChangePasswordCommandValidator : AbstractValidator<ChangePasswordCommand>
{
    public ChangePasswordCommandValidator()
    {
        RuleFor(x => x.CurrentPassword)
            .NotEmpty().WithMessage("Mật khẩu hiện tại không được để trống.");

        RuleFor(x => x.NewPassword)
            .NotEmpty().WithMessage("Mật khẩu mới không được để trống.")
            .MinimumLength(6).WithMessage("Mật khẩu mới phải có tối thiểu 6 ký tự.")
            .Matches(@"[A-Z]").WithMessage("Mật khẩu mới phải chứa ít nhất 1 chữ cái in hoa.")
            .Matches(@"[a-z]").WithMessage("Mật khẩu mới phải chứa ít nhất 1 chữ cái thường.")
            .Matches(@"[0-9]").WithMessage("Mật khẩu mới phải chứa ít nhất 1 chữ số.")
            .Matches(@"[^a-zA-Z0-9]").WithMessage("Mật khẩu mới phải chứa ít nhất 1 ký tự đặc biệt.")
            .NotEqual(x => x.CurrentPassword).WithMessage("Mật khẩu mới không được trùng với mật khẩu hiện tại.");

        RuleFor(x => x.ConfirmPassword)
            .NotEmpty().WithMessage("Xác nhận mật khẩu không được để trống.")
            .Equal(x => x.NewPassword).WithMessage("Mật khẩu xác nhận không khớp với mật khẩu mới.");
    }
}

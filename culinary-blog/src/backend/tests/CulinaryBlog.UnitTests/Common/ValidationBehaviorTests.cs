using CulinaryBlog.Application.Common.Behaviors;
using FluentValidation;
using MediatR;
using ValidationException = CulinaryBlog.Application.Common.Exceptions.ValidationException;

namespace CulinaryBlog.UnitTests.Common;

public class ValidationBehaviorTests
{
    public record TestCommand(string Title, int Value) : IRequest<string>;

    public class TestCommandValidator : AbstractValidator<TestCommand>
    {
        public TestCommandValidator()
        {
            RuleFor(x => x.Title).NotEmpty().WithMessage("Title is required.");
            RuleFor(x => x.Value).GreaterThan(0).WithMessage("Value must be greater than zero.");
        }
    }

    [Fact]
    public async Task Handle_WhenValidRequest_CallsNextAndReturnsResponse()
    {
        // Arrange
        var validators = new List<IValidator<TestCommand>> { new TestCommandValidator() };
        var behavior = new ValidationBehavior<TestCommand, string>(validators);
        var command = new TestCommand("Phở Bò Hà Nội", 100);
        RequestHandlerDelegate<string> next = () => Task.FromResult("Success");

        // Act
        var result = await behavior.Handle(command, next, CancellationToken.None);

        // Assert
        Assert.Equal("Success", result);
    }

    [Fact]
    public async Task Handle_WhenInvalidRequest_ThrowsValidationExceptionWithErrors()
    {
        // Arrange
        var validators = new List<IValidator<TestCommand>> { new TestCommandValidator() };
        var behavior = new ValidationBehavior<TestCommand, string>(validators);
        var invalidCommand = new TestCommand("", -5); // Cả 2 trường đều vi phạm
        RequestHandlerDelegate<string> next = () => Task.FromResult("Success");

        // Act & Assert
        var exception = await Assert.ThrowsAsync<ValidationException>(() =>
            behavior.Handle(invalidCommand, next, CancellationToken.None));

        Assert.NotNull(exception.Errors);
        Assert.True(exception.Errors.ContainsKey(nameof(TestCommand.Title)));
        Assert.True(exception.Errors.ContainsKey(nameof(TestCommand.Value)));

        Assert.Contains("Title is required.", exception.Errors[nameof(TestCommand.Title)]);
        Assert.Contains("Value must be greater than zero.", exception.Errors[nameof(TestCommand.Value)]);
    }

    [Fact]
    public async Task Handle_WhenNoValidatorsRegistered_PassesThrough()
    {
        // Arrange
        var behavior = new ValidationBehavior<TestCommand, string>([]);
        var command = new TestCommand("", -5);
        var isNextCalled = false;
        RequestHandlerDelegate<string> next = () =>
        {
            isNextCalled = true;
            return Task.FromResult("PassThrough");
        };

        // Act
        var result = await behavior.Handle(command, next, CancellationToken.None);

        // Assert
        Assert.True(isNextCalled);
        Assert.Equal("PassThrough", result);
    }
}

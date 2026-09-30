namespace CulinaryBlog.Domain.Common;

public sealed class DuplicateStepNumberException : InvalidOperationException
{
    public DuplicateStepNumberException(int stepNumber)
        : base($"A recipe step with number {stepNumber} already exists.")
    {
        StepNumber = stepNumber;
    }

    public int StepNumber { get; }
}
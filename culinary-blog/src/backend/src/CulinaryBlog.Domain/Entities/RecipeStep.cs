namespace CulinaryBlog.Domain.Entities;

public class RecipeStep : BaseEntity
{
    private RecipeStep()
    {
    }

    internal RecipeStep(int stepNumber, string instruction)
    {
        if (stepNumber < 1)
        {
            throw new ArgumentOutOfRangeException(nameof(stepNumber));
        }

        if (string.IsNullOrWhiteSpace(instruction))
        {
            throw new ArgumentException("Step instruction is required.", nameof(instruction));
        }

        StepNumber = stepNumber;
        Instruction = instruction.Trim();
    }

    public int StepNumber { get; private set; }

    public string Instruction { get; private set; } = null!;

    internal void SetStepNumber(int stepNumber)
    {
        StepNumber = stepNumber;
    }
}

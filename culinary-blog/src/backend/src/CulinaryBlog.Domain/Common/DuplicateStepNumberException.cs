namespace CulinaryBlog.Domain.Common;

/// <summary>
/// Được ném khi recipe có hai bước dùng cùng một số thứ tự.
/// </summary>
public sealed class DuplicateStepNumberException : InvalidOperationException
{
    /// <summary>
    /// Lưu số thứ tự đang bị trùng để caller có thể xử lý mà không phân tích message.
    /// </summary>
    public DuplicateStepNumberException(int stepNumber)
        : base($"A recipe step with number {stepNumber} already exists.")
    {
        StepNumber = stepNumber;
    }

    public int StepNumber { get; }
}
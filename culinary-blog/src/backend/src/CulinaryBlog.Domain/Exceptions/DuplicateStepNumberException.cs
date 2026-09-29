using System;

namespace CulinaryBlog.Domain.Exceptions;

public class DuplicateStepNumberException : DomainException
{
    public DuplicateStepNumberException(int stepNumber) 
        : base("StepNumber '" + stepNumber + "' already exists for this recipe.")
    {
    }
}

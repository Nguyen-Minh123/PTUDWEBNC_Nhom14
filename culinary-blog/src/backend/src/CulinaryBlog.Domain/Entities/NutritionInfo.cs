namespace CulinaryBlog.Domain.Entities;

public class NutritionInfo
{
    public NutritionInfo()
    {
    }

    public NutritionInfo(decimal calories, decimal protein, decimal carbohydrates, decimal fat, decimal fiber, decimal sugar)
    {
        Calories = calories;
        Protein = protein;
        Carbohydrates = carbohydrates;
        Fat = fat;
        Fiber = fiber;
        Sugar = sugar;
    }

    public decimal Calories { get; private set; }

    public decimal Protein { get; private set; }

    public decimal Carbohydrates { get; private set; }

    public decimal Fat { get; private set; }

    public decimal Fiber { get; private set; }

    public decimal Sugar { get; private set; }
}

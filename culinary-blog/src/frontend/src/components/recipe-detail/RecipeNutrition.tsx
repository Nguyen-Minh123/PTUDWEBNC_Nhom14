import * as React from 'react';
import { RecipeNutritionDto } from '@/types';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Activity } from 'lucide-react';

export function RecipeNutrition({ nutrition }: { nutrition?: RecipeNutritionDto | null }) {
  const formatValue = (value: number | null | undefined, unit: string) =>
    value == null ? 'Chưa có dữ liệu' : `${value} ${unit}`;

  const items = [
    { label: 'Năng lượng', value: formatValue(nutrition?.calories, 'kcal') },
    { label: 'Chất đạm (Protein)', value: formatValue(nutrition?.protein, 'g') },
    { label: 'Carbohydrate', value: formatValue(nutrition?.carbohydrates, 'g') },
    { label: 'Chất béo (Fat)', value: formatValue(nutrition?.fat, 'g') },
    { label: 'Chất xơ (Fiber)', value: formatValue(nutrition?.fiber, 'g') },
    { label: 'Natri (Sodium)', value: formatValue(nutrition?.sodium, 'mg') },
  ];

  return (
    <Card className="border-stone-200/80 shadow-xs dark:border-stone-800">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Activity className="h-4 w-4 text-amber-600" />
          <CardTitle className="text-base font-bold">Chỉ Số Dinh Dưỡng Ước Tính (Trên mỗi khẩu phần)</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {items.map((item) => (
            <div key={item.label} className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-100 dark:border-stone-800 flex flex-col justify-between">
              <span className="text-[11px] text-stone-500 font-medium">{item.label}</span>
              <span className="mt-1 text-sm sm:text-base font-black text-stone-900 dark:text-stone-50">
                {item.value}
              </span>
            </div>
          ))}
        </div>
        <p className="text-[11px] text-stone-400 mt-3 italic">
          * Số liệu là giá trị do công thức cung cấp; giá trị thực tế có thể thay đổi theo nguyên liệu và khẩu phần.
        </p>
      </CardContent>
    </Card>
  );
}

import * as React from 'react';
import { RecipeNutritionDto } from '@/types';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Activity } from 'lucide-react';

export function RecipeNutrition({ nutrition }: { nutrition?: RecipeNutritionDto | null }) {
  // Dữ liệu mẫu dinh dưỡng nếu backend chưa cung cấp
  const data = nutrition || {
    calories: 450,
    proteinGrams: 28,
    carbsGrams: 52,
    fatGrams: 14,
    fiberGrams: 4,
    sodiumMg: 850,
  };

  const items = [
    { label: 'Năng lượng', value: `${data.calories} kcal`, percent: 23, color: 'bg-amber-500' },
    { label: 'Chất đạm (Protein)', value: `${data.proteinGrams || data.protein || 28} g`, percent: 45, color: 'bg-rose-500' },
    { label: 'Carbohydrate', value: `${data.carbsGrams || data.carbohydrates || 52} g`, percent: 18, color: 'bg-emerald-500' },
    { label: 'Chất béo (Fat)', value: `${data.fatGrams || data.fat || 14} g`, percent: 20, color: 'bg-orange-500' },
    { label: 'Chất xơ (Fiber)', value: `${data.fiberGrams || data.fiber || 4} g`, percent: 15, color: 'bg-teal-500' },
    { label: 'Natri (Sodium)', value: `${data.sodiumMg || data.sodium || 850} mg`, percent: 35, color: 'bg-blue-500' },
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
          {items.map((item, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-100 dark:border-stone-800 flex flex-col justify-between">
              <span className="text-[11px] text-stone-500 font-medium">{item.label}</span>
              <div className="mt-1">
                <span className="text-sm sm:text-base font-black text-stone-900 dark:text-stone-50">
                  {item.value}
                </span>
                <div className="w-full bg-stone-200 rounded-full h-1.5 mt-2 overflow-hidden dark:bg-stone-700">
                  <div className={`h-1.5 rounded-full ${item.color}`} style={{ width: `${Math.min(100, item.percent * 2)}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="text-[11px] text-stone-400 mt-3 italic">
          * Giá trị dinh dưỡng hàng ngày dựa trên chế độ ăn 2.000 calo. Giá trị thực tế có thể thay đổi tùy thuộc vào lượng nguyên liệu sử dụng.
        </p>
      </CardContent>
    </Card>
  );
}

'use client';

import * as React from 'react';
import { RecipeIngredientDto } from '@/types';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Minus, Plus, ShoppingBag, Check, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RecipeIngredientsProps {
  initialServings: number;
  ingredients: RecipeIngredientDto[];
  onServingsChange?: (newServings: number) => void;
}

export function RecipeIngredients({
  initialServings = 4,
  ingredients,
  onServingsChange,
}: RecipeIngredientsProps) {
  const [servings, setServings] = React.useState(initialServings);
  const [checkedIds, setCheckedIds] = React.useState<Record<string, boolean>>({});

  const toggleCheck = (id: string) => {
    setCheckedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleSetServings = (newVal: number) => {
    const clamped = Math.max(1, Math.min(100, newVal));
    setServings(clamped);
    onServingsChange?.(clamped);
  };

  const scaleRatio = servings / (initialServings || 1);

  const formatQuantity = (quantity?: number | null) => {
    if (quantity == null) return '';
    const scaled = quantity * scaleRatio;
    if (Number.isInteger(scaled)) return scaled.toString();
    // Làm tròn đến 1 chữ số thập phân
    const rounded = Math.round(scaled * 10) / 10;
    return rounded.toString();
  };

  const orderedIngredients = [...ingredients].sort((first, second) => first.orderIndex - second.orderIndex);

  return (
    <Card className="border-stone-200/80 shadow-xs dark:border-stone-800">
      <CardHeader className="pb-3 border-b border-stone-100 dark:border-stone-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-amber-600" />
            <CardTitle className="text-lg font-bold">Nguyên Liệu Cần Chuẩn Bị</CardTitle>
          </div>

          {/* Servings Adjuster Calculator (FR-FTE-052) */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 bg-stone-100 dark:bg-stone-800 px-3 py-1.5 rounded-xl text-xs font-semibold">
              <span className="text-stone-500">Khẩu phần:</span>
              <div className="flex items-center gap-1.5">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 rounded-md hover:bg-stone-200 dark:hover:bg-stone-700"
                  onClick={() => handleSetServings(servings - 1)}
                  disabled={servings <= 1}
                  title="Giảm khẩu phần"
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="w-8 text-center text-stone-900 dark:text-stone-100 font-bold">
                  {servings}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 rounded-md hover:bg-stone-200 dark:hover:bg-stone-700"
                  onClick={() => handleSetServings(servings + 1)}
                  title="Tăng khẩu phần"
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>

            {servings !== initialServings && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleSetServings(initialServings)}
                className="h-8 px-2 text-[11px] text-stone-600 gap-1"
                title="Khôi phục khẩu phần ban đầu"
              >
                <RotateCcw className="h-3 w-3" />
                Đặt lại ({initialServings})
              </Button>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-4">
        {orderedIngredients.length === 0 ? (
          <p className="py-4 text-sm text-stone-500" role="status">
            Chưa có thông tin nguyên liệu cho công thức này.
          </p>
        ) : (
          <div className="divide-y divide-stone-100 dark:divide-stone-800/60">
            {orderedIngredients.map((ing, idx) => {
              const ingId = ing.id || `ing-${idx}`;
              const isChecked = !!checkedIds[ingId];

              return (
                <label
                  key={ingId}
                  className={cn(
                    'flex items-center justify-between py-3 px-2 rounded-lg cursor-pointer transition-colors hover:bg-stone-50 dark:hover:bg-stone-800/40 select-none',
                    isChecked && 'opacity-50'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div
                      onClick={(e) => {
                        e.preventDefault();
                        toggleCheck(ingId);
                      }}
                      className={cn(
                        'h-5 w-5 rounded-md border flex items-center justify-center transition-all',
                        isChecked
                          ? 'bg-amber-600 border-amber-600 text-white'
                          : 'border-stone-300 dark:border-stone-600 hover:border-amber-500'
                      )}
                    >
                      {isChecked && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                    </div>
                    <div>
                      <span
                        className={cn(
                          'text-sm font-medium text-stone-900 dark:text-stone-100',
                          isChecked && 'line-through text-stone-400 dark:text-stone-500'
                        )}
                      >
                        {ing.name}
                      </span>
                      {ing.notes && (
                        <span className="block text-xs text-stone-500 dark:text-stone-400">
                          {ing.notes}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="text-xs sm:text-sm font-bold text-amber-700 dark:text-amber-400 font-mono">
                    {formatQuantity(ing.quantity)} {ing.unit || ''}
                  </div>
                </label>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

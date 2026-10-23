'use client';

import * as React from 'react';
import Image from 'next/image';
import { RecipeStepDto } from '@/types';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ChefHat, Timer, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export function RecipeSteps({ steps }: { steps: RecipeStepDto[] }) {
  const [completedSteps, setCompletedSteps] = React.useState<Record<number, boolean>>({});
  const orderedSteps = [...steps].sort((first, second) => first.stepNumber - second.stepNumber);

  const toggleComplete = (stepNumber: number) => {
    setCompletedSteps((prev) => ({
      ...prev,
      [stepNumber]: !prev[stepNumber],
    }));
  };

  return (
    <Card className="border-stone-200/80 shadow-xs dark:border-stone-800">
      <CardHeader className="pb-3 border-b border-stone-100 dark:border-stone-800">
        <div className="flex items-center gap-2">
          <ChefHat className="h-5 w-5 text-amber-600" />
          <CardTitle className="text-lg font-bold">Các Bước Thực Hiện</CardTitle>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        {orderedSteps.length === 0 ? (
          <p className="py-4 text-sm text-stone-500" role="status">
            Chưa có hướng dẫn thực hiện cho công thức này.
          </p>
        ) : (
          <div className="space-y-8 relative before:absolute before:inset-0 before:left-5 before:w-0.5 before:bg-stone-200 dark:before:bg-stone-800 before:-z-0">
            {orderedSteps.map((step) => {
              const isDone = !!completedSteps[step.stepNumber];

              return (
                <div
                  key={step.stepNumber}
                  className={cn(
                    'relative flex items-start gap-4 sm:gap-6 z-10 transition-opacity',
                    isDone && 'opacity-60'
                  )}
                >
                {/* Step Circle Badge */}
                <button
                  type="button"
                  onClick={() => toggleComplete(step.stepNumber)}
                  className={cn(
                    'h-10 w-10 rounded-full flex items-center justify-center font-black text-sm shrink-0 border-2 transition-all shadow-xs cursor-pointer',
                    isDone
                      ? 'bg-emerald-600 border-emerald-600 text-white'
                      : 'bg-white dark:bg-stone-900 border-amber-500 text-amber-600 hover:scale-105'
                  )}
                  title={isDone ? 'Đánh dấu chưa hoàn thành' : 'Đánh dấu đã hoàn thành'}
                >
                  {isDone ? <CheckCircle2 className="h-5 w-5" /> : step.stepNumber}
                </button>

                {/* Step Content */}
                <div className="flex-1 space-y-3 pt-1">
                  <div className="flex items-center justify-between">
                    <h4
                      className={cn(
                        'text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100',
                        isDone && 'line-through text-stone-500'
                      )}
                    >
                      {step.title || `Bước ${step.stepNumber}`}
                    </h4>
                    {step.timerMinutes != null && (
                      <span className="inline-flex items-center gap-1 text-xs text-stone-500">
                        <Timer className="h-3.5 w-3.5" />
                        {step.timerMinutes} phút
                      </span>
                    )}
                  </div>

                  <p className="text-stone-700 dark:text-stone-300 text-sm sm:text-base leading-relaxed">
                    {step.description}
                  </p>

                  {/* Step Image (if provided) */}
                  {step.imageUrl && (
                    <div className="relative aspect-video w-full max-w-md rounded-xl overflow-hidden border border-stone-200 dark:border-stone-800 mt-3 shadow-xs">
                      <Image
                        src={step.imageUrl}
                        alt={`Bước ${step.stepNumber}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 400px"
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

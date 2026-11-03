'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  ListFilter,
  Volume2,
  VolumeX,
  Sparkles,
  Timer,
  Eye,
} from 'lucide-react';
import { RecipeStepDto, RecipeIngredientDto } from '@/types';

interface CookingModeModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipeTitle: string;
  steps: RecipeStepDto[];
  ingredients: RecipeIngredientDto[];
  servings: number;
}

/**
 * Phát âm thanh thông báo khi bộ đếm giờ kết thúc bằng Web Audio API
 */
function playCompletionChime() {
  if (typeof window === 'undefined') return;
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
    osc.frequency.setValueAtTime(880, ctx.currentTime + 0.15); // A5
    osc.frequency.setValueAtTime(1174.66, ctx.currentTime + 0.3); // D6

    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.8);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.85);
  } catch (err) {
    console.warn('Cannot play audio chime:', err);
  }
}

export function CookingModeModal({
  isOpen,
  onClose,
  recipeTitle,
  steps,
  ingredients,
  servings,
}: CookingModeModalProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({});
  const [showIngredients, setShowIngredients] = useState(false);
  const [wakeLockActive, setWakeLockActive] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Timer states
  const [timerSecondsLeft, setTimerSecondsLeft] = useState<number | null>(null);
  const [timerRunning, setTimerRunning] = useState(false);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const orderedSteps = React.useMemo(() => {
    return [...steps].sort((a, b) => a.stepNumber - b.stepNumber);
  }, [steps]);

  const currentStep = orderedSteps[currentStepIndex];
  const isFinalStep = currentStepIndex === orderedSteps.length - 1;
  const progressPercent =
    orderedSteps.length > 0 ? ((currentStepIndex + 1) / orderedSteps.length) * 100 : 0;

  // Khởi tạo timer khi chuyển bước
  useEffect(() => {
    if (!currentStep) return;
    if (currentStep.timerMinutes && currentStep.timerMinutes > 0) {
      setTimerSecondsLeft(currentStep.timerMinutes * 60);
    } else {
      setTimerSecondsLeft(null);
    }
    setTimerRunning(false);
  }, [currentStepIndex, currentStep]);

  // Bộ đếm ngược
  useEffect(() => {
    if (timerRunning && timerSecondsLeft !== null && timerSecondsLeft > 0) {
      timerIntervalRef.current = setInterval(() => {
        setTimerSecondsLeft((prev) => {
          if (prev === null || prev <= 1) {
            clearInterval(timerIntervalRef.current!);
            setTimerRunning(false);
            if (soundEnabled) playCompletionChime();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    }

    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [timerRunning, timerSecondsLeft, soundEnabled]);

  // Screen Wake Lock API (Giữ màn hình luôn sáng khi nấu ăn)
  useEffect(() => {
    if (!isOpen) return;

    let wakeLock: any = null;
    const requestWakeLock = async () => {
      try {
        if ('wakeLock' in navigator) {
          wakeLock = await (navigator as any).wakeLock.request('screen');
          setWakeLockActive(true);
        }
      } catch (err) {
        console.warn('Wake Lock error:', err);
      }
    };

    void requestWakeLock();

    return () => {
      if (wakeLock) {
        wakeLock.release().catch(() => {});
        setWakeLockActive(false);
      }
    };
  }, [isOpen]);

  // Phím tắt bàn phím
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight' && currentStepIndex < orderedSteps.length - 1) {
        setCurrentStepIndex((prev) => prev + 1);
      } else if (e.key === 'ArrowLeft' && currentStepIndex > 0) {
        setCurrentStepIndex((prev) => prev - 1);
      } else if (e.key === ' ' && timerSecondsLeft !== null) {
        e.preventDefault();
        setTimerRunning((prev) => !prev);
      }
    },
    [isOpen, currentStepIndex, orderedSteps.length, timerSecondsLeft, onClose]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (!isOpen || !currentStep) return null;

  const toggleStepDone = () => {
    setCompletedSteps((prev) => ({
      ...prev,
      [currentStep.stepNumber]: !prev[currentStep.stepNumber],
    }));
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/95 text-stone-100 flex flex-col font-sans backdrop-blur-md animate-fadeIn">
      {/* Top Header Bar */}
      <header className="px-6 py-4 bg-stone-900/80 border-b border-stone-800 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="p-2 bg-amber-500/20 text-amber-400 rounded-xl">
            <Sparkles className="h-5 w-5" />
          </span>
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400 block">
              Chế độ nấu ăn rảnh tay (Cooking Focus Mode)
            </span>
            <h2 className="text-base sm:text-lg font-bold text-white line-clamp-1">{recipeTitle}</h2>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {wakeLockActive && (
            <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 text-[11px] font-medium">
              <Eye className="h-3.5 w-3.5" /> Màn hình luôn sáng
            </span>
          )}

          <button
            type="button"
            onClick={() => setSoundEnabled((prev) => !prev)}
            className="p-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors"
            title={soundEnabled ? 'Tắt âm báo' : 'Bật âm báo'}
          >
            {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          </button>

          <button
            type="button"
            onClick={() => setShowIngredients((prev) => !prev)}
            className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              showIngredients
                ? 'bg-amber-500 text-stone-950 border-amber-400'
                : 'bg-stone-800 hover:bg-stone-700 border-stone-700 text-stone-200'
            }`}
          >
            <ListFilter className="h-3.5 w-3.5" /> Nguyên liệu ({ingredients.length})
          </button>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg bg-stone-800 hover:bg-rose-900/60 hover:text-rose-200 text-stone-400 transition-colors ml-2"
            title="Thoát chế độ nấu ăn (Esc)"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="w-full bg-stone-800 h-1.5 relative">
        <div
          className="bg-gradient-to-r from-amber-500 to-emerald-500 h-full transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Main Body */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Step Content Area */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-12 max-w-4xl mx-auto flex flex-col justify-between">
          <div className="space-y-6">
            {/* Step Counter Badge */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-3.5 py-1 rounded-full bg-amber-500 text-stone-950 font-black text-xs uppercase tracking-wider">
                  Bước {currentStep.stepNumber} / {orderedSteps.length}
                </span>
                {completedSteps[currentStep.stepNumber] && (
                  <span className="flex items-center gap-1 text-emerald-400 text-xs font-semibold">
                    <CheckCircle2 className="h-4 w-4" /> Đã hoàn thành
                  </span>
                )}
              </div>

              {currentStep.timerMinutes != null && (
                <span className="text-xs text-stone-400 flex items-center gap-1">
                  <Timer className="h-4 w-4 text-amber-400" /> Thời gian ước tính: {currentStep.timerMinutes} phút
                </span>
              )}
            </div>

            {/* Step Big Title */}
            <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight tracking-tight">
              {currentStep.title || `Bước ${currentStep.stepNumber}`}
            </h1>

            {/* Step Instruction Text */}
            <p className="text-stone-300 text-lg sm:text-2xl leading-relaxed font-light">
              {currentStep.description}
            </p>

            {/* Step Image */}
            {currentStep.imageUrl && (
              <div className="relative aspect-video w-full max-w-2xl rounded-2xl overflow-hidden border border-stone-800 shadow-2xl my-4">
                <Image
                  src={currentStep.imageUrl}
                  alt={`Bước ${currentStep.stepNumber}`}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            {/* Countdown Timer Widget (nếu có timerMinutes) */}
            {timerSecondsLeft !== null && (
              <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800 max-w-md my-4 shadow-xl">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-stone-400 flex items-center gap-1.5">
                    <Timer className="h-4 w-4 text-amber-500" /> Đồng hồ đếm ngược
                  </span>
                  <span className="text-xs font-mono text-stone-500">Nhấn Space để Dừng/Chạy</span>
                </div>

                <div className="text-center my-4">
                  <span
                    className={`font-mono font-black text-5xl sm:text-6xl tracking-wider ${
                      timerSecondsLeft === 0
                        ? 'text-emerald-400 animate-pulse'
                        : timerRunning
                        ? 'text-amber-400'
                        : 'text-stone-200'
                    }`}
                  >
                    {formatTimer(timerSecondsLeft)}
                  </span>
                </div>

                <div className="flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => setTimerRunning((prev) => !prev)}
                    className={`px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                      timerRunning
                        ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-md'
                        : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md'
                    }`}
                  >
                    {timerRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    {timerRunning ? 'Tạm dừng' : 'Bắt đầu đếm'}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setTimerRunning(false);
                      setTimerSecondsLeft((currentStep.timerMinutes || 5) * 60);
                    }}
                    className="p-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors"
                    title="Đặt lại đồng hồ"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Action Checkbox */}
          <div className="pt-8 border-t border-stone-800/80 mt-8 flex items-center justify-between">
            <button
              type="button"
              onClick={toggleStepDone}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                completedSteps[currentStep.stepNumber]
                  ? 'bg-emerald-600 text-white'
                  : 'bg-stone-900 border border-stone-700 text-stone-300 hover:bg-stone-800'
              }`}
            >
              <CheckCircle2 className="h-5 w-5" />
              {completedSteps[currentStep.stepNumber]
                ? 'Đã xong bước này (Nhấn để hủy)'
                : 'Đánh dấu đã hoàn thành bước này'}
            </button>

            {isFinalStep && (
              <span className="text-xs text-amber-400 font-bold animate-pulse">
                🎉 Đây là bước cuối cùng!
              </span>
            )}
          </div>
        </div>

        {/* Sliding Ingredients Drawer */}
        {showIngredients && (
          <aside className="w-80 sm:w-96 bg-stone-900 border-l border-stone-800 p-6 overflow-y-auto space-y-4 animate-slideLeft">
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <h3 className="font-bold text-sm text-white">Nguyên liệu ({servings} phần ăn)</h3>
              <button
                type="button"
                onClick={() => setShowIngredients(false)}
                className="text-stone-400 hover:text-white text-xs"
              >
                ✕ Đóng
              </button>
            </div>
            <ul className="space-y-2 text-xs">
              {ingredients.map((ing, idx) => (
                <li
                  key={idx}
                  className="p-2.5 rounded-lg bg-stone-800/60 border border-stone-800 flex items-center justify-between"
                >
                  <span className="font-medium text-stone-200">{ing.name}</span>
                  <span className="font-mono text-amber-400 font-bold">
                    {ing.quantity ?? ''} {ing.unit ?? ''}
                  </span>
                </li>
              ))}
            </ul>
          </aside>
        )}
      </div>

      {/* Footer Navigation Controls */}
      <footer className="px-6 py-4 bg-stone-900 border-t border-stone-800 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setCurrentStepIndex((prev) => Math.max(prev - 1, 0))}
          disabled={currentStepIndex === 0}
          className="px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold flex items-center gap-1.5 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="h-4 w-4" /> Bước trước
        </button>

        <span className="text-xs font-mono text-stone-500 hidden sm:inline-block">
          Dùng phím mũi tên ◄ ► để chuyển bước
        </span>

        {isFinalStep ? (
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-lg shadow-emerald-900/30"
          >
            <CheckCircle2 className="h-4 w-4" /> Hoàn thành món ăn
          </button>
        ) : (
          <button
            type="button"
            onClick={() =>
              setCurrentStepIndex((prev) => Math.min(prev + 1, orderedSteps.length - 1))
            }
            className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-lg shadow-amber-900/30"
          >
            Bước tiếp theo <ChevronRight className="h-4 w-4" />
          </button>
        )}
      </footer>
    </div>
  );
}


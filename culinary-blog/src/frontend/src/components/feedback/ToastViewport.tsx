'use client';

import { useUIStore, type ToastType } from '@/stores/useUIStore';

const toastStyles: Record<ToastType, string> = {
  success: 'border-emerald-200 bg-emerald-50 text-emerald-900',
  error: 'border-rose-200 bg-rose-50 text-rose-900',
  info: 'border-sky-200 bg-sky-50 text-sky-900',
  warning: 'border-amber-200 bg-amber-50 text-amber-900',
};

const toastIcons: Record<ToastType, string> = {
  success: '✓',
  error: '⚠',
  info: 'ℹ',
  warning: '!',
};

export function ToastViewport() {
  const toasts = useUIStore((state) => state.toasts);
  const removeToast = useUIStore((state) => state.removeToast);

  return (
    <div className="pointer-events-none fixed bottom-6 right-6 z-[60] flex w-[min(24rem,calc(100vw-3rem))] flex-col gap-3">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          role={toast.type === 'error' ? 'alert' : 'status'}
          aria-atomic="true"
          className={`pointer-events-auto flex items-start gap-3 rounded-xl border p-4 text-sm shadow-lg ${toastStyles[toast.type]}`}
        >
          <span aria-hidden="true" className="font-bold">
            {toastIcons[toast.type]}
          </span>
          <p className="flex-1">{toast.message}</p>
          <button
            type="button"
            aria-label="Đóng thông báo"
            onClick={() => removeToast(toast.id)}
            className="rounded px-1 font-bold opacity-70 hover:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}

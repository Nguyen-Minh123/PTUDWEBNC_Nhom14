import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Tiện ích kết hợp class Tailwind CSS và xử lý xung đột class (Merge class conflict)
 * Chuẩn Design System cho shadcn/ui
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

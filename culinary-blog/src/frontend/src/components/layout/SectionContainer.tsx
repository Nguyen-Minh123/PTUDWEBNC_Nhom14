import * as React from 'react';
import { cn } from '@/lib/utils';

export interface SectionContainerProps extends React.HTMLAttributes<HTMLElement> {
  spacing?: 'sm' | 'default' | 'lg' | 'none';
  background?: 'transparent' | 'muted' | 'card' | 'gradient';
}

const spacingClasses = {
  none: 'py-0',
  sm: 'py-6 md:py-8',
  default: 'py-10 md:py-14',
  lg: 'py-16 md:py-24',
};

const bgClasses = {
  transparent: 'bg-transparent',
  muted: 'bg-stone-50/70 dark:bg-stone-900/40',
  card: 'bg-white dark:bg-stone-900 shadow-sm border-y border-stone-200/60 dark:border-stone-800',
  gradient: 'bg-gradient-to-b from-amber-50/40 via-white to-stone-50 dark:from-stone-950 dark:to-stone-900',
};

export function SectionContainer({
  className,
  spacing = 'default',
  background = 'transparent',
  children,
  ...props
}: SectionContainerProps) {
  return (
    <section
      className={cn('w-full relative', spacingClasses[spacing], bgClasses[background], className)}
      {...props}
    >
      {children}
    </section>
  );
}

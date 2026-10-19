import * as React from 'react';
import { cn } from '@/lib/utils';

export interface MainContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'default' | 'narrow' | 'wide' | 'full';
}

const sizeClasses = {
  narrow: 'max-w-4xl',
  default: 'max-w-7xl',
  wide: 'max-w-[1400px]',
  full: 'max-w-full',
};

export function MainContainer({
  className,
  size = 'default',
  children,
  ...props
}: MainContainerProps) {
  return (
    <div
      className={cn(
        'mx-auto w-full px-4 sm:px-6 lg:px-8',
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

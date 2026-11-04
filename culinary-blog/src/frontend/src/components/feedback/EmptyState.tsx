import type { ReactNode } from 'react';

type EmptyStateProps = {
  title: string;
  description?: string;
  icon?: ReactNode;
  className?: string;
  children?: ReactNode;
};

export function EmptyState({
  title,
  description,
  icon,
  className = '',
  children,
}: EmptyStateProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`text-center ${className}`.trim()}
    >
      {icon && (
        <span aria-hidden="true" className="text-4xl">
          {icon}
        </span>
      )}
      <h3 className="text-base font-bold text-gray-800 mt-3">{title}</h3>
      {description && (
        <p className="text-xs text-gray-500 mt-1 max-w-md mx-auto">
          {description}
        </p>
      )}
      {children && <div>{children}</div>}
    </div>
  );
}

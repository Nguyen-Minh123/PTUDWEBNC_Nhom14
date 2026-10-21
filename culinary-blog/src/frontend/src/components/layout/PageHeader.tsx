import * as React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  actions?: React.ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  description,
  breadcrumbs,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <div className={cn('pb-6 border-b border-stone-200/70 mb-8 dark:border-stone-800', className)}>
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav aria-label="Breadcrumb" className="mb-3">
          <ol className="flex items-center space-x-2 text-xs sm:text-sm text-stone-500">
            {breadcrumbs.map((item, index) => {
              const isLast = index === breadcrumbs.length - 1;
              return (
                <li key={index} className="flex items-center space-x-2">
                  {index > 0 && <ChevronRight className="h-3.5 w-3.5 text-stone-400 shrink-0" />}
                  {item.href && !isLast ? (
                    <Link
                      href={item.href}
                      className="hover:text-amber-600 transition-colors duration-150"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span className={cn('font-medium', isLast ? 'text-stone-900 dark:text-stone-100' : '')}>
                      {item.label}
                    </span>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      )}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-stone-900 dark:text-stone-50">
            {title}
          </h1>
          {description && (
            <p className="mt-2 text-sm sm:text-base text-stone-600 dark:text-stone-400 max-w-3xl leading-relaxed">
              {description}
            </p>
          )}
        </div>
        {actions && <div className="flex items-center gap-3 shrink-0">{actions}</div>}
      </div>
    </div>
  );
}

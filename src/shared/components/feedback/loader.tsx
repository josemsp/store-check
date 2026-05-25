import { Loader2 } from 'lucide-react';

import { cn } from '@/shared/lib/utils';

interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: number;
}

export function Loader({ className, size = 24, ...props }: LoaderProps) {
  return (
    <div className={cn('flex items-center justify-center', className)} {...props}>
      <Loader2 className="animate-spin text-primary" size={size} />
    </div>
  );
}

export function FullPageLoader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center bg-background/0 backdrop-blur-sm',
        className,
      )}
      {...props}
    >
      <Loader size={48} />
    </div>
  );
}

interface LoaderDotsProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: number;
  dots?: number;
  animationDelay?: number;
  dotClassName?: string;
  dotColor?: string;
}

export function LoaderDots({
  className,
  size = 8,
  dots = 3,
  animationDelay = 0.15,
  dotClassName,
  dotColor,
  ...props
}: LoaderDotsProps) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn('flex items-center justify-center gap-2', className)}
      {...props}
    >
      {Array.from({ length: dots }).map((_, idx) => (
        <span
          key={idx}
          className={cn('animate-bounce rounded-full w-3 h-3', dotClassName)}
          style={{
            animationDelay: `${idx * animationDelay}s`,
            backgroundColor: dotColor,
          }}
        />
      ))}

      <span className="sr-only">Loading...</span>
    </div>
  );
}

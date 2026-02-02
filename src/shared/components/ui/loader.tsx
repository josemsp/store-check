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

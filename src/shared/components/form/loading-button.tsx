import { Loader2 } from 'lucide-react';

import type { ComponentProps, ReactNode } from 'react';

import { Button } from '@/shared/components/ui/button';

export interface LoadingButtonProps extends ComponentProps<typeof Button> {
  isLoading?: boolean;
  loadingText?: ReactNode;
  icon?: ReactNode;
}

export const LoadingButton = ({
  isLoading,
  loadingText,
  icon,
  children,
  disabled,
  ...props
}: LoadingButtonProps) => {
  return (
    <Button disabled={isLoading || disabled} {...props}>
      {isLoading ? (
        <>
          <Loader2 className="animate-spin" />
          {loadingText ?? children}
        </>
      ) : (
        <>
          {icon}
          {children}
        </>
      )}
    </Button>
  );
};

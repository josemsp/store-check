import type { VariantProps } from 'class-variance-authority';

import { Button, buttonVariants } from '../../ui/button';

export const StepperNavigationButtons = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex items-center justify-between gap-4 mt-8">{children}</div>;
};

type ButtonVariants = VariantProps<typeof buttonVariants>;

interface StepperNavigationButtonProps {
  onClick: () => void;
  disabled?: boolean;
  variant?: ButtonVariants['variant'];
  size?: ButtonVariants['size'];
  children: React.ReactNode;
  ariaLabel?: string;
  className?: string;
}

export const StepperNavigationButton = ({
  onClick,
  disabled,
  variant = 'outline',
  size = 'lg',
  children,
  ariaLabel,
  className,
}: StepperNavigationButtonProps) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      variant={variant}
      size={size}
      className={className}
      aria-label={ariaLabel}
    >
      {children}
    </Button>
  );
};

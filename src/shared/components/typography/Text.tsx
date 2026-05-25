import { type VariantProps, cva } from 'class-variance-authority';

import { cn } from '@/shared/lib/utils';

const textVariants = cva('text-sm text-foreground', {
  variants: {
    variant: {
      default: 'leading-7',
      muted: 'text-muted-foreground',
      lead: 'text-lg text-muted-foreground md:text-xl',
      small: 'text-xs leading-5',
      caption: 'text-xs text-muted-foreground leading-4',
      destructive: 'text-destructive',
      success: 'text-emerald-600 dark:text-emerald-500',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

type TextProps<T extends React.ElementType> = {
  as?: T;
  className?: string;
  variant?: VariantProps<typeof textVariants>['variant'];
} & React.ComponentPropsWithoutRef<T>;

export function Text<T extends React.ElementType = 'p'>({
  as,
  className,
  variant,
  ...props
}: TextProps<T>) {
  const Comp = as || 'p';

  return <Comp className={cn(textVariants({ variant }), className)} {...props} />;
}

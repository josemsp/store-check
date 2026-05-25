import { type VariantProps, cva } from 'class-variance-authority';

import { cn } from '@/shared/lib/utils';

const headingVariants = cva('font-semibold tracking-tight text-foreground', {
  variants: {
    variant: {
      display: 'text-4xl leading-tight md:text-5xl lg:text-6xl',
      hero: 'text-3xl leading-tight md:text-4xl lg:text-5xl',
      title: 'text-2xl leading-tight md:text-3xl',
      section: 'text-xl leading-snug md:text-2xl',
      card: 'text-lg leading-snug',
      label: 'text-sm leading-none',
    },
  },
  defaultVariants: {
    variant: 'title',
  },
});

type HeadingElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>, VariantProps<typeof headingVariants> {
  as?: HeadingElement;
}

export function Heading({ as: Comp = 'h2', variant, className, ...props }: HeadingProps) {
  return <Comp className={cn(headingVariants({ variant }), className)} {...props} />;
}

import type { PropsWithChildren } from 'react';

import { ThemeToggle } from '@/shared/layout/theme-toggle';

export function OnboardingLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <ThemeToggle className="absolute top-4 right-4" />

      <div className="flex min-h-screen items-center justify-center p-4">{children}</div>
    </div>
  );
}

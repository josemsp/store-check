import { Moon, Sun } from 'lucide-react';

import { useTheme } from '@/app/providers/theme-provider';
import { cn } from '@/shared/lib/utils';

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={cn(
        `
          relative flex h-10 w-10 items-center justify-center
          overflow-hidden rounded-full
          transition-all duration-500
          active:scale-95 cursor-pointer
        `,
        isDark
          ? `
              bg-zinc-700 hover:bg-zinc-600 hover:shadow-none transition-all duration-500
              shadow-[12px_12px_30px_rgba(0,0,0,0.35),-8px_-8px_20px_rgba(255,255,255,0.03)]
            `
          : `
              bg-[#f3f3f3] hover:bg-[#dcdcdc] hover:shadow-none transition-all duration-500
              shadow-[12px_12px_30px_rgba(0,0,0,0.08),-8px_-8px_20px_rgba(255,255,255,0.9)]
            `,
        className,
      )}
    >
      {/* Glow */}
      <div
        className={cn(
          `
            absolute inset-0 rounded-full
            transition-opacity duration-500
          `,
          isDark ? 'bg-white/5' : 'bg-white/40',
        )}
      />

      {/* Sun */}
      <Sun
        strokeWidth={1.75}
        className={cn(
          `
            absolute h-5 w-5
            transition-all duration-500
          `,
          isDark
            ? `
                scale-0 rotate-90 opacity-0
                text-white hover:text-white
              `
            : `
                scale-100 rotate-0 opacity-100
                text-zinc-400 hover:text-zinc-600
              `,
        )}
      />

      {/* Moon */}
      <Moon
        strokeWidth={1.75}
        className={cn(
          `
            absolute h-5 w-5
            transition-all duration-500
          `,
          isDark
            ? `
                scale-100 rotate-0 opacity-100
                text-white
              `
            : `
                scale-0 -rotate-90 opacity-0
                text-zinc-300
              `,
        )}
      />
    </button>
  );
}

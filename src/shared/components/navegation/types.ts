import type { LucideIcon } from 'lucide-react';

interface NavItemBase {
  title: string;
  to: string;
  preload?: () => void;
}

export interface NavItem extends NavItemBase {
  icon?: LucideIcon;
  isActive?: boolean;
  items?: NavItemBase[];
}

import type { LucideIcon } from 'lucide-react';
import {
  BookOpen,
  Bot,
  Command,
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
} from 'lucide-react';

import type { ComponentProps } from 'react';
import { Link } from 'react-router-dom';

import { useProfileContext } from '@/app/providers/profile-provider';
import { preloadInvitations, preloadOwnerInvitations } from '@/app/router';
import type { NavItem } from '@/shared/components/navegation/types';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/shared/components/ui/sidebar';
import { PATHS } from '@/shared/constants/paths';

import { NavUser } from '../../../features/users/components/nav-user';
import { NavMain } from '../../components/navegation/nav-main';

// Types for sidebar data structure
// type NavSubItem = {
//   title: string;
//   url: string;
// };

// type NavMainItem = {
//   title: string;
//   url: string;
//   icon: LucideIcon;
//   isActive?: boolean;
//   preload?: () => Promise<unknown>;
//   items?: NavItem[];
// };

// type NavSecondaryItem = {
//   title: string;
//   url: string;
//   icon: LucideIcon;
// };

type ProjectItem = {
  name: string;
  url: string;
  icon: LucideIcon;
};

type SidebarData = {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
  navMain: NavItem[];
  navSecondary: NavItem[];
  projects: ProjectItem[];
};

const data: SidebarData = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  navMain: [
    {
      title: 'Playground',
      to: '#',
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: 'History',
          to: '#',
        },
        {
          title: 'Starred',
          to: '#',
        },
        {
          title: 'Settings',
          to: '#',
        },
      ],
    },
    {
      title: 'Models',
      to: '#',
      icon: Bot,
      items: [
        {
          title: 'Genesis',
          to: '#',
        },
        {
          title: 'Explorer',
          to: '#',
        },
        {
          title: 'Quantum',
          to: '#',
        },
      ],
    },
    {
      title: 'Documentation',
      to: '#',
      icon: BookOpen,
      items: [
        {
          title: 'Introduction',
          to: '#',
        },
        {
          title: 'Get Started',
          to: '#',
        },
        {
          title: 'Tutorials',
          to: '#',
        },
        {
          title: 'Changelog',
          to: '#',
        },
      ],
    },
    {
      title: 'Settings',
      to: '#',
      icon: Settings2,
      items: [
        {
          title: 'General',
          to: '#',
        },
        {
          title: 'Team',
          to: '#',
        },
        {
          title: 'Billing',
          to: '#',
        },
        {
          title: 'Limits',
          to: '#',
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: 'Support',
      to: '#',
      icon: LifeBuoy,
    },
    {
      title: 'Feedback',
      to: '#',
      icon: Send,
    },
  ],
  projects: [
    {
      name: 'Design Engineering',
      url: '#',
      icon: Frame,
    },
    {
      name: 'Sales & Marketing',
      url: '#',
      icon: PieChart,
    },
    {
      name: 'Travel',
      url: '#',
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
  const { data: profile } = useProfileContext();

  const navMainItems: NavItem[] = [...data.navMain];

  if (profile?.is_root) {
    navMainItems.push({
      title: 'Invitaciones',
      to: PATHS.ROOT_INVITATIONS,
      icon: Send,
      isActive: false,
      preload: preloadInvitations,
      items: [],
    });
  }

  if (profile?.is_owner) {
    navMainItems.push({
      title: 'Invitaciones',
      to: PATHS.INVITATIONS,
      icon: Send,
      isActive: false,
      preload: preloadOwnerInvitations,
      items: [],
    });
  }

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              render={
                <Link to={PATHS.ROOT_DASHBOARD}>
                  <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                    <Command className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">Store Check</span>
                    <span className="truncate text-xs">Enterprise</span>
                  </div>
                </Link>
              }
            />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMainItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}

import { ChevronRight } from 'lucide-react';

import { Link } from 'react-router-dom';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/shared/components/ui/collapsible';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/shared/components/ui/sidebar';

import type { NavItem } from './types';

interface NavMainProps {
  items: NavItem[];
}

export function NavMain({ items }: NavMainProps) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={`${item.title}-${item.to}`}
            defaultOpen={item.isActive}
            render={
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip={item.title}
                  render={
                    <NavLink
                      to={item.to}
                      title={item.title}
                      preload={item.preload}
                      icon={item.icon}
                    />
                  }
                />
                {item.items?.length ? (
                  <>
                    <CollapsibleTrigger
                      render={
                        <SidebarMenuAction className="data-[state=open]:rotate-90">
                          <ChevronRight />
                          <span className="sr-only">Toggle</span>
                        </SidebarMenuAction>
                      }
                    />
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items?.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton
                              render={
                                <NavLink
                                  to={subItem.to}
                                  title={subItem.title}
                                  preload={subItem.preload}
                                />
                              }
                            />
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </>
                ) : null}
              </SidebarMenuItem>
            }
          />
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}

export function NavLink({ to, title, preload, icon: Icon }: NavItem) {
  return (
    <Link to={to} onMouseEnter={preload} className="flex items-center gap-2">
      {Icon ? <Icon className="size-4 shrink-0" /> : null}
      <span className="truncate">{title}</span>
    </Link>
  );
}

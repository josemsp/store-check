import { BadgeCheck, Bell, ChevronsUpDown, LogOut } from 'lucide-react';

import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/app/providers/AuthProvider';
import { useProfileContext } from '@/app/providers/ProfileProvider';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/shared/components/ui/sidebar';

export function NavUser({ className }: { className?: string }) {
  const { isMobile } = useSidebar();
  const { logout } = useAuth();
  const { data: profile } = useProfileContext();
  console.log('PROFILE:', profile);
  const navigate = useNavigate();

  const Initials = () => {
    const nameParts = profile?.name?.split(' ') || [];
    const firstInitial = nameParts[0]?.charAt(0) || '';
    const lastInitial =
      nameParts.length > 1 ? nameParts[nameParts.length - 1]?.charAt(0) : '';
    return firstInitial + lastInitial;
  };

  return (
    <SidebarMenu className={className}>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={profile?.avatar_url || ''} alt={profile?.email ?? ''} />
                <AvatarFallback className="rounded-lg">{Initials()}</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{profile?.name}</span>
                <span className="truncate text-xs">{profile?.role}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={profile?.avatar_url || ''}
                    alt={profile?.email ?? ''}
                  />
                  <AvatarFallback className="rounded-lg">{Initials()}</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{profile?.name}</span>
                  <span className="truncate text-xs">{profile?.role}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() =>
                  navigate(profile?.is_root ? '/root-dashboard/profile' : '/profile')
                }
              >
                <BadgeCheck />
                Perfil
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell />
                Notificaciones
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout}>
              <LogOut />
              Cerrar sesión
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

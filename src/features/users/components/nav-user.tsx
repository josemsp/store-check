import { BadgeCheck, Bell, ChevronsUpDown, LogOut } from 'lucide-react';

import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/app/providers/auth-provider';
import { useProfileContext } from '@/app/providers/profile-provider';
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
import { PATHS } from '@/shared/constants/paths';

export function NavUser({ className }: { className?: string }) {
  const navigate = useNavigate();
  const { isMobile } = useSidebar();
  const { logout } = useAuth();
  const { data: profile } = useProfileContext();

  const initials = getInitials(profile?.name);

  const profilePath = profile?.is_root ? PATHS.ROOT_PROFILE : PATHS.PROFILE;

  const userInfo = (
    <>
      <Avatar className="size-8 rounded-lg">
        <AvatarImage
          src={profile?.avatar_url ?? undefined}
          alt={profile?.email ?? profile?.name ?? 'User avatar'}
        />

        <AvatarFallback className="rounded-lg">{initials}</AvatarFallback>
      </Avatar>

      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-medium">{profile?.name}</span>

        <span className="truncate text-xs text-muted-foreground">{profile?.role}</span>
      </div>
    </>
  );

  return (
    <SidebarMenu className={className}>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                {userInfo}
                <ChevronsUpDown className="ml-auto size-4 shrink-0" />
              </SidebarMenuButton>
            }
          />
          <DropdownMenuContent
            className="min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuGroup>
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5">{userInfo}</div>
              </DropdownMenuLabel>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => navigate(profilePath)}>
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

function getInitials(name?: string | null) {
  if (!name) return '';

  const parts = name.trim().split(/\s+/);

  return `${parts[0]?.[0] ?? ''}${parts.at(-1)?.[0] ?? ''}`.toUpperCase();
}

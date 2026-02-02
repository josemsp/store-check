import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router';

import { NavUser } from '@/features/users/components/NavUser';
import { Separator } from '@/shared/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/shared/components/ui/sidebar';
import { ModeThemeToggle } from '@/shared/layout/ModeThemeToggle';
import { AppSidebar } from '@/shared/layout/app-sidebar/AppSidebar';

const AppLayout = () => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState('fadeIn');
  // useViewTransition();

  useEffect(() => {
    if (location !== displayLocation) {
      setTransitionStage('fadeOut');
    }
  }, [location, displayLocation]);

  return (
    <SidebarProvider
      className={`transition-opacity duration-200 ${
        transitionStage === 'fadeOut' ? 'opacity-0' : 'opacity-100'
      }`}
      onTransitionEnd={() => {
        if (transitionStage === 'fadeOut') {
          setTransitionStage('fadeIn');
          setDisplayLocation(location);
        }
      }}
    >
      <AppSidebar />
      <SidebarInset className="overflow-hidden">
        <header className="flex h-16 shrink-0 items-center gap-2 bg-gray-700">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <ModeThemeToggle />
          </div>
          <NavUser className="max-w-2xs" />
        </header>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AppLayout;

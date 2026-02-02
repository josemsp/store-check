import { Navigate, Outlet } from 'react-router-dom';

import { useProfileContext } from '@/app/providers/ProfileProvider';
import { FullPageLoader } from '@/shared/components/ui/loader';

export default function DashboardRedirector() {
  const { data: profile, isLoading } = useProfileContext();

  // Show loader while profile is being fetched to prevent flickering
  if (isLoading) {
    return <FullPageLoader />;
  }

  if (profile?.isRoot) {
    return <Navigate to="/root-dashboard" replace />;
  }

  return <Outlet />;
}

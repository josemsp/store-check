import { Navigate, Outlet } from 'react-router-dom';

import { useProfileContext } from '@/app/providers/profile-provider';
import { FullPageLoader } from '@/shared/components/ui/loader';

interface RoleGuardProps {
  onlyRoot?: boolean;
  allowedRoles?: string[];
  redirectTo?: string;
}

export default function RoleGuard({
  allowedRoles = [],
  redirectTo = '/',
  onlyRoot = false,
}: RoleGuardProps) {
  const { data: profile, isLoading } = useProfileContext();

  // Show loader while profile is being fetched to prevent flickering
  if (isLoading) {
    return <FullPageLoader />;
  }

  if (onlyRoot && !profile?.is_root) {
    return <Navigate to={redirectTo} replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(profile?.role ?? '')) {
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
}

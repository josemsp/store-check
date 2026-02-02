import { Navigate, Outlet } from 'react-router-dom';

import { useProfileContext } from '@/app/providers/ProfileProvider';
import { FullPageLoader } from '@/shared/components/ui/loader';

interface RoleGuardProps {
  allowedRoles: string[];
  redirectTo?: string;
}

export default function RoleGuard({ allowedRoles, redirectTo = '/' }: RoleGuardProps) {
  const { data: profile, isLoading } = useProfileContext();

  // Show loader while profile is being fetched to prevent flickering
  if (isLoading) {
    return <FullPageLoader />;
  }

  const roles = profile?.roles ?? [];
  const hasRole = roles.some((r) => allowedRoles.includes(r.name));

  if (!hasRole) {
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
}

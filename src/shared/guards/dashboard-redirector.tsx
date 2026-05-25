import { Navigate, Outlet } from 'react-router-dom';

import { useProfileContext } from '@/app/providers/profile-provider';
import { FullPageLoader } from '@/shared/components/feedback/loader';

import { useOnboardingStore } from '../../features/onboarding/stores/use-onboarding-store';

export default function DashboardRedirector() {
  const { data: profile, isLoading } = useProfileContext();
  const storedToken = useOnboardingStore((s) => s.token);

  // Show loader while profile is being fetched to prevent flickering
  if (isLoading) {
    return <FullPageLoader />;
  }

  if (profile?.is_root) {
    return <Navigate to="/root-dashboard" replace />;
  }

  if (storedToken) {
    return <Navigate to="/onboarding" replace />;
  }

  return <Outlet />;
}

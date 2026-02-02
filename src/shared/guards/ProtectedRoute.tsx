import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '@/app/providers/AuthProvider';
import { FullPageLoader } from '@/shared/components/ui/loader';

export default function ProtectedRoute() {
  const { isAuthenticated, isInitialized } = useAuth();

  // Show loader while auth is initializing to prevent flickering
  if (!isInitialized) {
    return <FullPageLoader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

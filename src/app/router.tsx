import { Suspense, lazy } from 'react';
import { createBrowserRouter } from 'react-router';

import AppLayout from '@/app/layouts/AppLayout';
import ForgotPassword from '@/features/auth/pages/ForgotPassword';
import Signin from '@/features/auth/pages/Singnin';
import { FullPageLoader } from '@/shared/components/ui/loader';
import DashboardRedirector from '@/shared/guards/DashboardRedirector';
import NotFound from '@/shared/pages/NotFound';

import ProtectedRoute from '../shared/guards/ProtectedRoute';
import PublicRoute from '../shared/guards/PublicRoute';
import RoleGuard from '../shared/guards/RoleGuard';

const RootDashboardLazy = lazy(() => import('@/features/dashboards/admin/Dashboard'));
const InvitationsLazy = lazy(() => import('@/features/dashboards/admin/Invitations'));
const OnboardingLazy = lazy(() => import('@/features/onboarding/pages/Onboarding'));
const UserProfileLazy = lazy(() => import('@/features/users/pages/UserProfile'));

// Preload functions for lazy components - can be called on hover to prefetch
export const preloadRootDashboard = () => import('@/features/dashboards/admin/Dashboard');
export const preloadInvitations = () => import('@/features/dashboards/admin/Invitations');
export const preloadOnboarding = () => import('@/features/onboarding/pages/Onboarding');
export const preloadUserProfile = () => import('@/features/users/pages/UserProfile');

const SuspenseWrapper = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<FullPageLoader />}>{children}</Suspense>
);

export const router = createBrowserRouter([
  {
    element: <PublicRoute />,
    children: [
      {
        path: '/login',
        element: (
          <SuspenseWrapper>
            <Signin />
          </SuspenseWrapper>
        ),
      },
      {
        path: '/forgot-password',
        element: (
          <SuspenseWrapper>
            <ForgotPassword />
          </SuspenseWrapper>
        ),
      },
    ],
  },
  {
    path: '/onboarding',
    element: <ProtectedRoute />,
    children: [
      {
        index: true,
        element: (
          <SuspenseWrapper>
            <OnboardingLazy />
          </SuspenseWrapper>
        ),
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <RoleGuard allowedRoles={['root']} />,
        children: [
          {
            path: 'root-dashboard',
            element: (
              <SuspenseWrapper>
                <RootDashboardLazy />
              </SuspenseWrapper>
            ),
            children: [
              {
                index: true,
                element: (
                  <div className="p-4">Bienvenido al panel de administración Root</div>
                ),
              },
              {
                path: 'invitations',
                element: (
                  <SuspenseWrapper>
                    <InvitationsLazy />
                  </SuspenseWrapper>
                ),
              },
              {
                path: 'profile',
                element: (
                  <SuspenseWrapper>
                    <UserProfileLazy />
                  </SuspenseWrapper>
                ),
              },
            ],
          },
        ],
      },
      {
        element: <DashboardRedirector />,
        children: [
          {
            element: <AppLayout />,
            children: [
              { index: true, element: <h1>Dashboard</h1> },
              {
                path: 'users',
                element: <h1>Users</h1>,
              },
              {
                path: 'inventory',
                element: <h1>Inventory</h1>,
              },
              {
                path: 'shipments',
                element: <h1>Shipments</h1>,
              },
              {
                path: 'branches',
                element: <h1>Branches</h1>,
              },
              {
                path: 'profile',
                element: (
                  <SuspenseWrapper>
                    <UserProfileLazy />
                  </SuspenseWrapper>
                ),
              },
              {
                path: 'admin',
                element: <h1>Admin</h1>,
                children: [
                  {
                    path: 'users',
                    element: <h1>Admin Users</h1>,
                  },
                  {
                    path: 'settings',
                    element: <h1>Admin Settings</h1>,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

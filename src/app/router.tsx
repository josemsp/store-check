import { Suspense, lazy } from 'react';
import { createBrowserRouter } from 'react-router';

import AppLayout from '@/app/layouts/app-layout';
import { FullPageLoader } from '@/shared/components/ui/loader';
import DashboardRedirector from '@/shared/guards/dashboard-redirector';

import ProtectedRoute from '../shared/guards/protected-route';
import PublicRoute from '../shared/guards/public-route';
import RoleGuard from '../shared/guards/role-guard';

const SigninLazy = lazy(() => import('@/features/auth/pages/signin'));
const ForgotPasswordLazy = lazy(() => import('@/features/auth/pages/forgot-password'));
const NotFoundLazy = lazy(() => import('@/shared/pages/not-found'));
const RootDashboardLazy = lazy(() => import('@/features/dashboards/admin/dashboard'));
const InvitationsLazy = lazy(() => import('@/features/dashboards/admin/invitations'));
const OwnerInvitationsLazy = lazy(
  () => import('@/features/invitations/pages/owner-invitations-page'),
);
const OnboardingLazy = lazy(() => import('@/features/onboarding/pages/onboarding'));
const UserProfileLazy = lazy(() => import('@/features/users/pages/user-profile'));

// Preload functions for lazy components - can be called on hover to prefetch
export const preloadSignin = () => import('@/features/auth/pages/signin');
export const preloadForgotPassword = () =>
  import('@/features/auth/pages/forgot-password');
export const preloadNotFound = () => import('@/shared/pages/not-found');
export const preloadRootDashboard = () => import('@/features/dashboards/admin/dashboard');
export const preloadInvitations = () => import('@/features/dashboards/admin/invitations');
export const preloadOwnerInvitations = () =>
  import('@/features/invitations/pages/owner-invitations-page');
export const preloadOnboarding = () => import('@/features/onboarding/pages/onboarding');
export const preloadUserProfile = () => import('@/features/users/pages/user-profile');

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
            <SigninLazy />
          </SuspenseWrapper>
        ),
      },
      {
        path: '/forgot-password',
        element: (
          <SuspenseWrapper>
            <ForgotPasswordLazy />
          </SuspenseWrapper>
        ),
      },
    ],
  },
  {
    path: '/onboarding',
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
        element: <RoleGuard onlyRoot redirectTo="/" />,
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
                path: 'invitations',
                element: (
                  <SuspenseWrapper>
                    <OwnerInvitationsLazy />
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
    element: (
      <SuspenseWrapper>
        <NotFoundLazy />
      </SuspenseWrapper>
    ),
  },
]);

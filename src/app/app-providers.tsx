import { useEffect } from 'react';

import { setupInterceptors } from '@/infra/api/interceptors';
import { tokenStore } from '@/infra/api/token-store';

import { AuthProvider } from './providers/auth-provider';
import { InitializerProvider } from './providers/initializer-provider';
import { ProfileProvider } from './providers/profile-provider';
import { QueryAuthBridge } from './providers/query-auth-bridge';
import { QueryProvider } from './providers/query-provider';
import { ThemeProvider } from './providers/theme-provider';
import { ToastProvider } from './providers/toast-provider';

export function AxiosAuthBridge() {
  useEffect(() => {
    setupInterceptors(() => tokenStore.token);
  }, []);

  return null;
}

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AuthProvider>
        <QueryProvider>
          <ProfileProvider>
            <InitializerProvider>
              <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                <ToastProvider />
                <AxiosAuthBridge />
                <QueryAuthBridge />
                {children}
              </ThemeProvider>
            </InitializerProvider>
          </ProfileProvider>
        </QueryProvider>
      </AuthProvider>
    </>
  );
};

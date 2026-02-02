import { useEffect } from 'react';

import { setupInterceptors } from '@/infra/api/interceptors';
import { tokenStore } from '@/infra/api/tokenStore';

import { AuthProvider } from './providers/AuthProvider';
import { InitializerProvider } from './providers/InitializerProvider';
import { ProfileProvider } from './providers/ProfileProvider';
import { QueryAuthBridge } from './providers/QueryAuthBridge';
import { QueryProvider } from './providers/QueryProvider';
import { ThemeProvider } from './providers/ThemeProvider';
import { ToastProvider } from './providers/ToastProvider';

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

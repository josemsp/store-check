import { AuthProvider } from './providers/auth-provider';
import { InitializerProvider } from './providers/initializer-provider';
import { ProfileProvider } from './providers/profile-provider';
import { QueryAuthBridge } from './providers/query-auth-bridge';
import { QueryProvider } from './providers/query-provider';
import { ThemeProvider } from './providers/theme-provider';
import { ToastProvider } from './providers/toast-provider';

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AuthProvider>
        <QueryProvider>
          <ProfileProvider>
            <InitializerProvider>
              <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                <ToastProvider />
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

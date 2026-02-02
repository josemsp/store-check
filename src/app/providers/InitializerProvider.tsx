import { createContext, useContext, useEffect, useState } from 'react';

import { useAuth } from './AuthProvider';
import { useProfileContext } from './ProfileProvider';

type InitializerContextValue = {
  isAppReady: boolean;
};

const InitializerContext = createContext<InitializerContextValue>({ isAppReady: false });

export function InitializerProvider({ children }: { children: React.ReactNode }) {
  const { isInitialized: authInitialized, isAuthenticated } = useAuth();
  const { isLoading: profileLoading } = useProfileContext();
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    // Si no está autenticado, la app está lista cuando auth está inicializado
    if (authInitialized && !isAuthenticated) {
      setIsAppReady(true);
      return;
    }

    // Si está autenticado, espera a que el perfil también esté listo
    if (authInitialized && isAuthenticated && !profileLoading) {
      setIsAppReady(true);
    }
  }, [authInitialized, isAuthenticated, profileLoading]);

  return (
    <InitializerContext.Provider value={{ isAppReady }}>
      {children}
    </InitializerContext.Provider>
  );
}

export function useInitializer() {
  return useContext(InitializerContext);
}

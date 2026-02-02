// Crea un hook personalizado
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function useViewTransition() {
  const location = useLocation();

  useEffect(() => {
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        // Las transiciones se manejan automáticamente
      });
    }
  }, [location]);
}

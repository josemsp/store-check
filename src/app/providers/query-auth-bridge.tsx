import { useEffect, useRef } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { useAuth } from '@/app/providers/auth-provider';

export function QueryAuthBridge() {
  const { isAuthenticated, isInitialized } = useAuth();
  const queryClient = useQueryClient();
  const wasAuthenticated = useRef<boolean | null>(null);

  useEffect(() => {
    if (!isInitialized) return;

    if (wasAuthenticated.current === true && !isAuthenticated) {
      queryClient.clear();
    }

    wasAuthenticated.current = isAuthenticated;
  }, [isAuthenticated, isInitialized, queryClient]);

  return null;
}

import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { del, get, set } from 'idb-keyval';

import { type ReactNode, useEffect, useRef } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { persistQueryClient } from '@tanstack/react-query-persist-client';

export function QueryProvider({ children }: { children: ReactNode }) {
  const queryClientRef = useRef<QueryClient | null>(null);

  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient({
      defaultOptions: {
        queries: {
          retry: 1,
          refetchOnWindowFocus: false,
          staleTime: 1000 * 60 * 5, // 5 minutes
          gcTime: 1000 * 60 * 60 * 24, // 1 day
        },
        mutations: {
          retry: 0,
        },
      },
    });
  }

  useEffect(() => {
    const persister = createAsyncStoragePersister({
      storage: {
        getItem: async (key) => {
          const value = await get(key);
          return value ?? null;
        },
        setItem: (key, value) => set(key, value),
        removeItem: (key) => del(key),
      },
    });

    persistQueryClient({
      queryClient: queryClientRef.current!,
      persister,
      maxAge: 1000 * 60 * 60 * 24, // 1 day
      dehydrateOptions: {
        shouldDehydrateQuery: (query) => query.meta?.persist !== false,
      },
    });
  }, []);

  return (
    <QueryClientProvider client={queryClientRef.current}>{children}</QueryClientProvider>
  );
}

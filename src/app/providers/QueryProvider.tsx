import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import { useEffect, useRef, type ReactNode } from 'react'
import { persistQueryClient } from '@tanstack/react-query-persist-client'
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister'

export function QueryProvider({ children }: { children: ReactNode }) {
    const queryClientRef = useRef<QueryClient | null>(null)

    if (!queryClientRef.current) {
        queryClientRef.current = new QueryClient({
            defaultOptions: {
                queries: {
                    retry: 1,
                    refetchOnWindowFocus: false,
                    staleTime: 1000 * 60 * 5, // 5 minutos
                    gcTime: 1000 * 60 * 60 * 24, // 1 dia
                },
                mutations: {
                    retry: 0,
                },
            },
        })
    }

    useEffect(() => {
        const persister = createAsyncStoragePersister({
            storage: window.localStorage,
        })

        persistQueryClient({
            queryClient: queryClientRef.current!,
            persister,
            maxAge: 1000 * 60 * 60 * 24, // 1 dia
        })
    }, [])

    return (
        <QueryClientProvider client={queryClientRef.current}>
            {children}
        </QueryClientProvider>
    )
}

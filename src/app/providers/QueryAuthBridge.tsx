import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useAuth } from '@/app/providers/AuthProvider'

export function QueryAuthBridge() {
    const { isAuthenticated, isInitialized } = useAuth()
    const queryClient = useQueryClient()

    useEffect(() => {
        if (isInitialized && !isAuthenticated) {
            // Al cerrar sesión limpiamos cache
            queryClient.clear()
        }
    }, [isAuthenticated, isInitialized, queryClient])

    return null
}

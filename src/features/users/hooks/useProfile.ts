import { useQuery } from '@tanstack/react-query'
import { useAuth } from '@/app/providers/AuthProvider'
import { domains } from '@/infra/api/domains'

export const useProfile = () => {
    const { isAuthenticated, isInitialized } = useAuth()

    return useQuery({
        queryKey: ['profile'],
        queryFn: () => domains.users.me.get,
        enabled: isAuthenticated && isInitialized,
        staleTime: 1000 * 60 * 5, // 5 minutes
    })
}

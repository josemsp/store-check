import { useAuth } from '@/app/providers/AuthProvider';
import { useGetMe } from '@/infra/api/endpoints/users';

export const useProfile = () => {
  const { isAuthenticated, isInitialized } = useAuth();

  return useGetMe({
    query: {
      select: (data) => data?.data,
      enabled: isAuthenticated && isInitialized,
      staleTime: 1000 * 60 * 5,
      placeholderData: (prevData) => prevData,
    },
  });
};

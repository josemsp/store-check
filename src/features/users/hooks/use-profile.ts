import { useAuth } from '@/app/providers/auth-provider';
import { useOnboardingStore } from '@/features/onboarding/stores/use-onboarding-store';
import { useGetMe } from '@/infra/api/endpoints/users';

export const useProfile = () => {
  const { isAuthenticated, isInitialized } = useAuth();
  const token = useOnboardingStore((s) => s.token);
  const skipProfile = Boolean(token);

  return useGetMe({
    query: {
      select: (data) => data?.data,
      enabled: isAuthenticated && isInitialized && !skipProfile,
      staleTime: 1000 * 60 * 5,
      placeholderData: (prevData) => prevData,
    },
  });
};

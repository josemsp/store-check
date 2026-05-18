import { useInitializer } from '@/app/providers/initializer-provider';
import { FullPageLoader } from '@/shared/components/ui/loader';

export function AppSplash({ children }: { children: React.ReactNode }) {
  const { isAppReady } = useInitializer();

  if (!isAppReady) {
    return <FullPageLoader />;
  }

  return children;
}

import { Suspense } from 'react';

import { FullPageLoader } from '@/shared/components/feedback/loader';

export const SuspenseWrapper = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<FullPageLoader />}>{children}</Suspense>
);

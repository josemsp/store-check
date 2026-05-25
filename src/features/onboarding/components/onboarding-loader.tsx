import { LoaderDots } from '@/shared/components/feedback/loader';
import { Text } from '@/shared/components/typography/Text';

export function OnboardingLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950">
      <div className="space-y-4 text-center">
        <LoaderDots dotClassName="bg-blue-600" />

        <Text variant="lead">Cargando onboarding...</Text>
      </div>
    </div>
  );
}

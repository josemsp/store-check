import { ErrorCard } from '@/shared/components/feedback/error-card';

export function OnboardingError() {
  return (
    <ErrorCard
      title="Error de Enlace"
      description="El enlace proporcionado no es válido."
      informativeMessage="Por favor comunícate con soporte."
    />
  );
}

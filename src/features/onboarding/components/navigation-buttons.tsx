import { Button } from '@/shared/components/ui/button';

import { ONBOARDING_STEPS } from '../config/onboarding-steps';
import { useOnboardingStore } from '../stores/use-onboarding-store';

export function NavigationButtons() {
  const currentStepIndex = useOnboardingStore((s) => s.currentStepIndex);

  const nextStep = useOnboardingStore((s) => s.nextStep);

  const previousStep = useOnboardingStore((s) => s.previousStep);

  const isFirst = currentStepIndex === 0;

  const isLast = currentStepIndex === ONBOARDING_STEPS.length - 1;

  return (
    <div className="flex items-center justify-between">
      <Button variant="ghost" onClick={previousStep} disabled={isFirst}>
        Atrás
      </Button>

      <Button onClick={nextStep}>{isLast ? 'Finalizar' : 'Continuar'}</Button>
    </div>
  );
}

import { Card, CardContent, CardHeader } from '@/shared/components/ui/card';

import { ONBOARDING_STEPS } from '../config/onboarding-steps';
import { useOnboardingStore } from '../stores/use-onboarding-store';
import { NavigationButtons } from './navigation-buttons';
import { OnboardingHeader } from './onboarding-header';
import { OnboardingStepper } from './onboarding-stepper';

export function OnboardingContent() {
  const currentStepIndex = useOnboardingStore((s) => s.currentStepIndex);

  const currentStep = ONBOARDING_STEPS[currentStepIndex] ?? ONBOARDING_STEPS[0];

  const StepComponent = currentStep.component;

  return (
    <Card className="w-full max-w-5xl border-0 shadow-2xl">
      <CardHeader className="space-y-8">
        <OnboardingHeader
          title={currentStep.title}
          description={currentStep.description}
        />
        <OnboardingStepper currentStep={currentStepIndex} />
      </CardHeader>

      <CardContent className="space-y-10">
        <div className="min-h-[320px] animate-in fade-in duration-300">
          <StepComponent />
        </div>

        <NavigationButtons />
      </CardContent>
    </Card>
  );
}

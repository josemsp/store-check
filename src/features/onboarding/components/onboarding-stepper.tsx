import {
  Stepper,
  StepperItem,
  StepperList,
  StepperProgress,
} from '@/shared/components/navegation/stepper/stepper';

import { ONBOARDING_STEPS } from '../config/onboarding-steps';
import { useOnboardingStore } from '../stores/use-onboarding-store';

type Props = {
  currentStep: number;
};

export function OnboardingStepper({ currentStep }: Props) {
  const completedSteps = Array.from({ length: currentStep }, (_, i) => i);

  const goToStep = useOnboardingStore((s) => s.goToStep);

  return (
    <Stepper
      currentStep={currentStep}
      completedSteps={completedSteps}
      totalSteps={ONBOARDING_STEPS.length}
      className="space-y-6"
    >
      <StepperList>
        {ONBOARDING_STEPS.map((step, index) => (
          <StepperItem
            key={step.id}
            index={index}
            label={step.label}
            onClick={() => goToStep(index)}
          />
        ))}
      </StepperList>
      <StepperProgress />
    </Stepper>
  );
}

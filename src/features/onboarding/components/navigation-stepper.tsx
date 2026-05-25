import { ChevronLeft, ChevronRight } from 'lucide-react';

import { useCallback, useTransition } from 'react';

import {
  StepperNavigationButton,
  StepperNavigationButtons,
} from '@/shared/components/navegation/stepper/stepper-navigation-buttons';

import useOnboardingStore, {
  useCurrentStepIndex,
  useMetrics,
} from '../stores/use-onboarding';
import type { OnboardingStep } from './types';

interface NavigationButtonsProps {
  steps: OnboardingStep[];
}

export const NavigationButtons = ({ steps }: NavigationButtonsProps) => {
  const currentStep = useCurrentStepIndex();
  const nextStep = useOnboardingStore((s) => s.nextStep);
  const prevStep = useOnboardingStore((s) => s.prevStep);
  const skipStep = useOnboardingStore((s) => s.skipStep);
  const completeOnboarding = useOnboardingStore((s) => s.completeOnboarding);

  const [isPending, startTransition] = useTransition();
  const metrics = useMetrics();

  const handleNext = useCallback(async () => {
    startTransition(async () => {
      if (steps[currentStep].onValidate) {
        const isValid = await steps[currentStep].onValidate();
        if (!isValid) {
          return;
        }
      }

      if (metrics.isLastStep) {
        completeOnboarding();
      } else {
        nextStep();
      }
    });
  }, [currentStep, steps, metrics.isLastStep, nextStep, completeOnboarding]);

  const handlePrev = useCallback(() => {
    startTransition(() => {
      prevStep();
    });
  }, [prevStep]);

  const handleSkip = useCallback(() => {
    startTransition(() => {
      skipStep();
    });
  }, [skipStep]);

  const isDisabled = isPending;

  return (
    <StepperNavigationButtons>
      <StepperNavigationButton
        onClick={handlePrev}
        disabled={metrics.isFirstStep || isDisabled}
        variant="outline"
        size="lg"
        className="gap-2"
        aria-label="Ir al paso anterior"
      >
        <ChevronLeft size={20} />
        <span className="hidden sm:inline">Atrás</span>
      </StepperNavigationButton>

      <div className="flex items-center gap-3">
        {!metrics.isLastStep && (
          <StepperNavigationButton
            onClick={handleSkip}
            disabled={isDisabled}
            variant="ghost"
            size="lg"
            className="text-slate-600 hover:text-slate-900"
            aria-label="Omitir este paso"
          >
            Omitir
          </StepperNavigationButton>
        )}

        <StepperNavigationButton
          onClick={handleNext}
          disabled={isDisabled}
          size="lg"
          className="gap-2 bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium transition-all duration-300"
          aria-label={
            metrics.isLastStep ? 'Completar onboarding' : 'Ir al siguiente paso'
          }
        >
          {isPending ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span className="hidden sm:inline">
                {metrics.isLastStep ? 'Completando...' : 'Siguiendo...'}
              </span>
            </>
          ) : (
            <>
              <span className="hidden sm:inline">
                {metrics.isLastStep ? 'Completar' : 'Siguiente'}
              </span>
              <span className="sm:hidden">{metrics.isLastStep ? '✓' : '→'}</span>
              {!metrics.isLastStep && <ChevronRight size={20} />}
            </>
          )}
        </StepperNavigationButton>
      </div>
    </StepperNavigationButtons>
  );
};

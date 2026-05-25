import { create } from 'zustand';

import { ONBOARDING_STEPS } from '../config/onboarding-steps';

type InvitationData = {
  token: string;
  email: string;
  role: string;
};

type OnboardingStore = {
  currentStepIndex: number;

  invitation: InvitationData | null;

  setInvitation: (invitation: InvitationData | null) => void;

  nextStep: () => void;
  previousStep: () => void;
  goToStep: (index: number) => void;

  reset: () => void;
};

export const useOnboardingStore = create<OnboardingStore>((set) => ({
  currentStepIndex: 0,

  invitation: null,

  setInvitation: (invitation) => {
    set({ invitation });
  },

  nextStep: () => {
    set((state) => ({
      currentStepIndex: Math.min(state.currentStepIndex + 1, ONBOARDING_STEPS.length - 1),
    }));
  },

  previousStep: () => {
    set((state) => ({
      currentStepIndex: Math.max(state.currentStepIndex - 1, 0),
    }));
  },

  goToStep: (index) => {
    set({
      currentStepIndex: Math.max(0, Math.min(index, ONBOARDING_STEPS.length - 1)),
    });
  },

  reset: () => {
    set({
      currentStepIndex: 0,
      invitation: null,
    });
  },
}));

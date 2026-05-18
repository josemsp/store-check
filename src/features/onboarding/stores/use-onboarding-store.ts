import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Step = 'validating' | 'welcome' | 'profile' | 'company';

export type ProfileData = {
  firstName: string;
  lastName: string;
  password: string;
  avatarFile?: File;
};

interface OnboardingState {
  step: Step;
  token: string | null;
  email: string | null;
  role: string | null;
  profileData: ProfileData | null;
  companyName: string;
  setStep: (step: Step) => void;
  setInvitation: (data: { token: string; email: string; role: string }) => void;
  setProfileData: (data: ProfileData) => void;
  setCompanyName: (data: string) => void;
  clearData: () => void;
}

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      step: 'validating',
      token: null,
      email: null,
      role: null,
      profileData: null,
      companyName: '',

      setStep: (step) => set({ step }),
      setInvitation: (data) =>
        set({ token: data.token, email: data.email, role: data.role, step: 'welcome' }),
      setProfileData: (data) => set({ profileData: data }),
      setCompanyName: (data) => set({ companyName: data }),
      clearData: () =>
        set({
          step: 'validating',
          token: null,
          email: null,
          role: null,
          profileData: null,
          companyName: '',
        }),
    }),
    {
      name: 'onboarding-storage',
      partialize: (state) => ({
        token: state.token,
        email: state.email,
        role: state.role,
        step: state.step,
        companyName: state.companyName,
      }),
    },
  ),
);

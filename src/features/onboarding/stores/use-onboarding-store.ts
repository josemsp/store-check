import { create } from 'zustand';

type Step = 'validating' | 'welcome' | 'profile' | 'company';

export type ProfileData = {
  firstName: string;
  lastName: string;
  password: string;
  avatarFile?: File;
};

interface OnboardingState {
  step: Step;
  setStep: (step: Step) => void;
  profileData: ProfileData | null;
  companyName: string;
  setProfileData: (data: ProfileData) => void;
  setCompanyName: (data: string) => void;
  clearData: () => void;
}

export const useOnboardingStore = create<OnboardingState>((set) => ({
  step: 'validating',
  profileData: null,
  companyName: '',

  setStep: (step) => set({ step }),
  setProfileData: (data) => set({ profileData: data }),
  setCompanyName: (data) => set({ companyName: data }),
  clearData: () => set({ profileData: null, companyName: '' }),
}));

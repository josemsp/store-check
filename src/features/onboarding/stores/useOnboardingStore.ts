import { create } from 'zustand';

interface OnboardingState {
    profileData: {
        firstName: string;
        lastName: string;
        password: string;
        avatarFile?: File;
    } | null;
    companyData: {
        name: string;
    } | null;
    setProfileData: (data: OnboardingState['profileData']) => void;
    setCompanyData: (data: OnboardingState['companyData']) => void;
    clearData: () => void;
}

export const useOnboardingStore = create<OnboardingState>((set) => ({
    profileData: null,
    companyData: null,
    setProfileData: (data) => set({ profileData: data }),
    setCompanyData: (data) => set({ companyData: data }),
    clearData: () => set({ profileData: null, companyData: null }),
}));

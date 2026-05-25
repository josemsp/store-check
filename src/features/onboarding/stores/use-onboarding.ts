import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { useShallow } from 'zustand/react/shallow';

/**
 * Onboarding Store - Manager of global state with Zustand
 *
 * Characteristics:
 * - Reactive and efficient state
 * - Automatic persistence
 * - DevTools for debugging
 * - Optimized selectors
 * - TypeScript ready
 *
 * React 19 best practices:
 * - Use of useShallow to avoid unnecessary re-renders
 * - Pure and predictable actions
 * - Separation of concerns
 */

// Types
export const StepStatus = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  SKIPPED: 'skipped',
};

const initialState = {
  // Information of the flow
  invitationData: null,
  currentStepIndex: 0,
  totalSteps: 1,
  completedSteps: [],

  // Information of the onboarding
  formData: {
    company: {},
    profile: {},
    preferences: {},
    email: {},
  },

  // UI State
  isLoading: false,
  error: null,

  // Metadata
  startedAt: null,
  completedAt: null,
};

interface InvitationData {
  token: string;
  email: string;
  role: string;
  stepIndex: number;
}

/**
 * Main store of the onboarding
 */
interface FormData {
  company: Record<string, any>;
  profile: Record<string, any>;
  preferences: Record<string, any>;
}

interface OnboardingStore {
  // State
  invitationData: InvitationData | null;
  currentStepIndex: number;
  totalSteps: number;
  completedSteps: number[];
  formData: FormData;
  isLoading: boolean;
  error: any;
  startedAt: string | null;
  completedAt: string | null;

  // Actions: Navigation
  goToStep: (stepIndex: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  skipStep: () => void;

  // Actions: Data
  setInvitation: (data: InvitationData | null) => void;
  setTotalSteps: (totalSteps: number) => void;
  setCompanyData: (data: any) => void;
  setProfileData: (data: any) => void;
  setPreferencesData: (data: any) => void;

  // Actions: Generic updates
  updateFormData: (section: keyof FormData, data: any) => void;

  // Actions: State
  setLoading: (isLoading: boolean) => void;
  setError: (error: any) => void;
  clearError: () => void;

  // Actions: Lifecycle
  startOnboarding: () => void;
  completeOnboarding: () => void;

  // Actions: Reset
  reset: () => void;

  // Actions: Batch updates
  batchUpdate: (updates: any) => void;

  // Getters (selectors derivatives)
  getCurrentStep: () => number;
  isStepCompleted: (stepIndex: number) => boolean;
  getProgress: () => number;
  getFormData: (section?: keyof FormData) => any;
  getAllData: () => any;
  getMetrics: () => any;
}

export const useOnboardingStore = create<OnboardingStore>()(
  devtools(
    persist(
      (set, get) => ({
        // State
        ...initialState,

        // Actions: Navigation
        goToStep: (stepIndex) =>
          set(() => ({
            currentStepIndex: Math.max(0, Math.min(stepIndex, 5)),
          })),

        nextStep: () =>
          set((state) => {
            const newIndex = state.currentStepIndex + 1;
            return {
              currentStepIndex: newIndex,
              completedSteps: Array.from(
                new Set([...state.completedSteps, state.currentStepIndex]),
              ),
            };
          }),

        prevStep: () =>
          set((state) => ({
            currentStepIndex: Math.max(0, state.currentStepIndex - 1),
          })),

        skipStep: () =>
          set((state) => ({
            currentStepIndex: state.currentStepIndex + 1,
            completedSteps: Array.from(
              new Set([...state.completedSteps, state.currentStepIndex]),
            ),
          })),

        // Actions: Data
        setInvitation: (data: InvitationData | null) =>
          set({
            invitationData: data,
          }),
        setTotalSteps: (totalSteps) => set({ totalSteps }),
        setCompanyData: (data) =>
          set((state) => ({
            formData: {
              ...state.formData,
              company: { ...state.formData.company, ...data },
            },
          })),

        setProfileData: (data) =>
          set((state) => ({
            formData: {
              ...state.formData,
              profile: { ...state.formData.profile, ...data },
            },
          })),

        setPreferencesData: (data) =>
          set((state) => ({
            formData: {
              ...state.formData,
              preferences: { ...state.formData.preferences, ...data },
            },
          })),

        // Generic to update data
        updateFormData: (section, data) =>
          set((state) => ({
            formData: {
              ...state.formData,
              [section]: { ...state.formData[section], ...data },
            },
          })),

        // Actions: State
        setLoading: (isLoading) => set({ isLoading }),

        setError: (error) => set({ error }),

        clearError: () => set({ error: null }),

        // Actions: Lifecycle
        startOnboarding: () =>
          set({
            startedAt: new Date().toISOString(),
            completedAt: null,
            currentStepIndex: 0,
            completedSteps: [],
            formData: initialState.formData,
            error: null,
          }),

        completeOnboarding: () =>
          set({
            completedAt: new Date().toISOString(),
            completedSteps: Array.from({ length: 6 }, (_, i) => i),
          }),

        // Actions: Reset
        reset: () => set(initialState),

        // Actions: Batch updates
        batchUpdate: (updates) => set(updates),

        // Getters (selectors derivatives)
        getCurrentStep: () => get().currentStepIndex,

        isStepCompleted: (stepIndex) => get().completedSteps.includes(stepIndex),

        getProgress: () => {
          const { currentStepIndex } = get();
          return ((currentStepIndex + 1) / 6) * 100;
        },

        getFormData: (section) => (section ? get().formData[section] : get().formData),

        getAllData: () => ({
          formData: get().formData,
          completedAt: get().completedAt,
          startedAt: get().startedAt,
        }),

        getMetrics: () => {
          const { currentStepIndex, completedSteps } = get();
          return {
            currentStep: currentStepIndex,
            totalSteps: 6,
            completedCount: completedSteps.length,
            progress: ((currentStepIndex + 1) / 6) * 100,
            isFirstStep: currentStepIndex === 0,
            isLastStep: currentStepIndex === 5,
          };
        },
      }),
      {
        name: 'onboarding-store',
        // Selective persistence - only save relevant data
        partialize: (state) => ({
          formData: state.formData,
          currentStepIndex: state.currentStepIndex,
          completedSteps: state.completedSteps,
          invitationData: state.invitationData,
        }),
        // Versioning for future migrations
        version: 1,
        // Migration from v0 to v1
        migrate: (persistedState, version) => {
          if (version === 0) {
            // Migration from v0 to v1
            return persistedState;
          }
          return persistedState;
        },
      },
    ),
    { name: 'OnboardingStore' }, // Name for DevTools
  ),
);

/**
 * Selectors optimized to avoid re-renders
 * React 19 best practice: use specific selectors in components
 */
export const useCurrentStepIndex = () =>
  useOnboardingStore((state) => state.currentStepIndex);

export const useCompletedSteps = () =>
  useOnboardingStore((state) => state.completedSteps);

export const useFormData = (section: keyof FormData) =>
  useOnboardingStore((state) => (section ? state.formData[section] : state.formData));

export const useCompanyData = () => useOnboardingStore((state) => state.formData.company);

export const useProfileData = () => useOnboardingStore((state) => state.formData.profile);

export const usePreferencesData = () =>
  useOnboardingStore((state) => state.formData.preferences);

export const useIsLoading = () => useOnboardingStore((state) => state.isLoading);

export const useError = () => useOnboardingStore((state) => state.error);

export const useProgress = () =>
  useOnboardingStore((state) => ((state.currentStepIndex + 1) / 6) * 100);

export const useMetrics = () =>
  useOnboardingStore(
    useShallow((state) => {
      const { currentStepIndex, completedSteps, totalSteps } = state;
      return {
        currentStep: currentStepIndex,
        totalSteps,
        completedCount: completedSteps.length,
        progress: ((currentStepIndex + 1) / totalSteps) * 100,
        isFirstStep: currentStepIndex === 0,
        isLastStep: currentStepIndex === totalSteps - 1,
      };
    }),
  );

export const useIsStepCompleted = (stepIndex: number) =>
  useOnboardingStore((state) => state.completedSteps.includes(stepIndex));

// Alias common
export const useOnboarding = useOnboardingStore;

export default useOnboardingStore;

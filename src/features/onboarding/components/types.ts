export interface OnboardingStep {
  id: string;
  label: string;
  title: string;
  description: string;
  component: React.ReactNode;
  onValidate?: () => Promise<boolean>;
}

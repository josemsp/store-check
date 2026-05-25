import type { ComponentType } from 'react';

import {
  CompanyInfoStep,
  CompletionStep,
  PreferencesStep,
  ProfileInfoStep,
  WelcomeStep,
} from '../steps';

export type OnboardingStepId =
  | 'welcome'
  | 'company'
  | 'profile'
  | 'preferences'
  | 'completion';

export type OnboardingStepDefinition = {
  id: OnboardingStepId;
  label: string;
  title: string;
  description: string;
  component: ComponentType;
};

export const ONBOARDING_STEPS: OnboardingStepDefinition[] = [
  {
    id: 'welcome',
    label: 'Bienvenida',
    title: '¡Bienvenido a bordo!',
    description: 'Vamos a configurar tu cuenta en unos pocos pasos sencillos.',
    component: WelcomeStep,
  },

  {
    id: 'company',
    label: 'Empresa',
    title: 'Información de la Empresa',
    description: 'Cuéntanos sobre tu empresa.',
    component: CompanyInfoStep,
  },

  {
    id: 'profile',
    label: 'Perfil',
    title: 'Información de Perfil',
    description: 'Completa tu información personal.',
    component: ProfileInfoStep,
  },

  {
    id: 'preferences',
    label: 'Preferencias',
    title: 'Preferencias',
    description: 'Personaliza tu experiencia.',
    component: PreferencesStep,
  },

  {
    id: 'completion',
    label: 'Finalizar',
    title: 'Finalizar',
    description: 'Tu configuración está lista.',
    component: CompletionStep,
  },
];

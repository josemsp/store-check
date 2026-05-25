import { OnboardingContent } from '../components/onboarding-content';
import { OnboardingError } from '../components/onboarding-error';
import { OnboardingLayout } from '../components/onboarding-layout';
import { OnboardingLoader } from '../components/onboarding-loader';
import { useValidationProcess } from '../hooks/use-validation-process';

export default function OnboardingPage() {
  const { isValidating, isValidationError, isValidationSuccess } = useValidationProcess();

  if (isValidating) {
    return <OnboardingLoader />;
  }

  if (isValidationError) {
    return (
      <OnboardingLayout>
        <OnboardingError />
      </OnboardingLayout>
    );
  }

  if (!isValidationSuccess) {
    return null;
  }

  return (
    <OnboardingLayout>
      <OnboardingContent />
    </OnboardingLayout>
  );
}

// import { ErrorCard } from '@/shared/components/feedback/error-card';
// import { LoaderDots } from '@/shared/components/feedback/loader';
// import { Text } from '@/shared/components/typography/Text';
// import { Card, CardContent, CardHeader } from '@/shared/components/ui/card';
// import { ThemeToggle } from '@/shared/layout/theme-toggle';
// import { cn } from '@/shared/lib/utils';

// import { OnboardingHeader } from '../components/header';
// import { NavigationButtons } from '../components/navigation-stepper';
// import {
//   CompanyInfoForm,
//   CompletionStep,
//   PreferencesForm,
//   ProfileInfoForm,
//   WelcomeStep,
// } from '../components/onboarding-forms';
// import { OnboardingStepper } from '../components/onboarding-stepper';
// import type { OnboardingStep } from '../components/types';
// import { useValidationProcess } from '../hooks/use-validation-process';
// import { useCurrentStepIndex } from '../stores/use-onboarding';

// export default function OnboardingPage() {
//   const { isValidating, isValidationError, isValidationSuccess } = useValidationProcess();
//   const currentIndexStep = useCurrentStepIndex();
//   const currentStep = ONBOARDING_STEPS[currentIndexStep];

//   if (isValidating) {
//     return <OnboardingLoader />;
//   }

//   return (
//     <PageWrapper>
//       <ThemeToggle className="absolute top-4 right-4" />
//       {isValidationSuccess && (
//         <Card
//           className={cn(
//             'w-full max-w-5xl animate-in fade-in slide-in-from-bottom duration-300 shadow-xl',
//             'min-h-44 bg-linear-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-950 dark:to-slate-950',
//           )}
//         >
//           <CardHeader>
//             <OnboardingHeader
//               title={currentStep.label}
//               description={currentStep.description}
//             />
//           </CardHeader>
//           <CardContent className="pt-6">
//             <div
//               className="animate-in fade-in duration-500"
//               style={{ animationDelay: '100ms' }}
//             >
//               {/* <StepperIndicator steps={ONBOARDING_STEPS} /> */}
//               <OnboardingStepper currentStep={currentIndexStep} />
//             </div>

//             <div
//               className="animate-in fade-in duration-500"
//               style={{ animationDelay: '300ms' }}
//             >
//               <NavigationButtons steps={ONBOARDING_STEPS} />
//             </div>
//           </CardContent>
//         </Card>
//       )}
//       {isValidationError && (
//         <ErrorCard
//           title="Error de Enlace"
//           description="El enlace proporcionado no es válido. Por favor, asegúrate de haber copiado el enlace completo."
//           informativeMessage="Por favor comunícate con soporte para obtener ayuda."
//         />
//       )}
//     </PageWrapper>
//   );
// }

// const PageWrapper = ({ children }: React.PropsWithChildren) => (
//   <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 p-4">
//     {children}
//   </div>
// );

// function OnboardingLoader() {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
//       <div className="text-center space-y-4">
//         <LoaderDots dotClassName="bg-blue-600" />
//         {/* check if dots can animate */}
//         <Text variant="lead">Cargando onboarding...</Text>
//       </div>
//     </div>
//   );
// }

// export const ONBOARDING_STEPS: OnboardingStep[] = [
//   {
//     id: 'welcome',
//     label: 'Bienvenida',
//     title: '¡Bienvenido a bordo!',
//     description: 'Vamos a configurar tu cuenta en unos pocos pasos sencillos',
//     component: <WelcomeStep />,
//   },
//   {
//     id: 'company',
//     label: 'Empresa',
//     title: 'Información de la Empresa',
//     description: 'Cuéntanos sobre tu empresa',
//     component: <CompanyInfoForm />,
//     onValidate: async () => {
//       return true;
//       // Validar que se haya guardado correctamente
//       //   return await window._companyFormValidate?.();
//     },
//   },
//   {
//     id: 'profile',
//     label: 'Perfil',
//     title: 'Información de Perfil',
//     description: 'Completa tu información personal',
//     component: <ProfileInfoForm />,
//     onValidate: async () => {
//       return true;
//       //   return await window._profileFormValidate?.();
//     },
//   },
//   {
//     id: 'preferences',
//     label: 'Preferencias',
//     title: 'Preferencias',
//     description: 'Personaliza tu experiencia',
//     component: <PreferencesForm />,
//     onValidate: async () => {
//       return true;
//       //   return await window._preferencesFormValidate?.();
//     },
//   },
//   {
//     id: 'completion',
//     label: 'Finalizar',
//     title: 'Finalizar',
//     description: 'Tu configuración está lista',
//     component: <CompletionStep />,
//   },
// ];

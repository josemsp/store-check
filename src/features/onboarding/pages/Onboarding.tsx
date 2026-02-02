import { AlertCircle, CheckCircle2 } from 'lucide-react';

import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

import { useAuth } from '@/app/providers/AuthProvider';
import {
  useAcceptInvitation,
  useValidateInvitation,
} from '@/infra/api/endpoints/invitations';
import { getSupabaseClient } from '@/infra/auth/supabase.client';
import { Button } from '@/shared/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { useUploadAvatar } from '@/shared/hooks/useUploadAvatar';

import { OnboardingCompanyForm } from '../components/OnboardingCompanyForm';
import { OnboardingProfileForm } from '../components/OnboardingProfileForm';
import { useOnboardingStore } from '../stores/useOnboardingStore';

type Step = 'validating' | 'welcome' | 'profile' | 'company';

const Onboarding = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('validating');
  const { user } = useAuth();
  // Store
  const { profileData, setProfileData, companyData, setCompanyData } =
    useOnboardingStore();

  // Local state for avatar file specifically if we want to keep it out of global store?
  // Zustand can handle Files, but let's just stick to the store as defined.
  const {
    mutate,
    data: validationData,
    isPending: isLoading,
    isError,
  } = useValidateInvitation();
  const { mutateAsync: acceptInvitation, isPending: isAccepting } = useAcceptInvitation();
  const { uploadAvatar } = useUploadAvatar();
  const token = searchParams.get('token');
  const supabase = getSupabaseClient();

  useEffect(() => {
    if (token) {
      mutate(
        { data: { token } },
        {
          onSuccess: () => setStep('welcome'),
          onError: () => setStep('validating'),
        },
      );
    }
  }, [token, mutate]);

  const handleProfileComplete = async (pData: {
    firstName: string;
    lastName: string;
    password: string;
    avatarFile?: File;
  }) => {
    setProfileData(pData);
    setStep('company');
  };

  const handleCompanyComplete = async (cData: { name: string }) => {
    setCompanyData(cData);
    console.log(profileData);
    if (profileData) {
      await submitInvitation(profileData, cData.name);
    }
  };

  const submitInvitation = async (
    pData: { firstName: string; lastName: string; password: string; avatarFile?: File },
    companyName: string,
  ) => {
    if (!token) return;

    let finalAvatarUrl: string | undefined = undefined;
    console.log(pData, token, user);

    if (pData.avatarFile && user) {
      finalAvatarUrl = await uploadAvatar(user.id, pData.avatarFile);
    }

    try {
      await supabase.auth.updateUser({ password: pData.password });
      await acceptInvitation({
        data: {
          companyName,
          firstName: pData.firstName,
          lastName: pData.lastName,
          token,
          avatarUrl: finalAvatarUrl,
        },
      });
      // await acceptInvitation({
      //     token,
      //     firstName: pData.firstName,
      //     lastName: pData.lastName,
      //     avatarUrl: finalAvatarUrl,
      //     companyName: companyName
      // });
      navigate('/dashboard');
    } catch (error) {
      console.error('Error accepting invitation:', error);
      // Show error toast?
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 p-4">
        <Card className="w-full max-w-md border-red-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-red-600 flex items-center gap-2">
              <AlertCircle className="h-6 w-6" />
              Error de Enlace
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-600 dark:text-slate-300">
              El enlace proporcionado no es válido. Por favor, asegúrate de haber copiado
              el enlace completo.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isLoading || (step === 'validating' && !isError && !validationData)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 p-4">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader>
            <CardTitle className="text-center">Validando Invitación</CardTitle>
            <CardDescription className="text-center">
              Por favor espere un momento...
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isError || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 p-4">
        <Card className="w-full max-w-md border-red-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-red-600 flex items-center gap-2">
              <AlertCircle className="h-6 w-6" />
              Invitación no válida
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Esto puede deberse a que el enlace ha expirado, ya ha sido utilizado, o no
              es correcto.
            </p>
          </CardContent>
          <CardFooter>
            <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-md w-full border border-red-100 dark:border-red-800">
              <p className="text-sm font-medium text-red-800 dark:text-red-300 text-center">
                Por favor comunícate con soporte para obtener ayuda.
              </p>
            </div>
          </CardFooter>
        </Card>
      </div>
    );
  }

  // Step 1: Welcome
  if (step === 'welcome' && validationData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 p-4">
        <Card className="w-full max-w-md shadow-xl animate-in fade-in zoom-in duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-600">
              <CheckCircle2 className="h-6 w-6" />
              ¡Bienvenido!
            </CardTitle>
            <CardDescription>
              Tu invitación ha sido validada correctamente.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Hola{' '}
              <strong className="text-slate-900 dark:text-slate-100">
                {validationData.data.email}
              </strong>
              . Estás a un paso de configurar tu cuenta como dueño{' '}
              {validationData.data.isNewCompany ? ' de tu nueva empresa' : ''}.
            </p>

            <div className="p-6 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50/50 dark:bg-slate-800/50 space-y-4">
              <div className="text-center space-y-2">
                <p className="font-medium text-slate-900 dark:text-slate-100">
                  Configurar Cuenta
                </p>
                <p className="text-xs text-muted-foreground">
                  Completa tu perfil{' '}
                  {validationData.data.isNewCompany
                    ? 'y configura tu espacio de trabajo'
                    : ''}
                  .
                </p>
              </div>
              <Button className="w-full" onClick={() => setStep('profile')}>
                Comenzar &rarr;
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Step 2 & 3: Forms
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 p-4">
      <Card className="w-full max-w-lg shadow-xl animate-in fade-in slide-in-from-bottom duration-300">
        {/* Progress Indicator */}
        <div className="w-full h-1 bg-slate-100 dark:bg-slate-800">
          <div
            className="h-full bg-primary transition-all duration-500 ease-out"
            style={{
              width:
                step === 'profile'
                  ? validationData?.data.isNewCompany
                    ? '50%'
                    : '100%'
                  : '100%',
            }}
          />
        </div>

        <CardContent className="pt-6">
          {step === 'profile' && (
            <OnboardingProfileForm
              onNext={handleProfileComplete}
              onBack={() => setStep('welcome')}
              initialEmail={validationData?.data.email}
              initialData={profileData}
            />
          )}
          {step === 'company' && (
            <OnboardingCompanyForm
              onComplete={handleCompanyComplete}
              onBack={() => setStep('profile')}
              isLoading={isAccepting}
              initialData={companyData}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Onboarding;

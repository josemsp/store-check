import { AlertCircle, CheckCircle2 } from 'lucide-react';

import { useEffect } from 'react';
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
import { type ProfileData, useOnboardingStore } from '../stores/useOnboardingStore';

const PageWrapper = ({ children }: React.PropsWithChildren) => (
  <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 p-4">
    {children}
  </div>
);

const ErrorCard = ({ title, description }: { title: string; description: string }) => (
  <Card className="w-full max-w-md border-red-200 shadow-lg">
    <CardHeader>
      <CardTitle className="flex items-center gap-2 text-red-600">
        <AlertCircle className="h-6 w-6" />
        {title}
      </CardTitle>
    </CardHeader>

    <CardContent>
      <p className="text-sm text-slate-600 dark:text-slate-300">{description}</p>
    </CardContent>

    <CardFooter>
      <div className="w-full rounded-md border border-red-100 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20">
        <p className="text-center text-sm font-medium text-red-800 dark:text-red-300">
          Por favor comunícate con soporte para obtener ayuda.
        </p>
      </div>
    </CardFooter>
  </Card>
);

const LoadingCard = () => (
  <Card className="w-full max-w-md shadow-lg">
    <CardHeader>
      <CardTitle className="text-center">Validando Invitación</CardTitle>

      <CardDescription className="text-center">
        Por favor espere un momento...
      </CardDescription>
    </CardHeader>

    <CardContent className="flex justify-center py-8">
      <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-primary" />
    </CardContent>
  </Card>
);

const Onboarding = () => {
  const [searchParams] = useSearchParams();

  const token = searchParams.get('token');

  const navigate = useNavigate();
  const supabase = getSupabaseClient();

  const { user } = useAuth();

  const { step, setStep, profileData, setProfileData, companyName, setCompanyName } =
    useOnboardingStore();

  const {
    mutate: validateInvitation,
    data: invitation,
    isPending: isValidating,
    isError,
  } = useValidateInvitation();

  const { mutateAsync: acceptInvitation, isPending: isAccepting } = useAcceptInvitation();

  const { uploadAvatar } = useUploadAvatar();

  useEffect(() => {
    if (!token) return;

    validateInvitation(
      { data: { token } },
      {
        onSuccess: () => setStep('welcome'),
      },
    );
  }, [token, validateInvitation, setStep]);

  const submitInvitation = async (data: ProfileData) => {
    if (!token || !user) return;

    try {
      const avatarUrl = data.avatarFile
        ? await uploadAvatar(user.id, data.avatarFile)
        : undefined;

      await supabase.auth.updateUser({
        password: data.password,
      });

      await acceptInvitation({
        data: {
          token,
          avatar_url: avatarUrl,
        },
      });

      navigate('/dashboard');
    } catch (error) {
      console.error('Error accepting invitation:', error);
    }
  };

  const handleProfileComplete = (data: ProfileData) => {
    setProfileData(data);

    if (invitation?.role === 'owner') {
      setStep('company');
      return;
    }

    submitInvitation(data);
  };

  const handleCompanyComplete = async (companyName: string) => {
    setCompanyName(companyName);

    if (!profileData) return;

    await submitInvitation(profileData);
  };

  if (!token) {
    return (
      <PageWrapper>
        <ErrorCard
          title="Error de Enlace"
          description="El enlace proporcionado no es válido. Por favor, asegúrate de haber copiado el enlace completo."
        />
      </PageWrapper>
    );
  }

  if (isValidating) {
    return (
      <PageWrapper>
        <LoadingCard />
      </PageWrapper>
    );
  }

  if (isError || !invitation || !user) {
    return (
      <PageWrapper>
        <ErrorCard
          title="Invitación no válida"
          description="Esto puede deberse a que el enlace ha expirado, ya ha sido utilizado, o no es correcto."
        />
      </PageWrapper>
    );
  }

  if (step === 'welcome') {
    return (
      <PageWrapper>
        <Card className="w-full max-w-md animate-in fade-in zoom-in duration-300 shadow-xl">
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
                {invitation.email}
              </strong>
              . Estás a un paso de configurar tu cuenta
              {invitation.role === 'owner' ? ' y tu nueva empresa.' : '.'}
            </p>

            <div className="space-y-4 rounded-lg border border-slate-200 bg-slate-50/50 p-6 dark:border-slate-700 dark:bg-slate-800/50">
              <div className="space-y-2 text-center">
                <p className="font-medium text-slate-900 dark:text-slate-100">
                  Configurar Cuenta
                </p>

                <p className="text-xs text-muted-foreground">
                  Completa tu perfil
                  {invitation.role === 'owner'
                    ? ' y configura tu espacio de trabajo.'
                    : '.'}
                </p>
              </div>

              <Button className="w-full" onClick={() => setStep('profile')}>
                Comenzar →
              </Button>
            </div>
          </CardContent>
        </Card>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <Card className="w-full max-w-lg animate-in fade-in slide-in-from-bottom duration-300 shadow-xl">
        <div className="h-1 w-full bg-slate-100 dark:bg-slate-800">
          <div
            className="h-full bg-primary transition-all duration-500 ease-out"
            style={{
              width: step === 'profile' ? '50%' : '100%',
            }}
          />
        </div>

        <CardContent className="pt-6">
          {step === 'profile' && (
            <OnboardingProfileForm
              onNext={handleProfileComplete}
              onBack={() => setStep('welcome')}
              initialEmail={invitation.email}
              initialData={profileData}
            />
          )}

          {step === 'company' && (
            <OnboardingCompanyForm
              onComplete={handleCompanyComplete}
              onBack={() => setStep('profile')}
              isLoading={isAccepting}
              companyName={companyName}
            />
          )}
        </CardContent>
      </Card>
    </PageWrapper>
  );
};

export default Onboarding;

import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router';

import { useAuth } from '@/app/providers/auth-provider';
import { useValidateInvitation } from '@/infra/api/endpoints/invitations';

import { useOnboardingStore } from '../stores/use-onboarding-store';

export function useValidationProcess() {
  const [searchParams] = useSearchParams();

  const hasValidated = useRef(false);

  const urlToken = searchParams.get('token');

  const { user } = useAuth();

  const invitation = useOnboardingStore((s) => s.invitation);
  const setInvitation = useOnboardingStore((s) => s.setInvitation);

  const token =
    urlToken ??
    invitation?.token ??
    (user?.user_metadata?.invitation_token as string | undefined);

  const {
    mutate: validateInvitation,
    isPending: isValidating,
    isSuccess,
    isError,
  } = useValidateInvitation();

  useEffect(() => {
    if (!urlToken || !token || hasValidated.current) {
      return;
    }

    hasValidated.current = true;

    validateInvitation(
      {
        data: {
          token,
        },
      },
      {
        onSuccess: ({ data }) => {
          setInvitation({
            token,
            email: data.email,
            role: data.role,
          });
        },

        onError: () => {
          setInvitation(null);
        },
      },
    );
  }, [token, urlToken, validateInvitation, setInvitation]);

  return {
    isValidating,
    isValidationSuccess: isSuccess,
    isValidationError: isError,
  };
}

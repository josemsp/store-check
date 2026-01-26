import { useMutation } from '@tanstack/react-query';
import { domains } from '@/infra/api/domains';

export const useValidateToken = () =>
    useMutation({
        mutationFn: domains.invitations.validate.post,
    })

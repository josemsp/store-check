import { useMutation } from "@tanstack/react-query";
import { domains } from "@/infra/api/domains";

export const useAcceptInvitation = () =>
    useMutation({
        mutationFn: domains.invitations.accept.post
    })
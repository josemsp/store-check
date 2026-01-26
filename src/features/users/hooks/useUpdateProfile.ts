// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { profileService } from "../services/profile.service";
// import { queryKeys } from "@/infra/api/query-keys";

// export function useUpdateProfile() {
//     const queryClient = useQueryClient();

//     return useMutation({
//         mutationFn: (updates: {
//             first_name?: string;
//             last_name?: string;
//             avatar_url?: string;
//         }) => profileService.updateMyProfile(updates),
        
//         // Optimistic update
//         onMutate: async (updates) => {
//             // Cancelar queries en progreso
//             await queryClient.cancelQueries({ queryKey: queryKeys.users.details() });

//             // Guardar snapshot del valor anterior
//             const previousProfile = queryClient.getQueryData<Profile>(queryKeys.profile.me());

//             // Actualizar optimísticamente
//             if (previousProfile) {
//                 queryClient.setQueryData<Profile>(queryKeys.profile.me(), {
//                     ...previousProfile,
//                     ...updates,
//                     full_name: updates.first_name && updates.last_name 
//                         ? `${updates.first_name} ${updates.last_name}`
//                         : previousProfile.full_name,
//                 });
//             }

//             return { previousProfile };
//         },

//         // Si hay error, revertir
//         onError: (error, variables, context) => {
//             if (context?.previousProfile) {
//                 queryClient.setQueryData(queryKeys.profile.me(), context.previousProfile);
//             }
//         },

//         // Siempre refetch después de error o éxito
//         onSettled: () => {
//             queryClient.invalidateQueries({ queryKey: queryKeys.profile.me() });
//         },
//     });
// }

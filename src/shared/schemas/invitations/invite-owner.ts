import { z } from 'zod';

export const InviteOwnerSchema = z.object({
  email: z.email('Correo inválido'),
});

export type InviteOwnerValues = z.infer<typeof InviteOwnerSchema>;

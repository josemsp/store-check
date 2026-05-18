import { z } from 'zod';

import type { InviteUserBodyRole } from '@/infra/api/model';

export const InviteEmployeeSchema = z.object({
  email: z.email('Correo inválido'),
  role: z.enum(['manager', 'warehouse', 'branch_staff'] satisfies InviteUserBodyRole[]),
  owner_id: z.string().optional(),
});

export type InviteEmployeeValues = z.infer<typeof InviteEmployeeSchema>;

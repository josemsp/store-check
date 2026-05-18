import { z } from 'zod';

export const companySchema = z.object({
  name: z.string().min(3, 'El nombre de la empresa debe tener al menos 3 caracteres'),
});

export type CompanyFormValues = z.infer<typeof companySchema>;

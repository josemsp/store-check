import { z } from 'zod';

export const profileSchema = z
  .object({
    firstName: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
    lastName: z.string().min(2, 'El apellido debe tener al menos 2 caracteres'),
    password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
    passwordConfirmation: z
      .string()
      .min(6, 'La contraseña debe tener al menos 6 caracteres'),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'Las contraseñas no coinciden',
    path: ['passwordConfirmation'],
  });

export type ProfileFormValues = z.infer<typeof profileSchema>;

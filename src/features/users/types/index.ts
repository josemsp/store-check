import type z from 'zod';

import type { profileSchema } from '../schemas';

export type ProfileFormValues = z.infer<typeof profileSchema>;

import { z } from 'zod';
import { registerSchema } from './schemas';

export type RegisterFormData = z.infer<typeof registerSchema>;

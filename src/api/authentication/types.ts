import { z } from 'zod';
import { loginSchema, registerSchema } from './schemas';

export type RegisterFormData = z.infer<typeof registerSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;

export type LoginResponse = {
    userId: string;
    token: string;
};

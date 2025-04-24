import { z } from 'zod';

export const loginSchema = z.object({
    username: z.string().min(1, 'Username cannot be empty'),
    password: z.string().min(6, 'Password must be at least 6 characters')
});

export const registerSchema = loginSchema.setKey(
    'email',
    z.string().email('Invalid email address')
);

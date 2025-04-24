import { z } from "zod";

export const registerSchema = z.object({
    username: z.string().min(1, 'Username cannot be empty'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters')
});

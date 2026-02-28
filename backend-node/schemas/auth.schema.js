
import { z } from 'zod';

export const registerSchema = z.object({
  username: z.string({ required_error: 'auth.username_required' })
    .min(3, { message: 'auth.username_too_short' })
    .max(15, { message: 'auth.username_too_long' })
    .regex(/^[a-zA-ZñÑ0-9_-]+$/, { message: 'auth.username_invalid_format' })
    .trim(),

  email: z.string().email({ required_error: 'auth.email_invalid' }),

  password: z.string({ required_error: 'auth.password_required' })
    .min(8, { message: 'auth.password_too_short' })
    .max(20, { message: 'auth.password_too_long' })
    .regex(/[A-Z]/, { message: 'auth.password_uppercase' })
    .regex(/[a-z]/, { message: 'auth.password_lowercase' })
    .regex(/\d/, { message: 'auth.password_number' })
    .regex(/[\W_]/, { message: 'auth.password_special' })
});
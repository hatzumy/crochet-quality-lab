
import { z } from 'zod';

export const registerSchema = z.object({
  username: z.string({ 
    error: 'auth.username_required'
  })
    .min(3, { message: 'auth.username_too_short' })
    .max(15, { message: 'auth.username_too_long' })
    .regex(/^[a-zA-ZñÑ0-9_-]+$/, { message: 'auth.username_invalid_format' })
    .trim(),

  email: z.string({ error: 'auth.email_required' }).email('auth.email_invalid'),

  password: z.string({ error: 'auth.password_required' })
    .min(8, { message: 'auth.password_too_short' })
    .max(20, { message: 'auth.password_too_long' })
    .regex(/[A-Z]/, { message: 'auth.password_uppercase' })
    .regex(/[a-z]/, { message: 'auth.password_lowercase' })
    .regex(/\d/, { message: 'auth.password_number' })
    .regex(/[\W_]/, { message: 'auth.password_special' })
});

export const verifyTokenSchema = z.object({
  token: z.string({
    message: 'auth.token_required'
  })
    .length(64, 'auth.token_invalid')
    .regex(/^[0-9a-fA-F]+$/, 'auth.token_invalid')
});
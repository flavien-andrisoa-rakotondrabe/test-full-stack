import { z } from 'zod';

export const RegisterSchema = z.object({
  email: z.string().email('Invalid email.'),
  password: z
    .string()
    .min(6, 'Invalid password. Min 6 characters.')
    .regex(/[A-Z]/, 'Password must contain at least 1 uppercase.')
    .regex(/[0-9]/, 'Password must contain at least 1 number.'),
});

export const LoginSchema = z.object({
  email: z.string().email('Invalid email.'),
  password: z.string().min(1, 'Password required.'),
});

export type RegisterDto = z.infer<typeof RegisterSchema>;
export type LoginDto = z.infer<typeof LoginSchema>;

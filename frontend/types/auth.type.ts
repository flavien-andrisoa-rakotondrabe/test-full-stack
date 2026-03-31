import { z } from 'zod';

// Login
export const LoginSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(1, 'Mot de passe requis'),
});

// Register
export const RegisterSchema = z
  .object({
    email: z.string().email('Email invalide'),
    password: z
      .string()
      .min(6, 'Au moins 6 caractères minimum')
      .regex(/[A-Z]/, 'Au moins 1 majuscule')
      .regex(/[0-9]/, 'Au moins 1 chiffre'),
    confirmPassword: z.string().min(1, 'Veuillez confirmer le mot de passe'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Les mots de passe ne correspondent pas',
    path: ['confirmPassword'],
  });

export type LoginType = z.infer<typeof LoginSchema>;
export type RegisterType = z.infer<typeof RegisterSchema>;

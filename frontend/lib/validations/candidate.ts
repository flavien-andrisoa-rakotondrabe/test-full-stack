import * as z from 'zod';

export const candidateSchema = z.object({
  firstName: z.string().min(2, 'Le prénom doit avoir au moins 2 caractères'),
  lastName: z.string().min(2, 'Le nom doit avoir au moins 2 caractères'),
  email: z.string().email('Email invalide'),
  phone: z.string().min(10, 'Numéro de téléphone invalide'),
});

export type CandidateFormValues = z.infer<typeof candidateSchema>;

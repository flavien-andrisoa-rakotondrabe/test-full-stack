import { z } from 'zod';

export const CandidateSchemaZod = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, 'Le prénom doit contenir au moins 2 caractères.'),
  lastName: z
    .string()
    .trim()
    .min(2, 'Le nom doit contenir au moins 2 caractères.'),
  email: z.string().trim().email("Format d'email invalide."),
  phone: z
    .string()
    .trim()
    .regex(
      /^\+?[0-9]{10,15}$/,
      'Numéro de téléphone invalide (10 à 15 chiffres).',
    ),
});

export const UpdateCandidateSchemaZod = CandidateSchemaZod.partial();

export type CreateCandidateDto = z.infer<typeof CandidateSchemaZod>;
export type UpdateCandidateDto = z.infer<typeof UpdateCandidateSchemaZod>;

export interface CandidateInterface extends CreateCandidateDto {
  _id: string;
  isValidated: boolean;
  deletedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

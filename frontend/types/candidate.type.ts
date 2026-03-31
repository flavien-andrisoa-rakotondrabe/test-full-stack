import { z } from 'zod';

export interface CandidateInterface {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  isValidated: boolean;
  deletedAt: Date | null;

  createdAt: Date;
  updatedAt: Date;
}

export type CreateCandidateDto = Pick<
  CandidateInterface,
  'firstName' | 'lastName' | 'email' | 'phone'
>;

export const CandidateSchemaZod = z.object({
  firstName: z.string().min(2, 'Invalid firstName. Min 2 characters.'),
  lastName: z.string().min(2, 'Invalid lastName. Min 2 characters.'),
  email: z.string().email('Invalid email.'),
  phone: z.string().regex(/^\+?[0-9]{10,15}$/, 'Invalid phone number.'),
});

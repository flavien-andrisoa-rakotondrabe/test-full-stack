import { Router } from 'express';

import {
  createCandidate,
  deleteCandidate,
  getAllCandidates,
  getCandidateById,
  updateCandidate,
  validateCandidate,
} from '@/controllers/candidate.controller';
import { zodValidate } from '@/middlewares/zodValidate';
import {
  CandidateSchemaZod,
  UpdateCandidateSchemaZod,
} from '@/types/candidate.type';

const router = Router();

router.get('/', getAllCandidates);
router.get('/:id', getCandidateById);
router.post('/', zodValidate(CandidateSchemaZod), createCandidate);
router.put('/:id', zodValidate(UpdateCandidateSchemaZod), updateCandidate);
router.delete('/:id', deleteCandidate);
router.post('/:id/validate', validateCandidate);

export default router;

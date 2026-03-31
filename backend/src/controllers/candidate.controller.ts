import { Request, Response } from 'express';
import { CandidateService } from '@/services/candidate.service';
import { CreateCandidateDto } from '@/types/candidate.type';
import { CandidateModel } from '@/models/candidate.moel';

export const createCandidate = async (req: Request, res: Response) => {
  try {
    const body = req.body as CreateCandidateDto;

    const existCandidate = await CandidateModel.findOne({ email: body.email });

    if (existCandidate) {
      return res.status(400).json({ message: 'Email already exist' });
    }

    const candidate = await CandidateService.create(body);

    res.status(201).json(candidate);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const validateCandidate = async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };

  const updated = await CandidateService.validateAsync(id);

  res.json({ message: 'Candidate created successfully', data: updated });
};

export const getAllCandidates = async (req: Request, res: Response) => {
  try {
    const candidates = await CandidateService.getAll();

    res.json(candidates);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getCandidateById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };

    const candidate = await CandidateService.getById(id);

    if (!candidate)
      return res.status(404).json({ message: 'Candidat non trouvé' });

    res.json(candidate);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const updateCandidate = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };

    const updated = await CandidateService.update(id, req.body);

    res.json(updated);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteCandidate = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };

    await CandidateService.softDelete(id);

    res.status(204).send();
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

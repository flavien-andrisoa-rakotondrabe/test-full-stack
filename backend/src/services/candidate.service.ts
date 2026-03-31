import { CandidateModel } from '@/models/candidate.moel';
import { CreateCandidateDto } from '@/types/candidate.type';

export const CandidateService = {
  async create(data: CreateCandidateDto) {
    return await CandidateModel.create(data);
  },

  async getAll() {
    return await CandidateModel.find({ deletedAt: null }).sort({
      createdAt: -1,
    });
  },

  async getById(id: string) {
    return await CandidateModel.findOne({ _id: id, deletedAt: null });
  },

  async update(id: string, data: Partial<CreateCandidateDto>) {
    return await CandidateModel.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true, runValidators: true },
    );
  },

  async softDelete(id: string) {
    return await CandidateModel.findByIdAndUpdate(id, {
      deletedAt: new Date(),
    });
  },

  async validateAsync(id: string) {
    // 2 seconds simulation
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return await CandidateModel.findByIdAndUpdate(
      id,
      { isValidated: true },
      { new: true },
    );
  },
};

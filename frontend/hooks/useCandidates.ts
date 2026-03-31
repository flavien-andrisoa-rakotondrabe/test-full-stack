'use client';

import { api } from '@/services/api';
import { CreateCandidateDto } from '@/types/candidate.type';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export const useCandidates = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['candidates'],
    queryFn: async () => {
      const { data } = await api.get('/candidates');
      return data;
    },
  });

  const createMutation = useMutation({
    mutationFn: (newCandidate: CreateCandidateDto) =>
      api.post('/candidates', newCandidate),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['candidates'] }),
  });

  const validateMutation = useMutation({
    mutationFn: (id: string) => api.post(`/candidates/${id}/validate`),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['candidates'] }),
  });

  return { query, createMutation, validateMutation };
};

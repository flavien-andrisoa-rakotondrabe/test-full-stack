'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useCandidates } from '@/hooks/useCandidates';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { AxiosError } from 'axios';

const schema = z.object({
  firstName: z.string().min(2, 'Prénom requis'),
  lastName: z.string().min(2, 'Nom requis'),
  email: z.email('Email invalide'),
  phone: z.string().regex(/^\+?[0-9]{10,15}$/, 'Téléphone invalide.'),
});

export function CandidateForm() {
  const { createMutation } = useCandidates();
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: any) => {
    createMutation.mutate(data, {
      onSuccess: () => {
        toast.success('Candidat ajouté avec succès !');
        reset();
      },
      onError: (err: unknown) => {
        if (err instanceof AxiosError) {
          const status = err.response?.status;
          const message =
            err.response?.data?.message || err.response?.data?.error;

          if (status === 400) {
            setError('email', {
              message: 'Email déjà enregistré',
            });
          } else {
            toast.error(message || "Une erreur est survenue lors de l'ajout");
          }
        }
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 border p-6 rounded-xl bg-card"
    >
      <h2 className="text-xl font-bold">Nouveau Candidat</h2>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Input
              {...register('firstName')}
              required
              placeholder="Prénom"
              className={cn(
                'h-10 px-4',
                errors.firstName && 'border-destructive',
              )}
            />
            {errors.firstName && (
              <span className="text-destructive text-xs">
                {errors.firstName.message as string}
              </span>
            )}
          </div>
          <div>
            <Input
              {...register('lastName')}
              required
              placeholder="Nom"
              className={cn(
                'h-10 px-4',
                errors.lastName && 'border-destructive',
              )}
            />
            {errors.lastName && (
              <span className="text-destructive text-xs">
                {errors.lastName.message as string}
              </span>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Input
            {...register('email')}
            required
            placeholder="Email"
            className={cn('h-10 px-4', errors.email && 'border-destructive')}
          />
          {errors.email && (
            <span className="text-destructive text-xs">
              {errors.email.message as string}
            </span>
          )}
        </div>

        <div className="space-y-2">
          <Input
            {...register('phone')}
            required
            placeholder="Téléphone"
            className={cn('h-10 px-4', errors.phone && 'border-destructive')}
          />
          {errors.phone && (
            <span className="text-destructive text-xs">
              {errors.phone.message as string}
            </span>
          )}
        </div>
      </div>

      <Button
        type="submit"
        className="w-full h-11 text-md cursor-pointer hover:opacity-90"
        disabled={createMutation.isPending}
      >
        {createMutation.isPending && (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        )}
        Ajouter au pipeline
      </Button>
    </form>
  );
}

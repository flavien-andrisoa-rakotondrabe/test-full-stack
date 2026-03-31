'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { api } from '@/services/api';
import { RegisterSchema, RegisterType } from '@/types/auth.type';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export function RegisterForm({ onSuccess }: { onSuccess: () => void }) {
  const [serverError, setServerError] = useState('');
  const [showPwd, setShowPwd] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterType>({
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit = async (data: RegisterType) => {
    try {
      setServerError('');
      const { confirmPassword, ...payload } = data;

      await api.post('/auth/register', payload);

      toast.success('Compte créé avec succès !');
      onSuccess();
    } catch (err: any) {
      if (err.response?.status === 400) {
        setError('email', { message: 'Email déjà enregistré' });
      } else {
        setServerError("Erreur lors de l'inscription");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Input
          {...register('email')}
          required
          placeholder="Email"
          className={cn('h-11 px-4', errors.email && 'border-destructive')}
        />
        {errors.email && (
          <p className="text-destructive text-xs">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <div className="relative">
          <Input
            {...register('password')}
            type={showPwd ? 'text' : 'password'}
            required
            placeholder="Mot de passe"
            className={cn('h-11 px-4', errors.password && 'border-destructive')}
          />
          <button
            type="button"
            onClick={() => setShowPwd(!showPwd)}
            className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-muted-foreground-fix hover:text-foreground-fix"
          >
            {showPwd ? (
              <Eye className="h-4 w-4" />
            ) : (
              <EyeOff className="h-4 w-4" />
            )}
          </button>
        </div>
        {errors.password && (
          <p className="text-destructive text-xs">{errors.password.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Input
          {...register('confirmPassword')}
          type="password"
          required
          placeholder="Confirmer le mot de passe"
          className={cn(
            'h-11 px-4',
            errors.confirmPassword && 'border-destructive',
          )}
        />
        {errors.confirmPassword && (
          <p className="text-destructive text-xs">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      {serverError && (
        <p className="text-center text-destructive text-sm font-bold">
          {serverError}
        </p>
      )}

      <Button
        type="submit"
        className="w-full h-12 text-lg cursor-pointer hover:opacity-90"
        disabled={isSubmitting}
      >
        Créer un compte
      </Button>
    </form>
  );
}

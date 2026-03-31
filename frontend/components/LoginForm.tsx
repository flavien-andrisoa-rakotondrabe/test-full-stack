'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/providers/Auth.provider';
import { api } from '@/services/api';

import { LoginSchema, LoginType } from '@/types/auth.type';
import { cn } from '@/lib/utils';

export function LoginForm() {
  const { login } = useAuth();
  const [serverError, setServerError] = useState('');

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async (data: LoginType) => {
    try {
      setServerError('');
      const res = await api.post<{ token: string }>('/auth/login', data);
      login(res.data.token);
    } catch (err: any) {
      if (err.response?.status === 404) {
        setError('email', { message: 'Email inconnu' });
      } else if (err.response?.status === 401) {
        setError('password', { message: 'Mot de passe incorrect' });
      } else {
        setServerError('Erreur de connexion');
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
        <Input
          {...register('password')}
          type="password"
          required
          placeholder="Mot de passe"
          className={cn('h-11 px-4', errors.password && 'border-destructive')}
        />
        {errors.password && (
          <p className="text-destructive text-xs">{errors.password.message}</p>
        )}
      </div>

      {serverError && (
        <p className="text-center text-destructive text-sm font-medium">
          {serverError}
        </p>
      )}

      <Button
        type="submit"
        size="lg"
        className="w-full h-12 text-lg cursor-pointer hover:opacity-90"
        disabled={isSubmitting}
      >
        Se connecter
      </Button>
    </form>
  );
}

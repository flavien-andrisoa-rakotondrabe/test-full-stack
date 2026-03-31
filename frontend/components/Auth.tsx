'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { LoginForm } from '@/components/LoginForm';
import { RegisterForm } from '@/components/RegisterForm';

export function Auth() {
  const [mode, setMode] = useState<'login' | 'register'>('login');

  return (
    <div className="min-h-screen flex justify-center items-center">
      <Card className="w-full max-w-md shadow-lg border-t-6 border-t-primary p-4">
        <CardHeader className="space-y-1">
          <CardTitle className="text-4xl text-center font-bold">
            {mode === 'login' ? 'Connexion' : 'Inscription'}
          </CardTitle>
          <CardDescription className="text-md text-center">
            {mode === 'login'
              ? 'Accédez à votre portail RH'
              : 'Inscrivez-vous pour gérer les candidats'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {mode === 'login' ? (
            <LoginForm />
          ) : (
            <RegisterForm onSuccess={() => setMode('login')} />
          )}

          <Button
            variant="link"
            className="w-full mt-4"
            onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
          >
            {mode === 'login'
              ? "Pas de compte ? S'inscrire"
              : 'Déjà un compte ? Se connecter'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

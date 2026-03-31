'use client';

import { CandidateForm } from '@/components/CandidateForm';
import { CandidateList } from '@/components/CandidateList';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/providers/Auth.provider';

export function Dashboard() {
  const { logout } = useAuth();

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <header className="flex justify-between items-center py-6 border-b">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">RH Portal</h1>
          <p className="text-muted-foreground">Gestion des talents</p>
        </div>
        <Button variant="ghost" onClick={logout} className="text-destructive">
          <LogOut className="w-4 h-4 mr-2" /> Déconnexion
        </Button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <CandidateForm />
        </div>
        <div className="lg:col-span-2">
          <CandidateList />
        </div>
      </div>
    </div>
  );
}

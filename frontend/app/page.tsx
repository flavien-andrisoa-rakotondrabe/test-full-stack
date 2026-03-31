'use client';

import { useAuth } from '@/providers/Auth.provider';
import { Auth } from '@/components/Auth';
import { Dashboard } from '@/components/Dashboard';
import DashboardLoader from '@/components/skeletons/DashboardLoader';

export default function Landing() {
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <main className="min-h-screen bg-slate-50/50 p-4 md:p-8">
      {isLoading ? (
        <DashboardLoader />
      ) : isAuthenticated ? (
        <Dashboard />
      ) : (
        <Auth />
      )}
    </main>
  );
}

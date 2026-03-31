import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardLoader() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex justify-between items-center py-6">
        <div className="space-y-2">
          <Skeleton className="w-32 h-8" />
          <Skeleton className="w-40 h-6" />
        </div>
        <Skeleton className="w-28 h-10" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Skeleton className="w-90 h-65" />
        </div>
        <div className="lg:col-span-2">
          <Skeleton className="w-full h-65" />
        </div>
      </div>
    </div>
  );
}

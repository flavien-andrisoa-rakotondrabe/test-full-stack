'use client';

import { useCandidates } from '@/hooks/useCandidates';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, CheckCircle2, Clock } from 'lucide-react';
import { CandidateInterface } from '@/types/candidate.type';
import { Skeleton } from '@/components/ui/skeleton';

export function CandidateList() {
  const { query, validateMutation } = useCandidates();

  if (query.isLoading) return <Skeleton className="w-full h-full" />;

  return (
    <div className="rounded-md border bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="h-12 px-4 font-bold text-base">
              Candidat
            </TableHead>
            <TableHead className="h-12 px-4 font-bold text-base">
              Contact
            </TableHead>
            <TableHead className="h-12 px-4 font-bold text-base">
              Statut
            </TableHead>
            <TableHead className="h-12 px-4 font-bold text-base text-right">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {query.data?.map((candidate: CandidateInterface) => (
            <TableRow key={candidate._id}>
              <TableCell className="px-4 font-medium">
                {candidate.firstName} {candidate.lastName}
              </TableCell>
              <TableCell className="px-4 text-muted-foreground">
                {candidate.email}
              </TableCell>
              <TableCell className="px-4">
                {candidate.isValidated ? (
                  <Badge variant="default" className="p-1 bg-green-500">
                    <CheckCircle2 className="w-3 h-3 mr-1" /> Validé
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="px-2 py-1 bg-yellow-50">
                    <Clock className="w-3 h-3 mr-1" /> En attente
                  </Badge>
                )}
              </TableCell>
              <TableCell className="px-4 text-right">
                <Button
                  size="sm"
                  variant="outline"
                  disabled={candidate.isValidated || validateMutation.isPending}
                  onClick={() => validateMutation.mutate(candidate._id)}
                  className="cursor-pointer"
                >
                  {validateMutation.isPending &&
                  validateMutation.variables === candidate._id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    'Valider'
                  )}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

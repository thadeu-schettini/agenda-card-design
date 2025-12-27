import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AlertTriangle, Users, Layers } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface DeletePlanDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  planName: string;
  patientsCount?: number;
  onConfirm: () => void;
}

export function DeletePlanDialog({
  open,
  onOpenChange,
  planName,
  patientsCount = 0,
  onConfirm,
}: DeletePlanDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10">
            <AlertTriangle className="h-7 w-7 text-destructive" />
          </div>
          <AlertDialogTitle className="text-center">
            Excluir Plano de Atendimento
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            <p className="mb-3">
              Tem certeza que deseja excluir o plano{" "}
              <span className="font-semibold text-foreground">"{planName}"</span>?
            </p>
            
            {patientsCount > 0 && (
              <div className="rounded-lg bg-amber-500/10 border border-amber-500/20 p-3 mb-3">
                <div className="flex items-center gap-2 text-amber-600">
                  <Users className="h-4 w-4" />
                  <span className="text-sm font-medium">
                    {patientsCount} paciente{patientsCount !== 1 ? "s" : ""} vinculado{patientsCount !== 1 ? "s" : ""}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Os pacientes serão desvinculados deste plano
                </p>
              </div>
            )}

            <div className="rounded-lg bg-muted/50 p-3 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Layers className="h-4 w-4" />
                <span>Esta ação não poderá ser desfeita</span>
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="sm:justify-center gap-2">
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Excluir Plano
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

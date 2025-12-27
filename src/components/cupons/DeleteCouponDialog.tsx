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
import { AlertTriangle, Ticket, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface DeleteCouponDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  couponCode: string;
  couponName: string;
  redemptions?: number;
  onConfirm: () => void;
}

export function DeleteCouponDialog({
  open,
  onOpenChange,
  couponCode,
  couponName,
  redemptions = 0,
  onConfirm,
}: DeleteCouponDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10">
            <AlertTriangle className="h-7 w-7 text-destructive" />
          </div>
          <AlertDialogTitle className="text-center">
            Excluir Cupom
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            <p className="mb-3">
              Tem certeza que deseja excluir o cupom{" "}
              <code className="px-2 py-0.5 rounded bg-muted font-mono text-foreground">
                {couponCode}
              </code>?
            </p>
            
            <p className="text-sm text-muted-foreground mb-3">
              {couponName}
            </p>

            {redemptions > 0 && (
              <div className="rounded-lg bg-blue-500/10 border border-blue-500/20 p-3 mb-3">
                <div className="flex items-center gap-2 text-blue-600">
                  <Users className="h-4 w-4" />
                  <span className="text-sm font-medium">
                    {redemptions} uso{redemptions !== 1 ? "s" : ""} registrado{redemptions !== 1 ? "s" : ""}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  O histórico de uso será mantido
                </p>
              </div>
            )}

            <div className="rounded-lg bg-muted/50 p-3 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Ticket className="h-4 w-4" />
                <span>O cupom não poderá mais ser utilizado</span>
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
            Excluir Cupom
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

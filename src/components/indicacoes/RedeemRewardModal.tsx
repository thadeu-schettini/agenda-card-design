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
import { Badge } from "@/components/ui/badge";
import { Gift, Sparkles, CheckCircle2 } from "lucide-react";

interface RedeemRewardModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reward: {
    name: string;
    points: string;
    discount: string;
    level: string;
  } | null;
  onConfirm: () => void;
}

export function RedeemRewardModal({
  open,
  onOpenChange,
  reward,
  onConfirm,
}: RedeemRewardModalProps) {
  if (!reward) return null;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/10">
            <Gift className="h-8 w-8 text-primary" />
          </div>
          <AlertDialogTitle className="text-center">
            Resgatar Recompensa
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            <div className="mb-4">
              <p className="text-lg font-semibold text-foreground mb-1">
                {reward.name}
              </p>
              <Badge variant="outline" className="mb-3">
                Nível {reward.level}
              </Badge>
            </div>
            
            <div className="rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 p-4 mb-4 border border-primary/20">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <span className="text-2xl font-bold text-primary">{reward.points}</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {reward.discount}
              </p>
            </div>

            <div className="rounded-lg bg-muted/50 p-3 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                <span>O benefício será aplicado na próxima fatura</span>
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="sm:justify-center gap-2">
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="gap-2 bg-gradient-to-r from-primary to-primary/80"
          >
            <Gift className="h-4 w-4" />
            Confirmar Resgate
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

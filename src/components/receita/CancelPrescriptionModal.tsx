import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  XCircle, 
  AlertTriangle
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface CancelPrescriptionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  prescription: {
    id: number;
    patient: string;
    date: string;
  } | null;
}

export function CancelPrescriptionModal({ open, onOpenChange, prescription }: CancelPrescriptionModalProps) {
  const [reason, setReason] = useState("");

  if (!prescription) return null;

  const handleCancel = () => {
    if (!reason.trim()) {
      toast.error("Informe o motivo do cancelamento");
      return;
    }
    toast.success("Receita cancelada!");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-destructive/20 to-destructive/5 flex items-center justify-center">
              <XCircle className="h-6 w-6 text-destructive" />
            </div>
            <div>
              <DialogTitle>Cancelar Receita</DialogTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {prescription.patient} • {prescription.date}
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Warning */}
          <div className="p-4 rounded-xl bg-destructive/5 border border-destructive/20">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
              <div>
                <p className="font-medium text-destructive">Ação Irreversível</p>
                <p className="text-sm text-muted-foreground mt-1">
                  O cancelamento é definitivo. A receita não poderá mais ser utilizada 
                  e as farmácias serão notificadas.
                </p>
              </div>
            </div>
          </div>

          {/* Reason */}
          <div className="space-y-2">
            <Label>Motivo do Cancelamento *</Label>
            <Textarea 
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Informe o motivo do cancelamento..."
              className="min-h-[100px]"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Voltar
          </Button>
          <Button variant="destructive" onClick={handleCancel} className="gap-2">
            <XCircle className="h-4 w-4" />
            Confirmar Cancelamento
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

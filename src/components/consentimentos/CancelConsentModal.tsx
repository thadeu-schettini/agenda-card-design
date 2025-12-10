import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  AlertTriangle,
  XCircle
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface CancelConsentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  consent: {
    id: number;
    patient: string;
    procedure: string;
    template: string;
    status: string;
  } | null;
}

export function CancelConsentModal({ open, onOpenChange, consent }: CancelConsentModalProps) {
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!consent) return null;

  const handleCancel = async () => {
    if (!reason.trim()) {
      toast.error("Informe o motivo do cancelamento");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success("Consentimento cancelado com sucesso");
    setIsSubmitting(false);
    setReason("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-destructive/10 flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-destructive" />
            </div>
            <div>
              <DialogTitle>Cancelar Consentimento</DialogTitle>
              <DialogDescription className="mt-1">
                Esta ação não pode ser desfeita
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="p-4 rounded-xl bg-destructive/5 border border-destructive/20">
            <p className="text-sm">
              Você está prestes a cancelar o consentimento de <strong>{consent.patient}</strong> para o procedimento <strong>{consent.procedure}</strong>.
            </p>
          </div>

          <div className="space-y-2">
            <Label>Motivo do Cancelamento *</Label>
            <Textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Descreva o motivo do cancelamento..."
              className="min-h-[100px]"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
          >
            Voltar
          </Button>
          <Button 
            variant="destructive" 
            className="gap-2"
            onClick={handleCancel}
            disabled={isSubmitting}
          >
            <XCircle className="h-4 w-4" />
            {isSubmitting ? "Cancelando..." : "Cancelar Consentimento"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
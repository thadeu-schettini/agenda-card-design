import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  RefreshCw, 
  Pill,
  AlertTriangle,
  Send
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface ReissuePrescriptionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  prescription: {
    id: number;
    patient: string;
    professional: string;
    medications: {
      name: string;
      dosage: string;
      frequency: string;
      duration: string;
    }[];
    type: string;
  } | null;
}

export function ReissuePrescriptionModal({ open, onOpenChange, prescription }: ReissuePrescriptionModalProps) {
  const [reason, setReason] = useState("");

  if (!prescription) return null;

  const handleReissue = () => {
    if (!reason.trim()) {
      toast.error("Informe o motivo da reemissão");
      return;
    }
    toast.success("Receita reemitida com sucesso!");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh]">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-info/20 to-info/5 flex items-center justify-center">
              <RefreshCw className="h-6 w-6 text-info" />
            </div>
            <div>
              <DialogTitle>Reemitir Receita</DialogTitle>
              <p className="text-sm text-muted-foreground mt-1">{prescription.patient}</p>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="h-[40vh] pr-4">
          <div className="space-y-6">
            {/* Warning */}
            <div className="p-4 rounded-xl bg-pending/5 border border-pending/20">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-pending mt-0.5" />
                <div>
                  <p className="font-medium text-pending">Atenção</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    A reemissão criará uma nova receita com os mesmos medicamentos. 
                    A receita anterior permanecerá no histórico.
                  </p>
                </div>
              </div>
            </div>

            {/* Medications Preview */}
            <div className="space-y-3">
              <Label>Medicamentos a serem reemitidos:</Label>
              {prescription.medications.map((med, index) => (
                <div key={index} className="p-3 rounded-xl bg-muted/30 flex items-center gap-3">
                  <Pill className="h-4 w-4 text-primary" />
                  <div>
                    <p className="font-medium text-sm">{med.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {med.dosage} • {med.frequency} • {med.duration}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Reason */}
            <div className="space-y-2">
              <Label>Motivo da Reemissão *</Label>
              <Textarea 
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Ex: Paciente perdeu a receita original..."
                className="min-h-[100px]"
              />
            </div>
          </div>
        </ScrollArea>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleReissue} className="gap-2">
            <Send className="h-4 w-4" />
            Reemitir Receita
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

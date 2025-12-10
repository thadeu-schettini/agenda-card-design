import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Ban, AlertTriangle, Clock, CreditCard, Shield, Check, X } from "lucide-react";
import { toast } from "sonner";

interface SuspendClinicModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  clinic: {
    id: number | string;
    name: string;
    status: string;
  } | null;
}

const suspendReasons = [
  { id: "payment", label: "Inadimplência", description: "Pagamento em atraso", icon: CreditCard },
  { id: "violation", label: "Violação de Termos", description: "Uso indevido do sistema", icon: Shield },
  { id: "request", label: "Solicitação do Cliente", description: "Pedido de pausa temporária", icon: Clock },
  { id: "other", label: "Outro Motivo", description: "Especificar nas notas", icon: AlertTriangle },
];

export function SuspendClinicModal({ open, onOpenChange, clinic }: SuspendClinicModalProps) {
  const [reason, setReason] = useState("payment");
  const [notes, setNotes] = useState("");
  const [confirmText, setConfirmText] = useState("");

  if (!clinic) return null;

  const isSuspended = clinic.status === "suspended";

  const handleSubmit = () => {
    if (!isSuspended && confirmText !== "SUSPENDER") {
      toast.error("Digite SUSPENDER para confirmar a ação");
      return;
    }
    
    if (isSuspended) {
      toast.success("Clínica reativada com sucesso!");
    } else {
      toast.success("Clínica suspensa com sucesso!");
    }
    onOpenChange(false);
    setReason("payment");
    setNotes("");
    setConfirmText("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className={`p-2 rounded-lg ${isSuspended ? "bg-success/10" : "bg-destructive/10"}`}>
              {isSuspended ? (
                <Check className="h-5 w-5 text-success" />
              ) : (
                <Ban className="h-5 w-5 text-destructive" />
              )}
            </div>
            {isSuspended ? "Reativar Clínica" : "Suspender Clínica"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <Alert className={isSuspended ? "border-success/20 bg-success/5" : "border-destructive/20 bg-destructive/5"}>
            <AlertTriangle className={`h-4 w-4 ${isSuspended ? "text-success" : "text-destructive"}`} />
            <AlertDescription>
              {isSuspended ? (
                <>Você está prestes a <strong>reativar</strong> a clínica <strong>{clinic.name}</strong>. 
                Os usuários poderão acessar o sistema novamente.</>
              ) : (
                <>Você está prestes a <strong>suspender</strong> a clínica <strong>{clinic.name}</strong>. 
                Todos os usuários perderão acesso imediatamente.</>
              )}
            </AlertDescription>
          </Alert>

          {!isSuspended && (
            <>
              {/* Motivo */}
              <div className="space-y-3">
                <Label>Motivo da Suspensão</Label>
                <RadioGroup value={reason} onValueChange={setReason} className="grid gap-3">
                  {suspendReasons.map((item) => (
                    <label
                      key={item.id}
                      className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all hover:border-primary/50 ${
                        reason === item.id ? "border-primary bg-primary/5" : "border-border"
                      }`}
                    >
                      <RadioGroupItem value={item.id} />
                      <item.icon className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium text-sm">{item.label}</p>
                        <p className="text-xs text-muted-foreground">{item.description}</p>
                      </div>
                    </label>
                  ))}
                </RadioGroup>
              </div>

              {/* Notas */}
              <div className="space-y-2">
                <Label htmlFor="notes">Notas Adicionais</Label>
                <Textarea
                  id="notes"
                  placeholder="Detalhes sobre a suspensão..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                />
              </div>

              {/* Confirmação */}
              <div className="space-y-2">
                <Label htmlFor="confirm">
                  Digite <span className="font-mono font-bold text-destructive">SUSPENDER</span> para confirmar
                </Label>
                <input
                  id="confirm"
                  type="text"
                  className="w-full px-3 py-2 rounded-md border border-destructive/30 bg-destructive/5 focus:border-destructive focus:outline-none focus:ring-1 focus:ring-destructive"
                  placeholder="SUSPENDER"
                  value={confirmText}
                  onChange={(e) => setConfirmText(e.target.value)}
                />
              </div>
            </>
          )}

          {isSuspended && (
            <div className="space-y-2">
              <Label htmlFor="notes">Notas de Reativação</Label>
              <Textarea
                id="notes"
                placeholder="Motivo da reativação..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
              />
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            <X className="h-4 w-4 mr-2" />
            Cancelar
          </Button>
          <Button 
            onClick={handleSubmit}
            variant={isSuspended ? "default" : "destructive"}
            disabled={!isSuspended && confirmText !== "SUSPENDER"}
          >
            {isSuspended ? (
              <>
                <Check className="h-4 w-4 mr-2" />
                Reativar Clínica
              </>
            ) : (
              <>
                <Ban className="h-4 w-4 mr-2" />
                Suspender Clínica
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

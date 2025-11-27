import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, User, Calendar, CheckCircle2, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface CheckInModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  appointment: {
    patientName: string;
    time: string;
    service: string;
    professional: string;
    status: string;
  };
}

export const CheckInModal = ({ open, onOpenChange, appointment }: CheckInModalProps) => {
  const [loading, setLoading] = useState(false);

  const handleCheckIn = () => {
    setLoading(true);
    // Simulação de check-in
    setTimeout(() => {
      setLoading(false);
      toast.success(`Check-in realizado com sucesso!`, {
        description: `${appointment.patientName} está aguardando atendimento.`
      });
      onOpenChange(false);
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-primary" />
            Check-in Rápido
          </DialogTitle>
          <DialogDescription>
            Confirme a chegada do paciente para atualizar o status automaticamente
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Informações do Paciente */}
          <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <User className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">{appointment.patientName}</h3>
                <p className="text-sm text-muted-foreground">{appointment.service}</p>
              </div>
            </div>
          </div>

          {/* Detalhes do Agendamento */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Horário</p>
                <p className="text-sm font-medium">{appointment.time}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Status Atual</p>
                <Badge variant="outline" className="text-xs">
                  {appointment.status}
                </Badge>
              </div>
            </div>
          </div>

          {/* Profissional */}
          <div className="p-3 rounded-lg bg-muted/30 border border-border/50">
            <p className="text-xs text-muted-foreground mb-1">Profissional</p>
            <p className="text-sm font-medium">{appointment.professional}</p>
          </div>

          {/* Aviso */}
          <div className="flex items-start gap-2 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
            <AlertCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-blue-700 dark:text-blue-300">
              O profissional será notificado automaticamente sobre a chegada do paciente
            </p>
          </div>
        </div>

        {/* Ações */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="flex-1"
            disabled={loading}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleCheckIn}
            className="flex-1"
            disabled={loading}
          >
            {loading ? "Confirmando..." : "Confirmar Check-in"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

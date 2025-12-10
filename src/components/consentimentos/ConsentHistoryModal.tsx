import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  History, 
  Download, 
  Eye, 
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle,
  XCircle,
  Send,
  FileSignature
} from "lucide-react";
import { toast } from "sonner";

interface ConsentHistoryModalProps {
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

const mockHistory = [
  { id: 1, action: "Criado", date: "10/01/2025 09:00", user: "Dr. Carlos Santos", details: "Consentimento criado" },
  { id: 2, action: "Enviado", date: "10/01/2025 09:30", user: "Sistema", details: "Enviado via email e SMS" },
  { id: 3, action: "Visualizado", date: "10/01/2025 11:45", user: "Paciente", details: "Acessado pelo link" },
  { id: 4, action: "Assinado", date: "10/01/2025 14:22", user: "Paciente", details: "Assinatura digital confirmada" },
];

const actionConfig = {
  Criado: { color: "bg-muted text-muted-foreground border-border", icon: FileSignature },
  Enviado: { color: "bg-info/10 text-info border-info/20", icon: Send },
  Visualizado: { color: "bg-pending/10 text-pending border-pending/20", icon: Eye },
  Assinado: { color: "bg-confirmed/10 text-confirmed border-confirmed/20", icon: CheckCircle2 },
  Recusado: { color: "bg-destructive/10 text-destructive border-destructive/20", icon: XCircle },
  Cancelado: { color: "bg-destructive/10 text-destructive border-destructive/20", icon: AlertCircle },
  Expirado: { color: "bg-destructive/10 text-destructive border-destructive/20", icon: Clock },
};

export function ConsentHistoryModal({ open, onOpenChange, consent }: ConsentHistoryModalProps) {
  if (!consent) return null;

  const handleExport = () => {
    toast.success("Histórico exportado!");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh]">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-info/20 to-info/5 flex items-center justify-center">
              <History className="h-6 w-6 text-info" />
            </div>
            <div>
              <DialogTitle>Histórico do Consentimento</DialogTitle>
              <p className="text-sm text-muted-foreground mt-1">{consent.patient} • {consent.procedure}</p>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="h-[400px] pr-4">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-border" />

            <div className="space-y-4">
              {mockHistory.map((event, index) => {
                const config = actionConfig[event.action as keyof typeof actionConfig] || actionConfig.Criado;
                const ActionIcon = config.icon;
                return (
                  <div key={event.id} className="relative flex gap-4">
                    {/* Timeline dot */}
                    <div className={`relative z-10 h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${config.color.split(' ')[0]}`}>
                      <ActionIcon className={`h-5 w-5 ${config.color.split(' ')[1]}`} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-4 rounded-xl border bg-card hover:border-primary/20 transition-colors">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{event.action}</p>
                            <Badge variant="outline" className={config.color}>
                              <ActionIcon className="h-3 w-3 mr-1" />
                              {event.action}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{event.details}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-xs text-muted-foreground flex items-center gap-1 justify-end">
                            <Calendar className="h-3 w-3" />
                            {event.date}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">{event.user}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </ScrollArea>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" className="gap-2" onClick={handleExport}>
            <Download className="h-4 w-4" />
            Exportar
          </Button>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Fechar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
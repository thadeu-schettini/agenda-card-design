import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Activity, 
  CheckCircle2,
  Clock,
  User,
  Calendar,
  Edit,
  Play,
  Pause,
  Plus,
  Settings2
} from "lucide-react";

interface ProtocolHistoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  protocol: {
    id: number;
    name: string;
  } | null;
}

const mockHistory = [
  { 
    id: 1, 
    action: "Paciente inscrito", 
    description: "Maria Silva foi inscrita no protocolo",
    user: "Dr. Carlos Santos",
    date: "Hoje, 14:30",
    type: "patient"
  },
  { 
    id: 2, 
    action: "Etapa concluída", 
    description: "João Oliveira completou: Exame HbA1c",
    user: "Sistema",
    date: "Hoje, 10:15",
    type: "step"
  },
  { 
    id: 3, 
    action: "Protocolo editado", 
    description: "Timing da etapa 'Consulta de retorno' alterado",
    user: "Dra. Ana Lima",
    date: "Ontem, 16:45",
    type: "edit"
  },
  { 
    id: 4, 
    action: "Protocolo reativado", 
    description: "Protocolo foi reativado após pausa",
    user: "Dr. Carlos Santos",
    date: "03/01/2025, 09:00",
    type: "activate"
  },
  { 
    id: 5, 
    action: "Protocolo pausado", 
    description: "Protocolo foi pausado temporariamente",
    user: "Dr. Carlos Santos",
    date: "02/01/2025, 18:30",
    type: "pause"
  },
  { 
    id: 6, 
    action: "Nova etapa adicionada", 
    description: "Etapa 'Exame de fundo de olho' foi adicionada",
    user: "Dra. Ana Lima",
    date: "28/12/2024, 11:20",
    type: "add"
  },
  { 
    id: 7, 
    action: "Protocolo criado", 
    description: "Protocolo foi criado e ativado",
    user: "Dr. Carlos Santos",
    date: "01/12/2024, 08:00",
    type: "create"
  },
];

const typeConfig = {
  patient: { icon: User, color: "bg-primary/10 text-primary" },
  step: { icon: CheckCircle2, color: "bg-confirmed/10 text-confirmed" },
  edit: { icon: Edit, color: "bg-info/10 text-info" },
  activate: { icon: Play, color: "bg-confirmed/10 text-confirmed" },
  pause: { icon: Pause, color: "bg-pending/10 text-pending" },
  add: { icon: Plus, color: "bg-primary/10 text-primary" },
  create: { icon: Settings2, color: "bg-info/10 text-info" }
};

export function ProtocolHistoryModal({ open, onOpenChange, protocol }: ProtocolHistoryModalProps) {
  if (!protocol) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh]">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
              <Activity className="h-6 w-6 text-primary" />
            </div>
            <div>
              <DialogTitle>Histórico do Protocolo</DialogTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {protocol.name}
              </p>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="h-[500px] pr-4">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-5 top-0 bottom-0 w-px bg-border" />

            <div className="space-y-4">
              {mockHistory.map((item, index) => {
                const config = typeConfig[item.type as keyof typeof typeConfig];
                const Icon = config.icon;
                
                return (
                  <div key={item.id} className="flex gap-4 relative">
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 z-10 ${config.color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    
                    <div className="flex-1 pb-4">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-medium">{item.action}</p>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {item.date}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        por {item.user}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </ScrollArea>

        <div className="flex items-center justify-end pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Fechar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

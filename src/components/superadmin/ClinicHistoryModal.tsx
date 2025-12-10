import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  History, 
  Building2, 
  CreditCard, 
  User, 
  Settings, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowUp, 
  ArrowDown,
  Download,
  Filter,
  Calendar,
  Clock
} from "lucide-react";

interface ClinicHistoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  clinic: {
    id: number | string;
    name: string;
  } | null;
}

const historyEvents = [
  { id: 1, type: "plan_upgrade", title: "Upgrade de Plano", description: "Pro → Business", user: "Sistema", date: "10/12/2024 14:30", icon: ArrowUp, color: "success" },
  { id: 2, type: "payment", title: "Pagamento Recebido", description: "R$ 450,00 - Mensalidade", user: "Sistema", date: "05/12/2024 08:00", icon: CreditCard, color: "success" },
  { id: 3, type: "user_added", title: "Novo Usuário", description: "João Silva adicionado como Médico", user: "Admin Clínica", date: "03/12/2024 11:20", icon: User, color: "info" },
  { id: 4, type: "settings", title: "Configurações Alteradas", description: "Telemedicina ativada", user: "Admin Clínica", date: "01/12/2024 16:45", icon: Settings, color: "primary" },
  { id: 5, type: "payment", title: "Pagamento Recebido", description: "R$ 199,00 - Mensalidade", user: "Sistema", date: "05/11/2024 08:00", icon: CreditCard, color: "success" },
  { id: 6, type: "support", title: "Ticket de Suporte", description: "Erro no relatório financeiro - Resolvido", user: "Suporte", date: "28/11/2024 09:15", icon: AlertTriangle, color: "warning" },
  { id: 7, type: "plan_downgrade", title: "Downgrade de Plano", description: "Business → Pro (temporário)", user: "Admin Sistema", date: "15/11/2024 10:00", icon: ArrowDown, color: "warning" },
  { id: 8, type: "activated", title: "Conta Ativada", description: "Trial convertido para plano pago", user: "Sistema", date: "01/10/2024 14:00", icon: CheckCircle2, color: "success" },
  { id: 9, type: "created", title: "Conta Criada", description: "Clínica registrada no sistema", user: "Sistema", date: "15/09/2024 10:30", icon: Building2, color: "primary" },
];

export function ClinicHistoryModal({ open, onOpenChange, clinic }: ClinicHistoryModalProps) {
  if (!clinic) return null;

  const getEventIcon = (event: typeof historyEvents[0]) => {
    const Icon = event.icon;
    return (
      <div className={`p-2 rounded-lg bg-${event.color}/10`}>
        <Icon className={`h-4 w-4 text-${event.color}`} />
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-gradient-to-br from-info/20 to-info/10">
              <History className="h-5 w-5 text-info" />
            </div>
            Histórico - {clinic.name}
          </DialogTitle>
        </DialogHeader>

        <div className="flex items-center justify-between gap-4 py-2">
          <div className="flex items-center gap-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-[140px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="payment">Pagamentos</SelectItem>
                <SelectItem value="plan">Planos</SelectItem>
                <SelectItem value="user">Usuários</SelectItem>
                <SelectItem value="support">Suporte</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="30d">
              <SelectTrigger className="w-[140px]">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Últimos 7 dias</SelectItem>
                <SelectItem value="30d">Últimos 30 dias</SelectItem>
                <SelectItem value="90d">Últimos 90 dias</SelectItem>
                <SelectItem value="all">Todo período</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            Exportar
          </Button>
        </div>

        <Separator />

        <ScrollArea className="h-[400px] pr-4">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-5 top-0 bottom-0 w-px bg-border" />

            <div className="space-y-4">
              {historyEvents.map((event, index) => (
                <div key={event.id} className="relative flex gap-4 pl-2">
                  {/* Timeline dot */}
                  <div className="relative z-10">
                    {getEventIcon(event)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-4">
                    <div className="p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-all">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-medium text-sm">{event.title}</p>
                          <p className="text-sm text-muted-foreground">{event.description}</p>
                        </div>
                        <Badge variant="outline" className="text-xs shrink-0">
                          {event.type.replace("_", " ")}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {event.user}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {event.date}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollArea>

        <div className="flex justify-end pt-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Fechar</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

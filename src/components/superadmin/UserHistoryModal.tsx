import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  History, 
  User, 
  LogIn, 
  LogOut, 
  KeyRound, 
  Settings, 
  Shield, 
  AlertTriangle,
  Download,
  Filter,
  Calendar,
  Clock,
  Globe,
  Smartphone,
  Laptop
} from "lucide-react";

interface UserHistoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: {
    id: number | string;
    name: string;
    email: string;
  } | null;
}

const historyEvents = [
  { id: 1, type: "login", title: "Login", description: "Acesso via navegador web", device: "Chrome / Windows", ip: "192.168.1.100", date: "10/12/2024 14:32", icon: LogIn, color: "success" },
  { id: 2, type: "logout", title: "Logout", description: "Sessão encerrada", device: "Chrome / Windows", ip: "192.168.1.100", date: "10/12/2024 18:45", icon: LogOut, color: "muted-foreground" },
  { id: 3, type: "login", title: "Login", description: "Acesso via app mobile", device: "App iOS", ip: "189.45.67.89", date: "09/12/2024 08:15", icon: Smartphone, color: "success" },
  { id: 4, type: "password_reset", title: "Senha Alterada", description: "Redefinição via email", device: "Sistema", ip: "Sistema", date: "05/12/2024 10:30", icon: KeyRound, color: "warning" },
  { id: 5, type: "settings", title: "Configurações", description: "Preferências de notificação alteradas", device: "Chrome / MacOS", ip: "192.168.1.105", date: "01/12/2024 14:20", icon: Settings, color: "primary" },
  { id: 6, type: "permission", title: "Permissões", description: "Acesso ao módulo Financeiro concedido", device: "Admin", ip: "10.0.0.1", date: "28/11/2024 09:00", icon: Shield, color: "info" },
  { id: 7, type: "failed_login", title: "Login Falhou", description: "Senha incorreta (2 tentativas)", device: "Chrome / Windows", ip: "45.67.89.123", date: "25/11/2024 22:15", icon: AlertTriangle, color: "destructive" },
  { id: 8, type: "login", title: "Login", description: "Primeiro acesso ao sistema", device: "Safari / MacOS", ip: "192.168.1.50", date: "15/11/2024 10:00", icon: LogIn, color: "success" },
];

export function UserHistoryModal({ open, onOpenChange, user }: UserHistoryModalProps) {
  if (!user) return null;

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
            Histórico - {user.name}
          </DialogTitle>
        </DialogHeader>

        <div className="flex items-center gap-2 text-sm text-muted-foreground pb-2">
          <User className="h-4 w-4" />
          <span>{user.email}</span>
        </div>

        <div className="flex items-center justify-between gap-4 py-2">
          <div className="flex items-center gap-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-[140px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="login">Logins</SelectItem>
                <SelectItem value="security">Segurança</SelectItem>
                <SelectItem value="settings">Configurações</SelectItem>
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
            <div className="absolute left-5 top-0 bottom-0 w-px bg-border" />

            <div className="space-y-4">
              {historyEvents.map((event) => (
                <div key={event.id} className="relative flex gap-4 pl-2">
                  <div className="relative z-10">
                    {getEventIcon(event)}
                  </div>

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
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground flex-wrap">
                        <span className="flex items-center gap-1">
                          <Laptop className="h-3 w-3" />
                          {event.device}
                        </span>
                        <span className="flex items-center gap-1">
                          <Globe className="h-3 w-3" />
                          {event.ip}
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

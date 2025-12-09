import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  Activity,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Clock,
  MessageSquare,
  Mail,
  Bell,
  Smartphone,
  RefreshCw,
} from "lucide-react";

interface ActivityListModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Mock activities
const allActivities = [
  { id: 1, type: "Lembrete", recipient: "Maria Silva", channel: "WhatsApp", status: "delivered", time: "2 min atrás" },
  { id: 2, type: "Confirmação", recipient: "João Santos", channel: "SMS", status: "delivered", time: "5 min atrás" },
  { id: 3, type: "Lembrete", recipient: "Ana Costa", channel: "E-mail", status: "pending", time: "8 min atrás" },
  { id: 4, type: "Promocional", recipient: "Carlos Lima", channel: "Push", status: "failed", time: "12 min atrás" },
  { id: 5, type: "Confirmação", recipient: "Paula Souza", channel: "WhatsApp", status: "delivered", time: "15 min atrás" },
  { id: 6, type: "Resultado", recipient: "Pedro Oliveira", channel: "E-mail", status: "delivered", time: "20 min atrás" },
  { id: 7, type: "Lembrete", recipient: "Fernanda Rocha", channel: "SMS", status: "delivered", time: "25 min atrás" },
  { id: 8, type: "Aniversário", recipient: "Ricardo Alves", channel: "WhatsApp", status: "delivered", time: "30 min atrás" },
  { id: 9, type: "Confirmação", recipient: "Sandra Costa", channel: "SMS", status: "failed", time: "35 min atrás" },
  { id: 10, type: "Lembrete", recipient: "Bruno Martins", channel: "E-mail", status: "pending", time: "40 min atrás" },
  { id: 11, type: "Promocional", recipient: "Camila Santos", channel: "Push", status: "delivered", time: "45 min atrás" },
  { id: 12, type: "Resultado", recipient: "Lucas Ferreira", channel: "E-mail", status: "delivered", time: "50 min atrás" },
];

const channelIcons = {
  WhatsApp: Smartphone,
  SMS: MessageSquare,
  "E-mail": Mail,
  Push: Bell,
};

export function ActivityListModal({ open, onOpenChange }: ActivityListModalProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [channelFilter, setChannelFilter] = useState("all");

  const filteredActivities = allActivities.filter(activity => {
    const matchesSearch = activity.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          activity.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || activity.status === statusFilter;
    const matchesChannel = channelFilter === "all" || activity.channel === channelFilter;
    return matchesSearch && matchesStatus && matchesChannel;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered": return <CheckCircle2 className="h-4 w-4 text-emerald-500" />;
      case "pending": return <Clock className="h-4 w-4 text-amber-500" />;
      case "failed": return <XCircle className="h-4 w-4 text-destructive" />;
      default: return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "delivered": return <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">Entregue</Badge>;
      case "pending": return <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/20">Pendente</Badge>;
      case "failed": return <Badge className="bg-red-500/10 text-red-600 border-red-500/20">Falhou</Badge>;
      default: return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 shadow-lg">
              <Activity className="h-5 w-5 text-white" />
            </div>
            <div>
              <DialogTitle>Todas as Atividades</DialogTitle>
              <p className="text-sm text-muted-foreground">{filteredActivities.length} atividades</p>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 flex-1 overflow-hidden flex flex-col">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar atividades..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[140px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="delivered">Entregues</SelectItem>
                <SelectItem value="pending">Pendentes</SelectItem>
                <SelectItem value="failed">Falharam</SelectItem>
              </SelectContent>
            </Select>
            <Select value={channelFilter} onValueChange={setChannelFilter}>
              <SelectTrigger className="w-full sm:w-[140px]">
                <SelectValue placeholder="Canal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                <SelectItem value="SMS">SMS</SelectItem>
                <SelectItem value="E-mail">E-mail</SelectItem>
                <SelectItem value="Push">Push</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Activities List */}
          <ScrollArea className="flex-1 pr-2">
            <div className="space-y-2">
              {filteredActivities.map((activity) => {
                const ChannelIcon = channelIcons[activity.channel as keyof typeof channelIcons] || MessageSquare;
                return (
                  <div
                    key={activity.id}
                    className="flex items-center justify-between p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      {getStatusIcon(activity.status)}
                      <div>
                        <p className="font-medium">{activity.recipient}</p>
                        <p className="text-xs text-muted-foreground">{activity.type}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="gap-1">
                        <ChannelIcon className="h-3 w-3" />
                        {activity.channel}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{activity.time}</span>
                      {activity.status === "failed" && (
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}

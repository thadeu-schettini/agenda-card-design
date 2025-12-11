import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, Monitor, Smartphone, Globe, Clock, MapPin, Search, LogOut, ShieldAlert } from "lucide-react";

interface ActiveSessionsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const mockSessions = [
  {
    id: "1",
    user: "Dr. Carlos Silva",
    email: "carlos@clinicasaolucas.com",
    clinic: "Clínica São Lucas",
    device: "desktop",
    browser: "Chrome 120",
    ip: "201.17.45.89",
    location: "São Paulo, SP",
    startedAt: "Há 2 horas",
    lastActivity: "Há 5 min",
    current: true,
  },
  {
    id: "2",
    user: "Maria Souza",
    email: "maria@vidamed.com",
    clinic: "Centro Médico Vida",
    device: "mobile",
    browser: "Safari iOS 17",
    ip: "189.45.67.123",
    location: "Rio de Janeiro, RJ",
    startedAt: "Há 45 min",
    lastActivity: "Agora",
    current: false,
  },
  {
    id: "3",
    user: "João Santos",
    email: "joao@odontoplus.com",
    clinic: "Odonto Plus",
    device: "desktop",
    browser: "Firefox 121",
    ip: "177.89.34.56",
    location: "Belo Horizonte, MG",
    startedAt: "Há 4 horas",
    lastActivity: "Há 30 min",
    current: false,
  },
  {
    id: "4",
    user: "Ana Paula",
    email: "ana@fisiocenter.com",
    clinic: "Fisio Center",
    device: "tablet",
    browser: "Chrome 120",
    ip: "200.123.45.67",
    location: "Curitiba, PR",
    startedAt: "Há 1 hora",
    lastActivity: "Há 15 min",
    current: false,
  },
];

export function ActiveSessionsModal({ open, onOpenChange }: ActiveSessionsModalProps) {
  const [search, setSearch] = useState("");
  const [deviceFilter, setDeviceFilter] = useState("all");

  const getDeviceIcon = (device: string) => {
    switch (device) {
      case "mobile": return <Smartphone className="h-4 w-4" />;
      case "tablet": return <Monitor className="h-4 w-4" />;
      default: return <Monitor className="h-4 w-4" />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Gestão de Sessões Ativas
          </DialogTitle>
        </DialogHeader>

        <div className="flex items-center gap-4 mb-4">
          <Card className="px-4 py-2 bg-gradient-to-br from-success/10 to-transparent">
            <div className="text-2xl font-bold text-success">247</div>
            <div className="text-xs text-muted-foreground">Sessões Ativas</div>
          </Card>
          <Card className="px-4 py-2 bg-gradient-to-br from-primary/10 to-transparent">
            <div className="text-2xl font-bold">156</div>
            <div className="text-xs text-muted-foreground">Clínicas Online</div>
          </Card>
          <Card className="px-4 py-2 bg-gradient-to-br from-info/10 to-transparent">
            <div className="text-2xl font-bold text-info">68%</div>
            <div className="text-xs text-muted-foreground">Desktop</div>
          </Card>
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por usuário ou clínica..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
          <Select value={deviceFilter} onValueChange={setDeviceFilter}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="desktop">Desktop</SelectItem>
              <SelectItem value="mobile">Mobile</SelectItem>
              <SelectItem value="tablet">Tablet</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="destructive">
            <LogOut className="h-4 w-4 mr-2" /> Encerrar Todas
          </Button>
        </div>

        <ScrollArea className="flex-1">
          <div className="space-y-3 pr-4">
            {mockSessions.map((session) => (
              <Card key={session.id} className={session.current ? "border-primary" : ""}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      {getDeviceIcon(session.device)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{session.user}</span>
                        {session.current && <Badge>Você</Badge>}
                      </div>
                      <div className="text-sm text-muted-foreground">{session.email}</div>
                      <div className="text-xs text-muted-foreground">{session.clinic}</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center gap-1 text-sm">
                        <Globe className="h-3 w-3 text-muted-foreground" />
                        {session.browser}
                      </div>
                      <div className="text-xs text-muted-foreground">{session.ip}</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center gap-1 text-sm">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        {session.location}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm">Iniciada {session.startedAt}</div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground justify-end">
                        <Clock className="h-3 w-3" />
                        Última atividade: {session.lastActivity}
                      </div>
                    </div>
                    {!session.current && (
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" title="Marcar como suspeito">
                          <ShieldAlert className="h-4 w-4 text-warning" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-destructive" title="Encerrar sessão">
                          <LogOut className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>

        <Card className="mt-4 bg-muted/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Configurações de Sessão</div>
                <div className="text-sm text-muted-foreground">
                  Timeout: 30 min • Máximo por usuário: 3 sessões • Verificação de IP: Ativa
                </div>
              </div>
              <Button variant="outline">Configurar</Button>
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}

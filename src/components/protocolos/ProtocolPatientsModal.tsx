import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  Search, 
  User,
  Calendar,
  CheckCircle2,
  Clock,
  AlertTriangle,
  MessageSquare,
  Eye,
  MoreVertical
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

interface ProtocolPatientsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  protocol: {
    id: number;
    name: string;
    patientsEnrolled: number;
  } | null;
}

const mockPatients = [
  { 
    id: 1, 
    name: "Maria Silva", 
    enrolledAt: "01/10/2024", 
    progress: 75, 
    currentStep: "Exame HbA1c",
    nextAction: "Agendar retorno",
    status: "on_track"
  },
  { 
    id: 2, 
    name: "João Oliveira", 
    enrolledAt: "15/09/2024", 
    progress: 50, 
    currentStep: "Consulta de retorno",
    nextAction: "Aguardando confirmação",
    status: "on_track"
  },
  { 
    id: 3, 
    name: "Ana Costa", 
    enrolledAt: "20/08/2024", 
    progress: 90, 
    currentStep: "Exame de fundo de olho",
    nextAction: "Concluir protocolo",
    status: "on_track"
  },
  { 
    id: 4, 
    name: "Pedro Mendes", 
    enrolledAt: "05/11/2024", 
    progress: 25, 
    currentStep: "Exame HbA1c",
    nextAction: "3 dias atrasado",
    status: "delayed"
  },
  { 
    id: 5, 
    name: "Carla Lima", 
    enrolledAt: "10/07/2024", 
    progress: 100, 
    currentStep: "Concluído",
    nextAction: "-",
    status: "completed"
  },
];

const statusConfig = {
  on_track: { label: "No prazo", color: "bg-confirmed/10 text-confirmed border-confirmed/20", icon: CheckCircle2 },
  delayed: { label: "Atrasado", color: "bg-destructive/10 text-destructive border-destructive/20", icon: AlertTriangle },
  completed: { label: "Concluído", color: "bg-info/10 text-info border-info/20", icon: CheckCircle2 }
};

export function ProtocolPatientsModal({ open, onOpenChange, protocol }: ProtocolPatientsModalProps) {
  const [search, setSearch] = useState("");

  if (!protocol) return null;

  const filteredPatients = mockPatients.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh]">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div>
              <DialogTitle>Pacientes no Protocolo</DialogTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {protocol.name} • {protocol.patientsEnrolled} pacientes
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Buscar paciente..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-3">
            {filteredPatients.map((patient) => {
              const StatusIcon = statusConfig[patient.status as keyof typeof statusConfig].icon;
              return (
                <div 
                  key={patient.id}
                  className="p-4 rounded-xl border bg-card hover:border-primary/20 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/5">
                        <User className="h-5 w-5 text-primary" />
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium">{patient.name}</p>
                        <Badge variant="outline" className={statusConfig[patient.status as keyof typeof statusConfig].color}>
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {statusConfig[patient.status as keyof typeof statusConfig].label}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Início: {patient.enrolledAt}
                        </span>
                        <span>•</span>
                        <span>Etapa atual: {patient.currentStep}</span>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1 min-w-[120px]">
                      <div className="flex items-center gap-2 w-full">
                        <Progress value={patient.progress} className="h-2 flex-1" />
                        <span className="text-sm font-medium">{patient.progress}%</span>
                      </div>
                      <span className={`text-xs ${
                        patient.status === "delayed" ? "text-destructive" : "text-muted-foreground"
                      }`}>
                        {patient.nextAction}
                      </span>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="gap-2">
                          <Eye className="h-4 w-4" />
                          Ver Detalhes
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                          <MessageSquare className="h-4 w-4" />
                          Enviar Mensagem
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                          <Calendar className="h-4 w-4" />
                          Agendar Próxima Etapa
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>

        <div className="flex items-center justify-between pt-4 border-t">
          <p className="text-sm text-muted-foreground">
            {filteredPatients.length} pacientes encontrados
          </p>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Fechar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

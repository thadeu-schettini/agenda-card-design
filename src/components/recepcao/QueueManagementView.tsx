import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Clock, User, AlertCircle, CheckCircle2, ArrowUp, ArrowDown, Phone } from "lucide-react";

interface QueueManagementViewProps {
  searchQuery: string;
}

interface QueueItem {
  id: string;
  patientName: string;
  service: string;
  professional: string;
  checkInTime: string;
  waitingMinutes: number;
  priority: "normal" | "urgent" | "high";
  status: "waiting" | "ready" | "in-progress";
}

const mockQueue: QueueItem[] = [
  {
    id: "1",
    patientName: "Maria Silva",
    service: "Consulta Psicológica",
    professional: "Dr. João Santos",
    checkInTime: "14:30",
    waitingMinutes: 5,
    priority: "urgent",
    status: "waiting",
  },
  {
    id: "2",
    patientName: "Carlos Oliveira",
    service: "Fisioterapia",
    professional: "Dra. Ana Costa",
    checkInTime: "14:25",
    waitingMinutes: 10,
    priority: "high",
    status: "ready",
  },
  {
    id: "3",
    patientName: "Juliana Mendes",
    service: "Nutrição",
    professional: "Dra. Paula Lima",
    checkInTime: "14:20",
    waitingMinutes: 15,
    priority: "normal",
    status: "waiting",
  },
  {
    id: "4",
    patientName: "Roberto Santos",
    service: "Consulta Médica",
    professional: "Dr. Pedro Alves",
    checkInTime: "14:35",
    waitingMinutes: 2,
    priority: "normal",
    status: "in-progress",
  },
];

const priorityConfig = {
  urgent: { label: "Urgente", color: "bg-red-500/10 text-red-700 border-red-500/20" },
  high: { label: "Alta", color: "bg-orange-500/10 text-orange-700 border-orange-500/20" },
  normal: { label: "Normal", color: "bg-blue-500/10 text-blue-700 border-blue-500/20" },
};

const statusConfig = {
  waiting: { label: "Aguardando", color: "bg-yellow-500/10 text-yellow-700 border-yellow-500/20", icon: Clock },
  ready: { label: "Pronto", color: "bg-green-500/10 text-green-700 border-green-500/20", icon: CheckCircle2 },
  "in-progress": { label: "Em Atendimento", color: "bg-blue-500/10 text-blue-700 border-blue-500/20", icon: User },
};

export const QueueManagementView = ({ searchQuery }: QueueManagementViewProps) => {
  const [queue, setQueue] = useState(mockQueue);

  const filteredQueue = queue.filter((item) =>
    searchQuery
      ? item.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.professional.toLowerCase().includes(searchQuery.toLowerCase())
      : true
  );

  const moveUp = (index: number) => {
    if (index === 0) return;
    const newQueue = [...queue];
    [newQueue[index - 1], newQueue[index]] = [newQueue[index], newQueue[index - 1]];
    setQueue(newQueue);
  };

  const moveDown = (index: number) => {
    if (index === queue.length - 1) return;
    const newQueue = [...queue];
    [newQueue[index], newQueue[index + 1]] = [newQueue[index + 1], newQueue[index]];
    setQueue(newQueue);
  };

  return (
    <div className="space-y-4">
      {/* Estatísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card className="p-4 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Em Espera</p>
              <p className="text-2xl font-bold text-primary">
                {queue.filter((q) => q.status === "waiting").length}
              </p>
            </div>
            <Clock className="h-8 w-8 text-primary/50" />
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-green-500/5 to-green-500/10 border-green-500/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Prontos</p>
              <p className="text-2xl font-bold text-green-700 dark:text-green-400">
                {queue.filter((q) => q.status === "ready").length}
              </p>
            </div>
            <CheckCircle2 className="h-8 w-8 text-green-500/50" />
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-blue-500/5 to-blue-500/10 border-blue-500/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Em Atendimento</p>
              <p className="text-2xl font-bold text-blue-700 dark:text-blue-400">
                {queue.filter((q) => q.status === "in-progress").length}
              </p>
            </div>
            <User className="h-8 w-8 text-blue-500/50" />
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-orange-500/5 to-orange-500/10 border-orange-500/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Tempo Médio</p>
              <p className="text-2xl font-bold text-orange-700 dark:text-orange-400">
                {Math.round(queue.reduce((acc, q) => acc + q.waitingMinutes, 0) / queue.length)}m
              </p>
            </div>
            <AlertCircle className="h-8 w-8 text-orange-500/50" />
          </div>
        </Card>
      </div>

      {/* Fila de Espera */}
      <div className="space-y-3">
        {filteredQueue.length === 0 ? (
          <Card className="p-8 text-center">
            <User className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
            <p className="text-muted-foreground">Nenhum paciente na fila</p>
          </Card>
        ) : (
          filteredQueue.map((item, index) => {
            const StatusIcon = statusConfig[item.status].icon;
            return (
              <Card
                key={item.id}
                className="p-4 hover:shadow-md transition-all duration-300 border-l-4"
                style={{
                  borderLeftColor:
                    item.priority === "urgent"
                      ? "rgb(239 68 68)"
                      : item.priority === "high"
                      ? "rgb(249 115 22)"
                      : "rgb(59 130 246)",
                }}
              >
                <div className="flex items-start gap-4">
                  {/* Posição na Fila */}
                  <div className="flex flex-col items-center gap-1 pt-1">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-lg font-bold text-primary">{index + 1}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => moveUp(index)}
                        disabled={index === 0}
                      >
                        <ArrowUp className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => moveDown(index)}
                        disabled={index === filteredQueue.length - 1}
                      >
                        <ArrowDown className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  {/* Informações */}
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-semibold text-foreground">{item.patientName}</h3>
                        <p className="text-sm text-muted-foreground">{item.service}</p>
                      </div>
                      <div className="flex gap-2">
                        <Badge className={priorityConfig[item.priority].color}>
                          {priorityConfig[item.priority].label}
                        </Badge>
                        <Badge className={statusConfig[item.status].color}>
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {statusConfig[item.status].label}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {item.professional}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Check-in: {item.checkInTime}
                      </div>
                      <div className="flex items-center gap-1 font-medium text-orange-600 dark:text-orange-400">
                        <AlertCircle className="h-3 w-3" />
                        Aguardando {item.waitingMinutes}min
                      </div>
                    </div>

                    {/* Ações Rápidas */}
                    <div className="flex gap-2 pt-2">
                      <Button size="sm" variant="outline" className="h-8">
                        <Phone className="h-3 w-3 mr-1" />
                        Chamar
                      </Button>
                      <Button size="sm" variant="outline" className="h-8">
                        Atender
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
};

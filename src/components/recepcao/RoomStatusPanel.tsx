import { Badge } from "@/components/ui/badge";
import { DoorOpen, DoorClosed, Sparkles, Clock } from "lucide-react";

type RoomStatus = "available" | "occupied" | "cleaning";

interface Room {
  id: string;
  number: string;
  name: string;
  status: RoomStatus;
  currentPatient?: string;
  professional?: string;
  startTime?: string;
}

const mockRooms: Room[] = [
  {
    id: "1",
    number: "101",
    name: "Consultório 1",
    status: "occupied",
    currentPatient: "Maria Silva",
    professional: "Dr. João Santos",
    startTime: "14:30",
  },
  {
    id: "2",
    number: "102",
    name: "Consultório 2",
    status: "available",
  },
  {
    id: "3",
    number: "103",
    name: "Consultório 3",
    status: "occupied",
    currentPatient: "Carlos Oliveira",
    professional: "Dra. Ana Costa",
    startTime: "14:25",
  },
  {
    id: "4",
    number: "104",
    name: "Consultório 4",
    status: "cleaning",
  },
  {
    id: "5",
    number: "201",
    name: "Sala de Fisioterapia",
    status: "available",
  },
  {
    id: "6",
    number: "202",
    name: "Sala de Nutrição",
    status: "occupied",
    currentPatient: "Juliana Mendes",
    professional: "Dra. Paula Lima",
    startTime: "14:20",
  },
];

const statusConfig = {
  available: {
    label: "Disponível",
    color: "bg-success/10 text-success border-success/20",
    icon: DoorOpen,
    iconColor: "text-success",
  },
  occupied: {
    label: "Ocupado",
    color: "bg-destructive/10 text-destructive border-destructive/20",
    icon: DoorClosed,
    iconColor: "text-destructive",
  },
  cleaning: {
    label: "Limpeza",
    color: "bg-warning/10 text-warning border-warning/20",
    icon: Sparkles,
    iconColor: "text-warning",
  },
};

export const RoomStatusPanel = () => {
  const availableCount = mockRooms.filter((r) => r.status === "available").length;
  const occupiedCount = mockRooms.filter((r) => r.status === "occupied").length;
  const cleaningCount = mockRooms.filter((r) => r.status === "cleaning").length;

  return (
    <div className="space-y-2 pb-2">
      <div className="flex items-center justify-end mb-2">
        <Badge variant="secondary" className="bg-success/10 text-success text-xs">
          {availableCount} livres
        </Badge>
      </div>
        {mockRooms.map((room) => {
          const config = statusConfig[room.status];
          const StatusIcon = config.icon;

          return (
            <div
              key={room.id}
              className={`p-3 rounded-lg border transition-all duration-300 hover:shadow-md ${
                room.status === "available" 
                  ? "bg-success/5 border-success/20 hover:border-success/40" 
                  : room.status === "occupied"
                  ? "bg-destructive/5 border-destructive/20 hover:border-destructive/40"
                  : "bg-warning/5 border-warning/20 hover:border-warning/40"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div
                    className={`h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      room.status === "available"
                        ? "bg-success/10"
                        : room.status === "occupied"
                        ? "bg-destructive/10"
                        : "bg-warning/10"
                    }`}
                  >
                    <StatusIcon className={`h-5 w-5 ${config.iconColor}`} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-sm font-semibold text-foreground">{room.name}</h4>
                      <Badge variant="outline" className="text-xs">
                        {room.number}
                      </Badge>
                    </div>

                    {room.status === "occupied" && room.currentPatient && (
                      <div className="space-y-0.5">
                        <p className="text-xs text-muted-foreground truncate">
                          {room.currentPatient}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {room.professional}
                        </p>
                        {room.startTime && (
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            Desde {room.startTime}
                          </div>
                        )}
                      </div>
                    )}

                    {room.status === "available" && (
                      <p className="text-xs text-muted-foreground">Pronto para atendimento</p>
                    )}

                    {room.status === "cleaning" && (
                      <p className="text-xs text-muted-foreground">Em processo de higienização</p>
                    )}
                  </div>
                </div>

                <Badge className={`${config.color} text-xs flex-shrink-0`}>
                  {config.label}
                </Badge>
              </div>
            </div>
          );
        })}

        <div className="pt-3 border-t border-border/50 flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-success" />
              {availableCount} disponíveis
            </span>
            <span className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-destructive" />
              {occupiedCount} ocupados
            </span>
            <span className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-warning" />
              {cleaningCount} limpeza
            </span>
          </div>
        </div>
    </div>
  );
};

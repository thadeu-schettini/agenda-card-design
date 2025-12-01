import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock } from "lucide-react";

interface Professional {
  name: string;
  nextAvailable: string;
}

interface ProfessionalScheduleTabProps {
  professional: Professional;
}

export const ProfessionalScheduleTab = ({ professional }: ProfessionalScheduleTabProps) => {
  const schedule = [
    { day: "Segunda-feira", hours: "08:00 - 17:00", slots: 18 },
    { day: "Terça-feira", hours: "08:00 - 17:00", slots: 18 },
    { day: "Quarta-feira", hours: "08:00 - 12:00", slots: 8 },
    { day: "Quinta-feira", hours: "08:00 - 17:00", slots: 18 },
    { day: "Sexta-feira", hours: "08:00 - 15:00", slots: 14 }
  ];

  const todayAppointments = [
    { time: "08:00", patient: "João Silva", type: "Consulta" },
    { time: "08:30", patient: "Maria Santos", type: "Retorno" },
    { time: "09:00", patient: "Pedro Costa", type: "Consulta" },
    { time: "10:00", patient: "Ana Oliveira", type: "Consulta" },
    { time: "11:00", patient: "Carlos Mendes", type: "Retorno" },
  ];

  return (
    <div className="space-y-4">
      <Card className="p-4 border-border/50 bg-card/50 backdrop-blur-sm">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Calendar className="h-4 w-4 text-primary" />
          Horários de Trabalho
        </h3>
        <div className="space-y-3">
          {schedule.map((item) => (
            <div key={item.day} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
              <div>
                <p className="font-medium text-sm">{item.day}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{item.hours}</p>
              </div>
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                {item.slots} vagas
              </Badge>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-4 border-border/50 bg-card/50 backdrop-blur-sm">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Clock className="h-4 w-4 text-primary" />
          Agenda de Hoje
        </h3>
        <div className="space-y-2">
          {todayAppointments.map((apt, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary font-semibold text-sm">
                  {apt.time}
                </div>
                <div>
                  <p className="font-medium text-sm">{apt.patient}</p>
                  <p className="text-xs text-muted-foreground">{apt.type}</p>
                </div>
              </div>
              <Badge variant="secondary" className="text-xs">
                Confirmado
              </Badge>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-4 border-border/50 bg-primary/5 border-primary/20">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-primary/10">
            <Clock className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium">Próxima Disponibilidade</p>
            <p className="text-lg font-bold text-primary">{professional.nextAvailable}</p>
          </div>
        </div>
      </Card>
    </div>
  );
};
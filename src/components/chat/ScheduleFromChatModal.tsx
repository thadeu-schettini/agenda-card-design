import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Calendar as CalendarIcon, 
  Clock,
  User,
  Stethoscope,
  Sparkles,
  CheckCircle2
} from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";

interface ScheduleFromChatModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  patientName?: string;
}

const professionals = [
  { id: "1", name: "Dr. Ricardo Carvalho", specialty: "Cardiologia" },
  { id: "2", name: "Dra. Ana Paula", specialty: "Dermatologia" },
  { id: "3", name: "Dr. Marcos Souza", specialty: "Ortopedia" },
  { id: "4", name: "Dra. Marina Santos", specialty: "Pediatria" },
];

const services = [
  { id: "1", name: "Consulta de Rotina", duration: 30 },
  { id: "2", name: "Primeira Consulta", duration: 45 },
  { id: "3", name: "Retorno", duration: 20 },
  { id: "4", name: "Exame", duration: 60 },
];

const timeSlots = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
  "11:00", "11:30", "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00", "17:30"
];

export function ScheduleFromChatModal({ open, onOpenChange, patientName }: ScheduleFromChatModalProps) {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedProfessional, setSelectedProfessional] = useState("");
  const [selectedService, setSelectedService] = useState("");

  const handleSchedule = () => {
    if (!selectedDate || !selectedTime || !selectedProfessional || !selectedService) {
      toast.error("Preencha todos os campos");
      return;
    }
    toast.success("Consulta agendada com sucesso!", {
      description: `${format(selectedDate, "dd/MM/yyyy")} às ${selectedTime}`
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader className="pb-4 border-b">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 shadow-lg">
              <CalendarIcon className="h-5 w-5 text-white" />
            </div>
            <div>
              <DialogTitle>Agendar Consulta</DialogTitle>
              <p className="text-sm text-muted-foreground mt-0.5">
                {patientName ? `Para ${patientName}` : "Selecione data e horário"}
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6 py-4">
          {/* Left: Calendar */}
          <div className="space-y-4">
            <Label>Selecione a Data</Label>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              locale={ptBR}
              className="rounded-xl border"
              disabled={(date) => date < new Date() || date.getDay() === 0}
            />
          </div>

          {/* Right: Options */}
          <div className="space-y-5">
            {/* Professional */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <User className="h-3.5 w-3.5 text-muted-foreground" />
                Profissional
              </Label>
              <Select value={selectedProfessional} onValueChange={setSelectedProfessional}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o profissional" />
                </SelectTrigger>
                <SelectContent>
                  {professionals.map((prof) => (
                    <SelectItem key={prof.id} value={prof.id}>
                      <div className="flex items-center gap-2">
                        <span>{prof.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {prof.specialty}
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Service */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Stethoscope className="h-3.5 w-3.5 text-muted-foreground" />
                Serviço
              </Label>
              <Select value={selectedService} onValueChange={setSelectedService}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o serviço" />
                </SelectTrigger>
                <SelectContent>
                  {services.map((service) => (
                    <SelectItem key={service.id} value={service.id}>
                      <div className="flex items-center gap-2">
                        <span>{service.name}</span>
                        <span className="text-xs text-muted-foreground">
                          ({service.duration} min)
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Time Slots */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                Horário Disponível
              </Label>
              <ScrollArea className="h-[120px]">
                <div className="grid grid-cols-4 gap-2">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={cn(
                        "py-2 px-3 rounded-lg border-2 text-sm font-medium transition-all",
                        selectedTime === time
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </ScrollArea>
            </div>

            {/* Summary */}
            {selectedDate && selectedTime && selectedProfessional && selectedService && (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span className="font-medium text-sm">Resumo do Agendamento</span>
                </div>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>{format(selectedDate, "EEEE, dd 'de' MMMM", { locale: ptBR })}</p>
                  <p>Horário: {selectedTime}</p>
                  <p>{professionals.find(p => p.id === selectedProfessional)?.name}</p>
                  <p>{services.find(s => s.id === selectedService)?.name}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSchedule} className="gap-2">
            <Sparkles className="h-4 w-4" />
            Confirmar Agendamento
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

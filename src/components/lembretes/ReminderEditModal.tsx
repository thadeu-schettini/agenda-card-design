import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { 
  Bell, 
  Save,
  User,
  Pill,
  Clock,
  Calendar
} from "lucide-react";
import { toast } from "sonner";

interface ReminderEditModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reminder: {
    id: number;
    patient: string;
    patientPhone: string;
    medication: string;
    schedule: string;
    frequency: string;
    startDate: string;
    endDate: string;
    status: string;
  } | null;
}

export function ReminderEditModal({ open, onOpenChange, reminder }: ReminderEditModalProps) {
  const [medication, setMedication] = useState(reminder?.medication || "");
  const [schedule, setSchedule] = useState(reminder?.schedule || "");
  const [frequency, setFrequency] = useState(reminder?.frequency || "");
  const [startDate, setStartDate] = useState(reminder?.startDate || "");
  const [endDate, setEndDate] = useState(reminder?.endDate || "");
  const [active, setActive] = useState(reminder?.status === "active");

  if (!reminder) return null;

  const handleSave = () => {
    toast.success("Lembrete atualizado com sucesso!");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
              <Bell className="h-6 w-6 text-primary" />
            </div>
            <div>
              <DialogTitle>Editar Lembrete</DialogTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {reminder.patient}
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          {/* Patient Info */}
          <div className="p-4 rounded-xl bg-muted/30 flex items-center gap-3">
            <User className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="font-medium">{reminder.patient}</p>
              <p className="text-sm text-muted-foreground">{reminder.patientPhone}</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Pill className="h-4 w-4" />
              Medicação
            </Label>
            <Input 
              value={medication}
              onChange={(e) => setMedication(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Horários
              </Label>
              <Input 
                placeholder="Ex: 08:00, 20:00"
                value={schedule}
                onChange={(e) => setSchedule(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Frequência</Label>
              <Select value={frequency} onValueChange={setFrequency}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1x ao dia">1x ao dia</SelectItem>
                  <SelectItem value="2x ao dia">2x ao dia</SelectItem>
                  <SelectItem value="3x ao dia">3x ao dia</SelectItem>
                  <SelectItem value="4x ao dia">4x ao dia</SelectItem>
                  <SelectItem value="A cada 8 horas">A cada 8 horas</SelectItem>
                  <SelectItem value="A cada 12 horas">A cada 12 horas</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Data Início
              </Label>
              <Input 
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Data Fim</Label>
              <Input 
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30">
            <div>
              <Label>Lembrete Ativo</Label>
              <p className="text-xs text-muted-foreground">Enviar notificações automaticamente</p>
            </div>
            <Switch checked={active} onCheckedChange={setActive} />
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button className="gap-1" onClick={handleSave}>
            <Save className="h-4 w-4" />
            Salvar Alterações
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

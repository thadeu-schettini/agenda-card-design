import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import {
  Pill,
  Clock,
  Bell,
  CheckCircle2,
  Plus,
  Trash2,
  Calendar,
  AlertCircle,
  Sparkles,
  Trophy,
  Flame,
  ChevronRight,
  Settings,
  Volume2,
  Vibrate,
  X
} from "lucide-react";
import { toast } from "sonner";

interface MedicationRemindersModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const mockMedications = [
  { 
    id: 1, 
    name: "Losartana 50mg", 
    schedule: ["08:00", "20:00"], 
    frequency: "2x ao dia",
    remaining: 15,
    total: 30,
    takenToday: [true, false],
    streak: 7,
    color: "from-blue-500 to-blue-600"
  },
  { 
    id: 2, 
    name: "Metformina 850mg", 
    schedule: ["12:00"], 
    frequency: "1x ao dia",
    remaining: 22,
    total: 30,
    takenToday: [true],
    streak: 14,
    color: "from-emerald-500 to-emerald-600"
  },
  { 
    id: 3, 
    name: "AAS 100mg", 
    schedule: ["08:00"], 
    frequency: "1x ao dia",
    remaining: 8,
    total: 30,
    takenToday: [false],
    streak: 3,
    color: "from-amber-500 to-amber-600"
  },
];

export function MedicationRemindersModal({ open, onOpenChange }: MedicationRemindersModalProps) {
  const [medications, setMedications] = useState(mockMedications);
  const [showSettings, setShowSettings] = useState(false);
  const [notifySound, setNotifySound] = useState(true);
  const [notifyVibration, setNotifyVibration] = useState(true);
  const [reminderMinutes, setReminderMinutes] = useState("15");
  const [showAddForm, setShowAddForm] = useState(false);

  const totalStreak = Math.max(...medications.map(m => m.streak));
  const todayProgress = medications.reduce((acc, med) => {
    const taken = med.takenToday.filter(Boolean).length;
    return acc + (taken / med.takenToday.length);
  }, 0) / medications.length * 100;

  const handleMarkTaken = (medId: number, scheduleIndex: number) => {
    setMedications(prev => prev.map(med => {
      if (med.id === medId) {
        const newTakenToday = [...med.takenToday];
        newTakenToday[scheduleIndex] = true;
        return { ...med, takenToday: newTakenToday };
      }
      return med;
    }));
    toast.success("Medicação registrada!", {
      description: "Continue assim para manter sua sequência!"
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden bg-card/95 backdrop-blur-xl border-2 border-primary/20 rounded-2xl shadow-2xl p-0">
        {/* Header com animação */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent" />
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          
          <DialogHeader className="relative p-6 pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-primary to-primary/70 shadow-lg shadow-primary/25 animate-[scale-in_0.3s_ease-out]">
                  <Pill className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <DialogTitle className="text-xl font-bold">Lembretes de Medicação</DialogTitle>
                  <p className="text-sm text-muted-foreground">Gerencie suas medicações diárias</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowSettings(!showSettings)}
                  className={cn(
                    "transition-all duration-300",
                    showSettings && "bg-primary/10 text-primary"
                  )}
                >
                  <Settings className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onOpenChange(false)}
                  className="hover:bg-destructive/10 hover:text-destructive"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </DialogHeader>
        </div>

        <ScrollArea className="max-h-[calc(90vh-200px)]">
          <div className="p-6 pt-2 space-y-6">
            {/* Gamification Stats */}
            <div className="grid grid-cols-3 gap-3 animate-[fade-in_0.4s_ease-out]">
              <div className="p-4 rounded-xl bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/20 text-center group hover:scale-105 transition-transform">
                <div className="flex justify-center mb-2">
                  <div className="p-2 rounded-lg bg-amber-500/20 group-hover:animate-bounce">
                    <Flame className="h-5 w-5 text-amber-500" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-amber-500">{totalStreak}</p>
                <p className="text-xs text-muted-foreground">Dias seguidos</p>
              </div>
              <div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 text-center group hover:scale-105 transition-transform">
                <div className="flex justify-center mb-2">
                  <div className="p-2 rounded-lg bg-primary/20 group-hover:animate-pulse">
                    <Trophy className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-primary">{Math.round(todayProgress)}%</p>
                <p className="text-xs text-muted-foreground">Progresso hoje</p>
              </div>
              <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border border-emerald-500/20 text-center group hover:scale-105 transition-transform">
                <div className="flex justify-center mb-2">
                  <div className="p-2 rounded-lg bg-emerald-500/20 group-hover:animate-pulse">
                    <Sparkles className="h-5 w-5 text-emerald-500" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-emerald-500">{medications.length}</p>
                <p className="text-xs text-muted-foreground">Medicações</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2 animate-[fade-in_0.5s_ease-out]">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Progresso de hoje</span>
                <span className="font-medium">{Math.round(todayProgress)}% completo</span>
              </div>
              <div className="relative h-3 rounded-full bg-muted overflow-hidden">
                <div 
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary via-primary to-primary/70 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${todayProgress}%` }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_infinite]" />
              </div>
            </div>

            {/* Settings Panel */}
            {showSettings && (
              <div className="p-4 rounded-xl bg-muted/30 border space-y-4 animate-[scale-in_0.2s_ease-out]">
                <h4 className="font-semibold flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Configurações de Notificação
                </h4>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-background/50">
                    <div className="flex items-center gap-2">
                      <Volume2 className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Som</span>
                    </div>
                    <Switch checked={notifySound} onCheckedChange={setNotifySound} />
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-background/50">
                    <div className="flex items-center gap-2">
                      <Vibrate className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Vibração</span>
                    </div>
                    <Switch checked={notifyVibration} onCheckedChange={setNotifyVibration} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">Lembrar antes (minutos)</Label>
                  <Input 
                    type="number" 
                    value={reminderMinutes} 
                    onChange={(e) => setReminderMinutes(e.target.value)}
                    className="w-full"
                  />
                </div>
              </div>
            )}

            {/* Medications List */}
            <div className="space-y-3">
              {medications.map((med, index) => (
                <div
                  key={med.id}
                  className="p-4 rounded-xl bg-muted/30 border hover:border-primary/30 hover:bg-muted/50 transition-all duration-300 group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "p-2.5 rounded-xl bg-gradient-to-br shadow-lg transition-transform group-hover:scale-110",
                        med.color
                      )}>
                        <Pill className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{med.name}</h4>
                        <div className="flex items-center gap-2 mt-0.5">
                          <Badge variant="outline" className="text-xs">
                            {med.frequency}
                          </Badge>
                          {med.streak >= 7 && (
                            <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20 text-xs gap-1">
                              <Flame className="h-3 w-3" />
                              {med.streak} dias
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive hover:bg-destructive/10">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Schedule Times */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {med.schedule.map((time, idx) => (
                      <button
                        key={idx}
                        onClick={() => !med.takenToday[idx] && handleMarkTaken(med.id, idx)}
                        disabled={med.takenToday[idx]}
                        className={cn(
                          "flex items-center gap-2 px-3 py-2 rounded-lg border transition-all duration-300",
                          med.takenToday[idx]
                            ? "bg-status-confirmed/10 border-status-confirmed/30 text-status-confirmed"
                            : "bg-background hover:bg-primary/10 hover:border-primary/30 cursor-pointer active:scale-95"
                        )}
                      >
                        {med.takenToday[idx] ? (
                          <CheckCircle2 className="h-4 w-4" />
                        ) : (
                          <Clock className="h-4 w-4 text-muted-foreground" />
                        )}
                        <span className="font-medium text-sm">{time}</span>
                        {!med.takenToday[idx] && (
                          <span className="text-xs text-muted-foreground">Tomar</span>
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Remaining Pills */}
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>Restam {med.remaining} de {med.total}</span>
                    </div>
                    {med.remaining <= 10 && (
                      <Badge className="bg-warning/10 text-warning border-warning/20 gap-1 animate-pulse">
                        <AlertCircle className="h-3 w-3" />
                        Reabastecer em breve
                      </Badge>
                    )}
                  </div>

                  {/* Progress */}
                  <div className="mt-2">
                    <Progress 
                      value={(med.remaining / med.total) * 100} 
                      className="h-1.5"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Add Medication */}
            {showAddForm ? (
              <div className="p-4 rounded-xl border-2 border-dashed border-primary/30 bg-primary/5 space-y-4 animate-[scale-in_0.2s_ease-out]">
                <h4 className="font-semibold">Nova Medicação</h4>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Nome do medicamento</Label>
                    <Input placeholder="Ex: Losartana 50mg" />
                  </div>
                  <div className="space-y-2">
                    <Label>Frequência</Label>
                    <Input placeholder="Ex: 2x ao dia" />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setShowAddForm(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={() => {
                    toast.success("Medicação adicionada!");
                    setShowAddForm(false);
                  }}>
                    Adicionar
                  </Button>
                </div>
              </div>
            ) : (
              <Button
                variant="outline"
                className="w-full border-dashed gap-2 hover:border-primary hover:bg-primary/5 transition-all"
                onClick={() => setShowAddForm(true)}
              >
                <Plus className="h-4 w-4" />
                Adicionar Medicação
              </Button>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

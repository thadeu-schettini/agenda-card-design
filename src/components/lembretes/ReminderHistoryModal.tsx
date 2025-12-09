import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Clock, 
  CheckCircle2,
  XCircle,
  Bell,
  Smartphone,
  Calendar
} from "lucide-react";

interface ReminderHistoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reminder: {
    id: number;
    patient: string;
    medication: string;
  } | null;
}

const mockHistory = [
  { id: 1, date: "Hoje", time: "08:00", status: "taken", respondedAt: "08:05" },
  { id: 2, date: "Ontem", time: "20:00", status: "taken", respondedAt: "20:10" },
  { id: 3, date: "Ontem", time: "08:00", status: "taken", respondedAt: "08:02" },
  { id: 4, date: "07/01/2025", time: "20:00", status: "missed", respondedAt: null },
  { id: 5, date: "07/01/2025", time: "08:00", status: "taken", respondedAt: "08:15" },
  { id: 6, date: "06/01/2025", time: "20:00", status: "taken", respondedAt: "20:00" },
  { id: 7, date: "06/01/2025", time: "08:00", status: "taken", respondedAt: "08:08" },
  { id: 8, date: "05/01/2025", time: "20:00", status: "taken", respondedAt: "20:05" },
  { id: 9, date: "05/01/2025", time: "08:00", status: "missed", respondedAt: null },
  { id: 10, date: "04/01/2025", time: "20:00", status: "taken", respondedAt: "20:12" },
];

export function ReminderHistoryModal({ open, onOpenChange, reminder }: ReminderHistoryModalProps) {
  if (!reminder) return null;

  const takenCount = mockHistory.filter(h => h.status === "taken").length;
  const missedCount = mockHistory.filter(h => h.status === "missed").length;
  const adherenceRate = Math.round((takenCount / mockHistory.length) * 100);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh]">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <div>
              <DialogTitle>Histórico de Adesão</DialogTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {reminder.patient} • {reminder.medication}
              </p>
            </div>
          </div>
        </DialogHeader>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="p-3 rounded-xl bg-confirmed/10 text-center">
            <CheckCircle2 className="h-5 w-5 text-confirmed mx-auto mb-1" />
            <p className="text-xl font-bold text-confirmed">{takenCount}</p>
            <p className="text-xs text-muted-foreground">Confirmados</p>
          </div>
          <div className="p-3 rounded-xl bg-destructive/10 text-center">
            <XCircle className="h-5 w-5 text-destructive mx-auto mb-1" />
            <p className="text-xl font-bold text-destructive">{missedCount}</p>
            <p className="text-xs text-muted-foreground">Perdidos</p>
          </div>
          <div className="p-3 rounded-xl bg-primary/10 text-center">
            <Bell className="h-5 w-5 text-primary mx-auto mb-1" />
            <p className="text-xl font-bold text-primary">{adherenceRate}%</p>
            <p className="text-xs text-muted-foreground">Adesão</p>
          </div>
        </div>

        <ScrollArea className="h-[350px] pr-4">
          <div className="space-y-2">
            {mockHistory.map((item) => (
              <div 
                key={item.id}
                className={`flex items-center justify-between p-3 rounded-lg ${
                  item.status === "taken" ? "bg-muted/30" : "bg-destructive/5 border border-destructive/20"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                    item.status === "taken" ? "bg-confirmed/10" : "bg-destructive/10"
                  }`}>
                    {item.status === "taken" 
                      ? <CheckCircle2 className="h-4 w-4 text-confirmed" />
                      : <XCircle className="h-4 w-4 text-destructive" />
                    }
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm">{item.date}</span>
                      <span className="text-muted-foreground">•</span>
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm">{item.time}</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  {item.status === "taken" ? (
                    <div className="flex items-center gap-1 text-sm text-confirmed">
                      <Smartphone className="h-3 w-3" />
                      <span>Confirmado às {item.respondedAt}</span>
                    </div>
                  ) : (
                    <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">
                      Não confirmado
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="flex items-center justify-end pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Fechar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

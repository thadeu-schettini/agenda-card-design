import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  History, 
  Download, 
  Eye, 
  Calendar,
  Pill,
  CheckCircle2,
  Clock,
  Send,
  AlertCircle
} from "lucide-react";
import { toast } from "sonner";

interface PrescriptionHistoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  patient: string;
}

const mockHistory = [
  { id: 1, date: "10/01/2025", medications: 2, status: "dispensed", type: "comum" },
  { id: 2, date: "05/01/2025", medications: 1, status: "sent", type: "antimicrobiano" },
  { id: 3, date: "20/12/2024", medications: 3, status: "dispensed", type: "comum" },
  { id: 4, date: "15/12/2024", medications: 1, status: "expired", type: "controlado" },
  { id: 5, date: "10/11/2024", medications: 2, status: "dispensed", type: "comum" },
];

const statusConfig = {
  sent: { label: "Enviada", color: "bg-info/10 text-info border-info/20", icon: Send },
  pending: { label: "Pendente", color: "bg-pending/10 text-pending border-pending/20", icon: Clock },
  dispensed: { label: "Dispensada", color: "bg-confirmed/10 text-confirmed border-confirmed/20", icon: CheckCircle2 },
  expired: { label: "Expirada", color: "bg-destructive/10 text-destructive border-destructive/20", icon: AlertCircle }
};

const typeConfig = {
  comum: { label: "Comum", color: "bg-muted text-muted-foreground" },
  antimicrobiano: { label: "Antimicrobiano", color: "bg-info/10 text-info" },
  controlado: { label: "Controlado", color: "bg-destructive/10 text-destructive" }
};

export function PrescriptionHistoryModal({ open, onOpenChange, patient }: PrescriptionHistoryModalProps) {
  const handleView = (prescription: typeof mockHistory[0]) => {
    toast.info(`Visualizando receita de ${prescription.date}`);
  };

  const handleDownload = (prescription: typeof mockHistory[0]) => {
    toast.success(`Receita de ${prescription.date} baixada!`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh]">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-info/20 to-info/5 flex items-center justify-center">
              <History className="h-6 w-6 text-info" />
            </div>
            <div>
              <DialogTitle>Histórico de Receitas</DialogTitle>
              <p className="text-sm text-muted-foreground mt-1">{patient}</p>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-3">
            {mockHistory.map((prescription) => {
              const StatusIcon = statusConfig[prescription.status as keyof typeof statusConfig].icon;
              return (
                <div 
                  key={prescription.id}
                  className="p-4 rounded-xl border bg-card hover:border-primary/20 transition-colors"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-muted/50 flex items-center justify-center">
                        <Pill className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{prescription.medications} medicamento(s)</p>
                          <Badge variant="outline" className={typeConfig[prescription.type as keyof typeof typeConfig].color}>
                            {typeConfig[prescription.type as keyof typeof typeConfig].label}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {prescription.date}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className={statusConfig[prescription.status as keyof typeof statusConfig].color}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {statusConfig[prescription.status as keyof typeof statusConfig].label}
                      </Badge>

                      <div className="flex gap-1">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => handleView(prescription)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => handleDownload(prescription)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Fechar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

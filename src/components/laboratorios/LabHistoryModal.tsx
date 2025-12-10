import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  History, 
  Download, 
  Eye, 
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText
} from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { LabResultModal } from "./LabResultModal";

interface LabHistoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  patient: string;
}

const mockHistory = [
  { id: 1, exam: "Hemograma Completo", date: "10/01/2025", lab: "Lab São Lucas", status: "ready", hasAlerts: true, alertDescription: "Hemoglobina abaixo do normal", requestDate: "08/01/2025", resultDate: "10/01/2025", professional: "Dr. Carlos Santos" },
  { id: 2, exam: "Glicemia de Jejum", date: "05/01/2025", lab: "Lab Central", status: "ready", hasAlerts: false, requestDate: "03/01/2025", resultDate: "05/01/2025", professional: "Dra. Ana Lima" },
  { id: 3, exam: "TSH e T4 Livre", date: "20/12/2024", lab: "Lab São Lucas", status: "ready", hasAlerts: false, requestDate: "18/12/2024", resultDate: "20/12/2024", professional: "Dr. Carlos Santos" },
  { id: 4, exam: "Colesterol Total", date: "15/12/2024", lab: "Lab Diagnósticos", status: "ready", hasAlerts: true, alertDescription: "LDL acima do recomendado", requestDate: "13/12/2024", resultDate: "15/12/2024", professional: "Dra. Beatriz Rocha" },
  { id: 5, exam: "Hemograma Completo", date: "10/11/2024", lab: "Lab São Lucas", status: "ready", hasAlerts: false, requestDate: "08/11/2024", resultDate: "10/11/2024", professional: "Dr. Carlos Santos" },
];

export function LabHistoryModal({ open, onOpenChange, patient }: LabHistoryModalProps) {
  const [showResultModal, setShowResultModal] = useState(false);
  const [selectedResult, setSelectedResult] = useState<any>(null);

  const handleView = (exam: typeof mockHistory[0]) => {
    setSelectedResult({ ...exam, patient });
    setShowResultModal(true);
  };

  const handleDownload = (exam: typeof mockHistory[0]) => {
    toast.success(`${exam.exam} baixado!`);
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
              <DialogTitle>Histórico de Exames</DialogTitle>
              <p className="text-sm text-muted-foreground mt-1">{patient}</p>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-3">
            {mockHistory.map((exam) => (
              <div 
                key={exam.id}
                className="p-4 rounded-xl border bg-card hover:border-primary/20 transition-colors"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-muted/50 flex items-center justify-center">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{exam.exam}</p>
                        {exam.hasAlerts && (
                          <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20 text-xs">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            Alerta
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{exam.lab}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {exam.date}
                      </div>
                    </div>

                    <div className="flex gap-1">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => handleView(exam)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => handleDownload(exam)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Fechar
          </Button>
        </div>
      </DialogContent>

      <LabResultModal
        open={showResultModal}
        onOpenChange={setShowResultModal}
        result={selectedResult}
      />
    </Dialog>
  );
}

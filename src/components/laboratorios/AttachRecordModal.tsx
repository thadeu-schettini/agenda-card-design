import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  FileText, 
  CheckCircle2, 
  Calendar,
  User
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface AttachRecordModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  result: {
    id: number;
    patient: string;
    exam: string;
  } | null;
}

const mockRecords = [
  { id: 1, date: "10/01/2025", type: "Consulta", professional: "Dr. Carlos Santos" },
  { id: 2, date: "05/01/2025", type: "Retorno", professional: "Dr. Carlos Santos" },
  { id: 3, date: "20/12/2024", type: "Consulta", professional: "Dra. Ana Lima" },
  { id: 4, date: "15/12/2024", type: "Exame", professional: "Dr. Carlos Santos" },
];

export function AttachRecordModal({ open, onOpenChange, result }: AttachRecordModalProps) {
  const [selectedRecord, setSelectedRecord] = useState<number | null>(null);

  if (!result) return null;

  const handleAttach = () => {
    if (!selectedRecord) {
      toast.error("Selecione um prontuário");
      return;
    }
    toast.success(`Exame anexado ao prontuário com sucesso!`);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh]">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <div>
              <DialogTitle>Anexar ao Prontuário</DialogTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {result.exam} - {result.patient}
              </p>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground mb-4">
              Selecione o prontuário para anexar o resultado:
            </p>
            {mockRecords.map((record) => (
              <div 
                key={record.id}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  selectedRecord === record.id 
                    ? "border-primary bg-primary/5" 
                    : "hover:border-primary/30"
                }`}
                onClick={() => setSelectedRecord(record.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-muted/50 flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium">{record.type}</p>
                      <p className="text-sm text-muted-foreground">{record.professional}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">{record.date}</span>
                    {selectedRecord === record.id && (
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleAttach} disabled={!selectedRecord}>
            Anexar Exame
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

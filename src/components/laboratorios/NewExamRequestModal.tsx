import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { 
  FlaskConical, 
  Plus, 
  X, 
  Send 
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface NewExamRequestModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  patient?: string;
}

const availableExams = [
  "Hemograma Completo",
  "Glicemia de Jejum",
  "TSH e T4 Livre",
  "Colesterol Total e Frações",
  "Triglicerídeos",
  "Creatinina",
  "Ureia",
  "TGO e TGP",
  "Ácido Úrico",
  "Vitamina D",
];

export function NewExamRequestModal({ open, onOpenChange, patient }: NewExamRequestModalProps) {
  const [selectedPatient, setSelectedPatient] = useState(patient || "");
  const [selectedLab, setSelectedLab] = useState("");
  const [selectedExams, setSelectedExams] = useState<string[]>([]);
  const [notes, setNotes] = useState("");

  const handleAddExam = (exam: string) => {
    if (!selectedExams.includes(exam)) {
      setSelectedExams([...selectedExams, exam]);
    }
  };

  const handleRemoveExam = (exam: string) => {
    setSelectedExams(selectedExams.filter(e => e !== exam));
  };

  const handleSubmit = () => {
    if (!selectedPatient) {
      toast.error("Selecione um paciente");
      return;
    }
    if (selectedExams.length === 0) {
      toast.error("Adicione pelo menos um exame");
      return;
    }
    toast.success("Solicitação de exame enviada!");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh]">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-info/20 to-info/5 flex items-center justify-center">
              <FlaskConical className="h-6 w-6 text-info" />
            </div>
            <div>
              <DialogTitle>Nova Solicitação de Exame</DialogTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Solicite exames laboratoriais
              </p>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="h-[50vh] pr-4">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Paciente</Label>
              <Input 
                value={selectedPatient}
                onChange={(e) => setSelectedPatient(e.target.value)}
                placeholder="Nome do paciente"
              />
            </div>

            <div className="space-y-2">
              <Label>Laboratório</Label>
              <Select value={selectedLab} onValueChange={setSelectedLab}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o laboratório" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lab1">Laboratório São Lucas</SelectItem>
                  <SelectItem value="lab2">Lab Diagnósticos</SelectItem>
                  <SelectItem value="lab3">Lab Central</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Exames Selecionados</Label>
              {selectedExams.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-2">
                  {selectedExams.map((exam) => (
                    <Badge key={exam} variant="secondary" className="gap-1">
                      {exam}
                      <X 
                        className="h-3 w-3 cursor-pointer hover:text-destructive" 
                        onClick={() => handleRemoveExam(exam)}
                      />
                    </Badge>
                  ))}
                </div>
              )}
              <div className="grid grid-cols-2 gap-2 max-h-[200px] overflow-y-auto p-2 rounded-lg border bg-muted/30">
                {availableExams.map((exam) => (
                  <Button
                    key={exam}
                    variant={selectedExams.includes(exam) ? "secondary" : "ghost"}
                    size="sm"
                    className="justify-start text-xs h-auto py-2"
                    onClick={() => handleAddExam(exam)}
                    disabled={selectedExams.includes(exam)}
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    {exam}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Observações Clínicas</Label>
              <Textarea 
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Informações relevantes para o laboratório..."
                className="min-h-[100px]"
              />
            </div>
          </div>
        </ScrollArea>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} className="gap-2">
            <Send className="h-4 w-4" />
            Enviar Solicitação
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

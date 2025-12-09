import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { 
  FileText, 
  Plus, 
  GripVertical, 
  Trash2, 
  Save,
  X,
  Settings2
} from "lucide-react";
import { toast } from "sonner";

interface TemplateEditorModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  template?: {
    id: number;
    name: string;
    questions: number;
    uses: number;
    category: string;
  } | null;
  mode: "create" | "edit" | "duplicate";
}

const fieldTypes = [
  { value: "yes_no", label: "Sim/Não" },
  { value: "scale", label: "Escala (0-10)" },
  { value: "text", label: "Texto Livre" },
  { value: "multiple", label: "Múltipla Escolha" },
  { value: "date", label: "Data" },
];

const mockQuestions = [
  { id: 1, text: "Você está sentindo alguma dor ou desconforto?", type: "yes_no", required: true },
  { id: 2, text: "Qual o seu nível de dor de 0 a 10?", type: "scale", required: true },
  { id: 3, text: "Está tomando alguma medicação atualmente?", type: "yes_no", required: true },
  { id: 4, text: "Liste as medicações em uso:", type: "text", required: false },
  { id: 5, text: "Possui alguma alergia conhecida?", type: "yes_no", required: true },
];

export function TemplateEditorModal({ open, onOpenChange, template, mode }: TemplateEditorModalProps) {
  const [name, setName] = useState(template?.name || "");
  const [category, setCategory] = useState(template?.category || "");
  const [questions, setQuestions] = useState(mockQuestions);

  const handleAddQuestion = () => {
    const newQuestion = {
      id: Date.now(),
      text: "",
      type: "yes_no",
      required: true
    };
    setQuestions([...questions, newQuestion]);
  };

  const handleRemoveQuestion = (id: number) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const handleSave = () => {
    toast.success(mode === "create" ? "Template criado com sucesso!" : "Template salvo com sucesso!");
    onOpenChange(false);
  };

  const getTitle = () => {
    switch (mode) {
      case "create": return "Novo Template";
      case "edit": return "Editar Template";
      case "duplicate": return "Duplicar Template";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <div>
              <DialogTitle>{getTitle()}</DialogTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Configure as perguntas do questionário de triagem
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-3 gap-6">
          {/* Left: Settings */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Nome do Template</Label>
              <Input 
                placeholder="Ex: Triagem Cardiologia"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Categoria</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="geral">Geral</SelectItem>
                  <SelectItem value="cardiologia">Cardiologia</SelectItem>
                  <SelectItem value="pediatria">Pediatria</SelectItem>
                  <SelectItem value="ortopedia">Ortopedia</SelectItem>
                  <SelectItem value="dermatologia">Dermatologia</SelectItem>
                  <SelectItem value="preventivo">Preventivo</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="p-4 rounded-xl bg-muted/30 space-y-3">
              <h4 className="font-medium text-sm flex items-center gap-2">
                <Settings2 className="h-4 w-4" />
                Configurações
              </h4>
              <div className="flex items-center justify-between">
                <Label className="text-sm">Envio automático</Label>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-sm">Lembrete 24h antes</Label>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-sm">Permitir edição</Label>
                <Switch />
              </div>
            </div>
          </div>

          {/* Right: Questions */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Perguntas ({questions.length})</h4>
              <Button variant="outline" size="sm" className="gap-1" onClick={handleAddQuestion}>
                <Plus className="h-4 w-4" />
                Adicionar
              </Button>
            </div>

            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-3">
                {questions.map((question, index) => (
                  <div 
                    key={question.id}
                    className="p-4 rounded-xl border bg-card hover:border-primary/20 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex items-center gap-2 pt-2">
                        <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                        <span className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">
                          {index + 1}
                        </span>
                      </div>
                      
                      <div className="flex-1 space-y-3">
                        <Textarea 
                          placeholder="Digite a pergunta..."
                          value={question.text}
                          onChange={(e) => {
                            const updated = questions.map(q => 
                              q.id === question.id ? { ...q, text: e.target.value } : q
                            );
                            setQuestions(updated);
                          }}
                          className="min-h-[60px] resize-none"
                        />
                        
                        <div className="flex items-center gap-3">
                          <Select 
                            value={question.type}
                            onValueChange={(value) => {
                              const updated = questions.map(q => 
                                q.id === question.id ? { ...q, type: value } : q
                              );
                              setQuestions(updated);
                            }}
                          >
                            <SelectTrigger className="w-[160px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {fieldTypes.map(type => (
                                <SelectItem key={type.value} value={type.value}>
                                  {type.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>

                          <div className="flex items-center gap-2">
                            <Switch 
                              id={`required-${question.id}`}
                              checked={question.required}
                              onCheckedChange={(checked) => {
                                const updated = questions.map(q => 
                                  q.id === question.id ? { ...q, required: checked } : q
                                );
                                setQuestions(updated);
                              }}
                            />
                            <Label htmlFor={`required-${question.id}`} className="text-sm">
                              Obrigatória
                            </Label>
                          </div>
                        </div>
                      </div>

                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={() => handleRemoveQuestion(question.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button className="gap-2" onClick={handleSave}>
            <Save className="h-4 w-4" />
            {mode === "create" ? "Criar Template" : "Salvar Alterações"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

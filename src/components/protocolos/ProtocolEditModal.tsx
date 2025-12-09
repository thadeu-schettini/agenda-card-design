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
  GitBranch, 
  Plus, 
  GripVertical, 
  Trash2, 
  Save,
  ArrowRight,
  Clock,
  Zap
} from "lucide-react";
import { toast } from "sonner";

interface ProtocolEditModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  protocol?: {
    id: number;
    name: string;
    description: string;
    trigger: string;
    active: boolean;
    category: string;
    steps: { name: string; timing: string }[];
  } | null;
}

export function ProtocolEditModal({ open, onOpenChange, protocol }: ProtocolEditModalProps) {
  const [name, setName] = useState(protocol?.name || "");
  const [description, setDescription] = useState(protocol?.description || "");
  const [trigger, setTrigger] = useState(protocol?.trigger || "");
  const [category, setCategory] = useState(protocol?.category || "");
  const [steps, setSteps] = useState(protocol?.steps || [
    { name: "", timing: "" }
  ]);

  const handleAddStep = () => {
    setSteps([...steps, { name: "", timing: "" }]);
  };

  const handleRemoveStep = (index: number) => {
    setSteps(steps.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    toast.success(protocol ? "Protocolo atualizado!" : "Protocolo criado!");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh]">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
              <GitBranch className="h-6 w-6 text-primary" />
            </div>
            <div>
              <DialogTitle>{protocol ? "Editar Protocolo" : "Novo Protocolo"}</DialogTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Configure o fluxo automatizado de acompanhamento
              </p>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Nome do Protocolo</Label>
                <Input 
                  placeholder="Ex: Acompanhamento Diabetes"
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
                    <SelectItem value="cardiologia">Cardiologia</SelectItem>
                    <SelectItem value="endocrinologia">Endocrinologia</SelectItem>
                    <SelectItem value="ortopedia">Ortopedia</SelectItem>
                    <SelectItem value="obstetricia">Obstetrícia</SelectItem>
                    <SelectItem value="pediatria">Pediatria</SelectItem>
                    <SelectItem value="geral">Geral</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Descrição</Label>
              <Textarea 
                placeholder="Descreva o objetivo do protocolo..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-primary" />
                Gatilho de Ativação
              </Label>
              <Input 
                placeholder="Ex: Diagnóstico CID E11"
                value={trigger}
                onChange={(e) => setTrigger(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                O protocolo será ativado automaticamente quando esta condição for identificada
              </p>
            </div>

            {/* Steps */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  Etapas do Protocolo
                </Label>
                <Button variant="outline" size="sm" className="gap-1" onClick={handleAddStep}>
                  <Plus className="h-4 w-4" />
                  Adicionar Etapa
                </Button>
              </div>

              <div className="space-y-3">
                {steps.map((step, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                      <span className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">
                        {index + 1}
                      </span>
                    </div>
                    
                    <Input 
                      placeholder="Nome da etapa (ex: Exame HbA1c)"
                      value={step.name}
                      onChange={(e) => {
                        const updated = [...steps];
                        updated[index] = { ...step, name: e.target.value };
                        setSteps(updated);
                      }}
                      className="flex-1"
                    />

                    <Input 
                      placeholder="Timing (ex: A cada 3 meses)"
                      value={step.timing}
                      onChange={(e) => {
                        const updated = [...steps];
                        updated[index] = { ...step, timing: e.target.value };
                        setSteps(updated);
                      }}
                      className="w-[200px]"
                    />

                    {index < steps.length - 1 && (
                      <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />
                    )}

                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-destructive hover:text-destructive shrink-0"
                      onClick={() => handleRemoveStep(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>

        <div className="flex items-center justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button className="gap-2" onClick={handleSave}>
            <Save className="h-4 w-4" />
            Salvar Protocolo
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { 
  MessageCircle, 
  Save, 
  Smartphone
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface TemplateEditorModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "create" | "edit" | "view";
  template?: {
    id: number;
    name: string;
    category: string;
    message: string;
    status: string;
  } | null;
}

export function TemplateEditorModal({ open, onOpenChange, mode, template }: TemplateEditorModalProps) {
  const [name, setName] = useState(template?.name || "");
  const [category, setCategory] = useState(template?.category || "appointment");
  const [message, setMessage] = useState(template?.message || "");

  const isViewMode = mode === "view";

  const handleSave = () => {
    if (!name.trim()) {
      toast.error("Nome do template é obrigatório");
      return;
    }
    if (!message.trim()) {
      toast.error("Mensagem é obrigatória");
      return;
    }
    toast.success(mode === "create" ? "Template criado!" : "Template atualizado!");
    onOpenChange(false);
  };

  const variables = ["{{nome}}", "{{profissional}}", "{{data}}", "{{hora}}", "{{clinica}}", "{{servico}}"];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh]">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-green-500/20 to-green-500/5 flex items-center justify-center">
              <MessageCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <DialogTitle>
                {mode === "create" ? "Novo Template" : mode === "edit" ? "Editar Template" : "Visualizar Template"}
              </DialogTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {mode === "view" ? template?.name : "Configure a mensagem do template"}
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form */}
          <ScrollArea className="h-[50vh] pr-4">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Nome do Template</Label>
                <Input 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: Confirmação de Consulta"
                  disabled={isViewMode}
                />
              </div>

              <div className="space-y-2">
                <Label>Categoria</Label>
                <Select value={category} onValueChange={setCategory} disabled={isViewMode}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="appointment">Agendamento</SelectItem>
                    <SelectItem value="reminder">Lembrete</SelectItem>
                    <SelectItem value="followup">Pós-Consulta</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Mensagem</Label>
                <Textarea 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Digite a mensagem do template..."
                  className="min-h-[150px]"
                  disabled={isViewMode}
                />
              </div>

              {!isViewMode && (
                <div className="space-y-2">
                  <Label>Variáveis Disponíveis</Label>
                  <div className="flex flex-wrap gap-2">
                    {variables.map((v) => (
                      <Badge 
                        key={v} 
                        variant="secondary" 
                        className="cursor-pointer hover:bg-primary/10"
                        onClick={() => setMessage(message + " " + v)}
                      >
                        {v}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Preview */}
          <div className="space-y-3">
            <Label>Preview</Label>
            <div className="p-4 rounded-xl bg-muted/30 border min-h-[300px]">
              <div className="flex items-center gap-2 mb-4">
                <Smartphone className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm font-medium">WhatsApp Preview</span>
              </div>
              <div className="bg-[#DCF8C6] dark:bg-green-900/30 p-3 rounded-lg rounded-tl-none max-w-[90%] text-sm">
                {message || "Digite a mensagem para ver o preview..."}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {isViewMode ? "Fechar" : "Cancelar"}
          </Button>
          {!isViewMode && (
            <Button onClick={handleSave} className="gap-2">
              <Save className="h-4 w-4" />
              {mode === "create" ? "Criar Template" : "Salvar"}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

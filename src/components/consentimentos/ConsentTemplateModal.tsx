import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  FileText, 
  Save, 
  Plus, 
  X, 
  Eye 
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface ConsentTemplateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "create" | "edit" | "view";
  template?: {
    id: number;
    name: string;
    procedures: number;
    lastUsed: string;
  } | null;
}

export function ConsentTemplateModal({ open, onOpenChange, mode, template }: ConsentTemplateModalProps) {
  const [name, setName] = useState(template?.name || "");
  const [content, setContent] = useState(`TERMO DE CONSENTIMENTO LIVRE E ESCLARECIDO

Eu, {{paciente}}, CPF {{cpf}}, declaro que fui devidamente informado(a) e esclarecido(a) pelo(a) profissional {{profissional}}, CRM {{crm}}, sobre o procedimento a ser realizado:

PROCEDIMENTO: {{procedimento}}

1. DESCRIÇÃO DO PROCEDIMENTO
[Descrever o procedimento]

2. RISCOS E BENEFÍCIOS
[Listar riscos e benefícios]

3. ALTERNATIVAS
[Listar alternativas]

4. DECLARAÇÃO DO PACIENTE
Declaro que li e compreendi todas as informações acima descritas.

Data: {{data}}

_______________________________
Assinatura do Paciente

_______________________________
Assinatura do Responsável Legal (se aplicável)`);

  const isViewMode = mode === "view";

  const handleSave = () => {
    if (!name.trim()) {
      toast.error("Nome do template é obrigatório");
      return;
    }
    toast.success(mode === "create" ? "Template criado com sucesso!" : "Template atualizado!");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh]">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <div>
              <DialogTitle>
                {mode === "create" ? "Novo Template" : mode === "edit" ? "Editar Template" : "Visualizar Template"}
              </DialogTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {mode === "create" 
                  ? "Crie um novo modelo de consentimento"
                  : template?.name
                }
              </p>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Nome do Template</Label>
              <Input 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Consentimento Cirúrgico Geral"
                disabled={isViewMode}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Conteúdo do Termo</Label>
                <p className="text-xs text-muted-foreground">
                  Use {`{{variavel}}`} para campos dinâmicos
                </p>
              </div>
              <Textarea 
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[400px] font-mono text-sm"
                placeholder="Digite o conteúdo do termo de consentimento..."
                disabled={isViewMode}
              />
            </div>

            <div className="p-4 rounded-xl bg-muted/30 border">
              <p className="text-sm font-medium mb-2">Variáveis Disponíveis:</p>
              <div className="flex flex-wrap gap-2">
                {["{{paciente}}", "{{cpf}}", "{{profissional}}", "{{crm}}", "{{procedimento}}", "{{data}}", "{{hora}}", "{{clinica}}"].map((v) => (
                  <span key={v} className="px-2 py-1 rounded-md bg-primary/10 text-primary text-xs font-mono">
                    {v}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {isViewMode ? "Fechar" : "Cancelar"}
          </Button>
          {!isViewMode && (
            <Button onClick={handleSave} className="gap-2">
              <Save className="h-4 w-4" />
              {mode === "create" ? "Criar Template" : "Salvar Alterações"}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

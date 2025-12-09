import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  FileText,
  Edit2,
  Save,
  Plus,
  Eye,
  MessageSquare,
  Mail,
  Bell,
  Smartphone,
  Sparkles,
  CheckCircle2,
  Copy,
} from "lucide-react";
import { toast } from "sonner";

interface TemplateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "view" | "edit" | "create";
  template?: {
    id: number;
    name: string;
    channel: string;
    content?: string;
    uses: number;
    rate: number;
  } | null;
}

const channelIcons = {
  WhatsApp: Smartphone,
  SMS: MessageSquare,
  "E-mail": Mail,
  Push: Bell,
};

const variables = [
  { key: "{{nome}}", description: "Nome do paciente" },
  { key: "{{data}}", description: "Data do agendamento" },
  { key: "{{hora}}", description: "Horário do agendamento" },
  { key: "{{profissional}}", description: "Nome do profissional" },
  { key: "{{servico}}", description: "Serviço agendado" },
  { key: "{{clinica}}", description: "Nome da clínica" },
];

export function TemplateModal({ open, onOpenChange, mode, template }: TemplateModalProps) {
  const [formData, setFormData] = useState({
    name: template?.name || "",
    channel: template?.channel || "WhatsApp",
    content: template?.content || "Olá {{nome}}! Lembramos que sua consulta está agendada para {{data}} às {{hora}} com {{profissional}}. Confirme sua presença respondendo esta mensagem. 😊",
  });
  const [isSaving, setIsSaving] = useState(false);
  const isEditable = mode !== "view";

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success(mode === "create" ? "Template criado com sucesso!" : "Template atualizado com sucesso!");
      onOpenChange(false);
    }, 1000);
  };

  const insertVariable = (variable: string) => {
    setFormData({ ...formData, content: formData.content + " " + variable });
    toast.success("Variável inserida");
  };

  const copyContent = () => {
    navigator.clipboard.writeText(formData.content);
    toast.success("Conteúdo copiado!");
  };

  const ChannelIcon = channelIcons[formData.channel as keyof typeof channelIcons] || MessageSquare;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 shadow-lg">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <div>
              <DialogTitle>
                {mode === "create" ? "Criar Novo Template" : mode === "edit" ? "Editar Template" : "Visualizar Template"}
              </DialogTitle>
              <p className="text-sm text-muted-foreground">
                {mode === "view" && template && `${template.uses} utilizações • ${template.rate}% taxa de sucesso`}
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 flex-1 overflow-auto py-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Nome do Template</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ex: Lembrete de Consulta"
                disabled={!isEditable}
              />
            </div>
            <div className="space-y-2">
              <Label>Canal</Label>
              <Select 
                value={formData.channel} 
                onValueChange={(v) => setFormData({ ...formData, channel: v })}
                disabled={!isEditable}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                  <SelectItem value="SMS">SMS</SelectItem>
                  <SelectItem value="E-mail">E-mail</SelectItem>
                  <SelectItem value="Push">Push</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Variables */}
          {isEditable && (
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                Variáveis Disponíveis
              </Label>
              <div className="flex flex-wrap gap-2">
                {variables.map((v) => (
                  <Badge
                    key={v.key}
                    variant="outline"
                    className="cursor-pointer hover:bg-primary/10 transition-colors"
                    onClick={() => insertVariable(v.key)}
                  >
                    {v.key}
                  </Badge>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                Clique nas variáveis para inserir no conteúdo
              </p>
            </div>
          )}

          {/* Content */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Conteúdo da Mensagem</Label>
              <Button variant="ghost" size="sm" onClick={copyContent} className="gap-1">
                <Copy className="h-3 w-3" />
                Copiar
              </Button>
            </div>
            <Textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="Digite o conteúdo do template..."
              rows={6}
              disabled={!isEditable}
              className="font-mono text-sm"
            />
          </div>

          {/* Preview */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-muted-foreground" />
              Pré-visualização
            </Label>
            <div className={cn(
              "p-4 rounded-xl border-2 border-dashed",
              formData.channel === "WhatsApp" && "bg-emerald-500/5 border-emerald-500/20",
              formData.channel === "SMS" && "bg-blue-500/5 border-blue-500/20",
              formData.channel === "E-mail" && "bg-amber-500/5 border-amber-500/20",
              formData.channel === "Push" && "bg-purple-500/5 border-purple-500/20"
            )}>
              <div className="flex items-start gap-3">
                <div className={cn(
                  "p-2 rounded-lg",
                  formData.channel === "WhatsApp" && "bg-emerald-500/10",
                  formData.channel === "SMS" && "bg-blue-500/10",
                  formData.channel === "E-mail" && "bg-amber-500/10",
                  formData.channel === "Push" && "bg-purple-500/10"
                )}>
                  <ChannelIcon className={cn(
                    "h-5 w-5",
                    formData.channel === "WhatsApp" && "text-emerald-600",
                    formData.channel === "SMS" && "text-blue-600",
                    formData.channel === "E-mail" && "text-amber-600",
                    formData.channel === "Push" && "text-purple-600"
                  )} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium mb-1">{formData.channel}</p>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                    {formData.content
                      .replace("{{nome}}", "Maria Silva")
                      .replace("{{data}}", "15/12/2024")
                      .replace("{{hora}}", "10:00")
                      .replace("{{profissional}}", "Dr. Ricardo")
                      .replace("{{servico}}", "Consulta Cardiologia")
                      .replace("{{clinica}}", "MedClinic")
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="flex-shrink-0 mt-4 pt-4 border-t gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {mode === "view" ? "Fechar" : "Cancelar"}
          </Button>
          {isEditable && (
            <Button onClick={handleSave} disabled={isSaving} className="gap-2">
              {isSaving ? (
                "Salvando..."
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  {mode === "create" ? "Criar Template" : "Salvar"}
                </>
              )}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

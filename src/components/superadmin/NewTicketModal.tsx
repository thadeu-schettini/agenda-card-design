import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Ticket, Building2, User, AlertOctagon, Bug, Lightbulb, CreditCard, GraduationCap, Save, X, Paperclip } from "lucide-react";
import { toast } from "sonner";

interface NewTicketModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const categories = [
  { id: "bug", label: "Bug/Erro", icon: Bug, color: "destructive" },
  { id: "feature", label: "Sugestão", icon: Lightbulb, color: "info" },
  { id: "billing", label: "Financeiro", icon: CreditCard, color: "warning" },
  { id: "training", label: "Treinamento", icon: GraduationCap, color: "primary" },
  { id: "integration", label: "Integração", icon: AlertOctagon, color: "purple-600" },
  { id: "other", label: "Outro", icon: Ticket, color: "muted-foreground" },
];

const priorities = [
  { id: "low", label: "Baixa", color: "bg-info/10 text-info border-info/20" },
  { id: "medium", label: "Média", color: "bg-warning/10 text-warning border-warning/20" },
  { id: "high", label: "Alta", color: "bg-destructive/10 text-destructive border-destructive/20" },
  { id: "critical", label: "Crítica", color: "bg-red-600/10 text-red-600 border-red-600/20" },
];

export function NewTicketModal({ open, onOpenChange }: NewTicketModalProps) {
  const [formData, setFormData] = useState({
    clinic: "",
    subject: "",
    category: "bug",
    priority: "medium",
    description: "",
    assignee: ""
  });

  const handleSubmit = () => {
    if (!formData.subject || !formData.clinic || !formData.description) {
      toast.error("Preencha os campos obrigatórios");
      return;
    }
    toast.success("Ticket criado com sucesso!");
    onOpenChange(false);
    setFormData({
      clinic: "", subject: "", category: "bug",
      priority: "medium", description: "", assignee: ""
    });
  };

  const selectedCategory = categories.find(c => c.id === formData.category);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-gradient-to-br from-info/20 to-info/10">
              <Ticket className="h-5 w-5 text-info" />
            </div>
            Novo Ticket de Suporte
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Clínica e Assunto */}
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="clinic">Clínica *</Label>
              <Select value={formData.clinic} onValueChange={(value) => setFormData({ ...formData, clinic: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a clínica" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Clínica MedSaúde Premium</SelectItem>
                  <SelectItem value="2">Centro Médico Vida Plena</SelectItem>
                  <SelectItem value="3">Clínica Bem Estar Total</SelectItem>
                  <SelectItem value="4">Saúde Total Integrada</SelectItem>
                  <SelectItem value="5">Instituto de Saúde Avançada</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="subject">Assunto *</Label>
              <Input
                id="subject"
                placeholder="Descreva brevemente o problema"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              />
            </div>
          </div>

          {/* Categoria e Prioridade */}
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>Categoria</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      <div className="flex items-center gap-2">
                        <cat.icon className="h-4 w-4" />
                        {cat.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label>Prioridade</Label>
              <Select value={formData.priority} onValueChange={(value) => setFormData({ ...formData, priority: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {priorities.map((p) => (
                    <SelectItem key={p.id} value={p.id}>
                      <Badge className={`${p.color} text-xs`}>{p.label}</Badge>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Descrição */}
          <div className="grid gap-2">
            <Label htmlFor="description">Descrição do Problema *</Label>
            <Textarea
              id="description"
              placeholder="Descreva detalhadamente o problema, incluindo passos para reproduzir se aplicável..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={5}
            />
          </div>

          {/* Atribuir */}
          <div className="grid gap-2">
            <Label htmlFor="assignee">Atribuir a</Label>
            <Select value={formData.assignee} onValueChange={(value) => setFormData({ ...formData, assignee: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione (opcional)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lucas">Lucas Tech</SelectItem>
                <SelectItem value="ana">Ana Support</SelectItem>
                <SelectItem value="pedro">Pedro Dev</SelectItem>
                <SelectItem value="carla">Carla Sales</SelectItem>
                <SelectItem value="marcos">Marcos CS</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Anexos */}
          <div className="grid gap-2">
            <Label>Anexos</Label>
            <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
              <Paperclip className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">
                Arraste arquivos ou clique para anexar
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Imagens, PDFs, logs (máx. 10MB)
              </p>
            </div>
          </div>

          {/* Preview */}
          <div className="p-4 rounded-xl bg-muted/30 border">
            <p className="text-sm text-muted-foreground mb-2">Preview do Ticket</p>
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-info/10">
                {selectedCategory && <selectedCategory.icon className="h-5 w-5 text-info" />}
              </div>
              <div className="flex-1">
                <p className="font-medium">{formData.subject || "Assunto do ticket"}</p>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {formData.description || "Descrição do problema..."}
                </p>
              </div>
              <Badge className={priorities.find(p => p.id === formData.priority)?.color}>
                {priorities.find(p => p.id === formData.priority)?.label}
              </Badge>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            <X className="h-4 w-4 mr-2" />
            Cancelar
          </Button>
          <Button onClick={handleSubmit} className="gap-2">
            <Save className="h-4 w-4" />
            Criar Ticket
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

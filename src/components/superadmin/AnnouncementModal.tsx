import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Megaphone, Save, X, Calendar, Bell, AlertTriangle, Gift, Lightbulb, Wrench, Eye } from "lucide-react";
import { toast } from "sonner";

interface AnnouncementModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  announcement?: {
    id: number;
    title: string;
    message: string;
    type: string;
    status: string;
    targetPlans: string[];
    createdAt: string;
  } | null;
  mode: "create" | "edit";
}

const types = [
  { id: "feature", label: "Nova Funcionalidade", icon: Lightbulb, color: "success" },
  { id: "maintenance", label: "Manutenção", icon: Wrench, color: "warning" },
  { id: "promotion", label: "Promoção", icon: Gift, color: "primary" },
  { id: "alert", label: "Alerta", icon: AlertTriangle, color: "destructive" },
  { id: "info", label: "Informativo", icon: Bell, color: "info" },
];

export function AnnouncementModal({ open, onOpenChange, announcement, mode }: AnnouncementModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    type: "feature",
    status: "scheduled",
    targetPlans: [] as string[],
    scheduleDate: "",
    scheduleTime: "",
    showBanner: true,
    sendEmail: false,
    sendPush: false
  });

  useEffect(() => {
    if (announcement && mode === "edit") {
      setFormData({
        title: announcement.title,
        message: announcement.message,
        type: announcement.type,
        status: announcement.status,
        targetPlans: announcement.targetPlans || [],
        scheduleDate: "",
        scheduleTime: "",
        showBanner: true,
        sendEmail: false,
        sendPush: false
      });
    } else {
      setFormData({
        title: "",
        message: "",
        type: "feature",
        status: "scheduled",
        targetPlans: [],
        scheduleDate: "",
        scheduleTime: "",
        showBanner: true,
        sendEmail: false,
        sendPush: false
      });
    }
  }, [announcement, mode, open]);

  const handleSubmit = () => {
    if (!formData.title || !formData.message) {
      toast.error("Preencha os campos obrigatórios");
      return;
    }
    
    if (mode === "create") {
      toast.success("Anúncio criado com sucesso!");
    } else {
      toast.success("Anúncio atualizado com sucesso!");
    }
    onOpenChange(false);
  };

  const plans = ["Free", "Starter", "Pro", "Business", "Enterprise"];
  const selectedType = types.find(t => t.id === formData.type);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10">
              <Megaphone className="h-5 w-5 text-primary" />
            </div>
            {mode === "create" ? "Novo Anúncio" : `Editar: ${announcement?.title}`}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Basic Info */}
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Título *</Label>
              <Input
                id="title"
                placeholder="Título do anúncio"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="message">Mensagem *</Label>
              <Textarea
                id="message"
                placeholder="Conteúdo do anúncio..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={3}
              />
            </div>
          </div>

          {/* Type & Status */}
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>Tipo</Label>
              <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {types.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      <div className="flex items-center gap-2">
                        <type.icon className="h-4 w-4" />
                        {type.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label>Status</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Rascunho</SelectItem>
                  <SelectItem value="scheduled">Agendado</SelectItem>
                  <SelectItem value="active">Ativo</SelectItem>
                  <SelectItem value="ended">Encerrado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Schedule */}
          {formData.status === "scheduled" && (
            <div className="space-y-3">
              <Label className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Agendamento
              </Label>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="scheduleDate">Data</Label>
                  <Input
                    id="scheduleDate"
                    type="date"
                    value={formData.scheduleDate}
                    onChange={(e) => setFormData({ ...formData, scheduleDate: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="scheduleTime">Hora</Label>
                  <Input
                    id="scheduleTime"
                    type="time"
                    value={formData.scheduleTime}
                    onChange={(e) => setFormData({ ...formData, scheduleTime: e.target.value })}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Target Plans */}
          <div className="space-y-3">
            <Label>Planos Alvo</Label>
            <div className="flex flex-wrap gap-3">
              <label
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border cursor-pointer transition-all ${
                  formData.targetPlans.length === 0 
                    ? "border-primary bg-primary/5" 
                    : "border-border hover:border-primary/50"
                }`}
              >
                <Checkbox
                  checked={formData.targetPlans.length === 0}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormData({ ...formData, targetPlans: [] });
                    }
                  }}
                />
                Todos
              </label>
              {plans.map((plan) => (
                <label
                  key={plan}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border cursor-pointer transition-all ${
                    formData.targetPlans.includes(plan) 
                      ? "border-primary bg-primary/5" 
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <Checkbox
                    checked={formData.targetPlans.includes(plan)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setFormData({ ...formData, targetPlans: [...formData.targetPlans, plan] });
                      } else {
                        setFormData({ ...formData, targetPlans: formData.targetPlans.filter(p => p !== plan) });
                      }
                    }}
                  />
                  {plan}
                </label>
              ))}
            </div>
          </div>

          {/* Channels */}
          <div className="space-y-3">
            <Label>Canais de Distribuição</Label>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center gap-3">
                  <Eye className="h-4 w-4 text-muted-foreground" />
                  <span>Exibir Banner no Sistema</span>
                </div>
                <Switch
                  checked={formData.showBanner}
                  onCheckedChange={(checked) => setFormData({ ...formData, showBanner: checked })}
                />
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center gap-3">
                  <Bell className="h-4 w-4 text-muted-foreground" />
                  <span>Enviar Notificação Push</span>
                </div>
                <Switch
                  checked={formData.sendPush}
                  onCheckedChange={(checked) => setFormData({ ...formData, sendPush: checked })}
                />
              </div>
            </div>
          </div>

          {/* Preview */}
          <Card className="p-4 bg-muted/30">
            <p className="text-sm text-muted-foreground mb-3">Preview</p>
            <div className="p-4 rounded-lg border bg-card">
              <div className="flex items-center gap-2 mb-2">
                <Badge className={`text-xs ${
                  formData.type === "feature" ? "bg-success/10 text-success border-success/20" :
                  formData.type === "maintenance" ? "bg-warning/10 text-warning border-warning/20" :
                  formData.type === "promotion" ? "bg-primary/10 text-primary border-primary/20" :
                  formData.type === "alert" ? "bg-destructive/10 text-destructive border-destructive/20" :
                  "bg-info/10 text-info border-info/20"
                }`}>
                  {selectedType?.label}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {formData.status === "active" ? "Ativo" : 
                   formData.status === "scheduled" ? "Agendado" : 
                   formData.status === "ended" ? "Encerrado" : "Rascunho"}
                </Badge>
              </div>
              <h4 className="font-medium">{formData.title || "Título do Anúncio"}</h4>
              <p className="text-sm text-muted-foreground mt-1">
                {formData.message || "Mensagem do anúncio..."}
              </p>
            </div>
          </Card>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            <X className="h-4 w-4 mr-2" />
            Cancelar
          </Button>
          <Button onClick={handleSubmit} className="gap-2">
            <Save className="h-4 w-4" />
            {mode === "create" ? "Criar Anúncio" : "Salvar Alterações"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

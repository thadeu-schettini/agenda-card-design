import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Flag, Save, X, Settings, Users, Building2, Target, Zap } from "lucide-react";
import { toast } from "sonner";

interface FeatureFlagModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  flag?: {
    id: number;
    name: string;
    label: string;
    description: string;
    enabled: boolean;
    rollout: number;
    environment: string;
  } | null;
  mode: "create" | "edit";
}

export function FeatureFlagModal({ open, onOpenChange, flag, mode }: FeatureFlagModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    label: "",
    description: "",
    enabled: false,
    rollout: 0,
    environment: "development",
    targetPlans: [] as string[],
    targetClinics: [] as string[]
  });

  useEffect(() => {
    if (flag && mode === "edit") {
      setFormData({
        name: flag.name,
        label: flag.label,
        description: flag.description,
        enabled: flag.enabled,
        rollout: flag.rollout,
        environment: flag.environment,
        targetPlans: [],
        targetClinics: []
      });
    } else {
      setFormData({
        name: "",
        label: "",
        description: "",
        enabled: false,
        rollout: 0,
        environment: "development",
        targetPlans: [],
        targetClinics: []
      });
    }
  }, [flag, mode, open]);

  const handleSubmit = () => {
    if (!formData.name || !formData.label) {
      toast.error("Preencha os campos obrigatórios");
      return;
    }
    
    if (mode === "create") {
      toast.success("Feature Flag criada com sucesso!");
    } else {
      toast.success("Feature Flag atualizada com sucesso!");
    }
    onOpenChange(false);
  };

  const plans = ["Free", "Starter", "Pro", "Business", "Enterprise"];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500/20 to-purple-500/10">
              <Flag className="h-5 w-5 text-purple-600" />
            </div>
            {mode === "create" ? "Nova Feature Flag" : `Configurar: ${flag?.label}`}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Basic Info */}
          <div className="space-y-4">
            <h4 className="font-medium text-sm text-muted-foreground flex items-center gap-2">
              <Flag className="h-4 w-4" />
              Informações Básicas
            </h4>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Nome (slug) *</Label>
                  <Input
                    id="name"
                    placeholder="feature_name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value.toLowerCase().replace(/\s/g, "_") })}
                    className="font-mono"
                    disabled={mode === "edit"}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="label">Label de Exibição *</Label>
                  <Input
                    id="label"
                    placeholder="Nome da Feature"
                    value={formData.label}
                    onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  placeholder="Descreva o que esta feature faz..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={2}
                />
              </div>
            </div>
          </div>

          {/* Status & Environment */}
          <div className="space-y-4">
            <h4 className="font-medium text-sm text-muted-foreground flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Status e Ambiente
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Status</p>
                    <p className="text-sm text-muted-foreground">
                      {formData.enabled ? "Feature ativa" : "Feature desativada"}
                    </p>
                  </div>
                  <Switch
                    checked={formData.enabled}
                    onCheckedChange={(checked) => setFormData({ ...formData, enabled: checked })}
                  />
                </div>
              </Card>

              <div className="grid gap-2">
                <Label>Ambiente</Label>
                <Select value={formData.environment} onValueChange={(value) => setFormData({ ...formData, environment: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="development">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-muted-foreground" />
                        Development
                      </div>
                    </SelectItem>
                    <SelectItem value="staging">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-info" />
                        Staging
                      </div>
                    </SelectItem>
                    <SelectItem value="beta">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-warning" />
                        Beta
                      </div>
                    </SelectItem>
                    <SelectItem value="production">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-success" />
                        Production
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Rollout */}
          <div className="space-y-4">
            <h4 className="font-medium text-sm text-muted-foreground flex items-center gap-2">
              <Target className="h-4 w-4" />
              Rollout Gradual
            </h4>
            <Card className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Percentual de Usuários</p>
                  <p className="text-sm text-muted-foreground">
                    {formData.rollout}% dos usuários terão acesso
                  </p>
                </div>
                <Badge variant="outline" className="text-lg font-bold">
                  {formData.rollout}%
                </Badge>
              </div>
              <Slider
                value={[formData.rollout]}
                onValueChange={(value) => setFormData({ ...formData, rollout: value[0] })}
                max={100}
                step={5}
                className="py-2"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0%</span>
                <span>25%</span>
                <span>50%</span>
                <span>75%</span>
                <span>100%</span>
              </div>
            </Card>
          </div>

          {/* Target Plans */}
          <div className="space-y-4">
            <h4 className="font-medium text-sm text-muted-foreground flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Planos Alvo (Opcional)
            </h4>
            <div className="flex flex-wrap gap-3">
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
            <p className="text-xs text-muted-foreground">
              Deixe vazio para aplicar a todos os planos
            </p>
          </div>

          {/* Preview */}
          <Card className="p-4 bg-muted/30">
            <p className="text-sm text-muted-foreground mb-2">Preview</p>
            <div className="flex items-center gap-4">
              <Switch checked={formData.enabled} disabled />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{formData.label || "Nome da Feature"}</span>
                  <Badge variant="outline" className="font-mono text-xs">{formData.name || "feature_name"}</Badge>
                  <Badge className={`text-xs ${
                    formData.environment === "production" ? "bg-success/10 text-success border-success/20" :
                    formData.environment === "beta" ? "bg-warning/10 text-warning border-warning/20" :
                    formData.environment === "staging" ? "bg-info/10 text-info border-info/20" :
                    "bg-muted text-muted-foreground"
                  }`}>
                    {formData.environment}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{formData.description || "Descrição da feature"}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">{formData.rollout}%</p>
                <p className="text-xs text-muted-foreground">Rollout</p>
              </div>
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
            {mode === "create" ? "Criar Flag" : "Salvar Alterações"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

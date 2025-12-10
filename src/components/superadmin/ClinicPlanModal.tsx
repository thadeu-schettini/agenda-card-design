import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Crown, Star, Briefcase, CreditCard, ArrowUp, ArrowDown, Check, X, Sparkles, Users, HardDrive, MessageSquare } from "lucide-react";
import { toast } from "sonner";

interface ClinicPlanModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  clinic: {
    id: number | string;
    name: string;
    currentPlan: string;
    mrr: number;
  } | null;
}

const plans = [
  { id: "free", name: "Free", price: 0, users: 2, storage: "500MB", messages: 100 },
  { id: "starter", name: "Starter", price: 99, users: 5, storage: "5GB", messages: 500 },
  { id: "pro", name: "Pro", price: 199, users: 15, storage: "25GB", messages: 2000 },
  { id: "business", name: "Business", price: 450, users: 50, storage: "100GB", messages: "Ilimitado" },
  { id: "enterprise", name: "Enterprise", price: 890, users: "Ilimitado", storage: "500GB", messages: "Ilimitado" },
];

export function ClinicPlanModal({ open, onOpenChange, clinic }: ClinicPlanModalProps) {
  const [selectedPlan, setSelectedPlan] = useState(clinic?.currentPlan?.toLowerCase() || "starter");
  const [applyDiscount, setApplyDiscount] = useState(false);
  const [discountPercent, setDiscountPercent] = useState("10");
  const [notes, setNotes] = useState("");

  if (!clinic) return null;

  const currentPlanIndex = plans.findIndex(p => p.id === clinic.currentPlan.toLowerCase());
  const newPlanIndex = plans.findIndex(p => p.id === selectedPlan);
  const isUpgrade = newPlanIndex > currentPlanIndex;
  const isDowngrade = newPlanIndex < currentPlanIndex;

  const handleSubmit = () => {
    const action = isUpgrade ? "upgrade" : isDowngrade ? "downgrade" : "mantido";
    toast.success(`Plano ${action} com sucesso para ${plans.find(p => p.id === selectedPlan)?.name}!`);
    onOpenChange(false);
  };

  const getPlanIcon = (planId: string) => {
    switch (planId) {
      case "enterprise": return <Crown className="h-5 w-5 text-purple-600" />;
      case "business": return <Briefcase className="h-5 w-5 text-success" />;
      case "pro": return <Star className="h-5 w-5 text-primary" />;
      default: return <CreditCard className="h-5 w-5 text-muted-foreground" />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10">
              <CreditCard className="h-5 w-5 text-primary" />
            </div>
            Gerenciar Plano - {clinic.name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Current Plan */}
          <Card className="p-4 bg-muted/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {getPlanIcon(clinic.currentPlan.toLowerCase())}
                <div>
                  <p className="font-medium">Plano Atual</p>
                  <p className="text-sm text-muted-foreground">{clinic.currentPlan}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-success">R$ {clinic.mrr.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">MRR atual</p>
              </div>
            </div>
          </Card>

          {/* Plan Selection */}
          <div className="space-y-3">
            <Label>Selecione o Novo Plano</Label>
            <RadioGroup value={selectedPlan} onValueChange={setSelectedPlan} className="grid gap-3">
              {plans.map((plan) => (
                <label
                  key={plan.id}
                  className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all hover:border-primary/50 ${
                    selectedPlan === plan.id ? "border-primary bg-primary/5" : "border-border"
                  } ${plan.id === clinic.currentPlan.toLowerCase() ? "ring-2 ring-info/30" : ""}`}
                >
                  <RadioGroupItem value={plan.id} />
                  <div className="flex items-center gap-3 flex-1">
                    {getPlanIcon(plan.id)}
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{plan.name}</span>
                        {plan.id === clinic.currentPlan.toLowerCase() && (
                          <Badge variant="outline" className="text-xs">Atual</Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {plan.users} usuários
                        </span>
                        <span className="flex items-center gap-1">
                          <HardDrive className="h-3 w-3" />
                          {plan.storage}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageSquare className="h-3 w-3" />
                          {plan.messages} msgs
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">R$ {plan.price}</p>
                    <p className="text-xs text-muted-foreground">/mês</p>
                  </div>
                </label>
              ))}
            </RadioGroup>
          </div>

          {/* Discount Option */}
          <div className="p-4 rounded-xl border space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-warning" />
                <Label htmlFor="discount">Aplicar Desconto Especial</Label>
              </div>
              <Switch id="discount" checked={applyDiscount} onCheckedChange={setApplyDiscount} />
            </div>
            {applyDiscount && (
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="discountPercent">Percentual (%)</Label>
                  <Input
                    id="discountPercent"
                    type="number"
                    min="1"
                    max="50"
                    value={discountPercent}
                    onChange={(e) => setDiscountPercent(e.target.value)}
                  />
                </div>
                <div className="flex items-end">
                  <div className="p-3 rounded-lg bg-success/10 text-success text-sm">
                    Novo valor: R$ {(plans.find(p => p.id === selectedPlan)?.price || 0) * (1 - parseInt(discountPercent) / 100)}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Justificativa/Notas</Label>
            <Textarea
              id="notes"
              placeholder="Motivo da alteração de plano..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
            />
          </div>

          {/* Action Preview */}
          {selectedPlan !== clinic.currentPlan.toLowerCase() && (
            <Card className={`p-4 ${isUpgrade ? "bg-success/5 border-success/20" : "bg-warning/5 border-warning/20"}`}>
              <div className="flex items-center gap-3">
                {isUpgrade ? (
                  <ArrowUp className="h-5 w-5 text-success" />
                ) : (
                  <ArrowDown className="h-5 w-5 text-warning" />
                )}
                <div>
                  <p className="font-medium">{isUpgrade ? "Upgrade" : "Downgrade"} de Plano</p>
                  <p className="text-sm text-muted-foreground">
                    {clinic.currentPlan} → {plans.find(p => p.id === selectedPlan)?.name}
                  </p>
                </div>
              </div>
            </Card>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            <X className="h-4 w-4 mr-2" />
            Cancelar
          </Button>
          <Button onClick={handleSubmit} className="gap-2">
            <Check className="h-4 w-4" />
            Confirmar Alteração
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

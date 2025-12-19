import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Ticket,
  Percent,
  DollarSign,
  Calendar as CalendarIcon,
  ShoppingCart,
  CreditCard,
  Clock,
  RefreshCw,
  Infinity,
  Users,
  CheckCircle2,
  Sparkles,
  Zap,
  X,
} from "lucide-react";

interface NewCouponModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const mockServices = [
  { id: "1", name: "Consulta Geral" },
  { id: "2", name: "Limpeza Dental" },
  { id: "3", name: "Clareamento" },
  { id: "4", name: "Ortodontia" },
  { id: "5", name: "Implante" },
];

const mockPlans = [
  { id: "1", name: "Plano Básico" },
  { id: "2", name: "Plano Premium" },
  { id: "3", name: "Plano Empresarial" },
];

const mockPartners = [
  { id: "1", name: "Parceiro A" },
  { id: "2", name: "Parceiro B" },
  { id: "3", name: "Afiliado Premium" },
];

export const NewCouponModal = ({ open, onOpenChange }: NewCouponModalProps) => {
  const [step, setStep] = useState(1);
  const [code, setCode] = useState("");
  const [codeAvailable, setCodeAvailable] = useState<boolean | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [scope, setScope] = useState<"CLINIC_CHECKOUT" | "SUBSCRIPTION">("CLINIC_CHECKOUT");
  const [type, setType] = useState<"PERCENT" | "FIXED">("PERCENT");
  const [percentOff, setPercentOff] = useState("");
  const [amountOff, setAmountOff] = useState("");
  const [duration, setDuration] = useState<"ONCE" | "REPEATING" | "FOREVER">("ONCE");
  const [durationInMonths, setDurationInMonths] = useState("");
  const [validFrom, setValidFrom] = useState<Date>();
  const [validTo, setValidTo] = useState<Date>();
  const [active, setActive] = useState(true);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [selectedPartner, setSelectedPartner] = useState("");
  const [maxRedemptions, setMaxRedemptions] = useState("");
  const [maxPerCustomer, setMaxPerCustomer] = useState("");

  const handleCodeChange = (value: string) => {
    const upperCode = value.toUpperCase().replace(/[^A-Z0-9]/g, "");
    setCode(upperCode);
    // Simulate availability check
    if (upperCode.length >= 3) {
      setTimeout(() => {
        setCodeAvailable(upperCode !== "WELCOME20"); // Mock: WELCOME20 is taken
      }, 300);
    } else {
      setCodeAvailable(null);
    }
  };

  const toggleService = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleCreate = () => {
    // Mock create action
    console.log("Creating coupon:", {
      code,
      name,
      description,
      scope,
      type,
      percentOff,
      amountOff,
      duration,
      durationInMonths,
      validFrom,
      validTo,
      active,
      selectedServices,
      selectedPlan,
      selectedPartner,
      maxRedemptions,
      maxPerCustomer,
    });
    onOpenChange(false);
    resetForm();
  };

  const resetForm = () => {
    setStep(1);
    setCode("");
    setCodeAvailable(null);
    setName("");
    setDescription("");
    setScope("CLINIC_CHECKOUT");
    setType("PERCENT");
    setPercentOff("");
    setAmountOff("");
    setDuration("ONCE");
    setDurationInMonths("");
    setValidFrom(undefined);
    setValidTo(undefined);
    setActive(true);
    setSelectedServices([]);
    setSelectedPlan("");
    setSelectedPartner("");
    setMaxRedemptions("");
    setMaxPerCustomer("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Ticket className="h-5 w-5 text-primary" />
            </div>
            <div>
              <span>Novo Cupom de Desconto</span>
              <DialogDescription className="font-normal mt-0.5">
                Configure os detalhes do cupom promocional
              </DialogDescription>
            </div>
          </DialogTitle>
        </DialogHeader>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-6 px-4">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={cn(
                  "h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium transition-all",
                  step >= s
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {step > s ? <CheckCircle2 className="h-4 w-4" /> : s}
              </div>
              <span
                className={cn(
                  "ml-2 text-sm hidden sm:inline",
                  step >= s ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {s === 1 && "Identificação"}
                {s === 2 && "Desconto"}
                {s === 3 && "Regras"}
              </span>
              {s < 3 && (
                <div
                  className={cn(
                    "h-0.5 w-12 mx-4 rounded-full transition-all",
                    step > s ? "bg-primary" : "bg-muted"
                  )}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Identification */}
        {step === 1 && (
          <div className="space-y-6">
            {/* Code Input with Validation */}
            <div className="space-y-2">
              <Label htmlFor="code">Código do Cupom *</Label>
              <div className="relative">
                <Input
                  id="code"
                  placeholder="Ex: WELCOME20"
                  value={code}
                  onChange={(e) => handleCodeChange(e.target.value)}
                  className={cn(
                    "font-mono text-lg tracking-wider uppercase pr-10",
                    codeAvailable === true && "border-emerald-500 focus-visible:ring-emerald-500",
                    codeAvailable === false && "border-destructive focus-visible:ring-destructive"
                  )}
                />
                {codeAvailable !== null && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    {codeAvailable ? (
                      <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                    ) : (
                      <X className="h-5 w-5 text-destructive" />
                    )}
                  </div>
                )}
              </div>
              {codeAvailable === false && (
                <p className="text-xs text-destructive">Este código já está em uso</p>
              )}
              {codeAvailable === true && (
                <p className="text-xs text-emerald-500">Código disponível!</p>
              )}
            </div>

            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Nome do Cupom *</Label>
              <Input
                id="name"
                placeholder="Ex: Desconto de Boas-vindas"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                placeholder="Descrição opcional do cupom..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>

            {/* Scope Selection */}
            <div className="space-y-3">
              <Label>Escopo do Cupom</Label>
              <div className="grid grid-cols-2 gap-3">
                <div
                  className={cn(
                    "p-4 rounded-xl border-2 cursor-pointer transition-all",
                    scope === "CLINIC_CHECKOUT"
                      ? "border-primary bg-primary/5"
                      : "border-muted hover:border-muted-foreground/20"
                  )}
                  onClick={() => setScope("CLINIC_CHECKOUT")}
                >
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "h-10 w-10 rounded-lg flex items-center justify-center",
                      scope === "CLINIC_CHECKOUT" ? "bg-primary/10" : "bg-muted"
                    )}>
                      <ShoppingCart className={cn(
                        "h-5 w-5",
                        scope === "CLINIC_CHECKOUT" ? "text-primary" : "text-muted-foreground"
                      )} />
                    </div>
                    <div>
                      <p className="font-medium">Checkout</p>
                      <p className="text-xs text-muted-foreground">Serviços da clínica</p>
                    </div>
                  </div>
                </div>
                <div
                  className={cn(
                    "p-4 rounded-xl border-2 cursor-pointer transition-all",
                    scope === "SUBSCRIPTION"
                      ? "border-primary bg-primary/5"
                      : "border-muted hover:border-muted-foreground/20"
                  )}
                  onClick={() => setScope("SUBSCRIPTION")}
                >
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "h-10 w-10 rounded-lg flex items-center justify-center",
                      scope === "SUBSCRIPTION" ? "bg-primary/10" : "bg-muted"
                    )}>
                      <CreditCard className={cn(
                        "h-5 w-5",
                        scope === "SUBSCRIPTION" ? "text-primary" : "text-muted-foreground"
                      )} />
                    </div>
                    <div>
                      <p className="font-medium">Assinatura</p>
                      <p className="text-xs text-muted-foreground">Planos recorrentes</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Active Toggle */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
              <div className="flex items-center gap-3">
                <Zap className="h-5 w-5 text-amber-500" />
                <div>
                  <p className="font-medium">Ativar imediatamente</p>
                  <p className="text-xs text-muted-foreground">O cupom estará disponível para uso</p>
                </div>
              </div>
              <Switch
                checked={active}
                onCheckedChange={setActive}
                className="data-[state=checked]:bg-emerald-500"
              />
            </div>
          </div>
        )}

        {/* Step 2: Discount Configuration */}
        {step === 2 && (
          <div className="space-y-6">
            {/* Discount Type */}
            <div className="space-y-3">
              <Label>Tipo de Desconto</Label>
              <Tabs value={type} onValueChange={(v) => setType(v as "PERCENT" | "FIXED")}>
                <TabsList className="grid grid-cols-2 w-full">
                  <TabsTrigger value="PERCENT" className="gap-2">
                    <Percent className="h-4 w-4" />
                    Percentual
                  </TabsTrigger>
                  <TabsTrigger value="FIXED" className="gap-2">
                    <DollarSign className="h-4 w-4" />
                    Valor Fixo
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Discount Value */}
            <div className="space-y-2">
              <Label>{type === "PERCENT" ? "Percentual de Desconto" : "Valor do Desconto"}</Label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {type === "PERCENT" ? "%" : "R$"}
                </div>
                {type === "PERCENT" ? (
                  <Input
                    type="number"
                    min="1"
                    max="100"
                    placeholder="20"
                    value={percentOff}
                    onChange={(e) => setPercentOff(e.target.value)}
                    className="pl-10 text-2xl font-bold h-14"
                  />
                ) : (
                  <Input
                    type="number"
                    min="0.01"
                    step="0.01"
                    placeholder="50.00"
                    value={amountOff}
                    onChange={(e) => setAmountOff(e.target.value)}
                    className="pl-10 text-2xl font-bold h-14"
                  />
                )}
              </div>
            </div>

            {/* Duration */}
            <div className="space-y-3">
              <Label>Duração do Desconto</Label>
              <div className="grid grid-cols-3 gap-3">
                <div
                  className={cn(
                    "p-4 rounded-xl border-2 cursor-pointer transition-all text-center",
                    duration === "ONCE"
                      ? "border-primary bg-primary/5"
                      : "border-muted hover:border-muted-foreground/20"
                  )}
                  onClick={() => setDuration("ONCE")}
                >
                  <Clock className={cn(
                    "h-6 w-6 mx-auto mb-2",
                    duration === "ONCE" ? "text-primary" : "text-muted-foreground"
                  )} />
                  <p className="font-medium text-sm">Uma vez</p>
                </div>
                <div
                  className={cn(
                    "p-4 rounded-xl border-2 cursor-pointer transition-all text-center",
                    duration === "REPEATING"
                      ? "border-primary bg-primary/5"
                      : "border-muted hover:border-muted-foreground/20"
                  )}
                  onClick={() => setDuration("REPEATING")}
                >
                  <RefreshCw className={cn(
                    "h-6 w-6 mx-auto mb-2",
                    duration === "REPEATING" ? "text-primary" : "text-muted-foreground"
                  )} />
                  <p className="font-medium text-sm">Recorrente</p>
                </div>
                <div
                  className={cn(
                    "p-4 rounded-xl border-2 cursor-pointer transition-all text-center",
                    duration === "FOREVER"
                      ? "border-primary bg-primary/5"
                      : "border-muted hover:border-muted-foreground/20"
                  )}
                  onClick={() => setDuration("FOREVER")}
                >
                  <Infinity className={cn(
                    "h-6 w-6 mx-auto mb-2",
                    duration === "FOREVER" ? "text-primary" : "text-muted-foreground"
                  )} />
                  <p className="font-medium text-sm">Para sempre</p>
                </div>
              </div>

              {duration === "REPEATING" && (
                <div className="space-y-2 mt-4">
                  <Label>Número de Ciclos (meses)</Label>
                  <Input
                    type="number"
                    min="1"
                    placeholder="3"
                    value={durationInMonths}
                    onChange={(e) => setDurationInMonths(e.target.value)}
                  />
                </div>
              )}
            </div>

            {/* Validity Period */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Início da Validade</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !validFrom && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {validFrom ? format(validFrom, "dd/MM/yyyy", { locale: ptBR }) : "Selecionar"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={validFrom}
                      onSelect={setValidFrom}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label>Fim da Validade</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !validTo && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {validTo ? format(validTo, "dd/MM/yyyy", { locale: ptBR }) : "Sem limite"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={validTo}
                      onSelect={setValidTo}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Rules & Restrictions */}
        {step === 3 && (
          <div className="space-y-6">
            {/* Usage Limits */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Limite Total de Resgates</Label>
                <Input
                  type="number"
                  min="1"
                  placeholder="Ilimitado"
                  value={maxRedemptions}
                  onChange={(e) => setMaxRedemptions(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">Deixe vazio para ilimitado</p>
              </div>
              <div className="space-y-2">
                <Label>Limite por Cliente</Label>
                <Input
                  type="number"
                  min="1"
                  placeholder="1"
                  value={maxPerCustomer}
                  onChange={(e) => setMaxPerCustomer(e.target.value)}
                />
              </div>
            </div>

            {/* Applicable Services/Plans */}
            {scope === "CLINIC_CHECKOUT" ? (
              <div className="space-y-3">
                <Label>Serviços Aplicáveis</Label>
                <p className="text-xs text-muted-foreground">Selecione os serviços onde o cupom pode ser usado. Deixe vazio para todos.</p>
                <div className="flex flex-wrap gap-2">
                  {mockServices.map((service) => (
                    <Badge
                      key={service.id}
                      variant={selectedServices.includes(service.id) ? "default" : "outline"}
                      className="cursor-pointer transition-all hover:scale-105"
                      onClick={() => toggleService(service.id)}
                    >
                      {service.name}
                      {selectedServices.includes(service.id) && (
                        <X className="h-3 w-3 ml-1" />
                      )}
                    </Badge>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <Label>Plano Aplicável</Label>
                <Select value={selectedPlan} onValueChange={setSelectedPlan}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todos os planos" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockPlans.map((plan) => (
                      <SelectItem key={plan.id} value={plan.id}>
                        {plan.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Partner Selection */}
            <div className="space-y-2">
              <Label>Parceiro Vinculado (Opcional)</Label>
              <Select value={selectedPartner} onValueChange={setSelectedPartner}>
                <SelectTrigger>
                  <SelectValue placeholder="Nenhum parceiro" />
                </SelectTrigger>
                <SelectContent>
                  {mockPartners.map((partner) => (
                    <SelectItem key={partner.id} value={partner.id}>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        {partner.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Vincule a um parceiro afiliado para rastrear comissões
              </p>
            </div>

            {/* Summary Preview */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="h-5 w-5 text-primary" />
                <span className="font-semibold">Resumo do Cupom</span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Código:</span>
                  <code className="font-mono font-bold">{code || "---"}</code>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Desconto:</span>
                  <span className="font-medium">
                    {type === "PERCENT" 
                      ? `${percentOff || 0}%` 
                      : `R$ ${amountOff || "0.00"}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Duração:</span>
                  <span className="font-medium">
                    {duration === "ONCE" && "Uso único"}
                    {duration === "REPEATING" && `${durationInMonths || "N"} ciclos`}
                    {duration === "FOREVER" && "Permanente"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <Badge variant={active ? "default" : "secondary"} className={active ? "bg-emerald-500" : ""}>
                    {active ? "Ativo" : "Inativo"}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-4 border-t">
          <Button
            variant="outline"
            onClick={() => step > 1 ? setStep(step - 1) : onOpenChange(false)}
          >
            {step > 1 ? "Voltar" : "Cancelar"}
          </Button>
          <Button
            onClick={() => step < 3 ? setStep(step + 1) : handleCreate()}
            disabled={step === 1 && (!code || !name || codeAvailable === false)}
          >
            {step < 3 ? "Continuar" : "Criar Cupom"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

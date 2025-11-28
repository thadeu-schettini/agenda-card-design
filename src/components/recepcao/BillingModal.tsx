import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  Receipt, 
  Plus, 
  Trash2, 
  CreditCard, 
  Banknote, 
  Smartphone,
  FileText,
  Calendar,
  User,
  DollarSign,
  Tag,
  CheckCircle2,
  Clock,
  Sparkles
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface BillingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  appointment: {
    patientName: string;
    patientPhone: string;
    service: string;
    date: string;
    time: string;
    value: number;
  };
}

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export const BillingModal = ({ open, onOpenChange, appointment }: BillingModalProps) => {
  const [dueDate, setDueDate] = useState(appointment.date);
  const [description, setDescription] = useState(appointment.service);
  const [items, setItems] = useState<InvoiceItem[]>([
    {
      id: "1",
      description: appointment.service,
      quantity: 1,
      unitPrice: appointment.value,
      total: appointment.value
    }
  ]);
  const [paymentMethod, setPaymentMethod] = useState("pix");
  const [status, setStatus] = useState("pendente");
  const [discountCode, setDiscountCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);
  const [loading, setLoading] = useState(false);

  const paymentMethods = [
    { id: "pix", label: "PIX", icon: Smartphone },
    { id: "money", label: "Dinheiro", icon: Banknote },
    { id: "credit", label: "Crédito", icon: CreditCard },
    { id: "debit", label: "Débito", icon: CreditCard },
  ];

  const statusOptions = [
    { value: "pendente", label: "Pendente", color: "bg-orange-500" },
    { value: "confirmado", label: "Confirmado", color: "bg-green-500" },
    { value: "cancelado", label: "Cancelado", color: "bg-red-500" },
  ];

  const calculateTotal = () => {
    const subtotal = items.reduce((sum, item) => sum + item.total, 0);
    const discount = discountApplied ? subtotal * 0.1 : 0;
    return { subtotal, discount, total: subtotal - discount };
  };

  const addItem = () => {
    const newItem: InvoiceItem = {
      id: Date.now().toString(),
      description: "",
      quantity: 1,
      unitPrice: 0,
      total: 0
    };
    setItems([...items, newItem]);
  };

  const updateItem = (id: string, field: keyof InvoiceItem, value: any) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const updated = { ...item, [field]: value };
        if (field === "quantity" || field === "unitPrice") {
          updated.total = updated.quantity * updated.unitPrice;
        }
        return updated;
      }
      return item;
    }));
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const validateDiscount = () => {
    // Simulação de validação de cupom
    if (discountCode.toUpperCase() === "CLINICA50" || discountCode.toUpperCase() === "DESCONTO10") {
      setDiscountApplied(true);
      toast.success("Cupom aplicado!", {
        description: "10% de desconto aplicado ao total"
      });
    } else {
      toast.error("Cupom inválido", {
        description: "O código inserido não é válido"
      });
    }
  };

  const handleRegisterPayment = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const totals = calculateTotal();
      toast.success("Pagamento registrado!", {
        description: `Cobrança de R$ ${totals.total.toFixed(2)} registrada com sucesso`,
        action: {
          label: "Ver Recibo",
          onClick: () => console.log("Abrir recibo"),
        },
      });
      onOpenChange(false);
    }, 1000);
  };

  const totals = calculateTotal();
  const currentStatus = statusOptions.find(s => s.value === status);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[95vh] overflow-hidden p-0 gap-0 bg-background">
        {/* Modern Header */}
        <div className="relative p-8 bg-gradient-to-br from-background via-muted/30 to-background border-b border-border/50 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(147,51,234,0.08),transparent_50%)]" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative">
            <div className="flex items-start justify-between gap-6 mb-8">
              <div className="flex items-center gap-4 flex-1">
                <div className="relative group">
                  <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
                  <div className="relative p-4 bg-primary/10 backdrop-blur-md rounded-2xl border border-primary/20 group-hover:scale-105 transition-transform">
                    <Receipt className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <div>
                  <DialogTitle className="text-3xl font-bold text-foreground mb-1 flex items-center gap-3">
                    Registro de Cobrança
                    <Badge variant="outline" className="text-xs font-normal">
                      <Sparkles className="h-3 w-3 mr-1" />
                      Novo
                    </Badge>
                  </DialogTitle>
                  <p className="text-sm text-muted-foreground">
                    Crie cobranças personalizadas e gerencie pagamentos
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Badge className={cn("px-3 py-1", currentStatus?.color)}>
                  {currentStatus?.label}
                </Badge>
              </div>
            </div>

            {/* Patient & Appointment Info - Redesigned */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="group p-4 bg-card rounded-xl border border-border hover:border-primary/30 hover:shadow-lg transition-all">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg group-hover:scale-110 transition-transform">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-muted-foreground mb-1">Paciente</p>
                    <p className="text-base font-bold text-foreground truncate">{appointment.patientName}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{appointment.patientPhone}</p>
                  </div>
                </div>
              </div>

              <div className="group p-4 bg-card rounded-xl border border-border hover:border-primary/30 hover:shadow-lg transition-all">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-accent/10 rounded-lg group-hover:scale-110 transition-transform">
                    <FileText className="h-5 w-5 text-accent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-muted-foreground mb-1">Serviço</p>
                    <p className="text-base font-bold text-foreground">{appointment.service}</p>
                  </div>
                </div>
              </div>

              <div className="group p-4 bg-card rounded-xl border border-border hover:border-primary/30 hover:shadow-lg transition-all">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-success/10 rounded-lg group-hover:scale-110 transition-transform">
                    <Calendar className="h-5 w-5 text-success" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-muted-foreground mb-1">Agendamento</p>
                    <p className="text-base font-bold text-foreground">{appointment.date}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{appointment.time}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(95vh-280px)] p-6 space-y-6">
          {/* Due Date & Value - Redesigned */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="p-5 bg-card rounded-xl border border-border hover:border-primary/30 transition-all">
              <Label htmlFor="dueDate" className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <div className="p-1.5 bg-primary/10 rounded-lg">
                  <Clock className="h-4 w-4 text-primary" />
                </div>
                Vencimento da Fatura
              </Label>
              <Input
                id="dueDate"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="mt-2 h-11"
              />
            </div>

            <div className="relative group p-5 bg-gradient-to-br from-success/5 via-success/10 to-primary/5 rounded-xl border border-success/20 hover:border-success/40 transition-all overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(34,197,94,0.15),transparent_70%)]" />
              <div className="relative">
                <Label className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <div className="p-1.5 bg-success/10 rounded-lg">
                    <DollarSign className="h-4 w-4 text-success" />
                  </div>
                  Valor Total
                </Label>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-4xl font-black bg-gradient-to-r from-success to-primary bg-clip-text text-transparent">
                    R$ {totals.total.toFixed(2)}
                  </span>
                  <span className="text-xs text-muted-foreground font-medium px-2 py-1 bg-background/50 rounded-md">
                    Auto
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1.5">
                  <Sparkles className="h-3 w-3" />
                  Calculado automaticamente
                </p>
              </div>
            </div>
          </div>

          {/* Description - Enhanced */}
          <div className="p-5 bg-card rounded-xl border border-border hover:border-primary/30 transition-all">
            <Label htmlFor="description" className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <div className="p-1.5 bg-primary/10 rounded-lg">
                <FileText className="h-4 w-4 text-primary" />
              </div>
              Descrição da Cobrança
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="Adicione detalhes sobre a cobrança..."
              className="resize-none"
            />
          </div>

          {/* Invoice Items - Enhanced */}
          <div className="p-5 bg-muted/30 rounded-xl border border-border">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                  <div className="p-1.5 bg-primary/10 rounded-lg">
                    <Receipt className="h-4 w-4 text-primary" />
                  </div>
                  Itens da Fatura
                </h3>
                <p className="text-xs text-muted-foreground mt-1.5">
                  Personalize os itens da cobrança com serviços e produtos
                </p>
              </div>
              <Button
                onClick={addItem}
                size="sm"
                className="gap-2 shadow-md hover:shadow-lg hover:scale-105 transition-all"
              >
                <Plus className="h-4 w-4" />
                Novo Item
              </Button>
            </div>

            <div className="border border-border rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left text-xs font-medium text-muted-foreground p-3">Descrição</th>
                      <th className="text-center text-xs font-medium text-muted-foreground p-3 w-24">Qtde</th>
                      <th className="text-right text-xs font-medium text-muted-foreground p-3 w-32">Preço Unit.</th>
                      <th className="text-right text-xs font-medium text-muted-foreground p-3 w-32">Preço</th>
                      <th className="text-center text-xs font-medium text-muted-foreground p-3 w-16">Ação</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {items.map((item) => (
                      <tr key={item.id} className="group hover:bg-muted/30 transition-colors">
                        <td className="p-2">
                          <Input
                            value={item.description}
                            onChange={(e) => updateItem(item.id, "description", e.target.value)}
                            placeholder="Nome do serviço ou produto"
                            className="h-9 border-0 bg-transparent focus-visible:ring-1"
                          />
                        </td>
                        <td className="p-2">
                          <Input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => updateItem(item.id, "quantity", Number(e.target.value))}
                            className="h-9 text-center border-0 bg-transparent focus-visible:ring-1"
                          />
                        </td>
                        <td className="p-2">
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                              R$
                            </span>
                            <Input
                              type="number"
                              step="0.01"
                              min="0"
                              value={item.unitPrice}
                              onChange={(e) => updateItem(item.id, "unitPrice", Number(e.target.value))}
                              className="h-9 pl-8 text-right border-0 bg-transparent focus-visible:ring-1"
                            />
                          </div>
                        </td>
                        <td className="p-2">
                          <div className="text-right font-semibold text-foreground pr-2">
                            R$ {item.total.toFixed(2)}
                          </div>
                        </td>
                        <td className="p-2 text-center">
                          <Button
                            onClick={() => removeItem(item.id)}
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                            disabled={items.length === 1}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Total Summary - Enhanced */}
              <div className="border-t border-border bg-gradient-to-r from-muted/50 to-muted/30 p-5 space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground font-medium">Subtotal</span>
                  <span className="font-semibold text-foreground">R$ {totals.subtotal.toFixed(2)}</span>
                </div>
                {discountApplied && (
                  <div className="flex justify-between items-center text-sm animate-fade-in">
                    <span className="text-success font-medium flex items-center gap-1.5">
                      <Tag className="h-3.5 w-3.5" />
                      Desconto (10%)
                    </span>
                    <span className="font-semibold text-success">- R$ {totals.discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between items-center pt-3 border-t border-border">
                  <span className="text-base font-bold text-foreground">Total da Fatura</span>
                  <span className="text-2xl font-black bg-gradient-to-r from-primary to-success bg-clip-text text-transparent">
                    R$ {totals.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method & Status - Redesigned */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="p-5 bg-card rounded-xl border border-border hover:border-primary/30 transition-all">
              <Label className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                <div className="p-1.5 bg-primary/10 rounded-lg">
                  <CreditCard className="h-4 w-4 text-primary" />
                </div>
                Método de Pagamento
              </Label>
              <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                <SelectTrigger className="h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {paymentMethods.map((method) => {
                    const Icon = method.icon;
                    return (
                      <SelectItem key={method.id} value={method.id}>
                        <div className="flex items-center gap-2.5">
                          <div className="p-1.5 bg-muted rounded-md">
                            <Icon className="h-3.5 w-3.5" />
                          </div>
                          {method.label}
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            <div className="p-5 bg-card rounded-xl border border-border hover:border-primary/30 transition-all">
              <Label className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                <div className="p-1.5 bg-primary/10 rounded-lg">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                </div>
                Status Inicial
              </Label>
              <div className="grid grid-cols-3 gap-2">
                {statusOptions.map((option) => (
                  <Button
                    key={option.value}
                    onClick={() => setStatus(option.value)}
                    variant={status === option.value ? "default" : "outline"}
                    size="sm"
                    className={cn(
                      "h-11 flex-col gap-1 relative overflow-hidden",
                      status === option.value && "shadow-lg ring-2 ring-primary/20"
                    )}
                  >
                    {status === option.value && (
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
                    )}
                    <span className="relative text-xs font-semibold">{option.label}</span>
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Discount Coupon - Enhanced */}
          <div className="p-5 bg-gradient-to-br from-card to-muted/30 rounded-xl border border-border hover:border-primary/30 transition-all">
            <Label htmlFor="discount" className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <div className="p-1.5 bg-primary/10 rounded-lg">
                <Tag className="h-4 w-4 text-primary" />
              </div>
              Cupom de Desconto
              <Badge variant="outline" className="text-xs ml-auto">Opcional</Badge>
            </Label>
            <div className="flex gap-2.5">
              <Input
                id="discount"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
                placeholder="Digite o código do cupom"
                className="flex-1 h-11 font-mono"
                disabled={discountApplied}
              />
              <Button
                onClick={validateDiscount}
                variant={discountApplied ? "secondary" : "default"}
                disabled={!discountCode || discountApplied}
                className="h-11 px-6 gap-2"
              >
                {discountApplied ? (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    Aplicado
                  </>
                ) : (
                  "Validar"
                )}
              </Button>
            </div>
            {discountApplied && (
              <div className="mt-3 p-3 bg-success/10 rounded-lg border border-success/20 animate-fade-in">
                <p className="text-sm text-success font-medium flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  Desconto de 10% aplicado com sucesso!
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions - Enhanced */}
        <div className="relative border-t border-border p-6 bg-gradient-to-r from-background via-muted/20 to-background">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(59,130,246,0.05),transparent_70%)]" />
          <div className="relative flex flex-col sm:flex-row gap-3 justify-between items-center">
            <div className="flex items-baseline gap-2">
              <span className="text-sm text-muted-foreground">Total:</span>
              <span className="text-2xl font-black bg-gradient-to-r from-primary to-success bg-clip-text text-transparent">
                R$ {totals.total.toFixed(2)}
              </span>
            </div>
            
            <div className="flex gap-3 w-full sm:w-auto">
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={loading}
                className="flex-1 sm:flex-initial h-11"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleRegisterPayment}
                disabled={loading || items.some(i => !i.description || i.total === 0)}
                className="flex-1 sm:flex-initial gap-2 shadow-xl h-11 px-8 bg-gradient-to-r from-primary to-primary-glow hover:shadow-2xl hover:scale-105 transition-all"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processando
                  </div>
                ) : (
                  <>
                    <Receipt className="h-4 w-4" />
                    Registrar Pagamento
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

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
        {/* Header com gradient */}
        <div className="relative p-6 pb-8 bg-gradient-to-br from-primary via-primary-glow to-primary overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20" />
          
          <div className="relative">
            <DialogTitle className="flex items-center gap-3 text-2xl font-bold text-white mb-6">
              <div className="p-2.5 bg-white/20 backdrop-blur-md rounded-xl border border-white/30">
                <Receipt className="h-6 w-6 text-white" />
              </div>
              Fatura Manual
              <Sparkles className="h-5 w-5 text-white/80 animate-pulse" />
            </DialogTitle>

            {/* Patient & Appointment Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                <div className="flex items-center gap-2 mb-2">
                  <User className="h-4 w-4 text-white/70" />
                  <span className="text-xs text-white/70 font-medium">Paciente</span>
                </div>
                <p className="text-white font-semibold">{appointment.patientName}</p>
                <p className="text-xs text-white/80 mt-1">{appointment.patientPhone}</p>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="h-4 w-4 text-white/70" />
                  <span className="text-xs text-white/70 font-medium">Serviço</span>
                </div>
                <p className="text-white font-semibold">{appointment.service}</p>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="h-4 w-4 text-white/70" />
                  <span className="text-xs text-white/70 font-medium">Data/Hora</span>
                </div>
                <p className="text-white font-semibold">{appointment.date}</p>
                <p className="text-xs text-white/80 mt-1">{appointment.time}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(95vh-200px)] p-6 space-y-6">
          {/* Due Date & Value */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="dueDate" className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                Data de vencimento
              </Label>
              <Input
                id="dueDate"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-primary" />
                Valor
              </Label>
              <div className="mt-1 p-4 bg-primary/5 rounded-lg border border-primary/20">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm text-muted-foreground">Total calculado</span>
                  <span className="text-2xl font-bold text-primary">
                    R$ {totals.total.toFixed(2)}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Calculado automaticamente a partir dos itens
                </p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description" className="text-sm font-medium text-foreground mb-2">
              Descrição
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              className="resize-none"
            />
          </div>

          {/* Invoice Items */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-semibold text-foreground">Itens da fatura</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Adicione serviços, procedimentos ou produtos
                </p>
              </div>
              <Button
                onClick={addItem}
                size="sm"
                variant="outline"
                className="gap-2"
              >
                <Plus className="h-4 w-4" />
                Adicionar item
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

              {/* Total Summary */}
              <div className="border-t border-border bg-muted/20 p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">R$ {totals.subtotal.toFixed(2)}</span>
                </div>
                {discountApplied && (
                  <div className="flex justify-between text-sm text-green-600 dark:text-green-400">
                    <span>Desconto (10%)</span>
                    <span className="font-medium">- R$ {totals.discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-bold border-t border-border pt-2">
                  <span>Total da fatura</span>
                  <span className="text-primary">R$ {totals.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method & Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-primary" />
                Método de pagamento
              </Label>
              <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {paymentMethods.map((method) => {
                    const Icon = method.icon;
                    return (
                      <SelectItem key={method.id} value={method.id}>
                        <div className="flex items-center gap-2">
                          <Icon className="h-4 w-4" />
                          {method.label}
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm font-medium text-foreground mb-3">Status inicial</Label>
              <div className="flex gap-2">
                {statusOptions.map((option) => (
                  <Button
                    key={option.value}
                    onClick={() => setStatus(option.value)}
                    variant={status === option.value ? "default" : "outline"}
                    size="sm"
                    className={cn(
                      "flex-1 gap-2",
                      status === option.value && "shadow-lg"
                    )}
                  >
                    {status === option.value && <CheckCircle2 className="h-3.5 w-3.5" />}
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Discount Coupon */}
          <div>
            <Label htmlFor="discount" className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
              <Tag className="h-4 w-4 text-primary" />
              Cupom de desconto (opcional)
            </Label>
            <div className="flex gap-2">
              <Input
                id="discount"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
                placeholder="Ex.: CLINICA50 ou código único"
                className="flex-1"
                disabled={discountApplied}
              />
              <Button
                onClick={validateDiscount}
                variant="outline"
                disabled={!discountCode || discountApplied}
              >
                Validar
              </Button>
            </div>
            {discountApplied && (
              <p className="text-xs text-green-600 dark:text-green-400 mt-2 flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Cupom aplicado com sucesso
              </p>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="border-t border-border p-6 bg-muted/20">
          <div className="flex gap-3 justify-end">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleRegisterPayment}
              disabled={loading || items.some(i => !i.description || i.total === 0)}
              className="gap-2 shadow-lg min-w-[200px]"
            >
              {loading ? (
                "Processando..."
              ) : (
                <>
                  <Receipt className="h-4 w-4" />
                  Registrar pagamento
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { DollarSign, CreditCard, Banknote, Smartphone, Receipt, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

interface PaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  appointment: {
    patientName: string;
    service: string;
    value: number;
  };
}

export const PaymentModal = ({ open, onOpenChange, appointment }: PaymentModalProps) => {
  const [paymentMethod, setPaymentMethod] = useState("money");
  const [amount, setAmount] = useState(appointment.value.toString());
  const [loading, setLoading] = useState(false);

  const paymentMethods = [
    { id: "money", label: "Dinheiro", icon: Banknote },
    { id: "credit", label: "Cartão Crédito", icon: CreditCard },
    { id: "debit", label: "Cartão Débito", icon: CreditCard },
    { id: "pix", label: "PIX", icon: Smartphone },
  ];

  const handlePayment = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Pagamento registrado!", {
        description: `R$ ${amount} recebido via ${paymentMethods.find(m => m.id === paymentMethod)?.label}`,
        action: {
          label: "Ver Recibo",
          onClick: () => console.log("Abrir recibo"),
        },
      });
      onOpenChange(false);
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-primary" />
            Registrar Pagamento
          </DialogTitle>
          <DialogDescription>
            Registre o pagamento e emita o recibo automaticamente
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Informações do Paciente e Serviço */}
          <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold text-foreground">{appointment.patientName}</h3>
                <p className="text-sm text-muted-foreground">{appointment.service}</p>
              </div>
              <Badge className="bg-green-500/10 text-green-700 dark:text-green-300 border-green-500/20">
                Valor: R$ {appointment.value.toFixed(2)}
              </Badge>
            </div>
          </div>

          {/* Forma de Pagamento */}
          <div className="space-y-3">
            <Label>Forma de Pagamento</Label>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              <div className="grid grid-cols-2 gap-3">
                {paymentMethods.map((method) => (
                  <div key={method.id}>
                    <RadioGroupItem
                      value={method.id}
                      id={method.id}
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor={method.id}
                      className="flex flex-col items-center gap-2 p-4 rounded-lg border-2 border-muted bg-muted/30 hover:bg-muted/50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer transition-all"
                    >
                      <method.icon className="h-5 w-5" />
                      <span className="text-sm font-medium">{method.label}</span>
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>

          {/* Valor */}
          <div className="space-y-2">
            <Label htmlFor="amount">Valor Recebido</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                R$
              </span>
              <Input
                id="amount"
                type="number"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Troco */}
          {paymentMethod === "money" && parseFloat(amount) > appointment.value && (
            <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <div className="flex items-center justify-between">
                <span className="text-sm text-blue-700 dark:text-blue-300">Troco</span>
                <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">
                  R$ {(parseFloat(amount) - appointment.value).toFixed(2)}
                </span>
              </div>
            </div>
          )}

          {/* Opções de Recibo */}
          <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/30 border border-border/50">
            <Receipt className="h-4 w-4 text-muted-foreground" />
            <p className="text-xs text-muted-foreground">
              Recibo será gerado automaticamente após confirmação
            </p>
          </div>
        </div>

        {/* Ações */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="flex-1"
            disabled={loading}
          >
            Cancelar
          </Button>
          <Button
            onClick={handlePayment}
            className="flex-1"
            disabled={loading || !amount || parseFloat(amount) <= 0}
          >
            {loading ? "Processando..." : "Confirmar Pagamento"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

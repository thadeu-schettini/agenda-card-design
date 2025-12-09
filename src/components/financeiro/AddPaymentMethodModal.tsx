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
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  CreditCard,
  Building2,
  QrCode,
  Banknote,
  CheckCircle2,
  Plus,
  Wallet,
} from "lucide-react";
import { toast } from "sonner";

interface AddPaymentMethodModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const paymentTypes = [
  { id: "credit", name: "Cartão de Crédito", icon: CreditCard, color: "from-blue-500 to-blue-600" },
  { id: "debit", name: "Cartão de Débito", icon: CreditCard, color: "from-emerald-500 to-emerald-600" },
  { id: "pix", name: "PIX", icon: QrCode, color: "from-teal-500 to-cyan-500" },
  { id: "bank", name: "Transferência Bancária", icon: Building2, color: "from-purple-500 to-violet-500" },
  { id: "cash", name: "Dinheiro", icon: Banknote, color: "from-amber-500 to-orange-500" },
];

export function AddPaymentMethodModal({ open, onOpenChange }: AddPaymentMethodModalProps) {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    accountNumber: "",
    bankName: "",
    pixKey: "",
  });
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = () => {
    setIsAdding(true);
    setTimeout(() => {
      setIsAdding(false);
      toast.success("Método de pagamento adicionado com sucesso!");
      onOpenChange(false);
      setStep(1);
      setSelectedType(null);
    }, 1000);
  };

  const renderStep1 = () => (
    <div className="space-y-4 py-4">
      <p className="text-sm text-muted-foreground text-center mb-4">
        Selecione o tipo de método de pagamento que deseja adicionar
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {paymentTypes.map((type) => (
          <div
            key={type.id}
            onClick={() => setSelectedType(type.id)}
            className={cn(
              "p-4 rounded-xl border-2 cursor-pointer transition-all hover:shadow-md",
              selectedType === type.id
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/30"
            )}
          >
            <div className={cn(
              "p-3 rounded-xl bg-gradient-to-br mb-3 w-fit",
              type.color
            )}>
              <type.icon className="h-5 w-5 text-white" />
            </div>
            <p className="font-medium text-sm">{type.name}</p>
            {selectedType === type.id && (
              <CheckCircle2 className="h-4 w-4 text-primary absolute top-2 right-2" />
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderStep2 = () => {
    const type = paymentTypes.find(t => t.id === selectedType);
    if (!type) return null;

    return (
      <div className="space-y-4 py-4">
        <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/30 border">
          <div className={cn("p-3 rounded-xl bg-gradient-to-br", type.color)}>
            <type.icon className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="font-medium">{type.name}</p>
            <p className="text-sm text-muted-foreground">Configurar método de pagamento</p>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Nome de Identificação</Label>
          <Input
            placeholder="Ex: Cartão Principal, PIX Empresarial"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        {(selectedType === "credit" || selectedType === "debit") && (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Últimos 4 dígitos</Label>
              <Input
                placeholder="1234"
                maxLength={4}
                value={formData.accountNumber}
                onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Bandeira</Label>
              <Input
                placeholder="Visa, Mastercard"
                value={formData.bankName}
                onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
              />
            </div>
          </div>
        )}

        {selectedType === "pix" && (
          <div className="space-y-2">
            <Label>Chave PIX</Label>
            <Input
              placeholder="CPF, E-mail, Telefone ou Chave Aleatória"
              value={formData.pixKey}
              onChange={(e) => setFormData({ ...formData, pixKey: e.target.value })}
            />
          </div>
        )}

        {selectedType === "bank" && (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Banco</Label>
              <Input
                placeholder="Nome do Banco"
                value={formData.bankName}
                onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Conta</Label>
              <Input
                placeholder="Número da Conta"
                value={formData.accountNumber}
                onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
              />
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-primary to-primary/70 shadow-lg">
              <Wallet className="h-5 w-5 text-white" />
            </div>
            <div>
              <DialogTitle>Adicionar Método de Pagamento</DialogTitle>
              <p className="text-sm text-muted-foreground">
                {step === 1 ? "Passo 1: Selecione o tipo" : "Passo 2: Configure"}
              </p>
            </div>
          </div>
        </DialogHeader>

        {step === 1 ? renderStep1() : renderStep2()}

        <DialogFooter className="gap-2">
          {step === 2 && (
            <Button variant="outline" onClick={() => setStep(1)}>
              Voltar
            </Button>
          )}
          {step === 1 ? (
            <Button
              onClick={() => setStep(2)}
              disabled={!selectedType}
              className="gap-2"
            >
              Continuar
            </Button>
          ) : (
            <Button onClick={handleAdd} disabled={isAdding} className="gap-2">
              {isAdding ? (
                "Adicionando..."
              ) : (
                <>
                  <Plus className="h-4 w-4" />
                  Adicionar
                </>
              )}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

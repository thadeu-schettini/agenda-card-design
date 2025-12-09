import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  ShoppingCart, 
  Plus, 
  Trash2, 
  Save,
  Send,
  Package,
  AlertTriangle
} from "lucide-react";
import { toast } from "sonner";

interface PurchaseOrderModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const mockSuppliers = [
  { id: 1, name: "MedSupply" },
  { id: 2, name: "PharmaDistrib" },
  { id: 3, name: "CleanMed" },
];

const mockLowStockItems = [
  { id: 1, name: "Seringa 5ml", quantity: 85, minQuantity: 100, unit: "unidades", price: 0.32 },
  { id: 2, name: "Dipirona 500mg", quantity: 12, minQuantity: 50, unit: "caixas", price: 8.50 },
  { id: 3, name: "Esparadrapo", quantity: 45, minQuantity: 60, unit: "rolos", price: 5.80 },
];

export function PurchaseOrderModal({ open, onOpenChange }: PurchaseOrderModalProps) {
  const [supplier, setSupplier] = useState("");
  const [items, setItems] = useState<{ id: number; name: string; quantity: number; price: number }[]>([]);
  const [notes, setNotes] = useState("");

  const handleAddItem = (item: typeof mockLowStockItems[0]) => {
    if (!items.find(i => i.id === item.id)) {
      setItems([...items, { 
        id: item.id, 
        name: item.name, 
        quantity: item.minQuantity - item.quantity,
        price: item.price
      }]);
    }
  };

  const handleRemoveItem = (id: number) => {
    setItems(items.filter(i => i.id !== id));
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    setItems(items.map(i => i.id === id ? { ...i, quantity } : i));
  };

  const total = items.reduce((sum, item) => sum + (item.quantity * item.price), 0);

  const handleSubmit = () => {
    toast.success("Pedido de compra criado com sucesso!");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh]">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
              <ShoppingCart className="h-6 w-6 text-primary" />
            </div>
            <div>
              <DialogTitle>Novo Pedido de Compra</DialogTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Solicite itens aos fornecedores
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-6">
          {/* Left: Low Stock Items */}
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-pending" />
                Itens com Estoque Baixo
              </h4>
              <p className="text-sm text-muted-foreground mb-3">
                Clique para adicionar ao pedido
              </p>
            </div>

            <ScrollArea className="h-[250px] pr-4">
              <div className="space-y-2">
                {mockLowStockItems.map(item => (
                  <div 
                    key={item.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                      items.find(i => i.id === item.id)
                        ? "bg-primary/10 border-primary/20"
                        : "bg-muted/30 hover:bg-muted/50"
                    }`}
                    onClick={() => handleAddItem(item)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Package className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium text-sm">{item.name}</span>
                      </div>
                      <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20 text-xs">
                        {item.quantity}/{item.minQuantity}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between mt-1 text-xs text-muted-foreground">
                      <span>R$ {item.price.toFixed(2)}/{item.unit}</span>
                      <span>Faltam: {item.minQuantity - item.quantity}</span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="space-y-2">
              <Label>Fornecedor</Label>
              <Select value={supplier} onValueChange={setSupplier}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o fornecedor..." />
                </SelectTrigger>
                <SelectContent>
                  {mockSuppliers.map(s => (
                    <SelectItem key={s.id} value={s.name}>{s.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Right: Order Items */}
          <div className="space-y-4">
            <h4 className="font-medium">Itens do Pedido ({items.length})</h4>

            <ScrollArea className="h-[200px] pr-4">
              {items.length === 0 ? (
                <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
                  <p>Clique nos itens ao lado para adicionar</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {items.map(item => (
                    <div key={item.id} className="p-3 rounded-lg border bg-card">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">{item.name}</span>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-6 w-6 text-destructive"
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <Label className="text-xs">Qtd:</Label>
                          <Input 
                            type="number"
                            value={item.quantity}
                            onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value) || 0)}
                            className="w-20 h-8"
                          />
                        </div>
                        <span className="text-sm text-muted-foreground">
                          x R$ {item.price.toFixed(2)}
                        </span>
                        <span className="text-sm font-medium ml-auto">
                          = R$ {(item.quantity * item.price).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>

            <div className="p-4 rounded-lg bg-muted/30">
              <div className="flex items-center justify-between">
                <span className="font-medium">Total Estimado</span>
                <span className="text-xl font-bold text-primary">
                  R$ {total.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Observações</Label>
              <Textarea 
                placeholder="Notas adicionais para o pedido..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="resize-none"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button variant="outline" className="gap-1">
            <Save className="h-4 w-4" />
            Salvar Rascunho
          </Button>
          <Button className="gap-1" onClick={handleSubmit} disabled={items.length === 0 || !supplier}>
            <Send className="h-4 w-4" />
            Enviar Pedido
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

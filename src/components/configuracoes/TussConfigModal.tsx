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
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { Search, Star, Save, X } from "lucide-react";

interface TussItem {
  code: string;
  description: string;
  customLabel: string;
  isDefault: boolean;
  selected: boolean;
}

interface TussConfigModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  table: {
    id: string;
    number: number;
    name: string;
    description: string;
  } | null;
}

export function TussConfigModal({ open, onOpenChange, table }: TussConfigModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock data based on table
  const [items, setItems] = useState<TussItem[]>([
    { code: "1", description: "Eletivo", customLabel: "Eletivo", isDefault: false, selected: false },
    { code: "2", description: "Urgência/Emergência", customLabel: "Urgência/Emergência", isDefault: false, selected: false },
    { code: "3", description: "Prioridade", customLabel: "Prioridade", isDefault: false, selected: false },
    { code: "4", description: "Encaminhamento", customLabel: "Encaminhamento", isDefault: false, selected: false },
  ]);

  const selectedCount = items.filter(i => i.selected).length;

  const handleSelectAll = () => {
    setItems(items.map(i => ({ ...i, selected: true })));
  };

  const handleSelectNone = () => {
    setItems(items.map(i => ({ ...i, selected: false })));
  };

  const handleToggleItem = (code: string) => {
    setItems(items.map(i => 
      i.code === code ? { ...i, selected: !i.selected } : i
    ));
  };

  const handleLabelChange = (code: string, label: string) => {
    setItems(items.map(i => 
      i.code === code ? { ...i, customLabel: label } : i
    ));
  };

  const handleSetDefault = (code: string) => {
    setItems(items.map(i => ({ ...i, isDefault: i.code === code })));
  };

  const handleSave = () => {
    toast.success("Configuração TUSS salva com sucesso!");
    onOpenChange(false);
  };

  const filteredItems = items.filter(i => 
    i.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    i.code.includes(searchQuery)
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-card/95 backdrop-blur-xl border-2 border-primary/20">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">T{table?.number}</span>
            </div>
            <div>
              <span>Configurar Tabela {table?.number}</span>
              <span className="text-muted-foreground font-normal ml-2">- {table?.name}</span>
            </div>
          </DialogTitle>
          <DialogDescription>
            Selecione os itens que deseja disponibilizar no sistema. Você também pode personalizar os rótulos.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Search and Actions */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por código ou descrição..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button variant="outline" size="sm" onClick={handleSelectAll}>
              Todos
            </Button>
            <Button variant="outline" size="sm" onClick={handleSelectNone}>
              Nenhum
            </Button>
          </div>

          {/* Selection Info */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-info" />
              {selectedCount} de {items.length} itens selecionados
            </span>
            <span className="text-xs">(todos serão mostrados se nenhum for selecionado)</span>
          </div>

          {/* Items Table */}
          <ScrollArea className="h-[300px] border rounded-lg">
            <div className="p-4 space-y-2">
              {/* Header */}
              <div className="grid grid-cols-[40px_60px_1fr_1fr_60px] gap-3 px-2 py-2 bg-muted/50 rounded-lg text-sm font-medium text-muted-foreground">
                <span></span>
                <span>Código</span>
                <span>Descrição Original</span>
                <span>Rótulo Personalizado</span>
                <span className="text-center">Padrão</span>
              </div>

              {/* Rows */}
              {filteredItems.map((item) => (
                <div 
                  key={item.code}
                  className={`grid grid-cols-[40px_60px_1fr_1fr_60px] gap-3 px-2 py-3 rounded-lg transition-all items-center ${
                    item.selected ? "bg-primary/5 border border-primary/20" : "hover:bg-muted/30"
                  }`}
                >
                  <div className="flex justify-center">
                    <Checkbox 
                      checked={item.selected}
                      onCheckedChange={() => handleToggleItem(item.code)}
                    />
                  </div>
                  <span className="font-mono text-sm">{item.code}</span>
                  <span className="text-sm">{item.description}</span>
                  <Input
                    value={item.customLabel}
                    onChange={(e) => handleLabelChange(item.code, e.target.value)}
                    className="h-8 text-sm"
                    placeholder={item.description}
                  />
                  <div className="flex justify-center">
                    <button
                      onClick={() => handleSetDefault(item.code)}
                      className={`p-1.5 rounded-lg transition-all ${
                        item.isDefault 
                          ? "text-pending bg-pending/10" 
                          : "text-muted-foreground hover:text-pending hover:bg-pending/5"
                      }`}
                    >
                      <Star className={`h-4 w-4 ${item.isDefault ? "fill-pending" : ""}`} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="gap-2">
            <X className="h-4 w-4" />
            Cancelar
          </Button>
          <Button onClick={handleSave} className="gap-2">
            <Save className="h-4 w-4" />
            Salvar Configuração
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

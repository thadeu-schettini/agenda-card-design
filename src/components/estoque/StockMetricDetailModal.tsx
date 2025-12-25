import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Package,
  TrendingDown,
  AlertTriangle,
  ShoppingCart,
  Search,
  Filter,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface StockMetricDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  metricType: "total" | "low" | "critical" | "value";
}

const mockData = {
  total: {
    title: "Total de Itens em Estoque",
    description: "Visão geral de todos os itens cadastrados no sistema",
    value: 234,
    change: 12,
    changeType: "up" as const,
    icon: Package,
    color: "from-primary to-primary/70",
    items: [
      { name: "Luvas de Procedimento M", category: "Materiais", quantity: 450, unit: "pares", status: "ok" },
      { name: "Seringa 5ml", category: "Materiais", quantity: 85, unit: "unidades", status: "low" },
      { name: "Dipirona 500mg", category: "Medicamentos", quantity: 12, unit: "caixas", status: "critical" },
      { name: "Álcool 70%", category: "Limpeza", quantity: 35, unit: "litros", status: "ok" },
      { name: "Gaze Estéril", category: "Materiais", quantity: 180, unit: "pacotes", status: "ok" },
    ],
  },
  low: {
    title: "Itens com Estoque Baixo",
    description: "Itens que estão abaixo do nível mínimo recomendado",
    value: 8,
    change: 3,
    changeType: "up" as const,
    icon: TrendingDown,
    color: "from-pending to-pending/70",
    items: [
      { name: "Seringa 5ml", category: "Materiais", quantity: 85, unit: "unidades", minQuantity: 100, status: "low" },
      { name: "Esparadrapo", category: "Materiais", quantity: 45, unit: "rolos", minQuantity: 60, status: "low" },
      { name: "Máscara N95", category: "EPIs", quantity: 25, unit: "unidades", minQuantity: 50, status: "low" },
    ],
  },
  critical: {
    title: "Itens em Nível Crítico",
    description: "Itens que precisam de reposição imediata",
    value: 3,
    change: 1,
    changeType: "down" as const,
    icon: AlertTriangle,
    color: "from-destructive to-destructive/70",
    items: [
      { name: "Dipirona 500mg", category: "Medicamentos", quantity: 12, unit: "caixas", minQuantity: 50, status: "critical" },
      { name: "Paracetamol 750mg", category: "Medicamentos", quantity: 5, unit: "caixas", minQuantity: 30, status: "critical" },
      { name: "Agulha 25x7", category: "Materiais", quantity: 8, unit: "caixas", minQuantity: 40, status: "critical" },
    ],
  },
  value: {
    title: "Valor Total do Estoque",
    description: "Análise financeira do inventário atual",
    value: "R$ 45.2k",
    change: 8.5,
    changeType: "up" as const,
    icon: ShoppingCart,
    color: "from-info to-info/70",
    items: [
      { name: "Equipamento Ultrassom", category: "Equipamentos", quantity: 1, unit: "unidade", value: 15000, status: "ok" },
      { name: "Luvas de Procedimento", category: "Materiais", quantity: 450, unit: "pares", value: 2025, status: "ok" },
      { name: "Medicamentos Diversos", category: "Medicamentos", quantity: 234, unit: "itens", value: 8500, status: "ok" },
    ],
  },
};

export function StockMetricDetailModal({ open, onOpenChange, metricType }: StockMetricDetailModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const data = mockData[metricType];

  const statusColors = {
    ok: "bg-confirmed/10 text-confirmed border-confirmed/20",
    low: "bg-pending/10 text-pending border-pending/20",
    critical: "bg-destructive/10 text-destructive border-destructive/20",
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[85vh] bg-card/95 backdrop-blur-xl border-2 border-primary/20">
        <DialogHeader>
          <div className="flex items-center gap-4">
            <div className={cn(
              "h-14 w-14 rounded-2xl bg-gradient-to-br flex items-center justify-center shadow-lg",
              data.color
            )}>
              <data.icon className="h-7 w-7 text-white" />
            </div>
            <div>
              <DialogTitle className="text-xl">{data.title}</DialogTitle>
              <p className="text-sm text-muted-foreground mt-1">{data.description}</p>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Main Metric */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-gradient-to-br from-muted/50 to-muted/30 border">
              <p className="text-sm text-muted-foreground">Valor Atual</p>
              <p className="text-3xl font-bold mt-1">{data.value}</p>
              <div className={cn(
                "flex items-center gap-1 mt-2 text-sm",
                data.changeType === "up" 
                  ? metricType === "critical" || metricType === "low" ? "text-destructive" : "text-confirmed"
                  : metricType === "critical" || metricType === "low" ? "text-confirmed" : "text-destructive"
              )}>
                {data.changeType === "up" ? (
                  <ArrowUpRight className="h-4 w-4" />
                ) : (
                  <ArrowDownRight className="h-4 w-4" />
                )}
                <span>{data.change}% vs mês anterior</span>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-br from-muted/50 to-muted/30 border">
              <p className="text-sm text-muted-foreground">Última Atualização</p>
              <p className="text-lg font-semibold mt-1">Há 2 horas</p>
              <div className="flex items-center gap-1 mt-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Atualização automática</span>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-br from-muted/50 to-muted/30 border">
              <p className="text-sm text-muted-foreground">Itens Listados</p>
              <p className="text-lg font-semibold mt-1">{data.items.length} itens</p>
              <Button variant="outline" size="sm" className="mt-2 gap-1">
                <Download className="h-3 w-3" />
                Exportar
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="overview">Visão Geral</TabsTrigger>
              <TabsTrigger value="details">Detalhes</TabsTrigger>
              <TabsTrigger value="history">Histórico</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-4">
              <div className="space-y-4">
                {/* Search */}
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar item..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>

                {/* Items List */}
                <ScrollArea className="h-[250px]">
                  <div className="space-y-2">
                    {data.items.map((item, index) => (
                      <div 
                        key={index}
                        className="flex items-center justify-between p-3 rounded-xl border bg-card hover:bg-muted/30 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-muted/50 flex items-center justify-center">
                            <Package className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-xs text-muted-foreground">{item.category}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="font-semibold">
                              {typeof item.value !== 'undefined' 
                                ? `R$ ${item.value.toLocaleString()}`
                                : `${item.quantity} ${item.unit}`
                              }
                            </p>
                            {'minQuantity' in item && (
                              <div className="flex items-center gap-2 mt-1">
                                <Progress 
                                  value={(item.quantity / (item.minQuantity * 2)) * 100} 
                                  className={cn(
                                    "w-16 h-1.5",
                                    item.status === "critical" && "[&>div]:bg-destructive",
                                    item.status === "low" && "[&>div]:bg-pending",
                                    item.status === "ok" && "[&>div]:bg-confirmed"
                                  )}
                                />
                                <span className="text-xs text-muted-foreground">
                                  min: {item.minQuantity}
                                </span>
                              </div>
                            )}
                          </div>
                          <Badge variant="outline" className={statusColors[item.status as keyof typeof statusColors]}>
                            {item.status === "ok" && "Normal"}
                            {item.status === "low" && "Baixo"}
                            {item.status === "critical" && "Crítico"}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </TabsContent>

            <TabsContent value="details" className="mt-4">
              <div className="p-8 text-center text-muted-foreground">
                <Package className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>Análise detalhada por categoria e fornecedor</p>
                <p className="text-sm mt-1">Disponível em breve</p>
              </div>
            </TabsContent>

            <TabsContent value="history" className="mt-4">
              <div className="p-8 text-center text-muted-foreground">
                <Calendar className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>Histórico de movimentações e tendências</p>
                <p className="text-sm mt-1">Disponível em breve</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="gap-2">
            <X className="h-4 w-4" />
            Fechar
          </Button>
          <Button className="gap-2">
            <Download className="h-4 w-4" />
            Exportar Relatório
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

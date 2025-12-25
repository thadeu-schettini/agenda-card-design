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
  ShoppingCart,
  Truck,
  CheckCircle2,
  DollarSign,
  Search,
  Filter,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  X,
  Building2,
  Package,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PurchaseMetricDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  metricType: "active" | "transit" | "delivered" | "total";
}

const mockData = {
  active: {
    title: "Pedidos Ativos",
    description: "Pedidos pendentes, aprovados e em trânsito",
    value: 12,
    change: 5,
    changeType: "up" as const,
    icon: ShoppingCart,
    color: "from-primary to-primary/70",
    items: [
      { id: "PC-2025-001", supplier: "MedSupply", items: 5, value: 1250, status: "approved", date: "10/01/2025" },
      { id: "PC-2025-002", supplier: "PharmaDistrib", items: 3, value: 890, status: "transit", date: "09/01/2025" },
      { id: "PC-2025-003", supplier: "CleanMed", items: 8, value: 456, status: "pending", date: "08/01/2025" },
      { id: "PC-2025-004", supplier: "MedSupply", items: 2, value: 2300, status: "pending", date: "07/01/2025" },
    ],
  },
  transit: {
    title: "Em Trânsito",
    description: "Pedidos que estão a caminho da clínica",
    value: 4,
    change: 2,
    changeType: "up" as const,
    icon: Truck,
    color: "from-info to-info/70",
    items: [
      { id: "PC-2025-002", supplier: "PharmaDistrib", items: 3, value: 890, status: "transit", expected: "15/01/2025", progress: 65 },
      { id: "PC-2025-006", supplier: "MedSupply", items: 7, value: 1580, status: "transit", expected: "16/01/2025", progress: 45 },
      { id: "PC-2025-007", supplier: "CleanMed", items: 4, value: 320, status: "transit", expected: "14/01/2025", progress: 85 },
    ],
  },
  delivered: {
    title: "Entregues no Mês",
    description: "Pedidos que foram recebidos este mês",
    value: 23,
    change: 15,
    changeType: "up" as const,
    icon: CheckCircle2,
    color: "from-confirmed to-confirmed/70",
    items: [
      { id: "PC-2024-089", supplier: "MedSupply", items: 5, value: 1250, status: "delivered", deliveredAt: "12/01/2025" },
      { id: "PC-2024-088", supplier: "PharmaDistrib", items: 12, value: 3450, status: "delivered", deliveredAt: "10/01/2025" },
      { id: "PC-2024-087", supplier: "CleanMed", items: 3, value: 189, status: "delivered", deliveredAt: "08/01/2025" },
      { id: "PC-2024-086", supplier: "Diagnósticos Plus", items: 2, value: 5600, status: "delivered", deliveredAt: "05/01/2025" },
    ],
  },
  total: {
    title: "Total Gasto no Mês",
    description: "Valor total investido em compras",
    value: "R$ 15.8k",
    change: 8.5,
    changeType: "up" as const,
    icon: DollarSign,
    color: "from-pending to-pending/70",
    items: [
      { supplier: "MedSupply", orders: 8, value: 6500, percentage: 41 },
      { supplier: "PharmaDistrib", orders: 5, value: 4200, percentage: 27 },
      { supplier: "CleanMed", orders: 6, value: 2800, percentage: 18 },
      { supplier: "Diagnósticos Plus", orders: 3, value: 2300, percentage: 14 },
    ],
  },
};

export function PurchaseMetricDetailModal({ open, onOpenChange, metricType }: PurchaseMetricDetailModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const data = mockData[metricType];

  const statusColors = {
    pending: "bg-pending/10 text-pending border-pending/20",
    approved: "bg-info/10 text-info border-info/20",
    transit: "bg-primary/10 text-primary border-primary/20",
    delivered: "bg-confirmed/10 text-confirmed border-confirmed/20",
  };

  const statusLabels = {
    pending: "Pendente",
    approved: "Aprovado",
    transit: "Em Trânsito",
    delivered: "Entregue",
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
                data.changeType === "up" ? "text-confirmed" : "text-destructive"
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
              <p className="text-sm text-muted-foreground">Período</p>
              <p className="text-lg font-semibold mt-1">Janeiro 2025</p>
              <div className="flex items-center gap-1 mt-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>01/01 - 25/01</span>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-br from-muted/50 to-muted/30 border">
              <p className="text-sm text-muted-foreground">Registros</p>
              <p className="text-lg font-semibold mt-1">{data.items.length} {metricType === "total" ? "fornecedores" : "pedidos"}</p>
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
              <TabsTrigger value="trends">Tendências</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-4">
              <div className="space-y-4">
                {/* Search */}
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar..."
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
                    {metricType === "total" ? (
                      // Supplier breakdown for total
                      data.items.map((item: any, index) => (
                        <div 
                          key={index}
                          className="flex items-center justify-between p-3 rounded-xl border bg-card hover:bg-muted/30 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg bg-muted/50 flex items-center justify-center">
                              <Building2 className="h-5 w-5 text-muted-foreground" />
                            </div>
                            <div>
                              <p className="font-medium">{item.supplier}</p>
                              <p className="text-xs text-muted-foreground">{item.orders} pedidos</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <p className="font-semibold text-primary">
                                R$ {item.value.toLocaleString()}
                              </p>
                              <div className="flex items-center gap-2 mt-1">
                                <Progress 
                                  value={item.percentage} 
                                  className="w-16 h-1.5"
                                />
                                <span className="text-xs text-muted-foreground">
                                  {item.percentage}%
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      // Order list for other types
                      data.items.map((item: any, index) => (
                        <div 
                          key={index}
                          className="flex items-center justify-between p-3 rounded-xl border bg-card hover:bg-muted/30 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg bg-muted/50 flex items-center justify-center">
                              <ShoppingCart className="h-5 w-5 text-muted-foreground" />
                            </div>
                            <div>
                              <p className="font-medium">{item.id}</p>
                              <p className="text-xs text-muted-foreground flex items-center gap-1">
                                <Building2 className="h-3 w-3" />
                                {item.supplier}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <p className="font-semibold text-primary">
                                R$ {item.value.toLocaleString()}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {item.items} itens
                              </p>
                              {'progress' in item && (
                                <div className="flex items-center gap-2 mt-1">
                                  <Progress value={item.progress} className="w-16 h-1.5" />
                                  <span className="text-xs">{item.progress}%</span>
                                </div>
                              )}
                            </div>
                            <Badge variant="outline" className={statusColors[item.status as keyof typeof statusColors]}>
                              {statusLabels[item.status as keyof typeof statusLabels]}
                            </Badge>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </ScrollArea>
              </div>
            </TabsContent>

            <TabsContent value="details" className="mt-4">
              <div className="p-8 text-center text-muted-foreground">
                <Package className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>Análise detalhada por categoria e período</p>
                <p className="text-sm mt-1">Disponível em breve</p>
              </div>
            </TabsContent>

            <TabsContent value="trends" className="mt-4">
              <div className="p-8 text-center text-muted-foreground">
                <Calendar className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>Gráficos de tendência e projeções</p>
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

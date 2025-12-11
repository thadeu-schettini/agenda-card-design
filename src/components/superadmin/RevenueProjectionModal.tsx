import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, DollarSign, Target, Calendar, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from "recharts";

interface RevenueProjectionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const monthlyData = [
  { month: "Jan", real: 145000, projetado: 140000 },
  { month: "Fev", real: 152000, projetado: 148000 },
  { month: "Mar", real: 168000, projetado: 155000 },
  { month: "Abr", real: 175000, projetado: 165000 },
  { month: "Mai", real: 182000, projetado: 175000 },
  { month: "Jun", real: 195000, projetado: 185000 },
  { month: "Jul", real: null, projetado: 198000 },
  { month: "Ago", real: null, projetado: 210000 },
  { month: "Set", real: null, projetado: 225000 },
  { month: "Out", real: null, projetado: 238000 },
  { month: "Nov", real: null, projetado: 250000 },
  { month: "Dez", real: null, projetado: 265000 },
];

const revenueByPlan = [
  { plan: "Starter", revenue: 45000, percentage: 15 },
  { plan: "Professional", revenue: 125000, percentage: 42 },
  { plan: "Enterprise", revenue: 130000, percentage: 43 },
];

const chartConfig = {
  real: { label: "Receita Real", color: "hsl(var(--primary))" },
  projetado: { label: "Projeção", color: "hsl(var(--muted-foreground))" },
};

export function RevenueProjectionModal({ open, onOpenChange }: RevenueProjectionModalProps) {
  const [scenario, setScenario] = useState("moderate");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Previsão de Receita e Projeções Financeiras
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-br from-primary/10 to-transparent">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="h-4 w-4 text-primary" />
                  <span className="text-sm text-muted-foreground">MRR Atual</span>
                </div>
                <div className="text-2xl font-bold">R$ 195.000</div>
                <div className="flex items-center gap-1 text-xs text-success">
                  <ArrowUpRight className="h-3 w-3" /> +7.1% vs mês anterior
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-success/10 to-transparent">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="h-4 w-4 text-success" />
                  <span className="text-sm text-muted-foreground">ARR Projetado</span>
                </div>
                <div className="text-2xl font-bold">R$ 2.65M</div>
                <div className="flex items-center gap-1 text-xs text-success">
                  <ArrowUpRight className="h-3 w-3" /> +36% YoY
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-info/10 to-transparent">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="h-4 w-4 text-info" />
                  <span className="text-sm text-muted-foreground">Meta Trimestre</span>
                </div>
                <div className="text-2xl font-bold">R$ 633.000</div>
                <Badge variant="secondary" className="mt-1">78% atingido</Badge>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-warning/10 to-transparent">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-warning" />
                  <span className="text-sm text-muted-foreground">Net Revenue Retention</span>
                </div>
                <div className="text-2xl font-bold">118%</div>
                <div className="flex items-center gap-1 text-xs text-success">
                  <ArrowUpRight className="h-3 w-3" /> Expansão saudável
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base">Projeção de Receita 2024</CardTitle>
              <Select value={scenario} onValueChange={setScenario}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="conservative">Conservador</SelectItem>
                  <SelectItem value="moderate">Moderado</SelectItem>
                  <SelectItem value="optimistic">Otimista</SelectItem>
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[280px] w-full">
                <AreaChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis className="text-xs" tickFormatter={(v) => `${v/1000}k`} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="projetado"
                    stroke="hsl(var(--muted-foreground))"
                    fill="hsl(var(--muted-foreground) / 0.1)"
                    strokeDasharray="5 5"
                  />
                  <Area
                    type="monotone"
                    dataKey="real"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary) / 0.2)"
                  />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Receita por Plano</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {revenueByPlan.map((item) => (
                    <div key={item.plan} className="flex items-center gap-4">
                      <div className="w-24 font-medium">{item.plan}</div>
                      <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                      <div className="w-24 text-right text-sm">
                        R$ {(item.revenue / 1000).toFixed(0)}k
                      </div>
                      <div className="w-12 text-right text-sm text-muted-foreground">
                        {item.percentage}%
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Indicadores Financeiros</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-2 rounded-lg bg-muted/50">
                    <span className="text-sm">LTV Médio</span>
                    <span className="font-bold">R$ 18.450</span>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded-lg bg-muted/50">
                    <span className="text-sm">CAC</span>
                    <span className="font-bold">R$ 1.850</span>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded-lg bg-muted/50">
                    <span className="text-sm">LTV:CAC Ratio</span>
                    <Badge variant="default">10:1</Badge>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded-lg bg-muted/50">
                    <span className="text-sm">Payback Period</span>
                    <span className="font-bold">3.2 meses</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

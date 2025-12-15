import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserCheck, TrendingUp, TrendingDown, Download, UserX, Phone, MessageSquare } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

interface AttendanceDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const monthlyAttendance = [
  { month: "Jan", comparecimento: 91, noShow: 9 },
  { month: "Fev", comparecimento: 93, noShow: 7 },
  { month: "Mar", comparecimento: 89, noShow: 11 },
  { month: "Abr", comparecimento: 94, noShow: 6 },
  { month: "Mai", comparecimento: 92, noShow: 8 },
  { month: "Jun", comparecimento: 94, noShow: 6 },
];

const noShowReasons = [
  { name: "Esquecimento", value: 35, color: "hsl(var(--warning))" },
  { name: "Emergência", value: 25, color: "hsl(var(--destructive))" },
  { name: "Transporte", value: 20, color: "hsl(var(--primary))" },
  { name: "Trabalho", value: 15, color: "hsl(var(--info))" },
  { name: "Outros", value: 5, color: "hsl(var(--muted))" },
];

const byDayOfWeek = [
  { dia: "Segunda", taxa: 92 },
  { dia: "Terça", taxa: 95 },
  { dia: "Quarta", taxa: 91 },
  { dia: "Quinta", taxa: 94 },
  { dia: "Sexta", taxa: 88 },
  { dia: "Sábado", taxa: 96 },
];

const reminderEffectiveness = [
  { tipo: "Sem Lembrete", taxa: 78 },
  { tipo: "Email", taxa: 85 },
  { tipo: "SMS", taxa: 91 },
  { tipo: "WhatsApp", taxa: 96 },
  { tipo: "Ligação", taxa: 98 },
];

export function AttendanceDetailModal({ open, onOpenChange }: AttendanceDetailModalProps) {
  const [period, setPeriod] = useState("6meses");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-success to-success shadow-lg">
                <UserCheck className="h-5 w-5 text-white" />
              </div>
              <div>
                <DialogTitle className="text-xl">Taxa de Comparecimento</DialogTitle>
                <p className="text-sm text-muted-foreground">Análise de presença e no-shows</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Select value={period} onValueChange={setPeriod}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30dias">30 dias</SelectItem>
                  <SelectItem value="3meses">3 meses</SelectItem>
                  <SelectItem value="6meses">6 meses</SelectItem>
                  <SelectItem value="12meses">12 meses</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Summary Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Card className="border-border/50">
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground">Taxa Atual</p>
                <p className="text-xl font-bold text-success">94%</p>
                <div className="flex items-center gap-1 text-xs text-success mt-1">
                  <TrendingUp className="h-3 w-3" />
                  +2% vs mês anterior
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground">No-Shows (Mês)</p>
                <p className="text-xl font-bold text-destructive">18</p>
                <div className="flex items-center gap-1 text-xs text-success mt-1">
                  <TrendingDown className="h-3 w-3" />
                  -5 vs mês anterior
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground">Receita Perdida</p>
                <p className="text-xl font-bold text-warning">R$ 2.7k</p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                  <UserX className="h-3 w-3" />
                  Estimativa mensal
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground">Meta</p>
                <p className="text-xl font-bold text-primary">95%</p>
                <div className="flex items-center gap-1 text-xs text-warning mt-1">
                  -1pp para atingir
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Trend Chart */}
          <Card className="border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Evolução da Taxa de Comparecimento</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyAttendance}>
                    <defs>
                      <linearGradient id="colorComparecimento" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--success))" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(var(--success))" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis domain={[80, 100]} stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(v) => `${v}%`} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                      formatter={(value: number) => [`${value}%`, "Taxa"]}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="comparecimento" 
                      stroke="hsl(var(--success))" 
                      strokeWidth={2} 
                      fillOpacity={1} 
                      fill="url(#colorComparecimento)" 
                      name="Comparecimento"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Charts Row */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* No-Show Reasons */}
            <Card className="border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Motivos de No-Show</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={noShowReasons}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={75}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {noShowReasons.map((entry, index) => (
                          <Cell key={index} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value: number) => [`${value}%`, "Percentual"]} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {noShowReasons.map((item) => (
                    <div key={item.name} className="flex items-center gap-2 text-sm">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-muted-foreground">{item.name}:</span>
                      <span className="font-medium">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* By Day of Week */}
            <Card className="border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Por Dia da Semana</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={byDayOfWeek} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis type="number" domain={[80, 100]} stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(v) => `${v}%`} />
                      <YAxis type="category" dataKey="dia" stroke="hsl(var(--muted-foreground))" fontSize={11} width={60} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                        formatter={(value: number) => [`${value}%`, "Taxa"]}
                      />
                      <Bar dataKey="taxa" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} name="Taxa" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Reminder Effectiveness */}
          <Card className="border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Efetividade dos Lembretes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {reminderEffectiveness.map((item) => (
                  <div key={item.tipo} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{item.tipo}</span>
                      <span className="text-muted-foreground">{item.taxa}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-primary to-success rounded-full transition-all duration-500"
                        style={{ width: `${item.taxa}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 rounded-lg bg-success/10 border border-success/20">
                <div className="flex items-start gap-2">
                  <Phone className="h-4 w-4 text-success mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-success">Recomendação</p>
                    <p className="text-xs text-muted-foreground">
                      Priorize lembretes via WhatsApp e ligação para reduzir no-shows em até 20%
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
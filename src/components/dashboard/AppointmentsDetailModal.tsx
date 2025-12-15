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
import { Calendar, TrendingUp, Clock, CheckCircle, XCircle, Download, Users } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";

interface AppointmentsDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const weeklyData = [
  { day: "Seg", agendados: 28, realizados: 26, cancelados: 2 },
  { day: "Ter", agendados: 32, realizados: 30, cancelados: 2 },
  { day: "Qua", agendados: 35, realizados: 31, cancelados: 4 },
  { day: "Qui", agendados: 30, realizados: 28, cancelados: 2 },
  { day: "Sex", agendados: 25, realizados: 23, cancelados: 2 },
  { day: "Sáb", agendados: 18, realizados: 17, cancelados: 1 },
];

const statusDistribution = [
  { name: "Confirmados", value: 18, color: "hsl(var(--success))" },
  { name: "Pendentes", value: 4, color: "hsl(var(--warning))" },
  { name: "Em Atendimento", value: 2, color: "hsl(var(--primary))" },
];

const hourlyData = [
  { hora: "08h", pacientes: 3 },
  { hora: "09h", pacientes: 4 },
  { hora: "10h", pacientes: 5 },
  { hora: "11h", pacientes: 4 },
  { hora: "12h", pacientes: 2 },
  { hora: "13h", pacientes: 1 },
  { hora: "14h", pacientes: 4 },
  { hora: "15h", pacientes: 5 },
  { hora: "16h", pacientes: 4 },
  { hora: "17h", pacientes: 3 },
  { hora: "18h", pacientes: 2 },
];

const serviceTypes = [
  { servico: "Consulta", quantidade: 12, receita: 2400 },
  { servico: "Retorno", quantidade: 5, receita: 500 },
  { servico: "Exame", quantidade: 4, receita: 1200 },
  { servico: "Procedimento", quantidade: 3, receita: 1800 },
];

export function AppointmentsDetailModal({ open, onOpenChange }: AppointmentsDetailModalProps) {
  const [period, setPeriod] = useState("hoje");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-primary to-info shadow-lg">
                <Calendar className="h-5 w-5 text-white" />
              </div>
              <div>
                <DialogTitle className="text-xl">Agendamentos de Hoje</DialogTitle>
                <p className="text-sm text-muted-foreground">Visão detalhada da agenda</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Select value={period} onValueChange={setPeriod}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hoje">Hoje</SelectItem>
                  <SelectItem value="semana">Esta Semana</SelectItem>
                  <SelectItem value="mes">Este Mês</SelectItem>
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
                <p className="text-xs text-muted-foreground">Total Hoje</p>
                <p className="text-xl font-bold text-primary">24</p>
                <div className="flex items-center gap-1 text-xs text-success mt-1">
                  <TrendingUp className="h-3 w-3" />
                  +12% vs semana
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground">Confirmados</p>
                <p className="text-xl font-bold text-success">18</p>
                <div className="flex items-center gap-1 text-xs mt-1">
                  <CheckCircle className="h-3 w-3 text-success" />
                  75% do total
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground">Pendentes</p>
                <p className="text-xl font-bold text-warning">4</p>
                <div className="flex items-center gap-1 text-xs text-warning mt-1">
                  <Clock className="h-3 w-3" />
                  Aguardando confirmação
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground">Cancelados</p>
                <p className="text-xl font-bold text-destructive">2</p>
                <div className="flex items-center gap-1 text-xs text-destructive mt-1">
                  <XCircle className="h-3 w-3" />
                  8.3% do total
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Hourly Distribution */}
          <Card className="border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Distribuição por Horário</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={hourlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="hora" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar dataKey="pacientes" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Pacientes" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Charts Row */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Status Distribution */}
            <Card className="border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Status dos Agendamentos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={statusDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={75}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {statusDistribution.map((entry, index) => (
                          <Cell key={index} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center gap-4 mt-4">
                  {statusDistribution.map((item) => (
                    <div key={item.name} className="flex items-center gap-2 text-sm">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-muted-foreground">{item.name}:</span>
                      <span className="font-medium">{item.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Weekly Trend */}
            <Card className="border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Tendência Semanal</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={weeklyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Line type="monotone" dataKey="agendados" stroke="hsl(var(--primary))" strokeWidth={2} name="Agendados" />
                      <Line type="monotone" dataKey="realizados" stroke="hsl(var(--success))" strokeWidth={2} name="Realizados" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Services Table */}
          <Card className="border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Por Tipo de Serviço</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {serviceTypes.map((service) => (
                  <div key={service.servico} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{service.servico}</p>
                        <p className="text-xs text-muted-foreground">{service.quantidade} agendamentos</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="font-semibold">
                      R$ {service.receita.toLocaleString('pt-BR')}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
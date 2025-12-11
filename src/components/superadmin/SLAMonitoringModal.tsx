import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock, AlertTriangle, CheckCircle2, TrendingUp, Timer, Users, Target } from "lucide-react";
import { ChartContainer } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

interface SLAMonitoringModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const responseTimeData = [
  { hour: "00h", time: 2.3 },
  { hour: "04h", time: 1.8 },
  { hour: "08h", time: 4.5 },
  { hour: "12h", time: 6.2 },
  { hour: "16h", time: 5.1 },
  { hour: "20h", time: 3.2 },
];

const teamPerformance = [
  { name: "Ana Paula", tickets: 45, avgTime: "2.3 min", satisfaction: 98, status: "online" },
  { name: "Carlos Silva", tickets: 38, avgTime: "3.1 min", satisfaction: 95, status: "online" },
  { name: "Marina Santos", tickets: 52, avgTime: "1.8 min", satisfaction: 99, status: "away" },
  { name: "Pedro Costa", tickets: 29, avgTime: "4.2 min", satisfaction: 92, status: "offline" },
];

const slaMetrics = [
  { name: "Tempo Primeira Resposta", target: "5 min", current: "3.2 min", compliance: 94 },
  { name: "Tempo de Resolução", target: "4 horas", current: "2.8 horas", compliance: 89 },
  { name: "Taxa de Resolução 1º Contato", target: "70%", current: "76%", compliance: 100 },
  { name: "Satisfação do Cliente", target: "90%", current: "96%", compliance: 100 },
];

const chartConfig = {
  time: { label: "Tempo (min)", color: "hsl(var(--primary))" },
};

export function SLAMonitoringModal({ open, onOpenChange }: SLAMonitoringModalProps) {
  const [period, setPeriod] = useState("today");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online": return "bg-success";
      case "away": return "bg-warning";
      default: return "bg-muted-foreground";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Monitoramento de SLA
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Card className="px-4 py-2 bg-gradient-to-br from-success/10 to-transparent">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                  <span className="text-sm text-muted-foreground">Compliance Geral</span>
                </div>
                <div className="text-2xl font-bold text-success">95.8%</div>
              </Card>
              <Card className="px-4 py-2 bg-gradient-to-br from-primary/10 to-transparent">
                <div className="flex items-center gap-2">
                  <Timer className="h-4 w-4 text-primary" />
                  <span className="text-sm text-muted-foreground">Tempo Médio</span>
                </div>
                <div className="text-2xl font-bold">3.2 min</div>
              </Card>
              <Card className="px-4 py-2 bg-gradient-to-br from-warning/10 to-transparent">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-warning" />
                  <span className="text-sm text-muted-foreground">Tickets em Risco</span>
                </div>
                <div className="text-2xl font-bold text-warning">3</div>
              </Card>
            </div>
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Hoje</SelectItem>
                <SelectItem value="week">Esta Semana</SelectItem>
                <SelectItem value="month">Este Mês</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {slaMetrics.map((metric) => (
              <Card key={metric.name}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{metric.name}</span>
                    <Badge variant={metric.compliance >= 90 ? "default" : "destructive"}>
                      {metric.compliance}%
                    </Badge>
                  </div>
                  <Progress value={metric.compliance} className="h-2 mb-2" />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Meta: {metric.target}</span>
                    <span>Atual: {metric.current}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Tempo de Resposta por Hora</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[200px] w-full">
                <LineChart data={responseTimeData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="hour" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Line
                    type="monotone"
                    dataKey="time"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--primary))" }}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Users className="h-4 w-4" />
                Performance da Equipe
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {teamPerformance.map((member) => (
                  <div key={member.name} className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                    <div className="relative">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center font-medium">
                        {member.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background ${getStatusColor(member.status)}`} />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{member.name}</div>
                      <div className="text-sm text-muted-foreground">{member.tickets} tickets resolvidos</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-medium">{member.avgTime}</div>
                      <div className="text-xs text-muted-foreground">tempo médio</div>
                    </div>
                    <div className="text-center">
                      <Badge variant={member.satisfaction >= 95 ? "default" : "secondary"}>
                        {member.satisfaction}%
                      </Badge>
                      <div className="text-xs text-muted-foreground mt-1">satisfação</div>
                    </div>
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

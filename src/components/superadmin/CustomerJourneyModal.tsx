import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Route, Clock, Users, CheckCircle2, ArrowRight, TrendingUp, AlertTriangle } from "lucide-react";
import { ChartContainer } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell } from "recharts";

interface CustomerJourneyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const journeySteps = [
  { step: "Signup", users: 1000, time: "0 min", conversion: 100, dropoff: 0 },
  { step: "Email Verificado", users: 920, time: "5 min", conversion: 92, dropoff: 8 },
  { step: "Perfil Completo", users: 756, time: "1.2 dias", conversion: 82, dropoff: 18 },
  { step: "1º Paciente", users: 623, time: "2.4 dias", conversion: 82, dropoff: 18 },
  { step: "1º Agendamento", users: 534, time: "3.1 dias", conversion: 86, dropoff: 14 },
  { step: "Upgrade Plano", users: 287, time: "14 dias", conversion: 54, dropoff: 46 },
];

const activationByPlan = [
  { plan: "Starter", avgDays: 4.2, rate: 68 },
  { plan: "Professional", avgDays: 2.8, rate: 82 },
  { plan: "Enterprise", avgDays: 1.5, rate: 94 },
];

const chartConfig = {
  users: { label: "Usuários", color: "hsl(var(--primary))" },
};

export function CustomerJourneyModal({ open, onOpenChange }: CustomerJourneyModalProps) {
  const [cohort, setCohort] = useState("all");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Route className="h-5 w-5 text-primary" />
            Análise de Jornada do Cliente
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-br from-primary/10 to-transparent">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span className="text-sm text-muted-foreground">Tempo até Ativação</span>
                </div>
                <div className="text-2xl font-bold">2.4 dias</div>
                <Badge variant="secondary" className="mt-1">Mediana</Badge>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-success/10 to-transparent">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                  <span className="text-sm text-muted-foreground">Taxa de Ativação</span>
                </div>
                <div className="text-2xl font-bold">76%</div>
                <Badge className="bg-success/20 text-success mt-1">+5% vs mês anterior</Badge>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-info/10 to-transparent">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-4 w-4 text-info" />
                  <span className="text-sm text-muted-foreground">Em Onboarding</span>
                </div>
                <div className="text-2xl font-bold">234</div>
                <span className="text-xs text-muted-foreground">clínicas ativas</span>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-warning/10 to-transparent">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-4 w-4 text-warning" />
                  <span className="text-sm text-muted-foreground">Em Risco</span>
                </div>
                <div className="text-2xl font-bold">18</div>
                <span className="text-xs text-muted-foreground">clínicas paradas</span>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base">Funil de Ativação</CardTitle>
              <Select value={cohort} onValueChange={setCohort}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="starter">Starter</SelectItem>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="enterprise">Enterprise</SelectItem>
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 overflow-x-auto pb-4">
                {journeySteps.map((step, index) => (
                  <div key={step.step} className="flex items-center">
                    <div className="min-w-[140px] p-4 rounded-xl bg-gradient-to-b from-primary/10 to-transparent border text-center">
                      <div className="text-xs text-muted-foreground mb-1">{step.step}</div>
                      <div className="text-2xl font-bold text-primary">{step.users}</div>
                      <div className="text-xs text-muted-foreground mt-1">{step.time}</div>
                      {step.dropoff > 0 && (
                        <Badge variant="destructive" className="mt-2 text-xs">
                          -{step.dropoff}%
                        </Badge>
                      )}
                    </div>
                    {index < journeySteps.length - 1 && (
                      <div className="flex flex-col items-center mx-2">
                        <ArrowRight className="h-5 w-5 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{step.conversion}%</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Tempo de Ativação por Plano</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activationByPlan.map((item) => (
                    <div key={item.plan} className="flex items-center gap-4">
                      <div className="w-24 font-medium">{item.plan}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-muted-foreground">{item.avgDays} dias</span>
                          <span className="text-sm font-medium">{item.rate}% ativação</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full"
                            style={{ width: `${item.rate}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Marcos de Ativação</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-success/10">
                    <CheckCircle2 className="h-5 w-5 text-success" />
                    <div className="flex-1">
                      <div className="font-medium">1º Paciente Cadastrado</div>
                      <div className="text-xs text-muted-foreground">Média: 2.4 dias</div>
                    </div>
                    <Badge>82%</Badge>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-info/10">
                    <CheckCircle2 className="h-5 w-5 text-info" />
                    <div className="flex-1">
                      <div className="font-medium">1º Agendamento</div>
                      <div className="text-xs text-muted-foreground">Média: 3.1 dias</div>
                    </div>
                    <Badge>74%</Badge>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-warning/10">
                    <CheckCircle2 className="h-5 w-5 text-warning" />
                    <div className="flex-1">
                      <div className="font-medium">1ª Consulta Realizada</div>
                      <div className="text-xs text-muted-foreground">Média: 5.2 dias</div>
                    </div>
                    <Badge>68%</Badge>
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

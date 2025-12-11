import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart3, TrendingUp, TrendingDown, Users, Clock, MousePointer } from "lucide-react";

interface FeatureUsageModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const mockFeatures = [
  { name: "Agendamento", usage: 94, users: 2847, sessions: 45230, trend: 12, avgTime: "4:32" },
  { name: "Prontuário Eletrônico", usage: 87, users: 2654, sessions: 38920, trend: 8, avgTime: "12:45" },
  { name: "Financeiro", usage: 76, users: 2102, sessions: 28450, trend: -3, avgTime: "6:18" },
  { name: "Receita Digital", usage: 72, users: 1987, sessions: 25680, trend: 15, avgTime: "3:21" },
  { name: "Telemedicina", usage: 58, users: 1543, sessions: 18920, trend: 24, avgTime: "18:45" },
  { name: "Chat", usage: 45, users: 1234, sessions: 12450, trend: -5, avgTime: "2:10" },
  { name: "Relatórios", usage: 42, users: 1156, sessions: 10890, trend: 2, avgTime: "8:32" },
  { name: "Estoque", usage: 34, users: 934, sessions: 7650, trend: 1, avgTime: "5:45" },
];

export function FeatureUsageModal({ open, onOpenChange }: FeatureUsageModalProps) {
  const [period, setPeriod] = useState("30d");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            Métricas de Uso por Funcionalidade
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Card className="px-4 py-2">
                <div className="text-2xl font-bold text-primary">8</div>
                <div className="text-xs text-muted-foreground">Features Ativas</div>
              </Card>
              <Card className="px-4 py-2">
                <div className="text-2xl font-bold text-success">2.847</div>
                <div className="text-xs text-muted-foreground">Usuários Ativos</div>
              </Card>
              <Card className="px-4 py-2">
                <div className="text-2xl font-bold text-info">188K</div>
                <div className="text-xs text-muted-foreground">Sessões/Mês</div>
              </Card>
            </div>
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">7 dias</SelectItem>
                <SelectItem value="30d">30 dias</SelectItem>
                <SelectItem value="90d">90 dias</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            {mockFeatures.map((feature, index) => (
              <Card key={feature.name} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium">{feature.name}</div>
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Users className="h-3.5 w-3.5" />
                            {feature.users.toLocaleString()}
                          </div>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <MousePointer className="h-3.5 w-3.5" />
                            {feature.sessions.toLocaleString()}
                          </div>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Clock className="h-3.5 w-3.5" />
                            {feature.avgTime}
                          </div>
                          <Badge variant={feature.trend >= 0 ? "default" : "destructive"} className="gap-1">
                            {feature.trend >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                            {feature.trend >= 0 ? "+" : ""}{feature.trend}%
                          </Badge>
                        </div>
                      </div>
                      <Progress value={feature.usage} className="h-2" />
                    </div>
                    <div className="text-lg font-bold text-primary w-12 text-right">{feature.usage}%</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

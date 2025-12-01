import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, Calendar, Star, Activity, Clock } from "lucide-react";

interface Professional {
  name: string;
}

interface ProfessionalMetricsTabProps {
  professional: Professional;
}

export const ProfessionalMetricsTab = ({ professional }: ProfessionalMetricsTabProps) => {
  const metrics = [
    { label: "Consultas no Mês", value: "142", change: "+12%", icon: Calendar, color: "text-blue-600" },
    { label: "Taxa de Ocupação", value: "87%", change: "+5%", icon: Activity, color: "text-green-600" },
    { label: "Pacientes Atendidos", value: "98", change: "+8%", icon: Users, color: "text-purple-600" },
    { label: "Avaliação Média", value: "4.8", change: "+0.2", icon: Star, color: "text-yellow-600" }
  ];

  const recentPerformance = [
    { period: "Esta Semana", appointments: 28, revenue: "R$ 8.400", rating: 4.9 },
    { period: "Semana Passada", appointments: 32, revenue: "R$ 9.600", rating: 4.8 },
    { period: "Há 2 Semanas", appointments: 30, revenue: "R$ 9.000", rating: 4.7 },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card key={index} className="p-4 border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-md transition-all">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground mb-1">{metric.label}</p>
                  <p className="text-2xl font-bold">{metric.value}</p>
                  <Badge variant="outline" className="mt-2 bg-green-500/10 text-green-600 border-green-500/20 text-xs">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {metric.change}
                  </Badge>
                </div>
                <div className={`p-3 rounded-lg bg-primary/10 ${metric.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <Card className="p-4 border-border/50 bg-card/50 backdrop-blur-sm">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Activity className="h-4 w-4 text-primary" />
          Performance Recente
        </h3>
        <div className="space-y-3">
          {recentPerformance.map((item, index) => (
            <div key={index} className="p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium text-sm">{item.period}</p>
                <Badge variant="secondary" className="text-xs">
                  <Star className="h-3 w-3 mr-1 fill-yellow-500 text-yellow-500" />
                  {item.rating}
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <p className="text-muted-foreground">Consultas</p>
                  <p className="font-semibold">{item.appointments}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Receita</p>
                  <p className="font-semibold">{item.revenue}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-4 border-border/50 bg-card/50 backdrop-blur-sm">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Clock className="h-4 w-4 text-primary" />
          Tempo Médio de Atendimento
        </h3>
        <div className="flex items-center justify-center p-6">
          <div className="text-center">
            <p className="text-4xl font-bold text-primary mb-2">42 min</p>
            <p className="text-sm text-muted-foreground">Média por consulta</p>
            <Badge variant="outline" className="mt-3 bg-green-500/10 text-green-600 border-green-500/20">
              <TrendingUp className="h-3 w-3 mr-1" />
              3% mais eficiente
            </Badge>
          </div>
        </div>
      </Card>

      <Card className="p-4 border-border/50 bg-card/50 backdrop-blur-sm">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Users className="h-4 w-4 text-primary" />
          Top Serviços
        </h3>
        <div className="space-y-2">
          {[
            { service: "Consulta de Rotina", count: 45, percentage: 32 },
            { service: "Retorno", count: 38, percentage: 27 },
            { service: "Procedimento", count: 30, percentage: 21 },
            { service: "Avaliação", count: 29, percentage: 20 }
          ].map((item, index) => (
            <div key={index} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{item.service}</span>
                <span className="text-muted-foreground">{item.count} consultas</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary to-primary-dark rounded-full transition-all"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
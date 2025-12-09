import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  TrendingUp, 
  Send,
  CheckCircle2,
  Eye,
  Clock,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface TemplateStatsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  template: {
    id: number;
    name: string;
    sent: number;
    delivered: number;
    read: number;
  } | null;
}

const chartData = [
  { day: "Seg", enviadas: 45, entregues: 43, lidas: 38 },
  { day: "Ter", enviadas: 52, entregues: 50, lidas: 44 },
  { day: "Qua", enviadas: 48, entregues: 47, lidas: 41 },
  { day: "Qui", enviadas: 61, entregues: 59, lidas: 52 },
  { day: "Sex", enviadas: 55, entregues: 54, lidas: 48 },
  { day: "Sab", enviadas: 32, entregues: 31, lidas: 27 },
  { day: "Dom", enviadas: 18, entregues: 17, lidas: 15 },
];

export function TemplateStatsModal({ open, onOpenChange, template }: TemplateStatsModalProps) {
  if (!template) return null;

  const deliveryRate = Math.round((template.delivered / template.sent) * 100);
  const readRate = Math.round((template.read / template.delivered) * 100);

  const stats = [
    { 
      label: "Enviadas", 
      value: template.sent.toLocaleString(), 
      icon: Send, 
      color: "text-primary",
      bg: "bg-primary/10"
    },
    { 
      label: "Entregues", 
      value: template.delivered.toLocaleString(), 
      icon: CheckCircle2, 
      color: "text-confirmed",
      bg: "bg-confirmed/10",
      rate: deliveryRate,
      rateLabel: "Taxa de entrega"
    },
    { 
      label: "Lidas", 
      value: template.read.toLocaleString(), 
      icon: Eye, 
      color: "text-info",
      bg: "bg-info/10",
      rate: readRate,
      rateLabel: "Taxa de leitura"
    },
    { 
      label: "Tempo Médio", 
      value: "2.3h", 
      icon: Clock, 
      color: "text-pending",
      bg: "bg-pending/10"
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh]">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <div>
              <DialogTitle>Estatísticas do Template</DialogTitle>
              <p className="text-sm text-muted-foreground mt-1">{template.name}</p>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <Card key={stat.label} className="border-border/50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className={`p-2 rounded-lg ${stat.bg}`}>
                      <stat.icon className={`h-4 w-4 ${stat.color}`} />
                    </div>
                    {stat.rate && (
                      <div className="flex items-center gap-1 text-xs text-confirmed">
                        <ArrowUpRight className="h-3 w-3" />
                        {stat.rate}%
                      </div>
                    )}
                  </div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Chart */}
          <Card className="border-border/50">
            <CardContent className="p-4">
              <h4 className="font-medium mb-4">Performance dos últimos 7 dias</h4>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorEnviadas" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorEntregues" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(142, 76%, 36%)" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(142, 76%, 36%)" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorLidas" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(221, 83%, 53%)" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(221, 83%, 53%)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Area type="monotone" dataKey="enviadas" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorEnviadas)" strokeWidth={2} />
                    <Area type="monotone" dataKey="entregues" stroke="hsl(142, 76%, 36%)" fillOpacity={1} fill="url(#colorEntregues)" strokeWidth={2} />
                    <Area type="monotone" dataKey="lidas" stroke="hsl(221, 83%, 53%)" fillOpacity={1} fill="url(#colorLidas)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Fechar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

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
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import {
  Activity,
  Heart,
  Droplets,
  Scale,
  Thermometer,
  TrendingUp,
  TrendingDown,
  Plus,
  Target,
  Sparkles,
  Calendar,
  X,
  AlertCircle,
  CheckCircle2
} from "lucide-react";
import { toast } from "sonner";

interface HealthMetricsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const mockMetrics = {
  bloodPressure: { current: "120/80", status: "normal", trend: "stable", history: [
    { date: "10/12", value: "120/80" },
    { date: "09/12", value: "125/82" },
    { date: "08/12", value: "118/78" },
    { date: "07/12", value: "122/80" },
  ]},
  heartRate: { current: 72, status: "normal", trend: "stable", unit: "bpm", history: [
    { date: "10/12", value: 72 },
    { date: "09/12", value: 75 },
    { date: "08/12", value: 70 },
    { date: "07/12", value: 73 },
  ]},
  glucose: { current: 95, status: "normal", trend: "down", unit: "mg/dL", history: [
    { date: "10/12", value: 95 },
    { date: "09/12", value: 102 },
    { date: "08/12", value: 98 },
    { date: "07/12", value: 105 },
  ]},
  weight: { current: 68.5, status: "normal", trend: "down", unit: "kg", goal: 65, history: [
    { date: "10/12", value: 68.5 },
    { date: "09/12", value: 69.0 },
    { date: "08/12", value: 69.2 },
    { date: "07/12", value: 69.8 },
  ]},
  oxygen: { current: 98, status: "normal", trend: "stable", unit: "%", history: [
    { date: "10/12", value: 98 },
    { date: "09/12", value: 97 },
    { date: "08/12", value: 98 },
    { date: "07/12", value: 98 },
  ]},
};

const healthGoals = [
  { id: 1, title: "Caminhar 10.000 passos", progress: 75, target: 10000, current: 7500, unit: "passos" },
  { id: 2, title: "Beber 2L de água", progress: 60, target: 2000, current: 1200, unit: "ml" },
  { id: 3, title: "Dormir 8 horas", progress: 87, target: 8, current: 7, unit: "horas" },
];

export function HealthMetricsModal({ open, onOpenChange }: HealthMetricsModalProps) {
  const [showAddMetric, setShowAddMetric] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "normal": return "text-status-confirmed";
      case "warning": return "text-warning";
      case "alert": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return <TrendingUp className="h-4 w-4 text-warning" />;
      case "down": return <TrendingDown className="h-4 w-4 text-status-confirmed" />;
      default: return <Activity className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden bg-card/95 backdrop-blur-xl border-2 border-primary/20 rounded-2xl shadow-2xl p-0">
        {/* Header */}
        <div className="relative overflow-hidden border-b">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent" />
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
          
          <DialogHeader className="relative p-6 pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-500/25 animate-[scale-in_0.3s_ease-out]">
                  <Activity className="h-6 w-6 text-white" />
                </div>
                <div>
                  <DialogTitle className="text-xl font-bold">Métricas de Saúde</DialogTitle>
                  <p className="text-sm text-muted-foreground">Acompanhe sua saúde em tempo real</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onOpenChange(false)}
                className="hover:bg-destructive/10 hover:text-destructive"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </DialogHeader>
        </div>

        <ScrollArea className="max-h-[calc(90vh-120px)]">
          <div className="p-6 space-y-6">
            <Tabs defaultValue="metrics" className="space-y-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="metrics">Métricas</TabsTrigger>
                <TabsTrigger value="goals">Metas</TabsTrigger>
                <TabsTrigger value="history">Histórico</TabsTrigger>
              </TabsList>

              {/* Metrics Tab */}
              <TabsContent value="metrics" className="space-y-4">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Blood Pressure */}
                  <div 
                    className={cn(
                      "p-4 rounded-xl border cursor-pointer transition-all duration-300 hover:shadow-lg group",
                      selectedMetric === "bloodPressure" 
                        ? "bg-primary/10 border-primary/30 shadow-lg" 
                        : "bg-muted/30 hover:bg-muted/50"
                    )}
                    onClick={() => setSelectedMetric(selectedMetric === "bloodPressure" ? null : "bloodPressure")}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2 rounded-lg bg-red-500/10 group-hover:scale-110 transition-transform">
                        <Heart className="h-5 w-5 text-red-500" />
                      </div>
                      {getTrendIcon(mockMetrics.bloodPressure.trend)}
                    </div>
                    <p className="text-sm text-muted-foreground">Pressão Arterial</p>
                    <p className="text-2xl font-bold">{mockMetrics.bloodPressure.current}</p>
                    <Badge variant="outline" className={cn("mt-2 text-xs", getStatusColor(mockMetrics.bloodPressure.status))}>
                      Normal
                    </Badge>
                  </div>

                  {/* Heart Rate */}
                  <div 
                    className={cn(
                      "p-4 rounded-xl border cursor-pointer transition-all duration-300 hover:shadow-lg group",
                      selectedMetric === "heartRate" 
                        ? "bg-primary/10 border-primary/30 shadow-lg" 
                        : "bg-muted/30 hover:bg-muted/50"
                    )}
                    onClick={() => setSelectedMetric(selectedMetric === "heartRate" ? null : "heartRate")}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2 rounded-lg bg-pink-500/10 group-hover:scale-110 transition-transform">
                        <Activity className="h-5 w-5 text-pink-500" />
                      </div>
                      {getTrendIcon(mockMetrics.heartRate.trend)}
                    </div>
                    <p className="text-sm text-muted-foreground">Freq. Cardíaca</p>
                    <p className="text-2xl font-bold">{mockMetrics.heartRate.current} <span className="text-sm font-normal">bpm</span></p>
                    <Badge variant="outline" className={cn("mt-2 text-xs", getStatusColor(mockMetrics.heartRate.status))}>
                      Normal
                    </Badge>
                  </div>

                  {/* Glucose */}
                  <div 
                    className={cn(
                      "p-4 rounded-xl border cursor-pointer transition-all duration-300 hover:shadow-lg group",
                      selectedMetric === "glucose" 
                        ? "bg-primary/10 border-primary/30 shadow-lg" 
                        : "bg-muted/30 hover:bg-muted/50"
                    )}
                    onClick={() => setSelectedMetric(selectedMetric === "glucose" ? null : "glucose")}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2 rounded-lg bg-amber-500/10 group-hover:scale-110 transition-transform">
                        <Droplets className="h-5 w-5 text-amber-500" />
                      </div>
                      {getTrendIcon(mockMetrics.glucose.trend)}
                    </div>
                    <p className="text-sm text-muted-foreground">Glicemia</p>
                    <p className="text-2xl font-bold">{mockMetrics.glucose.current} <span className="text-sm font-normal">mg/dL</span></p>
                    <Badge variant="outline" className={cn("mt-2 text-xs", getStatusColor(mockMetrics.glucose.status))}>
                      Normal
                    </Badge>
                  </div>

                  {/* Weight */}
                  <div 
                    className={cn(
                      "p-4 rounded-xl border cursor-pointer transition-all duration-300 hover:shadow-lg group",
                      selectedMetric === "weight" 
                        ? "bg-primary/10 border-primary/30 shadow-lg" 
                        : "bg-muted/30 hover:bg-muted/50"
                    )}
                    onClick={() => setSelectedMetric(selectedMetric === "weight" ? null : "weight")}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2 rounded-lg bg-blue-500/10 group-hover:scale-110 transition-transform">
                        <Scale className="h-5 w-5 text-blue-500" />
                      </div>
                      {getTrendIcon(mockMetrics.weight.trend)}
                    </div>
                    <p className="text-sm text-muted-foreground">Peso</p>
                    <p className="text-2xl font-bold">{mockMetrics.weight.current} <span className="text-sm font-normal">kg</span></p>
                    <div className="mt-2 space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Meta: {mockMetrics.weight.goal}kg</span>
                        <span className="font-medium">-{(mockMetrics.weight.current - mockMetrics.weight.goal).toFixed(1)}kg</span>
                      </div>
                      <Progress value={((mockMetrics.weight.goal / mockMetrics.weight.current) * 100)} className="h-1" />
                    </div>
                  </div>

                  {/* Oxygen */}
                  <div 
                    className={cn(
                      "p-4 rounded-xl border cursor-pointer transition-all duration-300 hover:shadow-lg group",
                      selectedMetric === "oxygen" 
                        ? "bg-primary/10 border-primary/30 shadow-lg" 
                        : "bg-muted/30 hover:bg-muted/50"
                    )}
                    onClick={() => setSelectedMetric(selectedMetric === "oxygen" ? null : "oxygen")}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2 rounded-lg bg-cyan-500/10 group-hover:scale-110 transition-transform">
                        <Sparkles className="h-5 w-5 text-cyan-500" />
                      </div>
                      {getTrendIcon(mockMetrics.oxygen.trend)}
                    </div>
                    <p className="text-sm text-muted-foreground">Oxigenação</p>
                    <p className="text-2xl font-bold">{mockMetrics.oxygen.current}<span className="text-sm font-normal">%</span></p>
                    <Badge variant="outline" className={cn("mt-2 text-xs", getStatusColor(mockMetrics.oxygen.status))}>
                      Excelente
                    </Badge>
                  </div>

                  {/* Add New Metric */}
                  <button 
                    onClick={() => setShowAddMetric(true)}
                    className="p-4 rounded-xl border-2 border-dashed border-muted-foreground/20 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 flex flex-col items-center justify-center gap-2"
                  >
                    <Plus className="h-8 w-8 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Adicionar Medição</span>
                  </button>
                </div>

                {/* Add Metric Form */}
                {showAddMetric && (
                  <div className="p-4 rounded-xl bg-muted/30 border space-y-4 animate-[scale-in_0.2s_ease-out]">
                    <h4 className="font-semibold">Nova Medição</h4>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Tipo de medição</Label>
                        <Input placeholder="Ex: Pressão arterial" />
                      </div>
                      <div className="space-y-2">
                        <Label>Valor</Label>
                        <Input placeholder="Ex: 120/80" />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setShowAddMetric(false)}>Cancelar</Button>
                      <Button onClick={() => {
                        toast.success("Medição registrada!");
                        setShowAddMetric(false);
                      }}>Salvar</Button>
                    </div>
                  </div>
                )}
              </TabsContent>

              {/* Goals Tab */}
              <TabsContent value="goals" className="space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Target className="h-4 w-4" />
                    Metas Diárias
                  </h4>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Plus className="h-4 w-4" />
                    Nova Meta
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {healthGoals.map((goal, index) => (
                    <div 
                      key={goal.id}
                      className="p-4 rounded-xl bg-muted/30 border hover:border-primary/20 transition-all animate-[fade-in_0.3s_ease-out]"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          {goal.progress >= 100 ? (
                            <div className="p-2 rounded-lg bg-status-confirmed/20">
                              <CheckCircle2 className="h-5 w-5 text-status-confirmed" />
                            </div>
                          ) : (
                            <div className="p-2 rounded-lg bg-primary/10">
                              <Target className="h-5 w-5 text-primary" />
                            </div>
                          )}
                          <div>
                            <p className="font-medium">{goal.title}</p>
                            <p className="text-sm text-muted-foreground">
                              {goal.current.toLocaleString()} / {goal.target.toLocaleString()} {goal.unit}
                            </p>
                          </div>
                        </div>
                        <span className={cn(
                          "text-lg font-bold",
                          goal.progress >= 100 ? "text-status-confirmed" : "text-primary"
                        )}>
                          {goal.progress}%
                        </span>
                      </div>
                      <Progress value={goal.progress} className="h-2" />
                    </div>
                  ))}
                </div>
              </TabsContent>

              {/* History Tab */}
              <TabsContent value="history" className="space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Histórico de Medições
                  </h4>
                </div>
                
                <div className="space-y-3">
                  {Object.entries(mockMetrics).map(([key, metric], index) => (
                    <div 
                      key={key}
                      className="p-4 rounded-xl bg-muted/30 border animate-[fade-in_0.3s_ease-out]"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <h5 className="font-medium capitalize mb-3">
                        {key === "bloodPressure" ? "Pressão Arterial" : 
                         key === "heartRate" ? "Frequência Cardíaca" :
                         key === "glucose" ? "Glicemia" :
                         key === "weight" ? "Peso" : "Oxigenação"}
                      </h5>
                      <div className="flex gap-2 overflow-x-auto pb-2">
                        {metric.history.map((item, idx) => (
                          <div 
                            key={idx}
                            className="flex-shrink-0 p-3 rounded-lg bg-background/50 border text-center min-w-[80px]"
                          >
                            <p className="text-xs text-muted-foreground">{item.date}</p>
                            <p className="font-semibold">{item.value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PageHeader } from "@/components/ui/page-header";
import { PageContainer } from "@/components/ui/page-container";
import { cn } from "@/lib/utils";
import {
  Target,
  Users,
  Phone,
  Mail,
  MessageSquare,
  Calendar,
  Clock,
  ChevronRight,
  ArrowRight,
  DollarSign,
  TrendingUp,
  Filter,
  Search,
  Plus,
  RefreshCw,
  Sparkles,
  Brain,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Timer,
  ArrowUpRight,
  Star,
  Gift,
  ThumbsUp,
  Bell,
  Zap,
  Eye,
  MoreHorizontal,
  GripVertical
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Pipeline stages
const pipelineStages = [
  { id: "primeiro_contato", name: "Primeiro Contato", color: "from-slate-500 to-slate-600", count: 28 },
  { id: "qualificacao", name: "Qualificação", color: "from-blue-500 to-blue-600", count: 15 },
  { id: "agendamento", name: "Agendamento", color: "from-amber-500 to-amber-600", count: 12 },
  { id: "consulta", name: "Consulta Realizada", color: "from-emerald-500 to-emerald-600", count: 8 },
  { id: "fechamento", name: "Fechamento", color: "from-purple-500 to-purple-600", count: 5 },
  { id: "fidelizado", name: "Fidelizado", color: "from-pink-500 to-pink-600", count: 42 },
];

// Mock patients in pipeline
const pipelinePatients = [
  { id: 1, name: "Maria Silva", avatar: "", stage: "primeiro_contato", source: "WhatsApp", value: 0, lastContact: "Hoje, 10:30", phone: "(11) 99999-1234", interest: "Consulta Cardiologia", score: 85, daysInStage: 1 },
  { id: 2, name: "João Pedro", avatar: "", stage: "primeiro_contato", source: "Instagram", value: 0, lastContact: "Hoje, 09:15", phone: "(11) 98888-4321", interest: "Exames", score: 72, daysInStage: 2 },
  { id: 3, name: "Ana Costa", avatar: "", stage: "qualificacao", source: "Site", value: 350, lastContact: "Ontem", phone: "(11) 97777-5678", interest: "Consulta Dermatologia", score: 90, daysInStage: 3 },
  { id: 4, name: "Carlos Lima", avatar: "", stage: "qualificacao", source: "Indicação", value: 500, lastContact: "2 dias", phone: "(11) 96666-8765", interest: "Check-up Completo", score: 95, daysInStage: 2 },
  { id: 5, name: "Fernanda Rocha", avatar: "", stage: "agendamento", source: "WhatsApp", value: 280, lastContact: "Hoje", phone: "(11) 95555-2345", interest: "Retorno", score: 88, daysInStage: 1 },
  { id: 6, name: "Ricardo Alves", avatar: "", stage: "consulta", source: "Google", value: 450, lastContact: "Ontem", phone: "(11) 94444-6789", interest: "Consulta Ortopedia", score: 92, daysInStage: 0 },
  { id: 7, name: "Patrícia Souza", avatar: "", stage: "fechamento", source: "Indicação", value: 1200, lastContact: "Hoje", phone: "(11) 93333-3456", interest: "Tratamento Completo", score: 98, daysInStage: 2 },
  { id: 8, name: "Bruno Martins", avatar: "", stage: "fidelizado", source: "Recorrente", value: 3500, lastContact: "1 semana", phone: "(11) 92222-7890", interest: "Acompanhamento", score: 100, daysInStage: 180 },
];

// Patients needing re-engagement
const reengagementPatients = [
  { id: 1, name: "Luciana Ferreira", lastVisit: "6 meses atrás", totalSpent: 2800, visits: 8, recommendedAction: "Lembrete de retorno", urgency: "high" },
  { id: 2, name: "Marcos Oliveira", lastVisit: "4 meses atrás", totalSpent: 1500, visits: 5, recommendedAction: "Promoção especial", urgency: "medium" },
  { id: 3, name: "Sandra Costa", lastVisit: "8 meses atrás", totalSpent: 4200, visits: 12, recommendedAction: "Ligação pessoal", urgency: "high" },
  { id: 4, name: "Roberto Silva", lastVisit: "3 meses atrás", totalSpent: 900, visits: 3, recommendedAction: "E-mail informativo", urgency: "low" },
  { id: 5, name: "Camila Santos", lastVisit: "5 meses atrás", totalSpent: 2100, visits: 7, recommendedAction: "WhatsApp com novidades", urgency: "medium" },
];

// AI Insights
const aiInsights = [
  { type: "opportunity", message: "3 pacientes em Qualificação têm alta probabilidade de conversão", action: "Ver pacientes" },
  { type: "alert", message: "5 pacientes não tiveram contato há mais de 7 dias", action: "Agendar follow-up" },
  { type: "suggestion", message: "Melhor horário para contatos: 10h-12h (taxa de resposta 78%)", action: "Ajustar agenda" },
  { type: "trend", message: "Taxa de conversão aumentou 15% este mês", action: "Ver detalhes" },
];

// Quick actions for each stage
const stageActions = {
  primeiro_contato: ["Ligar", "WhatsApp", "E-mail", "Qualificar"],
  qualificacao: ["Apresentar serviços", "Enviar proposta", "Agendar visita"],
  agendamento: ["Confirmar", "Remarcar", "Lembrete"],
  consulta: ["Registrar atendimento", "Propor tratamento", "Agendar retorno"],
  fechamento: ["Enviar contrato", "Processar pagamento", "Finalizar"],
  fidelizado: ["Programa fidelidade", "Indicação", "Feedback"],
};

export default function Pipeline() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStage, setSelectedStage] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"kanban" | "list">("kanban");

  const getPatientsByStage = (stageId: string) => {
    return pipelinePatients.filter(p => p.stage === stageId);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-emerald-600 bg-emerald-500/10";
    if (score >= 70) return "text-amber-600 bg-amber-500/10";
    return "text-red-600 bg-red-500/10";
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high": return "text-red-600 bg-red-500/10 border-red-500/20";
      case "medium": return "text-amber-600 bg-amber-500/10 border-amber-500/20";
      default: return "text-blue-600 bg-blue-500/10 border-blue-500/20";
    }
  };

  return (
    <PageContainer className="px-4 sm:px-6">
      <PageHeader
        icon={Target}
        iconGradient="from-purple-500 to-pink-600"
        title="Pipeline de Pacientes"
        description="Gerencie a jornada completa dos pacientes do primeiro contato à fidelização"
      >
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          <span className="hidden sm:inline">Filtros</span>
        </Button>
        <Button className="gap-2 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700">
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Novo Lead</span>
        </Button>
      </PageHeader>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <Card className="p-4 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Total no Pipeline</p>
              <p className="text-2xl font-bold">110</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-emerald-500/5 to-emerald-500/10 border-emerald-500/20">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10">
              <DollarSign className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Valor Potencial</p>
              <p className="text-2xl font-bold text-emerald-600">R$ 45.2k</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-amber-500/5 to-amber-500/10 border-amber-500/20">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-500/10">
              <TrendingUp className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Taxa Conversão</p>
              <p className="text-2xl font-bold text-amber-600">32%</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-blue-500/5 to-blue-500/10 border-blue-500/20">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-500/10">
              <Clock className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Tempo Médio</p>
              <p className="text-2xl font-bold text-blue-600">5.2 dias</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-red-500/5 to-red-500/10 border-red-500/20">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-red-500/10">
              <RefreshCw className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Reengajar</p>
              <p className="text-2xl font-bold text-red-600">23</p>
            </div>
          </div>
        </Card>
      </div>

      {/* AI Insights Bar */}
      <Card className="mb-6 p-4 bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-amber-500/5 border-purple-500/20">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600">
            <Brain className="h-4 w-4 text-white" />
          </div>
          <h3 className="font-semibold">Insights Inteligentes</h3>
          <Badge variant="outline" className="gap-1 text-purple-600 border-purple-500/30">
            <Sparkles className="h-3 w-3" />
            IA
          </Badge>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {aiInsights.map((insight, idx) => (
            <div key={idx} className="p-3 rounded-lg bg-background/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all cursor-pointer group">
              <div className="flex items-start gap-2">
                {insight.type === "opportunity" && <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5" />}
                {insight.type === "alert" && <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5" />}
                {insight.type === "suggestion" && <Zap className="h-4 w-4 text-blue-500 mt-0.5" />}
                {insight.type === "trend" && <TrendingUp className="h-4 w-4 text-purple-500 mt-0.5" />}
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground leading-relaxed">{insight.message}</p>
                  <Button variant="link" size="sm" className="h-auto p-0 text-xs text-primary group-hover:underline mt-1">
                    {insight.action} <ArrowRight className="h-3 w-3 ml-1" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Tabs defaultValue="pipeline" className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <TabsList className="bg-muted/50 p-1 flex-wrap h-auto">
            <TabsTrigger value="pipeline" className="gap-2 text-xs sm:text-sm">
              <Target className="h-4 w-4" />
              Pipeline
            </TabsTrigger>
            <TabsTrigger value="reengajar" className="gap-2 text-xs sm:text-sm">
              <RefreshCw className="h-4 w-4" />
              Reengajar
            </TabsTrigger>
            <TabsTrigger value="analytics" className="gap-2 text-xs sm:text-sm">
              <TrendingUp className="h-4 w-4" />
              Análises
            </TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar paciente..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </div>

        {/* Pipeline Tab */}
        <TabsContent value="pipeline" className="mt-0">
          <ScrollArea className="w-full">
            <div className="flex gap-4 pb-4 min-w-max">
              {pipelineStages.map((stage) => (
                <div key={stage.id} className="w-72 flex-shrink-0">
                  {/* Stage Header */}
                  <div className={cn(
                    "p-3 rounded-t-xl bg-gradient-to-r text-white",
                    stage.color
                  )}>
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-sm">{stage.name}</h3>
                      <Badge className="bg-white/20 text-white border-0">
                        {stage.count}
                      </Badge>
                    </div>
                  </div>

                  {/* Stage Cards */}
                  <div className="bg-muted/30 rounded-b-xl p-2 min-h-[400px] space-y-2">
                    {getPatientsByStage(stage.id).map((patient) => (
                      <Card key={patient.id} className="p-3 hover:shadow-md transition-all cursor-pointer group border-border/50 hover:border-primary/30">
                        <div className="flex items-start gap-3">
                          <div className="flex items-center gap-2">
                            <GripVertical className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity cursor-grab" />
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={patient.avatar} />
                              <AvatarFallback className="bg-primary/10 text-primary text-sm">
                                {patient.name.split(" ").map(n => n[0]).join("")}
                              </AvatarFallback>
                            </Avatar>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium text-sm truncate">{patient.name}</h4>
                              <Badge className={cn("text-xs", getScoreColor(patient.score))}>
                                {patient.score}%
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground truncate">{patient.interest}</p>
                            <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                              <Badge variant="outline" className="text-xs py-0">
                                {patient.source}
                              </Badge>
                              <span>·</span>
                              <span>{patient.lastContact}</span>
                            </div>
                            {patient.value > 0 && (
                              <div className="flex items-center gap-1 mt-2 text-xs text-emerald-600 font-medium">
                                <DollarSign className="h-3 w-3" />
                                R$ {patient.value.toLocaleString()}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="flex items-center gap-1 mt-3 pt-2 border-t border-border/50">
                          <Button variant="ghost" size="sm" className="h-7 px-2 text-xs gap-1">
                            <Phone className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-7 px-2 text-xs gap-1">
                            <MessageSquare className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-7 px-2 text-xs gap-1">
                            <Mail className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-7 px-2 text-xs gap-1 ml-auto">
                            <ArrowRight className="h-3 w-3" />
                            Avançar
                          </Button>
                        </div>
                      </Card>
                    ))}

                    {getPatientsByStage(stage.id).length === 0 && (
                      <div className="flex flex-col items-center justify-center py-8 text-center">
                        <div className="p-3 rounded-full bg-muted/50 mb-2">
                          <Users className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Nenhum paciente nesta etapa
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        {/* Reengajar Tab */}
        <TabsContent value="reengajar" className="mt-0">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-semibold text-lg">Pacientes para Reengajamento</h3>
                <p className="text-sm text-muted-foreground">
                  Pacientes que não visitaram a clínica recentemente e podem precisar de um contato
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Filtrar por" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="high">Alta prioridade</SelectItem>
                    <SelectItem value="medium">Média prioridade</SelectItem>
                    <SelectItem value="low">Baixa prioridade</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="gap-2">
                  <Brain className="h-4 w-4" />
                  Sugestões IA
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              {reengagementPatients.map((patient) => (
                <div 
                  key={patient.id} 
                  className="flex items-center gap-4 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-all group"
                >
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {patient.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{patient.name}</h4>
                      <Badge className={cn("text-xs", getUrgencyColor(patient.urgency))}>
                        {patient.urgency === "high" ? "Alta" : patient.urgency === "medium" ? "Média" : "Baixa"}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {patient.lastVisit}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {patient.visits} visitas
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign className="h-3 w-3" />
                        R$ {patient.totalSpent.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Ação Recomendada</p>
                      <p className="text-sm font-medium text-primary">{patient.recommendedAction}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Mail className="h-4 w-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="gap-2">
                            <Eye className="h-4 w-4" />
                            Ver perfil
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <Calendar className="h-4 w-4" />
                            Agendar
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <Gift className="h-4 w-4" />
                            Enviar promoção
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <XCircle className="h-4 w-4" />
                            Marcar inativo
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bulk Actions */}
            <div className="flex items-center justify-between mt-6 pt-4 border-t">
              <div className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span className="text-sm text-muted-foreground">Selecionar todos</span>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" className="gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Enviar WhatsApp em Massa
                </Button>
                <Button variant="outline" className="gap-2">
                  <Mail className="h-4 w-4" />
                  Enviar E-mail em Massa
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="mt-0">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Conversion Funnel */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Funil de Conversão
              </h3>
              <div className="space-y-4">
                {pipelineStages.map((stage, idx) => (
                  <div key={stage.id}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span>{stage.name}</span>
                      <span className="font-medium">{stage.count} pacientes</span>
                    </div>
                    <div className="relative">
                      <Progress 
                        value={(stage.count / 50) * 100} 
                        className="h-8"
                      />
                      <div className="absolute inset-0 flex items-center justify-center text-xs font-medium">
                        {Math.round((stage.count / 110) * 100)}%
                      </div>
                    </div>
                    {idx < pipelineStages.length - 1 && (
                      <div className="flex justify-center py-1">
                        <ChevronRight className="h-4 w-4 text-muted-foreground rotate-90" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Card>

            {/* Time in Stage */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Timer className="h-5 w-5 text-primary" />
                Tempo Médio por Etapa
              </h3>
              <div className="space-y-4">
                {[
                  { stage: "Primeiro Contato → Qualificação", time: "1.5 dias", ideal: "1 dia", status: "warning" },
                  { stage: "Qualificação → Agendamento", time: "2.3 dias", ideal: "2 dias", status: "warning" },
                  { stage: "Agendamento → Consulta", time: "4.2 dias", ideal: "5 dias", status: "good" },
                  { stage: "Consulta → Fechamento", time: "1.8 dias", ideal: "2 dias", status: "good" },
                  { stage: "Fechamento → Fidelizado", time: "0.5 dias", ideal: "1 dia", status: "excellent" },
                ].map((item, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-muted/30">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">{item.stage}</span>
                      <div className="flex items-center gap-2">
                        <Badge variant={
                          item.status === "excellent" ? "default" : 
                          item.status === "good" ? "secondary" : 
                          "outline"
                        } className={cn(
                          item.status === "excellent" && "bg-emerald-500",
                          item.status === "warning" && "border-amber-500 text-amber-600"
                        )}>
                          {item.time}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          (ideal: {item.ideal})
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Sources */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <ArrowUpRight className="h-5 w-5 text-primary" />
                Fontes de Leads
              </h3>
              <div className="space-y-3">
                {[
                  { source: "WhatsApp", count: 42, percentage: 38, color: "bg-emerald-500" },
                  { source: "Instagram", count: 28, percentage: 25, color: "bg-pink-500" },
                  { source: "Indicação", count: 22, percentage: 20, color: "bg-purple-500" },
                  { source: "Google", count: 12, percentage: 11, color: "bg-blue-500" },
                  { source: "Site", count: 6, percentage: 6, color: "bg-amber-500" },
                ].map((item) => (
                  <div key={item.source} className="flex items-center gap-3">
                    <div className={cn("w-3 h-3 rounded-full", item.color)} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span>{item.source}</span>
                        <span className="font-medium">{item.count}</span>
                      </div>
                      <Progress value={item.percentage} className="h-2" />
                    </div>
                    <span className="text-sm text-muted-foreground w-12 text-right">
                      {item.percentage}%
                    </span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Performance */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Star className="h-5 w-5 text-primary" />
                Performance do Mês
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center">
                  <p className="text-3xl font-bold text-emerald-600">87%</p>
                  <p className="text-xs text-muted-foreground">Taxa de Resposta</p>
                </div>
                <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-center">
                  <p className="text-3xl font-bold text-blue-600">4.2h</p>
                  <p className="text-xs text-muted-foreground">Tempo Médio Resposta</p>
                </div>
                <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 text-center">
                  <p className="text-3xl font-bold text-purple-600">32%</p>
                  <p className="text-xs text-muted-foreground">Conversão</p>
                </div>
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-center">
                  <p className="text-3xl font-bold text-amber-600">R$ 892</p>
                  <p className="text-xs text-muted-foreground">Ticket Médio</p>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </PageContainer>
  );
}

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
  Calendar,
  Clock,
  Mail,
  FileText,
  Users,
  Bell,
  Sparkles,
  CheckCircle2,
  Plus,
  X,
  Eye,
  TrendingUp,
  TrendingDown,
  DollarSign,
  BarChart3,
  PieChart,
  Activity,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar, PieChart as RePieChart, Pie, Cell } from "recharts";

interface ScheduleReportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const reportTypes = [
  { id: "faturamento", name: "Faturamento", icon: "💰", description: "Receitas e despesas do período" },
  { id: "consultas", name: "Consultas Realizadas", icon: "📊", description: "Total de atendimentos realizados" },
  { id: "pacientes", name: "Novos Pacientes", icon: "👥", description: "Cadastros de novos pacientes" },
  { id: "ocupacao", name: "Taxa de Ocupação", icon: "📈", description: "Percentual de agenda ocupada" },
  { id: "produtividade", name: "Produtividade", icon: "⚡", description: "Métricas de produtividade" },
  { id: "financeiro", name: "Fluxo de Caixa", icon: "💵", description: "Movimentações financeiras" },
];

const frequencies = [
  { id: "daily", name: "Diário", description: "Todo dia às 8h" },
  { id: "weekly", name: "Semanal", description: "Toda segunda-feira" },
  { id: "biweekly", name: "Quinzenal", description: "Dias 1 e 15" },
  { id: "monthly", name: "Mensal", description: "Primeiro dia do mês" },
];

// Mock data for report previews
const faturamentoData = [
  { mes: "Jul", receita: 45000, despesas: 32000 },
  { mes: "Ago", receita: 52000, despesas: 35000 },
  { mes: "Set", receita: 48000, despesas: 31000 },
  { mes: "Out", receita: 61000, despesas: 38000 },
  { mes: "Nov", receita: 55000, despesas: 36000 },
  { mes: "Dez", receita: 67000, despesas: 42000 },
];

const consultasData = [
  { dia: "Seg", realizadas: 22, canceladas: 2 },
  { dia: "Ter", realizadas: 25, canceladas: 3 },
  { dia: "Qua", realizadas: 21, canceladas: 1 },
  { dia: "Qui", realizadas: 27, canceladas: 3 },
  { dia: "Sex", realizadas: 24, canceladas: 2 },
];

const pacientesDistribution = [
  { name: "Novos", value: 45, color: "hsl(var(--primary))" },
  { name: "Recorrentes", value: 128, color: "hsl(142, 76%, 36%)" },
  { name: "Inativos", value: 32, color: "hsl(var(--muted))" },
];

const ocupacaoData = [
  { hora: "08h", taxa: 85 },
  { hora: "09h", taxa: 92 },
  { hora: "10h", taxa: 100 },
  { hora: "11h", taxa: 88 },
  { hora: "14h", taxa: 95 },
  { hora: "15h", taxa: 78 },
  { hora: "16h", taxa: 65 },
  { hora: "17h", taxa: 45 },
];

export function ScheduleReportModal({ open, onOpenChange }: ScheduleReportModalProps) {
  const [selectedReports, setSelectedReports] = useState<string[]>(["faturamento"]);
  const [frequency, setFrequency] = useState("weekly");
  const [recipients, setRecipients] = useState(["admin@clinica.com"]);
  const [newRecipient, setNewRecipient] = useState("");
  const [notifyApp, setNotifyApp] = useState(true);
  const [notifyEmail, setNotifyEmail] = useState(true);
  const [previewReport, setPreviewReport] = useState<string | null>(null);
  const [step, setStep] = useState<"config" | "success">("config");
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateSchedule = () => {
    setIsCreating(true);
    setTimeout(() => {
      setIsCreating(false);
      setStep("success");
    }, 1500);
  };

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(() => setStep("config"), 300);
  };

  if (step === "success") {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="max-w-md">
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="p-4 rounded-full bg-emerald-500/10 mb-4 animate-scale-in">
              <CheckCircle2 className="h-12 w-12 text-emerald-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">Agendamento Criado!</h3>
            <p className="text-muted-foreground mb-6">
              Seus relatórios serão enviados automaticamente conforme configurado.
            </p>
            <div className="p-4 rounded-xl bg-muted/30 w-full mb-6">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-muted-foreground">Relatórios:</span>
                <span className="font-medium">{selectedReports.length} selecionado(s)</span>
              </div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-muted-foreground">Frequência:</span>
                <span className="font-medium">{frequencies.find(f => f.id === frequency)?.name}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Destinatários:</span>
                <span className="font-medium">{recipients.length}</span>
              </div>
            </div>
            <Button onClick={handleClose} className="w-full">
              Concluir
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  const toggleReport = (reportId: string) => {
    setSelectedReports(prev =>
      prev.includes(reportId)
        ? prev.filter(r => r !== reportId)
        : [...prev, reportId]
    );
  };

  const addRecipient = () => {
    if (newRecipient && !recipients.includes(newRecipient)) {
      setRecipients([...recipients, newRecipient]);
      setNewRecipient("");
    }
  };

  const removeRecipient = (email: string) => {
    setRecipients(recipients.filter(r => r !== email));
  };

  const renderReportPreview = (reportId: string) => {
    switch (reportId) {
      case "faturamento":
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold">Relatório de Faturamento</h4>
              <Badge variant="outline">Período: Último Mês</Badge>
            </div>
            
            {/* KPIs */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <p className="text-xs text-muted-foreground">Receita Total</p>
                <p className="text-xl font-bold text-emerald-600">R$ 67.500</p>
                <div className="flex items-center gap-1 text-xs text-emerald-600">
                  <ArrowUpRight className="h-3 w-3" />
                  +12%
                </div>
              </div>
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                <p className="text-xs text-muted-foreground">Despesas</p>
                <p className="text-xl font-bold text-red-600">R$ 42.000</p>
                <div className="flex items-center gap-1 text-xs text-red-600">
                  <ArrowUpRight className="h-3 w-3" />
                  +5%
                </div>
              </div>
              <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                <p className="text-xs text-muted-foreground">Lucro Líquido</p>
                <p className="text-xl font-bold text-primary">R$ 25.500</p>
                <div className="flex items-center gap-1 text-xs text-primary">
                  <ArrowUpRight className="h-3 w-3" />
                  +18%
                </div>
              </div>
            </div>

            {/* Chart */}
            <div className="h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={faturamentoData}>
                  <defs>
                    <linearGradient id="colorReceita" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(142, 76%, 36%)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(142, 76%, 36%)" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorDespesas" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(0, 84%, 60%)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(0, 84%, 60%)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="mes" stroke="hsl(var(--muted-foreground))" fontSize={10} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={10} tickFormatter={(v) => `${v/1000}k`} />
                  <Area type="monotone" dataKey="receita" stroke="hsl(142, 76%, 36%)" fillOpacity={1} fill="url(#colorReceita)" strokeWidth={2} />
                  <Area type="monotone" dataKey="despesas" stroke="hsl(0, 84%, 60%)" fillOpacity={1} fill="url(#colorDespesas)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        );

      case "consultas":
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold">Relatório de Consultas</h4>
              <Badge variant="outline">Período: Última Semana</Badge>
            </div>
            
            {/* KPIs */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                <p className="text-xs text-muted-foreground">Total Realizadas</p>
                <p className="text-xl font-bold text-primary">119</p>
              </div>
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                <p className="text-xs text-muted-foreground">Canceladas</p>
                <p className="text-xl font-bold text-amber-600">11</p>
              </div>
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <p className="text-xs text-muted-foreground">Taxa de Sucesso</p>
                <p className="text-xl font-bold text-emerald-600">91.5%</p>
              </div>
            </div>

            {/* Chart */}
            <div className="h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={consultasData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="dia" stroke="hsl(var(--muted-foreground))" fontSize={10} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={10} />
                  <Bar dataKey="realizadas" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="canceladas" fill="hsl(0, 84%, 60%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        );

      case "pacientes":
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold">Relatório de Pacientes</h4>
              <Badge variant="outline">Período: Último Mês</Badge>
            </div>
            
            {/* KPIs */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                <p className="text-xs text-muted-foreground">Novos Cadastros</p>
                <p className="text-xl font-bold text-primary">45</p>
                <div className="flex items-center gap-1 text-xs text-emerald-600">
                  <ArrowUpRight className="h-3 w-3" />
                  +23% vs mês anterior
                </div>
              </div>
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <p className="text-xs text-muted-foreground">Total Ativos</p>
                <p className="text-xl font-bold text-emerald-600">1.284</p>
              </div>
            </div>

            {/* Chart */}
            <div className="flex items-center gap-6">
              <div className="h-[150px] w-[150px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RePieChart>
                    <Pie
                      data={pacientesDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={60}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {pacientesDistribution.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                  </RePieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2 flex-1">
                {pacientesDistribution.map((item) => (
                  <div key={item.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-muted-foreground">{item.name}</span>
                    </div>
                    <span className="font-medium">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "ocupacao":
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold">Relatório de Ocupação</h4>
              <Badge variant="outline">Período: Último Mês</Badge>
            </div>
            
            {/* KPIs */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                <p className="text-xs text-muted-foreground">Taxa Média</p>
                <p className="text-xl font-bold text-primary">81%</p>
              </div>
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <p className="text-xs text-muted-foreground">Horário Pico</p>
                <p className="text-xl font-bold text-emerald-600">10h</p>
              </div>
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                <p className="text-xs text-muted-foreground">Menor Taxa</p>
                <p className="text-xl font-bold text-amber-600">17h</p>
              </div>
            </div>

            {/* Chart */}
            <div className="h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ocupacaoData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="hora" stroke="hsl(var(--muted-foreground))" fontSize={10} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={10} tickFormatter={(v) => `${v}%`} />
                  <Bar dataKey="taxa" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        );

      case "produtividade":
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold">Relatório de Produtividade</h4>
              <Badge variant="outline">Período: Último Mês</Badge>
            </div>
            
            {/* KPIs */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                <p className="text-xs text-muted-foreground">Tempo Médio/Consulta</p>
                <p className="text-xl font-bold text-primary">28 min</p>
                <div className="flex items-center gap-1 text-xs text-emerald-600">
                  <ArrowDownRight className="h-3 w-3" />
                  -3 min vs meta
                </div>
              </div>
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <p className="text-xs text-muted-foreground">Consultas/Dia</p>
                <p className="text-xl font-bold text-emerald-600">24</p>
                <div className="flex items-center gap-1 text-xs text-emerald-600">
                  <ArrowUpRight className="h-3 w-3" />
                  +2 vs meta
                </div>
              </div>
            </div>

            {/* Top Performers */}
            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Top Profissionais</p>
              {[
                { name: "Dr. Ricardo", atendimentos: 89, rating: 4.9 },
                { name: "Dra. Ana Paula", atendimentos: 72, rating: 4.8 },
                { name: "Dr. Marcos", atendimentos: 64, rating: 4.7 },
              ].map((prof, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-muted-foreground">{idx + 1}º</span>
                    <span className="text-sm font-medium">{prof.name}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <span>{prof.atendimentos} atend.</span>
                    <Badge variant="outline" className="text-xs">⭐ {prof.rating}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "financeiro":
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold">Relatório Fluxo de Caixa</h4>
              <Badge variant="outline">Período: Último Mês</Badge>
            </div>
            
            {/* KPIs */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <p className="text-xs text-muted-foreground">Entradas</p>
                <p className="text-xl font-bold text-emerald-600">R$ 72.500</p>
              </div>
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                <p className="text-xs text-muted-foreground">Saídas</p>
                <p className="text-xl font-bold text-red-600">R$ 48.200</p>
              </div>
              <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                <p className="text-xs text-muted-foreground">Saldo</p>
                <p className="text-xl font-bold text-primary">R$ 24.300</p>
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Últimas Movimentações</p>
              {[
                { desc: "Pagamento - Maria Silva", value: 350, type: "in" },
                { desc: "Fornecedor - Materiais", value: -1200, type: "out" },
                { desc: "Pagamento - João Pedro", value: 280, type: "in" },
                { desc: "Aluguel", value: -5000, type: "out" },
              ].map((tx, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
                  <span className="text-sm">{tx.desc}</span>
                  <span className={cn(
                    "text-sm font-medium",
                    tx.type === "in" ? "text-emerald-600" : "text-red-600"
                  )}>
                    {tx.type === "in" ? "+" : ""}{tx.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 shadow-lg">
              <Calendar className="h-5 w-5 text-white" />
            </div>
            Agendar Relatório Automático
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="config" className="flex-1 overflow-hidden flex flex-col">
          <TabsList className="bg-muted/50 p-1 mb-4">
            <TabsTrigger value="config" className="gap-2 text-sm">
              <FileText className="h-4 w-4" />
              Configuração
            </TabsTrigger>
            <TabsTrigger value="preview" className="gap-2 text-sm">
              <Eye className="h-4 w-4" />
              Pré-visualização
            </TabsTrigger>
          </TabsList>

          <TabsContent value="config" className="flex-1 overflow-auto space-y-6 mt-0">
            {/* Report Selection */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Relatórios para Gerar</Label>
              <div className="grid sm:grid-cols-2 gap-2">
                {reportTypes.map((report) => (
                  <button
                    key={report.id}
                    onClick={() => toggleReport(report.id)}
                    className={cn(
                      "p-3 rounded-xl border-2 transition-all duration-300 flex items-center gap-3 text-left",
                      selectedReports.includes(report.id)
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/30"
                    )}
                  >
                    <span className="text-2xl">{report.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm">{report.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{report.description}</p>
                    </div>
                    <Checkbox 
                      checked={selectedReports.includes(report.id)}
                      className="pointer-events-none"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Frequency */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Frequência de Geração</Label>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2">
                {frequencies.map((freq) => (
                  <button
                    key={freq.id}
                    onClick={() => setFrequency(freq.id)}
                    className={cn(
                      "p-3 rounded-xl border-2 transition-all duration-300 text-left",
                      frequency === freq.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/30"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <div className={cn(
                        "w-3 h-3 rounded-full border-2 flex items-center justify-center",
                        frequency === freq.id ? "border-primary" : "border-muted-foreground"
                      )}>
                        {frequency === freq.id && (
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{freq.name}</p>
                        <p className="text-xs text-muted-foreground">{freq.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {/* Format */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Formato do Arquivo</Label>
                <Select defaultValue="pdf">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="excel">Excel (.xlsx)</SelectItem>
                    <SelectItem value="csv">CSV</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Notifications */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Notificações</Label>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">E-mail</span>
                    </div>
                    <Switch checked={notifyEmail} onCheckedChange={setNotifyEmail} />
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
                    <div className="flex items-center gap-2">
                      <Bell className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">App</span>
                    </div>
                    <Switch checked={notifyApp} onCheckedChange={setNotifyApp} />
                  </div>
                </div>
              </div>
            </div>

            {/* Recipients */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Destinatários</Label>
              <div className="flex gap-2">
                <Input 
                  placeholder="email@exemplo.com" 
                  value={newRecipient}
                  onChange={(e) => setNewRecipient(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addRecipient()}
                />
                <Button variant="outline" size="icon" onClick={addRecipient}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {recipients.map((email) => (
                  <Badge key={email} variant="secondary" className="gap-1 pr-1">
                    <Mail className="h-3 w-3" />
                    {email}
                    <button 
                      onClick={() => removeRecipient(email)}
                      className="ml-1 hover:bg-muted rounded p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>

            {/* Summary */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span className="font-medium text-sm">Resumo do Agendamento</span>
              </div>
              <div className="grid sm:grid-cols-2 gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Relatórios</span>
                  <span className="font-medium">{selectedReports.length} selecionado(s)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Frequência</span>
                  <span className="font-medium">{frequencies.find(f => f.id === frequency)?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Destinatários</span>
                  <span className="font-medium">{recipients.length} pessoa(s)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Próxima execução</span>
                  <span className="font-medium">09/12/2024 às 08:00</span>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="preview" className="flex-1 overflow-auto mt-0">
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Eye className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Clique em um relatório para ver a pré-visualização de como será enviado
                </span>
              </div>

              <div className="grid lg:grid-cols-2 gap-4">
                {/* Report Selection */}
                <div className="space-y-2">
                  <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Relatórios Selecionados
                  </Label>
                  <ScrollArea className="h-[400px]">
                    <div className="space-y-2 pr-4">
                      {selectedReports.length === 0 ? (
                        <div className="p-6 text-center text-muted-foreground">
                          <FileText className="h-8 w-8 mx-auto mb-2 opacity-50" />
                          <p className="text-sm">Nenhum relatório selecionado</p>
                          <p className="text-xs">Volte à aba Configuração para selecionar relatórios</p>
                        </div>
                      ) : (
                        selectedReports.map((reportId) => {
                          const report = reportTypes.find(r => r.id === reportId);
                          if (!report) return null;
                          return (
                            <button
                              key={reportId}
                              onClick={() => setPreviewReport(reportId)}
                              className={cn(
                                "w-full p-4 rounded-xl border-2 transition-all duration-300 flex items-center gap-3 text-left",
                                previewReport === reportId
                                  ? "border-primary bg-primary/5"
                                  : "border-border hover:border-primary/30"
                              )}
                            >
                              <span className="text-2xl">{report.icon}</span>
                              <div className="flex-1">
                                <p className="font-medium text-sm">{report.name}</p>
                                <p className="text-xs text-muted-foreground">{report.description}</p>
                              </div>
                              <Eye className="h-4 w-4 text-muted-foreground" />
                            </button>
                          );
                        })
                      )}
                    </div>
                  </ScrollArea>
                </div>

                {/* Preview Area */}
                <div className="border rounded-xl p-4 bg-card">
                  {previewReport ? (
                    <div className="space-y-4">
                      {/* Email Header Mock */}
                      <div className="border-b pb-4 mb-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                            <FileText className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <p className="font-semibold text-sm">Clínica MedSaúde</p>
                            <p className="text-xs text-muted-foreground">Relatório Automático</p>
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          <p>Para: {recipients.join(", ")}</p>
                          <p>Assunto: Relatório {reportTypes.find(r => r.id === previewReport)?.name} - {frequencies.find(f => f.id === frequency)?.name}</p>
                        </div>
                      </div>

                      {/* Report Content */}
                      {renderReportPreview(previewReport)}
                    </div>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center p-6">
                      <div className="p-4 rounded-2xl bg-muted/50 mb-4">
                        <Eye className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <h4 className="font-medium mb-1">Selecione um relatório</h4>
                      <p className="text-sm text-muted-foreground">
                        Clique em um dos relatórios à esquerda para ver como será enviado
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button 
            className="gap-2" 
            onClick={handleCreateSchedule}
            disabled={isCreating || selectedReports.length === 0}
          >
            {isCreating ? (
              <>
                <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Criando...
              </>
            ) : (
              <>
                <Calendar className="h-4 w-4" />
                Criar Agendamento
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
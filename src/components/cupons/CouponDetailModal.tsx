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
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Ticket,
  Copy,
  QrCode,
  Download,
  Edit,
  MoreHorizontal,
  TrendingUp,
  Users,
  DollarSign,
  Percent,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Sparkles,
  Plus,
  RefreshCw,
  XCircle,
  ExternalLink,
  Eye,
  Ban,
  RotateCcw,
  Printer,
  Share2,
  BarChart3,
  Target,
  Zap,
} from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Coupon {
  id: string;
  code: string;
  name: string;
  description: string;
  scope: string;
  type: string;
  percentOff: number | null;
  amountOffCents: number | null;
  duration: string;
  durationInMonths: number | null;
  currency: string;
  validFrom: Date;
  validTo: Date | null;
  active: boolean;
  maxRedemptions: number | null;
  maxPerCustomer: number;
  currentRedemptions: number;
  totalSavings: number;
  uniqueCustomers: number;
  partnerId: string | null;
}

interface CouponDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  coupon: Coupon | null;
}

// Mock redemptions data
const mockRedemptions = [
  {
    id: "1",
    createdAt: new Date("2024-03-15T10:30:00"),
    appliedAt: new Date("2024-03-15T10:32:00"),
    status: "APPLIED",
    codeType: "CAMPAIGN",
    patientName: "Maria Silva",
    patientEmail: "maria@email.com",
    originalValue: 15000,
    discountApplied: 3000,
  },
  {
    id: "2",
    createdAt: new Date("2024-03-14T14:20:00"),
    appliedAt: new Date("2024-03-14T14:25:00"),
    status: "APPLIED",
    codeType: "UNIQUE",
    patientName: "João Santos",
    patientEmail: "joao@email.com",
    originalValue: 20000,
    discountApplied: 4000,
  },
  {
    id: "3",
    createdAt: new Date("2024-03-13T09:15:00"),
    appliedAt: null,
    status: "VALIDATED",
    codeType: "CAMPAIGN",
    patientName: "Ana Oliveira",
    patientEmail: "ana@email.com",
    originalValue: 12000,
    discountApplied: 2400,
  },
  {
    id: "4",
    createdAt: new Date("2024-03-12T16:45:00"),
    appliedAt: new Date("2024-03-12T16:50:00"),
    status: "REVERSED",
    codeType: "CAMPAIGN",
    patientName: "Carlos Lima",
    patientEmail: "carlos@email.com",
    originalValue: 18000,
    discountApplied: 3600,
  },
];

// Mock unique codes
const mockUniqueCodes = [
  { id: "1", code: "WELCOME20-A1B2C3", status: "AVAILABLE", createdAt: new Date("2024-03-01") },
  { id: "2", code: "WELCOME20-D4E5F6", status: "USED", createdAt: new Date("2024-03-01"), usedAt: new Date("2024-03-10"), usedBy: "Maria Silva" },
  { id: "3", code: "WELCOME20-G7H8I9", status: "AVAILABLE", createdAt: new Date("2024-03-01") },
  { id: "4", code: "WELCOME20-J0K1L2", status: "REVOKED", createdAt: new Date("2024-03-01"), revokedAt: new Date("2024-03-05") },
  { id: "5", code: "WELCOME20-M3N4O5", status: "USED", createdAt: new Date("2024-03-01"), usedAt: new Date("2024-03-12"), usedBy: "João Santos" },
];

// Mock alerts
const mockAlerts = [
  { id: "1", type: "warning", message: "80% do limite de resgates atingido", threshold: 80, current: 68.4, createdAt: new Date("2024-03-15") },
  { id: "2", type: "info", message: "50% do limite de resgates atingido", threshold: 50, current: 50, createdAt: new Date("2024-03-10") },
];

export const CouponDetailModal = ({ open, onOpenChange, coupon }: CouponDetailModalProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isActive, setIsActive] = useState(coupon?.active ?? true);
  const [generateQuantity, setGenerateQuantity] = useState("10");
  const [generatePrefix, setGeneratePrefix] = useState("");

  if (!coupon) return null;

  const usagePercentage = coupon.maxRedemptions 
    ? Math.round((coupon.currentRedemptions / coupon.maxRedemptions) * 100)
    : 0;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "APPLIED":
        return <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-200">Aplicado</Badge>;
      case "VALIDATED":
        return <Badge className="bg-amber-500/10 text-amber-600 border-amber-200">Validado</Badge>;
      case "REVERSED":
        return <Badge className="bg-destructive/10 text-destructive border-destructive/20">Revertido</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getCodeStatusBadge = (status: string) => {
    switch (status) {
      case "AVAILABLE":
        return <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-200">Disponível</Badge>;
      case "USED":
        return <Badge className="bg-blue-500/10 text-blue-600 border-blue-200">Usado</Badge>;
      case "REVOKED":
        return <Badge className="bg-destructive/10 text-destructive border-destructive/20">Revogado</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0 overflow-hidden">
        {/* Header with Gradient */}
        <div className="relative bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-6 border-b">
          <div className="absolute inset-0 bg-grid-primary/5 [mask-image:linear-gradient(0deg,transparent,black)]" />
          
          <div className="relative flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Ticket className="h-8 w-8 text-primary" />
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <code className="px-3 py-1.5 rounded-lg bg-background border font-mono text-lg font-bold tracking-wider">
                    {coupon.code}
                  </code>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <h2 className="text-xl font-semibold mt-1">{coupon.name}</h2>
                <p className="text-sm text-muted-foreground mt-0.5">{coupon.description}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-background rounded-lg px-3 py-2 border">
                <span className="text-sm text-muted-foreground">Status:</span>
                <Switch
                  checked={isActive}
                  onCheckedChange={setIsActive}
                  className="data-[state=checked]:bg-emerald-500"
                />
                <span className={`text-sm font-medium ${isActive ? "text-emerald-600" : "text-muted-foreground"}`}>
                  {isActive ? "Ativo" : "Inativo"}
                </span>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="gap-2">
                    <Edit className="h-4 w-4" />
                    Editar
                  </DropdownMenuItem>
                  <DropdownMenuItem className="gap-2">
                    <Copy className="h-4 w-4" />
                    Duplicar
                  </DropdownMenuItem>
                  <DropdownMenuItem className="gap-2">
                    <Share2 className="h-4 w-4" />
                    Compartilhar
                  </DropdownMenuItem>
                  <DropdownMenuItem className="gap-2">
                    <Printer className="h-4 w-4" />
                    Imprimir
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-4 gap-4 mt-6">
            <div className="bg-background/80 backdrop-blur rounded-xl p-4 border">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <Target className="h-4 w-4" />
                <span className="text-xs">Resgates</span>
              </div>
              <p className="text-2xl font-bold">{coupon.currentRedemptions.toLocaleString()}</p>
              {coupon.maxRedemptions && (
                <p className="text-xs text-muted-foreground">de {coupon.maxRedemptions.toLocaleString()}</p>
              )}
            </div>
            <div className="bg-background/80 backdrop-blur rounded-xl p-4 border">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <DollarSign className="h-4 w-4" />
                <span className="text-xs">Economia Total</span>
              </div>
              <p className="text-2xl font-bold">R$ {(coupon.totalSavings / 100).toLocaleString("pt-BR")}</p>
            </div>
            <div className="bg-background/80 backdrop-blur rounded-xl p-4 border">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <Users className="h-4 w-4" />
                <span className="text-xs">Clientes Únicos</span>
              </div>
              <p className="text-2xl font-bold">{coupon.uniqueCustomers}</p>
            </div>
            <div className="bg-background/80 backdrop-blur rounded-xl p-4 border">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                {coupon.type === "PERCENT" ? <Percent className="h-4 w-4" /> : <DollarSign className="h-4 w-4" />}
                <span className="text-xs">Desconto</span>
              </div>
              <p className="text-2xl font-bold">
                {coupon.type === "PERCENT" 
                  ? `${coupon.percentOff}%` 
                  : `R$ ${((coupon.amountOffCents || 0) / 100).toFixed(2)}`}
              </p>
            </div>
          </div>
        </div>

        {/* Tabs Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
          <div className="border-b px-6">
            <TabsList className="h-12 bg-transparent p-0 gap-6">
              <TabsTrigger 
                value="overview" 
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-12 px-0"
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                Visão Geral
              </TabsTrigger>
              <TabsTrigger 
                value="redemptions"
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-12 px-0"
              >
                <Target className="h-4 w-4 mr-2" />
                Resgates
              </TabsTrigger>
              <TabsTrigger 
                value="codes"
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-12 px-0"
              >
                <QrCode className="h-4 w-4 mr-2" />
                Códigos Únicos
              </TabsTrigger>
              <TabsTrigger 
                value="alerts"
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-12 px-0"
              >
                <AlertTriangle className="h-4 w-4 mr-2" />
                Alertas
                {mockAlerts.length > 0 && (
                  <Badge variant="destructive" className="ml-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                    {mockAlerts.length}
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>
          </div>

          <ScrollArea className="h-[400px]">
            <div className="p-6">
              {/* Overview Tab */}
              <TabsContent value="overview" className="mt-0 space-y-6">
                {/* Budget Progress */}
                {coupon.maxRedemptions && (
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Zap className="h-4 w-4 text-amber-500" />
                        Orçamento de Resgates
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Progresso</span>
                          <span className={`font-bold ${usagePercentage >= 80 ? "text-amber-500" : "text-emerald-500"}`}>
                            {usagePercentage}%
                          </span>
                        </div>
                        <Progress 
                          value={usagePercentage} 
                          className={`h-3 ${usagePercentage >= 80 ? "[&>div]:bg-amber-500" : ""}`}
                        />
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{coupon.currentRedemptions} usados</span>
                          <span>{coupon.maxRedemptions - coupon.currentRedemptions} restantes</span>
                        </div>
                        {usagePercentage >= 80 && (
                          <div className="flex items-center gap-2 p-3 rounded-lg bg-amber-500/10 text-amber-600 text-sm">
                            <AlertTriangle className="h-4 w-4" />
                            <span>Atenção: {usagePercentage}% do orçamento utilizado</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">Detalhes do Cupom</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Escopo</span>
                        <Badge variant="outline">
                          {coupon.scope === "CLINIC_CHECKOUT" ? "Checkout" : "Assinatura"}
                        </Badge>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Duração</span>
                        <span className="font-medium">
                          {coupon.duration === "ONCE" && "Uso único"}
                          {coupon.duration === "REPEATING" && `${coupon.durationInMonths} meses`}
                          {coupon.duration === "FOREVER" && "Permanente"}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Limite por cliente</span>
                        <span className="font-medium">{coupon.maxPerCustomer}x</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Moeda</span>
                        <span className="font-medium">{coupon.currency}</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">Período de Validade</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Início</span>
                        <span className="font-medium">
                          {format(coupon.validFrom, "dd/MM/yyyy", { locale: ptBR })}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Fim</span>
                        <span className="font-medium">
                          {coupon.validTo 
                            ? format(coupon.validTo, "dd/MM/yyyy", { locale: ptBR })
                            : "Sem limite"}
                        </span>
                      </div>
                      {coupon.partnerId && (
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Parceiro</span>
                          <Badge variant="secondary" className="gap-1">
                            <Users className="h-3 w-3" />
                            Afiliado
                          </Badge>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Redemptions Tab */}
              <TabsContent value="redemptions" className="mt-0">
                <Card>
                  <CardHeader className="pb-3 flex flex-row items-center justify-between">
                    <CardTitle className="text-base">Histórico de Resgates</CardTitle>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Download className="h-4 w-4" />
                      Exportar
                    </Button>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Data</TableHead>
                          <TableHead>Paciente</TableHead>
                          <TableHead>Tipo</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Valor Base</TableHead>
                          <TableHead className="text-right">Desconto</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mockRedemptions.map((redemption) => (
                          <TableRow key={redemption.id}>
                            <TableCell className="text-sm">
                              <div>
                                {format(redemption.createdAt, "dd/MM/yyyy", { locale: ptBR })}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {format(redemption.createdAt, "HH:mm")}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="text-sm font-medium">{redemption.patientName}</div>
                              <div className="text-xs text-muted-foreground">{redemption.patientEmail}</div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className="text-xs">
                                {redemption.codeType === "UNIQUE" ? "Único" : "Campanha"}
                              </Badge>
                            </TableCell>
                            <TableCell>{getStatusBadge(redemption.status)}</TableCell>
                            <TableCell className="text-right text-sm">
                              R$ {(redemption.originalValue / 100).toFixed(2)}
                            </TableCell>
                            <TableCell className="text-right">
                              <span className="text-sm font-medium text-emerald-600">
                                -R$ {(redemption.discountApplied / 100).toFixed(2)}
                              </span>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Unique Codes Tab */}
              <TabsContent value="codes" className="mt-0 space-y-4">
                {/* Generate Codes Section */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-primary" />
                      Gerar Códigos Únicos
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-end gap-4">
                      <div className="flex-1 space-y-2">
                        <Label>Quantidade</Label>
                        <Input
                          type="number"
                          min="1"
                          max="100"
                          value={generateQuantity}
                          onChange={(e) => setGenerateQuantity(e.target.value)}
                          placeholder="10"
                        />
                      </div>
                      <div className="flex-1 space-y-2">
                        <Label>Prefixo (opcional)</Label>
                        <Input
                          value={generatePrefix}
                          onChange={(e) => setGeneratePrefix(e.target.value.toUpperCase())}
                          placeholder="Ex: VIP"
                        />
                      </div>
                      <Button className="gap-2">
                        <Plus className="h-4 w-4" />
                        Gerar Códigos
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Codes Table */}
                <Card>
                  <CardHeader className="pb-3 flex flex-row items-center justify-between">
                    <CardTitle className="text-base">Códigos Gerados ({mockUniqueCodes.length})</CardTitle>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="gap-2">
                        <QrCode className="h-4 w-4" />
                        QR Codes
                      </Button>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Download className="h-4 w-4" />
                        Exportar
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Código</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Criado em</TableHead>
                          <TableHead>Usado por</TableHead>
                          <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mockUniqueCodes.map((code) => (
                          <TableRow key={code.id}>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <code className="font-mono text-sm">{code.code}</code>
                                <Button variant="ghost" size="icon" className="h-6 w-6">
                                  <Copy className="h-3 w-3" />
                                </Button>
                              </div>
                            </TableCell>
                            <TableCell>{getCodeStatusBadge(code.status)}</TableCell>
                            <TableCell className="text-sm text-muted-foreground">
                              {format(code.createdAt, "dd/MM/yyyy", { locale: ptBR })}
                            </TableCell>
                            <TableCell>
                              {code.usedBy ? (
                                <span className="text-sm">{code.usedBy}</span>
                              ) : (
                                <span className="text-sm text-muted-foreground">—</span>
                              )}
                            </TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem className="gap-2">
                                    <QrCode className="h-4 w-4" />
                                    Ver QR Code
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="gap-2">
                                    <Copy className="h-4 w-4" />
                                    Copiar
                                  </DropdownMenuItem>
                                  {code.status === "AVAILABLE" && (
                                    <DropdownMenuItem className="gap-2 text-destructive">
                                      <Ban className="h-4 w-4" />
                                      Revogar
                                    </DropdownMenuItem>
                                  )}
                                  {code.status === "REVOKED" && (
                                    <DropdownMenuItem className="gap-2 text-emerald-600">
                                      <RotateCcw className="h-4 w-4" />
                                      Restaurar
                                    </DropdownMenuItem>
                                  )}
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Alerts Tab */}
              <TabsContent value="alerts" className="mt-0">
                <div className="space-y-3">
                  {mockAlerts.map((alert) => (
                    <Card 
                      key={alert.id} 
                      className={`${
                        alert.type === "warning" 
                          ? "border-amber-200 bg-amber-50/50 dark:bg-amber-950/20" 
                          : "border-blue-200 bg-blue-50/50 dark:bg-blue-950/20"
                      }`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3">
                            <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${
                              alert.type === "warning" ? "bg-amber-500/10" : "bg-blue-500/10"
                            }`}>
                              <AlertTriangle className={`h-5 w-5 ${
                                alert.type === "warning" ? "text-amber-500" : "text-blue-500"
                              }`} />
                            </div>
                            <div>
                              <p className="font-medium">{alert.message}</p>
                              <p className="text-sm text-muted-foreground mt-1">
                                Threshold: {alert.threshold}% · Atual: {alert.current}%
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                {format(alert.createdAt, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                              </p>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            Dispensar
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  {mockAlerts.length === 0 && (
                    <Card className="p-8 text-center">
                      <CheckCircle2 className="h-12 w-12 text-emerald-500 mx-auto mb-3" />
                      <p className="font-medium">Nenhum alerta ativo</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Você será notificado quando houver alertas importantes
                      </p>
                    </Card>
                  )}
                </div>
              </TabsContent>
            </div>
          </ScrollArea>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

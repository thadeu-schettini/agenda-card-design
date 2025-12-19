import { useState } from "react";
import { PageContainer } from "@/components/ui/page-container";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
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
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  TrendingUp,
  Users,
  DollarSign,
  Percent,
  Calendar,
  Copy,
  QrCode,
  Download,
  Eye,
  Edit,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowUpRight,
  Target,
  Zap,
  Gift,
  RefreshCw,
  BarChart3,
  PieChart,
} from "lucide-react";
import { NewCouponModal } from "@/components/cupons/NewCouponModal";
import { CouponDetailModal } from "@/components/cupons/CouponDetailModal";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

// Mock data for coupons
const mockCoupons = [
  {
    id: "1",
    code: "WELCOME20",
    name: "Boas-vindas 20%",
    description: "Desconto de boas-vindas para novos pacientes",
    scope: "CLINIC_CHECKOUT",
    type: "PERCENT",
    percentOff: 20,
    amountOffCents: null,
    duration: "ONCE",
    durationInMonths: null,
    currency: "BRL",
    validFrom: new Date("2024-01-01"),
    validTo: new Date("2024-12-31"),
    active: true,
    maxRedemptions: 500,
    maxPerCustomer: 1,
    currentRedemptions: 342,
    totalSavings: 15680,
    uniqueCustomers: 342,
    partnerId: null,
  },
  {
    id: "2",
    code: "FIDELIDADE50",
    name: "Fidelidade Premium",
    description: "R$50 de desconto para clientes recorrentes",
    scope: "CLINIC_CHECKOUT",
    type: "FIXED",
    percentOff: null,
    amountOffCents: 5000,
    duration: "REPEATING",
    durationInMonths: 3,
    currency: "BRL",
    validFrom: new Date("2024-03-01"),
    validTo: new Date("2024-09-30"),
    active: true,
    maxRedemptions: 200,
    maxPerCustomer: 3,
    currentRedemptions: 156,
    totalSavings: 7800,
    uniqueCustomers: 89,
    partnerId: "partner-1",
  },
  {
    id: "3",
    code: "ANUAL2024",
    name: "Assinatura Anual",
    description: "30% off na assinatura anual",
    scope: "SUBSCRIPTION",
    type: "PERCENT",
    percentOff: 30,
    amountOffCents: null,
    duration: "FOREVER",
    durationInMonths: null,
    currency: "BRL",
    validFrom: new Date("2024-01-01"),
    validTo: null,
    active: true,
    maxRedemptions: null,
    maxPerCustomer: 1,
    currentRedemptions: 78,
    totalSavings: 23400,
    uniqueCustomers: 78,
    partnerId: null,
  },
  {
    id: "4",
    code: "BLACKFRIDAY",
    name: "Black Friday 2024",
    description: "Super desconto Black Friday",
    scope: "CLINIC_CHECKOUT",
    type: "PERCENT",
    percentOff: 40,
    amountOffCents: null,
    duration: "ONCE",
    durationInMonths: null,
    currency: "BRL",
    validFrom: new Date("2024-11-25"),
    validTo: new Date("2024-11-30"),
    active: false,
    maxRedemptions: 1000,
    maxPerCustomer: 2,
    currentRedemptions: 0,
    totalSavings: 0,
    uniqueCustomers: 0,
    partnerId: null,
  },
  {
    id: "5",
    code: "PARCEIRO10",
    name: "Parceiro Exclusivo",
    description: "Desconto exclusivo para parceiros afiliados",
    scope: "CLINIC_CHECKOUT",
    type: "PERCENT",
    percentOff: 10,
    amountOffCents: null,
    duration: "ONCE",
    durationInMonths: null,
    currency: "BRL",
    validFrom: new Date("2024-01-01"),
    validTo: new Date("2025-12-31"),
    active: true,
    maxRedemptions: 5000,
    maxPerCustomer: 5,
    currentRedemptions: 1234,
    totalSavings: 45670,
    uniqueCustomers: 890,
    partnerId: "partner-2",
  },
];

const Cupons = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [newCouponOpen, setNewCouponOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<typeof mockCoupons[0] | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  // Calculate totals
  const totalCoupons = mockCoupons.length;
  const activeCoupons = mockCoupons.filter((c) => c.active).length;
  const totalRedemptions = mockCoupons.reduce((acc, c) => acc + c.currentRedemptions, 0);
  const totalSavings = mockCoupons.reduce((acc, c) => acc + c.totalSavings, 0);

  const filteredCoupons = mockCoupons.filter((coupon) => {
    const matchesSearch =
      coupon.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coupon.name.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeTab === "all") return matchesSearch;
    if (activeTab === "active") return matchesSearch && coupon.active;
    if (activeTab === "inactive") return matchesSearch && !coupon.active;
    if (activeTab === "checkout") return matchesSearch && coupon.scope === "CLINIC_CHECKOUT";
    if (activeTab === "subscription") return matchesSearch && coupon.scope === "SUBSCRIPTION";
    return matchesSearch;
  });

  const getUsagePercentage = (coupon: typeof mockCoupons[0]) => {
    if (!coupon.maxRedemptions) return 0;
    return Math.round((coupon.currentRedemptions / coupon.maxRedemptions) * 100);
  };

  const getUsageColor = (percentage: number) => {
    if (percentage >= 90) return "text-destructive";
    if (percentage >= 80) return "text-amber-500";
    return "text-emerald-500";
  };

  const handleViewCoupon = (coupon: typeof mockCoupons[0]) => {
    setSelectedCoupon(coupon);
    setDetailOpen(true);
  };

  return (
    <PageContainer>
      <PageHeader
        title="Cupons de Desconto"
        description="Gerencie cupons promocionais, códigos únicos e acompanhe métricas de conversão"
      />

      {/* Hero Metrics Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total de Cupons</p>
                <h3 className="text-3xl font-bold mt-1">{totalCoupons}</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="text-emerald-500 font-medium">{activeCoupons} ativos</span> · {totalCoupons - activeCoupons} inativos
                </p>
              </div>
              <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Ticket className="h-7 w-7 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Resgatado</p>
                <h3 className="text-3xl font-bold mt-1">{totalRedemptions.toLocaleString()}</h3>
                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3 text-emerald-500" />
                  <span className="text-emerald-500 font-medium">+12.5%</span> vs. mês anterior
                </p>
              </div>
              <div className="h-14 w-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                <Target className="h-7 w-7 text-emerald-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-violet-500/10 via-violet-500/5 to-transparent">
          <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Economia Gerada</p>
                <h3 className="text-3xl font-bold mt-1">
                  R$ {(totalSavings / 100).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </h3>
                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                  <Sparkles className="h-3 w-3 text-violet-500" />
                  <span className="text-violet-500 font-medium">Valor economizado</span> pelos clientes
                </p>
              </div>
              <div className="h-14 w-14 rounded-2xl bg-violet-500/10 flex items-center justify-center">
                <DollarSign className="h-7 w-7 text-violet-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Taxa de Conversão</p>
                <h3 className="text-3xl font-bold mt-1">68.4%</h3>
                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                  <ArrowUpRight className="h-3 w-3 text-amber-500" />
                  <span className="text-amber-500 font-medium">+5.2%</span> esta semana
                </p>
              </div>
              <div className="h-14 w-14 rounded-2xl bg-amber-500/10 flex items-center justify-center">
                <PieChart className="h-7 w-7 text-amber-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por código ou nome do cupom..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filtros
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Exportar
          </Button>
          <Button onClick={() => setNewCouponOpen(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            Novo Cupom
          </Button>
        </div>
      </div>

      {/* Tabs and Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="bg-muted/50 p-1">
          <TabsTrigger value="all" className="gap-2">
            <Ticket className="h-4 w-4" />
            Todos
            <Badge variant="secondary" className="ml-1 text-xs">{mockCoupons.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="active" className="gap-2">
            <CheckCircle2 className="h-4 w-4" />
            Ativos
            <Badge variant="secondary" className="ml-1 text-xs bg-emerald-500/10 text-emerald-600">{activeCoupons}</Badge>
          </TabsTrigger>
          <TabsTrigger value="inactive" className="gap-2">
            <Clock className="h-4 w-4" />
            Inativos
          </TabsTrigger>
          <TabsTrigger value="checkout" className="gap-2">
            <Gift className="h-4 w-4" />
            Checkout
          </TabsTrigger>
          <TabsTrigger value="subscription" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Assinatura
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          {/* Coupons Grid */}
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredCoupons.map((coupon) => {
              const usagePercentage = getUsagePercentage(coupon);
              const isNearLimit = usagePercentage >= 80;

              return (
                <Card
                  key={coupon.id}
                  className="group relative overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
                  onClick={() => handleViewCoupon(coupon)}
                >
                  {/* Decorative ticket perforations */}
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-8 bg-background rounded-r-full border-r border-y" />
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-8 bg-background rounded-l-full border-l border-y" />
                  
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 opacity-5 bg-gradient-to-br ${
                    coupon.type === "PERCENT" 
                      ? "from-violet-500 to-purple-600" 
                      : "from-emerald-500 to-teal-600"
                  }`} />

                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <code className="px-2.5 py-1 rounded-md bg-muted font-mono text-sm font-bold tracking-wider">
                            {coupon.code}
                          </code>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigator.clipboard.writeText(coupon.code);
                            }}
                          >
                            <Copy className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                        <CardTitle className="text-base">{coupon.name}</CardTitle>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={coupon.active}
                          onClick={(e) => e.stopPropagation()}
                          className="data-[state=checked]:bg-emerald-500"
                        />
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Discount Display */}
                    <div className="flex items-center gap-3">
                      <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${
                        coupon.type === "PERCENT"
                          ? "bg-violet-500/10"
                          : "bg-emerald-500/10"
                      }`}>
                        {coupon.type === "PERCENT" ? (
                          <Percent className="h-6 w-6 text-violet-500" />
                        ) : (
                          <DollarSign className="h-6 w-6 text-emerald-500" />
                        )}
                      </div>
                      <div>
                        <p className="text-2xl font-bold">
                          {coupon.type === "PERCENT"
                            ? `${coupon.percentOff}%`
                            : `R$ ${((coupon.amountOffCents || 0) / 100).toFixed(2)}`}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {coupon.duration === "ONCE" && "Uso único"}
                          {coupon.duration === "REPEATING" && `${coupon.durationInMonths} meses`}
                          {coupon.duration === "FOREVER" && "Para sempre"}
                        </p>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      <Badge variant="outline" className="text-xs">
                        {coupon.scope === "CLINIC_CHECKOUT" ? "Checkout" : "Assinatura"}
                      </Badge>
                      {coupon.partnerId && (
                        <Badge variant="secondary" className="text-xs gap-1">
                          <Users className="h-3 w-3" />
                          Parceiro
                        </Badge>
                      )}
                      {coupon.validTo && new Date(coupon.validTo) < new Date() && (
                        <Badge variant="destructive" className="text-xs">
                          Expirado
                        </Badge>
                      )}
                    </div>

                    {/* Usage Progress */}
                    {coupon.maxRedemptions && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Uso</span>
                          <span className={`font-medium ${getUsageColor(usagePercentage)}`}>
                            {coupon.currentRedemptions} / {coupon.maxRedemptions}
                          </span>
                        </div>
                        <Progress 
                          value={usagePercentage} 
                          className={`h-2 ${isNearLimit ? "[&>div]:bg-amber-500" : ""}`}
                        />
                        {isNearLimit && (
                          <p className="text-xs text-amber-500 flex items-center gap-1">
                            <AlertTriangle className="h-3 w-3" />
                            {usagePercentage}% do limite utilizado
                          </p>
                        )}
                      </div>
                    )}

                    {/* Stats Footer */}
                    <div className="flex items-center justify-between pt-3 border-t text-sm">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Users className="h-3.5 w-3.5" />
                          <span>{coupon.uniqueCustomers}</span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <DollarSign className="h-3.5 w-3.5" />
                          <span>R$ {(coupon.totalSavings / 100).toFixed(0)}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="h-3.5 w-3.5" />
                        {coupon.validTo ? format(coupon.validTo, "dd MMM", { locale: ptBR }) : "∞"}
                      </div>
                    </div>
                  </CardContent>

                  {/* Hover Actions */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="gap-2">
                          <Eye className="h-4 w-4" />
                          Ver detalhes
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                          <Edit className="h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                          <QrCode className="h-4 w-4" />
                          Gerar QR Code
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                          <Copy className="h-4 w-4" />
                          Duplicar
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 text-destructive">
                          <Trash2 className="h-4 w-4" />
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </Card>
              );
            })}
          </div>

          {filteredCoupons.length === 0 && (
            <Card className="p-12 text-center">
              <div className="flex flex-col items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                  <Ticket className="h-8 w-8 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold">Nenhum cupom encontrado</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {searchQuery 
                      ? "Tente ajustar os termos da busca"
                      : "Crie seu primeiro cupom para começar"}
                  </p>
                </div>
                <Button onClick={() => setNewCouponOpen(true)} className="gap-2">
                  <Plus className="h-4 w-4" />
                  Criar Cupom
                </Button>
              </div>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Modals */}
      <NewCouponModal open={newCouponOpen} onOpenChange={setNewCouponOpen} />
      <CouponDetailModal 
        open={detailOpen} 
        onOpenChange={setDetailOpen} 
        coupon={selectedCoupon}
      />
    </PageContainer>
  );
};

export default Cupons;

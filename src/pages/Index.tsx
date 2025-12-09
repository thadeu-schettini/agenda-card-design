import { useState } from "react";
import {
  Calendar,
  Users,
  DollarSign,
  TrendingUp,
  Clock,
  UserCheck,
  CalendarCheck,
  AlertCircle,
  LayoutDashboard,
  Sparkles,
} from "lucide-react";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { AppointmentsChart } from "@/components/dashboard/AppointmentsChart";
import { UpcomingAppointments } from "@/components/dashboard/UpcomingAppointments";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { PageContainer, PageContent } from "@/components/ui/page-container";
import { Badge } from "@/components/ui/badge";
import WelcomeSetupModal from "@/components/WelcomeSetupModal";
import SetupChecklist from "@/components/SetupChecklist";

const Index = () => {
  const [showWelcomeModal, setShowWelcomeModal] = useState(true);

  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? "Bom dia" : currentHour < 18 ? "Boa tarde" : "Boa noite";

  return (
    <PageContainer>
      {/* Custom Dashboard Header */}
      <div className="border-b bg-background/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-primary to-primary/60 shadow-lg shrink-0">
                <LayoutDashboard className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold text-foreground">
                    {greeting}, Dr. Ricardo
                  </h1>
                  <Badge variant="secondary" className="gap-1 text-xs">
                    <Sparkles className="h-3 w-3" />
                    Pro
                  </Badge>
                </div>
                <p className="text-muted-foreground text-sm">
                  Aqui está o resumo da sua clínica hoje,{" "}
                  {new Date().toLocaleDateString("pt-BR", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                  })}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-warning/10 border border-warning/20 px-4 py-2 text-warning">
              <AlertCircle className="h-5 w-5" />
              <span className="text-sm font-medium">3 confirmações pendentes</span>
            </div>
          </div>
        </div>
      </div>

      <PageContent>
        {/* Metrics Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Agendamentos Hoje"
            value={24}
            change="+12%"
            changeType="positive"
            icon={Calendar}
            description="vs. semana passada"
          />
          <MetricCard
            title="Pacientes Ativos"
            value="1.284"
            change="+48"
            changeType="positive"
            icon={Users}
            description="este mês"
          />
          <MetricCard
            title="Receita Mensal"
            value="R$ 67.5k"
            change="+8.2%"
            changeType="positive"
            icon={DollarSign}
            description="vs. mês anterior"
          />
          <MetricCard
            title="Taxa de Ocupação"
            value="87%"
            change="-3%"
            changeType="negative"
            icon={TrendingUp}
            description="capacidade utilizada"
          />
        </div>

        {/* Charts Row */}
        <div className="grid gap-6 lg:grid-cols-2">
          <RevenueChart />
          <AppointmentsChart />
        </div>

        {/* Bottom Section */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <UpcomingAppointments />
          </div>
          <div>
            <QuickActions />
          </div>
        </div>

        {/* Additional Metrics */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Tempo Médio de Espera"
            value="12min"
            change="-2min"
            changeType="positive"
            icon={Clock}
            description="vs. média anterior"
          />
          <MetricCard
            title="Taxa de Comparecimento"
            value="94%"
            change="+2%"
            changeType="positive"
            icon={UserCheck}
            description="no-show reduzido"
          />
          <MetricCard
            title="Consultas Realizadas"
            value={156}
            change="+18"
            changeType="positive"
            icon={CalendarCheck}
            description="esta semana"
          />
          <MetricCard
            title="Novos Pacientes"
            value={23}
            change="+5"
            changeType="positive"
            icon={Users}
            description="esta semana"
          />
        </div>
      </PageContent>

      {/* Setup components */}
      <WelcomeSetupModal open={showWelcomeModal} onOpenChange={setShowWelcomeModal} />
      <SetupChecklist />
    </PageContainer>
  );
};

export default Index;

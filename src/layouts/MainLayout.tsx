import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Outlet, useLocation } from "react-router-dom";
import {
  Home,
  Calendar,
  Users,
  UserCog,
  FileText,
  ClipboardList,
  Settings,
  Gift,
  CreditCard,
  DollarSign,
  Building2,
} from "lucide-react";

interface MainLayoutProps {
  children?: React.ReactNode;
}

const pageInfo: Record<string, { title: string; icon: React.ElementType }> = {
  "/": { title: "Dashboard", icon: Home },
  "/calendar": { title: "Agenda", icon: Calendar },
  "/recepcao": { title: "Recepção", icon: Building2 },
  "/pacientes": { title: "Pacientes", icon: Users },
  "/prontuario": { title: "Prontuário", icon: FileText },
  "/profissionais": { title: "Profissionais", icon: UserCog },
  "/formularios-clinicos": { title: "Formulários", icon: ClipboardList },
  "/financeiro": { title: "Financeiro", icon: DollarSign },
  "/indicacoes": { title: "Indicações", icon: Gift },
  "/billing": { title: "Faturamento", icon: CreditCard },
  "/configuracoes": { title: "Configurações", icon: Settings },
};

export function MainLayout({ children }: MainLayoutProps) {
  const location = useLocation();
  const currentPage = pageInfo[location.pathname] || { title: "MedClinic", icon: Home };
  const PageIcon = currentPage.icon;

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        <main className="flex-1 overflow-auto">
          {/* Mobile header with menu trigger */}
          <div className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b border-border/50 bg-background/80 px-4 backdrop-blur-sm lg:hidden">
            <SidebarTrigger className="shrink-0" />
            <div className="flex items-center gap-2 flex-1">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/70">
                <PageIcon className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-semibold text-foreground">{currentPage.title}</span>
            </div>
          </div>
          {/* Page content with transition animation */}
          <div className="animate-fade-in">
            {children || <Outlet />}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}

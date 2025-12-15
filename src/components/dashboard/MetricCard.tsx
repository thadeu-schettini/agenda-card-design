import { useState } from "react";
import { LucideIcon, Calendar, Users, DollarSign, TrendingUp, Clock, UserCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { AppointmentsDetailModal } from "./AppointmentsDetailModal";
import { PatientsDetailModal } from "@/components/analises/PatientsDetailModal";
import { RevenueDetailModal } from "@/components/analises/RevenueDetailModal";
import { OccupancyDetailModal } from "@/components/analises/OccupancyDetailModal";
import { WaitTimeDetailModal } from "@/components/analises/WaitTimeDetailModal";
import { AttendanceDetailModal } from "./AttendanceDetailModal";

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  iconGradient?: string;
  description?: string;
  index?: number;
}

export function MetricCard({
  title,
  value,
  change,
  changeType = "neutral",
  icon: Icon,
  iconGradient = "from-primary/80 to-primary/60",
  description,
  index = 0,
}: MetricCardProps) {
  const [showAppointmentsModal, setShowAppointmentsModal] = useState(false);
  const [showPatientsModal, setShowPatientsModal] = useState(false);
  const [showRevenueModal, setShowRevenueModal] = useState(false);
  const [showOccupancyModal, setShowOccupancyModal] = useState(false);
  const [showWaitTimeModal, setShowWaitTimeModal] = useState(false);
  const [showAttendanceModal, setShowAttendanceModal] = useState(false);

  const handleClick = () => {
    // Map card type based on icon or title
    if (Icon === Calendar || title.toLowerCase().includes("agendamento")) {
      setShowAppointmentsModal(true);
    } else if (Icon === Users || title.toLowerCase().includes("paciente")) {
      setShowPatientsModal(true);
    } else if (Icon === DollarSign || title.toLowerCase().includes("receita")) {
      setShowRevenueModal(true);
    } else if (Icon === TrendingUp || title.toLowerCase().includes("ocupação")) {
      setShowOccupancyModal(true);
    } else if (Icon === Clock || title.toLowerCase().includes("espera")) {
      setShowWaitTimeModal(true);
    } else if (Icon === UserCheck || title.toLowerCase().includes("comparecimento")) {
      setShowAttendanceModal(true);
    }
  };

  return (
    <>
      <div 
        onClick={handleClick}
        className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-primary/20 hover:-translate-y-1 animate-fade-in opacity-0 cursor-pointer"
        style={{ 
          animationDelay: `${index * 50}ms`,
          animationFillMode: "forwards"
        }}
      >
        {/* Background gradient on hover */}
        <div className={cn(
          "absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-5 bg-gradient-to-br",
          iconGradient
        )} />
        
        <div className="relative flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-3xl font-bold tracking-tight text-foreground">
                {value}
              </h3>
              {change && (
                <span
                  className={cn(
                    "text-sm font-medium",
                    changeType === "positive" && "text-success",
                    changeType === "negative" && "text-destructive",
                    changeType === "neutral" && "text-muted-foreground"
                  )}
                >
                  {change}
                </span>
              )}
            </div>
            {description && (
              <p className="text-xs text-muted-foreground">{description}</p>
            )}
          </div>
          
          <div className={cn(
            "rounded-xl p-3 bg-gradient-to-br shadow-lg group-hover:scale-110 transition-transform duration-300",
            iconGradient
          )}>
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>

        {/* Click indicator */}
        <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <span className="text-[10px] text-muted-foreground">Clique para detalhes</span>
        </div>
      </div>

      {/* Modals */}
      <AppointmentsDetailModal open={showAppointmentsModal} onOpenChange={setShowAppointmentsModal} />
      <PatientsDetailModal open={showPatientsModal} onOpenChange={setShowPatientsModal} />
      <RevenueDetailModal open={showRevenueModal} onOpenChange={setShowRevenueModal} />
      <OccupancyDetailModal open={showOccupancyModal} onOpenChange={setShowOccupancyModal} />
      <WaitTimeDetailModal open={showWaitTimeModal} onOpenChange={setShowWaitTimeModal} />
      <AttendanceDetailModal open={showAttendanceModal} onOpenChange={setShowAttendanceModal} />
    </>
  );
}
import { useState } from "react";
import { MoreVertical, Clock, User, CheckCircle2, DollarSign, MessageSquare, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckInModal } from "@/components/recepcao/CheckInModal";
import { PaymentModal } from "@/components/recepcao/PaymentModal";
import { CommunicationModal } from "@/components/recepcao/CommunicationModal";

interface AppointmentListItemProps {
  time: string;
  patientName: string;
  status: "confirmed" | "pending" | "completed" | "cancelled";
  service?: string;
  professional?: string;
  urgent?: boolean;
  onUrgencyToggle?: () => void;
}

const statusConfig = {
  confirmed: {
    label: "Confirmado",
    gradient: "from-success/20 to-success/5",
    dotColor: "bg-success",
    borderColor: "border-success/30",
    iconBg: "bg-success/10",
    textColor: "text-success"
  },
  pending: {
    label: "Pendente",
    gradient: "from-warning/20 to-warning/5",
    dotColor: "bg-warning",
    borderColor: "border-warning/30",
    iconBg: "bg-warning/10",
    textColor: "text-warning"
  },
  completed: {
    label: "Concluído",
    gradient: "from-primary/20 to-primary/5",
    dotColor: "bg-primary",
    borderColor: "border-primary/30",
    iconBg: "bg-primary/10",
    textColor: "text-primary"
  },
  cancelled: {
    label: "Cancelado",
    gradient: "from-destructive/20 to-destructive/5",
    dotColor: "bg-destructive",
    borderColor: "border-destructive/30",
    iconBg: "bg-destructive/10",
    textColor: "text-destructive"
  }
};

export const AppointmentListItem = ({ 
  time, 
  patientName, 
  status, 
  service = "Consulta",
  professional = "Profissional",
  urgent = false,
  onUrgencyToggle
}: AppointmentListItemProps) => {
  const config = statusConfig[status];
  const [checkInOpen, setCheckInOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [communicationOpen, setCommunicationOpen] = useState(false);

  return (
    <>
      <div className={`group relative overflow-hidden bg-gradient-to-r ${config.gradient} border-l-4 ${urgent ? 'border-destructive ring-2 ring-destructive/30' : config.borderColor} hover:shadow-md transition-all duration-300 animate-fade-in mb-2 mx-2 rounded-r-lg`}>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
        {urgent && (
          <div className="absolute top-2 right-2">
            <div className="h-3 w-3 bg-destructive rounded-full animate-pulse" />
          </div>
        )}
        
        <div className="relative p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className={`h-8 w-8 rounded-lg ${config.iconBg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                <User className={`h-4 w-4 ${config.textColor}`} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <div className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
                    {patientName}
                  </div>
                  {urgent && (
                    <Badge variant="destructive" className="text-xs animate-pulse flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3" />
                      Urgente
                    </Badge>
                  )}
                </div>
                <Badge 
                  variant="secondary" 
                  className={`text-xs font-semibold ${config.textColor} bg-transparent border-0 px-0 hover:bg-transparent`}
                >
                  {config.label}
                </Badge>
              </div>
            </div>
            
            <Button 
              variant="ghost" 
              size="icon"
              className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/20 hover:rotate-90"
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center gap-2 text-sm mb-3">
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg ${config.iconBg} group-hover:scale-105 transition-transform duration-300`}>
              <Clock className={`h-3.5 w-3.5 ${config.textColor}`} />
              <span className={`font-semibold ${config.textColor}`}>{time}</span>
            </div>
            <div className={`h-1.5 w-1.5 rounded-full ${config.dotColor} animate-pulse`} />
            <span className="text-muted-foreground font-medium">Hoje</span>
          </div>

          {/* Ações Rápidas */}
          <div className="flex gap-2 pt-2 border-t border-border/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {onUrgencyToggle && (
              <Button
                size="sm"
                variant={urgent ? "destructive" : "ghost"}
                onClick={(e) => {
                  e.stopPropagation();
                  onUrgencyToggle();
                }}
                className="h-8 hover:bg-white/20"
                title={urgent ? "Remover urgência" : "Marcar como urgente"}
              >
                <AlertTriangle className="h-3 w-3" />
              </Button>
            )}
            <Button
              size="sm"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation();
                setCheckInOpen(true);
              }}
              className="flex-1 h-8 hover:bg-white/20"
            >
              <CheckCircle2 className="h-3 w-3 mr-1" />
              <span className="text-xs">Check-in</span>
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation();
                setPaymentOpen(true);
              }}
              className="flex-1 h-8 hover:bg-white/20"
            >
              <DollarSign className="h-3 w-3 mr-1" />
              <span className="text-xs">Pagamento</span>
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation();
                setCommunicationOpen(true);
              }}
              className="flex-1 h-8 hover:bg-white/20"
            >
              <MessageSquare className="h-3 w-3 mr-1" />
              <span className="text-xs">Mensagem</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Modais */}
      <CheckInModal
        open={checkInOpen}
        onOpenChange={setCheckInOpen}
        appointment={{
          patientName,
          time,
          service,
          professional,
          status: config.label,
        }}
      />
      <PaymentModal
        open={paymentOpen}
        onOpenChange={setPaymentOpen}
        appointment={{
          patientName,
          service,
          value: 150.00, // Mock value
        }}
      />
      <CommunicationModal
        open={communicationOpen}
        onOpenChange={setCommunicationOpen}
        appointment={{
          patientName,
          time,
          service,
        }}
      />
    </>
  );
};

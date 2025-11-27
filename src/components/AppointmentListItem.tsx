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
      <div className={`group relative overflow-hidden bg-card/80 backdrop-blur-sm border ${urgent ? 'border-destructive/50 shadow-[0_0_20px_rgba(239,68,68,0.15)]' : 'border-border/50'} hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 animate-fade-in rounded-xl ${urgent ? 'ring-2 ring-destructive/20' : ''}`}>
        {/* Shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
        
        {/* Status accent bar */}
        <div className={`absolute left-0 top-0 bottom-0 w-1 ${urgent ? 'bg-destructive' : `bg-gradient-to-b ${config.gradient.replace('from-', 'from-').replace('to-', 'to-')}`}`} />
        
        {/* Urgent indicator */}
        {urgent && (
          <div className="absolute top-3 right-3 flex items-center gap-2">
            <div className="relative">
              <div className="h-2 w-2 bg-destructive rounded-full animate-pulse" />
              <div className="absolute inset-0 h-2 w-2 bg-destructive rounded-full animate-ping" />
            </div>
          </div>
        )}
        
        <div className="relative p-5">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start gap-3 flex-1">
              {/* Avatar */}
              <div className={`relative h-12 w-12 rounded-xl bg-gradient-to-br ${config.gradient} flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300 shadow-sm`}>
                <User className={`h-5 w-5 ${config.textColor}`} />
                <div className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full ${config.dotColor} border-2 border-card shadow-sm`} />
              </div>
              
              {/* Patient Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors truncate">
                    {patientName}
                  </h3>
                  {urgent && (
                    <Badge variant="destructive" className="text-[10px] px-2 py-0.5 animate-pulse flex items-center gap-1 shadow-sm">
                      <AlertTriangle className="h-2.5 w-2.5" />
                      Urgente
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge 
                    variant="secondary" 
                    className={`text-xs font-semibold ${config.textColor} bg-gradient-to-r ${config.gradient} border-0 shadow-sm`}
                  >
                    {config.label}
                  </Badge>
                </div>
              </div>
            </div>
            
            {/* Menu button */}
            <Button 
              variant="ghost" 
              size="icon"
              className="h-8 w-8 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-primary/10 hover:rotate-90"
            >
              <MoreVertical className="h-4 w-4 text-muted-foreground" />
            </Button>
          </div>

          {/* Time info */}
          <div className="flex items-center gap-3 mb-4">
            <div className={`flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r ${config.gradient} group-hover:scale-[1.02] transition-transform duration-300 shadow-sm`}>
              <Clock className={`h-4 w-4 ${config.textColor}`} />
              <span className={`font-bold text-sm ${config.textColor}`}>{time}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className={`h-1.5 w-1.5 rounded-full ${config.dotColor} animate-pulse`} />
              <span className="font-medium">Hoje</span>
            </div>
          </div>

          {/* Service info (optional) */}
          {(service || professional) && (
            <div className="mb-4 p-3 rounded-lg bg-muted/30 border border-border/30">
              <div className="space-y-1 text-xs">
                {service && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <div className="h-1 w-1 rounded-full bg-primary" />
                    <span>{service}</span>
                  </div>
                )}
                {professional && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <div className="h-1 w-1 rounded-full bg-primary" />
                    <span>{professional}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="flex gap-2 pt-3 border-t border-border/50 opacity-0 group-hover:opacity-100 transition-all duration-300">
            {onUrgencyToggle && (
              <Button
                size="sm"
                variant={urgent ? "destructive" : "outline"}
                onClick={(e) => {
                  e.stopPropagation();
                  onUrgencyToggle();
                }}
                className="h-9 px-3 hover:scale-105 transition-transform duration-200 shadow-sm"
                title={urgent ? "Remover urgência" : "Marcar como urgente"}
              >
                <AlertTriangle className="h-3.5 w-3.5" />
              </Button>
            )}
            <Button
              size="sm"
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
                setCheckInOpen(true);
              }}
              className="flex-1 h-9 hover:bg-success/10 hover:border-success/50 hover:text-success hover:scale-105 transition-all duration-200 shadow-sm"
            >
              <CheckCircle2 className="h-3.5 w-3.5 mr-1.5" />
              <span className="text-xs font-medium">Check-in</span>
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
                setPaymentOpen(true);
              }}
              className="flex-1 h-9 hover:bg-warning/10 hover:border-warning/50 hover:text-warning hover:scale-105 transition-all duration-200 shadow-sm"
            >
              <DollarSign className="h-3.5 w-3.5 mr-1.5" />
              <span className="text-xs font-medium">Pagamento</span>
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
                setCommunicationOpen(true);
              }}
              className="flex-1 h-9 hover:bg-primary/10 hover:border-primary/50 hover:text-primary hover:scale-105 transition-all duration-200 shadow-sm"
            >
              <MessageSquare className="h-3.5 w-3.5 mr-1.5" />
              <span className="text-xs font-medium">Mensagem</span>
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

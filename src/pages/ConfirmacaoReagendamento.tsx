import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  CheckCircle2, 
  Calendar, 
  Clock, 
  User, 
  MapPin,
  ArrowRight,
  Bell,
  MessageSquare,
  Mail,
  ChevronRight,
  Sparkles,
  ArrowLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

// Mock data for rescheduling
const originalAppointment = {
  date: new Date(2024, 11, 30, 10, 0),
  professional: "Dra. Marina Santos",
  specialty: "Pediatria",
  service: "Consulta de Rotina",
  location: "Clínica Saúde Integrada",
};

const newAppointment = {
  date: new Date(2025, 0, 3, 14, 30),
  professional: "Dra. Marina Santos",
  specialty: "Pediatria",
  service: "Consulta de Rotina",
  location: "Clínica Saúde Integrada",
};

export default function ConfirmacaoReagendamento() {
  const navigate = useNavigate();
  const [notifyWhatsApp, setNotifyWhatsApp] = useState(true);
  const [notifyEmail, setNotifyEmail] = useState(true);
  const [notifySMS, setNotifySMS] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleConfirm = () => {
    setIsConfirming(true);
    setTimeout(() => {
      setIsConfirming(false);
      setIsConfirmed(true);
      toast.success("Consulta reagendada com sucesso!");
    }, 2000);
  };

  if (isConfirmed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-emerald-500/5 flex items-center justify-center p-4">
        <Card className="max-w-md w-full overflow-hidden border-emerald-500/20">
          <div className="p-8 text-center">
            <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center mb-6 shadow-lg animate-scale-in">
              <CheckCircle2 className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Reagendamento Confirmado!</h1>
            <p className="text-muted-foreground mb-6">
              Sua consulta foi reagendada com sucesso. Enviamos uma confirmação para você.
            </p>
            
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 mb-6">
              <div className="text-left space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-emerald-500" />
                  <span className="font-medium">
                    {format(newAppointment.date, "EEEE, dd 'de' MMMM", { locale: ptBR })}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-emerald-500" />
                  <span className="font-medium">{format(newAppointment.date, "HH:mm")}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4 text-emerald-500" />
                  <span>{newAppointment.professional}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => navigate("/")}
              >
                Ir para Início
              </Button>
              <Button 
                className="flex-1 gap-2"
                onClick={() => navigate("/consulta/1")}
              >
                Ver Detalhes
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <div className="sticky top-0 z-10 backdrop-blur-xl bg-background/80 border-b border-border/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate(-1)}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Confirmar Reagendamento</span>
          </div>
          <h1 className="text-2xl font-bold mb-2">Revise as alterações</h1>
          <p className="text-muted-foreground">
            Confirme os detalhes do novo horário antes de finalizar
          </p>
        </div>

        {/* Comparison Cards */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {/* Original */}
          <Card className="border-border/50 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-muted" />
            <CardContent className="p-5">
              <Badge variant="secondary" className="mb-3">
                Horário Anterior
              </Badge>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-muted flex flex-col items-center justify-center">
                    <span className="text-lg font-bold text-muted-foreground">
                      {format(originalAppointment.date, "dd")}
                    </span>
                    <span className="text-[10px] text-muted-foreground uppercase">
                      {format(originalAppointment.date, "MMM", { locale: ptBR })}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-muted-foreground line-through">
                      {format(originalAppointment.date, "EEEE", { locale: ptBR })}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {format(originalAppointment.date, "HH:mm")}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* New */}
          <Card className="border-primary/30 relative overflow-hidden shadow-lg">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-primary/50" />
            <CardContent className="p-5">
              <Badge className="mb-3 bg-primary/10 text-primary border-primary/20">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                Novo Horário
              </Badge>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex flex-col items-center justify-center">
                    <span className="text-lg font-bold text-primary">
                      {format(newAppointment.date, "dd")}
                    </span>
                    <span className="text-[10px] text-primary uppercase">
                      {format(newAppointment.date, "MMM", { locale: ptBR })}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">
                      {format(newAppointment.date, "EEEE", { locale: ptBR })}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {format(newAppointment.date, "HH:mm")}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Arrow */}
        <div className="flex justify-center -my-2 relative z-10">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-lg">
            <ArrowRight className="h-5 w-5 text-primary-foreground" />
          </div>
        </div>

        {/* Details unchanged */}
        <Card className="border-border/50 mb-6 mt-4">
          <CardContent className="p-5">
            <h3 className="font-semibold mb-4">Detalhes mantidos</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center">
                  <User className="h-5 w-5 text-violet-500" />
                </div>
                <div>
                  <p className="font-medium">{newAppointment.professional}</p>
                  <p className="text-sm text-muted-foreground">{newAppointment.specialty}</p>
                </div>
              </div>
              <Separator />
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <p className="font-medium">{newAppointment.location}</p>
                  <p className="text-sm text-muted-foreground">{newAppointment.service}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="border-border/50 mb-6">
          <CardContent className="p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                <Bell className="h-5 w-5 text-amber-500" />
              </div>
              <div>
                <h3 className="font-semibold">Notificações</h3>
                <p className="text-sm text-muted-foreground">Como deseja ser notificado?</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
                <div className="flex items-center gap-3">
                  <MessageSquare className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium">WhatsApp</span>
                </div>
                <Switch checked={notifyWhatsApp} onCheckedChange={setNotifyWhatsApp} />
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium">E-mail</span>
                </div>
                <Switch checked={notifyEmail} onCheckedChange={setNotifyEmail} />
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
                <div className="flex items-center gap-3">
                  <MessageSquare className="h-4 w-4 text-violet-500" />
                  <span className="text-sm font-medium">SMS</span>
                </div>
                <Switch checked={notifySMS} onCheckedChange={setNotifySMS} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Confirm Button */}
        <Button 
          size="lg" 
          className="w-full h-14 gap-2 rounded-xl text-base"
          onClick={handleConfirm}
          disabled={isConfirming}
        >
          {isConfirming ? (
            <>
              <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Confirmando...
            </>
          ) : (
            <>
              <CheckCircle2 className="h-5 w-5" />
              Confirmar Reagendamento
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

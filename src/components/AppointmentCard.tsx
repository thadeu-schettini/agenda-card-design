import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MessageCircle, Clock, CreditCard, FileText, UserCog, X, Edit } from "lucide-react";

interface AppointmentCardProps {
  onClose?: () => void;
}

export const AppointmentCard = ({ onClose }: AppointmentCardProps) => {
  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
      <CardHeader className="border-b border-border pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold text-foreground flex items-center gap-2">
            Detalhes do Agendamento
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <Edit className="h-4 w-4 text-primary" />
            </Button>
          </CardTitle>
          {onClose && (
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="pt-6 space-y-6">
        {/* Patient Information */}
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <span className="text-primary font-semibold text-lg">PC</span>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-primary mb-1">
              Paciente 7 Cruickshank
            </h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
              <span>Contato: 551910074070</span>
              <MessageCircle className="h-4 w-4 text-success" />
              <span className="text-success">WhatsApp</span>
            </div>
            <Badge className="bg-success text-success-foreground hover:bg-success/90">
              Concluída
            </Badge>
          </div>
        </div>

        {/* Date and Time */}
        <div className="flex items-center gap-2 text-foreground">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">27/11/2025</span>
          <Clock className="h-4 w-4 text-muted-foreground ml-2" />
          <span className="font-medium">12:05 - 12:35</span>
        </div>

        {/* Service and Payment Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Serviço</p>
            <p className="font-semibold text-foreground">Consulta Dermatologia</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Valor do serviço</p>
            <p className="font-semibold text-foreground">R$ 210,00</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Tipo de atendimento</p>
            <p className="font-semibold text-foreground">Consulta Padrão</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Pagamento</p>
            <div className="flex items-center gap-2">
              <p className="font-semibold text-foreground">Sem pagamento vinculado</p>
              <Button variant="outline" size="sm" className="h-8">
                <CreditCard className="h-3 w-3 mr-1" />
                Cobrar agora
              </Button>
            </div>
          </div>
        </div>

        {/* Observations */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <FileText className="h-4 w-4 text-muted-foreground" />
            <p className="text-sm font-medium text-muted-foreground">Observações</p>
          </div>
          <p className="text-sm text-foreground pl-6">
            Agendamento gerado automaticamente (57)
          </p>
        </div>

        {/* Action Section */}
        <div className="bg-muted/50 rounded-lg p-4 space-y-3">
          <div className="flex items-start gap-2">
            <UserCog className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold text-foreground mb-1">Abrir atendimento</p>
              <p className="text-sm text-muted-foreground">
                Abra ou reabra o modo de atendimento para acompanhar cronômetro, prontuário e prescrição desta consulta. 
                Alterações ficam registradas no histórico.
              </p>
            </div>
          </div>
          <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
            Abrir atendimento
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

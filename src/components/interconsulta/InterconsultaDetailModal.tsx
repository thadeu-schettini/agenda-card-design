import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  ArrowLeftRight, 
  User,
  Calendar,
  FileText,
  Stethoscope,
  ArrowRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  Printer,
  Paperclip,
  Download
} from "lucide-react";

interface InterconsultaDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  interconsulta: {
    id: number;
    patient: string;
    fromDoctor: string;
    fromSpecialty: string;
    toDoctor: string;
    toSpecialty: string;
    reason: string;
    status: string;
    createdAt: string;
    priority: string;
    scheduledDate?: string;
    rejectionReason?: string;
  } | null;
}

const statusConfig = {
  pending: { label: "Pendente", color: "bg-pending/10 text-pending border-pending/20", icon: Clock },
  accepted: { label: "Aceita", color: "bg-confirmed/10 text-confirmed border-confirmed/20", icon: CheckCircle2 },
  completed: { label: "Concluída", color: "bg-info/10 text-info border-info/20", icon: CheckCircle2 },
  rejected: { label: "Recusada", color: "bg-destructive/10 text-destructive border-destructive/20", icon: AlertCircle }
};

const mockAttachments = [
  { id: 1, name: "Exames_laboratoriais.pdf", size: "1.2 MB" },
  { id: 2, name: "ECG_resultado.pdf", size: "856 KB" },
];

const mockMessages = [
  { 
    id: 1, 
    from: "Dr. Carlos Santos", 
    message: "Paciente apresenta sopro sistólico detectado em consulta de rotina. Solicito avaliação cardiológica.",
    date: "08/01/2025, 14:30"
  },
  { 
    id: 2, 
    from: "Dra. Ana Lima", 
    message: "Recebido. Vou agendar o ECG e ecocardiograma para avaliação completa.",
    date: "08/01/2025, 15:45"
  },
];

export function InterconsultaDetailModal({ open, onOpenChange, interconsulta }: InterconsultaDetailModalProps) {
  if (!interconsulta) return null;

  const StatusIcon = statusConfig[interconsulta.status as keyof typeof statusConfig]?.icon || Clock;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh]">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <ArrowLeftRight className="h-6 w-6 text-primary" />
              </div>
              <div>
                <DialogTitle>Detalhes da Interconsulta</DialogTitle>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className={statusConfig[interconsulta.status as keyof typeof statusConfig]?.color}>
                    <StatusIcon className="h-3 w-3 mr-1" />
                    {statusConfig[interconsulta.status as keyof typeof statusConfig]?.label}
                  </Badge>
                  {interconsulta.priority === "urgent" && (
                    <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      Urgente
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="space-y-6">
            {/* Patient Info */}
            <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/30">
              <Avatar className="h-14 w-14">
                <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/5 text-lg">
                  <User className="h-7 w-7 text-primary" />
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-lg">{interconsulta.patient}</p>
                <p className="text-sm text-muted-foreground">
                  Criada {interconsulta.createdAt}
                </p>
              </div>
            </div>

            {/* Flow Visualization */}
            <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/30">
              <div className="flex-1 text-center p-4 rounded-lg bg-card border">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Stethoscope className="h-5 w-5 text-primary" />
                  <span className="font-semibold">{interconsulta.fromDoctor}</span>
                </div>
                <Badge variant="outline">{interconsulta.fromSpecialty}</Badge>
                <p className="text-xs text-muted-foreground mt-2">Solicitante</p>
              </div>
              
              <div className="flex flex-col items-center">
                <ArrowRight className="h-8 w-8 text-primary" />
              </div>
              
              <div className="flex-1 text-center p-4 rounded-lg bg-card border">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Stethoscope className="h-5 w-5 text-primary" />
                  <span className="font-semibold">{interconsulta.toDoctor}</span>
                </div>
                <Badge variant="outline">{interconsulta.toSpecialty}</Badge>
                <p className="text-xs text-muted-foreground mt-2">Destinatário</p>
              </div>
            </div>

            {/* Reason */}
            <div className="space-y-2">
              <h4 className="font-medium flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                Motivo da Interconsulta
              </h4>
              <p className="text-sm text-muted-foreground p-4 rounded-lg bg-muted/30">
                {interconsulta.reason}
              </p>
            </div>

            {/* Scheduled Date */}
            {interconsulta.scheduledDate && (
              <div className="flex items-center gap-3 p-4 rounded-lg bg-confirmed/5 border border-confirmed/20">
                <Calendar className="h-5 w-5 text-confirmed" />
                <div>
                  <p className="font-medium text-confirmed">Consulta Agendada</p>
                  <p className="text-sm">{interconsulta.scheduledDate}</p>
                </div>
              </div>
            )}

            {/* Rejection Reason */}
            {interconsulta.rejectionReason && (
              <div className="flex items-start gap-3 p-4 rounded-lg bg-destructive/5 border border-destructive/20">
                <AlertCircle className="h-5 w-5 text-destructive shrink-0" />
                <div>
                  <p className="font-medium text-destructive">Motivo da Recusa</p>
                  <p className="text-sm">{interconsulta.rejectionReason}</p>
                </div>
              </div>
            )}

            {/* Attachments */}
            <div className="space-y-2">
              <h4 className="font-medium flex items-center gap-2">
                <Paperclip className="h-4 w-4 text-muted-foreground" />
                Anexos
              </h4>
              <div className="space-y-2">
                {mockAttachments.map(attachment => (
                  <div key={attachment.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{attachment.name}</span>
                      <span className="text-xs text-muted-foreground">({attachment.size})</span>
                    </div>
                    <Button variant="ghost" size="sm" className="gap-1">
                      <Download className="h-4 w-4" />
                      Baixar
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Messages */}
            <div className="space-y-3">
              <h4 className="font-medium flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
                Comunicação
              </h4>
              <div className="space-y-3">
                {mockMessages.map(msg => (
                  <div key={msg.id} className="p-4 rounded-lg bg-muted/30">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm">{msg.from}</span>
                      <span className="text-xs text-muted-foreground">{msg.date}</span>
                    </div>
                    <p className="text-sm">{msg.message}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>

        <div className="flex items-center justify-between pt-4 border-t">
          <Button variant="outline" size="sm" className="gap-1">
            <Printer className="h-4 w-4" />
            Imprimir
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Fechar
            </Button>
            <Button className="gap-1">
              <MessageSquare className="h-4 w-4" />
              Enviar Mensagem
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

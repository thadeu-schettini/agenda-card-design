import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  FileSignature, 
  Download, 
  Send, 
  User, 
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle,
  XCircle,
  Copy,
  Printer
} from "lucide-react";
import { toast } from "sonner";

interface ViewConsentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  consent: {
    id: number;
    patient: string;
    procedure: string;
    template: string;
    status: string;
    sentAt: string;
    signedAt: string | null;
    appointmentDate: string;
    professional: string;
    rejectionReason?: string;
  } | null;
}

const statusConfig = {
  signed: { label: "Assinado", color: "bg-confirmed/10 text-confirmed border-confirmed/20", icon: CheckCircle2 },
  pending: { label: "Pendente", color: "bg-pending/10 text-pending border-pending/20", icon: Clock },
  expired: { label: "Expirado", color: "bg-destructive/10 text-destructive border-destructive/20", icon: AlertCircle },
  rejected: { label: "Recusado", color: "bg-destructive/10 text-destructive border-destructive/20", icon: XCircle }
};

export function ViewConsentModal({ open, onOpenChange, consent }: ViewConsentModalProps) {
  if (!consent) return null;

  const StatusIcon = statusConfig[consent.status as keyof typeof statusConfig]?.icon || Clock;

  const handleDownload = () => {
    toast.success("PDF baixado com sucesso!");
  };

  const handleResend = () => {
    toast.success(`Consentimento reenviado para ${consent.patient}`);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://clinica.com/consent/${consent.id}`);
    toast.success("Link copiado!");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh]">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
              <FileSignature className="h-6 w-6 text-primary" />
            </div>
            <div>
              <DialogTitle>Detalhes do Consentimento</DialogTitle>
              <p className="text-sm text-muted-foreground mt-1">{consent.template}</p>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="h-[50vh] pr-4">
          <div className="space-y-6">
            {/* Status */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30">
              <span className="text-sm font-medium">Status</span>
              <Badge variant="outline" className={statusConfig[consent.status as keyof typeof statusConfig]?.color}>
                <StatusIcon className="h-3 w-3 mr-1" />
                {statusConfig[consent.status as keyof typeof statusConfig]?.label}
              </Badge>
            </div>

            {/* Patient Info */}
            <div className="space-y-4">
              <h4 className="font-medium flex items-center gap-2">
                <User className="h-4 w-4 text-primary" />
                Informações do Paciente
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Paciente</p>
                  <p className="font-medium">{consent.patient}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Profissional</p>
                  <p className="font-medium">{consent.professional}</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Procedure Info */}
            <div className="space-y-4">
              <h4 className="font-medium flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                Procedimento
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Procedimento</p>
                  <p className="font-medium">{consent.procedure}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Data Agendada</p>
                  <p className="font-medium">{consent.appointmentDate}</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Timeline */}
            <div className="space-y-4">
              <h4 className="font-medium">Timeline</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-info/10 flex items-center justify-center">
                    <Send className="h-4 w-4 text-info" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Enviado</p>
                    <p className="text-xs text-muted-foreground">{consent.sentAt}</p>
                  </div>
                </div>
                {consent.signedAt && (
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-confirmed/10 flex items-center justify-center">
                      <CheckCircle2 className="h-4 w-4 text-confirmed" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Assinado</p>
                      <p className="text-xs text-muted-foreground">{consent.signedAt}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Rejection Reason */}
            {consent.rejectionReason && (
              <>
                <Separator />
                <div className="p-4 rounded-xl bg-destructive/5 border border-destructive/20">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-destructive mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-destructive">Motivo da Recusa</p>
                      <p className="text-sm text-muted-foreground mt-1">{consent.rejectionReason}</p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </ScrollArea>

        <div className="flex flex-wrap gap-2 pt-4 border-t">
          {consent.status === "signed" && (
            <Button variant="outline" className="gap-2" onClick={handleDownload}>
              <Download className="h-4 w-4" />
              Baixar PDF
            </Button>
          )}
          {consent.status === "pending" && (
            <Button variant="outline" className="gap-2" onClick={handleResend}>
              <Send className="h-4 w-4" />
              Reenviar
            </Button>
          )}
          <Button variant="outline" className="gap-2" onClick={handleCopyLink}>
            <Copy className="h-4 w-4" />
            Copiar Link
          </Button>
          <Button variant="outline" className="gap-2 ml-auto" onClick={() => onOpenChange(false)}>
            Fechar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

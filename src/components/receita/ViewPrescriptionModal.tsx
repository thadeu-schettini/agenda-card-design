import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  FileDigit, 
  Download, 
  Send, 
  User, 
  Calendar,
  Pill,
  QrCode,
  Copy,
  Printer,
  Clock,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { toast } from "sonner";

interface ViewPrescriptionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  prescription: {
    id: number;
    patient: string;
    professional: string;
    date: string;
    medications: {
      name: string;
      dosage: string;
      frequency: string;
      duration: string;
    }[];
    status: string;
    pharmacy: string | null;
    dispensedAt: string | null;
    type: string;
  } | null;
}

const statusConfig = {
  sent: { label: "Enviada", color: "bg-info/10 text-info border-info/20", icon: Send },
  pending: { label: "Pendente", color: "bg-pending/10 text-pending border-pending/20", icon: Clock },
  dispensed: { label: "Dispensada", color: "bg-confirmed/10 text-confirmed border-confirmed/20", icon: CheckCircle2 },
  expired: { label: "Expirada", color: "bg-destructive/10 text-destructive border-destructive/20", icon: AlertCircle }
};

const typeConfig = {
  comum: { label: "Comum", color: "bg-muted text-muted-foreground" },
  antimicrobiano: { label: "Antimicrobiano", color: "bg-info/10 text-info" },
  controlado: { label: "Controlado", color: "bg-destructive/10 text-destructive" }
};

export function ViewPrescriptionModal({ open, onOpenChange, prescription }: ViewPrescriptionModalProps) {
  if (!prescription) return null;

  const StatusIcon = statusConfig[prescription.status as keyof typeof statusConfig]?.icon || Clock;

  const handleDownload = () => {
    toast.success("PDF baixado!");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`https://receita.clinica.com/${prescription.id}`);
    toast.success("Link copiado!");
  };

  const handlePrint = () => {
    toast.success("Enviando para impressão...");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh]">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
              <FileDigit className="h-6 w-6 text-primary" />
            </div>
            <div>
              <DialogTitle>Detalhes da Receita</DialogTitle>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className={typeConfig[prescription.type as keyof typeof typeConfig]?.color}>
                  {typeConfig[prescription.type as keyof typeof typeConfig]?.label}
                </Badge>
                <Badge variant="outline" className={statusConfig[prescription.status as keyof typeof statusConfig]?.color}>
                  <StatusIcon className="h-3 w-3 mr-1" />
                  {statusConfig[prescription.status as keyof typeof statusConfig]?.label}
                </Badge>
              </div>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="h-[50vh] pr-4">
          <div className="space-y-6">
            {/* Patient Info */}
            <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-muted/30">
              <div>
                <p className="text-xs text-muted-foreground">Paciente</p>
                <p className="font-medium">{prescription.patient}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Profissional</p>
                <p className="font-medium">{prescription.professional}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Data</p>
                <p className="font-medium">{prescription.date}</p>
              </div>
              {prescription.pharmacy && (
                <div>
                  <p className="text-xs text-muted-foreground">Farmácia</p>
                  <p className="font-medium">{prescription.pharmacy}</p>
                </div>
              )}
            </div>

            <Separator />

            {/* Medications */}
            <div className="space-y-4">
              <h4 className="font-medium flex items-center gap-2">
                <Pill className="h-4 w-4 text-primary" />
                Medicamentos
              </h4>
              <div className="space-y-3">
                {prescription.medications.map((med, index) => (
                  <div key={index} className="p-4 rounded-xl border bg-card">
                    <p className="font-medium">{med.name}</p>
                    <div className="grid grid-cols-3 gap-2 mt-2 text-sm text-muted-foreground">
                      <div>
                        <span className="text-xs">Dose:</span> {med.dosage}
                      </div>
                      <div>
                        <span className="text-xs">Frequência:</span> {med.frequency}
                      </div>
                      <div>
                        <span className="text-xs">Duração:</span> {med.duration}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dispensed Info */}
            {prescription.dispensedAt && (
              <>
                <Separator />
                <div className="p-4 rounded-xl bg-confirmed/5 border border-confirmed/20">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-confirmed" />
                    <div>
                      <p className="font-medium">Receita Dispensada</p>
                      <p className="text-sm text-muted-foreground">
                        {prescription.pharmacy} • {prescription.dispensedAt}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </ScrollArea>

        <div className="flex flex-wrap gap-2 pt-4 border-t">
          <Button variant="outline" className="gap-2" onClick={handleDownload}>
            <Download className="h-4 w-4" />
            PDF
          </Button>
          <Button variant="outline" className="gap-2" onClick={handlePrint}>
            <Printer className="h-4 w-4" />
            Imprimir
          </Button>
          <Button variant="outline" className="gap-2" onClick={handleCopy}>
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

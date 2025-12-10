import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  History, 
  User, 
  Building2, 
  Globe, 
  Clock, 
  Shield, 
  AlertTriangle,
  CheckCircle2,
  Info,
  Copy,
  ExternalLink,
  FileJson
} from "lucide-react";
import { toast } from "sonner";

interface AuditDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  log: {
    id: number;
    action: string;
    user: string;
    clinic: string;
    details: string;
    ip: string;
    timestamp: string;
    severity: string;
  } | null;
}

export function AuditDetailModal({ open, onOpenChange, log }: AuditDetailModalProps) {
  if (!log) return null;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copiado para a área de transferência!");
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "critical":
        return <Badge className="bg-red-600/10 text-red-600 border-red-600/20 gap-1"><AlertTriangle className="h-3 w-3" />Crítico</Badge>;
      case "error":
        return <Badge className="bg-destructive/10 text-destructive border-destructive/20 gap-1"><AlertTriangle className="h-3 w-3" />Erro</Badge>;
      case "warning":
        return <Badge className="bg-warning/10 text-warning border-warning/20 gap-1"><Info className="h-3 w-3" />Aviso</Badge>;
      case "success":
        return <Badge className="bg-success/10 text-success border-success/20 gap-1"><CheckCircle2 className="h-3 w-3" />Sucesso</Badge>;
      default:
        return <Badge className="bg-info/10 text-info border-info/20 gap-1"><Info className="h-3 w-3" />Info</Badge>;
    }
  };

  // Mock detailed data
  const detailedData = {
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    sessionId: "sess_abc123def456",
    requestId: "req_xyz789",
    duration: "145ms",
    location: "São Paulo, Brasil",
    previousValue: log.action.includes("upgrade") ? '{"plan": "Pro", "mrr": 199}' : null,
    newValue: log.action.includes("upgrade") ? '{"plan": "Business", "mrr": 450}' : null,
    relatedEvents: [
      { action: "email_sent", description: "Email de confirmação enviado", time: "Há 2 segundos" },
      { action: "webhook_triggered", description: "Webhook de billing disparado", time: "Há 5 segundos" },
    ]
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10">
              <History className="h-5 w-5 text-primary" />
            </div>
            Detalhes do Evento de Auditoria
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh]">
          <div className="space-y-6 py-4 pr-4">
            {/* Header Info */}
            <Card className="p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="font-mono text-xs">{log.action}</Badge>
                    {getSeverityBadge(log.severity)}
                  </div>
                  <p className="font-medium">{log.details}</p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => copyToClipboard(JSON.stringify(log, null, 2))}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </Card>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-muted/30 space-y-1">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <User className="h-3 w-3" />
                  Usuário
                </div>
                <p className="font-medium">{log.user}</p>
              </div>

              <div className="p-4 rounded-lg bg-muted/30 space-y-1">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Building2 className="h-3 w-3" />
                  Clínica
                </div>
                <p className="font-medium">{log.clinic}</p>
              </div>

              <div className="p-4 rounded-lg bg-muted/30 space-y-1">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  Data/Hora
                </div>
                <p className="font-medium">{log.timestamp}</p>
              </div>

              <div className="p-4 rounded-lg bg-muted/30 space-y-1">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Globe className="h-3 w-3" />
                  Endereço IP
                </div>
                <div className="flex items-center gap-2">
                  <p className="font-medium font-mono">{log.ip}</p>
                  <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => copyToClipboard(log.ip)}>
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Technical Details */}
            <div className="space-y-3">
              <h4 className="font-medium text-sm flex items-center gap-2">
                <Shield className="h-4 w-4 text-muted-foreground" />
                Detalhes Técnicos
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between p-2 rounded bg-muted/20">
                  <span className="text-muted-foreground">User Agent</span>
                  <span className="font-mono text-xs max-w-[300px] truncate">{detailedData.userAgent}</span>
                </div>
                <div className="flex justify-between p-2 rounded bg-muted/20">
                  <span className="text-muted-foreground">Session ID</span>
                  <span className="font-mono text-xs">{detailedData.sessionId}</span>
                </div>
                <div className="flex justify-between p-2 rounded bg-muted/20">
                  <span className="text-muted-foreground">Request ID</span>
                  <span className="font-mono text-xs">{detailedData.requestId}</span>
                </div>
                <div className="flex justify-between p-2 rounded bg-muted/20">
                  <span className="text-muted-foreground">Duração</span>
                  <span className="font-mono text-xs">{detailedData.duration}</span>
                </div>
                <div className="flex justify-between p-2 rounded bg-muted/20">
                  <span className="text-muted-foreground">Localização</span>
                  <span className="text-xs">{detailedData.location}</span>
                </div>
              </div>
            </div>

            {/* Data Changes */}
            {detailedData.previousValue && (
              <div className="space-y-3">
                <h4 className="font-medium text-sm flex items-center gap-2">
                  <FileJson className="h-4 w-4 text-muted-foreground" />
                  Alterações de Dados
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground">Valor Anterior</p>
                    <pre className="p-3 rounded-lg bg-destructive/5 border border-destructive/20 text-xs font-mono overflow-x-auto">
                      {detailedData.previousValue}
                    </pre>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground">Novo Valor</p>
                    <pre className="p-3 rounded-lg bg-success/5 border border-success/20 text-xs font-mono overflow-x-auto">
                      {detailedData.newValue}
                    </pre>
                  </div>
                </div>
              </div>
            )}

            {/* Related Events */}
            <div className="space-y-3">
              <h4 className="font-medium text-sm">Eventos Relacionados</h4>
              <div className="space-y-2">
                {detailedData.relatedEvents.map((event, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="font-mono text-xs">{event.action}</Badge>
                      <span className="text-sm">{event.description}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{event.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>

        <Separator />

        <div className="flex justify-between pt-2">
          <Button variant="outline" size="sm" className="gap-2">
            <ExternalLink className="h-4 w-4" />
            Ver Log Completo
          </Button>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Fechar</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

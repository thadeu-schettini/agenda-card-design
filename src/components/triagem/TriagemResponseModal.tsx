import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { 
  User, 
  Calendar, 
  CheckCircle2, 
  AlertTriangle, 
  Clock,
  FileText,
  Printer,
  Download,
  MessageSquare,
  Brain
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface TriagemResponseModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  triagem: {
    id: number;
    patient: string;
    appointment: string;
    professional: string;
    status: string;
    completedAt?: string;
    score?: number;
    alerts: number;
  } | null;
}

const mockResponses = [
  { question: "Você está sentindo alguma dor ou desconforto?", answer: "Sim", type: "alert" },
  { question: "Qual o seu nível de dor de 0 a 10?", answer: "7", type: "alert" },
  { question: "Está tomando alguma medicação atualmente?", answer: "Sim", type: "normal" },
  { question: "Liste as medicações em uso:", answer: "Losartana 50mg, Metformina 850mg", type: "normal" },
  { question: "Possui alguma alergia conhecida?", answer: "Sim - Dipirona", type: "alert" },
  { question: "Já realizou alguma cirurgia?", answer: "Não", type: "normal" },
  { question: "Qual a última refeição que você fez?", answer: "Café da manhã às 07:00", type: "normal" },
  { question: "Está em jejum?", answer: "Não", type: "normal" },
];

const mockAlerts = [
  { type: "warning", message: "Paciente relata dor nível 7/10" },
  { type: "danger", message: "Alergia a Dipirona registrada" },
];

export function TriagemResponseModal({ open, onOpenChange, triagem }: TriagemResponseModalProps) {
  if (!triagem) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh]">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div>
                <DialogTitle>Respostas da Triagem</DialogTitle>
                <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                  <User className="h-3 w-3" />
                  <span>{triagem.patient}</span>
                  <span>•</span>
                  <Calendar className="h-3 w-3" />
                  <span>{triagem.appointment}</span>
                </div>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          {/* Score and Status */}
          <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/30">
            <div className="flex-1">
              <p className="text-sm text-muted-foreground mb-1">Score de Triagem</p>
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-primary">{triagem.score || 85}</span>
                <Progress value={triagem.score || 85} className="flex-1 h-3" />
              </div>
            </div>
            <Separator orientation="vertical" className="h-12" />
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">Alertas</p>
              <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">
                <AlertTriangle className="h-3 w-3 mr-1" />
                {triagem.alerts} alertas
              </Badge>
            </div>
            <Separator orientation="vertical" className="h-12" />
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">Status</p>
              <Badge variant="outline" className="bg-confirmed/10 text-confirmed border-confirmed/20">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                Respondido
              </Badge>
            </div>
          </div>

          {/* Alerts Section */}
          {mockAlerts.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium text-sm flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-destructive" />
                Pontos de Atenção
              </h4>
              <div className="space-y-2">
                {mockAlerts.map((alert, index) => (
                  <div 
                    key={index}
                    className={`p-3 rounded-lg flex items-start gap-2 ${
                      alert.type === "danger" 
                        ? "bg-destructive/10 border border-destructive/20" 
                        : "bg-pending/10 border border-pending/20"
                    }`}
                  >
                    <AlertTriangle className={`h-4 w-4 mt-0.5 shrink-0 ${
                      alert.type === "danger" ? "text-destructive" : "text-pending"
                    }`} />
                    <span className={`text-sm ${
                      alert.type === "danger" ? "text-destructive" : "text-pending"
                    }`}>
                      {alert.message}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Responses */}
          <ScrollArea className="h-[300px] pr-4">
            <div className="space-y-3">
              {mockResponses.map((response, index) => (
                <div 
                  key={index}
                  className={`p-4 rounded-xl border ${
                    response.type === "alert" 
                      ? "bg-pending/5 border-pending/20" 
                      : "bg-muted/30 border-border/50"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`h-6 w-6 rounded-full flex items-center justify-center text-sm font-medium shrink-0 ${
                      response.type === "alert"
                        ? "bg-pending/10 text-pending"
                        : "bg-primary/10 text-primary"
                    }`}>
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm mb-1">{response.question}</p>
                      <p className={`text-sm ${
                        response.type === "alert" ? "text-pending font-medium" : "text-muted-foreground"
                      }`}>
                        {response.answer}
                      </p>
                    </div>
                    {response.type === "alert" && (
                      <AlertTriangle className="h-4 w-4 text-pending shrink-0" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-1">
              <Printer className="h-4 w-4" />
              Imprimir
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <Download className="h-4 w-4" />
              Exportar PDF
            </Button>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-1">
              <MessageSquare className="h-4 w-4" />
              Enviar ao Paciente
            </Button>
            <Button size="sm" className="gap-1">
              <Brain className="h-4 w-4" />
              Análise IA
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Send, FileText, Clock, CheckCheck, User } from "lucide-react";
import { toast } from "sonner";

interface CommunicationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  appointment: {
    patientName: string;
    phone?: string;
    time: string;
    service: string;
  };
}

const templates = [
  {
    id: "confirmation",
    title: "Confirmação de Agendamento",
    message: (name: string, time: string, service: string) =>
      `Olá ${name}! Confirmamos seu agendamento para ${service} às ${time}. Aguardamos você! 😊`,
    icon: CheckCheck,
  },
  {
    id: "reminder",
    title: "Lembrete de Consulta",
    message: (name: string, time: string) =>
      `Oi ${name}! Lembramos que sua consulta está marcada para hoje às ${time}. Até logo! 👋`,
    icon: Clock,
  },
  {
    id: "reschedule",
    title: "Solicitação de Remarcação",
    message: (name: string) =>
      `Olá ${name}, gostaríamos de remarcar seu atendimento. Poderia entrar em contato conosco? Obrigado!`,
    icon: FileText,
  },
];

export const CommunicationModal = ({ open, onOpenChange, appointment }: CommunicationModalProps) => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSelectTemplate = (templateId: string) => {
    const template = templates.find((t) => t.id === templateId);
    if (template) {
      setSelectedTemplate(templateId);
      setMessage(template.message(appointment.patientName, appointment.time, appointment.service));
    }
  };

  const handleSend = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Mensagem enviada!", {
        description: `WhatsApp enviado para ${appointment.patientName}`,
      });
      onOpenChange(false);
      setMessage("");
      setSelectedTemplate(null);
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            Comunicação com Paciente
          </DialogTitle>
          <DialogDescription>
            Envie mensagens via WhatsApp usando templates ou personalize sua mensagem
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Informações do Paciente */}
          <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <User className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{appointment.patientName}</h3>
                  <p className="text-sm text-muted-foreground">
                    {appointment.phone || "(11) 99999-9999"}
                  </p>
                </div>
              </div>
              <Badge variant="outline">{appointment.time}</Badge>
            </div>
          </div>

          {/* Templates */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Templates WhatsApp</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {templates.map((template) => (
                <Button
                  key={template.id}
                  variant={selectedTemplate === template.id ? "default" : "outline"}
                  className="justify-start h-auto py-3 px-4"
                  onClick={() => handleSelectTemplate(template.id)}
                >
                  <div className="flex flex-col items-start gap-1 text-left">
                    <div className="flex items-center gap-2">
                      <template.icon className="h-4 w-4" />
                      <span className="text-xs font-medium">{template.title}</span>
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </div>

          {/* Mensagem */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Mensagem</h4>
            <Textarea
              placeholder="Digite sua mensagem ou selecione um template acima..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[120px] resize-none"
            />
            <p className="text-xs text-muted-foreground">
              {message.length} caracteres
            </p>
          </div>

          {/* Histórico (mock) */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Histórico Recente</h4>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              <div className="p-3 rounded-lg bg-muted/30 border border-border/50">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-xs text-muted-foreground">
                    Confirmação enviada em 26/11/2025
                  </p>
                  <Badge variant="outline" className="text-xs bg-green-500/10 text-green-700 border-green-500/20">
                    Entregue
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ações */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="flex-1"
            disabled={loading}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSend}
            className="flex-1"
            disabled={loading || !message.trim()}
          >
            <Send className="h-4 w-4 mr-2" />
            {loading ? "Enviando..." : "Enviar WhatsApp"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

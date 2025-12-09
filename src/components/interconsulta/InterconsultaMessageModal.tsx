import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { 
  MessageSquare, 
  Send,
  Paperclip,
  User,
  X
} from "lucide-react";
import { toast } from "sonner";

interface InterconsultaMessageModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  interconsulta: {
    id: number;
    patient: string;
    fromDoctor: string;
    toDoctor: string;
  } | null;
}

const mockMessages = [
  { 
    id: 1, 
    from: "Dr. Carlos Santos", 
    message: "Paciente apresenta sopro sistólico detectado em consulta de rotina. Solicito avaliação cardiológica.",
    date: "08/01/2025, 14:30",
    isMe: false
  },
  { 
    id: 2, 
    from: "Dra. Ana Lima", 
    message: "Recebido. Vou agendar o ECG e ecocardiograma para avaliação completa.",
    date: "08/01/2025, 15:45",
    isMe: true
  },
];

export function InterconsultaMessageModal({ open, onOpenChange, interconsulta }: InterconsultaMessageModalProps) {
  const [message, setMessage] = useState("");
  const [attachments, setAttachments] = useState<string[]>([]);

  if (!interconsulta) return null;

  const handleSend = () => {
    if (message.trim()) {
      toast.success("Mensagem enviada com sucesso!");
      setMessage("");
      setAttachments([]);
    }
  };

  const handleAddAttachment = () => {
    setAttachments([...attachments, `Arquivo_${attachments.length + 1}.pdf`]);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh]">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
              <MessageSquare className="h-6 w-6 text-primary" />
            </div>
            <div>
              <DialogTitle>Comunicação</DialogTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Paciente: {interconsulta.patient}
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          {/* Messages */}
          <ScrollArea className="h-[300px] pr-4">
            <div className="space-y-4">
              {mockMessages.map(msg => (
                <div 
                  key={msg.id} 
                  className={`flex ${msg.isMe ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[80%] p-4 rounded-xl ${
                    msg.isMe 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-muted/50"
                  }`}>
                    <div className="flex items-center gap-2 mb-1">
                      <User className="h-3 w-3" />
                      <span className="text-xs font-medium">{msg.from}</span>
                    </div>
                    <p className="text-sm">{msg.message}</p>
                    <p className={`text-xs mt-2 ${
                      msg.isMe ? "text-primary-foreground/70" : "text-muted-foreground"
                    }`}>
                      {msg.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Attachments */}
          {attachments.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {attachments.map((file, index) => (
                <div key={index} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/50 text-sm">
                  <Paperclip className="h-3 w-3" />
                  <span>{file}</span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-5 w-5"
                    onClick={() => setAttachments(attachments.filter((_, i) => i !== index))}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="space-y-2">
            <Textarea 
              placeholder="Digite sua mensagem..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[100px] resize-none"
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <Button variant="outline" size="sm" className="gap-1" onClick={handleAddAttachment}>
            <Paperclip className="h-4 w-4" />
            Anexar Arquivo
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button className="gap-1" onClick={handleSend} disabled={!message.trim()}>
              <Send className="h-4 w-4" />
              Enviar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

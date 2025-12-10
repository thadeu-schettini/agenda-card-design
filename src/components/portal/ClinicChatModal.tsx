import { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import {
  MessageSquare,
  Send,
  Paperclip,
  Image as ImageIcon,
  Mic,
  Phone,
  Video,
  MoreVertical,
  CheckCheck,
  Clock,
  Smile,
  X,
  Bot,
  Sparkles
} from "lucide-react";
import { toast } from "sonner";

interface ClinicChatModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const mockMessages = [
  { 
    id: 1, 
    sender: "clinic", 
    content: "Olá Maria! Como podemos ajudá-la hoje?", 
    timestamp: "10:00",
    read: true,
    senderName: "Atendimento",
    avatar: ""
  },
  { 
    id: 2, 
    sender: "patient", 
    content: "Oi! Preciso remarcar minha consulta de amanhã.", 
    timestamp: "10:02",
    read: true
  },
  { 
    id: 3, 
    sender: "clinic", 
    content: "Claro! Posso verificar os horários disponíveis para você. Qual data seria melhor?", 
    timestamp: "10:03",
    read: true,
    senderName: "Atendimento",
    avatar: ""
  },
  { 
    id: 4, 
    sender: "patient", 
    content: "Pode ser na próxima semana, terça ou quarta de manhã?", 
    timestamp: "10:05",
    read: true
  },
  { 
    id: 5, 
    sender: "clinic", 
    content: "Temos disponibilidade na terça às 9h ou quarta às 10h30. Qual prefere?", 
    timestamp: "10:07",
    read: true,
    senderName: "Atendimento",
    avatar: ""
  },
];

const quickReplies = [
  "Agendar consulta",
  "Remarcar consulta",
  "Resultado de exame",
  "Receita médica",
  "Dúvida sobre medicação"
];

export function ClinicChatModal({ open, onOpenChange }: ClinicChatModalProps) {
  const [messages, setMessages] = useState(mockMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = (text?: string) => {
    const messageText = text || input;
    if (!messageText.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      sender: "patient",
      content: messageText,
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      read: false
    };

    setMessages(prev => [...prev, newMessage]);
    setInput("");
    setShowQuickReplies(false);

    // Simulate clinic response
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        sender: "clinic",
        content: "Obrigada pelo contato! Um atendente irá responder em breve. 😊",
        timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        read: true,
        senderName: "Atendimento",
        avatar: ""
      }]);
    }, 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg h-[85vh] max-h-[700px] p-0 overflow-hidden bg-card/95 backdrop-blur-xl border-2 border-primary/20 rounded-2xl shadow-2xl flex flex-col">
        {/* Header */}
        <div className="relative overflow-hidden border-b">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
          <div className="relative p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className="h-12 w-12 border-2 border-primary/20">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-gradient-to-br from-primary to-primary/70 text-primary-foreground">
                      MC
                    </AvatarFallback>
                  </Avatar>
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-status-available border-2 border-background animate-pulse" />
                </div>
                <div>
                  <h3 className="font-semibold">MedClinic</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-status-available" />
                    <span className="text-xs text-muted-foreground">Online agora</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="hover:bg-info/10 hover:text-info">
                  <Phone className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="hover:bg-info/10 hover:text-info">
                  <Video className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* AI Assistant Banner */}
        <div className="px-4 py-2 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-b animate-[fade-in_0.3s_ease-out]">
          <div className="flex items-center gap-2 text-sm">
            <div className="p-1 rounded-lg bg-primary/20">
              <Sparkles className="h-4 w-4 text-primary" />
            </div>
            <span className="text-muted-foreground">
              Assistente virtual disponível para ajudá-la rapidamente
            </span>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4" ref={scrollRef}>
          <div className="space-y-4">
            {messages.map((msg, index) => (
              <div
                key={msg.id}
                className={cn(
                  "flex animate-[fade-in_0.3s_ease-out]",
                  msg.sender === "patient" ? "justify-end" : "justify-start"
                )}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {msg.sender === "clinic" && (
                  <Avatar className="h-8 w-8 mr-2 mt-1">
                    <AvatarFallback className="bg-primary/10 text-primary text-xs">
                      MC
                    </AvatarFallback>
                  </Avatar>
                )}
                <div className={cn(
                  "max-w-[80%] group",
                  msg.sender === "patient" && "flex flex-col items-end"
                )}>
                  {msg.sender === "clinic" && msg.senderName && (
                    <span className="text-xs text-muted-foreground ml-1 mb-1">{msg.senderName}</span>
                  )}
                  <div className={cn(
                    "p-3 rounded-2xl transition-all duration-200",
                    msg.sender === "patient" 
                      ? "bg-primary text-primary-foreground rounded-tr-sm" 
                      : "bg-muted/50 rounded-tl-sm"
                  )}>
                    <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                  </div>
                  <div className={cn(
                    "flex items-center gap-1 mt-1 px-1",
                    msg.sender === "patient" && "flex-row-reverse"
                  )}>
                    <span className={cn(
                      "text-xs",
                      msg.sender === "patient" ? "text-muted-foreground" : "text-muted-foreground"
                    )}>
                      {msg.timestamp}
                    </span>
                    {msg.sender === "patient" && (
                      <CheckCheck className={cn(
                        "h-3.5 w-3.5",
                        msg.read ? "text-info" : "text-muted-foreground"
                      )} />
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-2 animate-[fade-in_0.2s_ease-out]">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary/10 text-primary text-xs">
                    MC
                  </AvatarFallback>
                </Avatar>
                <div className="p-3 rounded-2xl bg-muted/50 rounded-tl-sm">
                  <div className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Quick Replies */}
        {showQuickReplies && (
          <div className="px-4 pb-2 animate-[fade-in_0.3s_ease-out]">
            <p className="text-xs text-muted-foreground mb-2">Respostas rápidas</p>
            <div className="flex flex-wrap gap-2">
              {quickReplies.map((reply) => (
                <button
                  key={reply}
                  onClick={() => handleSend(reply)}
                  className="px-3 py-1.5 text-sm rounded-full border border-primary/30 bg-primary/5 hover:bg-primary/10 hover:border-primary/50 transition-all duration-200 active:scale-95"
                >
                  {reply}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t bg-background/50">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="shrink-0">
              <Paperclip className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="shrink-0">
              <ImageIcon className="h-5 w-5" />
            </Button>
            <div className="flex-1 relative">
              <Input
                placeholder="Digite sua mensagem..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="pr-10"
              />
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute right-0 top-0 h-full"
              >
                <Smile className="h-5 w-5 text-muted-foreground" />
              </Button>
            </div>
            <Button 
              size="icon" 
              className="shrink-0 bg-primary hover:bg-primary/90 transition-all active:scale-95"
              onClick={() => handleSend()}
              disabled={!input.trim()}
            >
              <Send className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="shrink-0">
              <Mic className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Phone, 
  Mail, 
  MessageSquare, 
  AlertTriangle, 
  TrendingDown, 
  Calendar, 
  User, 
  Building2,
  Send,
  X,
  Clock,
  Target,
  Gift,
  Percent
} from "lucide-react";
import { toast } from "sonner";

interface ContactChurnModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  clinic: {
    name: string;
    score: number;
    mrr: number;
    owner?: string;
    email?: string;
    phone?: string;
    lastLogin?: string;
  } | null;
}

const templates = [
  { id: "check_in", label: "Check-in Geral", message: "Olá! Gostaríamos de saber como está sua experiência com nosso sistema. Podemos agendar uma ligação rápida?" },
  { id: "feedback", label: "Pedido de Feedback", message: "Percebemos que você tem usado menos o sistema ultimamente. Gostaríamos de entender como podemos melhorar sua experiência." },
  { id: "offer", label: "Oferta Especial", message: "Temos uma oferta exclusiva para você! Entre em contato para saber mais sobre condições especiais para seu plano." },
  { id: "training", label: "Oferecer Treinamento", message: "Gostaríamos de oferecer um treinamento gratuito para sua equipe aproveitar melhor todas as funcionalidades do sistema." },
];

export function ContactChurnModal({ open, onOpenChange, clinic }: ContactChurnModalProps) {
  const [channel, setChannel] = useState("email");
  const [template, setTemplate] = useState("");
  const [message, setMessage] = useState("");
  const [scheduleCall, setScheduleCall] = useState(false);

  if (!clinic) return null;

  const handleTemplateChange = (templateId: string) => {
    setTemplate(templateId);
    const selected = templates.find(t => t.id === templateId);
    if (selected) {
      setMessage(selected.message);
    }
  };

  const handleSend = () => {
    if (!message.trim()) {
      toast.error("Digite uma mensagem");
      return;
    }
    
    const channelName = channel === "email" ? "Email" : channel === "whatsapp" ? "WhatsApp" : "SMS";
    toast.success(`${channelName} enviado para ${clinic.name}!`);
    onOpenChange(false);
    setMessage("");
    setTemplate("");
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-red-600";
    if (score >= 60) return "text-warning";
    return "text-info";
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-gradient-to-br from-destructive/20 to-destructive/10">
              <AlertTriangle className="h-5 w-5 text-destructive" />
            </div>
            Contatar Clínica em Risco
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Clinic Info */}
          <Card className="p-4 bg-destructive/5 border-destructive/20">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-destructive/10">
                  <Building2 className="h-5 w-5 text-destructive" />
                </div>
                <div>
                  <h4 className="font-medium">{clinic.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    MRR: R$ {clinic.mrr.toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2">
                  <TrendingDown className="h-4 w-4 text-destructive" />
                  <span className={`text-2xl font-bold ${getScoreColor(clinic.score)}`}>
                    {clinic.score}%
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">Risco de Churn</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-destructive/20">
              <div className="text-center">
                <p className="text-xs text-muted-foreground">Último Login</p>
                <p className="font-medium text-sm">{clinic.lastLogin || "Há 15 dias"}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-muted-foreground">Uso Mensal</p>
                <p className="font-medium text-sm text-warning">-45%</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-muted-foreground">Tickets Abertos</p>
                <p className="font-medium text-sm">2</p>
              </div>
            </div>
          </Card>

          {/* Suggested Actions */}
          <div className="space-y-2">
            <Label className="text-muted-foreground">Ações Sugeridas</Label>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="gap-1 cursor-pointer hover:bg-primary/5">
                <Gift className="h-3 w-3" />
                Oferecer Desconto
              </Badge>
              <Badge variant="outline" className="gap-1 cursor-pointer hover:bg-primary/5">
                <Target className="h-3 w-3" />
                Agendar Demo
              </Badge>
              <Badge variant="outline" className="gap-1 cursor-pointer hover:bg-primary/5">
                <User className="h-3 w-3" />
                CS Dedicado
              </Badge>
              <Badge variant="outline" className="gap-1 cursor-pointer hover:bg-primary/5">
                <Percent className="h-3 w-3" />
                Upgrade Grátis
              </Badge>
            </div>
          </div>

          {/* Contact Channel */}
          <Tabs value={channel} onValueChange={setChannel}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="email" className="gap-2">
                <Mail className="h-4 w-4" />
                Email
              </TabsTrigger>
              <TabsTrigger value="whatsapp" className="gap-2">
                <MessageSquare className="h-4 w-4" />
                WhatsApp
              </TabsTrigger>
              <TabsTrigger value="phone" className="gap-2">
                <Phone className="h-4 w-4" />
                Ligação
              </TabsTrigger>
            </TabsList>

            <TabsContent value="email" className="space-y-4 mt-4">
              <div className="grid gap-2">
                <Label>Template</Label>
                <Select value={template} onValueChange={handleTemplateChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um template" />
                  </SelectTrigger>
                  <SelectContent>
                    {templates.map((t) => (
                      <SelectItem key={t.id} value={t.id}>{t.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="message">Mensagem</Label>
                <Textarea
                  id="message"
                  placeholder="Digite sua mensagem..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                />
              </div>
            </TabsContent>

            <TabsContent value="whatsapp" className="space-y-4 mt-4">
              <div className="grid gap-2">
                <Label>Template</Label>
                <Select value={template} onValueChange={handleTemplateChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um template" />
                  </SelectTrigger>
                  <SelectContent>
                    {templates.map((t) => (
                      <SelectItem key={t.id} value={t.id}>{t.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="message">Mensagem</Label>
                <Textarea
                  id="message"
                  placeholder="Digite sua mensagem..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                />
              </div>
            </TabsContent>

            <TabsContent value="phone" className="space-y-4 mt-4">
              <Card className="p-4 bg-muted/30">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{clinic.phone || "(11) 98765-4321"}</p>
                    <p className="text-sm text-muted-foreground">
                      Contato: {clinic.owner || "Proprietário"}
                    </p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t">
                  <Label className="flex items-center gap-2 mb-3">
                    <Clock className="h-4 w-4" />
                    Agendar Ligação
                  </Label>
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" className="justify-start">
                      <Calendar className="h-4 w-4 mr-2" />
                      Hoje às 14h
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <Calendar className="h-4 w-4 mr-2" />
                      Hoje às 16h
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <Calendar className="h-4 w-4 mr-2" />
                      Amanhã às 10h
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <Calendar className="h-4 w-4 mr-2" />
                      Outro horário
                    </Button>
                  </div>
                </div>
              </Card>
              <div className="grid gap-2">
                <Label htmlFor="notes">Notas para a Ligação</Label>
                <Textarea
                  id="notes"
                  placeholder="Pontos a abordar na ligação..."
                  rows={3}
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            <X className="h-4 w-4 mr-2" />
            Cancelar
          </Button>
          <Button onClick={handleSend} className="gap-2">
            <Send className="h-4 w-4" />
            {channel === "phone" ? "Agendar Ligação" : "Enviar Mensagem"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Phone, 
  Mail, 
  MessageSquare, 
  Calendar,
  Clock,
  Star,
  ArrowRight,
  Send,
  DollarSign,
  Target,
  History,
  User,
  Edit2,
  Trash2,
  ChevronRight
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface LeadDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  lead: {
    id: number;
    name: string;
    phone: string;
    interest: string;
    score: number;
    stage: string;
    source: string;
    value: number;
    lastContact: string;
    daysInStage: number;
  } | null;
}

const stages = [
  { id: "primeiro_contato", name: "Primeiro Contato", color: "bg-slate-500" },
  { id: "qualificacao", name: "Qualificação", color: "bg-blue-500" },
  { id: "agendamento", name: "Agendamento", color: "bg-amber-500" },
  { id: "consulta", name: "Consulta Realizada", color: "bg-emerald-500" },
  { id: "fechamento", name: "Fechamento", color: "bg-purple-500" },
  { id: "fidelizado", name: "Fidelizado", color: "bg-pink-500" },
];

const activityHistory = [
  { type: "contact", message: "Primeiro contato via WhatsApp", date: "Hoje, 10:30" },
  { type: "note", message: "Interessado em consulta de cardiologia", date: "Hoje, 10:35" },
  { type: "stage", message: "Movido para Qualificação", date: "Ontem, 15:00" },
  { type: "contact", message: "Ligação realizada - não atendeu", date: "Ontem, 14:30" },
];

export function LeadDetailModal({ open, onOpenChange, lead }: LeadDetailModalProps) {
  const [note, setNote] = useState("");
  const [selectedStage, setSelectedStage] = useState(lead?.stage || "");

  if (!lead) return null;

  const currentStageIndex = stages.findIndex(s => s.id === lead.stage);

  const handleAddNote = () => {
    if (!note.trim()) return;
    toast.success("Nota adicionada!");
    setNote("");
  };

  const handleMoveStage = (stageId: string) => {
    setSelectedStage(stageId);
    toast.success(`Lead movido para ${stages.find(s => s.id === stageId)?.name}`);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-emerald-500 bg-emerald-500/10 border-emerald-500/20";
    if (score >= 70) return "text-amber-500 bg-amber-500/10 border-amber-500/20";
    return "text-red-500 bg-red-500/10 border-red-500/20";
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-hidden p-0">
        {/* Header */}
        <div className="p-6 bg-gradient-to-br from-primary/5 to-primary/10 border-b">
          <div className="flex items-start gap-4">
            <Avatar className="h-16 w-16 ring-4 ring-background shadow-lg">
              <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-primary text-xl font-semibold">
                {lead.name.split(" ").map(n => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-xl font-bold">{lead.name}</h2>
                <Badge className={cn("border", getScoreColor(lead.score))}>
                  <Star className="h-3 w-3 mr-1" />
                  {lead.score}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{lead.interest}</p>
              <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <Phone className="h-3.5 w-3.5" />
                  {lead.phone}
                </span>
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" />
                  {lead.lastContact}
                </span>
                {lead.value > 0 && (
                  <span className="flex items-center gap-1.5 text-emerald-600 font-medium">
                    <DollarSign className="h-3.5 w-3.5" />
                    R$ {lead.value.toLocaleString()}
                  </span>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="h-9 w-9">
                <Edit2 className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="h-9 w-9 text-destructive">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <ScrollArea className="max-h-[50vh]">
          <div className="p-6 space-y-6">
            {/* Pipeline Progress */}
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Target className="h-4 w-4 text-primary" />
                Estágio no Pipeline
              </h3>
              <div className="flex items-center gap-1">
                {stages.map((stage, idx) => (
                  <button
                    key={stage.id}
                    onClick={() => handleMoveStage(stage.id)}
                    className={cn(
                      "flex-1 h-2 rounded-full transition-all",
                      idx <= currentStageIndex ? stage.color : "bg-muted",
                      "hover:opacity-80"
                    )}
                    title={stage.name}
                  />
                ))}
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-xs text-muted-foreground">
                  {stages.find(s => s.id === lead.stage)?.name}
                </span>
                <span className="text-xs text-muted-foreground">
                  {lead.daysInStage} dia{lead.daysInStage !== 1 ? "s" : ""} neste estágio
                </span>
              </div>
            </div>

            <Separator />

            {/* Quick Actions */}
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                Ações Rápidas
              </h3>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { icon: Phone, label: "Ligar", color: "text-blue-500" },
                  { icon: MessageSquare, label: "WhatsApp", color: "text-green-500" },
                  { icon: Mail, label: "E-mail", color: "text-violet-500" },
                  { icon: Calendar, label: "Agendar", color: "text-amber-500" },
                ].map((action) => (
                  <Button
                    key={action.label}
                    variant="outline"
                    className="flex-col h-auto py-3 gap-1.5"
                    onClick={() => toast.info(`${action.label} - Em breve`)}
                  >
                    <action.icon className={cn("h-5 w-5", action.color)} />
                    <span className="text-xs">{action.label}</span>
                  </Button>
                ))}
              </div>
            </div>

            <Separator />

            {/* Activity History */}
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <History className="h-4 w-4 text-primary" />
                Histórico de Atividades
              </h3>
              <div className="space-y-3">
                {activityHistory.map((activity, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                    <div className="flex-1">
                      <p className="text-sm">{activity.message}</p>
                      <p className="text-xs text-muted-foreground">{activity.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Add Note */}
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <User className="h-4 w-4 text-primary" />
                Adicionar Nota
              </h3>
              <div className="flex gap-2">
                <Textarea
                  placeholder="Escreva uma nota sobre este lead..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={2}
                  className="flex-1"
                />
                <Button onClick={handleAddNote} size="icon" className="h-auto">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </ScrollArea>

        {/* Footer Actions */}
        <div className="p-4 border-t bg-muted/30 flex justify-between">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Fechar
          </Button>
          <Button className="gap-2">
            <ArrowRight className="h-4 w-4" />
            Avançar Estágio
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

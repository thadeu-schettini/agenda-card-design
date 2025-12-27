import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  Forward, 
  Search, 
  User,
  MessageSquare,
  Users,
  Headphones
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface TransferChatModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const teams = [
  { id: "atendimento", name: "Atendimento Geral", members: 5, online: 3 },
  { id: "agendamento", name: "Agendamentos", members: 3, online: 2 },
  { id: "financeiro", name: "Financeiro", members: 2, online: 1 },
  { id: "medico", name: "Suporte Médico", members: 4, online: 2 },
];

const agents = [
  { id: 1, name: "Ana Paula", role: "Atendimento", status: "online", chats: 3 },
  { id: 2, name: "Carlos Silva", role: "Agendamentos", status: "online", chats: 5 },
  { id: 3, name: "Maria Santos", role: "Financeiro", status: "busy", chats: 8 },
  { id: 4, name: "Pedro Lima", role: "Atendimento", status: "online", chats: 2 },
];

export function TransferChatModal({ open, onOpenChange }: TransferChatModalProps) {
  const [transferType, setTransferType] = useState<"team" | "agent">("team");
  const [selectedTeam, setSelectedTeam] = useState("");
  const [selectedAgent, setSelectedAgent] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [note, setNote] = useState("");

  const filteredAgents = agents.filter(a => 
    a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTransfer = () => {
    if (transferType === "team" && !selectedTeam) {
      toast.error("Selecione uma equipe");
      return;
    }
    if (transferType === "agent" && !selectedAgent) {
      toast.error("Selecione um atendente");
      return;
    }
    toast.success("Conversa transferida com sucesso!");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader className="pb-4 border-b">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg">
              <Forward className="h-5 w-5 text-white" />
            </div>
            <div>
              <DialogTitle>Transferir Conversa</DialogTitle>
              <p className="text-sm text-muted-foreground mt-0.5">
                Escolha para quem transferir
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className="py-4 space-y-5">
          {/* Transfer Type */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setTransferType("team")}
              className={cn(
                "p-3 rounded-xl border-2 transition-all flex flex-col items-center gap-2",
                transferType === "team"
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50"
              )}
            >
              <Users className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">Para Equipe</span>
            </button>
            <button
              onClick={() => setTransferType("agent")}
              className={cn(
                "p-3 rounded-xl border-2 transition-all flex flex-col items-center gap-2",
                transferType === "agent"
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50"
              )}
            >
              <Headphones className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">Para Atendente</span>
            </button>
          </div>

          {/* Team Selection */}
          {transferType === "team" && (
            <div className="space-y-3">
              <Label>Selecione a equipe</Label>
              <RadioGroup value={selectedTeam} onValueChange={setSelectedTeam}>
                <div className="space-y-2">
                  {teams.map((team) => (
                    <label
                      key={team.id}
                      className={cn(
                        "flex items-center justify-between p-3 rounded-xl border-2 cursor-pointer transition-all",
                        selectedTeam === team.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value={team.id} />
                        <div>
                          <p className="font-medium text-sm">{team.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {team.members} membros
                          </p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="gap-1">
                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                        {team.online} online
                      </Badge>
                    </label>
                  ))}
                </div>
              </RadioGroup>
            </div>
          )}

          {/* Agent Selection */}
          {transferType === "agent" && (
            <div className="space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar atendente..."
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <ScrollArea className="h-[200px]">
                <div className="space-y-2">
                  {filteredAgents.map((agent) => (
                    <button
                      key={agent.id}
                      onClick={() => setSelectedAgent(agent.id.toString())}
                      className={cn(
                        "w-full flex items-center justify-between p-3 rounded-xl border-2 transition-all text-left",
                        selectedAgent === agent.id.toString()
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-primary/10 text-primary">
                              {agent.name.split(" ").map(n => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className={cn(
                            "absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-background",
                            agent.status === "online" ? "bg-emerald-500" : "bg-amber-500"
                          )} />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{agent.name}</p>
                          <p className="text-xs text-muted-foreground">{agent.role}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {agent.chats} chats
                      </Badge>
                    </button>
                  ))}
                </div>
              </ScrollArea>
            </div>
          )}

          {/* Note */}
          <div className="space-y-2">
            <Label htmlFor="note" className="flex items-center gap-2">
              <MessageSquare className="h-3.5 w-3.5 text-muted-foreground" />
              Nota para o destinatário
            </Label>
            <Textarea
              id="note"
              placeholder="Informações importantes sobre o atendimento..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={2}
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleTransfer} className="gap-2">
            <Forward className="h-4 w-4" />
            Transferir
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

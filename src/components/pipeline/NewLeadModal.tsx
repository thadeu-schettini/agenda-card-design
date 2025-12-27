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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  UserPlus, 
  Phone, 
  Mail, 
  MessageSquare, 
  Sparkles,
  Instagram,
  Globe,
  Users
} from "lucide-react";
import { toast } from "sonner";

interface NewLeadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const sources = [
  { id: "whatsapp", name: "WhatsApp", icon: MessageSquare, color: "text-green-500" },
  { id: "instagram", name: "Instagram", icon: Instagram, color: "text-pink-500" },
  { id: "site", name: "Site", icon: Globe, color: "text-blue-500" },
  { id: "indicacao", name: "Indicação", icon: Users, color: "text-amber-500" },
];

export function NewLeadModal({ open, onOpenChange }: NewLeadModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [source, setSource] = useState("");
  const [interest, setInterest] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = () => {
    if (!name || !phone) {
      toast.error("Preencha nome e telefone");
      return;
    }
    toast.success("Lead adicionado ao pipeline!");
    onOpenChange(false);
    // Reset
    setName("");
    setPhone("");
    setEmail("");
    setSource("");
    setInterest("");
    setNotes("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader className="pb-4 border-b">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg">
              <UserPlus className="h-5 w-5 text-white" />
            </div>
            <div>
              <DialogTitle>Novo Lead</DialogTitle>
              <p className="text-sm text-muted-foreground mt-0.5">
                Adicione um novo contato ao pipeline
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className="grid gap-5 py-4">
          {/* Name & Phone */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome Completo *</Label>
              <Input
                id="name"
                placeholder="Nome do paciente"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                Telefone *
              </Label>
              <Input
                id="phone"
                placeholder="(11) 99999-9999"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="h-3.5 w-3.5 text-muted-foreground" />
              E-mail
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="email@exemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Source */}
          <div className="space-y-2">
            <Label>Origem do Contato</Label>
            <div className="grid grid-cols-4 gap-2">
              {sources.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSource(s.id)}
                  className={`p-3 rounded-xl border-2 transition-all flex flex-col items-center gap-1.5 ${
                    source === s.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <s.icon className={`h-5 w-5 ${s.color}`} />
                  <span className="text-xs font-medium">{s.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Interest */}
          <div className="space-y-2">
            <Label>Interesse</Label>
            <Select value={interest} onValueChange={setInterest}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o interesse" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="consulta">Consulta</SelectItem>
                <SelectItem value="exame">Exame</SelectItem>
                <SelectItem value="procedimento">Procedimento</SelectItem>
                <SelectItem value="checkup">Check-up Completo</SelectItem>
                <SelectItem value="retorno">Retorno</SelectItem>
                <SelectItem value="outro">Outro</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Observações</Label>
            <Textarea
              id="notes"
              placeholder="Informações adicionais sobre o lead..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} className="gap-2">
            <Sparkles className="h-4 w-4" />
            Adicionar Lead
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import {
  Users,
  Plus,
  Shield,
  Eye,
  EyeOff,
  Calendar,
  FileText,
  CreditCard,
  Pill,
  Trash2,
  Edit2,
  CheckCircle2,
  X,
  Mail,
  Phone,
  UserPlus,
  Settings
} from "lucide-react";
import { toast } from "sonner";

interface FamilyAccessModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const mockFamilyMembers = [
  { 
    id: 1, 
    name: "João Silva Santos", 
    relationship: "Esposo",
    email: "joao.silva@email.com",
    phone: "(11) 98888-1234",
    avatar: "",
    permissions: {
      appointments: true,
      documents: true,
      payments: false,
      medications: true
    },
    status: "active"
  },
  { 
    id: 2, 
    name: "Ana Clara Santos", 
    relationship: "Filha",
    email: "ana.clara@email.com",
    phone: "(11) 97777-5678",
    avatar: "",
    permissions: {
      appointments: true,
      documents: false,
      payments: false,
      medications: false
    },
    status: "active"
  },
];

export function FamilyAccessModal({ open, onOpenChange }: FamilyAccessModalProps) {
  const [members, setMembers] = useState(mockFamilyMembers);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingMember, setEditingMember] = useState<number | null>(null);
  const [newMember, setNewMember] = useState({
    name: "",
    relationship: "",
    email: "",
    phone: ""
  });

  const togglePermission = (memberId: number, permission: string) => {
    setMembers(prev => prev.map(m => {
      if (m.id === memberId) {
        return {
          ...m,
          permissions: {
            ...m.permissions,
            [permission]: !m.permissions[permission as keyof typeof m.permissions]
          }
        };
      }
      return m;
    }));
    toast.success("Permissão atualizada!");
  };

  const handleAddMember = () => {
    if (!newMember.name || !newMember.email) {
      toast.error("Preencha os campos obrigatórios");
      return;
    }
    
    setMembers(prev => [...prev, {
      id: prev.length + 1,
      ...newMember,
      avatar: "",
      permissions: {
        appointments: false,
        documents: false,
        payments: false,
        medications: false
      },
      status: "pending"
    }]);
    
    toast.success("Convite enviado!", { description: "Um email foi enviado para o familiar" });
    setShowAddForm(false);
    setNewMember({ name: "", relationship: "", email: "", phone: "" });
  };

  const removeMember = (memberId: number) => {
    setMembers(prev => prev.filter(m => m.id !== memberId));
    toast.success("Acesso removido!");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden bg-card/95 backdrop-blur-xl border-2 border-primary/20 rounded-2xl shadow-2xl p-0">
        {/* Header */}
        <div className="relative overflow-hidden border-b">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-transparent" />
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
          
          <DialogHeader className="relative p-6 pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg shadow-purple-500/25 animate-[scale-in_0.3s_ease-out]">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <DialogTitle className="text-xl font-bold">Acesso Familiar</DialogTitle>
                  <p className="text-sm text-muted-foreground">Gerencie quem pode acessar suas informações</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onOpenChange(false)}
                className="hover:bg-destructive/10 hover:text-destructive"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </DialogHeader>
        </div>

        <ScrollArea className="max-h-[calc(90vh-120px)]">
          <div className="p-6 space-y-6">
            {/* Info Banner */}
            <div className="p-4 rounded-xl bg-info/10 border border-info/20 animate-[fade-in_0.3s_ease-out]">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-info mt-0.5" />
                <div>
                  <h4 className="font-medium text-info">Compartilhamento Seguro</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Os familiares só terão acesso às informações que você permitir. 
                    Você pode alterar ou revogar permissões a qualquer momento.
                  </p>
                </div>
              </div>
            </div>

            {/* Family Members List */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Familiares com Acesso ({members.length})
                </h4>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="gap-2"
                  onClick={() => setShowAddForm(true)}
                >
                  <UserPlus className="h-4 w-4" />
                  Adicionar
                </Button>
              </div>

              {members.map((member, index) => (
                <div 
                  key={member.id}
                  className="p-4 rounded-xl bg-muted/30 border hover:border-primary/20 transition-all animate-[fade-in_0.3s_ease-out]"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12 border-2 border-primary/10">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 text-purple-600">
                          {member.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <h5 className="font-semibold">{member.name}</h5>
                          <Badge 
                            variant="outline" 
                            className={cn(
                              "text-xs",
                              member.status === "active" 
                                ? "text-status-confirmed border-status-confirmed/30" 
                                : "text-warning border-warning/30"
                            )}
                          >
                            {member.status === "active" ? "Ativo" : "Pendente"}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{member.relationship}</p>
                        <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {member.email}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => setEditingMember(editingMember === member.id ? null : member.id)}
                      >
                        <Settings className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => removeMember(member.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Permissions */}
                  <div className={cn(
                    "grid grid-cols-2 sm:grid-cols-4 gap-2 transition-all",
                    editingMember === member.id ? "opacity-100" : "opacity-70"
                  )}>
                    {[
                      { key: "appointments", icon: Calendar, label: "Consultas" },
                      { key: "documents", icon: FileText, label: "Documentos" },
                      { key: "payments", icon: CreditCard, label: "Pagamentos" },
                      { key: "medications", icon: Pill, label: "Medicações" },
                    ].map((perm) => (
                      <button
                        key={perm.key}
                        onClick={() => togglePermission(member.id, perm.key)}
                        disabled={editingMember !== member.id}
                        className={cn(
                          "p-2 rounded-lg border text-center transition-all duration-200",
                          member.permissions[perm.key as keyof typeof member.permissions]
                            ? "bg-status-confirmed/10 border-status-confirmed/30 text-status-confirmed"
                            : "bg-muted/50 border-transparent text-muted-foreground",
                          editingMember === member.id && "hover:scale-105 cursor-pointer"
                        )}
                      >
                        <div className="flex flex-col items-center gap-1">
                          {member.permissions[perm.key as keyof typeof member.permissions] ? (
                            <Eye className="h-4 w-4" />
                          ) : (
                            <EyeOff className="h-4 w-4" />
                          )}
                          <span className="text-xs">{perm.label}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Add Member Form */}
            {showAddForm && (
              <div className="p-4 rounded-xl border-2 border-dashed border-primary/30 bg-primary/5 space-y-4 animate-[scale-in_0.2s_ease-out]">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold flex items-center gap-2">
                    <UserPlus className="h-4 w-4" />
                    Adicionar Familiar
                  </h4>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8"
                    onClick={() => setShowAddForm(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Nome completo *</Label>
                    <Input 
                      placeholder="Nome do familiar"
                      value={newMember.name}
                      onChange={(e) => setNewMember(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Parentesco</Label>
                    <Input 
                      placeholder="Ex: Cônjuge, Filho(a)"
                      value={newMember.relationship}
                      onChange={(e) => setNewMember(prev => ({ ...prev, relationship: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>E-mail *</Label>
                    <Input 
                      type="email"
                      placeholder="email@exemplo.com"
                      value={newMember.email}
                      onChange={(e) => setNewMember(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Telefone</Label>
                    <Input 
                      placeholder="(00) 00000-0000"
                      value={newMember.phone}
                      onChange={(e) => setNewMember(prev => ({ ...prev, phone: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-muted/50 text-sm text-muted-foreground">
                  <p>Um convite será enviado por e-mail. O familiar precisará criar uma conta para acessar suas informações.</p>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setShowAddForm(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={handleAddMember} className="gap-2">
                    <Mail className="h-4 w-4" />
                    Enviar Convite
                  </Button>
                </div>
              </div>
            )}

            {/* Empty State */}
            {members.length === 0 && !showAddForm && (
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                <h4 className="font-medium mb-2">Nenhum familiar cadastrado</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Adicione familiares para compartilhar suas informações de saúde
                </p>
                <Button onClick={() => setShowAddForm(true)} className="gap-2">
                  <UserPlus className="h-4 w-4" />
                  Adicionar Familiar
                </Button>
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

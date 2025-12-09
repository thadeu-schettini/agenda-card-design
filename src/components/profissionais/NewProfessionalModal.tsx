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
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Camera, Plus, X, Save, User } from "lucide-react";
import { toast } from "sonner";

interface NewProfessionalModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave?: (professional: any) => void;
}

const specialties = [
  "Cardiologia",
  "Dermatologia",
  "Ortopedia",
  "Pediatria",
  "Neurologia",
  "Ginecologia",
  "Oftalmologia",
  "Psiquiatria",
  "Endocrinologia",
  "Urologia",
];

export function NewProfessionalModal({
  open,
  onOpenChange,
  onSave,
}: NewProfessionalModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    crm: "",
    specialty: "",
    otherSpecialties: [] as string[],
    phone: "",
    email: "",
    address: "",
    bio: "",
    acceptsAppointments: true,
  });
  const [newSpecialty, setNewSpecialty] = useState("");

  const handleAddSpecialty = () => {
    if (newSpecialty && !formData.otherSpecialties.includes(newSpecialty)) {
      setFormData({
        ...formData,
        otherSpecialties: [...formData.otherSpecialties, newSpecialty],
      });
      setNewSpecialty("");
    }
  };

  const handleRemoveSpecialty = (specialty: string) => {
    setFormData({
      ...formData,
      otherSpecialties: formData.otherSpecialties.filter((s) => s !== specialty),
    });
  };

  const handleSave = () => {
    if (!formData.name || !formData.crm || !formData.specialty) {
      toast.error("Preencha os campos obrigatórios");
      return;
    }

    const newProfessional = {
      id: Date.now().toString(),
      ...formData,
      status: "disponivel",
      appointmentsToday: 0,
      nextAvailable: "09:00",
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.name.replace(/\s/g, "")}`,
    };

    onSave?.(newProfessional);
    toast.success("Profissional adicionado com sucesso!");
    onOpenChange(false);
    
    // Reset form
    setFormData({
      name: "",
      crm: "",
      specialty: "",
      otherSpecialties: [],
      phone: "",
      email: "",
      address: "",
      bio: "",
      acceptsAppointments: true,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10">
              <User className="h-5 w-5 text-primary" />
            </div>
            Novo Profissional
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-120px)] pr-4">
          <div className="space-y-6 py-4">
            {/* Photo Upload */}
            <div className="flex justify-center">
              <div className="relative">
                <Avatar className="h-24 w-24 border-2 border-primary/20">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-primary/10 text-primary text-2xl">
                    {formData.name ? formData.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase() : "?"}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full shadow-md"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Personal Info */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-muted-foreground">Informações Pessoais</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo *</Label>
                  <Input
                    id="name"
                    placeholder="Dr. João Silva"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="crm">CRM *</Label>
                  <Input
                    id="crm"
                    placeholder="CRM/SP 123456"
                    value={formData.crm}
                    onChange={(e) => setFormData({ ...formData, crm: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="specialty">Especialidade Principal *</Label>
                  <Select
                    value={formData.specialty}
                    onValueChange={(value) => setFormData({ ...formData, specialty: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                    <SelectContent>
                      {specialties.map((spec) => (
                        <SelectItem key={spec} value={spec}>
                          {spec}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Consultório</Label>
                  <Input
                    id="address"
                    placeholder="Consultório 101"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-muted-foreground">Contato</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    placeholder="(11) 99999-9999"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="email@clinica.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Other Specialties */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-muted-foreground">Outras Especialidades</h4>
              <div className="flex flex-wrap gap-2 min-h-[32px]">
                {formData.otherSpecialties.map((spec) => (
                  <Badge key={spec} variant="secondary" className="gap-1 pr-1">
                    {spec}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 hover:bg-destructive/20"
                      onClick={() => handleRemoveSpecialty(spec)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Select value={newSpecialty} onValueChange={setNewSpecialty}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Adicionar especialidade..." />
                  </SelectTrigger>
                  <SelectContent>
                    {specialties
                      .filter((s) => s !== formData.specialty && !formData.otherSpecialties.includes(s))
                      .map((spec) => (
                        <SelectItem key={spec} value={spec}>
                          {spec}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon" onClick={handleAddSpecialty}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Bio */}
            <div className="space-y-2">
              <Label htmlFor="bio">Biografia</Label>
              <Textarea
                id="bio"
                placeholder="Breve descrição sobre o profissional..."
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                rows={3}
              />
            </div>

            {/* Settings */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30">
              <div>
                <p className="font-medium text-sm">Aceita Agendamentos</p>
                <p className="text-xs text-muted-foreground">
                  Permitir que pacientes agendem consultas
                </p>
              </div>
              <Switch
                checked={formData.acceptsAppointments}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, acceptsAppointments: checked })
                }
              />
            </div>
          </div>
        </ScrollArea>

        {/* Footer */}
        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSave} className="gap-2">
            <Save className="h-4 w-4" />
            Salvar Profissional
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

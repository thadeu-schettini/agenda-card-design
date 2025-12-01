import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, MapPin, Briefcase, Calendar, User } from "lucide-react";

interface Professional {
  name: string;
  specialty: string;
  crm: string;
  phone: string;
  email: string;
  address: string;
}

interface ProfessionalGeneralTabProps {
  professional: Professional;
}

export const ProfessionalGeneralTab = ({ professional }: ProfessionalGeneralTabProps) => {
  return (
    <div className="space-y-4">
      <Card className="p-4 border-border/50 bg-card/50 backdrop-blur-sm">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <User className="h-4 w-4 text-primary" />
          Informações Pessoais
        </h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-primary/10 mt-0.5">
              <User className="h-4 w-4 text-primary" />
            </div>
            <div className="flex-1">
              <Label className="text-xs text-muted-foreground">Nome Completo</Label>
              <p className="text-sm font-medium">{professional.name}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-primary/10 mt-0.5">
              <Briefcase className="h-4 w-4 text-primary" />
            </div>
            <div className="flex-1">
              <Label className="text-xs text-muted-foreground">Especialidade</Label>
              <p className="text-sm font-medium">{professional.specialty}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-primary/10 mt-0.5">
              <Badge className="h-4 w-4 text-primary" />
            </div>
            <div className="flex-1">
              <Label className="text-xs text-muted-foreground">Registro Profissional</Label>
              <p className="text-sm font-medium">{professional.crm}</p>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-4 border-border/50 bg-card/50 backdrop-blur-sm">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Phone className="h-4 w-4 text-primary" />
          Contato
        </h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-primary/10 mt-0.5">
              <Phone className="h-4 w-4 text-primary" />
            </div>
            <div className="flex-1">
              <Label className="text-xs text-muted-foreground">Telefone</Label>
              <p className="text-sm font-medium">{professional.phone}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-primary/10 mt-0.5">
              <Mail className="h-4 w-4 text-primary" />
            </div>
            <div className="flex-1">
              <Label className="text-xs text-muted-foreground">E-mail</Label>
              <p className="text-sm font-medium">{professional.email}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-primary/10 mt-0.5">
              <MapPin className="h-4 w-4 text-primary" />
            </div>
            <div className="flex-1">
              <Label className="text-xs text-muted-foreground">Local de Atendimento</Label>
              <p className="text-sm font-medium">{professional.address}</p>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-4 border-border/50 bg-card/50 backdrop-blur-sm">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Calendar className="h-4 w-4 text-primary" />
          Outras Especialidades
        </h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">Clínica Geral</Badge>
          <Badge variant="secondary">Medicina Preventiva</Badge>
          <Badge variant="secondary">Saúde Ocupacional</Badge>
        </div>
      </Card>
    </div>
  );
};
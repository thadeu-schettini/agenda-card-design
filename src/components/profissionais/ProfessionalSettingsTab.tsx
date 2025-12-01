import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Settings, Shield, Bell, Calendar, Lock, Save } from "lucide-react";

interface Professional {
  name: string;
}

interface ProfessionalSettingsTabProps {
  professional: Professional;
}

export const ProfessionalSettingsTab = ({ professional }: ProfessionalSettingsTabProps) => {
  return (
    <div className="space-y-4">
      <Card className="p-4 border-border/50 bg-card/50 backdrop-blur-sm">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Shield className="h-4 w-4 text-primary" />
          Permissões de Acesso
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
            <div className="flex-1">
              <Label htmlFor="access-calendar" className="font-medium text-sm">
                Acesso à Agenda
              </Label>
              <p className="text-xs text-muted-foreground mt-1">
                Permite visualizar e gerenciar agenda
              </p>
            </div>
            <Switch id="access-calendar" defaultChecked />
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
            <div className="flex-1">
              <Label htmlFor="access-records" className="font-medium text-sm">
                Acesso a Prontuários
              </Label>
              <p className="text-xs text-muted-foreground mt-1">
                Permite criar e editar prontuários
              </p>
            </div>
            <Switch id="access-records" defaultChecked />
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
            <div className="flex-1">
              <Label htmlFor="access-billing" className="font-medium text-sm">
                Acesso Financeiro
              </Label>
              <p className="text-xs text-muted-foreground mt-1">
                Permite visualizar dados financeiros
              </p>
            </div>
            <Switch id="access-billing" />
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
            <div className="flex-1">
              <Label htmlFor="access-config" className="font-medium text-sm">
                Configurações do Sistema
              </Label>
              <p className="text-xs text-muted-foreground mt-1">
                Permite alterar configurações gerais
              </p>
            </div>
            <Switch id="access-config" />
          </div>
        </div>
      </Card>

      <Card className="p-4 border-border/50 bg-card/50 backdrop-blur-sm">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Bell className="h-4 w-4 text-primary" />
          Notificações
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
            <div className="flex-1">
              <Label htmlFor="notify-appointments" className="font-medium text-sm">
                Novos Agendamentos
              </Label>
              <p className="text-xs text-muted-foreground mt-1">
                Receber notificações de novos agendamentos
              </p>
            </div>
            <Switch id="notify-appointments" defaultChecked />
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
            <div className="flex-1">
              <Label htmlFor="notify-cancellations" className="font-medium text-sm">
                Cancelamentos
              </Label>
              <p className="text-xs text-muted-foreground mt-1">
                Receber notificações de cancelamentos
              </p>
            </div>
            <Switch id="notify-cancellations" defaultChecked />
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
            <div className="flex-1">
              <Label htmlFor="notify-reminders" className="font-medium text-sm">
                Lembretes de Consulta
              </Label>
              <p className="text-xs text-muted-foreground mt-1">
                Receber lembretes 30 min antes da consulta
              </p>
            </div>
            <Switch id="notify-reminders" defaultChecked />
          </div>
        </div>
      </Card>

      <Card className="p-4 border-border/50 bg-card/50 backdrop-blur-sm">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Calendar className="h-4 w-4 text-primary" />
          Configurações de Agenda
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
            <div className="flex-1">
              <Label htmlFor="auto-confirm" className="font-medium text-sm">
                Confirmação Automática
              </Label>
              <p className="text-xs text-muted-foreground mt-1">
                Confirmar automaticamente agendamentos online
              </p>
            </div>
            <Switch id="auto-confirm" />
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
            <div className="flex-1">
              <Label htmlFor="online-booking" className="font-medium text-sm">
                Agendamento Online
              </Label>
              <p className="text-xs text-muted-foreground mt-1">
                Permitir que pacientes agendem online
              </p>
            </div>
            <Switch id="online-booking" defaultChecked />
          </div>

          <div className="p-3 rounded-lg bg-muted/30">
            <Label className="font-medium text-sm block mb-2">
              Duração Padrão da Consulta
            </Label>
            <div className="flex gap-2">
              <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                30 min
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors bg-primary text-primary-foreground">
                45 min
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                60 min
              </Badge>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-4 border-border/50 bg-card/50 backdrop-blur-sm">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Lock className="h-4 w-4 text-primary" />
          Segurança
        </h3>
        <div className="space-y-3">
          <Button variant="outline" className="w-full justify-start">
            <Lock className="h-4 w-4 mr-2" />
            Redefinir Senha
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Shield className="h-4 w-4 mr-2" />
            Autenticação em Dois Fatores
          </Button>
        </div>
      </Card>

      <div className="flex gap-3 pt-4">
        <Button className="flex-1">
          <Save className="h-4 w-4 mr-2" />
          Salvar Alterações
        </Button>
        <Button variant="outline" className="flex-1">
          Cancelar
        </Button>
      </div>
    </div>
  );
};
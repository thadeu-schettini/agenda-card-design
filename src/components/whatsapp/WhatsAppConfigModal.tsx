import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  Settings2, 
  Save, 
  Link2,
  CheckCircle2,
  Clock,
  Bell,
  Shield,
  Smartphone
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface WhatsAppConfigModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function WhatsAppConfigModal({ open, onOpenChange }: WhatsAppConfigModalProps) {
  const [config, setConfig] = useState({
    phone: "+55 11 99999-9999",
    businessName: "Clínica Médica",
    autoReply: true,
    sendConfirmation: true,
    sendReminder24h: true,
    sendReminder2h: false,
    sendFollowUp: true,
    quietHoursStart: "22:00",
    quietHoursEnd: "08:00",
    quietHoursEnabled: true,
  });

  const handleSave = () => {
    toast.success("Configurações salvas com sucesso!");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh]">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-green-500/20 to-green-500/5 flex items-center justify-center">
              <Settings2 className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <DialogTitle>Configurações do WhatsApp</DialogTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Configure a integração com WhatsApp Business
              </p>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="h-[50vh] pr-4">
          <div className="space-y-6">
            {/* Connection Status */}
            <div className="p-4 rounded-xl bg-confirmed/5 border border-confirmed/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-confirmed" />
                  <span className="font-medium">Conectado</span>
                </div>
                <Badge variant="outline" className="bg-confirmed/10 text-confirmed border-confirmed/20">
                  API Ativa
                </Badge>
              </div>
            </div>

            {/* Business Info */}
            <div className="space-y-4">
              <h4 className="font-medium flex items-center gap-2">
                <Smartphone className="h-4 w-4 text-primary" />
                Informações do Negócio
              </h4>
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label>Número WhatsApp Business</Label>
                  <Input 
                    value={config.phone}
                    onChange={(e) => setConfig({ ...config, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Nome do Negócio</Label>
                  <Input 
                    value={config.businessName}
                    onChange={(e) => setConfig({ ...config, businessName: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Automations */}
            <div className="space-y-4">
              <h4 className="font-medium flex items-center gap-2">
                <Bell className="h-4 w-4 text-primary" />
                Automações
              </h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">Resposta Automática</p>
                    <p className="text-xs text-muted-foreground">Responder mensagens fora do horário</p>
                  </div>
                  <Switch 
                    checked={config.autoReply}
                    onCheckedChange={(v) => setConfig({ ...config, autoReply: v })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">Confirmação de Agendamento</p>
                    <p className="text-xs text-muted-foreground">Enviar ao criar consulta</p>
                  </div>
                  <Switch 
                    checked={config.sendConfirmation}
                    onCheckedChange={(v) => setConfig({ ...config, sendConfirmation: v })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">Lembrete 24h antes</p>
                    <p className="text-xs text-muted-foreground">Um dia antes da consulta</p>
                  </div>
                  <Switch 
                    checked={config.sendReminder24h}
                    onCheckedChange={(v) => setConfig({ ...config, sendReminder24h: v })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">Lembrete 2h antes</p>
                    <p className="text-xs text-muted-foreground">Duas horas antes da consulta</p>
                  </div>
                  <Switch 
                    checked={config.sendReminder2h}
                    onCheckedChange={(v) => setConfig({ ...config, sendReminder2h: v })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">Follow-up Pós-Consulta</p>
                    <p className="text-xs text-muted-foreground">Após atendimento realizado</p>
                  </div>
                  <Switch 
                    checked={config.sendFollowUp}
                    onCheckedChange={(v) => setConfig({ ...config, sendFollowUp: v })}
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Quiet Hours */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  Horário de Silêncio
                </h4>
                <Switch 
                  checked={config.quietHoursEnabled}
                  onCheckedChange={(v) => setConfig({ ...config, quietHoursEnabled: v })}
                />
              </div>
              {config.quietHoursEnabled && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Início</Label>
                    <Input 
                      type="time"
                      value={config.quietHoursStart}
                      onChange={(e) => setConfig({ ...config, quietHoursStart: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Fim</Label>
                    <Input 
                      type="time"
                      value={config.quietHoursEnd}
                      onChange={(e) => setConfig({ ...config, quietHoursEnd: e.target.value })}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </ScrollArea>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSave} className="gap-2">
            <Save className="h-4 w-4" />
            Salvar Configurações
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

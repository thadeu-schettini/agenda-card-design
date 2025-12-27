import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Settings2, 
  Video,
  Mic,
  Monitor,
  Shield,
  Bell,
  Clock,
  Globe,
  Save,
  RefreshCw
} from "lucide-react";
import { toast } from "sonner";

interface TeleconfigModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TeleconfigModal({ open, onOpenChange }: TeleconfigModalProps) {
  const [autoRecord, setAutoRecord] = useState(false);
  const [waitingRoom, setWaitingRoom] = useState(true);
  const [autoReminder, setAutoReminder] = useState(true);
  const [maxDuration, setMaxDuration] = useState("60");
  const [quality, setQuality] = useState("high");
  const [language, setLanguage] = useState("pt-BR");

  const handleSave = () => {
    toast.success("Configurações salvas com sucesso!");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader className="pb-4 border-b">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lg">
              <Settings2 className="h-5 w-5 text-white" />
            </div>
            <div>
              <DialogTitle>Configurações de Telemedicina</DialogTitle>
              <p className="text-sm text-muted-foreground mt-0.5">
                Personalize suas videochamadas
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className="py-4 space-y-6 max-h-[60vh] overflow-y-auto pr-2">
          {/* Video Settings */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Video className="h-4 w-4 text-primary" />
              <h3 className="font-semibold">Vídeo e Áudio</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
                <div className="flex items-center gap-3">
                  <Monitor className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-sm">Qualidade de Vídeo</p>
                    <p className="text-xs text-muted-foreground">
                      Ajuste conforme sua conexão
                    </p>
                  </div>
                </div>
                <Select value={quality} onValueChange={setQuality}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Baixa</SelectItem>
                    <SelectItem value="medium">Média</SelectItem>
                    <SelectItem value="high">Alta</SelectItem>
                    <SelectItem value="auto">Automática</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
                <div className="flex items-center gap-3">
                  <Mic className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-sm">Gravar Automaticamente</p>
                    <p className="text-xs text-muted-foreground">
                      Salva todas as consultas
                    </p>
                  </div>
                </div>
                <Switch checked={autoRecord} onCheckedChange={setAutoRecord} />
              </div>
            </div>
          </div>

          <Separator />

          {/* Room Settings */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              <h3 className="font-semibold">Sala de Espera</h3>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
              <div>
                <p className="font-medium text-sm">Habilitar Sala de Espera</p>
                <p className="text-xs text-muted-foreground">
                  Paciente aguarda aprovação para entrar
                </p>
              </div>
              <Switch checked={waitingRoom} onCheckedChange={setWaitingRoom} />
            </div>
          </div>

          <Separator />

          {/* Time Settings */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              <h3 className="font-semibold">Tempo</h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
                <div>
                  <p className="font-medium text-sm">Duração Máxima</p>
                  <p className="text-xs text-muted-foreground">
                    Limite de tempo por consulta
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    value={maxDuration}
                    onChange={(e) => setMaxDuration(e.target.value)}
                    className="w-20 text-center"
                  />
                  <span className="text-sm text-muted-foreground">min</span>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Notifications */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Bell className="h-4 w-4 text-primary" />
              <h3 className="font-semibold">Notificações</h3>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
              <div>
                <p className="font-medium text-sm">Lembrete Automático</p>
                <p className="text-xs text-muted-foreground">
                  Enviar link 30 min antes
                </p>
              </div>
              <Switch checked={autoReminder} onCheckedChange={setAutoReminder} />
            </div>
          </div>

          <Separator />

          {/* Language */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-primary" />
              <h3 className="font-semibold">Idioma</h3>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
              <div>
                <p className="font-medium text-sm">Idioma da Interface</p>
                <p className="text-xs text-muted-foreground">
                  Para o paciente na sala
                </p>
              </div>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pt-BR">Português (BR)</SelectItem>
                  <SelectItem value="en-US">English (US)</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="flex justify-between pt-4 border-t">
          <Button variant="ghost" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Restaurar Padrões
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSave} className="gap-2">
              <Save className="h-4 w-4" />
              Salvar Configurações
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

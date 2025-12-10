import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  Video,
  Mic,
  Camera,
  Monitor,
  Volume2,
  Settings,
  Wifi,
  WifiOff,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  X,
  Headphones,
  Speaker,
  Sun,
  Moon,
  Maximize2,
  Grid3X3
} from "lucide-react";
import { toast } from "sonner";

interface TeleconsultaConfigModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TeleconsultaConfigModal({ open, onOpenChange }: TeleconsultaConfigModalProps) {
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [micEnabled, setMicEnabled] = useState(true);
  const [speakerVolume, setSpeakerVolume] = useState([75]);
  const [micVolume, setMicVolume] = useState([80]);
  const [selectedCamera, setSelectedCamera] = useState("default");
  const [selectedMic, setSelectedMic] = useState("default");
  const [selectedSpeaker, setSelectedSpeaker] = useState("default");
  const [virtualBackground, setVirtualBackground] = useState("none");
  const [noiseCancellation, setNoiseCancellation] = useState(true);
  const [hdVideo, setHdVideo] = useState(true);
  const [autoAdjustLight, setAutoAdjustLight] = useState(true);
  const [isTesting, setIsTesting] = useState(false);
  const [testResults, setTestResults] = useState<{
    connection: "good" | "medium" | "poor" | null;
    camera: boolean | null;
    mic: boolean | null;
    speaker: boolean | null;
  }>({ connection: null, camera: null, mic: null, speaker: null });

  const runDiagnostic = () => {
    setIsTesting(true);
    setTestResults({ connection: null, camera: null, mic: null, speaker: null });
    
    // Simulate diagnostic tests
    setTimeout(() => {
      setTestResults(prev => ({ ...prev, connection: "good" }));
    }, 500);
    setTimeout(() => {
      setTestResults(prev => ({ ...prev, camera: true }));
    }, 1000);
    setTimeout(() => {
      setTestResults(prev => ({ ...prev, mic: true }));
    }, 1500);
    setTimeout(() => {
      setTestResults(prev => ({ ...prev, speaker: true }));
      setIsTesting(false);
      toast.success("Diagnóstico completo!", { description: "Seu sistema está pronto para teleconsultas" });
    }, 2000);
  };

  const backgrounds = [
    { id: "none", label: "Nenhum", preview: "bg-muted" },
    { id: "blur", label: "Desfoque", preview: "bg-gradient-to-br from-primary/20 to-primary/5 backdrop-blur" },
    { id: "office", label: "Escritório", preview: "bg-gradient-to-br from-amber-100 to-amber-50" },
    { id: "nature", label: "Natureza", preview: "bg-gradient-to-br from-emerald-100 to-emerald-50" },
    { id: "medical", label: "Consultório", preview: "bg-gradient-to-br from-blue-100 to-blue-50" },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden bg-card/95 backdrop-blur-xl border-2 border-primary/20 rounded-2xl shadow-2xl p-0">
        {/* Header */}
        <div className="relative overflow-hidden border-b">
          <div className="absolute inset-0 bg-gradient-to-br from-info/10 via-transparent to-transparent" />
          <div className="absolute top-0 right-0 w-32 h-32 bg-info/10 rounded-full blur-3xl" />
          
          <DialogHeader className="relative p-6 pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-info to-info/70 shadow-lg shadow-info/25 animate-[scale-in_0.3s_ease-out]">
                  <Video className="h-6 w-6 text-white" />
                </div>
                <div>
                  <DialogTitle className="text-xl font-bold">Configurações de Teleconsulta</DialogTitle>
                  <p className="text-sm text-muted-foreground">Configure câmera, microfone e áudio</p>
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
            {/* Connection Test */}
            <div className="p-4 rounded-xl bg-muted/30 border space-y-4 animate-[fade-in_0.3s_ease-out]">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold flex items-center gap-2">
                  <Wifi className="h-4 w-4" />
                  Diagnóstico do Sistema
                </h4>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={runDiagnostic}
                  disabled={isTesting}
                  className="gap-2"
                >
                  <RefreshCw className={cn("h-4 w-4", isTesting && "animate-spin")} />
                  {isTesting ? "Testando..." : "Testar"}
                </Button>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: "Conexão", icon: Wifi, result: testResults.connection, isConnection: true },
                  { label: "Câmera", icon: Camera, result: testResults.camera },
                  { label: "Microfone", icon: Mic, result: testResults.mic },
                  { label: "Áudio", icon: Speaker, result: testResults.speaker },
                ].map((item, idx) => (
                  <div 
                    key={item.label}
                    className={cn(
                      "p-3 rounded-lg border text-center transition-all duration-300",
                      item.result === null && "bg-muted/50",
                      item.result === true && "bg-status-confirmed/10 border-status-confirmed/30",
                      item.result === "good" && "bg-status-confirmed/10 border-status-confirmed/30",
                      item.result === "medium" && "bg-warning/10 border-warning/30",
                      item.result === "poor" && "bg-destructive/10 border-destructive/30",
                      item.result === false && "bg-destructive/10 border-destructive/30"
                    )}
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    <div className="flex justify-center mb-2">
                      {item.result === null ? (
                        <item.icon className="h-5 w-5 text-muted-foreground" />
                      ) : item.result === true || item.result === "good" ? (
                        <CheckCircle2 className="h-5 w-5 text-status-confirmed" />
                      ) : item.result === "medium" ? (
                        <AlertCircle className="h-5 w-5 text-warning" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-destructive" />
                      )}
                    </div>
                    <p className="text-xs font-medium">{item.label}</p>
                    {item.isConnection && item.result && (
                      <Badge 
                        variant="outline" 
                        className={cn(
                          "text-xs mt-1",
                          item.result === "good" && "text-status-confirmed border-status-confirmed/30",
                          item.result === "medium" && "text-warning border-warning/30",
                          item.result === "poor" && "text-destructive border-destructive/30"
                        )}
                      >
                        {item.result === "good" ? "Excelente" : item.result === "medium" ? "Moderada" : "Fraca"}
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Video Preview */}
            <div className="space-y-4 animate-[fade-in_0.4s_ease-out]">
              <h4 className="font-semibold flex items-center gap-2">
                <Camera className="h-4 w-4" />
                Pré-visualização da Câmera
              </h4>
              <div className="relative aspect-video rounded-xl bg-muted/50 border-2 border-dashed border-muted-foreground/20 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  {cameraEnabled ? (
                    <div className="text-center">
                      <Camera className="h-12 w-12 text-muted-foreground/50 mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Câmera ativa</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Camera className="h-12 w-12 text-muted-foreground/30 mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Câmera desativada</p>
                    </div>
                  )}
                </div>
                
                {/* Controls Overlay */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 p-2 rounded-full bg-background/80 backdrop-blur-sm border">
                  <Button
                    variant={cameraEnabled ? "default" : "secondary"}
                    size="icon"
                    className="h-10 w-10 rounded-full"
                    onClick={() => setCameraEnabled(!cameraEnabled)}
                  >
                    <Camera className={cn("h-5 w-5", !cameraEnabled && "opacity-50")} />
                  </Button>
                  <Button
                    variant={micEnabled ? "default" : "secondary"}
                    size="icon"
                    className="h-10 w-10 rounded-full"
                    onClick={() => setMicEnabled(!micEnabled)}
                  >
                    <Mic className={cn("h-5 w-5", !micEnabled && "opacity-50")} />
                  </Button>
                </div>
              </div>
            </div>

            {/* Virtual Background */}
            <div className="space-y-4 animate-[fade-in_0.5s_ease-out]">
              <h4 className="font-semibold flex items-center gap-2">
                <Grid3X3 className="h-4 w-4" />
                Plano de Fundo Virtual
              </h4>
              <div className="grid grid-cols-5 gap-2">
                {backgrounds.map((bg) => (
                  <button
                    key={bg.id}
                    onClick={() => setVirtualBackground(bg.id)}
                    className={cn(
                      "aspect-video rounded-lg border-2 transition-all duration-200 overflow-hidden",
                      virtualBackground === bg.id 
                        ? "border-primary ring-2 ring-primary/20" 
                        : "border-transparent hover:border-primary/30"
                    )}
                  >
                    <div className={cn("w-full h-full", bg.preview)} />
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {backgrounds.map((bg) => (
                  <Badge
                    key={bg.id}
                    variant={virtualBackground === bg.id ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setVirtualBackground(bg.id)}
                  >
                    {bg.label}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Device Selection */}
            <div className="grid sm:grid-cols-3 gap-4 animate-[fade-in_0.6s_ease-out]">
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Camera className="h-4 w-4" />
                  Câmera
                </Label>
                <Select value={selectedCamera} onValueChange={setSelectedCamera}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Câmera padrão</SelectItem>
                    <SelectItem value="external">Câmera externa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Mic className="h-4 w-4" />
                  Microfone
                </Label>
                <Select value={selectedMic} onValueChange={setSelectedMic}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Microfone padrão</SelectItem>
                    <SelectItem value="headset">Headset</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Speaker className="h-4 w-4" />
                  Alto-falante
                </Label>
                <Select value={selectedSpeaker} onValueChange={setSelectedSpeaker}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Alto-falante padrão</SelectItem>
                    <SelectItem value="headset">Headset</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Volume Controls */}
            <div className="grid sm:grid-cols-2 gap-6 animate-[fade-in_0.7s_ease-out]">
              <div className="space-y-4">
                <Label className="flex items-center gap-2">
                  <Volume2 className="h-4 w-4" />
                  Volume do Alto-falante
                </Label>
                <div className="flex items-center gap-4">
                  <Slider
                    value={speakerVolume}
                    onValueChange={setSpeakerVolume}
                    max={100}
                    step={1}
                    className="flex-1"
                  />
                  <span className="text-sm font-medium w-12 text-right">{speakerVolume}%</span>
                </div>
              </div>
              <div className="space-y-4">
                <Label className="flex items-center gap-2">
                  <Mic className="h-4 w-4" />
                  Sensibilidade do Microfone
                </Label>
                <div className="flex items-center gap-4">
                  <Slider
                    value={micVolume}
                    onValueChange={setMicVolume}
                    max={100}
                    step={1}
                    className="flex-1"
                  />
                  <span className="text-sm font-medium w-12 text-right">{micVolume}%</span>
                </div>
              </div>
            </div>

            {/* Additional Settings */}
            <div className="space-y-3 animate-[fade-in_0.8s_ease-out]">
              <h4 className="font-semibold flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Configurações Avançadas
              </h4>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { label: "Cancelamento de ruído", icon: Headphones, value: noiseCancellation, onChange: setNoiseCancellation },
                  { label: "Vídeo em HD", icon: Monitor, value: hdVideo, onChange: setHdVideo },
                  { label: "Ajuste automático de luz", icon: Sun, value: autoAdjustLight, onChange: setAutoAdjustLight },
                ].map((setting) => (
                  <div 
                    key={setting.label}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border hover:border-primary/20 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <setting.icon className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{setting.label}</span>
                    </div>
                    <Switch 
                      checked={setting.value} 
                      onCheckedChange={setting.onChange} 
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button onClick={() => {
                toast.success("Configurações salvas!");
                onOpenChange(false);
              }}>
                Salvar Configurações
              </Button>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

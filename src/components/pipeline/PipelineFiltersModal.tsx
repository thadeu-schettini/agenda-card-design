import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { 
  Filter, 
  Calendar as CalendarIcon, 
  Star, 
  Target,
  Users,
  MessageSquare,
  Instagram,
  Globe,
  RotateCcw,
  Check
} from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";

interface PipelineFiltersModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const stages = [
  { id: "primeiro_contato", name: "Primeiro Contato", color: "bg-slate-500" },
  { id: "qualificacao", name: "Qualificação", color: "bg-blue-500" },
  { id: "agendamento", name: "Agendamento", color: "bg-amber-500" },
  { id: "consulta", name: "Consulta", color: "bg-emerald-500" },
  { id: "fechamento", name: "Fechamento", color: "bg-purple-500" },
  { id: "fidelizado", name: "Fidelizado", color: "bg-pink-500" },
];

const sources = [
  { id: "whatsapp", name: "WhatsApp", icon: MessageSquare },
  { id: "instagram", name: "Instagram", icon: Instagram },
  { id: "site", name: "Site", icon: Globe },
  { id: "indicacao", name: "Indicação", icon: Users },
];

export function PipelineFiltersModal({ open, onOpenChange }: PipelineFiltersModalProps) {
  const [scoreRange, setScoreRange] = useState([0, 100]);
  const [selectedStages, setSelectedStages] = useState<string[]>([]);
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({});
  const [showOnlyHighPriority, setShowOnlyHighPriority] = useState(false);
  const [showOnlyNoContact, setShowOnlyNoContact] = useState(false);

  const toggleStage = (stageId: string) => {
    setSelectedStages(prev =>
      prev.includes(stageId)
        ? prev.filter(s => s !== stageId)
        : [...prev, stageId]
    );
  };

  const toggleSource = (sourceId: string) => {
    setSelectedSources(prev =>
      prev.includes(sourceId)
        ? prev.filter(s => s !== sourceId)
        : [...prev, sourceId]
    );
  };

  const handleReset = () => {
    setScoreRange([0, 100]);
    setSelectedStages([]);
    setSelectedSources([]);
    setDateRange({});
    setShowOnlyHighPriority(false);
    setShowOnlyNoContact(false);
  };

  const activeFiltersCount = 
    (selectedStages.length > 0 ? 1 : 0) +
    (selectedSources.length > 0 ? 1 : 0) +
    (scoreRange[0] > 0 || scoreRange[1] < 100 ? 1 : 0) +
    (dateRange.from ? 1 : 0) +
    (showOnlyHighPriority ? 1 : 0) +
    (showOnlyNoContact ? 1 : 0);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader className="pb-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg">
                <Filter className="h-5 w-5 text-white" />
              </div>
              <div>
                <DialogTitle>Filtros do Pipeline</DialogTitle>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Refine sua visualização
                </p>
              </div>
            </div>
            {activeFiltersCount > 0 && (
              <Badge variant="secondary">
                {activeFiltersCount} filtro{activeFiltersCount !== 1 ? "s" : ""} ativo{activeFiltersCount !== 1 ? "s" : ""}
              </Badge>
            )}
          </div>
        </DialogHeader>

        <div className="grid gap-6 py-4 max-h-[60vh] overflow-y-auto pr-2">
          {/* Stages */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <Target className="h-4 w-4 text-muted-foreground" />
              Estágios
            </Label>
            <div className="flex flex-wrap gap-2">
              {stages.map((stage) => (
                <button
                  key={stage.id}
                  onClick={() => toggleStage(stage.id)}
                  className={cn(
                    "flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all text-sm",
                    selectedStages.includes(stage.id)
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border hover:border-primary/50"
                  )}
                >
                  <div className={cn("w-2 h-2 rounded-full", stage.color)} />
                  {stage.name}
                  {selectedStages.includes(stage.id) && (
                    <Check className="h-3 w-3" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Sources */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
              Origem
            </Label>
            <div className="grid grid-cols-4 gap-2">
              {sources.map((source) => (
                <button
                  key={source.id}
                  onClick={() => toggleSource(source.id)}
                  className={cn(
                    "flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all",
                    selectedSources.includes(source.id)
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  )}
                >
                  <source.icon className="h-5 w-5" />
                  <span className="text-xs font-medium">{source.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Score Range */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="flex items-center gap-2">
                <Star className="h-4 w-4 text-muted-foreground" />
                Score de Conversão
              </Label>
              <span className="text-sm font-medium">
                {scoreRange[0]} - {scoreRange[1]}
              </span>
            </div>
            <Slider
              value={scoreRange}
              onValueChange={setScoreRange}
              max={100}
              step={5}
              className="py-2"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0 (baixo)</span>
              <span>100 (alto)</span>
            </div>
          </div>

          {/* Date Range */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
              Período de Entrada
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateRange.from ? (
                    dateRange.to ? (
                      <>
                        {format(dateRange.from, "dd/MM/yy", { locale: ptBR })} -{" "}
                        {format(dateRange.to, "dd/MM/yy", { locale: ptBR })}
                      </>
                    ) : (
                      format(dateRange.from, "dd/MM/yyyy", { locale: ptBR })
                    )
                  ) : (
                    <span className="text-muted-foreground">Selecionar período</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="range"
                  selected={dateRange as any}
                  onSelect={setDateRange as any}
                  locale={ptBR}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Quick Filters */}
          <div className="space-y-3">
            <Label>Filtros Rápidos</Label>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div>
                  <p className="font-medium text-sm">Alta Prioridade</p>
                  <p className="text-xs text-muted-foreground">Score acima de 85</p>
                </div>
                <Switch
                  checked={showOnlyHighPriority}
                  onCheckedChange={setShowOnlyHighPriority}
                />
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div>
                  <p className="font-medium text-sm">Sem Contato Recente</p>
                  <p className="text-xs text-muted-foreground">Mais de 7 dias sem contato</p>
                </div>
                <Switch
                  checked={showOnlyNoContact}
                  onCheckedChange={setShowOnlyNoContact}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between pt-4 border-t">
          <Button variant="ghost" onClick={handleReset} className="gap-2">
            <RotateCcw className="h-4 w-4" />
            Limpar Filtros
          </Button>
          <Button onClick={() => onOpenChange(false)} className="gap-2">
            <Check className="h-4 w-4" />
            Aplicar Filtros
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

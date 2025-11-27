import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { GitCompare, TrendingUp, TrendingDown, Minus, Calendar, Activity } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

type VitalSign = {
  label: string;
  value: string;
  unit: string;
};

type Consultation = {
  id: string;
  date: Date;
  diagnosis: string;
  medications: string[];
  vitalSigns: VitalSign[];
  notes: string;
};

// Mock data for comparison
const mockConsultations: Consultation[] = [
  {
    id: "1",
    date: new Date(2024, 10, 15),
    diagnosis: "Hipertensão Arterial - Controlada",
    medications: ["Losartana 50mg - 1x/dia", "Hidroclorotiazida 25mg - 1x/dia"],
    vitalSigns: [
      { label: "PA", value: "140/90", unit: "mmHg" },
      { label: "FC", value: "78", unit: "bpm" },
      { label: "Temp", value: "36.5", unit: "°C" },
      { label: "SpO₂", value: "98", unit: "%" }
    ],
    notes: "Paciente refere adesão ao tratamento. Controle pressórico ainda não ideal."
  },
  {
    id: "2",
    date: new Date(2024, 11, 27),
    diagnosis: "Hipertensão Arterial - Melhor Controle",
    medications: ["Losartana 50mg - 1x/dia", "Hidroclorotiazida 25mg - 1x/dia", "Atenolol 25mg - 1x/dia"],
    vitalSigns: [
      { label: "PA", value: "130/85", unit: "mmHg" },
      { label: "FC", value: "72", unit: "bpm" },
      { label: "Temp", value: "36.7", unit: "°C" },
      { label: "SpO₂", value: "99", unit: "%" }
    ],
    notes: "Boa evolução. Pressão arterial em melhor controle após ajuste medicamentoso."
  }
];

const compareVitalSign = (current: string, previous: string): "up" | "down" | "stable" => {
  // For blood pressure
  if (current.includes("/") && previous.includes("/")) {
    const [currSys] = current.split("/").map(Number);
    const [prevSys] = previous.split("/").map(Number);
    if (currSys < prevSys) return "down";
    if (currSys > prevSys) return "up";
    return "stable";
  }
  
  // For numeric values
  const currNum = parseFloat(current);
  const prevNum = parseFloat(previous);
  if (currNum < prevNum) return "down";
  if (currNum > prevNum) return "up";
  return "stable";
};

const getTrendIcon = (trend: "up" | "down" | "stable") => {
  switch (trend) {
    case "up":
      return <TrendingUp className="h-4 w-4 text-red-500" />;
    case "down":
      return <TrendingDown className="h-4 w-4 text-green-500" />;
    default:
      return <Minus className="h-4 w-4 text-muted-foreground" />;
  }
};

export const ConsultationComparison = () => {
  const [previous, current] = mockConsultations;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <GitCompare className="h-4 w-4" />
          Comparar Consultas
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-6xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <GitCompare className="h-5 w-5 text-primary" />
            Comparação Entre Consultas
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-[75vh]">
          <div className="grid grid-cols-2 gap-4 pr-4">
            {/* Previous Consultation */}
            <Card className="border-2">
              <CardHeader className="bg-muted/50 pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Consulta Anterior</CardTitle>
                  <Badge variant="outline" className="gap-1">
                    <Calendar className="h-3 w-3" />
                    {format(previous.date, "dd/MM/yyyy", { locale: ptBR })}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-4 space-y-4">
                {/* Diagnosis */}
                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-1">Diagnóstico</p>
                  <p className="text-sm">{previous.diagnosis}</p>
                </div>

                {/* Vital Signs */}
                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-2">Sinais Vitais</p>
                  <div className="grid grid-cols-2 gap-2">
                    {previous.vitalSigns.map((vs, idx) => (
                      <div key={idx} className="bg-muted/30 rounded-lg p-2">
                        <p className="text-xs text-muted-foreground">{vs.label}</p>
                        <p className="text-sm font-semibold">
                          {vs.value} <span className="text-xs text-muted-foreground">{vs.unit}</span>
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Medications */}
                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-2">Medicações</p>
                  <div className="space-y-1">
                    {previous.medications.map((med, idx) => (
                      <div key={idx} className="text-sm bg-muted/30 rounded px-2 py-1">
                        {med}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-1">Observações</p>
                  <p className="text-sm text-muted-foreground">{previous.notes}</p>
                </div>
              </CardContent>
            </Card>

            {/* Current Consultation */}
            <Card className="border-2 border-primary/50">
              <CardHeader className="bg-primary/5 pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Activity className="h-4 w-4 text-primary" />
                    Consulta Atual
                  </CardTitle>
                  <Badge variant="default" className="gap-1">
                    <Calendar className="h-3 w-3" />
                    {format(current.date, "dd/MM/yyyy", { locale: ptBR })}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-4 space-y-4">
                {/* Diagnosis */}
                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-1">Diagnóstico</p>
                  <div className="flex items-start gap-2">
                    <p className="text-sm flex-1">{current.diagnosis}</p>
                    {current.diagnosis !== previous.diagnosis && (
                      <Badge variant="secondary" className="text-xs">Alterado</Badge>
                    )}
                  </div>
                </div>

                {/* Vital Signs with Comparison */}
                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-2">Sinais Vitais</p>
                  <div className="grid grid-cols-2 gap-2">
                    {current.vitalSigns.map((vs, idx) => {
                      const previousVs = previous.vitalSigns.find(p => p.label === vs.label);
                      const trend = previousVs ? compareVitalSign(vs.value, previousVs.value) : "stable";
                      
                      return (
                        <div key={idx} className="bg-primary/5 rounded-lg p-2 border border-primary/20">
                          <div className="flex items-center justify-between mb-1">
                            <p className="text-xs text-muted-foreground">{vs.label}</p>
                            {getTrendIcon(trend)}
                          </div>
                          <p className="text-sm font-semibold">
                            {vs.value} <span className="text-xs text-muted-foreground">{vs.unit}</span>
                          </p>
                          {previousVs && previousVs.value !== vs.value && (
                            <p className="text-xs text-muted-foreground mt-1">
                              Anterior: {previousVs.value}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Medications with Changes */}
                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-2">Medicações</p>
                  <div className="space-y-1">
                    {current.medications.map((med, idx) => {
                      const isNew = !previous.medications.includes(med);
                      return (
                        <div
                          key={idx}
                          className={`text-sm rounded px-2 py-1 flex items-center justify-between ${
                            isNew ? "bg-green-500/10 border border-green-500/20" : "bg-muted/30"
                          }`}
                        >
                          <span>{med}</span>
                          {isNew && (
                            <Badge variant="outline" className="text-xs bg-green-500/10 border-green-500">
                              Novo
                            </Badge>
                          )}
                        </div>
                      );
                    })}
                    {previous.medications
                      .filter(med => !current.medications.includes(med))
                      .map((med, idx) => (
                        <div
                          key={`removed-${idx}`}
                          className="text-sm bg-red-500/10 border border-red-500/20 rounded px-2 py-1 flex items-center justify-between line-through opacity-60"
                        >
                          <span>{med}</span>
                          <Badge variant="outline" className="text-xs bg-red-500/10 border-red-500">
                            Removido
                          </Badge>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-1">Observações</p>
                  <p className="text-sm text-muted-foreground">{current.notes}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Summary of Changes */}
          <Card className="mt-4 border-2 border-primary/30 bg-primary/5">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Resumo das Alterações</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2" />
                  <p>
                    <span className="font-semibold">Evolução do diagnóstico:</span> Paciente apresentou melhora no controle pressórico
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-500 mt-2" />
                  <p>
                    <span className="font-semibold">Medicação adicionada:</span> Atenolol 25mg para melhor controle
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-2" />
                  <p>
                    <span className="font-semibold">Sinais vitais:</span> Redução da PA de 140/90 para 130/85 mmHg
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

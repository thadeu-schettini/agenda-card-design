import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Shield, TrendingUp, Sparkles } from "lucide-react";
import { MedicalAlerts } from "./MedicalAlerts";
import { VitalSignsChart } from "./VitalSignsChart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export const SafetyAnalysisDialog = () => {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateAlerts = async () => {
    setIsGenerating(true);
    
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsGenerating(false);
    toast({
      title: "Análise Completa",
      description: "Alertas de segurança foram atualizados com base no histórico do paciente.",
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Shield className="h-4 w-4" />
          Análise de Segurança
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-6xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Análise de Segurança e Evolução do Paciente
          </DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="alerts" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="alerts" className="gap-2">
              <Shield className="h-4 w-4" />
              Alertas de Segurança
            </TabsTrigger>
            <TabsTrigger value="vitals" className="gap-2">
              <TrendingUp className="h-4 w-4" />
              Evolução dos Sinais Vitais
            </TabsTrigger>
          </TabsList>
          
          <ScrollArea className="h-[60vh] mt-4">
            <TabsContent value="alerts" className="space-y-4 mt-0">
              <div className="flex justify-end mb-4">
                <Button 
                  onClick={handleGenerateAlerts}
                  disabled={isGenerating}
                  className="gap-2"
                >
                  <Sparkles className="h-4 w-4" />
                  {isGenerating ? "Gerando..." : "Gerar Alertas com IA"}
                </Button>
              </div>
              <MedicalAlerts />
            </TabsContent>
            
            <TabsContent value="vitals" className="mt-0">
              <VitalSignsChart />
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

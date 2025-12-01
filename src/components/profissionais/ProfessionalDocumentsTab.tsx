import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Upload, CheckCircle2, Clock } from "lucide-react";

interface Professional {
  name: string;
}

interface ProfessionalDocumentsTabProps {
  professional: Professional;
}

export const ProfessionalDocumentsTab = ({ professional }: ProfessionalDocumentsTabProps) => {
  const documents = [
    { name: "Diploma de Medicina", status: "aprovado", date: "12/01/2024" },
    { name: "Certificado de Especialização", status: "aprovado", date: "15/01/2024" },
    { name: "RG e CPF", status: "aprovado", date: "10/01/2024" },
    { name: "Comprovante de Residência", status: "pendente", date: "20/03/2024" },
  ];

  const statusConfig = {
    aprovado: {
      icon: CheckCircle2,
      color: "bg-green-500/10 text-green-600 border-green-500/20",
      label: "Aprovado"
    },
    pendente: {
      icon: Clock,
      color: "bg-orange-500/10 text-orange-600 border-orange-500/20",
      label: "Pendente"
    }
  };

  return (
    <div className="space-y-4">
      <Card className="p-4 border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold flex items-center gap-2">
            <FileText className="h-4 w-4 text-primary" />
            Documentos
          </h3>
          <Button size="sm" variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Upload
          </Button>
        </div>

        <div className="space-y-2">
          {documents.map((doc, index) => {
            const StatusIcon = statusConfig[doc.status as keyof typeof statusConfig].icon;
            return (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors group">
                <div className="flex items-center gap-3 flex-1">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <FileText className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{doc.name}</p>
                    <p className="text-xs text-muted-foreground">{doc.date}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Badge 
                    variant="outline" 
                    className={`${statusConfig[doc.status as keyof typeof statusConfig].color} border text-xs`}
                  >
                    <StatusIcon className="h-3 w-3 mr-1" />
                    {statusConfig[doc.status as keyof typeof statusConfig].label}
                  </Badge>
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      <Card className="p-4 border-border/50 bg-card/50 backdrop-blur-sm">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <FileText className="h-4 w-4 text-primary" />
          Assinatura Digital
        </h3>
        <div className="p-4 rounded-lg border-2 border-dashed border-border flex flex-col items-center justify-center min-h-[120px] bg-muted/20">
          <div className="p-3 rounded-lg bg-primary/10 mb-2">
            <FileText className="h-6 w-6 text-primary" />
          </div>
          <p className="text-sm font-medium mb-1">Assinatura Digital Configurada</p>
          <p className="text-xs text-muted-foreground mb-3">Última atualização: 15/01/2024</p>
          <Button size="sm" variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Atualizar Assinatura
          </Button>
        </div>
      </Card>

      <Card className="p-4 border-border/50 bg-card/50 backdrop-blur-sm">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <FileText className="h-4 w-4 text-primary" />
          Carimbo Profissional
        </h3>
        <div className="p-4 rounded-lg border-2 border-dashed border-border flex flex-col items-center justify-center min-h-[120px] bg-muted/20">
          <div className="p-3 rounded-lg bg-primary/10 mb-2">
            <FileText className="h-6 w-6 text-primary" />
          </div>
          <p className="text-sm font-medium mb-1">Carimbo Configurado</p>
          <p className="text-xs text-muted-foreground mb-3">Última atualização: 15/01/2024</p>
          <Button size="sm" variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Atualizar Carimbo
          </Button>
        </div>
      </Card>
    </div>
  );
};
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  FileText, 
  Clock, 
  ThumbsUp, 
  ThumbsDown,
  Share2,
  Printer,
  BookOpen,
  ChevronRight,
  CheckCircle2
} from "lucide-react";
import { toast } from "sonner";

interface ArticleModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  article: {
    id: string;
    title: string;
    category: string;
    readTime: string;
  } | null;
}

// Mock article content
const articleContent = {
  steps: [
    {
      title: "Acesse o módulo de Agenda",
      content: "No menu lateral, clique em 'Agenda' para abrir o calendário de agendamentos."
    },
    {
      title: "Selecione a data desejada",
      content: "Navegue pelo calendário e clique na data em que deseja agendar a consulta."
    },
    {
      title: "Clique em 'Nova Consulta'",
      content: "No canto superior direito, clique no botão 'Nova Consulta' ou clique diretamente no horário disponível."
    },
    {
      title: "Preencha os dados do paciente",
      content: "Busque o paciente pelo nome ou CPF. Se for um novo paciente, clique em 'Cadastrar Novo'."
    },
    {
      title: "Selecione o profissional e serviço",
      content: "Escolha o profissional que realizará o atendimento e o tipo de serviço a ser prestado."
    },
    {
      title: "Confirme o agendamento",
      content: "Revise as informações e clique em 'Confirmar'. O sistema enviará uma notificação automática ao paciente."
    }
  ],
  tips: [
    "Use a busca rápida (Ctrl + K) para acessar o agendamento de qualquer lugar",
    "Configure lembretes automáticos para reduzir faltas",
    "Consultas recorrentes podem ser agendadas de uma só vez"
  ],
  relatedArticles: [
    { title: "Cancelar ou reagendar consulta", category: "Agendamentos" },
    { title: "Configurar horários de atendimento", category: "Configurações" },
    { title: "Enviar lembrete manual", category: "Notificações" }
  ]
};

export function ArticleModal({ open, onOpenChange, article }: ArticleModalProps) {
  if (!article) return null;

  const handleFeedback = (positive: boolean) => {
    toast.success(positive ? "Obrigado pelo feedback positivo!" : "Agradecemos o feedback, vamos melhorar!");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-hidden p-0">
        {/* Header */}
        <div className="p-6 bg-gradient-to-br from-primary/5 to-primary/10 border-b">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-primary/80 shadow-lg">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline">{article.category}</Badge>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {article.readTime} de leitura
                </span>
              </div>
              <h2 className="text-xl font-bold">{article.title}</h2>
            </div>
            <div className="flex gap-1">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Share2 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Printer className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <ScrollArea className="max-h-[55vh]">
          <div className="p-6 space-y-6">
            {/* Introduction */}
            <p className="text-muted-foreground">
              Agendar uma consulta no sistema é simples e rápido. Siga o passo a passo abaixo para realizar seu primeiro agendamento.
            </p>

            {/* Steps */}
            <div className="space-y-4">
              <h3 className="font-semibold flex items-center gap-2">
                <FileText className="h-4 w-4 text-primary" />
                Passo a Passo
              </h3>
              <div className="space-y-4">
                {articleContent.steps.map((step, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
                      {index + 1}
                    </div>
                    <div className="flex-1 pt-1">
                      <h4 className="font-medium mb-1">{step.title}</h4>
                      <p className="text-sm text-muted-foreground">{step.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Tips */}
            <div className="space-y-3">
              <h3 className="font-semibold flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                Dicas Úteis
              </h3>
              <ul className="space-y-2">
                {articleContent.tips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2" />
                    <span className="text-muted-foreground">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Separator />

            {/* Related Articles */}
            <div className="space-y-3">
              <h3 className="font-semibold">Artigos Relacionados</h3>
              <div className="space-y-2">
                {articleContent.relatedArticles.map((related, index) => (
                  <button
                    key={index}
                    className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors group text-left"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="h-4 w-4 text-primary" />
                      <div>
                        <p className="text-sm font-medium group-hover:text-primary transition-colors">
                          {related.title}
                        </p>
                        <p className="text-xs text-muted-foreground">{related.category}</p>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>

        {/* Footer */}
        <div className="p-4 border-t bg-muted/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Este artigo foi útil?</span>
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-1.5"
                onClick={() => handleFeedback(true)}
              >
                <ThumbsUp className="h-3.5 w-3.5" />
                Sim
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-1.5"
                onClick={() => handleFeedback(false)}
              >
                <ThumbsDown className="h-3.5 w-3.5" />
                Não
              </Button>
            </div>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Fechar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

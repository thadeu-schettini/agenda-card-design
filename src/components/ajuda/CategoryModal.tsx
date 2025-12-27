import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  FileText, 
  Clock, 
  ChevronRight,
  BookOpen,
  Video,
  ArrowLeft
} from "lucide-react";
import { LucideIcon } from "lucide-react";

interface CategoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category: {
    id: string;
    title: string;
    description: string;
    icon: LucideIcon;
    color: string;
    articles: number;
  } | null;
}

const categoryArticles = {
  "getting-started": [
    { id: "1", title: "Como começar a usar o sistema", type: "article", readTime: "5 min" },
    { id: "2", title: "Configuração inicial da clínica", type: "video", readTime: "8 min" },
    { id: "3", title: "Adicionando sua equipe", type: "article", readTime: "4 min" },
    { id: "4", title: "Personalizando seu perfil", type: "article", readTime: "3 min" },
    { id: "5", title: "Tour completo pelo sistema", type: "video", readTime: "15 min" },
    { id: "6", title: "Importando dados existentes", type: "article", readTime: "6 min" },
  ],
  "appointments": [
    { id: "1", title: "Como agendar uma consulta", type: "article", readTime: "3 min" },
    { id: "2", title: "Gerenciando horários de atendimento", type: "article", readTime: "5 min" },
    { id: "3", title: "Configurando lembretes automáticos", type: "article", readTime: "4 min" },
    { id: "4", title: "Reagendando e cancelando consultas", type: "video", readTime: "6 min" },
    { id: "5", title: "Bloqueando horários na agenda", type: "article", readTime: "3 min" },
    { id: "6", title: "Visualizando a agenda por profissional", type: "article", readTime: "2 min" },
  ],
  "patients": [
    { id: "1", title: "Cadastrar novo paciente", type: "article", readTime: "2 min" },
    { id: "2", title: "Gerenciando prontuários", type: "video", readTime: "10 min" },
    { id: "3", title: "Histórico de atendimentos", type: "article", readTime: "4 min" },
    { id: "4", title: "Exportando dados de pacientes", type: "article", readTime: "3 min" },
    { id: "5", title: "Enviando documentos ao paciente", type: "article", readTime: "3 min" },
  ],
  "billing": [
    { id: "1", title: "Emitir nota fiscal", type: "article", readTime: "4 min" },
    { id: "2", title: "Configurando formas de pagamento", type: "article", readTime: "5 min" },
    { id: "3", title: "Relatórios financeiros", type: "video", readTime: "8 min" },
    { id: "4", title: "Gerenciando cobranças pendentes", type: "article", readTime: "4 min" },
  ],
  "security": [
    { id: "1", title: "Alterando sua senha", type: "article", readTime: "2 min" },
    { id: "2", title: "Autenticação em dois fatores", type: "article", readTime: "5 min" },
    { id: "3", title: "Gerenciando permissões de usuários", type: "video", readTime: "7 min" },
    { id: "4", title: "Política de privacidade e LGPD", type: "article", readTime: "6 min" },
  ],
  "integrations": [
    { id: "1", title: "Sincronizar com Google Calendar", type: "article", readTime: "3 min" },
    { id: "2", title: "Integração com WhatsApp Business", type: "video", readTime: "10 min" },
    { id: "3", title: "Conectando com laboratórios", type: "article", readTime: "5 min" },
    { id: "4", title: "API para desenvolvedores", type: "article", readTime: "8 min" },
  ],
};

export function CategoryModal({ open, onOpenChange, category }: CategoryModalProps) {
  if (!category) return null;

  const articles = categoryArticles[category.id as keyof typeof categoryArticles] || [];
  const Icon = category.icon;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-hidden p-0">
        {/* Header */}
        <div className={`p-6 bg-gradient-to-br ${category.color} text-white`}>
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-white/20 backdrop-blur-sm">
              <Icon className="h-8 w-8" />
            </div>
            <div className="flex-1">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-white">
                  {category.title}
                </DialogTitle>
              </DialogHeader>
              <p className="text-white/80 mt-1">{category.description}</p>
              <Badge className="mt-3 bg-white/20 text-white border-0 backdrop-blur-sm">
                {category.articles} artigos disponíveis
              </Badge>
            </div>
          </div>
        </div>

        <ScrollArea className="max-h-[50vh]">
          <div className="p-6 space-y-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <BookOpen className="h-4 w-4" />
              <span>Artigos e tutoriais nesta categoria</span>
            </div>

            <div className="space-y-2">
              {articles.map((article) => (
                <div
                  key={article.id}
                  className="flex items-center gap-4 p-4 rounded-xl border border-border/50 bg-card/50 hover:bg-muted/50 hover:border-primary/30 transition-all cursor-pointer group"
                >
                  <div className={`p-2 rounded-lg ${article.type === 'video' ? 'bg-purple-500/10' : 'bg-primary/10'}`}>
                    {article.type === 'video' ? (
                      <Video className={`h-5 w-5 ${article.type === 'video' ? 'text-purple-500' : 'text-primary'}`} />
                    ) : (
                      <FileText className="h-5 w-5 text-primary" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium group-hover:text-primary transition-colors">
                      {article.title}
                    </h4>
                    <div className="flex items-center gap-3 mt-1">
                      <Badge variant="secondary" className="text-xs">
                        {article.type === 'video' ? 'Vídeo' : 'Artigo'}
                      </Badge>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {article.readTime}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              ))}
            </div>
          </div>
        </ScrollArea>

        {/* Footer */}
        <div className="p-4 border-t bg-muted/30 flex justify-between">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Button>
          <Button variant="link" className="gap-2 text-primary">
            Ver todos os artigos
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

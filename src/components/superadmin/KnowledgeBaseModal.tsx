import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookOpen, Plus, Search, Eye, Edit, Trash2, FileText, HelpCircle, Video, FolderOpen, TrendingUp } from "lucide-react";

interface KnowledgeBaseModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const mockArticles = [
  { id: "1", title: "Como configurar o WhatsApp Business", category: "Integrações", views: 1234, helpful: 89, status: "published", type: "article" },
  { id: "2", title: "Primeiros passos com agendamento", category: "Onboarding", views: 2341, helpful: 95, status: "published", type: "article" },
  { id: "3", title: "Configurando pagamentos online", category: "Financeiro", views: 876, helpful: 72, status: "draft", type: "article" },
  { id: "4", title: "Tutorial: Receita Digital", category: "Prontuário", views: 1567, helpful: 91, status: "published", type: "video" },
];

const mockFaqs = [
  { id: "1", question: "Como alterar minha senha?", answer: "Acesse Configurações > Segurança > Alterar Senha", category: "Conta", views: 543 },
  { id: "2", question: "Posso ter múltiplos usuários?", answer: "Sim, dependendo do seu plano você pode adicionar usuários ilimitados", category: "Planos", views: 432 },
  { id: "3", question: "Como exportar relatórios?", answer: "Vá em Relatórios, selecione o período e clique em Exportar", category: "Relatórios", views: 321 },
];

const categories = ["Onboarding", "Integrações", "Financeiro", "Prontuário", "Relatórios", "Conta", "Planos"];

export function KnowledgeBaseModal({ open, onOpenChange }: KnowledgeBaseModalProps) {
  const [search, setSearch] = useState("");
  const [editingArticle, setEditingArticle] = useState<any>(null);
  const [editingFaq, setEditingFaq] = useState<any>(null);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            Gestão de Base de Conhecimento
          </DialogTitle>
        </DialogHeader>

        <div className="flex items-center gap-4 mb-4">
          <Card className="px-4 py-2">
            <div className="text-2xl font-bold text-primary">24</div>
            <div className="text-xs text-muted-foreground">Artigos</div>
          </Card>
          <Card className="px-4 py-2">
            <div className="text-2xl font-bold text-success">18</div>
            <div className="text-xs text-muted-foreground">FAQs</div>
          </Card>
          <Card className="px-4 py-2">
            <div className="text-2xl font-bold text-info">8.5K</div>
            <div className="text-xs text-muted-foreground">Visualizações/mês</div>
          </Card>
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar artigos e FAQs..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" /> Novo Conteúdo
          </Button>
        </div>

        <Tabs defaultValue="articles" className="flex-1 flex flex-col overflow-hidden">
          <TabsList>
            <TabsTrigger value="articles" className="gap-2">
              <FileText className="h-4 w-4" /> Artigos
            </TabsTrigger>
            <TabsTrigger value="faqs" className="gap-2">
              <HelpCircle className="h-4 w-4" /> FAQs
            </TabsTrigger>
            <TabsTrigger value="categories" className="gap-2">
              <FolderOpen className="h-4 w-4" /> Categorias
            </TabsTrigger>
            <TabsTrigger value="analytics" className="gap-2">
              <TrendingUp className="h-4 w-4" /> Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="articles" className="flex-1 overflow-hidden mt-4">
            <ScrollArea className="h-[400px]">
              <div className="space-y-3 pr-4">
                {mockArticles.map((article) => (
                  <Card key={article.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          {article.type === "video" ? (
                            <Video className="h-5 w-5 text-primary" />
                          ) : (
                            <FileText className="h-5 w-5 text-primary" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{article.title}</span>
                            <Badge variant={article.status === "published" ? "default" : "secondary"}>
                              {article.status === "published" ? "Publicado" : "Rascunho"}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                            <span>{article.category}</span>
                            <span className="flex items-center gap-1">
                              <Eye className="h-3 w-3" /> {article.views}
                            </span>
                            <span>{article.helpful}% acharam útil</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon" onClick={() => setEditingArticle(article)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="faqs" className="flex-1 overflow-hidden mt-4">
            <ScrollArea className="h-[400px]">
              <div className="space-y-3 pr-4">
                {mockFaqs.map((faq) => (
                  <Card key={faq.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="h-8 w-8 rounded-full bg-info/10 flex items-center justify-center flex-shrink-0">
                          <HelpCircle className="h-4 w-4 text-info" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">{faq.question}</div>
                          <div className="text-sm text-muted-foreground mt-1">{faq.answer}</div>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
                            <Badge variant="outline">{faq.category}</Badge>
                            <span className="flex items-center gap-1">
                              <Eye className="h-3 w-3" /> {faq.views} visualizações
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon" onClick={() => setEditingFaq(faq)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="categories" className="mt-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categories.map((category) => (
                <Card key={category} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4 text-center">
                    <FolderOpen className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <div className="font-medium">{category}</div>
                    <div className="text-sm text-muted-foreground">
                      {Math.floor(Math.random() * 10) + 2} artigos
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Card className="hover:shadow-md transition-shadow cursor-pointer border-dashed">
                <CardContent className="p-4 text-center flex flex-col items-center justify-center h-full">
                  <Plus className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <div className="text-muted-foreground">Nova Categoria</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="mt-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Artigos Mais Visualizados</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockArticles.slice(0, 3).map((article, index) => (
                      <div key={article.id} className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                          {index + 1}
                        </div>
                        <div className="flex-1 truncate">{article.title}</div>
                        <Badge variant="secondary">{article.views}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Métricas de Satisfação</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Artigos úteis</span>
                        <span className="font-medium">87%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-success rounded-full" style={{ width: "87%" }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>FAQs resolutivas</span>
                        <span className="font-medium">92%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-success rounded-full" style={{ width: "92%" }} />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

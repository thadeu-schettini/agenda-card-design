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
import { Mail, Plus, Send, Clock, Users, Eye, MousePointer, TrendingUp, Edit, Trash2, Play, Pause } from "lucide-react";
import { ChartContainer } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

interface EmailMarketingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const mockCampaigns = [
  { id: "1", name: "Lançamento v2.5", status: "sent", recipients: 2847, openRate: 42, clickRate: 18, sentAt: "10/01/2024 10:00" },
  { id: "2", name: "Newsletter Janeiro", status: "scheduled", recipients: 3200, openRate: null, clickRate: null, sentAt: "15/01/2024 09:00" },
  { id: "3", name: "Promoção Black Friday", status: "draft", recipients: 0, openRate: null, clickRate: null, sentAt: null },
];

const performanceData = [
  { month: "Set", opens: 38, clicks: 12 },
  { month: "Out", opens: 42, clicks: 15 },
  { month: "Nov", opens: 45, clicks: 18 },
  { month: "Dez", opens: 40, clicks: 14 },
  { month: "Jan", opens: 44, clicks: 17 },
];

const chartConfig = {
  opens: { label: "Abertura %", color: "hsl(var(--primary))" },
  clicks: { label: "Cliques %", color: "hsl(var(--success))" },
};

export function EmailMarketingModal({ open, onOpenChange }: EmailMarketingModalProps) {
  const [showNewCampaign, setShowNewCampaign] = useState(false);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "sent": return <Badge className="bg-success/20 text-success">Enviada</Badge>;
      case "scheduled": return <Badge className="bg-info/20 text-info">Agendada</Badge>;
      default: return <Badge variant="secondary">Rascunho</Badge>;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-primary" />
            Campanhas de Email Marketing
          </DialogTitle>
        </DialogHeader>

        <div className="flex items-center gap-4 mb-4">
          <Card className="px-4 py-2 bg-gradient-to-br from-primary/10 to-transparent">
            <div className="text-2xl font-bold text-primary">12</div>
            <div className="text-xs text-muted-foreground">Campanhas Enviadas</div>
          </Card>
          <Card className="px-4 py-2 bg-gradient-to-br from-success/10 to-transparent">
            <div className="text-2xl font-bold text-success">42%</div>
            <div className="text-xs text-muted-foreground">Taxa de Abertura</div>
          </Card>
          <Card className="px-4 py-2 bg-gradient-to-br from-info/10 to-transparent">
            <div className="text-2xl font-bold text-info">16%</div>
            <div className="text-xs text-muted-foreground">Taxa de Cliques</div>
          </Card>
          <Card className="px-4 py-2 bg-gradient-to-br from-warning/10 to-transparent">
            <div className="text-2xl font-bold text-warning">3.2K</div>
            <div className="text-xs text-muted-foreground">Inscritos</div>
          </Card>
          <div className="flex-1" />
          <Button onClick={() => setShowNewCampaign(true)}>
            <Plus className="h-4 w-4 mr-2" /> Nova Campanha
          </Button>
        </div>

        <Tabs defaultValue="campaigns" className="flex-1 flex flex-col overflow-hidden">
          <TabsList>
            <TabsTrigger value="campaigns">Campanhas</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
          </TabsList>

          <TabsContent value="campaigns" className="flex-1 overflow-hidden mt-4">
            {showNewCampaign && (
              <Card className="mb-4 border-primary">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Nova Campanha</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Nome da Campanha</label>
                      <Input placeholder="Ex: Newsletter Fevereiro" className="mt-1" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Segmento</label>
                      <Select>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Todos os usuários</SelectItem>
                          <SelectItem value="active">Usuários ativos</SelectItem>
                          <SelectItem value="inactive">Usuários inativos</SelectItem>
                          <SelectItem value="trial">Em trial</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="text-sm font-medium">Assunto</label>
                    <Input placeholder="Assunto do email" className="mt-1" />
                  </div>
                  <div className="mt-4">
                    <label className="text-sm font-medium">Conteúdo</label>
                    <Textarea placeholder="Corpo do email..." className="mt-1" rows={6} />
                  </div>
                  <div className="flex justify-end gap-2 mt-4">
                    <Button variant="outline" onClick={() => setShowNewCampaign(false)}>Cancelar</Button>
                    <Button variant="outline">Salvar Rascunho</Button>
                    <Button>
                      <Send className="h-4 w-4 mr-2" /> Enviar Agora
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <ScrollArea className="h-[350px]">
              <div className="space-y-3 pr-4">
                {mockCampaigns.map((campaign) => (
                  <Card key={campaign.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Mail className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{campaign.name}</span>
                            {getStatusBadge(campaign.status)}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                            {campaign.sentAt && (
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {campaign.status === "scheduled" ? "Agendada para " : ""}{campaign.sentAt}
                              </span>
                            )}
                            {campaign.recipients > 0 && (
                              <span className="flex items-center gap-1">
                                <Users className="h-3 w-3" /> {campaign.recipients} destinatários
                              </span>
                            )}
                          </div>
                        </div>
                        {campaign.status === "sent" && (
                          <div className="flex items-center gap-4">
                            <div className="text-center">
                              <div className="flex items-center gap-1 text-sm">
                                <Eye className="h-3 w-3 text-primary" />
                                {campaign.openRate}%
                              </div>
                              <div className="text-xs text-muted-foreground">Abertura</div>
                            </div>
                            <div className="text-center">
                              <div className="flex items-center gap-1 text-sm">
                                <MousePointer className="h-3 w-3 text-success" />
                                {campaign.clickRate}%
                              </div>
                              <div className="text-xs text-muted-foreground">Cliques</div>
                            </div>
                          </div>
                        )}
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon">
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

          <TabsContent value="analytics" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Performance nos Últimos 5 Meses</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[280px] w-full">
                  <BarChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="month" className="text-xs" />
                    <YAxis className="text-xs" />
                    <Bar dataKey="opens" fill="hsl(var(--primary))" radius={4} />
                    <Bar dataKey="clicks" fill="hsl(var(--success))" radius={4} />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="templates" className="mt-4">
            <div className="grid md:grid-cols-3 gap-4">
              {["Newsletter", "Promoção", "Onboarding", "Reativação", "Atualização", "Novo Template"].map((template, i) => (
                <Card key={template} className={i === 5 ? "border-dashed" : ""}>
                  <CardContent className="p-4 text-center">
                    {i === 5 ? (
                      <>
                        <Plus className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                        <div className="text-muted-foreground">Criar Template</div>
                      </>
                    ) : (
                      <>
                        <Mail className="h-8 w-8 mx-auto mb-2 text-primary" />
                        <div className="font-medium">{template}</div>
                        <div className="text-sm text-muted-foreground mt-1">Usado {Math.floor(Math.random() * 10) + 1}x</div>
                      </>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

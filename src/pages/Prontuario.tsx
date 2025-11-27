import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, Heart, Activity, FileText, Pill, Stethoscope, Phone, Mail, MapPin, Edit, Save, X, Plus } from "lucide-react";
import { useState } from "react";

const Prontuario = () => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-6">
      <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">
        {/* Header Section - Patient Overview */}
        <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-br from-primary/10 via-background to-secondary/10 backdrop-blur-sm">
          <div className="absolute inset-0 bg-grid-white/5 [mask-image:radial-gradient(white,transparent_85%)]" />
          <CardContent className="relative p-8">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-6">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-full opacity-75 group-hover:opacity-100 blur transition duration-300 animate-pulse" />
                  <Avatar className="relative h-24 w-24 ring-4 ring-background">
                    <AvatarImage src="" alt="Paciente" />
                    <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-primary to-secondary text-primary-foreground">
                      PE
                    </AvatarFallback>
                  </Avatar>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                      Paciente 13 Ebert-Lynch
                    </h1>
                    <Badge className="bg-green-500/20 text-green-700 dark:text-green-300 border-green-500/30 hover:bg-green-500/30">
                      Confirmada
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2 hover:text-foreground transition-colors cursor-pointer">
                      <Phone className="h-4 w-4" />
                      <span>551191014814</span>
                    </div>
                    <div className="flex items-center gap-2 hover:text-foreground transition-colors cursor-pointer">
                      <Mail className="h-4 w-4" />
                      <span>paciente@email.com</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>São Paulo, SP</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="bg-background/50">
                      28 anos
                    </Badge>
                    <Badge variant="outline" className="bg-background/50">
                      Tipo Sanguíneo: O+
                    </Badge>
                    <Badge variant="outline" className="bg-background/50">
                      Peso: 75kg
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {isEditing ? (
                  <>
                    <Button size="sm" variant="ghost" onClick={() => setIsEditing(false)}>
                      <X className="h-4 w-4" />
                    </Button>
                    <Button size="sm" onClick={() => setIsEditing(false)}>
                      <Save className="h-4 w-4" />
                      Salvar
                    </Button>
                  </>
                ) : (
                  <Button size="sm" variant="outline" onClick={() => setIsEditing(true)}>
                    <Edit className="h-4 w-4" />
                    Editar
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats - Vital Signs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { icon: Heart, label: "Frequência Cardíaca", value: "72 bpm", color: "from-red-500 to-pink-500", status: "normal" },
            { icon: Activity, label: "Pressão Arterial", value: "120/80", color: "from-blue-500 to-cyan-500", status: "normal" },
            { icon: Stethoscope, label: "Temperatura", value: "36.5°C", color: "from-orange-500 to-amber-500", status: "normal" },
            { icon: Heart, label: "Saturação O2", value: "98%", color: "from-green-500 to-emerald-500", status: "normal" },
          ].map((stat, index) => (
            <Card 
              key={index}
              className="group relative overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5 group-hover:opacity-10 transition-opacity`} />
              <CardContent className="relative p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} bg-opacity-10`}>
                    <stat.icon className={`h-5 w-5 bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`} />
                  </div>
                  <Badge variant="outline" className="text-xs bg-background/50">
                    {stat.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content - Tabs */}
        <Tabs defaultValue="consulta" className="space-y-6">
          <TabsList className="bg-muted/50 backdrop-blur-sm p-1 h-auto">
            <TabsTrigger value="consulta" className="gap-2">
              <Calendar className="h-4 w-4" />
              Consulta Atual
            </TabsTrigger>
            <TabsTrigger value="historico" className="gap-2">
              <FileText className="h-4 w-4" />
              Histórico Médico
            </TabsTrigger>
            <TabsTrigger value="prescricoes" className="gap-2">
              <Pill className="h-4 w-4" />
              Prescrições
            </TabsTrigger>
            <TabsTrigger value="exames" className="gap-2">
              <Activity className="h-4 w-4" />
              Exames
            </TabsTrigger>
          </TabsList>

          {/* Consulta Atual Tab */}
          <TabsContent value="consulta" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Appointment Info */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="border-0 shadow-md">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-primary" />
                      Informações da Consulta
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">Data do agendamento</p>
                        <div className="flex items-center gap-2 text-lg font-semibold">
                          <Calendar className="h-4 w-4 text-primary" />
                          26 de novembro, 2025
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">Horário</p>
                        <div className="flex items-center gap-2 text-lg font-semibold">
                          <Clock className="h-4 w-4 text-primary" />
                          06:45 - 07:15
                        </div>
                      </div>
                    </div>

                    <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">Serviço</p>
                        <p className="text-lg font-semibold">Consulta Cardiologia</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">Tipo de atendimento</p>
                        <p className="text-lg font-semibold">Consulta Padrão</p>
                      </div>
                    </div>

                    <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">Valor do serviço</p>
                        <p className="text-2xl font-bold text-green-600 dark:text-green-400">R$ 200,00</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">Status do pagamento</p>
                        <Button variant="link" className="p-0 h-auto font-semibold text-primary">
                          Ver pagamento
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Anamnese Section */}
                <Card className="border-0 shadow-md">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary" />
                      Anamnese
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">Queixa Principal</label>
                      <textarea 
                        className="w-full min-h-[100px] p-4 rounded-lg border bg-background/50 focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                        placeholder={isEditing ? "Descreva a queixa principal do paciente..." : ""}
                        readOnly={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">História da Doença Atual</label>
                      <textarea 
                        className="w-full min-h-[120px] p-4 rounded-lg border bg-background/50 focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                        placeholder={isEditing ? "Descreva a história da doença atual..." : ""}
                        readOnly={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">Exame Físico</label>
                      <textarea 
                        className="w-full min-h-[100px] p-4 rounded-lg border bg-background/50 focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                        placeholder={isEditing ? "Registre os achados do exame físico..." : ""}
                        readOnly={!isEditing}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Actions & Notes */}
              <div className="space-y-6">
                <Card className="border-0 shadow-md bg-gradient-to-br from-primary/5 to-secondary/5">
                  <CardHeader>
                    <CardTitle className="text-lg">Ações Rápidas</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full justify-start gap-2 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg shadow-primary/25">
                      <Plus className="h-4 w-4" />
                      Nova Prescrição
                    </Button>
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <Plus className="h-4 w-4" />
                      Solicitar Exame
                    </Button>
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <Plus className="h-4 w-4" />
                      Adicionar Atestado
                    </Button>
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <Plus className="h-4 w-4" />
                      Gerar Relatório
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-md">
                  <CardHeader>
                    <CardTitle className="text-lg">Observações</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <textarea 
                      className="w-full min-h-[200px] p-4 rounded-lg border bg-background/50 focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                      placeholder={isEditing ? "Adicione observações importantes sobre a consulta..." : "Agendamento gerado automaticamente (29)"}
                      readOnly={!isEditing}
                      defaultValue="Agendamento gerado automaticamente (29)"
                    />
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Histórico Médico Tab */}
          <TabsContent value="historico" className="space-y-4">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Consultas Anteriores</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((_, index) => (
                    <div 
                      key={index}
                      className="p-4 rounded-lg border hover:bg-accent/50 transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-semibold group-hover:text-primary transition-colors">
                          Consulta Cardiologia
                        </p>
                        <Badge variant="outline">15/10/2025</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Paciente apresentou melhora significativa dos sintomas...
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Prescrições Tab */}
          <TabsContent value="prescricoes" className="space-y-4">
            <Card className="border-0 shadow-md">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Prescrições Ativas</CardTitle>
                <Button size="sm">
                  <Plus className="h-4 w-4" />
                  Nova Prescrição
                </Button>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                  <Pill className="h-12 w-12 mx-auto mb-4 opacity-20" />
                  <p>Nenhuma prescrição ativa no momento</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Exames Tab */}
          <TabsContent value="exames" className="space-y-4">
            <Card className="border-0 shadow-md">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Exames Solicitados</CardTitle>
                <Button size="sm">
                  <Plus className="h-4 w-4" />
                  Solicitar Exame
                </Button>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                  <Activity className="h-12 w-12 mx-auto mb-4 opacity-20" />
                  <p>Nenhum exame solicitado</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Prontuario;

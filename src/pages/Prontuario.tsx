import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, Heart, Activity, FileText, Pill, Stethoscope, Phone, Mail, MapPin, Edit, Save, X, Plus, AlertCircle, TrendingUp, Droplets, Wind, User, Zap, CheckCircle2, Download, Share2, Eye } from "lucide-react";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";

const Prontuario = () => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background p-6 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      
      <div className="max-w-[1800px] mx-auto space-y-6 relative z-10 animate-fade-in">
        {/* Header Section - Patient Overview */}
        <div className="relative">
          <Card className="overflow-hidden border-0 shadow-2xl bg-gradient-to-br from-card/95 via-card to-card/95 backdrop-blur-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />
            
            <CardContent className="relative p-10">
              <div className="flex items-start justify-between mb-8">
                <div className="flex items-start gap-8">
                  <div className="relative group">
                    <div className="absolute -inset-2 bg-gradient-to-r from-primary via-secondary to-primary rounded-full opacity-50 group-hover:opacity-75 blur-xl transition-all duration-500 animate-pulse" />
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-full opacity-75 blur-md" />
                    <Avatar className="relative h-32 w-32 ring-4 ring-background shadow-2xl transition-transform duration-300 group-hover:scale-105">
                      <AvatarImage src="" alt="Paciente" />
                      <AvatarFallback className="text-4xl font-bold bg-gradient-to-br from-primary to-secondary text-primary-foreground">
                        PE
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-2 -right-2 h-10 w-10 bg-green-500 rounded-full border-4 border-background flex items-center justify-center shadow-lg">
                      <CheckCircle2 className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  
                  <div className="space-y-4 pt-2">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <h1 className="text-5xl font-bold bg-gradient-to-r from-foreground via-foreground to-foreground/60 bg-clip-text text-transparent tracking-tight">
                          Paciente 13 Ebert-Lynch
                        </h1>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 shadow-lg shadow-green-500/25 px-4 py-1.5 text-sm">
                          <CheckCircle2 className="h-3.5 w-3.5 mr-1.5" />
                          Confirmada
                        </Badge>
                        <Badge variant="outline" className="bg-background/80 backdrop-blur-sm px-4 py-1.5">
                          <User className="h-3.5 w-3.5 mr-1.5" />
                          ID: PE-2025-001
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-6">
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-background/60 backdrop-blur-sm hover:bg-background/80 transition-all duration-200 group cursor-pointer border border-border/50">
                        <div className="p-2.5 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                          <Phone className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-0.5">Telefone</p>
                          <p className="text-sm font-semibold">551191014814</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-background/60 backdrop-blur-sm hover:bg-background/80 transition-all duration-200 group cursor-pointer border border-border/50">
                        <div className="p-2.5 rounded-lg bg-secondary/10 group-hover:bg-secondary/20 transition-colors">
                          <Mail className="h-4 w-4 text-secondary" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-0.5">E-mail</p>
                          <p className="text-sm font-semibold">paciente@email.com</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-background/60 backdrop-blur-sm hover:bg-background/80 transition-all duration-200 group cursor-pointer border border-border/50">
                        <div className="p-2.5 rounded-lg bg-accent/50 group-hover:bg-accent/70 transition-colors">
                          <MapPin className="h-4 w-4 text-accent-foreground" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-0.5">Localização</p>
                          <p className="text-sm font-semibold">São Paulo, SP</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                      <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">28 anos</span>
                      </div>
                      <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-red-500/10 to-red-500/5 border border-red-500/20">
                        <Droplets className="h-4 w-4 text-red-500" />
                        <span className="text-sm font-medium">Tipo O+</span>
                      </div>
                      <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-blue-500/5 border border-blue-500/20">
                        <TrendingUp className="h-4 w-4 text-blue-500" />
                        <span className="text-sm font-medium">75kg • 1.75m</span>
                      </div>
                      <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-purple-500/5 border border-purple-500/20">
                        <Activity className="h-4 w-4 text-purple-500" />
                        <span className="text-sm font-medium">IMC: 24.5</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Button variant="outline" size="sm" className="gap-2 hover-scale">
                    <Download className="h-4 w-4" />
                    Exportar
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2 hover-scale">
                    <Share2 className="h-4 w-4" />
                    Compartilhar
                  </Button>
                  {isEditing ? (
                    <>
                      <Button size="sm" variant="ghost" onClick={() => setIsEditing(false)} className="hover-scale">
                        <X className="h-4 w-4" />
                      </Button>
                      <Button size="sm" onClick={() => setIsEditing(false)} className="gap-2 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg shadow-primary/25 hover-scale">
                        <Save className="h-4 w-4" />
                        Salvar
                      </Button>
                    </>
                  ) : (
                    <Button size="sm" variant="outline" onClick={() => setIsEditing(true)} className="gap-2 hover-scale">
                      <Edit className="h-4 w-4" />
                      Editar
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats - Vital Signs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Heart, label: "Frequência Cardíaca", value: "72", unit: "bpm", color: "from-red-500 via-rose-500 to-pink-500", bgColor: "from-red-500/10 to-pink-500/5", status: "Normal", trend: "+2", iconBg: "bg-red-500/10" },
            { icon: Activity, label: "Pressão Arterial", value: "120/80", unit: "mmHg", color: "from-blue-500 via-cyan-500 to-teal-500", bgColor: "from-blue-500/10 to-teal-500/5", status: "Ótimo", trend: "-5", iconBg: "bg-blue-500/10" },
            { icon: Stethoscope, label: "Temperatura", value: "36.5", unit: "°C", color: "from-orange-500 via-amber-500 to-yellow-500", bgColor: "from-orange-500/10 to-yellow-500/5", status: "Normal", trend: "0", iconBg: "bg-orange-500/10" },
            { icon: Wind, label: "Saturação O₂", value: "98", unit: "%", color: "from-green-500 via-emerald-500 to-teal-500", bgColor: "from-green-500/10 to-teal-500/5", status: "Excelente", trend: "+1", iconBg: "bg-green-500/10" },
          ].map((stat, index) => (
            <Card 
              key={index}
              className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer bg-gradient-to-br from-card/50 to-card backdrop-blur-sm"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgColor} opacity-50 group-hover:opacity-100 transition-all duration-500`} />
              <div className={`absolute -right-8 -bottom-8 w-32 h-32 bg-gradient-to-br ${stat.color} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity duration-500`} />
              
              <CardContent className="relative p-6">
                <div className="flex items-start justify-between mb-6">
                  <div className={`relative p-3.5 rounded-2xl ${stat.iconBg} backdrop-blur-sm ring-1 ring-white/10 group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className={`h-6 w-6 text-transparent bg-gradient-to-br ${stat.color} bg-clip-text`} style={{ WebkitTextFillColor: 'transparent', backgroundClip: 'text' }} strokeWidth={2.5} />
                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-20 rounded-2xl blur-xl transition-opacity duration-300`} />
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <Badge variant="outline" className="text-xs font-semibold bg-background/80 backdrop-blur-sm border-border/50 px-2.5 py-0.5">
                      {stat.status}
                    </Badge>
                    <div className={`text-xs font-bold ${stat.trend.startsWith('+') ? 'text-green-500' : stat.trend.startsWith('-') ? 'text-red-500' : 'text-muted-foreground'}`}>
                      {stat.trend !== "0" && (
                        <span className="flex items-center gap-0.5">
                          <TrendingUp className="h-3 w-3" />
                          {stat.trend}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-1.5">
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                  <div className="flex items-baseline gap-2">
                    <p className={`text-4xl font-bold bg-gradient-to-br ${stat.color} bg-clip-text text-transparent tracking-tight`}>
                      {stat.value}
                    </p>
                    <span className="text-lg text-muted-foreground font-medium">{stat.unit}</span>
                  </div>
                </div>

                {/* Progress indicator */}
                <div className="mt-4 h-1.5 bg-background/50 rounded-full overflow-hidden">
                  <div className={`h-full bg-gradient-to-r ${stat.color} rounded-full transition-all duration-1000 group-hover:w-full`} style={{ width: '70%' }} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content - Tabs */}
        <Tabs defaultValue="consulta" className="space-y-8">
          <div className="flex items-center justify-between">
            <TabsList className="bg-gradient-to-r from-muted/80 to-muted/60 backdrop-blur-xl p-1.5 h-auto shadow-lg border border-border/50">
              <TabsTrigger value="consulta" className="gap-2 data-[state=active]:bg-background data-[state=active]:shadow-lg px-6 py-3">
                <Calendar className="h-4 w-4" />
                <span className="font-semibold">Consulta Atual</span>
              </TabsTrigger>
              <TabsTrigger value="historico" className="gap-2 data-[state=active]:bg-background data-[state=active]:shadow-lg px-6 py-3">
                <FileText className="h-4 w-4" />
                <span className="font-semibold">Histórico Médico</span>
              </TabsTrigger>
              <TabsTrigger value="prescricoes" className="gap-2 data-[state=active]:bg-background data-[state=active]:shadow-lg px-6 py-3">
                <Pill className="h-4 w-4" />
                <span className="font-semibold">Prescrições</span>
              </TabsTrigger>
              <TabsTrigger value="exames" className="gap-2 data-[state=active]:bg-background data-[state=active]:shadow-lg px-6 py-3">
                <Activity className="h-4 w-4" />
                <span className="font-semibold">Exames</span>
              </TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Eye className="h-4 w-4" />
                Visualizar Completo
              </Button>
            </div>
          </div>

          {/* Consulta Atual Tab */}
          <TabsContent value="consulta" className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Left Column - Appointment Info */}
              <div className="xl:col-span-2 space-y-6">
                <Card className="border-0 shadow-xl bg-gradient-to-br from-card to-card/95 backdrop-blur-sm overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-3xl" />
                  <CardHeader className="relative">
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-3 text-2xl">
                        <div className="p-2.5 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5">
                          <Calendar className="h-5 w-5 text-primary" />
                        </div>
                        Informações da Consulta
                      </CardTitle>
                      <Badge variant="outline" className="bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20">
                        Agendamento #A-2025-0143
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="relative space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="p-5 rounded-2xl bg-gradient-to-br from-background/80 to-background/50 backdrop-blur-sm border border-border/50 hover:shadow-lg transition-all duration-300 group">
                        <div className="flex items-start justify-between mb-3">
                          <p className="text-sm font-medium text-muted-foreground">Data do agendamento</p>
                          <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                            <Calendar className="h-4 w-4 text-primary" />
                          </div>
                        </div>
                        <p className="text-2xl font-bold">26/11/2025</p>
                        <p className="text-sm text-muted-foreground mt-1">Terça-feira</p>
                      </div>
                      
                      <div className="p-5 rounded-2xl bg-gradient-to-br from-background/80 to-background/50 backdrop-blur-sm border border-border/50 hover:shadow-lg transition-all duration-300 group">
                        <div className="flex items-start justify-between mb-3">
                          <p className="text-sm font-medium text-muted-foreground">Horário</p>
                          <div className="p-2 rounded-lg bg-secondary/10 group-hover:bg-secondary/20 transition-colors">
                            <Clock className="h-4 w-4 text-secondary" />
                          </div>
                        </div>
                        <p className="text-2xl font-bold">06:45 - 07:15</p>
                        <p className="text-sm text-muted-foreground mt-1">30 minutos</p>
                      </div>
                    </div>

                    <Separator className="bg-gradient-to-r from-transparent via-border to-transparent" />

                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Stethoscope className="h-4 w-4 text-primary" />
                          <p className="text-sm font-medium text-muted-foreground">Serviço</p>
                        </div>
                        <p className="text-xl font-bold">Consulta Cardiologia</p>
                        <Badge variant="outline" className="bg-primary/5">Especialidade</Badge>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-secondary" />
                          <p className="text-sm font-medium text-muted-foreground">Tipo de atendimento</p>
                        </div>
                        <p className="text-xl font-bold">Consulta Padrão</p>
                        <Badge variant="outline" className="bg-secondary/5">Presencial</Badge>
                      </div>
                    </div>

                    <Separator className="bg-gradient-to-r from-transparent via-border to-transparent" />

                    <div className="p-6 rounded-2xl bg-gradient-to-br from-green-500/10 via-green-500/5 to-transparent border border-green-500/20">
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <p className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                            <Zap className="h-4 w-4" />
                            Valor do serviço
                          </p>
                          <p className="text-4xl font-bold text-green-600 dark:text-green-400">R$ 200,00</p>
                        </div>
                        <div className="flex flex-col justify-between">
                          <div className="space-y-2">
                            <p className="text-sm font-medium text-muted-foreground">Status do pagamento</p>
                            <Badge className="bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-500/30">
                              Pendente
                            </Badge>
                          </div>
                          <Button variant="outline" className="w-full mt-3 border-green-500/30 hover:bg-green-500/10 hover:border-green-500/50 gap-2">
                            <CheckCircle2 className="h-4 w-4" />
                            Ver pagamento
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Anamnese Section */}
                <Card className="border-0 shadow-xl bg-gradient-to-br from-card to-card/95 backdrop-blur-sm overflow-hidden">
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-secondary/5 to-transparent rounded-full blur-3xl" />
                  <CardHeader className="relative">
                    <CardTitle className="flex items-center gap-3 text-2xl">
                      <div className="p-2.5 rounded-xl bg-gradient-to-br from-secondary/10 to-secondary/5">
                        <FileText className="h-5 w-5 text-secondary" />
                      </div>
                      Anamnese e Exame Físico
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="relative space-y-6">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                          <AlertCircle className="h-4 w-4 text-red-500" />
                          Queixa Principal
                        </label>
                        {isEditing && (
                          <Badge variant="outline" className="text-xs">Obrigatório</Badge>
                        )}
                      </div>
                      <textarea 
                        className="w-full min-h-[120px] p-5 rounded-xl border-2 bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none transition-all duration-200 hover:border-primary/50"
                        placeholder={isEditing ? "Descreva a queixa principal que motivou a consulta..." : "Nenhuma queixa registrada"}
                        readOnly={!isEditing}
                      />
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                          <FileText className="h-4 w-4 text-primary" />
                          História da Doença Atual (HDA)
                        </label>
                      </div>
                      <textarea 
                        className="w-full min-h-[140px] p-5 rounded-xl border-2 bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none transition-all duration-200 hover:border-primary/50"
                        placeholder={isEditing ? "Descreva o histórico completo da doença atual, evolução dos sintomas, fatores de melhora e piora..." : "Nenhum histórico registrado"}
                        readOnly={!isEditing}
                      />
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                          <Stethoscope className="h-4 w-4 text-secondary" />
                          Exame Físico
                        </label>
                      </div>
                      <textarea 
                        className="w-full min-h-[120px] p-5 rounded-xl border-2 bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none transition-all duration-200 hover:border-primary/50"
                        placeholder={isEditing ? "Registre os achados do exame físico, inspeção, palpação, ausculta..." : "Nenhum exame físico registrado"}
                        readOnly={!isEditing}
                      />
                    </div>

                    {isEditing && (
                      <div className="flex items-center gap-3 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                        <AlertCircle className="h-5 w-5 text-blue-500 flex-shrink-0" />
                        <p className="text-sm text-muted-foreground">
                          Preencha os campos da anamnese com o máximo de detalhes possível para um atendimento completo.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Actions & Notes */}
              <div className="space-y-6">
                <Card className="border-0 shadow-xl bg-gradient-to-br from-primary/10 via-card to-secondary/10 backdrop-blur-sm sticky top-6 overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-2xl" />
                  <CardHeader className="relative">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Zap className="h-5 w-5 text-primary" />
                      Ações Rápidas
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="relative space-y-3">
                    <Button className="w-full justify-start gap-3 h-12 bg-gradient-to-r from-primary via-primary to-primary/90 hover:from-primary/90 hover:via-primary/80 hover:to-primary/70 shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300 group">
                      <div className="p-1.5 rounded-lg bg-white/20 group-hover:bg-white/30 transition-colors">
                        <Plus className="h-4 w-4" />
                      </div>
                      <span className="font-semibold">Nova Prescrição</span>
                    </Button>
                    <Button variant="outline" className="w-full justify-start gap-3 h-12 hover:bg-accent/50 hover:border-primary/30 group transition-all duration-200">
                      <div className="p-1.5 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <Activity className="h-4 w-4 text-primary" />
                      </div>
                      <span className="font-semibold">Solicitar Exame</span>
                    </Button>
                    <Button variant="outline" className="w-full justify-start gap-3 h-12 hover:bg-accent/50 hover:border-secondary/30 group transition-all duration-200">
                      <div className="p-1.5 rounded-lg bg-secondary/10 group-hover:bg-secondary/20 transition-colors">
                        <FileText className="h-4 w-4 text-secondary" />
                      </div>
                      <span className="font-semibold">Adicionar Atestado</span>
                    </Button>
                    <Button variant="outline" className="w-full justify-start gap-3 h-12 hover:bg-accent/50 hover:border-accent/50 group transition-all duration-200">
                      <div className="p-1.5 rounded-lg bg-accent/30 group-hover:bg-accent/50 transition-colors">
                        <Download className="h-4 w-4 text-accent-foreground" />
                      </div>
                      <span className="font-semibold">Gerar Relatório</span>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-xl bg-gradient-to-br from-card to-card/95 backdrop-blur-sm overflow-hidden">
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-secondary/20 to-transparent rounded-full blur-2xl" />
                  <CardHeader className="relative">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <FileText className="h-5 w-5 text-secondary" />
                      Observações
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="relative">
                    <textarea 
                      className="w-full min-h-[240px] p-5 rounded-xl border-2 bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent resize-none transition-all duration-200 hover:border-secondary/50"
                      placeholder={isEditing ? "Adicione observações importantes sobre a consulta, alertas, lembretes..." : "Agendamento gerado automaticamente (29)"}
                      readOnly={!isEditing}
                      defaultValue="Agendamento gerado automaticamente (29)"
                    />
                  </CardContent>
                </Card>

                {/* Alert Card */}
                <Card className="border-0 shadow-lg bg-gradient-to-br from-amber-500/10 to-orange-500/5 border-l-4 border-l-amber-500">
                  <CardContent className="p-5">
                    <div className="flex gap-3">
                      <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <p className="text-sm font-semibold text-amber-700 dark:text-amber-400">
                          Alergias Registradas
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Paciente possui alergia a Dipirona. Verificar antes de prescrever.
                        </p>
                      </div>
                    </div>
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

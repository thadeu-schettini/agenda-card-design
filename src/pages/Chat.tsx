import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { PageHeader } from "@/components/ui/page-header";
import { PageContainer, PageContent } from "@/components/ui/page-container";
import { cn } from "@/lib/utils";
import {
  MessageSquare,
  Search,
  Send,
  Phone,
  Mail,
  MoreVertical,
  Paperclip,
  Image,
  Smile,
  Bot,
  User,
  Clock,
  CheckCheck,
  Check,
  Star,
  Archive,
  Trash2,
  Tag,
  Filter,
  Settings,
  Sparkles,
  Brain,
  Zap,
  AlertCircle,
  ChevronDown,
  Instagram,
  Facebook,
  Globe,
  ArrowRight,
  RefreshCw,
  Mic,
  Video,
  Calendar,
  FileText,
  Copy,
  RotateCcw,
  UserPlus,
  Ban,
  Forward,
  Reply,
  ChevronRight,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Mock conversations
const conversations = [
  {
    id: 1,
    patient: { name: "Maria Silva", avatar: "", phone: "(11) 99999-1234" },
    channel: "whatsapp",
    lastMessage: "Olá, gostaria de agendar uma consulta",
    timestamp: "10:32",
    unread: 2,
    status: "pending",
    aiActive: true,
    priority: "high"
  },
  {
    id: 2,
    patient: { name: "João Pedro", avatar: "", phone: "(11) 98888-4321" },
    channel: "instagram",
    lastMessage: "Vocês atendem convênio Unimed?",
    timestamp: "09:45",
    unread: 1,
    status: "ai_responding",
    aiActive: true,
    priority: "medium"
  },
  {
    id: 3,
    patient: { name: "Ana Costa", avatar: "", phone: "(11) 97777-5678" },
    channel: "email",
    lastMessage: "Re: Confirmação de consulta",
    timestamp: "Ontem",
    unread: 0,
    status: "resolved",
    aiActive: false,
    priority: "low"
  },
  {
    id: 4,
    patient: { name: "Carlos Lima", avatar: "", phone: "(11) 96666-8765" },
    channel: "whatsapp",
    lastMessage: "Obrigado pela informação!",
    timestamp: "Ontem",
    unread: 0,
    status: "resolved",
    aiActive: true,
    priority: "low"
  },
  {
    id: 5,
    patient: { name: "Fernanda Rocha", avatar: "", phone: "(11) 95555-2345" },
    channel: "facebook",
    lastMessage: "Qual o horário de funcionamento?",
    timestamp: "12/12",
    unread: 1,
    status: "pending",
    aiActive: true,
    priority: "medium"
  },
];

// Mock messages for selected conversation
const messages = [
  {
    id: 1,
    sender: "patient",
    content: "Olá, boa tarde!",
    timestamp: "10:28",
    status: "read"
  },
  {
    id: 2,
    sender: "ai",
    content: "Olá! 👋 Bem-vindo(a) à Clínica MedClinic! Sou a assistente virtual e estou aqui para ajudar. Como posso auxiliá-lo(a) hoje?",
    timestamp: "10:28",
    status: "read",
    isAI: true
  },
  {
    id: 3,
    sender: "patient",
    content: "Gostaria de agendar uma consulta com cardiologista",
    timestamp: "10:30",
    status: "read"
  },
  {
    id: 4,
    sender: "ai",
    content: "Perfeito! 🩺 Temos excelentes cardiologistas disponíveis. Para agendar sua consulta, preciso de algumas informações:\n\n1. Qual sua preferência de dia e horário?\n2. É a primeira consulta ou retorno?\n3. Possui convênio médico?\n\nPosso verificar a agenda assim que me informar!",
    timestamp: "10:30",
    status: "read",
    isAI: true
  },
  {
    id: 5,
    sender: "patient",
    content: "Prefiro na próxima segunda-feira pela manhã. É primeira consulta e tenho Unimed",
    timestamp: "10:32",
    status: "read"
  },
];

// AI suggested responses
const suggestedResponses = [
  "Ótimo! Tenho disponibilidade na segunda às 9h ou 10h30. Qual horário prefere?",
  "Vou verificar a agenda e já retorno com as opções disponíveis.",
  "Para primeira consulta com Unimed, por favor tenha em mãos sua carteirinha e documento com foto.",
];

// Quick actions
const quickActions = [
  { icon: Calendar, label: "Agendar", color: "text-blue-500" },
  { icon: FileText, label: "Enviar Docs", color: "text-emerald-500" },
  { icon: UserPlus, label: "Criar Paciente", color: "text-purple-500" },
  { icon: Forward, label: "Transferir", color: "text-amber-500" },
];

// Channel icons
const channelIcons = {
  whatsapp: MessageSquare,
  instagram: Instagram,
  facebook: Facebook,
  email: Mail,
  site: Globe,
};

const channelColors = {
  whatsapp: "text-emerald-500 bg-emerald-500/10",
  instagram: "text-pink-500 bg-pink-500/10",
  facebook: "text-blue-500 bg-blue-500/10",
  email: "text-amber-500 bg-amber-500/10",
  site: "text-purple-500 bg-purple-500/10",
};

export default function Chat() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [messageInput, setMessageInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [autopilotEnabled, setAutopilotEnabled] = useState(true);
  const [showAISuggestions, setShowAISuggestions] = useState(true);

  const getChannelIcon = (channel: string) => {
    const Icon = channelIcons[channel as keyof typeof channelIcons] || MessageSquare;
    return Icon;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="text-amber-600 border-amber-500/30 bg-amber-500/10 text-xs">Pendente</Badge>;
      case "ai_responding":
        return <Badge variant="outline" className="text-purple-600 border-purple-500/30 bg-purple-500/10 gap-1 text-xs"><Bot className="h-3 w-3" />IA</Badge>;
      case "resolved":
        return <Badge variant="outline" className="text-emerald-600 border-emerald-500/30 bg-emerald-500/10 text-xs">Resolvido</Badge>;
      default:
        return null;
    }
  };

  return (
    <PageContainer>
      <PageHeader
        icon={MessageSquare}
        iconGradient="from-emerald-500 to-teal-600"
        title="Central de Mensagens"
        description="Gerencie todas as conversas de WhatsApp, e-mail e redes sociais"
        actions={
          <>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20">
              <Brain className="h-4 w-4 text-purple-500" />
              <span className="text-sm font-medium">Autopilot</span>
              <Switch checked={autopilotEnabled} onCheckedChange={setAutopilotEnabled} />
            </div>
            <Button variant="outline" className="gap-2">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Configurar</span>
            </Button>
          </>
        }
      />

      <PageContent>
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <Card className="group relative overflow-hidden border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 opacity-50" />
            <CardContent className="p-4 relative">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-primary to-primary/80 shadow-lg group-hover:scale-110 transition-transform">
                  <MessageSquare className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Total Hoje</p>
                  <p className="text-2xl font-bold">48</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="group relative overflow-hidden border-amber-500/20 hover:border-amber-500/40 transition-all duration-300 hover:shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-amber-500/10 opacity-50" />
            <CardContent className="p-4 relative">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 shadow-lg group-hover:scale-110 transition-transform">
                  <Clock className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Pendentes</p>
                  <p className="text-2xl font-bold text-amber-600">5</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="group relative overflow-hidden border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-purple-500/10 opacity-50" />
            <CardContent className="p-4 relative">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg group-hover:scale-110 transition-transform">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Resolvidas IA</p>
                  <p className="text-2xl font-bold text-purple-600">32</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="group relative overflow-hidden border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300 hover:shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-emerald-500/10 opacity-50" />
            <CardContent className="p-4 relative">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg group-hover:scale-110 transition-transform">
                  <CheckCheck className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Taxa Resposta</p>
                  <p className="text-2xl font-bold text-emerald-600">98%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="group relative overflow-hidden border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-blue-500/10 opacity-50" />
            <CardContent className="p-4 relative">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg group-hover:scale-110 transition-transform">
                  <Zap className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Tempo Médio</p>
                  <p className="text-2xl font-bold text-blue-600">2.5min</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Chat Interface */}
        <Card className="flex flex-col lg:flex-row h-[calc(100vh-380px)] min-h-[500px] overflow-hidden border-border/50">
          {/* Conversations List */}
          <div className="w-full lg:w-96 border-b lg:border-b-0 lg:border-r flex flex-col bg-muted/20">
            {/* Search & Filters */}
            <div className="p-4 border-b space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar conversas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 bg-background"
                />
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="flex-1 gap-1.5 text-xs h-9">
                  <Filter className="h-3.5 w-3.5" />
                  Filtros
                </Button>
                <Tabs defaultValue="all" className="flex-1">
                  <TabsList className="h-9 w-full bg-muted/50">
                    <TabsTrigger value="all" className="text-xs flex-1 h-7">Todos</TabsTrigger>
                    <TabsTrigger value="unread" className="text-xs flex-1 h-7">Não lidos</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>

            {/* Channel Filter */}
            <div className="px-4 py-3 border-b flex items-center gap-2 overflow-x-auto bg-background/50">
              <Badge variant="secondary" className="cursor-pointer hover:bg-primary/10 shrink-0 px-3">Todos</Badge>
              {Object.entries(channelColors).slice(0, 4).map(([channel, color]) => {
                const Icon = channelIcons[channel as keyof typeof channelIcons];
                return (
                  <Badge 
                    key={channel}
                    variant="outline" 
                    className={cn("cursor-pointer shrink-0 gap-1.5 px-3 hover:border-primary/30", color.split(' ')[0])}
                  >
                    <Icon className="h-3 w-3" />
                    {channel.charAt(0).toUpperCase() + channel.slice(1)}
                  </Badge>
                );
              })}
            </div>

            {/* Conversations */}
            <ScrollArea className="flex-1">
              <div className="p-2 space-y-1">
                {conversations.map((conv) => {
                  const ChannelIcon = getChannelIcon(conv.channel);
                  const isSelected = selectedConversation?.id === conv.id;
                  
                  return (
                    <div
                      key={conv.id}
                      onClick={() => setSelectedConversation(conv)}
                      className={cn(
                        "p-4 rounded-xl cursor-pointer transition-all duration-200",
                        isSelected 
                          ? "bg-primary/10 border-2 border-primary/30 shadow-sm" 
                          : "hover:bg-muted/50 border-2 border-transparent"
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <div className="relative">
                          <Avatar className="h-12 w-12 ring-2 ring-background shadow-sm">
                            <AvatarImage src={conv.patient.avatar} />
                            <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-primary font-medium">
                              {conv.patient.name.split(" ").map(n => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className={cn(
                            "absolute -bottom-1 -right-1 p-1.5 rounded-full border-2 border-background",
                            channelColors[conv.channel as keyof typeof channelColors]
                          )}>
                            <ChannelIcon className="h-3 w-3" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-semibold text-sm truncate">{conv.patient.name}</h4>
                            <span className="text-xs text-muted-foreground">{conv.timestamp}</span>
                          </div>
                          <p className="text-xs text-muted-foreground truncate mb-2">{conv.lastMessage}</p>
                          <div className="flex items-center gap-2">
                            {conv.unread > 0 && (
                              <Badge className="h-5 min-w-5 px-1.5 bg-primary text-primary-foreground text-xs">
                                {conv.unread}
                              </Badge>
                            )}
                            {conv.aiActive && (
                              <Badge variant="outline" className="text-purple-600 border-purple-500/30 bg-purple-500/10 gap-1 text-xs py-0">
                                <Sparkles className="h-2.5 w-2.5" />
                                IA
                              </Badge>
                            )}
                            {conv.priority === "high" && (
                              <Badge variant="outline" className="text-red-600 border-red-500/30 bg-red-500/10 text-xs py-0">
                                Urgente
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col min-w-0">
            {selectedConversation ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b flex items-center justify-between bg-background/50 backdrop-blur-sm">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-11 w-11 ring-2 ring-background shadow-sm">
                      <AvatarImage src={selectedConversation.patient.avatar} />
                      <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-primary font-medium">
                        {selectedConversation.patient.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{selectedConversation.patient.name}</h3>
                        {getStatusBadge(selectedConversation.status)}
                      </div>
                      <p className="text-xs text-muted-foreground">{selectedConversation.patient.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-9 w-9">
                            <Phone className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Ligar</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-9 w-9">
                            <Video className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Videochamada</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-9 w-9">
                            <Star className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Favoritar</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-9 w-9">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem className="gap-2">
                          <User className="h-4 w-4" />
                          Ver perfil
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                          <Tag className="h-4 w-4" />
                          Adicionar tag
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                          <Forward className="h-4 w-4" />
                          Transferir atendimento
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                          <Archive className="h-4 w-4" />
                          Arquivar
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="gap-2 text-destructive">
                          <Ban className="h-4 w-4" />
                          Bloquear
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                {/* Quick Actions Bar */}
                <div className="px-4 py-3 border-b flex items-center justify-between bg-muted/30">
                  <div className="flex items-center gap-2">
                    {quickActions.map((action) => (
                      <TooltipProvider key={action.label}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="outline" size="sm" className={cn("gap-1.5 h-8", action.color)}>
                              <action.icon className="h-3.5 w-3.5" />
                              <span className="hidden sm:inline text-xs">{action.label}</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>{action.label}</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ))}
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20">
                      <Brain className="h-3.5 w-3.5 text-purple-500" />
                      <span className="text-xs font-medium text-purple-600">IA Ativa</span>
                      <Switch 
                        checked={selectedConversation.aiActive} 
                        className="scale-75 data-[state=checked]:bg-purple-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4 max-w-3xl mx-auto">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={cn(
                          "flex gap-3 group",
                          msg.sender === "patient" ? "justify-start" : "justify-end"
                        )}
                      >
                        {msg.sender === "patient" && (
                          <Avatar className="h-8 w-8 mt-1">
                            <AvatarFallback className="bg-muted text-xs">MS</AvatarFallback>
                          </Avatar>
                        )}
                        <div className={cn(
                          "max-w-[70%] relative",
                          msg.sender === "patient" ? "order-2" : "order-1"
                        )}>
                          <div className={cn(
                            "p-4 rounded-2xl shadow-sm",
                            msg.sender === "patient" 
                              ? "bg-muted/80 rounded-tl-sm" 
                              : msg.isAI 
                                ? "bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-tr-sm"
                                : "bg-primary text-primary-foreground rounded-tr-sm"
                          )}>
                            {msg.isAI && (
                              <div className="flex items-center gap-1.5 mb-2 text-xs text-purple-600">
                                <Sparkles className="h-3 w-3" />
                                <span className="font-medium">Resposta da IA</span>
                              </div>
                            )}
                            <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                          </div>
                          <div className={cn(
                            "flex items-center gap-2 mt-1.5 text-xs text-muted-foreground",
                            msg.sender === "patient" ? "justify-start" : "justify-end"
                          )}>
                            <span>{msg.timestamp}</span>
                            {msg.sender !== "patient" && (
                              msg.status === "read" 
                                ? <CheckCheck className="h-3.5 w-3.5 text-blue-500" />
                                : <Check className="h-3.5 w-3.5" />
                            )}
                          </div>
                          
                          {/* Message Actions */}
                          <div className={cn(
                            "absolute top-2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1",
                            msg.sender === "patient" ? "right-2" : "left-2"
                          )}>
                            <Button variant="ghost" size="icon" className="h-7 w-7">
                              <Reply className="h-3.5 w-3.5" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-7 w-7">
                              <Copy className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </div>
                        {msg.sender !== "patient" && msg.isAI && (
                          <Avatar className="h-8 w-8 mt-1 order-2">
                            <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                              <Bot className="h-4 w-4" />
                            </AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                {/* AI Suggestions */}
                {showAISuggestions && (
                  <div className="px-4 py-3 border-t bg-gradient-to-r from-purple-500/5 to-pink-500/5">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-purple-500" />
                        <span className="text-xs font-medium text-purple-600">Sugestões da IA</span>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 text-xs gap-1"
                        onClick={() => setShowAISuggestions(false)}
                      >
                        Ocultar
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {suggestedResponses.map((response, idx) => (
                        <Button
                          key={idx}
                          variant="outline"
                          size="sm"
                          className="h-auto py-2 px-3 text-xs text-left whitespace-normal max-w-xs border-purple-500/20 hover:bg-purple-500/10 hover:border-purple-500/30"
                          onClick={() => setMessageInput(response)}
                        >
                          {response}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Input Area */}
                <div className="p-4 border-t bg-background">
                  <div className="flex items-end gap-3">
                    <div className="flex items-center gap-1">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-9 w-9">
                              <Paperclip className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Anexar arquivo</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-9 w-9">
                              <Image className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Enviar imagem</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-9 w-9">
                              <Mic className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Gravar áudio</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div className="flex-1 relative">
                      <Textarea
                        placeholder="Digite sua mensagem..."
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        className="min-h-[44px] max-h-32 resize-none pr-12"
                        rows={1}
                      />
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                      >
                        <Smile className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button className="gap-2 h-11 px-5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700">
                      <Send className="h-4 w-4" />
                      <span className="hidden sm:inline">Enviar</span>
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="p-6 rounded-2xl bg-muted/50 mx-auto mb-4 w-fit">
                    <MessageSquare className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Nenhuma conversa selecionada</h3>
                  <p className="text-sm text-muted-foreground">
                    Selecione uma conversa para começar
                  </p>
                </div>
              </div>
            )}
          </div>
        </Card>
      </PageContent>
    </PageContainer>
  );
}

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { PageHeader } from "@/components/ui/page-header";
import { PageContainer } from "@/components/ui/page-container";
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
  Video
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

// Channel icons
const channelIcons = {
  whatsapp: MessageSquare,
  instagram: Instagram,
  facebook: Facebook,
  email: Mail,
  site: Globe,
};

const channelColors = {
  whatsapp: "text-emerald-500",
  instagram: "text-pink-500",
  facebook: "text-blue-500",
  email: "text-amber-500",
  site: "text-purple-500",
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
        return <Badge variant="outline" className="text-amber-600 border-amber-500/30 bg-amber-500/10">Pendente</Badge>;
      case "ai_responding":
        return <Badge variant="outline" className="text-purple-600 border-purple-500/30 bg-purple-500/10 gap-1"><Bot className="h-3 w-3" />IA</Badge>;
      case "resolved":
        return <Badge variant="outline" className="text-emerald-600 border-emerald-500/30 bg-emerald-500/10">Resolvido</Badge>;
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
      >
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/50 border">
          <Bot className="h-4 w-4 text-purple-500" />
          <span className="text-sm">Autopilot</span>
          <Switch checked={autopilotEnabled} onCheckedChange={setAutopilotEnabled} />
        </div>
        <Button variant="outline" className="gap-2">
          <Settings className="h-4 w-4" />
          <span className="hidden sm:inline">Configurar</span>
        </Button>
      </PageHeader>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <MessageSquare className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Total Hoje</p>
              <p className="text-2xl font-bold">48</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-500/10">
              <Clock className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Pendentes</p>
              <p className="text-2xl font-bold text-amber-600">5</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-500/10">
              <Bot className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Resolvidas IA</p>
              <p className="text-2xl font-bold text-purple-600">32</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10">
              <CheckCheck className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Taxa Resposta</p>
              <p className="text-2xl font-bold text-emerald-600">98%</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-500/10">
              <Zap className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Tempo Médio</p>
              <p className="text-2xl font-bold text-blue-600">2.5min</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Main Chat Interface */}
      <Card className="flex h-[calc(100vh-380px)] min-h-[500px] overflow-hidden">
        {/* Conversations List */}
        <div className="w-80 border-r flex flex-col">
          {/* Search & Filters */}
          <div className="p-4 border-b space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar conversas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="flex-1 gap-1 text-xs">
                <Filter className="h-3 w-3" />
                Filtros
              </Button>
              <Tabs defaultValue="all" className="flex-1">
                <TabsList className="h-8 w-full">
                  <TabsTrigger value="all" className="text-xs flex-1">Todos</TabsTrigger>
                  <TabsTrigger value="unread" className="text-xs flex-1">Não lidos</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>

          {/* Channel Filter */}
          <div className="px-4 py-2 border-b flex items-center gap-2 overflow-x-auto">
            <Badge variant="outline" className="cursor-pointer hover:bg-muted shrink-0">Todos</Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-muted shrink-0 gap-1">
              <MessageSquare className="h-3 w-3 text-emerald-500" />
              WhatsApp
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-muted shrink-0 gap-1">
              <Instagram className="h-3 w-3 text-pink-500" />
              Instagram
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-muted shrink-0 gap-1">
              <Mail className="h-3 w-3 text-amber-500" />
              E-mail
            </Badge>
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
                      "p-3 rounded-lg cursor-pointer transition-all",
                      isSelected ? "bg-primary/10 border border-primary/30" : "hover:bg-muted/50"
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={conv.patient.avatar} />
                          <AvatarFallback className="bg-primary/10 text-primary text-sm">
                            {conv.patient.name.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className={cn(
                          "absolute -bottom-0.5 -right-0.5 p-1 rounded-full bg-card border-2 border-card",
                          channelColors[conv.channel as keyof typeof channelColors]
                        )}>
                          <ChannelIcon className="h-3 w-3" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium text-sm truncate">{conv.patient.name}</h4>
                          <span className="text-xs text-muted-foreground">{conv.timestamp}</span>
                        </div>
                        <p className="text-xs text-muted-foreground truncate">{conv.lastMessage}</p>
                        <div className="flex items-center gap-2 mt-1">
                          {conv.unread > 0 && (
                            <Badge className="h-5 min-w-5 px-1.5 bg-primary text-primary-foreground text-xs">
                              {conv.unread}
                            </Badge>
                          )}
                          {conv.aiActive && (
                            <Bot className="h-3 w-3 text-purple-500" />
                          )}
                          {conv.priority === "high" && (
                            <AlertCircle className="h-3 w-3 text-red-500" />
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
        <div className="flex-1 flex flex-col">
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={selectedConversation.patient.avatar} />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {selectedConversation.patient.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{selectedConversation.patient.name}</h3>
                      {getStatusBadge(selectedConversation.status)}
                    </div>
                    <p className="text-xs text-muted-foreground">{selectedConversation.patient.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Star className="h-4 w-4" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="gap-2">
                        <User className="h-4 w-4" />
                        Ver perfil
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2">
                        <Tag className="h-4 w-4" />
                        Adicionar tag
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2">
                        <Archive className="h-4 w-4" />
                        Arquivar
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="gap-2 text-destructive">
                        <Trash2 className="h-4 w-4" />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* AI Control Bar */}
              <div className="px-4 py-2 border-b bg-gradient-to-r from-purple-500/5 to-pink-500/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Brain className="h-4 w-4 text-purple-500" />
                    <span className="text-sm font-medium">Assistente IA</span>
                  </div>
                  <Switch 
                    checked={selectedConversation.aiActive} 
                    className="data-[state=checked]:bg-purple-500"
                  />
                  <Badge variant="outline" className="text-purple-600 border-purple-500/30">
                    <Sparkles className="h-3 w-3 mr-1" />
                    Ativo
                  </Badge>
                </div>
                <Button variant="ghost" size="sm" className="text-xs gap-1">
                  <Settings className="h-3 w-3" />
                  Configurar respostas
                </Button>
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={cn(
                        "flex",
                        msg.sender === "patient" ? "justify-start" : "justify-end"
                      )}
                    >
                      <div className={cn(
                        "max-w-[70%] p-3 rounded-2xl",
                        msg.sender === "patient" 
                          ? "bg-muted rounded-tl-none" 
                          : msg.isAI 
                            ? "bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-tr-none"
                            : "bg-primary text-primary-foreground rounded-tr-none"
                      )}>
                        {msg.isAI && (
                          <div className="flex items-center gap-1 mb-1 opacity-80">
                            <Bot className="h-3 w-3" />
                            <span className="text-xs">Assistente IA</span>
                          </div>
                        )}
                        <p className="text-sm whitespace-pre-line">{msg.content}</p>
                        <div className={cn(
                          "flex items-center justify-end gap-1 mt-1",
                          msg.sender === "patient" ? "text-muted-foreground" : "opacity-70"
                        )}>
                          <span className="text-xs">{msg.timestamp}</span>
                          {msg.sender !== "patient" && (
                            msg.status === "read" 
                              ? <CheckCheck className="h-3 w-3" />
                              : <Check className="h-3 w-3" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* AI Suggestions */}
              {showAISuggestions && (
                <div className="px-4 py-2 border-t bg-gradient-to-r from-purple-500/5 to-pink-500/5">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-4 w-4 text-purple-500" />
                    <span className="text-xs font-medium text-muted-foreground">Sugestões da IA</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-6 px-2 ml-auto"
                      onClick={() => setShowAISuggestions(false)}
                    >
                      <ChevronDown className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {suggestedResponses.map((response, idx) => (
                      <Button
                        key={idx}
                        variant="outline"
                        size="sm"
                        className="h-auto py-1.5 px-3 text-xs text-left whitespace-normal max-w-xs hover:bg-purple-500/10 hover:border-purple-500/30"
                        onClick={() => setMessageInput(response)}
                      >
                        {response}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Message Input */}
              <div className="p-4 border-t">
                <div className="flex items-end gap-2">
                  <div className="flex-1 relative">
                    <Textarea
                      placeholder="Digite sua mensagem..."
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      className="min-h-[44px] max-h-32 resize-none pr-24"
                      rows={1}
                    />
                    <div className="absolute right-2 bottom-2 flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Paperclip className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Image className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Smile className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-11 w-11">
                    <Mic className="h-5 w-5" />
                  </Button>
                  <Button size="icon" className="h-11 w-11 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700">
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="p-4 rounded-full bg-muted/50 inline-block mb-4">
                  <MessageSquare className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="font-medium mb-1">Selecione uma conversa</h3>
                <p className="text-sm text-muted-foreground">
                  Escolha uma conversa para começar a interagir
                </p>
              </div>
            </div>
          )}
        </div>
      </Card>
    </PageContainer>
  );
}

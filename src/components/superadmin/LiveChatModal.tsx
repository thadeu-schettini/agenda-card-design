import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageCircle, Send, Clock, User, Building2, Phone, Mail, MoreVertical, Search, Circle } from "lucide-react";

interface LiveChatModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const mockChats = [
  {
    id: "1",
    clinic: "Clínica São Lucas",
    user: "Dr. Carlos Silva",
    lastMessage: "Preciso de ajuda com a integração do WhatsApp",
    time: "2 min",
    unread: 2,
    status: "waiting",
    plan: "Professional",
  },
  {
    id: "2",
    clinic: "Centro Médico Vida",
    user: "Maria Souza",
    lastMessage: "Obrigada pela ajuda!",
    time: "15 min",
    unread: 0,
    status: "active",
    plan: "Enterprise",
  },
  {
    id: "3",
    clinic: "Odonto Plus",
    user: "João Santos",
    lastMessage: "Como faço para exportar os relatórios?",
    time: "1h",
    unread: 1,
    status: "waiting",
    plan: "Starter",
  },
];

const mockMessages = [
  { id: "1", sender: "client", text: "Olá, preciso de ajuda com a integração do WhatsApp", time: "10:30" },
  { id: "2", sender: "support", text: "Olá Dr. Carlos! Claro, posso ajudar. Qual é a dificuldade que está encontrando?", time: "10:31" },
  { id: "3", sender: "client", text: "O QR Code não está aparecendo para conectar", time: "10:32" },
  { id: "4", sender: "support", text: "Entendi. Vou verificar as configurações da sua conta. Um momento, por favor.", time: "10:33" },
];

export function LiveChatModal({ open, onOpenChange }: LiveChatModalProps) {
  const [selectedChat, setSelectedChat] = useState(mockChats[0]);
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "waiting": return "bg-warning";
      case "active": return "bg-success";
      default: return "bg-muted";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl h-[80vh] p-0 overflow-hidden">
        <div className="flex h-full">
          {/* Chat List */}
          <div className="w-80 border-r flex flex-col">
            <div className="p-4 border-b">
              <DialogTitle className="flex items-center gap-2 mb-4">
                <MessageCircle className="h-5 w-5 text-primary" />
                Chat ao Vivo
              </DialogTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar conversas..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 border-b">
              <Badge variant="secondary" className="gap-1">
                <Circle className="h-2 w-2 fill-warning text-warning" />
                Aguardando: 2
              </Badge>
              <Badge variant="secondary" className="gap-1">
                <Circle className="h-2 w-2 fill-success text-success" />
                Ativos: 1
              </Badge>
            </div>
            <ScrollArea className="flex-1">
              <div className="p-2">
                {mockChats.map((chat) => (
                  <div
                    key={chat.id}
                    onClick={() => setSelectedChat(chat)}
                    className={`p-3 rounded-lg cursor-pointer transition-colors mb-1 ${
                      selectedChat.id === chat.id ? "bg-primary/10" : "hover:bg-muted"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>{chat.user.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                        </Avatar>
                        <div className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background ${getStatusColor(chat.status)}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="font-medium truncate">{chat.user}</span>
                          <span className="text-xs text-muted-foreground">{chat.time}</span>
                        </div>
                        <div className="text-xs text-muted-foreground truncate">{chat.clinic}</div>
                        <div className="text-sm text-muted-foreground truncate mt-1">{chat.lastMessage}</div>
                      </div>
                      {chat.unread > 0 && (
                        <Badge className="h-5 w-5 p-0 flex items-center justify-center text-xs">
                          {chat.unread}
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback>{selectedChat.user.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{selectedChat.user}</div>
                  <div className="text-sm text-muted-foreground flex items-center gap-2">
                    <Building2 className="h-3 w-3" /> {selectedChat.clinic}
                    <Badge variant="outline" className="text-xs">{selectedChat.plan}</Badge>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Phone className="h-4 w-4 mr-1" /> Ligar
                </Button>
                <Button variant="outline" size="sm">
                  <Mail className="h-4 w-4 mr-1" /> Email
                </Button>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {mockMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === "support" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[70%] p-3 rounded-2xl ${
                        msg.sender === "support"
                          ? "bg-primary text-primary-foreground rounded-br-md"
                          : "bg-muted rounded-bl-md"
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                      <span className={`text-xs mt-1 block ${msg.sender === "support" ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                        {msg.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="p-4 border-t">
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Digite sua mensagem..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-1"
                />
                <Button size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

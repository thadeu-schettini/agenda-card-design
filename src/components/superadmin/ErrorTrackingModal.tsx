import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bug, AlertTriangle, XCircle, Search, Clock, User, Globe, ChevronDown, ChevronUp, Copy } from "lucide-react";

interface ErrorTrackingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const mockErrors = [
  {
    id: "ERR-001",
    type: "critical",
    message: "TypeError: Cannot read property 'id' of undefined",
    stack: `TypeError: Cannot read property 'id' of undefined
    at PatientService.getPatient (patient-service.js:45:23)
    at async AppointmentController.create (appointment-controller.js:78:12)
    at async Router.handle (router.js:156:9)`,
    occurrences: 47,
    users: 12,
    lastSeen: "5 min atrás",
    browser: "Chrome 120",
    page: "/pacientes/12345",
  },
  {
    id: "ERR-002",
    type: "error",
    message: "NetworkError: Failed to fetch patient data",
    stack: `NetworkError: Failed to fetch patient data
    at fetch (fetch.js:12:8)
    at ApiClient.get (api-client.js:34:15)
    at PatientList.loadData (patient-list.js:67:20)`,
    occurrences: 23,
    users: 8,
    lastSeen: "12 min atrás",
    browser: "Safari 17",
    page: "/agenda",
  },
  {
    id: "ERR-003",
    type: "warning",
    message: "Warning: Component updated without proper dependency",
    stack: `Warning: Component updated without proper dependency
    at DashboardMetrics (dashboard-metrics.js:23:5)
    at renderWithHooks (react-dom.js:14985:18)`,
    occurrences: 156,
    users: 45,
    lastSeen: "1 hora atrás",
    browser: "Firefox 121",
    page: "/dashboard",
  },
];

export function ErrorTrackingModal({ open, onOpenChange }: ErrorTrackingModalProps) {
  const [search, setSearch] = useState("");
  const [expandedError, setExpandedError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("all");

  const filteredErrors = mockErrors.filter(error => {
    if (activeTab === "all") return true;
    return error.type === activeTab;
  });
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "critical": return <XCircle className="h-4 w-4 text-destructive" />;
      case "error": return <Bug className="h-4 w-4 text-warning" />;
      default: return <AlertTriangle className="h-4 w-4 text-info" />;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "critical": return <Badge variant="destructive">Crítico</Badge>;
      case "error": return <Badge className="bg-warning text-warning-foreground">Erro</Badge>;
      default: return <Badge variant="secondary">Aviso</Badge>;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bug className="h-5 w-5 text-primary" />
            Tracking de Erros e Exceções
          </DialogTitle>
        </DialogHeader>

        <div className="flex items-center gap-4 mb-4">
          <Card className="px-4 py-2 border-destructive/20 bg-destructive/5">
            <div className="text-2xl font-bold text-destructive">3</div>
            <div className="text-xs text-muted-foreground">Críticos</div>
          </Card>
          <Card className="px-4 py-2 border-warning/20 bg-warning/5">
            <div className="text-2xl font-bold text-warning">12</div>
            <div className="text-xs text-muted-foreground">Erros</div>
          </Card>
          <Card className="px-4 py-2 border-info/20 bg-info/5">
            <div className="text-2xl font-bold text-info">45</div>
            <div className="text-xs text-muted-foreground">Avisos</div>
          </Card>
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar erros..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col overflow-hidden">
          <TabsList>
            <TabsTrigger value="all">Todos ({mockErrors.length})</TabsTrigger>
            <TabsTrigger value="critical">Críticos ({mockErrors.filter(e => e.type === "critical").length})</TabsTrigger>
            <TabsTrigger value="error">Erros ({mockErrors.filter(e => e.type === "error").length})</TabsTrigger>
            <TabsTrigger value="warning">Avisos ({mockErrors.filter(e => e.type === "warning").length})</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="flex-1 overflow-hidden mt-4">
            <ScrollArea className="h-[400px]">
              <div className="space-y-3 pr-4">
                {filteredErrors.map((error) => (
                  <Card key={error.id} className="overflow-hidden">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        {getTypeIcon(error.type)}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            {getTypeBadge(error.type)}
                            <span className="text-xs text-muted-foreground">{error.id}</span>
                          </div>
                          <p className="font-mono text-sm truncate mb-2">{error.message}</p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" /> {error.lastSeen}
                            </span>
                            <span className="flex items-center gap-1">
                              <User className="h-3 w-3" /> {error.users} usuários
                            </span>
                            <span className="flex items-center gap-1">
                              <Globe className="h-3 w-3" /> {error.browser}
                            </span>
                            <span>{error.occurrences}x ocorrências</span>
                          </div>

                          {expandedError === error.id && (
                            <div className="mt-4 p-3 bg-muted rounded-lg">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-medium">Stack Trace</span>
                                <Button variant="ghost" size="sm" className="h-6 px-2">
                                  <Copy className="h-3 w-3 mr-1" /> Copiar
                                </Button>
                              </div>
                              <pre className="text-xs font-mono whitespace-pre-wrap text-muted-foreground">
                                {error.stack}
                              </pre>
                            </div>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setExpandedError(expandedError === error.id ? null : error.id)}
                        >
                          {expandedError === error.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

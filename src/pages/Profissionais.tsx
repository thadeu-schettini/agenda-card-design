import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  UserPlus, 
  Calendar as CalendarIcon,
  ArrowLeft,
  Phone,
  Mail,
  MapPin,
  Clock,
  Activity,
  FileText,
  Settings,
  TrendingUp,
  CheckCircle2,
  Users
} from "lucide-react";
import { ProfessionalGeneralTab } from "@/components/profissionais/ProfessionalGeneralTab";
import { ProfessionalScheduleTab } from "@/components/profissionais/ProfessionalScheduleTab";
import { ProfessionalDocumentsTab } from "@/components/profissionais/ProfessionalDocumentsTab";
import { ProfessionalMetricsTab } from "@/components/profissionais/ProfessionalMetricsTab";
import { ProfessionalSettingsTab } from "@/components/profissionais/ProfessionalSettingsTab";

interface Professional {
  id: string;
  name: string;
  specialty: string;
  crm: string;
  status: "disponivel" | "em-consulta" | "ausente";
  phone: string;
  email: string;
  address: string;
  appointmentsToday: number;
  nextAvailable: string;
  avatar?: string;
}

const mockProfessionals: Professional[] = [
  {
    id: "1",
    name: "Dr. João Silva",
    specialty: "Cardiologista",
    crm: "CRM/SP 123456",
    status: "disponivel",
    phone: "(11) 98765-4321",
    email: "joao.silva@clinica.com",
    address: "Consultório 101",
    appointmentsToday: 8,
    nextAvailable: "14:30",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=joao"
  },
  {
    id: "2",
    name: "Dra. Maria Santos",
    specialty: "Dermatologista",
    crm: "CRM/SP 789012",
    status: "em-consulta",
    phone: "(11) 98765-4322",
    email: "maria.santos@clinica.com",
    address: "Consultório 102",
    appointmentsToday: 6,
    nextAvailable: "15:00",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=maria"
  },
  {
    id: "3",
    name: "Dr. Pedro Costa",
    specialty: "Ortopedista",
    crm: "CRM/SP 345678",
    status: "disponivel",
    phone: "(11) 98765-4323",
    email: "pedro.costa@clinica.com",
    address: "Consultório 103",
    appointmentsToday: 5,
    nextAvailable: "13:00",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=pedro"
  },
  {
    id: "4",
    name: "Dra. Ana Oliveira",
    specialty: "Pediatra",
    crm: "CRM/SP 901234",
    status: "ausente",
    phone: "(11) 98765-4324",
    email: "ana.oliveira@clinica.com",
    address: "Consultório 104",
    appointmentsToday: 0,
    nextAvailable: "Amanhã 09:00",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ana"
  },
  {
    id: "5",
    name: "Dr. Carlos Mendes",
    specialty: "Neurologista",
    crm: "CRM/SP 567890",
    status: "disponivel",
    phone: "(11) 98765-4325",
    email: "carlos.mendes@clinica.com",
    address: "Consultório 105",
    appointmentsToday: 7,
    nextAvailable: "16:00",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=carlos"
  },
  {
    id: "6",
    name: "Dra. Juliana Ferreira",
    specialty: "Oftalmologista",
    crm: "CRM/SP 234567",
    status: "em-consulta",
    phone: "(11) 98765-4326",
    email: "juliana.ferreira@clinica.com",
    address: "Consultório 106",
    appointmentsToday: 9,
    nextAvailable: "14:00",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=juliana"
  }
];

const statusConfig = {
  "disponivel": {
    label: "Disponível",
    color: "bg-green-500/10 text-green-600 border-green-500/20",
    dotColor: "bg-green-500"
  },
  "em-consulta": {
    label: "Em Consulta",
    color: "bg-orange-500/10 text-orange-600 border-orange-500/20",
    dotColor: "bg-orange-500"
  },
  "ausente": {
    label: "Ausente",
    color: "bg-gray-500/10 text-gray-600 border-gray-500/20",
    dotColor: "bg-gray-500"
  }
};

const Profissionais = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProfessional, setSelectedProfessional] = useState<Professional | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const filteredProfessionals = mockProfessionals.filter(prof =>
    prof.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    prof.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
    prof.crm.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCardClick = (professional: Professional) => {
    setSelectedProfessional(professional);
    setSheetOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-primary/3 p-4 md:p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8 animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <Link to="/">
              <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
                Profissionais
              </h1>
              <p className="text-muted-foreground mt-1">Gerencie sua equipe médica</p>
            </div>
          </div>
          
          <Button className="shadow-lg hover:shadow-xl transition-all">
            <UserPlus className="h-4 w-4 mr-2" />
            Adicionar Profissional
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome, especialidade ou CRM..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* Grid de Cards */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredProfessionals.map((professional) => (
            <Card
              key={professional.id}
              className="group cursor-pointer overflow-hidden border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-card/50 backdrop-blur-sm"
              onClick={() => handleCardClick(professional)}
            >
              <div className="p-6">
                {/* Status Badge */}
                <div className="flex items-center justify-between mb-4">
                  <Badge 
                    variant="outline" 
                    className={`${statusConfig[professional.status].color} border font-medium`}
                  >
                    <span className={`w-2 h-2 rounded-full ${statusConfig[professional.status].dotColor} mr-2 animate-pulse`} />
                    {statusConfig[professional.status].label}
                  </Badge>
                </div>

                {/* Avatar e Info Principal */}
                <div className="flex items-start gap-4 mb-4">
                  <Avatar className="h-16 w-16 border-2 border-primary/20 ring-2 ring-primary/10">
                    <AvatarImage src={professional.avatar} />
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {professional.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg text-foreground truncate group-hover:text-primary transition-colors">
                      {professional.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{professional.specialty}</p>
                    <p className="text-xs text-muted-foreground mt-1">{professional.crm}</p>
                  </div>
                </div>

                {/* Métricas Rápidas */}
                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-border/50">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Activity className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Hoje</p>
                      <p className="text-sm font-semibold">{professional.appointmentsToday} consultas</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Clock className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Próximo</p>
                      <p className="text-sm font-semibold">{professional.nextAvailable}</p>
                    </div>
                  </div>
                </div>

                {/* Quick Action */}
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full mt-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Ação rápida de agendamento
                  }}
                >
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  Agendar Consulta
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {filteredProfessionals.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-muted-foreground">Nenhum profissional encontrado</p>
          </div>
        )}
      </div>

      {/* Sheet com Detalhes */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
          {selectedProfessional && (
            <>
              <SheetHeader className="mb-6">
                <div className="flex items-start gap-4">
                  <Avatar className="h-20 w-20 border-2 border-primary/20">
                    <AvatarImage src={selectedProfessional.avatar} />
                    <AvatarFallback className="bg-primary/10 text-primary text-xl font-semibold">
                      {selectedProfessional.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <SheetTitle className="text-2xl">{selectedProfessional.name}</SheetTitle>
                    <p className="text-muted-foreground mt-1">{selectedProfessional.specialty}</p>
                    <Badge 
                      variant="outline" 
                      className={`${statusConfig[selectedProfessional.status].color} border mt-2`}
                    >
                      <span className={`w-2 h-2 rounded-full ${statusConfig[selectedProfessional.status].dotColor} mr-2 animate-pulse`} />
                      {statusConfig[selectedProfessional.status].label}
                    </Badge>
                  </div>
                </div>
              </SheetHeader>

              <Tabs defaultValue="geral" className="w-full">
                <TabsList className="grid w-full grid-cols-5 mb-6">
                  <TabsTrigger value="geral" className="text-xs sm:text-sm">
                    <FileText className="h-4 w-4 sm:mr-2" />
                    <span className="hidden sm:inline">Geral</span>
                  </TabsTrigger>
                  <TabsTrigger value="agenda" className="text-xs sm:text-sm">
                    <CalendarIcon className="h-4 w-4 sm:mr-2" />
                    <span className="hidden sm:inline">Agenda</span>
                  </TabsTrigger>
                  <TabsTrigger value="documentos" className="text-xs sm:text-sm">
                    <FileText className="h-4 w-4 sm:mr-2" />
                    <span className="hidden sm:inline">Docs</span>
                  </TabsTrigger>
                  <TabsTrigger value="metricas" className="text-xs sm:text-sm">
                    <TrendingUp className="h-4 w-4 sm:mr-2" />
                    <span className="hidden sm:inline">Métricas</span>
                  </TabsTrigger>
                  <TabsTrigger value="config" className="text-xs sm:text-sm">
                    <Settings className="h-4 w-4 sm:mr-2" />
                    <span className="hidden sm:inline">Config</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="geral" className="space-y-4">
                  <ProfessionalGeneralTab professional={selectedProfessional} />
                </TabsContent>

                <TabsContent value="agenda" className="space-y-4">
                  <ProfessionalScheduleTab professional={selectedProfessional} />
                </TabsContent>

                <TabsContent value="documentos" className="space-y-4">
                  <ProfessionalDocumentsTab professional={selectedProfessional} />
                </TabsContent>

                <TabsContent value="metricas" className="space-y-4">
                  <ProfessionalMetricsTab professional={selectedProfessional} />
                </TabsContent>

                <TabsContent value="config" className="space-y-4">
                  <ProfessionalSettingsTab professional={selectedProfessional} />
                </TabsContent>
              </Tabs>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Profissionais;
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Sparkles, Filter, Sliders } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui/sidebar";

interface CalendarFiltersSidebarProps {
  onFilterChange?: (filters: any) => void;
}

export const CalendarFiltersSidebar = ({ onFilterChange }: CalendarFiltersSidebarProps) => {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [selectedService, setSelectedService] = useState("todos");
  const [selectedStatus, setSelectedStatus] = useState("todos");
  const [showExternal, setShowExternal] = useState(false);
  const [showBlocks, setShowBlocks] = useState(false);
  const [hideNext, setHideNext] = useState(false);

  const removeFilter = (filter: string) => {
    setActiveFilters(activeFilters.filter(f => f !== filter));
  };

  const clearAllFilters = () => {
    setActiveFilters([]);
    setSelectedService("todos");
    setSelectedStatus("todos");
    setShowExternal(false);
    setShowBlocks(false);
    setHideNext(false);
  };

  return (
    <Sidebar className="border-r border-border/50 bg-card/50 backdrop-blur-sm">
      <SidebarHeader className="border-b border-border/30 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Sliders className="h-4 w-4 text-primary" />
            </div>
            <h2 className="font-bold text-foreground">Filtros</h2>
          </div>
          <SidebarTrigger />
        </div>
      </SidebarHeader>

      <SidebarContent className="p-4">
        {/* Quick Actions */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">
            Ações Rápidas
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <Button 
              variant={hideNext ? "default" : "outline"}
              size="sm"
              className="w-full justify-start h-9 font-semibold transition-all duration-300"
              onClick={() => setHideNext(!hideNext)}
            >
              <Filter className="h-3.5 w-3.5 mr-2" />
              Ocultar próximos
            </Button>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Service Filter */}
        <SidebarGroup className="mt-6">
          <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">
            Serviço
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <Select value={selectedService} onValueChange={setSelectedService}>
              <SelectTrigger className="w-full h-9">
                <SelectValue placeholder="Selecione o serviço" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os serviços</SelectItem>
                <SelectItem value="consulta">Consulta</SelectItem>
                <SelectItem value="retorno">Retorno</SelectItem>
                <SelectItem value="avaliacao">Avaliação</SelectItem>
                <SelectItem value="exame">Exame</SelectItem>
              </SelectContent>
            </Select>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Status Filter */}
        <SidebarGroup className="mt-6">
          <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">
            Status
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full h-9">
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os status</SelectItem>
                <SelectItem value="confirmado">Confirmado</SelectItem>
                <SelectItem value="pendente">Pendente</SelectItem>
                <SelectItem value="concluido">Concluído</SelectItem>
                <SelectItem value="cancelado">Cancelado</SelectItem>
              </SelectContent>
            </Select>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Additional Options */}
        <SidebarGroup className="mt-6">
          <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">
            Opções
          </SidebarGroupLabel>
          <SidebarGroupContent className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/40 transition-all duration-300 cursor-pointer group">
              <label 
                htmlFor="show-external" 
                className="text-sm font-medium text-foreground cursor-pointer group-hover:text-primary transition-colors"
              >
                Mostrar externos
              </label>
              <Switch 
                id="show-external" 
                checked={showExternal}
                onCheckedChange={setShowExternal}
                className="data-[state=checked]:bg-primary" 
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/40 transition-all duration-300 cursor-pointer group">
              <label 
                htmlFor="show-blocks" 
                className="text-sm font-medium text-foreground cursor-pointer group-hover:text-primary transition-colors"
              >
                Mostrar bloqueios
              </label>
              <Switch 
                id="show-blocks" 
                checked={showBlocks}
                onCheckedChange={setShowBlocks}
                className="data-[state=checked]:bg-primary" 
              />
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Active Filters */}
        {activeFilters.length > 0 && (
          <SidebarGroup className="mt-6">
            <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3 flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Filtros Ativos
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <div className="flex flex-wrap gap-2">
                {activeFilters.map((filter) => (
                  <Badge 
                    key={filter}
                    variant="secondary"
                    className="px-3 py-1 bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-all duration-300 group cursor-pointer"
                  >
                    {filter}
                    <X 
                      className="ml-2 h-3 w-3 group-hover:rotate-90 transition-transform duration-300" 
                      onClick={() => removeFilter(filter)}
                    />
                  </Badge>
                ))}
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                className="w-full mt-3 h-8 text-xs font-medium text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={clearAllFilters}
              >
                Limpar tudo
              </Button>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
    </Sidebar>
  );
};
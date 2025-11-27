import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Filter, X } from "lucide-react";

interface AdvancedFiltersProps {
  filters: {
    professionals: string[];
    services: string[];
    modes: string[];
    status: string[];
  };
  activeFilters: {
    professionals: string[];
    services: string[];
    modes: string[];
    status: string[];
  };
  onFilterChange: (category: keyof AdvancedFiltersProps['activeFilters'], value: string) => void;
  onClearFilters: () => void;
}

export const AdvancedFilters = ({
  filters,
  activeFilters,
  onFilterChange,
  onClearFilters,
}: AdvancedFiltersProps) => {
  const totalActiveFilters =
    activeFilters.professionals.length +
    activeFilters.services.length +
    activeFilters.modes.length +
    activeFilters.status.length;

  return (
    <div className="flex items-center gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="relative">
            <Filter className="h-4 w-4 mr-2" />
            Filtros
            {totalActiveFilters > 0 && (
              <Badge
                variant="default"
                className="ml-2 px-1.5 py-0 h-5 min-w-[20px] rounded-full"
              >
                {totalActiveFilters}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80" align="end">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold">Filtros Avançados</h4>
              {totalActiveFilters > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClearFilters}
                  className="h-8 px-2"
                >
                  <X className="h-3 w-3 mr-1" />
                  Limpar
                </Button>
              )}
            </div>

            {/* Profissionais */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Profissionais</Label>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {filters.professionals.map((prof) => (
                  <div key={prof} className="flex items-center space-x-2">
                    <Checkbox
                      id={`prof-${prof}`}
                      checked={activeFilters.professionals.includes(prof)}
                      onCheckedChange={() => onFilterChange("professionals", prof)}
                    />
                    <Label
                      htmlFor={`prof-${prof}`}
                      className="text-sm cursor-pointer"
                    >
                      {prof}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Serviços */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Serviços</Label>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {filters.services.map((service) => (
                  <div key={service} className="flex items-center space-x-2">
                    <Checkbox
                      id={`service-${service}`}
                      checked={activeFilters.services.includes(service)}
                      onCheckedChange={() => onFilterChange("services", service)}
                    />
                    <Label
                      htmlFor={`service-${service}`}
                      className="text-sm cursor-pointer"
                    >
                      {service}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Tipo de Atendimento */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Tipo de Atendimento</Label>
              <div className="space-y-2">
                {filters.modes.map((mode) => (
                  <div key={mode} className="flex items-center space-x-2">
                    <Checkbox
                      id={`mode-${mode}`}
                      checked={activeFilters.modes.includes(mode)}
                      onCheckedChange={() => onFilterChange("modes", mode)}
                    />
                    <Label
                      htmlFor={`mode-${mode}`}
                      className="text-sm cursor-pointer"
                    >
                      {mode}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Status */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Status</Label>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {filters.status.map((stat) => (
                  <div key={stat} className="flex items-center space-x-2">
                    <Checkbox
                      id={`status-${stat}`}
                      checked={activeFilters.status.includes(stat)}
                      onCheckedChange={() => onFilterChange("status", stat)}
                    />
                    <Label
                      htmlFor={`status-${stat}`}
                      className="text-sm cursor-pointer"
                    >
                      {stat}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {/* Filtros Ativos */}
      {totalActiveFilters > 0 && (
        <div className="flex flex-wrap gap-1">
          {[...activeFilters.professionals, ...activeFilters.services, ...activeFilters.modes, ...activeFilters.status].map((filter) => (
            <Badge
              key={filter}
              variant="secondary"
              className="text-xs"
            >
              {filter}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

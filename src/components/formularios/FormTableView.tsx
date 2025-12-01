import { Copy, History, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ClinicalForm {
  id: string;
  name: string;
  specialty: string;
  type: string;
  fieldsCount: number;
  sectionsCount: number;
  status: "publicado" | "rascunho";
}

interface FormTableViewProps {
  forms: ClinicalForm[];
  onEdit: (form: ClinicalForm) => void;
  onDuplicate: (form: ClinicalForm) => void;
  onViewHistory: (formId: string) => void;
}

export function FormTableView({
  forms,
  onEdit,
  onDuplicate,
  onViewHistory,
}: FormTableViewProps) {
  return (
    <div className="rounded-lg border bg-card overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="font-semibold">Nome do Formulário</TableHead>
              <TableHead className="font-semibold hidden sm:table-cell">Especialidade</TableHead>
              <TableHead className="font-semibold hidden md:table-cell">Tipo</TableHead>
              <TableHead className="font-semibold hidden lg:table-cell text-center">Estrutura</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="font-semibold text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {forms.map((form) => (
              <TableRow
                key={form.id}
                className="cursor-pointer hover:bg-muted/30 transition-colors"
                onClick={() => onEdit(form)}
              >
                <TableCell className="font-medium">
                  <div>
                    <div className="text-sm">{form.name}</div>
                    <div className="text-xs text-muted-foreground sm:hidden">
                      {form.specialty}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">
                  {form.specialty}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <Badge variant="outline" className="text-xs">
                    {form.type}
                  </Badge>
                </TableCell>
                <TableCell className="hidden lg:table-cell text-center text-sm text-muted-foreground">
                  {form.sectionsCount} seções · {form.fieldsCount} campos
                </TableCell>
                <TableCell>
                  <Badge
                    variant={form.status === "publicado" ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {form.status === "publicado" ? "Publicado" : "Rascunho"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={(e) => {
                        e.stopPropagation();
                        onEdit(form);
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDuplicate(form);
                      }}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={(e) => {
                        e.stopPropagation();
                        onViewHistory(form.id);
                      }}
                    >
                      <History className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

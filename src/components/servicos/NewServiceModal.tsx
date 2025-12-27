import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Stethoscope, Clock, DollarSign, Sparkles, Heart, TestTube, Scissors } from "lucide-react";
import { toast } from "sonner";

interface NewServiceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NewServiceModal({ open, onOpenChange }: NewServiceModalProps) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");
  const [tussCode, setTussCode] = useState("");
  const [isActive, setIsActive] = useState(true);

  const handleSubmit = () => {
    if (!name || !category || !duration || !price) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }
    toast.success("Serviço criado com sucesso!");
    onOpenChange(false);
    // Reset form
    setName("");
    setCategory("");
    setDescription("");
    setDuration("");
    setPrice("");
    setTussCode("");
    setIsActive(true);
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case "consulta": return Heart;
      case "exame": return TestTube;
      case "procedimento": return Scissors;
      default: return Stethoscope;
    }
  };

  const CategoryIcon = getCategoryIcon(category);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl overflow-hidden">
        <DialogHeader className="pb-4 border-b">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <DialogTitle>Novo Serviço</DialogTitle>
              <p className="text-sm text-muted-foreground mt-0.5">
                Adicione um novo serviço ao catálogo da clínica
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className="grid gap-6 py-4 max-h-[60vh] overflow-y-auto pr-2">
          {/* Preview Card */}
          {name && (
            <div className="p-4 rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/70 to-cyan-500/70">
                  <CategoryIcon className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm">{name}</h4>
                  <p className="text-xs text-muted-foreground">
                    {category || "Categoria"} • {duration || "0"} min • R$ {price || "0,00"}
                  </p>
                </div>
                <Badge variant="secondary" className="ml-auto">
                  {isActive ? "Ativo" : "Inativo"}
                </Badge>
              </div>
            </div>
          )}

          {/* Basic Info */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome do Serviço *</Label>
              <Input
                id="name"
                placeholder="Ex: Consulta Cardiologia"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Categoria *</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="consulta">
                    <span className="flex items-center gap-2">
                      <Heart className="h-4 w-4 text-blue-500" />
                      Consulta
                    </span>
                  </SelectItem>
                  <SelectItem value="exame">
                    <span className="flex items-center gap-2">
                      <TestTube className="h-4 w-4 text-emerald-500" />
                      Exame
                    </span>
                  </SelectItem>
                  <SelectItem value="procedimento">
                    <span className="flex items-center gap-2">
                      <Scissors className="h-4 w-4 text-violet-500" />
                      Procedimento
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              placeholder="Descreva o serviço..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          {/* Details */}
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="duration" className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                Duração (min) *
              </Label>
              <Input
                id="duration"
                type="number"
                placeholder="30"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price" className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                Preço (R$) *
              </Label>
              <Input
                id="price"
                type="number"
                placeholder="200,00"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tuss">Código TUSS</Label>
              <Input
                id="tuss"
                placeholder="10101012"
                value={tussCode}
                onChange={(e) => setTussCode(e.target.value)}
              />
            </div>
          </div>

          {/* Status */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
            <div>
              <p className="font-medium text-sm">Serviço Ativo</p>
              <p className="text-xs text-muted-foreground">
                Serviços inativos não aparecem para agendamento
              </p>
            </div>
            <Switch checked={isActive} onCheckedChange={setIsActive} />
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} className="gap-2">
            <Sparkles className="h-4 w-4" />
            Criar Serviço
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  Star,
  MessageSquare,
  Calendar,
  User,
  Clock,
  Flag,
  CheckCircle2,
  AlertTriangle,
  Reply,
  Phone,
  Mail,
  Bookmark,
  BookmarkCheck,
} from "lucide-react";
import { toast } from "sonner";

interface Review {
  id: number;
  patient: string;
  avatar: string;
  professional: string;
  service: string;
  rating: number;
  date: string;
  comment: string;
  tags: string[];
  status: string;
  replied: boolean;
}

interface ReviewDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  review: Review | null;
  onRespond: () => void;
}

export function ReviewDetailModal({ open, onOpenChange, review, onRespond }: ReviewDetailModalProps) {
  const [isMarked, setIsMarked] = useState(false);
  const [markType, setMarkType] = useState<string | null>(null);

  if (!review) return null;

  const handleMark = (type: string) => {
    setIsMarked(true);
    setMarkType(type);
    toast.success(`Avaliação marcada como "${type}"`);
  };

  const handleUnmark = () => {
    setIsMarked(false);
    setMarkType(null);
    toast.success("Marcação removida");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh]">
        <DialogHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-14 w-14 ring-2 ring-primary/20">
              <AvatarFallback className="bg-gradient-to-br from-primary/30 to-primary/10 text-primary font-semibold text-lg">
                {review.avatar}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <DialogTitle className="text-xl">{review.patient}</DialogTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {review.service} • {review.professional}
              </p>
            </div>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-5 w-5",
                    i < review.rating
                      ? "text-amber-500 fill-amber-500"
                      : "text-muted-foreground/30"
                  )}
                />
              ))}
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh]">
          <div className="space-y-6 py-4">
            {/* Status Badges */}
            <div className="flex items-center gap-2 flex-wrap">
              {review.status === "new" && (
                <Badge className="bg-primary/10 text-primary border-primary/20">
                  Nova Avaliação
                </Badge>
              )}
              {review.status === "attention" && (
                <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/20 gap-1">
                  <AlertTriangle className="h-3 w-3" />
                  Requer Atenção
                </Badge>
              )}
              {review.replied && (
                <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 gap-1">
                  <CheckCircle2 className="h-3 w-3" />
                  Respondida
                </Badge>
              )}
              {isMarked && markType && (
                <Badge className="bg-violet-500/10 text-violet-600 border-violet-500/20 gap-1">
                  <BookmarkCheck className="h-3 w-3" />
                  {markType}
                </Badge>
              )}
            </div>

            {/* Comment */}
            <div className="p-4 rounded-xl bg-muted/30 border border-border/50">
              <div className="flex items-center gap-2 mb-3">
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Comentário</span>
              </div>
              <p className="text-foreground leading-relaxed">{review.comment}</p>
            </div>

            {/* Tags */}
            <div>
              <p className="text-sm font-medium mb-2 text-muted-foreground">Tags Mencionadas</p>
              <div className="flex flex-wrap gap-2">
                {review.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="px-3 py-1">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <Separator />

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-muted/20 border border-border/50">
                <div className="flex items-center gap-2 mb-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Profissional</span>
                </div>
                <p className="font-medium">{review.professional}</p>
              </div>
              <div className="p-4 rounded-xl bg-muted/20 border border-border/50">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Data</span>
                </div>
                <p className="font-medium">{review.date}</p>
              </div>
            </div>

            {/* Patient Contact */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20">
              <p className="text-sm font-medium mb-3">Contato do Paciente</p>
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm" className="gap-2">
                  <Phone className="h-4 w-4" />
                  Ligar
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Mail className="h-4 w-4" />
                  E-mail
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <MessageSquare className="h-4 w-4" />
                  WhatsApp
                </Button>
              </div>
            </div>

            <Separator />

            {/* Mark Options */}
            <div>
              <p className="text-sm font-medium mb-3 flex items-center gap-2">
                <Flag className="h-4 w-4 text-muted-foreground" />
                Marcar Avaliação
              </p>
              <div className="flex flex-wrap gap-2">
                {!isMarked ? (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2"
                      onClick={() => handleMark("Para Análise")}
                    >
                      <Bookmark className="h-4 w-4" />
                      Para Análise
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2"
                      onClick={() => handleMark("Prioridade Alta")}
                    >
                      <AlertTriangle className="h-4 w-4 text-amber-500" />
                      Prioridade Alta
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2"
                      onClick={() => handleMark("Resolvida")}
                    >
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      Resolvida
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-2 text-muted-foreground"
                    onClick={handleUnmark}
                  >
                    <BookmarkCheck className="h-4 w-4" />
                    Remover Marcação
                  </Button>
                )}
              </div>
            </div>
          </div>
        </ScrollArea>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Fechar
          </Button>
          <Button 
            className="gap-2" 
            onClick={() => {
              onOpenChange(false);
              onRespond();
            }}
            disabled={review.replied}
          >
            <Reply className="h-4 w-4" />
            {review.replied ? "Já Respondida" : "Responder"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

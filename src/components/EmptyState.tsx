import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Calendar, 
  FileText, 
  Search, 
  Inbox, 
  FolderOpen,
  ClipboardList,
  DollarSign,
  MessageSquare,
  Bell,
  Settings,
  Plus
} from "lucide-react";

type EmptyStateVariant = 
  | "patients" 
  | "appointments" 
  | "documents" 
  | "search" 
  | "inbox" 
  | "files" 
  | "forms" 
  | "transactions" 
  | "messages" 
  | "notifications"
  | "settings"
  | "generic";

interface EmptyStateProps {
  variant?: EmptyStateVariant;
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
  compact?: boolean;
}

const variantConfig: Record<EmptyStateVariant, { 
  icon: React.ElementType; 
  defaultTitle: string; 
  defaultDescription: string;
  color: string;
  bgColor: string;
}> = {
  patients: {
    icon: Users,
    defaultTitle: "Nenhum paciente encontrado",
    defaultDescription: "Adicione seu primeiro paciente para começar a gerenciar sua carteira.",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10"
  },
  appointments: {
    icon: Calendar,
    defaultTitle: "Sem agendamentos",
    defaultDescription: "Nenhum agendamento encontrado para este período. Que tal agendar uma consulta?",
    color: "text-violet-500",
    bgColor: "bg-violet-500/10"
  },
  documents: {
    icon: FileText,
    defaultTitle: "Nenhum documento",
    defaultDescription: "Você ainda não possui documentos cadastrados.",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10"
  },
  search: {
    icon: Search,
    defaultTitle: "Nenhum resultado",
    defaultDescription: "Não encontramos resultados para sua busca. Tente outros termos.",
    color: "text-amber-500",
    bgColor: "bg-amber-500/10"
  },
  inbox: {
    icon: Inbox,
    defaultTitle: "Caixa vazia",
    defaultDescription: "Você está em dia! Nenhum item pendente.",
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/10"
  },
  files: {
    icon: FolderOpen,
    defaultTitle: "Nenhum arquivo",
    defaultDescription: "Esta pasta está vazia. Adicione arquivos para organizá-los aqui.",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10"
  },
  forms: {
    icon: ClipboardList,
    defaultTitle: "Sem formulários",
    defaultDescription: "Crie seu primeiro formulário clínico ou use um modelo pronto.",
    color: "text-pink-500",
    bgColor: "bg-pink-500/10"
  },
  transactions: {
    icon: DollarSign,
    defaultTitle: "Sem transações",
    defaultDescription: "Nenhuma transação registrada neste período.",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10"
  },
  messages: {
    icon: MessageSquare,
    defaultTitle: "Sem mensagens",
    defaultDescription: "Sua caixa de mensagens está vazia.",
    color: "text-indigo-500",
    bgColor: "bg-indigo-500/10"
  },
  notifications: {
    icon: Bell,
    defaultTitle: "Sem notificações",
    defaultDescription: "Você está em dia! Nenhuma notificação nova.",
    color: "text-rose-500",
    bgColor: "bg-rose-500/10"
  },
  settings: {
    icon: Settings,
    defaultTitle: "Nada configurado",
    defaultDescription: "Configure suas preferências para começar.",
    color: "text-slate-500",
    bgColor: "bg-slate-500/10"
  },
  generic: {
    icon: Inbox,
    defaultTitle: "Nada aqui ainda",
    defaultDescription: "Este espaço está vazio no momento.",
    color: "text-muted-foreground",
    bgColor: "bg-muted/50"
  }
};

export function EmptyState({
  variant = "generic",
  title,
  description,
  actionLabel,
  onAction,
  className,
  compact = false
}: EmptyStateProps) {
  const config = variantConfig[variant];
  const Icon = config.icon;

  return (
    <div className={cn(
      "flex flex-col items-center justify-center text-center",
      compact ? "py-8 px-4" : "py-16 px-6",
      className
    )}>
      {/* Animated Icon Container */}
      <div className="relative mb-6">
        {/* Glow Effect */}
        <div className={cn(
          "absolute inset-0 rounded-full blur-2xl opacity-30 animate-pulse",
          config.bgColor
        )} />
        
        {/* Decorative Rings */}
        <div className={cn(
          "absolute inset-0 rounded-full border-2 border-dashed animate-spin-slow opacity-20",
          config.color.replace("text-", "border-")
        )} style={{ animationDuration: "20s" }} />
        
        {/* Main Icon Container */}
        <div className={cn(
          "relative flex items-center justify-center rounded-full transition-transform hover:scale-105",
          compact ? "h-16 w-16" : "h-24 w-24",
          config.bgColor
        )}>
          <Icon className={cn(
            config.color,
            compact ? "h-8 w-8" : "h-12 w-12"
          )} />
        </div>

        {/* Floating Dots */}
        <div className="absolute -top-2 -right-2 h-3 w-3 rounded-full bg-primary/30 animate-bounce" style={{ animationDelay: "0s" }} />
        <div className="absolute -bottom-1 -left-1 h-2 w-2 rounded-full bg-primary/20 animate-bounce" style={{ animationDelay: "0.5s" }} />
      </div>

      {/* Content */}
      <h3 className={cn(
        "font-semibold text-foreground mb-2",
        compact ? "text-base" : "text-lg"
      )}>
        {title || config.defaultTitle}
      </h3>
      
      <p className={cn(
        "text-muted-foreground max-w-sm",
        compact ? "text-sm" : "text-base"
      )}>
        {description || config.defaultDescription}
      </p>

      {/* Action Button */}
      {actionLabel && onAction && (
        <Button 
          onClick={onAction}
          className="mt-6 gap-2"
          size={compact ? "sm" : "default"}
        >
          <Plus className="h-4 w-4" />
          {actionLabel}
        </Button>
      )}
    </div>
  );
}

// Compact inline empty state for smaller areas
export function InlineEmptyState({
  icon: CustomIcon,
  message,
  className
}: {
  icon?: React.ElementType;
  message: string;
  className?: string;
}) {
  const Icon = CustomIcon || Inbox;
  
  return (
    <div className={cn(
      "flex items-center justify-center gap-3 py-8 text-muted-foreground",
      className
    )}>
      <Icon className="h-5 w-5" />
      <span className="text-sm">{message}</span>
    </div>
  );
}

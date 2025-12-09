import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  iconGradient?: string;
  badge?: {
    text: string;
    variant?: "default" | "secondary" | "destructive" | "outline";
  };
  backLink?: string;
  children?: ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  description,
  icon: Icon,
  iconGradient = "from-primary to-primary/60",
  badge,
  backLink,
  children,
  className,
}: PageHeaderProps) {
  return (
    <div className={cn("border-b bg-background/50 backdrop-blur-sm sticky top-0 z-10", className)}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            {backLink && (
              <Link to={backLink}>
                <Button variant="ghost" size="icon" className="shrink-0">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
            )}
            <div className="flex items-center gap-3">
              {Icon && (
                <div className={cn(
                  "p-2.5 rounded-xl bg-gradient-to-br shadow-lg shrink-0",
                  iconGradient
                )}>
                  <Icon className="h-6 w-6 text-primary-foreground" />
                </div>
              )}
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold text-foreground">{title}</h1>
                  {badge && (
                    <Badge variant={badge.variant || "secondary"} className="text-xs">
                      {badge.text}
                    </Badge>
                  )}
                </div>
                {description && (
                  <p className="text-muted-foreground text-sm">{description}</p>
                )}
              </div>
            </div>
          </div>
          {children && (
            <div className="flex items-center gap-2 flex-wrap">
              {children}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

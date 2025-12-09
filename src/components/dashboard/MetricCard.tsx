import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type AccentColor = "primary" | "teal" | "purple" | "amber" | "emerald" | "rose";

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  description?: string;
  index?: number;
  accent?: AccentColor;
}

const accentStyles: Record<AccentColor, { bg: string; text: string }> = {
  primary: { bg: "bg-primary/10", text: "text-primary" },
  teal: { bg: "bg-accent-teal/10", text: "text-accent-teal" },
  purple: { bg: "bg-accent-purple/10", text: "text-accent-purple" },
  amber: { bg: "bg-accent-amber/10", text: "text-accent-amber" },
  emerald: { bg: "bg-accent-emerald/10", text: "text-accent-emerald" },
  rose: { bg: "bg-accent-rose/10", text: "text-accent-rose" },
};

export function MetricCard({
  title,
  value,
  change,
  changeType = "neutral",
  icon: Icon,
  description,
  index = 0,
  accent = "primary",
}: MetricCardProps) {
  const styles = accentStyles[accent];
  
  return (
    <div 
      className="group relative rounded-xl border border-border/50 bg-card p-5 transition-all duration-200 hover:border-border hover:shadow-sm animate-fade-in opacity-0"
      style={{ 
        animationDelay: `${index * 50}ms`,
        animationFillMode: "forwards"
      }}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1.5">
          <p className="text-sm text-muted-foreground">{title}</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-bold tracking-tight text-foreground">
              {value}
            </h3>
            {change && (
              <span
                className={cn(
                  "text-xs font-medium",
                  changeType === "positive" && "text-success",
                  changeType === "negative" && "text-destructive",
                  changeType === "neutral" && "text-muted-foreground"
                )}
              >
                {change}
              </span>
            )}
          </div>
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
        </div>
        
        <div className={cn("rounded-lg p-2", styles.bg)}>
          <Icon className={cn("h-5 w-5", styles.text)} />
        </div>
      </div>
    </div>
  );
}

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageContainerProps {
  children: ReactNode;
  className?: string;
  withBackground?: boolean;
}

export function PageContainer({
  children,
  className,
  withBackground = true,
}: PageContainerProps) {
  return (
    <div className={cn(
      "min-h-screen",
      withBackground && "bg-gradient-to-br from-background via-background to-primary/5",
      className
    )}>
      {/* Animated Background Orbs */}
      {withBackground && (
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
      )}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

interface PageContentProps {
  children: ReactNode;
  className?: string;
}

export function PageContent({ children, className }: PageContentProps) {
  return (
    <div className={cn("container mx-auto px-4 py-6 space-y-6", className)}>
      {children}
    </div>
  );
}

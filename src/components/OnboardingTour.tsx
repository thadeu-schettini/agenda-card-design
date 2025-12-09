import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  X, 
  ChevronRight, 
  ChevronLeft,
  Sparkles,
  Rocket,
  CheckCircle2,
  PartyPopper,
  LayoutDashboard,
  Settings,
  Search,
  Zap,
  Lightbulb
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TourStep {
  id: string;
  title: string;
  description: string;
  icon?: React.ElementType;
  tip?: string;
}

const defaultSteps: TourStep[] = [
  {
    id: "welcome",
    title: "Bem-vindo ao MedClinic! 🎉",
    description: "Vamos fazer um tour rápido pelo sistema para você conhecer as principais funcionalidades e aproveitar ao máximo.",
    icon: Rocket,
    tip: "Este tour leva cerca de 1 minuto"
  },
  {
    id: "sidebar",
    title: "Menu de Navegação",
    description: "No menu lateral você encontra acesso a todas as seções: Dashboard, Agenda, Pacientes, Prontuário, Financeiro e mais.",
    icon: LayoutDashboard,
    tip: "Clique no ícone ☰ para expandir/recolher"
  },
  {
    id: "dashboard",
    title: "Dashboard Principal",
    description: "Acompanhe métricas importantes como agendamentos do dia, receita mensal, taxa de ocupação e ações rápidas.",
    icon: Zap,
    tip: "Os cards são atualizados em tempo real"
  },
  {
    id: "command",
    title: "Busca Rápida (⌘K)",
    description: "Pressione ⌘K (ou Ctrl+K) a qualquer momento para abrir a busca rápida e navegar instantaneamente pelo sistema.",
    icon: Search,
    tip: "Funciona em qualquer página!"
  },
  {
    id: "theme",
    title: "Personalize seu Tema",
    description: "Alterne entre tema claro, escuro ou automático no canto superior direito para sua preferência visual.",
    icon: Settings,
    tip: "O sistema lembra sua preferência"
  },
  {
    id: "complete",
    title: "Tudo Pronto! 🎊",
    description: "Você está preparado para explorar o MedClinic. Se precisar de ajuda, acesse as Configurações ou pressione ⌘K.",
    icon: PartyPopper,
    tip: "Você pode refazer o tour a qualquer momento"
  }
];

interface OnboardingTourProps {
  onComplete?: () => void;
  steps?: TourStep[];
}

export function OnboardingTour({ onComplete, steps = defaultSteps }: OnboardingTourProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [hasSeenTour, setHasSeenTour] = useState(false);

  const step = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;
  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;

  useEffect(() => {
    const seen = localStorage.getItem("medclinic-tour-completed");
    const welcomeModalDismissed = localStorage.getItem("medclinic-welcome-dismissed");
    
    if (!seen && welcomeModalDismissed) {
      const timer = setTimeout(() => setIsOpen(true), 800);
      return () => clearTimeout(timer);
    }
    if (seen) {
      setHasSeenTour(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem("medclinic-tour-completed", "true");
    setIsOpen(false);
    setHasSeenTour(true);
    onComplete?.();
  };

  const handleSkip = () => {
    handleComplete();
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const resetTour = () => {
    localStorage.removeItem("medclinic-tour-completed");
    setCurrentStep(0);
    setIsOpen(true);
    setHasSeenTour(false);
  };

  if (!isOpen) {
    if (hasSeenTour) {
      return (
        <Button
          variant="ghost"
          size="sm"
          onClick={resetTour}
          className="fixed bottom-4 left-4 z-50 gap-2 opacity-50 hover:opacity-100 transition-opacity"
        >
          <Rocket className="h-4 w-4" />
          <span className="hidden sm:inline">Refazer Tour</span>
        </Button>
      );
    }
    return null;
  }

  const Icon = step.icon || Sparkles;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm animate-fade-in" />

      {/* Tour Card */}
      <div className="fixed inset-0 z-[101] flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-6 shadow-2xl border-2 border-primary/20 animate-scale-in bg-card/95 backdrop-blur-xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <Badge variant="secondary" className="gap-1.5 px-3 py-1">
              <Sparkles className="h-3 w-3" />
              Passo {currentStep + 1} de {steps.length}
            </Badge>
            <Button variant="ghost" size="icon" onClick={handleSkip} className="h-8 w-8 -mr-2 rounded-full hover:bg-muted">
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Progress */}
          <Progress value={progress} className="h-1.5 mb-6" />

          {/* Content */}
          <div className="text-center mb-6">
            {/* Icon */}
            <div className="mb-4 flex justify-center">
              <div className={cn(
                "relative h-20 w-20 rounded-full flex items-center justify-center",
                isLastStep 
                  ? "bg-emerald-500/20" 
                  : isFirstStep 
                    ? "bg-primary/20" 
                    : "bg-muted"
              )}>
                {/* Glow */}
                <div className={cn(
                  "absolute inset-0 rounded-full blur-xl opacity-50",
                  isLastStep ? "bg-emerald-500/30" : "bg-primary/30"
                )} />
                <Icon className={cn(
                  "h-10 w-10 relative z-10",
                  isLastStep ? "text-emerald-500" : "text-primary",
                  (isFirstStep || isLastStep) && "animate-bounce"
                )} style={{ animationDuration: "2s" }} />
              </div>
            </div>

            <h3 className="text-xl font-bold mb-3">{step.title}</h3>
            <p className="text-muted-foreground leading-relaxed">{step.description}</p>

            {/* Tip */}
            {step.tip && (
              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground bg-muted/50 rounded-lg px-3 py-2">
                <Lightbulb className="h-3 w-3 text-amber-500" />
                {step.tip}
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={handlePrev}
              disabled={currentStep === 0}
              className="gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Anterior
            </Button>

            {/* Step Indicators */}
            <div className="flex gap-1.5">
              {steps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentStep(index)}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    index === currentStep 
                      ? "w-6 bg-primary" 
                      : index < currentStep 
                        ? "w-2 bg-primary/50 hover:bg-primary/70" 
                        : "w-2 bg-muted hover:bg-muted-foreground/30"
                  )}
                  aria-label={`Ir para passo ${index + 1}`}
                />
              ))}
            </div>

            <Button onClick={handleNext} className="gap-2">
              {isLastStep ? (
                <>
                  Começar
                  <CheckCircle2 className="h-4 w-4" />
                </>
              ) : (
                <>
                  Próximo
                  <ChevronRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>

          {/* Skip link */}
          {!isLastStep && (
            <div className="mt-4 text-center">
              <button
                onClick={handleSkip}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Pular tour
              </button>
            </div>
          )}
        </Card>
      </div>
    </>
  );
}

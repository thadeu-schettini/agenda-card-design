import { AppointmentCard } from "@/components/AppointmentCard";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5 p-4 md:p-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse [animation-delay:1s]" />
      </div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-2">
            Sistema de Agendamentos
          </h1>
          <p className="text-muted-foreground">Gerencie seus atendimentos com facilidade e eficiência</p>
        </div>
        <AppointmentCard />
      </div>
    </div>
  );
};

export default Index;

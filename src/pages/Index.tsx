import { AppointmentCard } from "@/components/AppointmentCard";

const Index = () => {
  return (
    <div className="min-h-screen bg-muted/30 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-foreground mb-6">Sistema de Agendamentos</h1>
        <AppointmentCard />
      </div>
    </div>
  );
};

export default Index;

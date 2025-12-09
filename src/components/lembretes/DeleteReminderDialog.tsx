import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

interface DeleteReminderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reminder: {
    id: number;
    patient: string;
    medication: string;
  } | null;
}

export function DeleteReminderDialog({ open, onOpenChange, reminder }: DeleteReminderDialogProps) {
  if (!reminder) return null;

  const handleDelete = () => {
    toast.success("Lembrete excluído com sucesso!");
    onOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Excluir Lembrete</AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza que deseja excluir o lembrete de <strong>{reminder.medication}</strong> para <strong>{reminder.patient}</strong>?
            <br /><br />
            Esta ação não pode ser desfeita e o paciente não receberá mais notificações para esta medicação.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleDelete}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Excluir
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

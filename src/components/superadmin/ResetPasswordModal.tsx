import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import { KeyRound, Mail, Lock, AlertTriangle, Send, X, Copy, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

interface ResetPasswordModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: {
    id: number | string;
    name: string;
    email: string;
  } | null;
}

export function ResetPasswordModal({ open, onOpenChange, user }: ResetPasswordModalProps) {
  const [method, setMethod] = useState("email");
  const [manualPassword, setManualPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [invalidateSessions, setInvalidateSessions] = useState(true);
  const [requireChange, setRequireChange] = useState(true);

  if (!user) return null;

  const generatePassword = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$%";
    let password = "";
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setManualPassword(password);
    toast.success("Senha gerada!");
  };

  const copyPassword = () => {
    navigator.clipboard.writeText(manualPassword);
    toast.success("Senha copiada para a área de transferência!");
  };

  const handleSubmit = () => {
    if (method === "manual" && !manualPassword) {
      toast.error("Defina uma senha temporária");
      return;
    }
    
    if (method === "email") {
      toast.success(`Email de redefinição enviado para ${user.email}`);
    } else {
      toast.success("Senha alterada com sucesso!");
    }
    onOpenChange(false);
    setManualPassword("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-gradient-to-br from-warning/20 to-warning/10">
              <KeyRound className="h-5 w-5 text-warning" />
            </div>
            Resetar Senha
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <Alert className="border-info/20 bg-info/5">
            <AlertTriangle className="h-4 w-4 text-info" />
            <AlertDescription>
              Você está redefinindo a senha de <strong>{user.name}</strong> ({user.email})
            </AlertDescription>
          </Alert>

          {/* Método */}
          <div className="space-y-3">
            <Label>Método de Redefinição</Label>
            <RadioGroup value={method} onValueChange={setMethod} className="grid gap-3">
              <label
                className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all hover:border-primary/50 ${
                  method === "email" ? "border-primary bg-primary/5" : "border-border"
                }`}
              >
                <RadioGroupItem value="email" />
                <Mail className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Enviar Link por Email</p>
                  <p className="text-sm text-muted-foreground">
                    O usuário receberá um link para criar nova senha
                  </p>
                </div>
              </label>

              <label
                className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all hover:border-primary/50 ${
                  method === "manual" ? "border-primary bg-primary/5" : "border-border"
                }`}
              >
                <RadioGroupItem value="manual" />
                <Lock className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Definir Senha Temporária</p>
                  <p className="text-sm text-muted-foreground">
                    Você define uma senha que o usuário deverá trocar
                  </p>
                </div>
              </label>
            </RadioGroup>
          </div>

          {/* Manual Password */}
          {method === "manual" && (
            <div className="space-y-3">
              <Label htmlFor="password">Senha Temporária</Label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={manualPassword}
                    onChange={(e) => setManualPassword(e.target.value)}
                    placeholder="Digite ou gere uma senha"
                    className="pr-20"
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={copyPassword}
                      disabled={!manualPassword}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <Button variant="outline" onClick={generatePassword}>
                  Gerar
                </Button>
              </div>
            </div>
          )}

          {/* Options */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="invalidate" 
                checked={invalidateSessions}
                onCheckedChange={(checked) => setInvalidateSessions(checked as boolean)}
              />
              <label htmlFor="invalidate" className="text-sm cursor-pointer">
                Invalidar todas as sessões ativas
              </label>
            </div>
            {method === "manual" && (
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="require" 
                  checked={requireChange}
                  onCheckedChange={(checked) => setRequireChange(checked as boolean)}
                />
                <label htmlFor="require" className="text-sm cursor-pointer">
                  Exigir troca de senha no próximo login
                </label>
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            <X className="h-4 w-4 mr-2" />
            Cancelar
          </Button>
          <Button onClick={handleSubmit} className="gap-2">
            {method === "email" ? (
              <>
                <Send className="h-4 w-4" />
                Enviar Email
              </>
            ) : (
              <>
                <KeyRound className="h-4 w-4" />
                Definir Senha
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

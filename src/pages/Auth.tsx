import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Heart, User, Sparkles } from 'lucide-react';
import { z } from 'zod';

const nameSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
});

const Auth = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signInWithName, user } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = nameSchema.safeParse({ name });
      if (!result.success) {
        setError(result.error.errors[0].message);
        setLoading(false);
        return;
      }

      const { error } = await signInWithName(name.trim());
      if (error) {
        setError(error.message || 'Erro ao entrar. Tente novamente.');
      } else {
        navigate('/');
      }
    } catch {
      setError('Ocorreu um erro inesperado');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header with animation */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="w-12 h-12 text-primary fill-primary animate-pulse" />
            <h1 className="text-5xl font-fredoka font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Kids Baby
            </h1>
          </div>
          <p className="text-muted-foreground text-lg flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5 text-secondary" />
            Ministério Infantil
            <Sparkles className="w-5 h-5 text-secondary" />
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-card/80 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border-2 border-primary/20 transform hover:scale-[1.02] transition-all duration-300">
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Bem-vinda, Tia! 💖
            </h2>
            <p className="text-muted-foreground text-sm">
              Digite seu nome para acessar o sistema
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-foreground font-medium">
                Seu Nome Completo
              </Label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Ex: Ana Paula Silva"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-12 h-12 text-lg rounded-xl border-2 border-muted focus:border-primary transition-colors"
                  autoFocus
                  autoComplete="name"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Use sempre o mesmo nome para acessar seus cards
              </p>
            </div>

            {error && (
              <div className="bg-destructive/10 border border-destructive/20 p-3 rounded-xl">
                <p className="text-destructive text-sm text-center font-medium">
                  {error}
                </p>
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full h-12 text-lg font-semibold rounded-xl bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-300" 
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin">✨</span>
                  Entrando...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  Entrar no Sistema
                </span>
              )}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-muted">
            <p className="text-center text-xs text-muted-foreground">
              🔒 Acesso seguro e simples para as voluntárias do ministério
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-muted-foreground text-sm mt-6">
          Kids Baby © {new Date().getFullYear()} - Feito com 💖
        </p>
      </div>
    </div>
  );
};

export default Auth;

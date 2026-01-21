import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Heart, User } from 'lucide-react';
import { z } from 'zod';

const nameSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
});

const Auth = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signInWithName } = useAuth();
  const navigate = useNavigate();

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
        setError('Erro ao entrar. Tente novamente.');
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
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="w-10 h-10 text-primary fill-primary" />
            <h1 className="text-4xl font-fredoka font-bold text-foreground">
              Kids Baby
            </h1>
          </div>
          <p className="text-muted-foreground">
            Digite seu nome para entrar 💖
          </p>
        </div>

        <div className="bg-card p-6 rounded-2xl shadow-card border-2 border-primary/20">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Seu Nome</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Digite seu nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10"
                  autoFocus
                />
              </div>
            </div>

            {error && (
              <p className="text-destructive text-sm text-center bg-destructive/10 p-2 rounded-lg">
                {error}
              </p>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;
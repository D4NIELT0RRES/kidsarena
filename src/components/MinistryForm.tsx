import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, BookOpen, Target, Sparkles, X, Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface MinistryFormProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  editingMinistry?: {
    id: string;
    date: string;
    day_of_week: string;
    bible_book: string | null;
    theme: string | null;
    verse: string | null;
    objective: string | null;
    activities: string[] | null;
  } | null;
}

const MinistryForm = ({ open, onClose, onSuccess, editingMinistry }: MinistryFormProps) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [date, setDate] = useState(editingMinistry?.date || '');
  const [bibleBook, setBibleBook] = useState(editingMinistry?.bible_book || '');
  const [theme, setTheme] = useState(editingMinistry?.theme || '');
  const [verse, setVerse] = useState(editingMinistry?.verse || '');
  const [objective, setObjective] = useState(editingMinistry?.objective || '');
  const [activities, setActivities] = useState<string[]>(editingMinistry?.activities || ['']);

  const getDayOfWeek = (dateStr: string) => {
    const date = new Date(dateStr + 'T12:00:00');
    const days = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    return days[date.getDay()];
  };

  const handleAddActivity = () => {
    setActivities([...activities, '']);
  };

  const handleRemoveActivity = (index: number) => {
    setActivities(activities.filter((_, i) => i !== index));
  };

  const handleActivityChange = (index: number, value: string) => {
    const newActivities = [...activities];
    newActivities[index] = value;
    setActivities(newActivities);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    setError('');

    const dayOfWeek = getDayOfWeek(date);
    const filteredActivities = activities.filter(a => a.trim() !== '');

    const ministryData = {
      user_id: user.id,
      date,
      day_of_week: dayOfWeek,
      bible_book: bibleBook || null,
      theme: theme || null,
      verse: verse || null,
      objective: objective || null,
      activities: filteredActivities.length > 0 ? filteredActivities : null,
    };

    try {
      if (editingMinistry) {
        const { error } = await supabase
          .from('ministries')
          .update(ministryData)
          .eq('id', editingMinistry.id);
        
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('ministries')
          .insert(ministryData);
        
        if (error) throw error;
      }

      onSuccess();
      onClose();
      resetForm();
    } catch (err) {
      setError('Erro ao salvar ministração. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setDate('');
    setBibleBook('');
    setTheme('');
    setVerse('');
    setObjective('');
    setActivities(['']);
    setError('');
  };

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-fredoka text-xl">
            {editingMinistry ? 'Editar Ministração' : 'Nova Ministração'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="date" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Data do Culto
            </Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
            {date && (
              <p className="text-sm text-muted-foreground">
                {getDayOfWeek(date)}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="bibleBook" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Livro da Bíblia
            </Label>
            <Input
              id="bibleBook"
              placeholder="Ex: Gênesis, Mateus, Salmos..."
              value={bibleBook}
              onChange={(e) => setBibleBook(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="theme" className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Tema / Assunto
            </Label>
            <Input
              id="theme"
              placeholder="Ex: O amor de Deus, A criação..."
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="verse">Versículo</Label>
            <Textarea
              id="verse"
              placeholder="Ex: João 3:16 - Porque Deus amou o mundo..."
              value={verse}
              onChange={(e) => setVerse(e.target.value)}
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="objective" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              Objetivo
            </Label>
            <Textarea
              id="objective"
              placeholder="O que as crianças vão aprender..."
              value={objective}
              onChange={(e) => setObjective(e.target.value)}
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              Atividades / Brincadeiras
            </Label>
            {activities.map((activity, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  placeholder={`Atividade ${index + 1}`}
                  value={activity}
                  onChange={(e) => handleActivityChange(index, e.target.value)}
                />
                {activities.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveActivity(index)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleAddActivity}
              className="w-full"
            >
              <Plus className="w-4 h-4 mr-2" />
              Adicionar atividade
            </Button>
          </div>

          {error && (
            <p className="text-destructive text-sm text-center bg-destructive/10 p-2 rounded-lg">
              {error}
            </p>
          )}

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancelar
            </Button>
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? 'Salvando...' : 'Salvar'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default MinistryForm;

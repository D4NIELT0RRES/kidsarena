import { Calendar, BookOpen, Target, Sparkles, User, Pencil, Trash2, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Ministry {
  id: string;
  date: string;
  day_of_week: string;
  bible_book: string | null;
  theme: string | null;
  verse: string | null;
  objective: string | null;
  activities: string[] | null;
  user_id: string;
  profiles?: {
    name: string;
  } | null;
}

interface MinistryCardProps {
  ministry: Ministry;
  currentUserId?: string;
  onEdit: (ministry: Ministry) => void;
  onDelete: (id: string) => void;
}

const MinistryCard = ({ ministry, currentUserId, onEdit, onDelete }: MinistryCardProps) => {
  const isLoggedIn = !!currentUserId;
  const isOwner = currentUserId === ministry.user_id;
  const isThursday = ministry.day_of_week === 'Quinta';
  const hasContent = ministry.theme || ministry.bible_book || ministry.verse;
  
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + 'T12:00:00');
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
  };

  return (
    <div
      className={`p-5 rounded-2xl border-2 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] relative overflow-hidden ${
        isThursday
          ? 'bg-gradient-to-br from-sunny/40 to-sunny/20 border-sunny hover:border-sunny/80'
          : 'bg-gradient-to-br from-sky/40 to-sky/20 border-sky hover:border-sky/80'
      }`}
    >
      {/* Content indicator */}
      {hasContent && (
        <div className="absolute top-2 right-2">
          <CheckCircle className="w-5 h-5 text-success" />
        </div>
      )}

      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-lg ${isThursday ? 'bg-sunny/50' : 'bg-sky/50'}`}>
            <Calendar className="w-5 h-5 text-foreground" />
          </div>
          <div>
            <span className="font-bold text-lg text-foreground">
              {formatDate(ministry.date)}
            </span>
            <Badge variant="secondary" className="ml-2 text-xs">
              {ministry.day_of_week}
            </Badge>
          </div>
        </div>
        {isLoggedIn && (
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:bg-primary/20 hover:text-primary transition-all"
              onClick={() => onEdit(ministry)}
              title="Editar"
            >
              <Pencil className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:bg-destructive/20 hover:text-destructive transition-all"
              onClick={() => onDelete(ministry.id)}
              title="Excluir"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Minister name - highlighted */}
      {ministry.profiles?.name && (
        <div className="flex items-center gap-2 mb-4 bg-primary/10 px-3 py-2 rounded-xl border border-primary/20">
          <User className="w-4 h-4 text-primary" />
          <span className="font-semibold text-foreground">
            {ministry.profiles.name}
          </span>
          {isOwner && (
            <Badge variant="outline" className="ml-auto text-xs bg-primary/20 border-primary/30">
              Você
            </Badge>
          )}
        </div>
      )}

      {ministry.bible_book && (
        <div className="flex items-center gap-2 mb-2">
          <BookOpen className="w-4 h-4 text-primary" />
          <span className="font-medium text-foreground">{ministry.bible_book}</span>
        </div>
      )}

      {ministry.theme && (
        <div className="flex items-start gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-secondary mt-0.5" />
          <h3 className="font-fredoka font-bold text-xl text-foreground">
            {ministry.theme}
          </h3>
        </div>
      )}

      {ministry.verse && (
        <div className="bg-background/50 rounded-xl p-3 mb-3 border border-foreground/5">
          <p className="text-sm text-muted-foreground italic">
            "{ministry.verse}"
          </p>
        </div>
      )}

      {ministry.objective && (
        <div className="flex items-start gap-2 mb-3">
          <Target className="w-4 h-4 text-success mt-0.5" />
          <p className="text-sm text-foreground/80">{ministry.objective}</p>
        </div>
      )}

      {ministry.activities && ministry.activities.length > 0 && (
        <div className="mt-3 pt-3 border-t border-foreground/10">
          <p className="text-sm font-semibold text-muted-foreground mb-2">📋 Atividades:</p>
          <ul className="space-y-1.5">
            {ministry.activities.map((activity, i) => (
              <li key={i} className="text-sm text-foreground/80 flex items-center gap-2 bg-background/30 px-2 py-1 rounded-lg">
                <span className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-secondary flex-shrink-0" />
                {activity}
              </li>
            ))}
          </ul>
        </div>
      )}

      {!hasContent && (
        <div className="text-center py-6 bg-background/30 rounded-xl border-2 border-dashed border-muted">
          <p className="text-muted-foreground italic mb-2">
            ✨ Ministração ainda não preenchida
          </p>
          {isLoggedIn && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onEdit(ministry)}
              className="mt-2"
            >
              <Pencil className="w-3 h-3 mr-1" />
              Preencher agora
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default MinistryCard;

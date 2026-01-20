import { Calendar, BookOpen, Target, Sparkles, User, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
  const isOwner = currentUserId === ministry.user_id;
  const isThursday = ministry.day_of_week === 'Quinta';
  
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + 'T12:00:00');
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
  };

  return (
    <div
      className={`p-5 rounded-2xl border-2 transition-all hover:shadow-lg ${
        isThursday
          ? 'bg-sunny/30 border-sunny'
          : 'bg-sky/30 border-sky'
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-muted-foreground" />
          <span className="font-semibold text-foreground">
            {formatDate(ministry.date)} - {ministry.day_of_week}
          </span>
        </div>
        {isOwner && (
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => onEdit(ministry)}
            >
              <Pencil className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-destructive hover:text-destructive"
              onClick={() => onDelete(ministry.id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>

      {ministry.profiles?.name && (
        <div className="flex items-center gap-2 mb-3 text-sm text-muted-foreground">
          <User className="w-4 h-4" />
          <span>{ministry.profiles.name}</span>
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
          <Sparkles className="w-4 h-4 text-primary mt-0.5" />
          <h3 className="font-fredoka font-bold text-lg text-foreground">
            {ministry.theme}
          </h3>
        </div>
      )}

      {ministry.verse && (
        <p className="text-sm text-muted-foreground italic mb-3 pl-6">
          "{ministry.verse}"
        </p>
      )}

      {ministry.objective && (
        <div className="flex items-start gap-2 mb-3">
          <Target className="w-4 h-4 text-success mt-0.5" />
          <p className="text-sm text-foreground/80">{ministry.objective}</p>
        </div>
      )}

      {ministry.activities && ministry.activities.length > 0 && (
        <div className="mt-3 pt-3 border-t border-foreground/10">
          <p className="text-sm font-semibold text-muted-foreground mb-2">Atividades:</p>
          <ul className="space-y-1">
            {ministry.activities.map((activity, i) => (
              <li key={i} className="text-sm text-foreground/80 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                {activity}
              </li>
            ))}
          </ul>
        </div>
      )}

      {!ministry.theme && !ministry.bible_book && !ministry.verse && (
        <p className="text-muted-foreground italic text-center py-4">
          Ministração ainda não preenchida
        </p>
      )}
    </div>
  );
};

export default MinistryCard;

import { Activity, MinistryDay, activities } from "@/data/ministryData";
import { ArrowLeft, Clock, Users, Package, Sparkles, RefreshCw } from "lucide-react";
import { useState, useMemo } from "react";

interface ActivitySuggestionsProps {
  day: MinistryDay;
  onBack: () => void;
}

const ActivitySuggestions = ({ day, onBack }: ActivitySuggestionsProps) => {
  const [shuffleKey, setShuffleKey] = useState(0);

  const suggestedActivities = useMemo(() => {
    const shuffled = [...activities].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 3);
  }, [shuffleKey]);

  const handleShuffle = () => {
    setShuffleKey((prev) => prev + 1);
  };

  return (
    <div className="animate-fade-in">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-primary font-semibold mb-6 hover:opacity-80 transition-opacity"
      >
        <ArrowLeft className="w-5 h-5" />
        Voltar para a agenda
      </button>

      <div className="bg-card p-6 rounded-2xl shadow-card mb-6 border-2 border-primary/20">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-5 h-5 text-primary" />
          <span className="text-muted-foreground font-medium">
            {day.date} - {day.dayOfWeek}
          </span>
        </div>
        <h2 className="text-2xl font-fredoka font-bold text-foreground mb-2">
          {day.theme}
        </h2>
        <p className="text-muted-foreground">{day.verse}</p>
      </div>

      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-fredoka font-bold text-foreground">
          Sugestões de Brincadeiras
        </h3>
        <button
          onClick={handleShuffle}
          className="flex items-center gap-2 px-4 py-2 bg-secondary rounded-xl hover:bg-secondary/80 transition-colors"
        >
          <RefreshCw className="w-4 h-4 text-secondary-foreground" />
          <span className="text-sm font-medium text-secondary-foreground">Outras opções</span>
        </button>
      </div>

      <div className="grid gap-4">
        {suggestedActivities.map((activity, index) => (
          <ActivityCard key={`${activity.id}-${shuffleKey}`} activity={activity} index={index} />
        ))}
      </div>
    </div>
  );
};

interface ActivityCardProps {
  activity: Activity;
  index: number;
}

const ActivityCard = ({ activity, index }: ActivityCardProps) => {
  const colors = ["bg-coral-light", "bg-mint", "bg-lavender"];
  const borderColors = ["border-coral", "border-success", "border-lavender"];

  return (
    <div
      className={`${colors[index % 3]} border-2 ${borderColors[index % 3]} p-5 rounded-2xl animate-scale-in`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <h4 className="text-lg font-fredoka font-bold text-foreground mb-2">
        {activity.name}
      </h4>
      <p className="text-foreground/80 mb-4">{activity.description}</p>

      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-1.5 bg-card/80 px-3 py-1.5 rounded-full">
          <Users className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">{activity.ageGroup}</span>
        </div>
        <div className="flex items-center gap-1.5 bg-card/80 px-3 py-1.5 rounded-full">
          <Clock className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">{activity.duration}</span>
        </div>
      </div>

      {activity.materials && activity.materials.length > 0 && (
        <div className="mt-4 pt-4 border-t border-foreground/10">
          <div className="flex items-center gap-2 mb-2">
            <Package className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-semibold text-muted-foreground">Materiais:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {activity.materials.map((material, i) => (
              <span
                key={i}
                className="text-xs bg-card px-2 py-1 rounded-lg text-foreground"
              >
                {material}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivitySuggestions;

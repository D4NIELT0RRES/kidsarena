import { MinistryDay } from "@/data/ministryData";
import { BookOpen, Target, Calendar } from "lucide-react";

interface ScheduleCardProps {
  day: MinistryDay;
  onClick: () => void;
}

const ScheduleCard = ({ day, onClick }: ScheduleCardProps) => {
  const isThursday = day.dayOfWeek === "Quinta";

  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-5 rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-card animate-fade-in ${
        isThursday ? "bg-sunny-light border-2 border-sunny" : "bg-secondary border-2 border-sky"
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <Calendar className={`w-5 h-5 ${isThursday ? "text-accent-foreground" : "text-sky-dark"}`} />
          <span className={`font-bold ${isThursday ? "text-accent-foreground" : "text-sky-dark"}`}>
            {day.date}
          </span>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${
            isThursday
              ? "bg-sunny text-accent-foreground"
              : "bg-sky text-sky-dark"
          }`}
        >
          {day.dayOfWeek}
        </span>
      </div>

      <h3 className="text-lg font-fredoka font-bold text-foreground mb-2">
        {day.theme}
      </h3>

      <div className="flex items-center gap-2 text-muted-foreground mb-2">
        <BookOpen className="w-4 h-4" />
        <span className="text-sm font-medium">{day.verse}</span>
      </div>

      <div className="flex items-start gap-2 text-muted-foreground">
        <Target className="w-4 h-4 mt-0.5 flex-shrink-0" />
        <span className="text-sm">{day.objective}</span>
      </div>

      <div className="mt-4 text-primary font-semibold text-sm flex items-center gap-1">
        Clique para ver sugestões de atividades →
      </div>
    </button>
  );
};

export default ScheduleCard;

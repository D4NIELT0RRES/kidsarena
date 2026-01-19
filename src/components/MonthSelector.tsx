import { months } from "@/data/ministryData";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface MonthSelectorProps {
  selectedMonth: string;
  onMonthChange: (month: string) => void;
}

const MonthSelector = ({ selectedMonth, onMonthChange }: MonthSelectorProps) => {
  const currentIndex = months.indexOf(selectedMonth);

  const handlePrevious = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : months.length - 1;
    onMonthChange(months[newIndex]);
  };

  const handleNext = () => {
    const newIndex = currentIndex < months.length - 1 ? currentIndex + 1 : 0;
    onMonthChange(months[newIndex]);
  };

  return (
    <div className="flex flex-col items-center gap-4 mb-8">
      <p className="text-muted-foreground font-medium">Selecione o mês</p>
      
      <div className="flex items-center gap-4">
        <button
          onClick={handlePrevious}
          className="p-3 rounded-full bg-secondary hover:bg-secondary/80 transition-colors shadow-soft"
          aria-label="Mês anterior"
        >
          <ChevronLeft className="w-6 h-6 text-secondary-foreground" />
        </button>

        <div className="bg-card px-8 py-4 rounded-2xl shadow-card min-w-[200px] text-center">
          <span className="text-2xl font-fredoka font-bold text-foreground">
            {selectedMonth}
          </span>
        </div>

        <button
          onClick={handleNext}
          className="p-3 rounded-full bg-secondary hover:bg-secondary/80 transition-colors shadow-soft"
          aria-label="Próximo mês"
        >
          <ChevronRight className="w-6 h-6 text-secondary-foreground" />
        </button>
      </div>

      <div className="flex flex-wrap justify-center gap-2 mt-4 max-w-2xl">
        {months.map((month) => (
          <button
            key={month}
            onClick={() => onMonthChange(month)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
              selectedMonth === month
                ? "bg-primary text-primary-foreground shadow-soft scale-105"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {month.slice(0, 3)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MonthSelector;

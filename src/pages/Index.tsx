import { useState } from "react";
import Header from "@/components/Header";
import MonthSelector from "@/components/MonthSelector";
import ScheduleCard from "@/components/ScheduleCard";
import ActivitySuggestions from "@/components/ActivitySuggestions";
import NoticesSection from "@/components/NoticesSection";
import { ministrySchedule, MinistryDay } from "@/data/ministryData";

const Index = () => {
  const currentMonth = new Date().toLocaleString("pt-BR", { month: "long" });
  const formattedMonth = currentMonth.charAt(0).toUpperCase() + currentMonth.slice(1);
  
  const [activeTab, setActiveTab] = useState<"schedule" | "notices">("schedule");
  const [selectedMonth, setSelectedMonth] = useState(
    ministrySchedule[formattedMonth] ? formattedMonth : "Janeiro"
  );
  const [selectedDay, setSelectedDay] = useState<MinistryDay | null>(null);

  const scheduleForMonth = ministrySchedule[selectedMonth] || [];

  const handleDaySelect = (day: MinistryDay) => {
    setSelectedDay(day);
  };

  const handleBackToSchedule = () => {
    setSelectedDay(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {activeTab === "schedule" ? (
          <>
            {selectedDay ? (
              <ActivitySuggestions day={selectedDay} onBack={handleBackToSchedule} />
            ) : (
              <>
                <MonthSelector
                  selectedMonth={selectedMonth}
                  onMonthChange={setSelectedMonth}
                />

                {scheduleForMonth.length > 0 ? (
                  <div className="grid gap-4 md:grid-cols-2">
                    {scheduleForMonth.map((day, index) => (
                      <ScheduleCard
                        key={`${day.date}-${index}`}
                        day={day}
                        onClick={() => handleDaySelect(day)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground text-lg">
                      Nenhuma ministração cadastrada para {selectedMonth}.
                    </p>
                  </div>
                )}
              </>
            )}
          </>
        ) : (
          <NoticesSection />
        )}
      </main>

      <footer className="py-6 text-center text-muted-foreground text-sm">
        <p>Kids Baby © {new Date().getFullYear()} - Feito com 💖 para os pequeninos</p>
      </footer>
    </div>
  );
};

export default Index;

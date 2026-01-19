import { Baby, Bell, Calendar, Sparkles } from "lucide-react";

interface HeaderProps {
  activeTab: "schedule" | "notices";
  onTabChange: (tab: "schedule" | "notices") => void;
}

const Header = ({ activeTab, onTabChange }: HeaderProps) => {
  return (
    <header className="hero-gradient py-6 px-4 shadow-soft">
      <div className="container mx-auto">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="relative">
            <Baby className="w-10 h-10 text-primary-foreground float-animation" />
            <Sparkles className="w-4 h-4 text-accent absolute -top-1 -right-1" />
          </div>
          <h1 className="text-3xl md:text-4xl font-fredoka font-bold text-primary-foreground tracking-tight">
            Kids Baby
          </h1>
        </div>

        <nav className="flex justify-center gap-2">
          <button
            onClick={() => onTabChange("schedule")}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
              activeTab === "schedule"
                ? "bg-card text-foreground shadow-card scale-105"
                : "bg-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/30"
            }`}
          >
            <Calendar className="w-5 h-5" />
            <span>Ministrações</span>
          </button>
          <button
            onClick={() => onTabChange("notices")}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
              activeTab === "notices"
                ? "bg-card text-foreground shadow-card scale-105"
                : "bg-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/30"
            }`}
          >
            <Bell className="w-5 h-5" />
            <span>Avisos</span>
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;

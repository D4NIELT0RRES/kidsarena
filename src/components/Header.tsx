import { Heart, Calendar, Bell, LogOut, User, Sparkles } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

interface HeaderProps {
  activeTab: "schedule" | "notices";
  onTabChange: (tab: "schedule" | "notices") => void;
}

const Header = ({ activeTab, onTabChange }: HeaderProps) => {
  const { user, userName, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  return (
    <header className="bg-gradient-to-r from-card via-card to-card/95 shadow-lg sticky top-0 z-10 border-b-2 border-primary/10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Heart className="w-10 h-10 text-primary fill-primary animate-pulse" />
              <Sparkles className="w-4 h-4 text-secondary absolute -top-1 -right-1" />
            </div>
            <div>
              <h1 className="text-2xl font-fredoka font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Kids Baby
              </h1>
              <p className="text-xs text-muted-foreground">Ministério Infantil</p>
            </div>
          </div>
          
          {user && (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-primary/10 px-3 py-2 rounded-xl border border-primary/20">
                <User className="w-4 h-4 text-primary" />
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">Olá,</span>
                  <span className="font-semibold text-foreground text-sm leading-tight">
                    {userName || 'Voluntária'}
                  </span>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={handleSignOut}
                className="rounded-xl hover:bg-destructive/10 hover:border-destructive/50 hover:text-destructive transition-all"
                title="Sair"
              >
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          )}
        </div>

        <nav className="flex gap-2">
          <button
            onClick={() => onTabChange("schedule")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all duration-300 ${
              activeTab === "schedule"
                ? "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg scale-105"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:scale-102"
            }`}
          >
            <Calendar className="w-4 h-4" />
            Ministrações
          </button>
          <button
            onClick={() => onTabChange("notices")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all duration-300 ${
              activeTab === "notices"
                ? "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg scale-105"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:scale-102"
            }`}
          >
            <Bell className="w-4 h-4" />
            Avisos
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;

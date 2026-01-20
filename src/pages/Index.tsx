import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Header from "@/components/Header";
import MinistryList from "@/components/MinistryList";
import NoticesSection from "@/components/NoticesSection";
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";

const Index = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"schedule" | "notices">("schedule");

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {activeTab === "schedule" ? (
          <MinistryList />
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

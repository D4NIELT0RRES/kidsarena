import { notices } from "@/data/ministryData";
import {
  Clock,
  Heart,
  Sparkles,
  Package,
  Home,
  ClipboardList,
  MessageCircle,
  Shield,
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  clock: <Clock className="w-6 h-6" />,
  heart: <Heart className="w-6 h-6" />,
  sparkles: <Sparkles className="w-6 h-6" />,
  package: <Package className="w-6 h-6" />,
  home: <Home className="w-6 h-6" />,
  clipboard: <ClipboardList className="w-6 h-6" />,
  message: <MessageCircle className="w-6 h-6" />,
  shield: <Shield className="w-6 h-6" />,
};

const priorityStyles: Record<string, { bg: string; border: string; icon: string }> = {
  high: {
    bg: "bg-coral-light",
    border: "border-coral",
    icon: "text-primary",
  },
  medium: {
    bg: "bg-sunny-light",
    border: "border-sunny",
    icon: "text-accent-foreground",
  },
  low: {
    bg: "bg-secondary",
    border: "border-sky",
    icon: "text-sky-dark",
  },
};

const NoticesSection = () => {
  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-fredoka font-bold text-foreground mb-2">
          Avisos Importantes
        </h2>
        <p className="text-muted-foreground">
          Lembretes para uma ministração abençoada! 💖
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {notices.map((notice, index) => {
          const styles = priorityStyles[notice.priority];
          return (
            <div
              key={notice.id}
              className={`${styles.bg} border-2 ${styles.border} p-5 rounded-2xl animate-scale-in`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 bg-card rounded-xl ${styles.icon}`}>
                  {iconMap[notice.icon]}
                </div>
                <div className="flex-1">
                  <h3 className="font-fredoka font-bold text-foreground text-lg mb-1">
                    {notice.title}
                  </h3>
                  <p className="text-foreground/80 text-sm leading-relaxed">
                    {notice.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 p-6 bg-card rounded-2xl shadow-card border-2 border-primary/20 text-center">
        <div className="flex justify-center mb-4">
          <div className="p-4 bg-primary/10 rounded-full">
            <Heart className="w-8 h-8 text-primary" />
          </div>
        </div>
        <h3 className="font-fredoka font-bold text-xl text-foreground mb-2">
          Você é uma bênção!
        </h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          Obrigado por dedicar seu tempo e amor às nossas crianças. 
          Que Deus abençoe ricamente sua ministração! 🙏✨
        </p>
      </div>
    </div>
  );
};

export default NoticesSection;

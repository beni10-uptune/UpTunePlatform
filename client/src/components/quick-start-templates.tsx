import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Sparkles, 
  Car, 
  PartyPopper, 
  Coffee, 
  Heart, 
  Headphones,
  Zap,
  Sunrise,
  Moon,
  Rocket
} from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";

interface GameTemplate {
  id: string;
  gameType: string;
  theme: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
}

const gameTemplates: GameTemplate[] = [
  {
    id: 'road-trip',
    gameType: 'jam-sessions',
    theme: 'Road trip vibes',
    title: 'Road Trip Playlist',
    description: 'Perfect driving tunes for the open road',
    icon: <Car className="w-5 h-5" />,
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'party-night',
    gameType: 'jam-sessions', 
    theme: '90s dance anthems',
    title: 'Party Night',
    description: '90s dance floor classics that never get old',
    icon: <PartyPopper className="w-5 h-5" />,
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    id: 'morning-chill',
    gameType: 'jam-sessions',
    theme: 'Sunday morning chillers',
    title: 'Morning Chill',
    description: 'Peaceful sounds for lazy Sunday mornings',
    icon: <Coffee className="w-5 h-5" />,
    gradient: 'from-amber-500 to-orange-500'
  },
  {
    id: 'guilty-pleasures',
    gameType: 'guess-who',
    theme: 'Guilty Pleasures',
    title: 'Secret Guilty Pleasures',
    description: 'Share songs you secretly love (anonymously!)',
    icon: <Heart className="w-5 h-5" />,
    gradient: 'from-rose-500 to-pink-500'
  },
  {
    id: 'desert-island',
    gameType: 'desert-island',
    theme: 'Musical Essentials',
    title: 'Desert Island Discs',
    description: '8 songs that define your life soundtrack',
    icon: <Headphones className="w-5 h-5" />,
    gradient: 'from-green-500 to-teal-500'
  },
  {
    id: 'instant-vibe',
    gameType: 'jam-sessions',
    theme: 'Current mood',
    title: 'Instant Vibe Check',
    description: 'What\'s everyone feeling right now?',
    icon: <Zap className="w-5 h-5" />,
    gradient: 'from-yellow-500 to-orange-500'
  }
];

export function QuickStartTemplates() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const createGameMutation = useMutation({
    mutationFn: async (template: GameTemplate) => {
      const response = await apiRequest('POST', '/api/game-rooms', {
        gameType: template.gameType,
        theme: template.theme,
        hostNickname: 'Host'
      });
      return await response.json();
    },
    onSuccess: (gameRoom) => {
      navigate(`/room/${gameRoom.code}`);
    },
    onError: () => {
      toast({
        title: "Couldn't create game",
        description: "Please try again in a moment",
        variant: "destructive"
      });
      setSelectedTemplate(null);
    }
  });

  const handleTemplateClick = (template: GameTemplate) => {
    setSelectedTemplate(template.id);
    createGameMutation.mutate(template);
  };

  return (
    <div className="w-full py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl font-bold text-white mb-4">
          Quick Start Templates
        </h2>
        <p className="text-white/70 max-w-2xl mx-auto">
          Jump right in with these popular game setups. One click and you're ready to play!
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
        {gameTemplates.map((template, index) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Card 
              className="group cursor-pointer bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all overflow-hidden"
              onClick={() => handleTemplateClick(template)}
            >
              <CardContent className="p-0">
                <div className={`h-2 bg-gradient-to-r ${template.gradient}`} />
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${template.gradient} flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform`}>
                      {template.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white mb-1">{template.title}</h3>
                      <p className="text-white/70 text-sm mb-3">{template.description}</p>
                      <Button 
                        size="sm"
                        disabled={selectedTemplate === template.id && createGameMutation.isPending}
                        className={`bg-gradient-to-r ${template.gradient} text-white border-0 hover:opacity-90`}
                      >
                        {selectedTemplate === template.id && createGameMutation.isPending 
                          ? "Creating..." 
                          : "Start Now"
                        }
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="text-center mt-8"
      >
        <p className="text-white/60 text-sm">
          Want more control? Use the main game buttons above to customize your experience
        </p>
      </motion.div>
    </div>
  );
}
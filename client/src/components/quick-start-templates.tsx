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
  bgColor: string;
  iconBg: string;
}

const gameTemplates: GameTemplate[] = [
  {
    id: 'road-trip',
    gameType: 'jam-sessions',
    theme: 'Road trip vibes',
    title: 'Road Trip Playlist',
    description: 'Perfect driving tunes for the open road 🚗',
    icon: <Car className="w-6 h-6" />,
    bgColor: 'bg-gradient-to-br from-blue-300 to-cyan-300',
    iconBg: 'bg-blue-400'
  },
  {
    id: 'party-night',
    gameType: 'jam-sessions',
    theme: '90s dance anthems',
    title: 'Party Night',
    description: '90s dance floor classics that never get old 🎉',
    icon: <PartyPopper className="w-6 h-6" />,
    bgColor: 'bg-gradient-to-br from-purple-300 to-pink-300',
    iconBg: 'bg-purple-400'
  },
  {
    id: 'morning-chill',
    gameType: 'jam-sessions',
    theme: 'Sunday morning chillers',
    title: 'Morning Chill',
    description: 'Peaceful sounds for lazy Sunday mornings ☕',
    icon: <Coffee className="w-6 h-6" />,
    bgColor: 'bg-gradient-to-br from-amber-300 to-orange-300',
    iconBg: 'bg-amber-400'
  },
  {
    id: 'guilty-pleasures',
    gameType: 'guess-who',
    theme: 'Guilty Pleasures',
    title: 'Secret Guilty Pleasures',
    description: 'Share songs you secretly love (anonymously!) 💕',
    icon: <Heart className="w-6 h-6" />,
    bgColor: 'bg-gradient-to-br from-rose-300 to-pink-300',
    iconBg: 'bg-rose-400'
  },
  {
    id: 'desert-island',
    gameType: 'desert-island',
    theme: 'Musical Essentials',
    title: 'Desert Island Discs',
    description: '8 songs that define your life soundtrack 🎧',
    icon: <Headphones className="w-6 h-6" />,
    bgColor: 'bg-gradient-to-br from-green-300 to-teal-300',
    iconBg: 'bg-green-400'
  },
  {
    id: 'instant-vibe',
    gameType: 'jam-sessions',
    theme: 'Current mood',
    title: 'Instant Vibe Check',
    description: 'What\'s everyone feeling right now? ⚡',
    icon: <Zap className="w-6 h-6" />,
    bgColor: 'bg-gradient-to-br from-yellow-300 to-orange-300',
    iconBg: 'bg-yellow-400'
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
        <h2 className="text-4xl md:text-5xl font-black text-black mb-4" style={{ fontFamily: "'Arial Black', sans-serif", textTransform: 'uppercase' }}>
          <span className="bg-gradient-to-r from-yellow-400 to-pink-400 px-6 py-2 inline-block -rotate-1 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            QUICK START
          </span>
        </h2>
        <p className="text-black/80 font-bold text-lg max-w-2xl mx-auto">
          Jump right in with these popular game setups. One click and you're ready to play! 🎮
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {gameTemplates.map((template, index) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ scale: 1.02, rotate: 0 }}
          >
            <Card
              className={`group cursor-pointer ${template.bgColor} border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-4px] hover:translate-y-[-4px] transition-all overflow-hidden ${index % 2 === 0 ? 'rotate-1' : '-rotate-1'}`}
              onClick={() => handleTemplateClick(template)}
            >
              <CardContent className="p-6 bg-white border-b-4 border-black">
                <div className="flex items-start gap-4">
                  <div className={`w-14 h-14 ${template.iconBg} border-4 border-black flex items-center justify-center text-white flex-shrink-0 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] rotate-6 group-hover:rotate-12 transition-transform`}>
                    {template.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-black text-black text-lg mb-2" style={{ fontFamily: "'Arial Black', sans-serif" }}>
                      {template.title.toUpperCase()}
                    </h3>
                    <p className="text-black/70 font-bold text-sm mb-4">{template.description}</p>
                    <Button
                      size="sm"
                      disabled={selectedTemplate === template.id && createGameMutation.isPending}
                      className="w-full bg-gradient-to-r from-purple-400 to-pink-400 text-white hover:from-purple-500 hover:to-pink-500 border-3 border-black font-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
                      style={{ fontFamily: "'Arial Black', sans-serif" }}
                    >
                      {selectedTemplate === template.id && createGameMutation.isPending
                        ? "CREATING..."
                        : "START NOW"
                      }
                    </Button>
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
        <p className="text-black/60 font-bold text-sm">
          Want more control? Use the main game buttons above to customize your experience ✨
        </p>
      </motion.div>
    </div>
  );
}
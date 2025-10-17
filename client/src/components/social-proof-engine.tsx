import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Play, Music, Heart, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface SocialProofData {
  activeUsers: number;
  gamesCreatedToday: number;
  songsAddedToday: number;
  totalCommunityLists: number;
  recentActivity: Array<{
    id: string;
    type: 'game_created' | 'song_added' | 'list_entry' | 'vote_cast';
    description: string;
    timestamp: Date;
  }>;
}

export function SocialProofEngine() {
  const [currentActivityIndex, setCurrentActivityIndex] = useState(0);
  
  // Fetch real social proof data
  const { data: socialData, isLoading } = useQuery<SocialProofData>({
    queryKey: ['/api/social-proof'],
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  // Rotate through recent activities
  useEffect(() => {
    if (!socialData?.recentActivity.length) return;
    
    const interval = setInterval(() => {
      setCurrentActivityIndex((prev) => 
        (prev + 1) % socialData.recentActivity.length
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [socialData?.recentActivity.length]);

  if (isLoading || !socialData) {
    return (
      <div className="bg-gradient-to-r from-cyan-300 to-purple-300 border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rotate-1">
        <div className="animate-pulse bg-white border-3 border-black p-4">
          <div className="h-4 bg-black/20 w-48 mb-2"></div>
          <div className="h-3 bg-black/10 w-32"></div>
        </div>
      </div>
    );
  }

  const stats = [
    {
      icon: Users,
      value: socialData.activeUsers,
      label: "Active Users",
      bgColor: "bg-blue-300",
      iconColor: "text-blue-700"
    },
    {
      icon: Play,
      value: socialData.gamesCreatedToday,
      label: "Games Today",
      bgColor: "bg-green-300",
      iconColor: "text-green-700"
    },
    {
      icon: Music,
      value: socialData.songsAddedToday,
      label: "Songs Added",
      bgColor: "bg-purple-300",
      iconColor: "text-purple-700"
    },
    {
      icon: Heart,
      value: socialData.totalCommunityLists,
      label: "Community Lists",
      bgColor: "bg-pink-300",
      iconColor: "text-pink-700"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-cyan-300 to-purple-300 border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rotate-1"
    >
      <div className="bg-white border-3 border-black p-4">
        {/* Live Activity Banner */}
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse border-2 border-black"></div>
          <span className="text-sm text-black font-black" style={{ fontFamily: "'Arial Black', sans-serif" }}>LIVE ACTIVITY</span>
          <Badge className="bg-yellow-400 text-black border-2 border-black font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <TrendingUp className="w-3 h-3 mr-1" />
            GROWING
          </Badge>
        </div>

        {/* Rotating Activity Feed */}
        <div className="mb-6 min-h-[2rem] bg-cyan-100 border-2 border-black p-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
          <AnimatePresence mode="wait">
            {socialData.recentActivity.length > 0 && (
              <motion.div
                key={currentActivityIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="text-black font-bold text-sm"
              >
                {socialData.recentActivity[currentActivityIndex]?.description}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              whileHover={{ scale: 1.05, rotate: 0 }}
              className={`text-center ${stat.bgColor} border-3 border-black p-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] rotate-2`}
            >
              <div className="flex items-center justify-center mb-2">
                <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
              </div>
              <div className="text-2xl font-black text-black" style={{ fontFamily: "'Arial Black', sans-serif" }}>
                {stat.value.toLocaleString()}
              </div>
              <div className="text-xs font-bold text-black/70">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
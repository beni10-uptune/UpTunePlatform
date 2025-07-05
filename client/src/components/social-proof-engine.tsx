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
      <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-white/10 rounded-lg p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-white/20 rounded w-48 mb-2"></div>
          <div className="h-3 bg-white/10 rounded w-32"></div>
        </div>
      </div>
    );
  }

  const stats = [
    {
      icon: Users,
      value: socialData.activeUsers,
      label: "Active Users",
      color: "text-blue-400"
    },
    {
      icon: Play,
      value: socialData.gamesCreatedToday,
      label: "Games Today",
      color: "text-green-400"
    },
    {
      icon: Music,
      value: socialData.songsAddedToday,
      label: "Songs Added",
      color: "text-purple-400"
    },
    {
      icon: Heart,
      value: socialData.totalCommunityLists,
      label: "Community Lists",
      color: "text-pink-400"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-white/10 rounded-lg p-6"
    >
      {/* Live Activity Banner */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        <span className="text-sm text-white/80 font-medium">Live Activity</span>
        <Badge variant="secondary" className="bg-white/10 text-white border-white/20">
          <TrendingUp className="w-3 h-3 mr-1" />
          Growing
        </Badge>
      </div>

      {/* Rotating Activity Feed */}
      <div className="mb-6 h-8">
        <AnimatePresence mode="wait">
          {socialData.recentActivity.length > 0 && (
            <motion.div
              key={currentActivityIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="text-white/90 text-sm"
            >
              {socialData.recentActivity[currentActivityIndex]?.description}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <motion.div
            key={stat.label}
            whileHover={{ scale: 1.05 }}
            className="text-center"
          >
            <div className="flex items-center justify-center mb-2">
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <div className="text-lg font-bold text-white">
              {stat.value.toLocaleString()}
            </div>
            <div className="text-xs text-white/60">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Music, Star, Heart, Headphones, Radio, Gift, Target, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: 'engagement' | 'discovery' | 'social' | 'milestone';
  points: number;
  earned: boolean;
  progress: number;
  maxProgress: number;
  unlockedAt?: Date;
}

// Mock achievements data - will be replaced with real user data
const mockAchievements: Achievement[] = [
  {
    id: 'first-song',
    title: 'First Note',
    description: 'Add your first song to a playlist',
    icon: <Music className="w-5 h-5" />,
    category: 'milestone',
    points: 10,
    earned: true,
    progress: 1,
    maxProgress: 1,
    unlockedAt: new Date()
  },
  {
    id: 'playlist-creator',
    title: 'Playlist Pioneer',
    description: 'Create 5 different playlists',
    icon: <Headphones className="w-5 h-5" />,
    category: 'engagement',
    points: 50,
    earned: false,
    progress: 3,
    maxProgress: 5
  },
  {
    id: 'community-champion',
    title: 'Community Voice',
    description: 'Vote on 20 community list entries',
    icon: <Heart className="w-5 h-5" />,
    category: 'social',
    points: 30,
    earned: false,
    progress: 12,
    maxProgress: 20
  },
  {
    id: 'genre-explorer',
    title: 'Genre Explorer',
    description: 'Add songs from 10 different genres',
    icon: <Radio className="w-5 h-5" />,
    category: 'discovery',
    points: 40,
    earned: false,
    progress: 7,
    maxProgress: 10
  },
  {
    id: 'story-teller',
    title: 'Musical Storyteller',
    description: 'Write stories for 10 songs',
    icon: <Star className="w-5 h-5" />,
    category: 'engagement',
    points: 60,
    earned: false,
    progress: 4,
    maxProgress: 10
  },
  {
    id: 'early-bird',
    title: 'Early Bird',
    description: 'Play 7 days in a row',
    icon: <Zap className="w-5 h-5" />,
    category: 'milestone',
    points: 100,
    earned: false,
    progress: 3,
    maxProgress: 7
  }
];

export function AchievementSystem() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'engagement' | 'discovery' | 'social' | 'milestone'>('all');
  const [showUnlockedAnimation, setShowUnlockedAnimation] = useState<string | null>(null);

  const filteredAchievements = selectedCategory === 'all' 
    ? mockAchievements 
    : mockAchievements.filter(a => a.category === selectedCategory);

  const totalPoints = mockAchievements
    .filter(a => a.earned)
    .reduce((sum, a) => sum + a.points, 0);

  const categoryIcons = {
    engagement: <Target className="w-4 h-4" />,
    discovery: <Radio className="w-4 h-4" />,
    social: <Heart className="w-4 h-4" />,
    milestone: <Trophy className="w-4 h-4" />
  };

  const categoryColors = {
    engagement: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30',
    discovery: 'from-purple-500/20 to-pink-500/20 border-purple-500/30',
    social: 'from-rose-500/20 to-pink-500/20 border-rose-500/30',
    milestone: 'from-yellow-500/20 to-amber-500/20 border-yellow-500/30'
  };

  return (
    <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-white/10">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Gift className="w-6 h-6 text-purple-400" />
            <CardTitle className="text-white">Your Musical Journey</CardTitle>
          </div>
          <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 px-4 py-1">
            <Trophy className="w-4 h-4 mr-1" />
            {totalPoints} Points
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={selectedCategory} onValueChange={(v) => setSelectedCategory(v as any)}>
          <TabsList className="bg-white/10 w-full grid grid-cols-5">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="engagement">Engage</TabsTrigger>
            <TabsTrigger value="discovery">Discover</TabsTrigger>
            <TabsTrigger value="social">Social</TabsTrigger>
            <TabsTrigger value="milestone">Milestone</TabsTrigger>
          </TabsList>

          <TabsContent value={selectedCategory} className="mt-6 space-y-4">
            {filteredAchievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative bg-gradient-to-r ${categoryColors[achievement.category]} backdrop-blur-sm rounded-lg p-4 border transition-all ${
                  achievement.earned ? 'opacity-100' : 'opacity-70'
                }`}
              >
                {achievement.earned && (
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                      Earned!
                    </Badge>
                  </div>
                )}

                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    achievement.earned 
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600' 
                      : 'bg-white/10'
                  }`}>
                    {achievement.icon}
                  </div>

                  <div className="flex-1">
                    <h4 className="text-white font-semibold mb-1">{achievement.title}</h4>
                    <p className="text-white/70 text-sm mb-3">{achievement.description}</p>
                    
                    {!achievement.earned && (
                      <div>
                        <div className="flex justify-between text-xs text-white/60 mb-1">
                          <span>Progress</span>
                          <span>{achievement.progress} / {achievement.maxProgress}</span>
                        </div>
                        <Progress 
                          value={(achievement.progress / achievement.maxProgress) * 100} 
                          className="h-2 bg-white/10"
                        />
                      </div>
                    )}

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2">
                        {categoryIcons[achievement.category]}
                        <span className="text-xs text-white/60 capitalize">{achievement.category}</span>
                      </div>
                      <Badge className="bg-white/10 text-white border-white/20">
                        +{achievement.points} pts
                      </Badge>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </TabsContent>
        </Tabs>

        {/* Motivation Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-center p-4 bg-white/5 rounded-lg"
        >
          <p className="text-white/80 text-sm">
            Keep exploring and sharing music to unlock more achievements!
          </p>
        </motion.div>
      </CardContent>
    </Card>
  );
}
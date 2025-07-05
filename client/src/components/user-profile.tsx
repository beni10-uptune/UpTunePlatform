import { useState } from "react";
import { motion } from "framer-motion";
import { User, Music, Trophy, Heart, Calendar, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { AchievementSystem } from "./achievement-system";

interface UserStats {
  songsAdded: number;
  playlistsCreated: number;
  gamesPlayed: number;
  votesGiven: number;
  daysActive: number;
  favoriteGenre: string;
  totalPoints: number;
  level: number;
}

// Mock user data - will be replaced with real data
const mockUserStats: UserStats = {
  songsAdded: 142,
  playlistsCreated: 18,
  gamesPlayed: 24,
  votesGiven: 87,
  daysActive: 15,
  favoriteGenre: "Indie Rock",
  totalPoints: 850,
  level: 7
};

export function UserProfile() {
  const [showAchievements, setShowAchievements] = useState(false);
  
  const nextLevelPoints = (mockUserStats.level + 1) * 150;
  const currentLevelProgress = (mockUserStats.totalPoints % 150) / 150 * 100;

  const stats = [
    { icon: <Music className="w-4 h-4" />, label: "Songs Added", value: mockUserStats.songsAdded },
    { icon: <Heart className="w-4 h-4" />, label: "Votes Given", value: mockUserStats.votesGiven },
    { icon: <Trophy className="w-4 h-4" />, label: "Games Played", value: mockUserStats.gamesPlayed },
    { icon: <Calendar className="w-4 h-4" />, label: "Days Active", value: mockUserStats.daysActive }
  ];

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-white/10">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <CardTitle className="text-white text-2xl">Musical Explorer</CardTitle>
                <p className="text-white/70">Level {mockUserStats.level} • {mockUserStats.favoriteGenre} Enthusiast</p>
              </div>
            </div>
            <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 px-4 py-2">
              <Trophy className="w-4 h-4 mr-1" />
              {mockUserStats.totalPoints} Points
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {/* Level Progress */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-white/60 mb-2">
              <span>Level {mockUserStats.level}</span>
              <span>{Math.floor(currentLevelProgress)}% to Level {mockUserStats.level + 1}</span>
            </div>
            <Progress value={currentLevelProgress} className="h-2 bg-white/10" />
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 rounded-lg p-4 text-center"
              >
                <div className="flex justify-center mb-2 text-purple-400">
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-white/60">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Musical Journey Stats */}
          <div className="mt-6 p-4 bg-white/5 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-400" />
                <span className="text-white font-semibold">Your Musical Journey</span>
              </div>
              <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                Growing
              </Badge>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-white/80">
                <span>Playlists Created</span>
                <span className="font-semibold">{mockUserStats.playlistsCreated}</span>
              </div>
              <div className="flex justify-between text-white/80">
                <span>Musical Diversity</span>
                <span className="font-semibold">8 Genres Explored</span>
              </div>
              <div className="flex justify-between text-white/80">
                <span>Community Impact</span>
                <span className="font-semibold">Top 15% Contributor</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-6">
            <Button
              onClick={() => setShowAchievements(!showAchievements)}
              className="flex-1 bg-white/10 hover:bg-white/20 text-white border border-white/20"
            >
              {showAchievements ? "Hide" : "View"} Achievements
            </Button>
            <Button className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700">
              Share Profile
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Achievements Section */}
      {showAchievements && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <AchievementSystem />
        </motion.div>
      )}
    </div>
  );
}
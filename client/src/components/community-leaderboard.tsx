import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Trophy, Star, Music, TrendingUp, Crown, Medal } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface LeaderboardEntry {
  id: string;
  name: string;
  score: number;
  songsAdded?: number;
  gamesPlayed?: number;
  votesReceived?: number;
  avatar?: string;
  rank: number;
}

export function CommunityLeaderboard() {
  const [timeframe, setTimeframe] = useState<'today' | 'week' | 'month' | 'all'>('week');

  // Mock data for now - will be replaced with real API
  const leaderboardData: LeaderboardEntry[] = [
    { id: '1', name: 'MusicLover23', score: 1250, songsAdded: 48, gamesPlayed: 15, votesReceived: 156, rank: 1 },
    { id: '2', name: 'VinylVibes', score: 1180, songsAdded: 42, gamesPlayed: 12, votesReceived: 142, rank: 2 },
    { id: '3', name: 'BeatMaster', score: 1050, songsAdded: 38, gamesPlayed: 10, votesReceived: 128, rank: 3 },
    { id: '4', name: 'SoulSeeker', score: 920, songsAdded: 35, gamesPlayed: 8, votesReceived: 115, rank: 4 },
    { id: '5', name: 'GrooveGuru', score: 880, songsAdded: 32, gamesPlayed: 9, votesReceived: 108, rank: 5 },
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-5 h-5 text-yellow-400" />;
      case 2:
        return <Medal className="w-5 h-5 text-gray-400" />;
      case 3:
        return <Medal className="w-5 h-5 text-amber-600" />;
      default:
        return <span className="text-white/60 font-medium">#{rank}</span>;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "from-yellow-500/20 to-amber-500/20 border-yellow-500/30";
      case 2:
        return "from-gray-400/20 to-slate-400/20 border-gray-400/30";
      case 3:
        return "from-amber-600/20 to-orange-600/20 border-amber-600/30";
      default:
        return "from-purple-500/10 to-pink-500/10 border-white/10";
    }
  };

  return (
    <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-white/10">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Trophy className="w-6 h-6 text-yellow-400" />
            <CardTitle className="text-white">Community Champions</CardTitle>
          </div>
          <Tabs value={timeframe} onValueChange={(v) => setTimeframe(v as any)} className="w-auto">
            <TabsList className="bg-white/10">
              <TabsTrigger value="today" className="text-xs">Today</TabsTrigger>
              <TabsTrigger value="week" className="text-xs">Week</TabsTrigger>
              <TabsTrigger value="month" className="text-xs">Month</TabsTrigger>
              <TabsTrigger value="all" className="text-xs">All Time</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {leaderboardData.map((entry, index) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-gradient-to-r ${getRankColor(entry.rank)} backdrop-blur-sm rounded-lg p-4 border transition-all hover:scale-[1.02]`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 flex items-center justify-center">
                  {getRankIcon(entry.rank)}
                </div>
                <div>
                  <h4 className="text-white font-semibold">{entry.name}</h4>
                  <div className="flex gap-3 text-xs text-white/60 mt-1">
                    <span className="flex items-center gap-1">
                      <Music className="w-3 h-3" />
                      {entry.songsAdded} songs
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      {entry.votesReceived} votes
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-white">{entry.score.toLocaleString()}</div>
                <Badge className="bg-white/10 text-white border-white/20 text-xs">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  Points
                </Badge>
              </div>
            </div>
            
            {entry.rank <= 3 && (
              <div className="mt-3">
                <div className="flex justify-between text-xs text-white/60 mb-1">
                  <span>Progress to next level</span>
                  <span>{Math.floor((entry.score % 1000) / 10)}%</span>
                </div>
                <Progress 
                  value={Math.floor((entry.score % 1000) / 10)} 
                  className="h-1.5 bg-white/10"
                />
              </div>
            )}
          </motion.div>
        ))}

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center pt-4 border-t border-white/10"
        >
          <p className="text-white/60 text-sm mb-2">Join the community and climb the ranks!</p>
          <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0">
            <Music className="w-3 h-3 mr-1" />
            Add songs to earn points
          </Badge>
        </motion.div>
      </CardContent>
    </Card>
  );
}
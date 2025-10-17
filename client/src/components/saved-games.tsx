import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { Music, Users, Calendar, ExternalLink, Clock } from "lucide-react";
import { format } from "date-fns";
import { useAuth } from "@/hooks/useAuth";

const GAME_TYPE_NAMES = {
  'jam-sessions': 'Jam Session',
  'desert-island': 'Desert Island Discs',
  'guess-who': 'Guess Who'
} as const;

export function SavedGames() {
  const [, setLocation] = useLocation();
  const { isAuthenticated } = useAuth();
  
  const { data: savedGames = [], isLoading } = useQuery<any[]>({
    queryKey: ['/api/user/games'],
    enabled: isAuthenticated,
  });

  if (!isAuthenticated) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="bg-gradient-to-r from-cyan-300 to-purple-300 border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rotate-1">
        <div className="animate-pulse bg-white border-3 border-black p-4">
          <div className="h-4 bg-black/20 w-48 mb-2"></div>
          <div className="h-3 bg-black/10 w-32"></div>
        </div>
      </div>
    );
  }

  if (!savedGames || (savedGames as any[]).length === 0) {
    return (
      <Card className="bg-gradient-to-br from-yellow-300 to-pink-300 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] -rotate-1">
        <CardHeader className="bg-white border-b-4 border-black">
          <CardTitle className="text-black font-black text-2xl" style={{ fontFamily: "'Arial Black', sans-serif" }}>
            YOUR SAVED GAMES
          </CardTitle>
          <CardDescription className="text-black/80 font-bold text-base">
            Games you create while signed in are automatically saved here 💾
          </CardDescription>
        </CardHeader>
        <CardContent className="bg-white pt-6">
          <p className="text-black/60 font-bold text-center py-4">
            No saved games yet. Create a game to see it here! 🎮
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-green-300 to-cyan-300 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rotate-1">
      <CardHeader className="bg-white border-b-4 border-black">
        <CardTitle className="text-black font-black text-2xl flex items-center gap-3" style={{ fontFamily: "'Arial Black', sans-serif" }}>
          <div className="w-10 h-10 bg-cyan-400 border-4 border-black flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] rotate-6">
            <Clock className="w-5 h-5 text-white" />
          </div>
          YOUR SAVED GAMES
        </CardTitle>
        <CardDescription className="text-black/80 font-bold text-base">
          Jump back into any of your past musical experiences 🎵
        </CardDescription>
      </CardHeader>
      <CardContent className="bg-white pt-6">
        <div className="space-y-4">
          {savedGames.map((game: any, index: number) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card
                className={`bg-gradient-to-br from-yellow-200 to-pink-200 hover:from-yellow-300 hover:to-pink-300 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all cursor-pointer group ${index % 2 === 0 ? 'rotate-1' : '-rotate-1'}`}
                onClick={() => setLocation(`/room/${game.code}`)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <h3 className="font-black text-black text-lg group-hover:scale-105 transition-transform" style={{ fontFamily: "'Arial Black', sans-serif" }}>
                          {game.theme.toUpperCase()}
                        </h3>
                        <span className="text-xs px-2 py-1 bg-purple-400 text-white border-2 border-black font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                          {GAME_TYPE_NAMES[game.gameType as keyof typeof GAME_TYPE_NAMES] || game.gameType}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-black/70 font-bold flex-wrap">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {format(new Date(game.createdAt), 'MMM d, yyyy')}
                        </span>
                        <span className="flex items-center gap-1">
                          <Music className="w-3 h-3" />
                          Room: {game.code}
                        </span>
                        {game.isActive && (
                          <span className="px-2 py-0.5 bg-green-400 text-white border-2 border-black font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                            ACTIVE
                          </span>
                        )}
                      </div>
                    </div>
                    <Button
                      size="sm"
                      className="bg-cyan-400 hover:bg-cyan-500 text-white border-3 border-black font-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all opacity-0 group-hover:opacity-100"
                      onClick={(e) => {
                        e.stopPropagation();
                        setLocation(`/room/${game.code}`);
                      }}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
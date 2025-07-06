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
      <div className="text-white/60 text-center py-8">
        Loading your saved games...
      </div>
    );
  }

  if (!savedGames || (savedGames as any[]).length === 0) {
    return (
      <Card className="bg-white/10 backdrop-blur-lg border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Your Saved Games</CardTitle>
          <CardDescription className="text-white/70">
            Games you create while signed in are automatically saved here
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-white/60 text-center py-4">
            No saved games yet. Create a game to see it here!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/10 backdrop-blur-lg border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Your Saved Games
        </CardTitle>
        <CardDescription className="text-white/70">
          Jump back into any of your past musical experiences
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {savedGames.map((game: any, index: number) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card 
                className="bg-white/5 hover:bg-white/10 border-white/10 transition-all cursor-pointer group"
                onClick={() => setLocation(`/room/${game.code}`)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-white group-hover:text-purple-300 transition-colors">
                          {game.theme}
                        </h3>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-purple-600/20 text-purple-300">
                          {GAME_TYPE_NAMES[game.gameType as keyof typeof GAME_TYPE_NAMES] || game.gameType}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-white/60">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {format(new Date(game.createdAt), 'MMM d, yyyy')}
                        </span>
                        <span className="flex items-center gap-1">
                          <Music className="w-3 h-3" />
                          Room: {game.code}
                        </span>
                        {game.isActive && (
                          <span className="text-green-400">Active</span>
                        )}
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-white/70 hover:text-white hover:bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"
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
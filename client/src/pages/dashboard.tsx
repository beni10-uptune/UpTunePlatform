import { useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Users, Clock, Music, Trophy, Play, Calendar, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

interface GameRoom {
  id: number;
  code: string;
  gameType: string;
  theme: string;
  hostNickname: string;
  userId?: string;
  isActive: boolean;
  createdAt: string;
  playerCount: number;
  songCount: number;
}

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const { user, isAuthenticated, isLoading } = useAuth();
  const { toast } = useToast();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Sign In Required",
        description: "Please sign in to access your dashboard",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 1000);
    }
  }, [isAuthenticated, isLoading, toast]);

  const { data: gameRooms = [], isLoading: isLoadingRooms, error: gameRoomsError } = useQuery({
    queryKey: ["/api/user/game-rooms"],
    enabled: isAuthenticated,
    retry: false,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-16 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-16">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-6">
            {user?.profileImageUrl ? (
              <img 
                src={user.profileImageUrl} 
                alt="Profile" 
                className="w-16 h-16 rounded-full object-cover border-2 border-purple-400"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                <Users className="w-8 h-8 text-white" />
              </div>
            )}
            <div>
              <h1 className="text-3xl font-bold text-white">
                Welcome back, {user?.firstName || user?.email?.split('@')[0] || 'Music Lover'}!
              </h1>
              <p className="text-white/70">Your musical journey continues here</p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-1"
          >
            <Card className="bg-gradient-to-br from-slate-900/80 via-purple-900/80 to-slate-900/80 backdrop-blur-xl border border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Play className="w-5 h-5 text-purple-400" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700"
                  onClick={() => setLocation('/')}
                >
                  <Play className="w-4 h-4 mr-2" />
                  Start New Game
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full border-white/20 text-white hover:bg-white/10"
                  onClick={() => setLocation('/journeys')}
                >
                  <Music className="w-4 h-4 mr-2" />
                  Explore Journeys
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full border-white/20 text-white hover:bg-white/10"
                  onClick={() => setLocation('/community-lists')}
                >
                  <Trophy className="w-4 h-4 mr-2" />
                  Have Your Say
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Your Games */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="bg-gradient-to-br from-slate-900/80 via-purple-900/80 to-slate-900/80 backdrop-blur-xl border border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Users className="w-5 h-5 text-purple-400" />
                  Your Game Rooms
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoadingRooms ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-400"></div>
                    <span className="ml-3 text-white/80">Loading your games...</span>
                  </div>
                ) : Array.isArray(gameRooms) && gameRooms.length > 0 ? (
                  <div className="space-y-4">
                    {gameRooms.slice(0, 5).map((room: GameRoom, index: number) => (
                      <motion.div
                        key={room.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10 hover:border-purple-400/50 transition-all group cursor-pointer"
                        onClick={() => setLocation(`/room/${room.code}`)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0">
                                {room.code}
                              </Badge>
                              <Badge 
                                variant="outline" 
                                className={`border-white/20 text-white ${
                                  room.isActive ? 'bg-green-600/20 border-green-400/40' : 'bg-white/5'
                                }`}
                              >
                                {room.isActive ? 'Active' : 'Completed'}
                              </Badge>
                            </div>
                            <h3 className="font-semibold text-white group-hover:text-purple-300 transition-colors">
                              {room.theme}
                            </h3>
                            <p className="text-white/60 text-sm capitalize">
                              {room.gameType.replace('-', ' ')} • {room.hostNickname}
                            </p>
                          </div>
                          <div className="text-right text-white/60">
                            <div className="flex items-center gap-2 text-sm">
                              <Clock className="w-4 h-4" />
                              {new Date(room.createdAt).toLocaleDateString()}
                            </div>
                            {room.playerCount > 0 && (
                              <div className="flex items-center gap-2 text-sm mt-1">
                                <Users className="w-4 h-4" />
                                {room.playerCount} players
                              </div>
                            )}
                            {room.songCount > 0 && (
                              <div className="flex items-center gap-2 text-sm mt-1">
                                <Music className="w-4 h-4" />
                                {room.songCount} songs
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    
                    {Array.isArray(gameRooms) && gameRooms.length > 5 && (
                      <div className="text-center pt-4">
                        <p className="text-white/60 text-sm">
                          Showing 5 of {gameRooms.length} games
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-white/5 rounded-xl">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">No games yet</h3>
                    <p className="text-white/70 mb-6 max-w-md mx-auto">
                      Start your first musical journey! Create a game and invite friends to discover music together.
                    </p>
                    <Button 
                      className="bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-lg"
                      onClick={() => setLocation('/')}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Create Your First Game
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6"
        >
          <Card className="bg-gradient-to-br from-slate-900/80 via-purple-900/80 to-slate-900/80 backdrop-blur-xl border border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <TrendingUp className="w-5 h-5 text-purple-400" />
                Your Musical Impact
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center bg-white/5 rounded-lg p-4">
                  <div className="text-3xl font-bold text-white mb-2">
                    {Array.isArray(gameRooms) ? gameRooms.length : 0}
                  </div>
                  <p className="text-white/80">Games Created</p>
                </div>
                <div className="text-center bg-white/5 rounded-lg p-4">
                  <div className="text-3xl font-bold text-green-400 mb-2">
                    {Array.isArray(gameRooms) ? gameRooms.filter((room: GameRoom) => room.isActive).length : 0}
                  </div>
                  <p className="text-white/80">Active Games</p>
                </div>
                <div className="text-center bg-white/5 rounded-lg p-4">
                  <div className="text-3xl font-bold text-purple-400 mb-2">
                    {Array.isArray(gameRooms) ? gameRooms.reduce((total: number, room: GameRoom) => total + (room.songCount || 0), 0) : 0}
                  </div>
                  <p className="text-white/80">Songs Shared</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
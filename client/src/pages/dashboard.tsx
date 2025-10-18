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
      <div className="min-h-screen bg-gradient-to-br from-yellow-200 via-pink-200 to-cyan-200 pt-16 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-200 via-pink-200 to-cyan-200 pt-16">
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
                className="w-16 h-16 rounded-full object-cover border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center">
                <Users className="w-8 h-8 text-white" />
              </div>
            )}
            <div>
              <h1 className="text-3xl font-black text-black" style={{ fontFamily: "'Arial Black', sans-serif" }}>
                Welcome back, {user?.firstName || user?.email?.split('@')[0] || 'Music Lover'}!
              </h1>
              <p className="text-black/70 font-bold">Your musical journey continues here</p>
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
            <Card className="bg-gradient-to-br from-cyan-300 to-purple-300 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rotate-1">
              <CardHeader className="bg-white border-b-4 border-black">
                <CardTitle className="flex items-center gap-2 text-black font-black" style={{ fontFamily: "'Arial Black', sans-serif" }}>
                  <Play className="w-5 h-5 text-black" />
                  QUICK ACTIONS
                </CardTitle>
              </CardHeader>
              <CardContent className="bg-white space-y-3 pt-6">
                <Button
                  className="w-full bg-gradient-to-r from-purple-400 to-pink-400 text-white hover:from-purple-500 hover:to-pink-500 font-black border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
                  onClick={() => setLocation('/')}
                  style={{ fontFamily: "'Arial Black', sans-serif" }}
                >
                  <Play className="w-4 h-4 mr-2" />
                  START NEW GAME
                </Button>
                <Button
                  className="w-full bg-cyan-300 hover:bg-cyan-400 text-black font-black border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
                  onClick={() => setLocation('/discover')}
                  style={{ fontFamily: "'Arial Black', sans-serif" }}
                >
                  <Music className="w-4 h-4 mr-2" />
                  EXPLORE JOURNEYS
                </Button>
                <Button
                  className="w-full bg-yellow-300 hover:bg-yellow-400 text-black font-black border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
                  onClick={() => setLocation('/discover/lists')}
                  style={{ fontFamily: "'Arial Black', sans-serif" }}
                >
                  <Trophy className="w-4 h-4 mr-2" />
                  HAVE YOUR SAY
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
            <Card className="bg-gradient-to-br from-pink-300 to-yellow-300 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] -rotate-1">
              <CardHeader className="bg-white border-b-4 border-black">
                <CardTitle className="flex items-center gap-2 text-black font-black" style={{ fontFamily: "'Arial Black', sans-serif" }}>
                  <Users className="w-5 h-5 text-black" />
                  YOUR GAME ROOMS
                </CardTitle>
              </CardHeader>
              <CardContent className="bg-white pt-6">
                {isLoadingRooms ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-6 w-6 border-4 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"></div>
                    <span className="ml-3 text-black/80 font-bold">Loading your games...</span>
                  </div>
                ) : Array.isArray(gameRooms) && gameRooms.length > 0 ? (
                  <div className="space-y-4">
                    {gameRooms.slice(0, 5).map((room: GameRoom, index: number) => (
                      <motion.div
                        key={room.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="bg-gradient-to-r from-cyan-200 to-pink-200 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all p-4 group cursor-pointer"
                        onClick={() => setLocation(`/room/${room.code}`)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <Badge className="bg-gradient-to-r from-purple-400 to-pink-400 text-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-bold">
                                {room.code}
                              </Badge>
                              <Badge
                                className={`border-2 border-black font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${
                                  room.isActive ? 'bg-green-300 text-black' : 'bg-gray-300 text-black'
                                }`}
                              >
                                {room.isActive ? 'Active' : 'Completed'}
                              </Badge>
                            </div>
                            <h3 className="font-black text-black" style={{ fontFamily: "'Arial Black', sans-serif" }}>
                              {room.theme}
                            </h3>
                            <p className="text-black/70 text-sm capitalize font-bold">
                              {room.gameType.replace('-', ' ')} • {room.hostNickname}
                            </p>
                          </div>
                          <div className="text-right text-black/70">
                            <div className="flex items-center gap-2 text-sm font-bold">
                              <Clock className="w-4 h-4" />
                              {new Date(room.createdAt).toLocaleDateString()}
                            </div>
                            {room.playerCount > 0 && (
                              <div className="flex items-center gap-2 text-sm mt-1 font-bold">
                                <Users className="w-4 h-4" />
                                {room.playerCount} players
                              </div>
                            )}
                            {room.songCount > 0 && (
                              <div className="flex items-center gap-2 text-sm mt-1 font-bold">
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
                        <p className="text-black/70 text-sm font-bold">
                          Showing 5 of {gameRooms.length} games
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-gradient-to-br from-yellow-200 to-pink-200 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-full flex items-center justify-center mx-auto mb-6">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-black text-black mb-3" style={{ fontFamily: "'Arial Black', sans-serif" }}>NO GAMES YET</h3>
                    <p className="text-black/70 font-bold mb-6 max-w-md mx-auto">
                      Start your first musical journey! Create a game and invite friends to discover music together.
                    </p>
                    <Button
                      className="bg-gradient-to-r from-purple-400 to-pink-400 text-white hover:from-purple-500 hover:to-pink-500 font-black border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
                      onClick={() => setLocation('/')}
                      style={{ fontFamily: "'Arial Black', sans-serif" }}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      CREATE YOUR FIRST GAME
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
          <Card className="bg-gradient-to-br from-yellow-300 to-cyan-300 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rotate-1">
            <CardHeader className="bg-white border-b-4 border-black">
              <CardTitle className="flex items-center gap-2 text-black font-black" style={{ fontFamily: "'Arial Black', sans-serif" }}>
                <TrendingUp className="w-5 h-5 text-black" />
                YOUR MUSICAL IMPACT
              </CardTitle>
            </CardHeader>
            <CardContent className="bg-white pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center bg-gradient-to-br from-purple-300 to-pink-300 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4">
                  <div className="text-3xl font-black text-black mb-2" style={{ fontFamily: "'Arial Black', sans-serif" }}>
                    {Array.isArray(gameRooms) ? gameRooms.length : 0}
                  </div>
                  <p className="text-black/80 font-bold">Games Created</p>
                </div>
                <div className="text-center bg-gradient-to-br from-green-300 to-cyan-300 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4">
                  <div className="text-3xl font-black text-black mb-2" style={{ fontFamily: "'Arial Black', sans-serif" }}>
                    {Array.isArray(gameRooms) ? gameRooms.filter((room: GameRoom) => room.isActive).length : 0}
                  </div>
                  <p className="text-black/80 font-bold">Active Games</p>
                </div>
                <div className="text-center bg-gradient-to-br from-yellow-300 to-pink-300 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4">
                  <div className="text-3xl font-black text-black mb-2" style={{ fontFamily: "'Arial Black', sans-serif" }}>
                    {Array.isArray(gameRooms) ? gameRooms.reduce((total: number, room: GameRoom) => total + (room.songCount || 0), 0) : 0}
                  </div>
                  <p className="text-black/80 font-bold">Songs Shared</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
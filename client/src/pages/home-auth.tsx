import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { User, LogOut, Music, Users, Heart, ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function HomeAuth() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-16">
      <div className="max-w-6xl mx-auto p-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            {user?.profileImageUrl && (
              <img 
                src={user.profileImageUrl} 
                alt="Profile" 
                className="w-16 h-16 rounded-full object-cover border-2 border-purple-400"
              />
            )}
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                Welcome back, {user?.firstName || 'Music Lover'}!
              </h1>
              <p className="text-white/70 text-lg">
                Ready to create some amazing musical moments?
              </p>
            </div>
          </div>
          
          <div className="flex justify-center gap-4 mb-8">
            <Button 
              onClick={() => window.location.href = '/api/logout'}
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="bg-white/10 backdrop-blur-lg border border-white/20 h-full hover:bg-white/15 transition-all duration-300">
              <CardHeader className="text-center">
                <Music className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <CardTitle className="text-white">Start a Game</CardTitle>
                <CardDescription className="text-white/70">
                  Create collaborative playlists with friends through fun games
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Link href="/games">
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                    Create Game
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="bg-white/10 backdrop-blur-lg border border-white/20 h-full hover:bg-white/15 transition-all duration-300">
              <CardHeader className="text-center">
                <Users className="w-12 h-12 text-pink-400 mx-auto mb-4" />
                <CardTitle className="text-white">Community Playlists</CardTitle>
                <CardDescription className="text-white/70">
                  Vote on songs and build community-curated collections
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Link href="/community-lists">
                  <Button className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white">
                    Browse Lists
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Card className="bg-white/10 backdrop-blur-lg border border-white/20 h-full hover:bg-white/15 transition-all duration-300">
              <CardHeader className="text-center">
                <Heart className="w-12 h-12 text-red-400 mx-auto mb-4" />
                <CardTitle className="text-white">Musical Journeys</CardTitle>
                <CardDescription className="text-white/70">
                  Explore immersive stories about music history and culture
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Link href="/journeys">
                  <Button className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white">
                    Explore Journeys
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <p className="text-white/60 text-lg">
            Welcome to your musical connected paradise. What will you create today?
          </p>
        </motion.div>
      </div>
    </div>
  );
}
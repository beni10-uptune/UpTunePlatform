import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Music, Users, Heart, ArrowRight } from "lucide-react";

export default function LandingAuth() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-white mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Welcome to Uptune
          </h1>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Transform music into a social experience. Create collaborative playlists, join musical journeys, and connect with a community that shares your passion for great music.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="bg-white/10 backdrop-blur-lg border border-white/20 h-full">
              <CardHeader className="text-center">
                <Music className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <CardTitle className="text-white">Collaborative Games</CardTitle>
                <CardDescription className="text-white/70">
                  Create themed playlists together through fun, interactive games
                </CardDescription>
              </CardHeader>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="bg-white/10 backdrop-blur-lg border border-white/20 h-full">
              <CardHeader className="text-center">
                <Users className="w-12 h-12 text-pink-400 mx-auto mb-4" />
                <CardTitle className="text-white">Community Playlists</CardTitle>
                <CardDescription className="text-white/70">
                  Vote on songs and build the ultimate community-curated collections
                </CardDescription>
              </CardHeader>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Card className="bg-white/10 backdrop-blur-lg border border-white/20 h-full">
              <CardHeader className="text-center">
                <Heart className="w-12 h-12 text-red-400 mx-auto mb-4" />
                <CardTitle className="text-white">Musical Journeys</CardTitle>
                <CardDescription className="text-white/70">
                  Explore immersive stories about music history and culture
                </CardDescription>
              </CardHeader>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <Button 
            onClick={() => window.location.href = '/api/login'}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
          >
            Get Started
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          <p className="text-white/60 mt-4 text-sm">
            Sign in with your Replit account to join the musical community
          </p>
        </motion.div>
      </div>
    </div>
  );
}
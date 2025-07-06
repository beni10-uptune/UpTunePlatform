import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Play, Music, Calendar, MapPin, Users, Headphones, Star } from "lucide-react";
import { motion } from "framer-motion";
import type { Journey } from "@shared/schema";

const movementColors = {
  'disco': 'from-purple-600 to-pink-600',
  'acid-house': 'from-yellow-500 to-pink-600', 
  'berlin': 'from-gray-600 to-blue-600',
  'detroit': 'from-orange-600 to-red-600',
  'madchester': 'from-blue-600 to-cyan-600'
};

const getMovementColor = (slug: string) => {
  if (slug.includes('disco')) return movementColors.disco;
  if (slug.includes('acid')) return movementColors['acid-house'];
  if (slug.includes('berlin')) return movementColors.berlin;
  if (slug.includes('detroit')) return movementColors.detroit;
  if (slug.includes('madchester')) return movementColors.madchester;
  return 'from-purple-600 to-indigo-600';
};

export default function JourneysPage() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  
  const { data: journeys = [], isLoading } = useQuery<Journey[]>({
    queryKey: ['/api/journeys'],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="text-center">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full mx-auto mb-6"
          />
          <p className="text-white/80 text-xl">Loading musical journeys...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10"></div>
      </div>
      
      {/* Navigation */}
      <nav className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost" className="text-white hover:bg-white/10">
              ← Back to Uptune
            </Button>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/community-lists">
              <Button variant="ghost" className="text-white hover:bg-white/10">
                Community Lists
              </Button>
            </Link>
            <Link href="/">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:opacity-90 border-0">
                Create Game
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Header */}
      <header className="relative z-10 px-6 md:px-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto text-center"
        >
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Music className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">When music connects people and changes societies</h1>
              <p className="text-purple-200 text-sm">Stories Worth Telling</p>
            </div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              When music connects people and changes societies—
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                these are the stories that matter
              </span>
            </h2>
            <p className="text-xl text-white/80 leading-relaxed">
              In the shadows of mainstream culture, in the forgotten corners of decaying cities, 
              revolutionary movements are born. These are stories of resistance and rebellion, 
              of communities creating beauty from chaos.
            </p>
          </motion.div>
        </motion.div>
      </header>

      {/* Featured Journeys */}
      <section className="relative z-10 px-6 md:px-8 pb-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {journeys.map((journey: Journey, index: number) => (
              <motion.div
                key={journey.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                onHoverStart={() => setHoveredId(journey.id)}
                onHoverEnd={() => setHoveredId(null)}
                className="group"
              >
                <Card className="bg-white/10 backdrop-blur-lg border-white/20 overflow-hidden hover:bg-white/20 transition-all duration-500 h-full">
                  <div className="relative">
                    <div 
                      className="h-48 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                      style={{ backgroundImage: `url(${journey.headlineImageUrl})` }}
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${getMovementColor(journey.slug)} opacity-60 group-hover:opacity-40 transition-opacity duration-300`} />
                    
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-white/20 text-white border-white/30 backdrop-blur">
                        <Star className="w-4 h-4 mr-1" />
                        Featured
                      </Badge>
                    </div>
                    
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-2xl font-bold text-white mb-1 leading-tight">
                        {journey.title.split(' - ')[0]}
                      </h3>
                      <p className="text-white/80 text-sm font-medium">
                        {journey.title.split(' - ')[1]}
                      </p>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <p className="text-white/70 mb-6 leading-relaxed line-clamp-3">
                      {journey.introduction}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-white/60">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>Community</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Headphones className="w-4 h-4" />
                          <span>Immersive</span>
                        </div>
                      </div>
                      
                      <Link href={`/journeys/${journey.slug}`}>
                        <Button 
                          size="sm" 
                          className={`bg-gradient-to-r ${getMovementColor(journey.slug)} text-white border-0 hover:scale-105 transition-transform duration-200`}
                        >
                          <Play className="w-4 h-4 mr-2" />
                          Explore
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {journeys.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Music className="w-16 h-16 text-white/40 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">No Journeys Available</h3>
              <p className="text-white/60">Musical journeys are being crafted. Check back soon!</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative z-10 px-6 md:px-8 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to discover how music changed the world?
            </h3>
            <p className="text-white/70 mb-6">
              Each journey reveals how underground movements became cultural earthquakes, 
              reshaping society through the power of sound and community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
                <Music className="w-5 h-5 mr-2" />
                Start Your Journey
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Users className="w-5 h-5 mr-2" />
                Join Community
              </Button>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
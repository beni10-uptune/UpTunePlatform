import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Music, 
  Play, 
  Users, 
  Sparkles, 
  Heart,
  ArrowRight,
  Headphones,
  Mic,
  Radio,
  Volume2
} from 'lucide-react';

const LandingPage = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Header */}
      <header className="relative z-10 px-6 py-4">
        <nav className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.div 
            className="flex items-center space-x-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center">
              <Music className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold gradient-text">
              Uptune
            </span>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link href="/teams">
              <Button 
                variant="outline" 
                className="border-purple-200 text-purple-700 hover:bg-purple-50"
              >
                Uptune for Teams
              </Button>
            </Link>
          </motion.div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <Badge className="gradient-bg text-white border-0 px-4 py-2">
                  <Sparkles className="w-4 h-4 mr-2" />
                  100% Free Forever
                </Badge>
                
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  Turn Music Into{' '}
                  <span className="gradient-text">
                    Connection
                  </span>
                </h1>
                
                <p className="text-xl text-gray-600 leading-relaxed">
                  Transform any gathering into a joyful musical experience. Create collaborative playlists, 
                  play engaging music games, and discover the soundtracks to your relationships.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/games">
                  <Button 
                    size="lg" 
                    className="gradient-bg text-white hover:opacity-90 transition-opacity text-lg px-8 py-6"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    <Play className={`w-5 h-5 mr-2 transition-transform ${isHovered ? 'scale-110' : ''}`} />
                    Start Playing Now
                    <ArrowRight className={`w-5 h-5 ml-2 transition-transform ${isHovered ? 'translate-x-1' : ''}`} />
                  </Button>
                </Link>
                
                <Link href="/challenge">
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="border-purple-200 text-purple-700 hover:bg-purple-50 text-lg px-8 py-6"
                  >
                    <Radio className="w-5 h-5 mr-2" />
                    Weekly Challenge
                  </Button>
                </Link>
              </div>

              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4" />
                  <span>No signup required</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Heart className="w-4 h-4" />
                  <span>Works with Spotify</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4" />
                  <span>Instant fun</span>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative">
                {/* Main Card */}
                <Card className="card-hover game-card p-8 relative overflow-hidden">
                  <div className="music-wave h-2 absolute top-0 left-0 right-0"></div>
                  
                  <CardHeader className="text-center pb-6">
                    <div className="w-16 h-16 gradient-bg rounded-full flex items-center justify-center mx-auto mb-4">
                      <Music className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl">The Mixtape</CardTitle>
                    <CardDescription className="text-lg">
                      Create the perfect collaborative playlist
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                          <Headphones className="w-4 h-4 text-purple-600" />
                        </div>
                        <span className="font-medium">Sarah's Pick</span>
                      </div>
                      <Volume2 className="w-4 h-4 text-gray-400" />
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
                          <Mic className="w-4 h-4 text-pink-600" />
                        </div>
                        <span className="font-medium">Mike's Anthem</span>
                      </div>
                      <Volume2 className="w-4 h-4 text-gray-400" />
                    </div>
                    
                    <div className="flex items-center justify-center p-4 border-2 border-dashed border-purple-200 rounded-lg">
                      <span className="text-purple-600 font-medium">+ Add Your Song</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Floating Elements */}
                <motion.div
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-4 -right-4 w-12 h-12 gradient-bg rounded-full flex items-center justify-center shadow-lg"
                >
                  <Sparkles className="w-6 h-6 text-white" />
                </motion.div>

                <motion.div
                  animate={{ y: [10, -10, 10] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute -bottom-4 -left-4 w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center shadow-lg"
                >
                  <Heart className="w-5 h-5 text-white" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              The Magic Happens{' '}
              <span className="gradient-text">
                Instantly
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              No downloads, no complex setup. Just share a link and start creating musical memories together.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Play,
                title: "The Mixtape",
                description: "Collaborative playlists with fun themes like 'Guilty Pleasures' or 'Road Trip Anthems'",
                color: "purple"
              },
              {
                icon: Headphones,
                title: "Soundtrack Session",
                description: "Create perfect playlists for real events - dinner parties, focus sessions, celebrations",
                color: "pink"
              },
              {
                icon: Radio,
                title: "Desert Island Discs",
                description: "Share the songs that define you and spark deep conversations about music and memories",
                color: "indigo"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="card-hover h-full text-center p-6">
                  <CardHeader>
                    <div className={`w-16 h-16 bg-${feature.color}-100 rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <feature.icon className={`w-8 h-8 text-${feature.color}-600`} />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl font-bold">
              Ready to Create Musical{' '}
              <span className="gradient-text">
                Magic?
              </span>
            </h2>
            
            <p className="text-xl text-gray-600">
              Join thousands discovering the soundtracks to their relationships. 
              Start your first game in seconds.
            </p>
            
            <Link href="/games">
              <Button 
                size="lg" 
                className="gradient-bg text-white hover:opacity-90 transition-opacity text-xl px-12 py-8"
              >
                <Play className="w-6 h-6 mr-3" />
                Start Playing Now
              </Button>
            </Link>
            
            <p className="text-sm text-gray-500">
              No signup required • Works on any device • Always free
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;

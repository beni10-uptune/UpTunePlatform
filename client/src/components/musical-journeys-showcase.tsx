import { motion } from "framer-motion";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Compass, 
  Music2, 
  Users, 
  Vote, 
  Sparkles,
  History,
  HeartHandshake,
  Play,
  ArrowRight
} from "lucide-react";

interface JourneyFeature {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
}

const journeyFeatures: JourneyFeature[] = [
  {
    icon: <History className="w-5 h-5" />,
    title: "Musical Time Travel",
    description: "Step into the clubs of 90s Manchester or the warehouses of 80s Chicago",
    gradient: "from-purple-500/20 to-pink-500/20"
  },
  {
    icon: <Users className="w-5 h-5" />,
    title: "Community Curated",
    description: "Add your favorite tracks to era-defining playlists built by music lovers",
    gradient: "from-blue-500/20 to-purple-500/20"
  },
  {
    icon: <Vote className="w-5 h-5" />,
    title: "Vote & Discover",
    description: "Shape the narrative with polls and uncover hidden musical gems",
    gradient: "from-pink-500/20 to-rose-500/20"
  },
  {
    icon: <HeartHandshake className="w-5 h-5" />,
    title: "Feel the Impact",
    description: "Understand how these sounds changed culture, fashion, and lives forever",
    gradient: "from-amber-500/20 to-orange-500/20"
  }
];

const featuredJourneys = [
  {
    title: "Madchester",
    subtitle: "When Factory Records ruled the world",
    gradient: "from-purple-600 to-pink-600"
  },
  {
    title: "Acid House", 
    subtitle: "The second summer of love",
    gradient: "from-yellow-600 to-orange-600"
  },
  {
    title: "Detroit Techno",
    subtitle: "From the motor city to global dancefloors",
    gradient: "from-blue-600 to-purple-600"
  }
];

export function MusicalJourneysShowcase() {
  return (
    <div className="w-full">
      {/* Main Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center">
            <Compass className="w-7 h-7 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white">Musical Journeys</h2>
            <p className="text-purple-200">Where Music Meets Memory</p>
          </div>
        </div>
        
        <p className="text-white/80 leading-relaxed max-w-3xl mx-auto text-lg mb-2">
          Remember that first time you heard <span className="text-purple-300 font-semibold">that song</span>? 
          The one that changed everything? Every musical era has these moments - 
          when a beat drops and culture shifts forever.
        </p>
        
        <p className="text-white/70 max-w-2xl mx-auto">
          Dive deep into the sounds that defined generations, vote on the tracks that matter, 
          and add your voice to the story of music that moved the world.
        </p>
      </motion.div>

      {/* Feature Cards Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {journeyFeatures.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Card className={`bg-gradient-to-r ${feature.gradient} backdrop-blur-sm border border-white/20 h-full`}>
              <CardContent className="p-6">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center mb-4 text-white">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-white/70 text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Featured Journeys */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mb-8"
      >
        <p className="text-center text-white/60 mb-6 text-sm">
          START WITH ONE OF THESE LEGENDARY ERAS
        </p>
        
        <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {featuredJourneys.map((journey, index) => (
            <motion.div
              key={journey.title}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card className="bg-white/10 backdrop-blur-sm border border-white/20 overflow-hidden cursor-pointer group">
                <div className={`h-2 bg-gradient-to-r ${journey.gradient}`} />
                <CardContent className="p-4 text-center">
                  <h4 className="font-bold text-white mb-1">{journey.title}</h4>
                  <p className="text-white/60 text-xs">{journey.subtitle}</p>
                  <Sparkles className="w-4 h-4 text-white/40 mx-auto mt-2 group-hover:text-white/60 transition-colors" />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* CTA Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="text-center"
      >
        <Link href="/journeys">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all"
          >
            <Music2 className="w-5 h-5 mr-2" />
            Explore All Journeys
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { 
  Compass, 
  Music2, 
  ArrowRight
} from "lucide-react";

// Import background images
import madchesterImage from '@assets/stock_images/warehouse_nightclub__fd5e9db1.jpg';
import acidHouseImage from '@assets/stock_images/acid_house_rave_part_25aac533.jpg';
import detroitTechnoImage from '@assets/stock_images/detroit_skyline_with_5e6d435b.jpg';

const featuredJourneys = [
  {
    title: "Madchester",
    subtitle: "When Factory Records ruled the world",
    gradient: "from-purple-600 to-pink-600",
    image: madchesterImage
  },
  {
    title: "Acid House", 
    subtitle: "The second summer of love",
    gradient: "from-yellow-600 to-orange-600",
    image: acidHouseImage
  },
  {
    title: "Detroit Techno",
    subtitle: "From the motor city to global dancefloors",
    gradient: "from-blue-600 to-purple-600",
    image: detroitTechnoImage
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
        className="text-center mb-10"
      >
        <div className="flex flex-col items-center gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 bg-purple-400 border-4 border-black flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rotate-12">
              <Compass className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-black" style={{ fontFamily: "'Arial Black', sans-serif", textTransform: 'uppercase' }}>
              <span className="block bg-gradient-to-r from-purple-400 to-pink-400 px-6 py-2 -rotate-1 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                MUSICAL JOURNEYS
              </span>
            </h2>
          </div>
          <p className="text-lg font-black text-black/90 bg-yellow-300 px-6 py-2 border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] rotate-1" style={{ fontFamily: "'Arial Black', sans-serif" }}>
            INTERACTIVE MUSIC HISTORY
          </p>
        </div>

        <p className="text-black/80 font-bold leading-relaxed max-w-2xl mx-auto text-lg">
          Step into the moments when music changed everything. From Manchester warehouses
          to Detroit basements, experience the stories, sounds, and culture that shaped generations. 🎵
        </p>
      </motion.div>

      {/* Featured Journeys */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mb-8"
      >
        <p className="text-center text-black font-black mb-6 text-sm uppercase tracking-wider bg-cyan-300 inline-block px-4 py-2 border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] mx-auto block w-fit" style={{ fontFamily: "'Arial Black', sans-serif" }}>
          EXPLORE THESE MUSICAL ERAS
        </p>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {featuredJourneys.map((journey, index) => (
            <Link key={journey.title} href={`/journeys/${journey.title.toLowerCase().replace(/\s+/g, '-')}`}>
              <motion.div
                whileHover={{ scale: 1.05, rotate: 0 }}
                whileTap={{ scale: 0.98 }}
                className={`relative overflow-hidden cursor-pointer group h-56 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-4px] hover:translate-y-[-4px] transition-all ${index % 2 === 0 ? 'rotate-2' : '-rotate-2'}`}
              >
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: `url(${journey.image})` }}
                />
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-r ${journey.gradient} opacity-70 group-hover:opacity-80 transition-opacity`} />
                {/* Content */}
                <div className="relative bg-black/40 backdrop-blur-sm p-6 text-center h-full flex flex-col justify-center border-4 border-white/20">
                  <h4 className="font-black text-white text-2xl mb-2" style={{ fontFamily: "'Arial Black', sans-serif", textTransform: 'uppercase', textShadow: '3px 3px 0px rgba(0,0,0,0.5)' }}>
                    {journey.title}
                  </h4>
                  <p className="text-white font-bold text-sm" style={{ textShadow: '2px 2px 0px rgba(0,0,0,0.5)' }}>
                    {journey.subtitle}
                  </p>
                </div>
              </motion.div>
            </Link>
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
            className="bg-gradient-to-r from-purple-400 to-pink-400 text-white hover:from-purple-500 hover:to-pink-500 font-black text-xl px-8 py-6 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-4px] hover:translate-y-[-4px] transition-all"
            style={{ fontFamily: "'Arial Black', sans-serif" }}
          >
            <Music2 className="w-6 h-6 mr-2" />
            EXPLORE ALL JOURNEYS
            <ArrowRight className="w-6 h-6 ml-2" />
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
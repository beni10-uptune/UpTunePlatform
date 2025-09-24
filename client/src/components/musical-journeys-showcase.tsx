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
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center">
            <Compass className="w-7 h-7 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white">When music connects people and changes societies</h2>
            <p className="text-purple-300">Interactive Music History</p>
          </div>
        </div>
        
        <p className="text-white/80 leading-relaxed max-w-2xl mx-auto text-lg">
          Step into the moments when music changed everything. From Manchester warehouses 
          to Detroit basements, experience the stories, sounds, and culture that shaped generations.
        </p>
      </motion.div>

      {/* Featured Journeys */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mb-8"
      >
        <p className="text-center text-white/60 mb-6 text-sm uppercase tracking-wider">
          Explore These Musical Eras
        </p>
        
        <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {featuredJourneys.map((journey, index) => (
            <Link key={journey.title} href={`/journeys/${journey.title.toLowerCase().replace(/\s+/g, '-')}`}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative overflow-hidden rounded-lg cursor-pointer group h-48"
              >
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: `url(${journey.image})` }}
                />
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-r ${journey.gradient} opacity-70 group-hover:opacity-60 transition-opacity`} />
                {/* Content */}
                <div className="relative bg-black/30 backdrop-blur-sm p-6 text-center h-full flex flex-col justify-center">
                  <h4 className="font-bold text-white text-lg mb-1">{journey.title}</h4>
                  <p className="text-white/90 text-sm">{journey.subtitle}</p>
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
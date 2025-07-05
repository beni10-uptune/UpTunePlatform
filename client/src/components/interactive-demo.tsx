import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Users, Music, Check, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";

interface DemoStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  mockAction?: string;
  songs?: Array<{ title: string; artist: string; addedBy: string }>;
}

const demoSteps: DemoStep[] = [
  {
    id: "create",
    title: "Start Your Jam Session",
    description: "Choose a theme like 'Road Trip Vibes' and create your game room instantly",
    icon: <Play className="w-5 h-5" />,
    mockAction: "Room Code: ABC123"
  },
  {
    id: "join",
    title: "Friends Join In",
    description: "Share the code - no sign-ups, no hassle. Everyone's in!",
    icon: <Users className="w-5 h-5" />,
    mockAction: "3 players joined"
  },
  {
    id: "add",
    title: "Add Your Songs",
    description: "Search and add songs that match the vibe. Tell a story with each pick!",
    icon: <Music className="w-5 h-5" />,
    songs: [
      { title: "Life is a Highway", artist: "Tom Cochrane", addedBy: "Alex" },
      { title: "Born to Run", artist: "Bruce Springsteen", addedBy: "Sam" },
      { title: "Fast Car", artist: "Tracy Chapman", addedBy: "Jordan" }
    ]
  },
  {
    id: "export",
    title: "Export to Spotify",
    description: "One click and your collaborative playlist is ready to rock!",
    icon: <Check className="w-5 h-5" />,
    mockAction: "Playlist created!"
  }
];

export function InteractiveDemo() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  useEffect(() => {
    if (isPlaying && currentStep < demoSteps.length - 1) {
      const timer = setTimeout(() => {
        setCompletedSteps(prev => [...prev, demoSteps[currentStep].id]);
        setCurrentStep(prev => prev + 1);
      }, 3000);
      return () => clearTimeout(timer);
    } else if (isPlaying && currentStep === demoSteps.length - 1) {
      setCompletedSteps(prev => [...prev, demoSteps[currentStep].id]);
      setIsPlaying(false);
    }
  }, [currentStep, isPlaying]);

  const handleStartDemo = () => {
    setCurrentStep(0);
    setCompletedSteps([]);
    setIsPlaying(true);
  };

  const handleStepClick = (index: number) => {
    setCurrentStep(index);
    setCompletedSteps(demoSteps.slice(0, index).map(s => s.id));
    setIsPlaying(false);
  };

  return (
    <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">See How It Works</h3>
          <p className="text-white/80">Experience the magic in 30 seconds</p>
        </div>
        <Button
          onClick={handleStartDemo}
          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700"
          disabled={isPlaying}
        >
          <Play className="w-4 h-4 mr-2" />
          {isPlaying ? "Playing..." : "Start Demo"}
        </Button>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-8">
        {demoSteps.map((step, index) => (
          <div key={step.id} className="flex items-center flex-1">
            <button
              onClick={() => handleStepClick(index)}
              className={`relative flex items-center justify-center w-10 h-10 rounded-full transition-all ${
                completedSteps.includes(step.id)
                  ? "bg-gradient-to-r from-purple-600 to-pink-600"
                  : currentStep === index
                  ? "bg-white/20 border-2 border-purple-400"
                  : "bg-white/10"
              }`}
            >
              {completedSteps.includes(step.id) ? (
                <Check className="w-5 h-5 text-white" />
              ) : (
                <span className="text-white text-sm">{index + 1}</span>
              )}
            </button>
            {index < demoSteps.length - 1 && (
              <div className={`flex-1 h-0.5 mx-2 transition-all ${
                completedSteps.includes(demoSteps[index + 1]?.id)
                  ? "bg-gradient-to-r from-purple-600 to-pink-600"
                  : "bg-white/20"
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* Current Step Display */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-white/5 rounded-lg p-6 min-h-[200px]"
        >
          <div className="flex items-start gap-4 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center flex-shrink-0">
              {demoSteps[currentStep].icon}
            </div>
            <div className="flex-1">
              <h4 className="text-xl font-semibold text-white mb-2">
                {demoSteps[currentStep].title}
              </h4>
              <p className="text-white/80">
                {demoSteps[currentStep].description}
              </p>
            </div>
          </div>

          {/* Mock Action or Songs Display */}
          {demoSteps[currentStep].mockAction && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-4"
            >
              <Badge className="bg-green-500/20 text-green-300 border-green-500/30 px-4 py-2">
                <Sparkles className="w-4 h-4 mr-2" />
                {demoSteps[currentStep].mockAction}
              </Badge>
            </motion.div>
          )}

          {demoSteps[currentStep].songs && (
            <div className="mt-4 space-y-2">
              {demoSteps[currentStep].songs?.map((song, index) => (
                <motion.div
                  key={song.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.2 }}
                  className="bg-white/10 rounded-lg p-3 flex items-center justify-between"
                >
                  <div>
                    <p className="text-white font-medium">{song.title}</p>
                    <p className="text-white/60 text-sm">{song.artist}</p>
                  </div>
                  <Badge className="bg-white/10 text-white border-white/20">
                    Added by {song.addedBy}
                  </Badge>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Call to Action */}
      {completedSteps.length === demoSteps.length && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-center"
        >
          <p className="text-white mb-4">Ready to create your own musical moments?</p>
          <Link href="/games">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700"
            >
              Try It Now
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </motion.div>
      )}
    </div>
  );
}
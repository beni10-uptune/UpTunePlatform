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
    <div className="bg-gradient-to-br from-yellow-300 to-cyan-300 border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] -rotate-1">
      <div className="bg-white border-3 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
          <div>
            <h3 className="text-3xl font-black text-black mb-2" style={{ fontFamily: "'Arial Black', sans-serif", textTransform: 'uppercase' }}>
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 px-4 py-1 inline-block border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] rotate-2">
                SEE HOW IT WORKS
              </span>
            </h3>
            <p className="text-black/80 font-bold text-lg">Experience the magic in 30 seconds ✨</p>
          </div>
          <Button
            onClick={handleStartDemo}
            className="bg-gradient-to-r from-purple-400 to-pink-400 text-white hover:from-purple-500 hover:to-pink-500 font-black border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] px-6 py-3"
            style={{ fontFamily: "'Arial Black', sans-serif" }}
            disabled={isPlaying}
          >
            <Play className="w-5 h-5 mr-2" />
            {isPlaying ? "PLAYING..." : "START DEMO"}
          </Button>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-8 bg-cyan-100 border-3 border-black p-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
          {demoSteps.map((step, index) => (
            <div key={step.id} className="flex items-center flex-1">
              <button
                onClick={() => handleStepClick(index)}
                className={`relative flex items-center justify-center w-12 h-12 border-3 border-black transition-all font-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] ${
                  completedSteps.includes(step.id)
                    ? "bg-green-400 text-white"
                    : currentStep === index
                    ? "bg-yellow-400 text-black animate-pulse"
                    : "bg-white text-black"
                }`}
                style={{ fontFamily: "'Arial Black', sans-serif" }}
              >
                {completedSteps.includes(step.id) ? (
                  <Check className="w-6 h-6 text-white" />
                ) : (
                  <span className="text-lg">{index + 1}</span>
                )}
              </button>
              {index < demoSteps.length - 1 && (
                <div className={`flex-1 h-1 mx-2 border-2 border-black transition-all ${
                  completedSteps.includes(demoSteps[index + 1]?.id)
                    ? "bg-green-400"
                    : "bg-gray-200"
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
            className="bg-gradient-to-br from-pink-200 to-yellow-200 border-3 border-black p-6 min-h-[200px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-purple-400 border-3 border-black flex items-center justify-center flex-shrink-0 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] rotate-6 text-white">
                {demoSteps[currentStep].icon}
              </div>
              <div className="flex-1">
                <h4 className="text-2xl font-black text-black mb-2" style={{ fontFamily: "'Arial Black', sans-serif" }}>
                  {demoSteps[currentStep].title.toUpperCase()}
                </h4>
                <p className="text-black/80 font-bold">
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
                <Badge className="bg-green-400 text-white border-3 border-black px-4 py-2 font-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]" style={{ fontFamily: "'Arial Black', sans-serif" }}>
                  <Sparkles className="w-4 h-4 mr-2" />
                  {demoSteps[currentStep].mockAction}
                </Badge>
              </motion.div>
            )}

            {demoSteps[currentStep].songs && (
              <div className="mt-4 space-y-3">
                {demoSteps[currentStep].songs?.map((song, index) => (
                  <motion.div
                    key={song.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.2 }}
                    className="bg-white border-3 border-black p-3 flex items-center justify-between shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
                  >
                    <div>
                      <p className="text-black font-black">{song.title}</p>
                      <p className="text-black/70 text-sm font-bold">{song.artist}</p>
                    </div>
                    <Badge className="bg-cyan-300 text-black border-2 border-black font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
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
            <p className="text-black font-bold text-lg mb-4">Ready to create your own musical moments? 🎉</p>
            <Link href="/games">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-400 to-pink-400 text-white hover:from-purple-500 hover:to-pink-500 font-black border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] px-8 py-4 text-lg transition-all"
                style={{ fontFamily: "'Arial Black', sans-serif" }}
              >
                TRY IT NOW
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}
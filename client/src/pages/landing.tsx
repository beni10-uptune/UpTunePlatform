import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
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
  Volume2,
  Zap,
  Star,
  Activity,
  Trophy,
  Share2
} from 'lucide-react';

// Musical DNA Quiz Data
const MUSICAL_DNA_QUESTIONS = [
  {
    question: "What's your perfect Friday night soundtrack?",
    options: [
      { text: "Upbeat pop hits that make me dance", personality: "energizer", emoji: "🎉" },
      { text: "Chill indie tracks for deep conversations", personality: "connector", emoji: "💭" },
      { text: "Classic rock anthems that never get old", personality: "timeless", emoji: "🎸" },
      { text: "Whatever matches my current mood", personality: "chameleon", emoji: "🎭" }
    ]
  },
  {
    question: "How do you discover new music?",
    options: [
      { text: "Friends' recommendations and playlists", personality: "social", emoji: "👥" },
      { text: "Deep dives into artist discographies", personality: "explorer", emoji: "🔍" },
      { text: "Trending charts and popular picks", personality: "trendsetter", emoji: "📈" },
      { text: "Random discoveries and happy accidents", personality: "serendipitous", emoji: "✨" }
    ]
  },
  {
    question: "Your music volume preference?",
    options: [
      { text: "Loud enough to feel every beat", personality: "intense", emoji: "🔊" },
      { text: "Perfect background ambiance", personality: "ambient", emoji: "🎵" },
      { text: "Crystal clear for every detail", personality: "audiophile", emoji: "🎧" },
      { text: "Whatever works for the moment", personality: "adaptive", emoji: "⚡" }
    ]
  }
];

const PERSONALITY_RESULTS = {
  energizer: { title: "The Musical Energizer", description: "You turn every moment into a celebration", color: "from-orange-400 to-red-400", icon: "🎉" },
  connector: { title: "The Sonic Storyteller", description: "Music is your language of connection", color: "from-blue-400 to-purple-400", icon: "💫" },
  timeless: { title: "The Classic Curator", description: "You appreciate the eternal power of great music", color: "from-amber-400 to-orange-400", icon: "👑" },
  chameleon: { title: "The Mood Chameleon", description: "Your playlist reflects every facet of you", color: "from-green-400 to-blue-400", icon: "🦋" },
  social: { title: "The Musical Connector", description: "Music builds your strongest friendships", color: "from-pink-400 to-rose-400", icon: "🤝" },
  explorer: { title: "The Sound Explorer", description: "You uncover musical treasures others miss", color: "from-purple-400 to-indigo-400", icon: "🗺️" },
  trendsetter: { title: "The Trend Oracle", description: "You know what's next before it happens", color: "from-emerald-400 to-teal-400", icon: "🔮" },
  serendipitous: { title: "The Serendipity Seeker", description: "Magic happens in your musical discoveries", color: "from-violet-400 to-purple-400", icon: "✨" },
  intense: { title: "The Sound Maximalist", description: "You live music with full intensity", color: "from-red-400 to-pink-400", icon: "🔥" },
  ambient: { title: "The Atmosphere Architect", description: "You craft perfect sonic environments", color: "from-cyan-400 to-blue-400", icon: "🌙" },
  audiophile: { title: "The Detail Detective", description: "You hear what others miss", color: "from-indigo-400 to-purple-400", icon: "🎯" },
  adaptive: { title: "The Versatile Virtuoso", description: "You master every musical moment", color: "from-teal-400 to-green-400", icon: "⚡" }
};

const LIVE_ACTIVITIES = [
  { user: "Sarah", action: "just added 'Bohemian Rhapsody' to Desert Island Discs", time: "2s ago", emoji: "🎭" },
  { user: "Mike", action: "created a 90s nostalgia mixtape", time: "15s ago", emoji: "📼" },
  { user: "Team Alpha", action: "discovered their perfect work soundtrack", time: "32s ago", emoji: "💼" },
  { user: "Luna", action: "found their musical soulmate with 94% compatibility", time: "1m ago", emoji: "💫" },
  { user: "Alex", action: "unlocked the 'Mood Matcher' achievement", time: "2m ago", emoji: "🏆" }
];

const TESTIMONIALS = [
  { text: "My team bonded over our shared love of 80s hits!", author: "Sarah", role: "HR Manager", rating: 5 },
  { text: "We discovered our CEO's secret punk rock phase 😂", author: "Mike", role: "Developer", rating: 5 },
  { text: "Best virtual team building activity we've ever done", author: "Lisa", role: "Team Lead", rating: 5 },
  { text: "Found my new favorite song through a coworker's playlist", author: "Jordan", role: "Designer", rating: 5 }
];

const LandingPage = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [activeUsers, setActiveUsers] = useState(2847);
  const [currentActivityIndex, setCurrentActivityIndex] = useState(0);
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<string[]>([]);
  const [quizResult, setQuizResult] = useState<string | null>(null);

  // Live activity rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentActivityIndex((prev) => (prev + 1) % LIVE_ACTIVITIES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Testimonial rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonialIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Simulated live user count updates
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveUsers(prev => prev + Math.floor(Math.random() * 3) - 1);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleQuizAnswer = (personality: string) => {
    const newAnswers = [...quizAnswers, personality];
    setQuizAnswers(newAnswers);

    if (quizStep < MUSICAL_DNA_QUESTIONS.length - 1) {
      setQuizStep(prev => prev + 1);
    } else {
      // Calculate result based on most frequent personality trait
      const personalityCount: Record<string, number> = {};
      newAnswers.forEach(p => {
        personalityCount[p] = (personalityCount[p] || 0) + 1;
      });
      const result = Object.entries(personalityCount).reduce((a, b) => 
        personalityCount[a[0]] > personalityCount[b[0]] ? a : b
      )[0];
      setQuizResult(result);
    }
  };

  const resetQuiz = () => {
    setQuizStep(0);
    setQuizAnswers([]);
    setQuizResult(null);
  };

  const shareResult = async () => {
    const result = PERSONALITY_RESULTS[quizResult as keyof typeof PERSONALITY_RESULTS];
    if (navigator.share) {
      await navigator.share({
        title: `I'm ${result.title}!`,
        text: `${result.description} What's your Musical DNA? Take the quiz on Uptune!`,
        url: window.location.origin
      });
    } else {
      navigator.clipboard.writeText(
        `I'm ${result.title}! ${result.description} What's your Musical DNA? Take the quiz on Uptune! ${window.location.origin}`
      );
    }
  };

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
              {/* Live Activity & Social Proof */}
              <motion.div 
                className="flex items-center gap-2 text-sm text-gray-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <Activity className="w-4 h-4" />
                </div>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={activeUsers}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="font-medium"
                  >
                    {activeUsers.toLocaleString()} people creating music magic right now
                  </motion.span>
                </AnimatePresence>
              </motion.div>

              <div className="space-y-4">
                <Badge className="gradient-bg text-white border-0 px-4 py-2">
                  <Sparkles className="w-4 h-4 mr-2" />
                  100% Free Forever
                </Badge>
                
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                  Turn any group into a{' '}
                  <span className="gradient-text">
                    musical family
                  </span>
                  <br />
                  <span className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl text-gray-600">in under 60 seconds</span>
                </h1>
                
                <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed">
                  Transform any gathering into a joyful musical experience. Create collaborative playlists, 
                  play engaging music games, and discover the soundtracks to your relationships.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link href="/games" className="w-full sm:w-auto">
                  <Button 
                    size="lg" 
                    className="gradient-bg text-white hover:opacity-90 transition-opacity text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 w-full sm:w-auto"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    <Play className={`w-4 h-4 sm:w-5 sm:h-5 mr-2 transition-transform ${isHovered ? 'scale-110' : ''}`} />
                    <span className="truncate">Start Playing Now</span>
                    <ArrowRight className={`w-4 h-4 sm:w-5 sm:h-5 ml-2 transition-transform ${isHovered ? 'translate-x-1' : ''}`} />
                  </Button>
                </Link>
                
                <Dialog open={showQuiz} onOpenChange={setShowQuiz}>
                  <DialogTrigger asChild>
                    <Button 
                      size="lg" 
                      variant="outline"
                      className="border-purple-200 text-purple-700 hover:bg-purple-50 text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 w-full sm:w-auto"
                    >
                      <Zap className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                      <span className="truncate">Discover Your Musical DNA</span>
                    </Button>
                  </DialogTrigger>
                  
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2 text-2xl">
                        <Star className="w-6 h-6 text-purple-600" />
                        Your Musical DNA
                      </DialogTitle>
                      <DialogDescription>
                        Discover your unique musical personality in 30 seconds
                      </DialogDescription>
                    </DialogHeader>
                    
                    {!quizResult ? (
                      <div className="space-y-6">
                        <div className="flex items-center gap-4">
                          <Progress value={(quizStep / MUSICAL_DNA_QUESTIONS.length) * 100} className="flex-1" />
                          <span className="text-sm text-gray-500">{quizStep + 1}/{MUSICAL_DNA_QUESTIONS.length}</span>
                        </div>
                        
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold">{MUSICAL_DNA_QUESTIONS[quizStep].question}</h3>
                          <div className="grid gap-3">
                            {MUSICAL_DNA_QUESTIONS[quizStep].options.map((option, index) => (
                              <Button
                                key={index}
                                variant="outline"
                                className="justify-start text-left h-auto p-4 hover:bg-purple-50 hover:border-purple-300"
                                onClick={() => handleQuizAnswer(option.personality)}
                              >
                                <span className="text-2xl mr-3">{option.emoji}</span>
                                {option.text}
                              </Button>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <motion.div 
                        className="space-y-6 text-center"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <div className={`p-8 rounded-2xl bg-gradient-to-br ${PERSONALITY_RESULTS[quizResult as keyof typeof PERSONALITY_RESULTS].color} text-white`}>
                          <div className="text-6xl mb-4">{PERSONALITY_RESULTS[quizResult as keyof typeof PERSONALITY_RESULTS].icon}</div>
                          <h3 className="text-2xl font-bold mb-2">{PERSONALITY_RESULTS[quizResult as keyof typeof PERSONALITY_RESULTS].title}</h3>
                          <p className="text-lg opacity-90">{PERSONALITY_RESULTS[quizResult as keyof typeof PERSONALITY_RESULTS].description}</p>
                        </div>
                        
                        <div className="flex gap-3">
                          <Button onClick={shareResult} className="flex-1 gradient-bg text-white">
                            <Share2 className="w-4 h-4 mr-2" />
                            Share Your Musical DNA
                          </Button>
                          <Button variant="outline" onClick={resetQuiz}>
                            Retake Quiz
                          </Button>
                        </div>
                        
                        <Link href="/games">
                          <Button size="lg" className="w-full gradient-bg text-white">
                            Find Your Perfect Musical Games
                          </Button>
                        </Link>
                      </motion.div>
                    )}
                  </DialogContent>
                </Dialog>
                
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

            {/* Right Column - Enhanced Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative space-y-6"
            >
              {/* Live Activity Feed */}
              <Card className="p-4 bg-white/80 backdrop-blur-sm border-purple-100">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-700">Live Activity</span>
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentActivityIndex}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -20, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="flex items-center gap-3"
                  >
                    <span className="text-lg">{LIVE_ACTIVITIES[currentActivityIndex].emoji}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-600 truncate">
                        <span className="font-medium text-purple-700">{LIVE_ACTIVITIES[currentActivityIndex].user}</span>
                        {' '}{LIVE_ACTIVITIES[currentActivityIndex].action}
                      </p>
                      <p className="text-xs text-gray-400">{LIVE_ACTIVITIES[currentActivityIndex].time}</p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </Card>

              {/* Main Demo Card */}
              <div className="relative">
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

              {/* Rotating Testimonials */}
              <Card className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-100">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentTestimonialIndex}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center"
                  >
                    <div className="flex justify-center mb-2">
                      {[...Array(TESTIMONIALS[currentTestimonialIndex].rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-sm text-gray-700 italic mb-2">
                      "{TESTIMONIALS[currentTestimonialIndex].text}"
                    </p>
                    <p className="text-xs text-gray-500">
                      <span className="font-medium">{TESTIMONIALS[currentTestimonialIndex].author}</span>
                      {' • '}{TESTIMONIALS[currentTestimonialIndex].role}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </Card>
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

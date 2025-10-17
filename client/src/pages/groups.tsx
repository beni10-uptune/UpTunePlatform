import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import {
  Briefcase,
  PartyPopper,
  Flower2,
  Calendar,
  Users,
  ArrowRight,
  Slack,
  Clock,
  Heart,
  Music,
  Sparkles,
  CheckCircle2
} from "lucide-react";

export default function GroupsPage() {
  const categories = [
    {
      id: "workplace",
      title: "Workplace",
      subtitle: "Teams, Slack & Continuous Engagement",
      description: "Transform your workplace culture with music that brings teams closer together.",
      icon: Briefcase,
      color: "from-blue-600 to-cyan-600",
      bgColor: "from-blue-300 to-cyan-300",
      features: [
        { title: "Slack Integration", emoji: "💬", description: "Daily musical moments delivered to your workspace" },
        { title: "Team Building", emoji: "🤝", description: "Interactive games that reveal musical personalities" },
        { title: "Onboarding", emoji: "👋", description: "Welcome new team members through shared music" },
        { title: "Daily Engagement", emoji: "📅", description: "Keep teams connected with regular musical touchpoints" },
        { title: "Company Offsites", emoji: "🏕️", description: "Create unforgettable soundtrack moments" },
      ],
    },
    {
      id: "celebrations",
      title: "Celebrations",
      subtitle: "Weddings, Parties & Joyful Moments",
      description: "Every celebration deserves its perfect soundtrack. Create musical memories that last forever.",
      icon: PartyPopper,
      color: "from-pink-600 to-rose-600",
      bgColor: "from-pink-300 to-rose-300",
      features: [
        { title: "Weddings", emoji: "💒", description: "Build your perfect wedding playlist together" },
        { title: "Birthdays", emoji: "🎂", description: "Celebrate with songs that define each year" },
        { title: "Anniversaries", emoji: "💝", description: "Relive your journey through music" },
        { title: "Reunions", emoji: "🎊", description: "Reconnect through shared musical memories" },
        { title: "Parties", emoji: "🎉", description: "Collaborative playlists that get everyone dancing" },
      ],
    },
    {
      id: "memorials",
      title: "Memorials",
      subtitle: "Tributes & Remembrance",
      description: "Honor lives through the music that moved them. Create touching tributes that celebrate beautiful memories.",
      icon: Flower2,
      color: "from-purple-600 to-indigo-600",
      bgColor: "from-purple-300 to-indigo-300",
      features: [
        { title: "Funerals", emoji: "🕊️", description: "Dignified musical tributes for final farewells" },
        { title: "Celebrations of Life", emoji: "🌟", description: "Joyful remembrance through favorite songs" },
        { title: "Memorial Services", emoji: "🙏", description: "Meaningful playlists for remembrance gatherings" },
        { title: "Tribute Playlists", emoji: "💐", description: "Ongoing musical memorials families can cherish" },
      ],
    },
    {
      id: "events",
      title: "Events",
      subtitle: "Conferences, Festivals & Gatherings",
      description: "Make your event unforgettable with music that brings everyone together.",
      icon: Calendar,
      color: "from-orange-600 to-yellow-600",
      bgColor: "from-orange-300 to-yellow-300",
      features: [
        { title: "Conferences", emoji: "🎤", description: "Break the ice and energize attendees" },
        { title: "Festivals", emoji: "🎪", description: "Community playlists that capture the vibe" },
        { title: "Community Events", emoji: "🏘️", description: "Music that brings neighborhoods together" },
        { title: "Workshops", emoji: "🎨", description: "Creative soundtracks for collaborative sessions" },
      ],
    },
  ];

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-200 via-pink-200 to-cyan-200 relative overflow-hidden">
      {/* Memphis Pattern Elements */}
      <div className="absolute inset-0 overflow-hidden opacity-50">
        <div className="absolute top-20 right-10 w-32 h-32 border-8 border-black rotate-12"></div>
        <div className="absolute top-1/3 left-20 w-24 h-24 rounded-full bg-pink-500"></div>
        <div className="absolute bottom-32 right-1/4 w-40 h-40 bg-cyan-400 rounded-full"></div>
        <div className="absolute top-60 left-1/3 w-20 h-20 bg-yellow-400" style={{clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)'}}></div>

        {/* Squiggle lines */}
        <svg className="absolute top-10 left-1/4 w-64 h-32" viewBox="0 0 200 100">
          <path d="M 0 50 Q 25 0, 50 50 T 100 50 T 150 50 T 200 50" stroke="black" strokeWidth="6" fill="none" strokeLinecap="round"/>
        </svg>

        {/* Dots pattern */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 bg-black rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          ></div>
        ))}
      </div>

      {/* Hero Section */}
      <main className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-8 max-w-4xl mx-auto mb-20"
          >
            <div className="inline-flex items-center gap-4 bg-purple-400 px-8 py-4 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rotate-2">
              <Users className="w-12 h-12 text-white" />
              <h1 className="text-5xl md:text-7xl font-black text-white" style={{ fontFamily: "'Arial Black', sans-serif" }}>
                FOR GROUPS
              </h1>
            </div>

            <p className="text-2xl md:text-3xl font-bold text-black max-w-3xl mx-auto bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] -rotate-1">
              Music that brings people together—for every occasion! 🎵
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button
                size="lg"
                onClick={scrollToContact}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 font-black text-xl px-10 py-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-4px] hover:translate-y-[-4px] transition-all rotate-1"
                style={{ fontFamily: "'Arial Black', sans-serif" }}
              >
                <Music className="w-6 h-6 mr-3" />
                GET IN TOUCH
              </Button>
              <Link href="/">
                <Button
                  size="lg"
                  className="bg-cyan-400 text-black hover:bg-cyan-500 font-black text-xl px-10 py-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-4px] hover:translate-y-[-4px] transition-all -rotate-1"
                  style={{ fontFamily: "'Arial Black', sans-serif" }}
                >
                  TRY FREE VERSION
                  <ArrowRight className="w-6 h-6 ml-3" />
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Categories Grid */}
          <div className="space-y-20">
            {categories.map((category, index) => {
              const Icon = category.icon;

              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="max-w-6xl mx-auto"
                >
                  <Card className={`bg-gradient-to-br ${category.bgColor} border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] overflow-hidden ${index % 2 === 0 ? 'rotate-1' : '-rotate-1'}`}>
                    <CardHeader className="bg-white border-b-4 border-black">
                      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className={`w-16 h-16 bg-gradient-to-r ${category.color} border-4 border-black flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`}>
                            <Icon className="w-10 h-10 text-white" />
                          </div>
                          <div>
                            <h2 className="text-4xl font-black text-black mb-1" style={{ fontFamily: "'Arial Black', sans-serif" }}>
                              {category.title}
                            </h2>
                            <p className="text-lg font-bold text-black/70">{category.subtitle}</p>
                          </div>
                        </div>
                        <Button
                          onClick={scrollToContact}
                          className={`bg-gradient-to-r ${category.color} text-white font-black border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all`}
                          style={{ fontFamily: "'Arial Black', sans-serif" }}
                        >
                          GET STARTED
                          <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                      </div>
                    </CardHeader>

                    <CardContent className="p-8 bg-white">
                      <p className="text-xl font-bold text-black/80 mb-8">
                        {category.description}
                      </p>

                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {category.features.map((feature) => (
                          <motion.div
                            key={feature.title}
                            whileHover={{ scale: 1.05 }}
                            className="bg-white border-3 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
                          >
                            <div className="flex items-start gap-3">
                              <div className="w-12 h-12 bg-yellow-300 border-3 border-black flex items-center justify-center text-2xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex-shrink-0">
                                {feature.emoji}
                              </div>
                              <div>
                                <h3 className="text-lg font-black text-black mb-1" style={{ fontFamily: "'Arial Black', sans-serif" }}>
                                  {feature.title}
                                </h3>
                                <p className="text-sm font-bold text-black/70">
                                  {feature.description}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Why Choose Uptune Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-20 max-w-6xl mx-auto"
          >
            <Card className="bg-gradient-to-br from-yellow-300 to-pink-300 border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] rotate-1">
              <CardContent className="p-10 bg-white border-4 border-black m-4">
                <h2 className="text-4xl font-black text-black text-center mb-8" style={{ fontFamily: "'Arial Black', sans-serif" }}>
                  WHY CHOOSE UPTUNE?
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    { icon: <Slack className="w-6 h-6" />, title: "Seamless Integration", description: "Works with Slack, Teams, and your existing tools" },
                    { icon: <Heart className="w-6 h-6" />, title: "Meaningful Connections", description: "Music reveals what words can't express" },
                    { icon: <Clock className="w-6 h-6" />, title: "Flexible & Easy", description: "From 5 minutes to full events—we adapt to you" },
                    { icon: <Sparkles className="w-6 h-6" />, title: "Unforgettable Moments", description: "Create memories that last forever" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4 bg-cyan-200 border-3 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                      <div className="w-12 h-12 bg-purple-400 border-3 border-black flex items-center justify-center text-white flex-shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-black text-black mb-2" style={{ fontFamily: "'Arial Black', sans-serif" }}>
                          {item.title}
                        </h3>
                        <p className="text-black/80 font-bold">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact CTA Section */}
          <motion.div
            id="contact"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-20 max-w-4xl mx-auto"
          >
            <Card className="bg-gradient-to-br from-purple-400 to-pink-400 border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] -rotate-1">
              <CardContent className="p-10 bg-white border-4 border-black m-4 text-center">
                <h2 className="text-5xl font-black text-black mb-4" style={{ fontFamily: "'Arial Black', sans-serif" }}>
                  READY TO GET STARTED?
                </h2>
                <p className="text-2xl font-bold text-black/80 mb-8">
                  Let's create an unforgettable musical experience for your group!
                </p>

                <div className="space-y-4 mb-8">
                  {[
                    "Custom themes & playlists tailored to your occasion",
                    "Dedicated support from planning to execution",
                    "Flexible pricing for groups of any size",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-center gap-3 text-lg font-bold text-black">
                      <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <Button
                  size="lg"
                  asChild
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 font-black text-2xl px-12 py-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-4px] hover:translate-y-[-4px] transition-all"
                  style={{ fontFamily: "'Arial Black', sans-serif" }}
                >
                  <a href="mailto:hello@uptune.com">
                    <Music className="w-8 h-8 mr-3 inline" />
                    CONTACT US
                  </a>
                </Button>

                <p className="mt-6 text-black/70 font-bold">
                  Or email us at{" "}
                  <a href="mailto:hello@uptune.com" className="text-purple-600 hover:text-purple-700 underline">
                    hello@uptune.com
                  </a>
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

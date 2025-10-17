import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, Heart, Flower2, Users, ArrowRight, Building2, PartyPopper, Church, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";

interface ForGroupsMegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ForGroupsMegaMenu({ isOpen, onClose }: ForGroupsMegaMenuProps) {
  const categories = [
    {
      id: "workplace",
      title: "Workplace",
      description: "Teams, Slack & continuous engagement",
      icon: Briefcase,
      color: "from-blue-600 to-cyan-600",
      items: [
        { title: "Team Building", slug: "teams", emoji: "🤝" },
        { title: "Slack Integration", slug: "teams#slack", emoji: "💬" },
        { title: "Daily Engagement", slug: "teams#daily", emoji: "📅" },
        { title: "Onboarding", slug: "teams#onboarding", emoji: "👋" },
        { title: "Company Offsites", slug: "teams#offsites", emoji: "🏕️" },
      ],
    },
    {
      id: "celebrations",
      title: "Celebrations",
      description: "Weddings, parties & joyful moments",
      icon: PartyPopper,
      color: "from-pink-600 to-rose-600",
      items: [
        { title: "Weddings", slug: "celebrations#weddings", emoji: "💒" },
        { title: "Birthdays", slug: "celebrations#birthdays", emoji: "🎂" },
        { title: "Anniversaries", slug: "celebrations#anniversaries", emoji: "💝" },
        { title: "Reunions", slug: "celebrations#reunions", emoji: "🎊" },
        { title: "Parties", slug: "celebrations#parties", emoji: "🎉" },
      ],
    },
    {
      id: "memorials",
      title: "Memorials",
      description: "Tributes & remembrance",
      icon: Flower2,
      color: "from-purple-600 to-indigo-600",
      items: [
        { title: "Funerals", slug: "memorials#funerals", emoji: "🕊️" },
        { title: "Celebrations of Life", slug: "memorials#celebrations", emoji: "🌟" },
        { title: "Memorial Services", slug: "memorials#services", emoji: "🙏" },
        { title: "Tribute Playlists", slug: "memorials#tributes", emoji: "💐" },
      ],
    },
    {
      id: "events",
      title: "Events",
      description: "Conferences, festivals & gatherings",
      icon: Calendar,
      color: "from-orange-600 to-yellow-600",
      items: [
        { title: "Conferences", slug: "events#conferences", emoji: "🎤" },
        { title: "Festivals", slug: "events#festivals", emoji: "🎪" },
        { title: "Community Events", slug: "events#community", emoji: "🏘️" },
        { title: "Workshops", slug: "events#workshops", emoji: "🎨" },
      ],
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
          />

          {/* Mega Menu */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-20 left-0 right-0 z-50 max-w-7xl mx-auto px-6"
          >
            <Card className="bg-gradient-to-br from-yellow-100 to-pink-100 border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
              <div className="p-8 bg-white">
                {/* Header */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-4xl font-black text-black flex items-center gap-4 bg-purple-400 px-6 py-3 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rotate-2" style={{ fontFamily: "'Arial Black', sans-serif" }}>
                      <Users className="w-10 h-10 text-white" />
                      FOR GROUPS
                    </h2>
                    <Link href="/groups">
                      <button
                        onClick={onClose}
                        className="bg-cyan-400 hover:bg-cyan-500 text-black font-black px-4 py-2 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all flex items-center gap-2"
                        style={{ fontFamily: "'Arial Black', sans-serif" }}
                      >
                        VIEW ALL
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </Link>
                  </div>
                  <p className="text-black/70 font-bold text-lg">
                    Music that brings people together - for every occasion! 🎵
                  </p>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {categories.map((category) => {
                    const Icon = category.icon;

                    return (
                      <div
                        key={category.id}
                        className="group"
                      >
                        {/* Category Header */}
                        <div className="mb-4">
                          <div
                            className={`inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${category.color} border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] mb-3 rotate-1`}
                          >
                            <Icon className="w-5 h-5 text-white" />
                            <span className="text-white text-sm font-black" style={{ fontFamily: "'Arial Black', sans-serif" }}>
                              {category.title}
                            </span>
                          </div>
                          <p className="text-black/60 text-xs font-bold">{category.description}</p>
                        </div>

                        {/* Items List */}
                        <div className="space-y-2">
                          {category.items.map((item) => (
                            <Link
                              key={item.slug}
                              href={`/groups/${item.slug}`}
                            >
                              <motion.button
                                onClick={onClose}
                                whileHover={{ x: 4 }}
                                className="w-full text-left px-3 py-2 bg-white border-2 border-black hover:bg-yellow-100 hover:border-black hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center gap-3 text-sm font-bold"
                              >
                                <span className="text-lg bg-cyan-200 border-2 border-black w-8 h-8 flex items-center justify-center">{item.emoji}</span>
                                <span className="text-black">{item.title}</span>
                              </motion.button>
                            </Link>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* CTA Footer */}
                <div className="mt-8 pt-6 border-t-4 border-black">
                  <div className="bg-gradient-to-r from-purple-400 to-pink-400 border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] -rotate-1">
                    <div className="bg-white border-3 border-black p-6 text-center">
                      <h3 className="text-2xl font-black text-black mb-2" style={{ fontFamily: "'Arial Black', sans-serif" }}>
                        READY TO GET STARTED?
                      </h3>
                      <p className="text-black/70 font-bold mb-4">
                        Let's create an unforgettable musical experience for your group!
                      </p>
                      <Link href="/groups">
                        <button
                          onClick={onClose}
                          className="bg-gradient-to-r from-purple-400 to-pink-500 text-white font-black px-8 py-4 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
                          style={{ fontFamily: "'Arial Black', sans-serif" }}
                        >
                          GET IN TOUCH
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

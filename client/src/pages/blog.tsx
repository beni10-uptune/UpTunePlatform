import { motion } from "framer-motion";
import { Link } from "wouter";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Music, Clock, ArrowRight, Calendar, User, Heart, Sparkles } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  imageGradient: string;
  slug: string;
  featured?: boolean;
}

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "The Psychology of Musical Memory: Why That Song Takes You Back",
    excerpt: "Explore the neuroscience behind why certain songs transport us to specific moments in our lives and how music becomes the soundtrack to our memories.",
    author: "Dr. Sarah Chen",
    date: "2025-01-05",
    readTime: "8 min read",
    category: "Science of Music",
    imageGradient: "from-purple-600 to-pink-600",
    slug: "psychology-musical-memory",
    featured: true
  },
  {
    id: "2",
    title: "Building the Perfect Road Trip Playlist: A Data-Driven Guide",
    excerpt: "We analyzed thousands of road trip playlists to find the perfect formula for keeping everyone happy on those long drives. The results might surprise you.",
    author: "Marcus Johnson",
    date: "2025-01-03",
    readTime: "6 min read",
    category: "Playlist Science",
    imageGradient: "from-blue-600 to-cyan-600",
    slug: "perfect-road-trip-playlist"
  },
  {
    id: "3",
    title: "Desert Island Discs: What Your Choices Say About You",
    excerpt: "Psychologists reveal how your essential songs reflect your personality, values, and life experiences. Take our quiz to discover your musical personality type.",
    author: "Emma Thompson",
    date: "2025-01-01",
    readTime: "7 min read",
    category: "Music Psychology",
    imageGradient: "from-amber-600 to-orange-600",
    slug: "desert-island-psychology"
  },
  {
    id: "4",
    title: "The Rise of Musical Social Gaming: Connecting Through Songs",
    excerpt: "How music-based social games are creating deeper connections in an increasingly digital world. From office icebreakers to family reunions.",
    author: "Alex Rivera",
    date: "2024-12-28",
    readTime: "5 min read",
    category: "Trends",
    imageGradient: "from-green-600 to-teal-600",
    slug: "musical-social-gaming"
  },
  {
    id: "5",
    title: "Guilty Pleasures: The Science Behind Songs We Love to Hate",
    excerpt: "Why do we secretly love songs we're embarrassed to admit? Neuroscientists explain the fascinating psychology of guilty pleasure music.",
    author: "Dr. James Park",
    date: "2024-12-25",
    readTime: "9 min read",
    category: "Science of Music",
    imageGradient: "from-rose-600 to-pink-600",
    slug: "guilty-pleasure-science"
  },
  {
    id: "6",
    title: "Community Playlists: When Crowds Create Magic",
    excerpt: "Examining how community-curated playlists consistently outperform algorithm-generated ones in emotional resonance and discovery.",
    author: "Lisa Chen",
    date: "2024-12-20",
    readTime: "6 min read",
    category: "Community",
    imageGradient: "from-indigo-600 to-purple-600",
    slug: "community-playlist-magic"
  }
];

export default function Blog() {
  const featuredPost = blogPosts.find(post => post.featured);
  const recentPosts = blogPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-16">

      <main className="px-6 py-12 max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 px-4 py-1 mb-4">
            <Sparkles className="w-4 h-4 mr-1" />
            The Uptune Blog
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Stories Behind the Songs
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Exploring the science, psychology, and magic of how music connects us all
          </p>
        </motion.div>

        {/* Featured Post */}
        {featuredPost && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <Card className="bg-white/10 backdrop-blur-sm border border-white/20 overflow-hidden group hover:bg-white/15 transition-all cursor-pointer">
              <div className={`h-2 bg-gradient-to-r ${featuredPost.imageGradient}`} />
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-3">
                  <Badge className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white border-0">
                    Featured
                  </Badge>
                  <Badge className="bg-white/10 text-white border-white/20">
                    {featuredPost.category}
                  </Badge>
                </div>
                <h2 className="text-3xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                  {featuredPost.title}
                </h2>
                <p className="text-white/70 text-lg mb-4">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-white/60 text-sm">
                    <span className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {featuredPost.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(featuredPost.date).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {featuredPost.readTime}
                    </span>
                  </div>
                  <Link href={`/blog/${featuredPost.slug}`}>
                    <Button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700">
                      Read More
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </CardHeader>
            </Card>
          </motion.div>
        )}

        {/* Recent Posts Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-white mb-6">Recent Articles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              >
                <Card className="bg-white/10 backdrop-blur-sm border border-white/20 h-full hover:bg-white/15 transition-all group cursor-pointer">
                  <div className={`h-1 bg-gradient-to-r ${post.imageGradient}`} />
                  <CardHeader>
                    <Badge className="bg-white/10 text-white border-white/20 w-fit mb-3">
                      {post.category}
                    </Badge>
                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-white/60 text-sm mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between text-white/50 text-sm">
                      <div className="flex items-center gap-3">
                        <span>{post.author}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>
                      <Link href={`/blog/${post.slug}`}>
                        <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                          Read
                          <ArrowRight className="w-3 h-3 ml-1" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Newsletter CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16"
        >
          <Card className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm border border-white/20">
            <CardContent className="py-8 text-center">
              <Heart className="w-12 h-12 text-pink-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-3">
                Join the Musical Journey
              </h3>
              <p className="text-white/70 mb-6 max-w-md mx-auto">
                Get weekly insights on music psychology, playlist science, and stories that connect us through song
              </p>
              <div className="flex gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:border-white/40"
                />
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700">
                  Subscribe
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}
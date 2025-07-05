import { motion } from "framer-motion";
import { Link, useParams } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Music, Clock, ArrowLeft, Calendar, User, Share2, Heart } from "lucide-react";

// This would come from an API in a real app
const getPostBySlug = (slug: string) => {
  const posts: Record<string, {
    title: string;
    author: string;
    date: string;
    readTime: string;
    category: string;
    content: string;
  }> = {
    "psychology-musical-memory": {
      title: "The Psychology of Musical Memory: Why That Song Takes You Back",
      author: "Dr. Sarah Chen",
      date: "2025-01-05",
      readTime: "8 min read",
      category: "Science of Music",
      content: `
        <p>Have you ever heard a song and instantly been transported back to a specific moment in your life? Maybe it's the song that was playing during your first kiss, or the track that defined your college years. This isn't just nostalgia – it's neuroscience in action.</p>

        <h2>The Memory-Music Connection</h2>
        <p>Music has a unique ability to trigger what scientists call "autobiographical memories" – vivid recollections of specific moments from our past. Unlike other sensory triggers, music activates multiple areas of the brain simultaneously, creating a rich tapestry of memory that includes not just what happened, but how we felt.</p>

        <h3>The Neuroscience Behind the Magic</h3>
        <p>When we hear music, it activates the hippocampus (responsible for memory formation) and the amygdala (our emotional center) simultaneously. This dual activation creates what researchers call "memory consolidation" – essentially burning the experience into our long-term memory with emotional tags attached.</p>

        <h2>Why Some Songs Stick More Than Others</h2>
        <p>Not all songs become memory anchors. Research shows that songs are most likely to become tied to memories when:</p>
        <ul>
          <li>They're heard during emotionally significant moments</li>
          <li>They're played repeatedly during a specific life period</li>
          <li>They have personal meaning or lyrics that resonate with our experiences</li>
        </ul>

        <h2>Using Music to Enhance Memory</h2>
        <p>Understanding this connection can help us use music more intentionally. Creating playlists for specific activities or periods in our lives can help us better recall those times later. It's why making a "road trip playlist" or a "study soundtrack" can be so powerful – you're literally encoding memories with a musical key.</p>

        <h2>The Therapeutic Applications</h2>
        <p>Music therapy has shown remarkable results in helping patients with dementia and Alzheimer's disease. Even when other memories fade, musical memories often remain intact, providing a bridge to lost experiences and emotions.</p>

        <p>Next time you hear a song that takes you back, remember – it's not just in your head. It's a beautiful demonstration of how our brains weave together sound, emotion, and experience into the tapestry of our lives.</p>
      `
    },
    "perfect-road-trip-playlist": {
      title: "Building the Perfect Road Trip Playlist: A Data-Driven Guide",
      author: "Marcus Johnson",
      date: "2025-01-03",
      readTime: "6 min read",
      category: "Playlist Science",
      content: `
        <p>After analyzing over 10,000 road trip playlists and surveying hundreds of travelers, we've cracked the code for the perfect driving soundtrack. The results challenge some common assumptions about what makes a great road trip playlist.</p>

        <h2>The Science of the Perfect Mix</h2>
        <p>Our data revealed that successful road trip playlists follow a specific pattern:</p>
        <ul>
          <li><strong>Energy Waves:</strong> The best playlists cycle between high and medium energy every 15-20 minutes</li>
          <li><strong>Familiarity Ratio:</strong> 70% familiar songs, 30% new discoveries keeps everyone engaged</li>
          <li><strong>Genre Diversity:</strong> Successful playlists include at least 4 different genres</li>
        </ul>

        <h2>The Optimal Playlist Structure</h2>
        <h3>Hour 1: The Departure</h3>
        <p>Start with high-energy, universally loved tracks. This is when excitement is highest and you want to match that energy. Think classic rock anthems or pop hits everyone knows.</p>

        <h3>Hour 2-3: The Cruise</h3>
        <p>Settle into a groove with medium-energy tracks. This is where you can introduce some variety – indie discoveries, alternative classics, or genre-bending tracks that spark conversation.</p>

        <h3>Hour 4+: The Journey</h3>
        <p>Mix in more experimental choices and deep cuts. By now, the group dynamic is established and people are more open to musical adventures.</p>

        <h2>The Unexpected Findings</h2>
        <p>Contrary to popular belief, sad songs have a place in road trip playlists. Our data shows that one melancholy track every 45 minutes actually enhances the overall experience by providing emotional variety.</p>

        <h2>Pro Tips from the Data</h2>
        <ul>
          <li>Include at least one "group singalong" song every 30 minutes</li>
          <li>Avoid songs over 6 minutes unless they're proven crowd-pleasers</li>
          <li>Include local artists from your destination for added connection</li>
        </ul>

        <p>Remember, the perfect playlist isn't just about the songs – it's about creating a soundtrack for the memories you're making together.</p>
      `
    }
  };

  return posts[slug] || null;
};

export default function BlogPost() {
  const params = useParams();
  const post = getPostBySlug(params.slug || "");

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <Card className="bg-white/10 backdrop-blur-sm border border-white/20 p-8 text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Article Not Found</h1>
          <Link href="/blog">
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
              Back to Blog
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-16">
      <main className="px-6 py-12 max-w-4xl mx-auto">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <Link href="/blog">
            <Button variant="ghost" className="text-white hover:bg-white/20">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </motion.div>

        {/* Article */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="bg-white/10 backdrop-blur-sm border border-white/20 overflow-hidden">
            <CardContent className="p-0">
              {/* Article Header */}
              <div className="p-8 pb-6 border-b border-white/10">
                <Badge className="bg-white/10 text-white border-white/20 mb-4">
                  {post.category}
                </Badge>
                
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  {post.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-4 text-white/60 text-sm">
                  <span className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {post.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(post.date).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {post.readTime}
                  </span>
                </div>
              </div>

              {/* Article Content */}
              <div 
                className="prose prose-invert prose-lg max-w-none p-8"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Article Footer */}
              <div className="p-8 pt-6 border-t border-white/10">
                <div className="flex justify-between items-center">
                  <div className="flex gap-3">
                    <Button variant="ghost" className="text-white hover:bg-white/20">
                      <Heart className="w-4 h-4 mr-2" />
                      Like
                    </Button>
                    <Button variant="ghost" className="text-white hover:bg-white/20">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                  </div>
                  
                  <Link href="/blog">
                    <Button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700">
                      More Articles
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.article>

        {/* Related Articles */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Keep Reading</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all cursor-pointer">
              <CardContent className="p-6">
                <h3 className="font-semibold text-white mb-2">
                  Desert Island Discs: What Your Choices Say About You
                </h3>
                <p className="text-white/60 text-sm">
                  Psychologists reveal how your essential songs reflect your personality...
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all cursor-pointer">
              <CardContent className="p-6">
                <h3 className="font-semibold text-white mb-2">
                  The Rise of Musical Social Gaming
                </h3>
                <p className="text-white/60 text-sm">
                  How music-based social games are creating deeper connections...
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
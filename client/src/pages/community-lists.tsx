import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Music, Users, TrendingUp, ArrowRight, Trophy } from "lucide-react";
import { CommunityLeaderboard } from "@/components/community-leaderboard";

interface CommunityList {
  id: number;
  title: string;
  description: string;
  slug: string;
  emoji: string;
  isActive: boolean;
  createdAt: string;
}

export default function CommunityLists() {
  const [, setLocation] = useLocation();

  const { data: lists, isLoading } = useQuery({
    queryKey: ["/api/community-lists"],
    queryFn: async () => {
      const response = await fetch("/api/community-lists");
      if (!response.ok) throw new Error("Failed to fetch community lists");
      return response.json() as Promise<CommunityList[]>;
    },
  });

  // Add Google Tag Manager tracking
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'page_view', {
        page_title: 'Community Lists',
        page_location: window.location.href
      });
    }
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
            <p className="text-white mt-4">Loading community lists...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-16">

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            🎵 Have Your Say
          </h1>
          <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
            What's the best song ever? The perfect driving tune? Share your picks and see what the community thinks.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-white/70">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-purple-400" />
              <span>Trending picks</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-400" />
              <span>Community voted</span>
            </div>
            <div className="flex items-center gap-2">
              <Music className="w-5 h-5 text-purple-400" />
              <span>Spotify powered</span>
            </div>
          </div>
        </div>

        {/* Featured Lists - Top 6 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {lists?.slice(0, 6).map((list) => (
            <Card 
              key={list.id} 
              className="bg-gradient-to-br from-slate-900/80 via-purple-900/80 to-slate-900/80 backdrop-blur-xl border border-white/20 hover:border-purple-400/50 transition-all duration-300 cursor-pointer group"
              onClick={() => setLocation(`/community-lists/${list.slug}`)}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="text-4xl">{list.emoji}</div>
                  <Badge className="bg-gradient-to-r from-green-600 to-teal-600 text-white border-0">
                    Active
                  </Badge>
                </div>
                <CardTitle className="text-xl text-white group-hover:text-purple-300 transition-colors mb-2">
                  {list.title}
                </CardTitle>
                <p className="text-white/70 text-sm line-clamp-2">
                  {list.description}
                </p>
              </CardHeader>
              
              <CardContent>
                {/* Top 3 Songs Preview */}
                <div className="space-y-3 mb-4">
                  <h4 className="text-white/80 text-sm font-medium flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-yellow-400" />
                    Top Submissions
                  </h4>
                  
                  {/* Mock top 3 for preview */}
                  {[
                    { position: 1, title: "Bohemian Rhapsody", artist: "Queen", votes: 24 },
                    { position: 2, title: "Stairway to Heaven", artist: "Led Zeppelin", votes: 18 },
                    { position: 3, title: "Hotel California", artist: "Eagles", votes: 15 }
                  ].slice(0, 3).map((song) => (
                    <div key={song.position} className="flex items-center gap-3 p-2 bg-white/5 rounded-lg">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        song.position === 1 ? 'bg-yellow-500 text-black' :
                        song.position === 2 ? 'bg-gray-400 text-black' :
                        'bg-orange-500 text-black'
                      }`}>
                        {song.position}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-medium truncate">{song.title}</p>
                        <p className="text-white/60 text-xs truncate">{song.artist}</p>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-white/60">
                        <TrendingUp className="w-3 h-3" />
                        {song.votes}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                  <span className="text-white/60 text-sm">Join the conversation</span>
                  <Button 
                    size="sm" 
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700"
                  >
                    Add Song
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Show More Button */}
        {lists && lists.length > 6 && (
          <div className="text-center mt-12">
            <Button 
              size="lg"
              variant="outline" 
              className="border-white/20 text-white hover:bg-white/10 px-8"
            >
              View All {lists.length} Lists
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}

        {/* Empty State */}
        {lists && lists.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🎵</div>
            <h3 className="text-2xl font-bold text-white mb-2">No Lists Yet</h3>
            <p className="text-white/80 mb-6">
              Community lists are coming soon! Check back later for exciting music discussions.
            </p>
            <Link href="/">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700">
                Start Playing Games
              </Button>
            </Link>
          </div>
        )}

        {/* Community Stats */}
        <div className="mt-16">
          <Card className="bg-gradient-to-br from-slate-900/80 via-purple-900/80 to-slate-900/80 backdrop-blur-xl border border-white/20">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">Community Impact</h2>
                <p className="text-white/70">Together we're building the ultimate music collections</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-white mb-2">
                    {lists?.length || 0}
                  </div>
                  <p className="text-white/60">Active Lists</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white mb-2">1,247</div>
                  <p className="text-white/60">Songs Submitted</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white mb-2">5,689</div>
                  <p className="text-white/60">Votes Cast</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white mb-2">342</div>
                  <p className="text-white/60">Contributors</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
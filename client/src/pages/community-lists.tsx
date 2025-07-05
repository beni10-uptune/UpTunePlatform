import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Music, Users, TrendingUp, ArrowRight } from "lucide-react";
import { Navigation } from "@/components/navigation";
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
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-sm border-b border-white/20">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between relative">
            <div className="text-white font-bold text-xl">Uptune Community</div>
            <Navigation variant="header" />
            <Navigation variant="mobile" />
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            🎵 Community Playlists
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            What's the best song ever? The perfect driving tune? Share your picks and see what the community thinks.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-white/80">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              <span>Trending picks</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <span>Community voted</span>
            </div>
            <div className="flex items-center gap-2">
              <Music className="w-5 h-5" />
              <span>Spotify powered</span>
            </div>
          </div>
        </div>

        {/* Community Lists Grid with Leaderboard Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Lists Section */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
            {lists?.map((list) => (
            <Card 
              key={list.id} 
              className="bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 hover:scale-105 cursor-pointer group border border-white/20"
              onClick={() => setLocation(`/community-lists/${list.slug}`)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="text-4xl mb-2">{list.emoji}</div>
                  <Badge className="bg-gradient-to-r from-green-600 to-teal-600 text-white border-0">
                    Active
                  </Badge>
                </div>
                <CardTitle className="text-xl text-white group-hover:text-purple-300 transition-colors">
                  {list.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/70 mb-4 line-clamp-3">
                  {list.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-white/60">
                    Join the conversation
                  </div>
                  <ArrowRight className="w-4 h-4 text-purple-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          ))}
          </div>
          
          {/* Leaderboard Sidebar */}
          <div className="lg:col-span-1">
            <CommunityLeaderboard />
          </div>
        </div>

        {/* Empty State */}
        {lists && lists.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🎵</div>
            <h3 className="text-2xl font-bold text-white mb-2">No Lists Yet</h3>
            <p className="text-white/80 mb-6">
              Community lists are coming soon! Check back later for exciting music discussions.
            </p>
            <Link href="/">
              <Button className="bg-white text-purple-600 hover:bg-white/90">
                Start Playing Games
              </Button>
            </Link>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-4">
              🚀 Ready to Share Your Music Taste?
            </h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Each list is a chance to discover new favorites and share the songs that define your world. 
              Vote for your favorites and watch the community's taste evolve in real-time!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/game-menu">
                <Button className="bg-white text-purple-600 hover:bg-white/90">
                  Play Music Games
                </Button>
              </Link>
              <Link href="/weekly-challenge">
                <Button variant="outline" className="text-white border-white hover:bg-white/20">
                  Weekly Challenges
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
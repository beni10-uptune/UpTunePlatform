import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Music, Users, TrendingUp, ArrowRight, Trophy, Grid3X3, List, Eye } from "lucide-react";
import { CommunityLeaderboard } from "@/components/community-leaderboard";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { motion } from "framer-motion";

interface CommunityList {
  id: number;
  title: string;
  description: string;
  slug: string;
  emoji: string;
  isActive: boolean;
  createdAt: string;
}

interface ListEntry {
  id: number;
  listId: number;
  userId?: number;
  guestSessionId?: string;
  spotifyTrackId: string;
  trackTitle: string;
  artistName: string;
  albumName: string;
  albumArt: string;
  reason?: string;
  voteCount: number;
  submitterName?: string;
  createdAt: string;
}

interface ListWithEntries extends CommunityList {
  entries?: ListEntry[];
  totalVotes?: number;
}

export default function CommunityLists() {
  const [, setLocation] = useLocation();
  const [showAllLists, setShowAllLists] = useState(false);
  const [listsWithEntries, setListsWithEntries] = useState<ListWithEntries[]>([]);

  const { data: lists, isLoading } = useQuery({
    queryKey: ["/api/community-lists"],
    queryFn: async () => {
      const response = await fetch("/api/community-lists");
      if (!response.ok) throw new Error("Failed to fetch community lists");
      return response.json() as Promise<CommunityList[]>;
    },
  });

  // Fetch entries for each list
  useEffect(() => {
    const fetchEntriesForLists = async () => {
      if (!lists || lists.length === 0) return;

      const listsWithData = await Promise.all(
        lists.map(async (list) => {
          try {
            const response = await fetch(`/api/community-lists/${list.id}/entries`);
            if (!response.ok) throw new Error(`Failed to fetch entries for list ${list.id}`);
            const entries: ListEntry[] = await response.json();
            
            // Calculate total votes
            const totalVotes = entries.reduce((sum, entry) => sum + entry.voteCount, 0);
            
            return {
              ...list,
              entries,
              totalVotes
            };
          } catch (error) {
            console.error(`Error fetching entries for list ${list.id}:`, error);
            return {
              ...list,
              entries: [],
              totalVotes: 0
            };
          }
        })
      );

      // Sort by total votes (descending)
      const sortedLists = listsWithData.sort((a, b) => (b.totalVotes || 0) - (a.totalVotes || 0));
      setListsWithEntries(sortedLists);
    };

    fetchEntriesForLists();
  }, [lists]);

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

        {/* View All Lists Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <Button
            onClick={() => setShowAllLists(true)}
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            <Eye className="w-5 h-5 mr-2" />
            View All {listsWithEntries.length} Lists
          </Button>
        </motion.div>

        {/* Featured Lists - Top 6 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {listsWithEntries.slice(0, 6).map((list) => (
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
                  
                  {/* Show real top 3 songs */}
                  {list.entries && list.entries.length > 0 ? (
                    list.entries
                      .sort((a, b) => b.voteCount - a.voteCount)
                      .slice(0, 3)
                      .map((entry, index) => (
                        <div key={entry.id} className="flex items-center gap-3 p-2 bg-white/5 rounded-lg">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                            index === 0 ? 'bg-yellow-500 text-black' :
                            index === 1 ? 'bg-gray-400 text-black' :
                            'bg-orange-500 text-black'
                          }`}>
                            {index + 1}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-white text-sm font-medium truncate">{entry.trackTitle}</p>
                            <p className="text-white/60 text-xs truncate">{entry.artistName}</p>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-white/60">
                            <TrendingUp className="w-3 h-3" />
                            {entry.voteCount}
                          </div>
                        </div>
                      ))
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-white/50 text-sm">No songs submitted yet</p>
                      <p className="text-white/40 text-xs mt-1">Be the first to add a song!</p>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                  <div className="flex items-center gap-3">
                    <span className="text-white/60 text-sm">
                      {list.entries?.length || 0} songs
                    </span>
                    <span className="text-white/40">•</span>
                    <span className="text-white/60 text-sm">
                      {list.totalVotes || 0} total votes
                    </span>
                  </div>
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

        {/* All Lists Dialog */}
        <Dialog open={showAllLists} onOpenChange={setShowAllLists}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 border border-white/20">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-white flex items-center gap-3">
                <Grid3X3 className="w-6 h-6 text-purple-400" />
                All Community Lists ({listsWithEntries.length})
              </DialogTitle>
            </DialogHeader>
            
            <div className="mt-6 space-y-4">
              {listsWithEntries.map((list, index) => (
                <motion.div
                  key={list.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="bg-white/5 backdrop-blur-sm rounded-lg p-4 hover:bg-white/10 transition-all duration-200 cursor-pointer border border-white/10 hover:border-purple-400/50"
                  onClick={() => {
                    setShowAllLists(false);
                    setLocation(`/community-lists/${list.slug}`);
                  }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">{list.emoji}</div>
                      <div className="flex-1">
                        <h3 className="text-white font-semibold text-lg">{list.title}</h3>
                        <p className="text-white/60 text-sm mt-1">{list.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0">
                        {list.entries?.length || 0} songs
                      </Badge>
                      <Badge className="bg-gradient-to-r from-green-600 to-teal-600 text-white border-0">
                        {list.totalVotes || 0} votes
                      </Badge>
                    </div>
                  </div>
                  
                  {/* Top 3 Songs Mini Preview */}
                  {list.entries && list.entries.length > 0 && (
                    <div className="mt-3 flex gap-2">
                      {list.entries
                        .sort((a, b) => b.voteCount - a.voteCount)
                        .slice(0, 3)
                        .map((entry, idx) => (
                          <div key={entry.id} className="flex items-center gap-2 bg-white/5 rounded px-2 py-1 text-xs">
                            <span className={`font-bold ${
                              idx === 0 ? 'text-yellow-400' :
                              idx === 1 ? 'text-gray-300' :
                              'text-orange-400'
                            }`}>#{idx + 1}</span>
                            <span className="text-white/80 truncate max-w-[150px]">{entry.trackTitle}</span>
                          </div>
                        ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </DialogContent>
        </Dialog>

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
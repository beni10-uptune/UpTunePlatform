import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Music, Users, TrendingUp, ArrowRight, Trophy, Grid3X3, List, Eye, Crown, Vote } from "lucide-react";
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
      <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            <TrendingUp className="w-8 h-8 sm:w-10 sm:h-10 text-purple-400" />
            Have Your Say
          </h1>
          <p className="text-lg sm:text-xl text-white/80 mb-8 max-w-3xl mx-auto">
            Vote for your favorite songs. Shape the playlists that define music moments.
          </p>
        </motion.div>

        {/* Community Lists Grid - Card Design */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {listsWithEntries.slice(0, 4).map((list, index) => (
            <motion.div
              key={list.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group"
            >
              <Card className="bg-gradient-to-br from-slate-800/90 via-purple-900/70 to-slate-800/90 backdrop-blur-sm border border-white/20 hover:border-purple-400/50 transition-all duration-300 h-full shadow-lg hover:shadow-xl">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="text-4xl p-3 bg-white/10 rounded-xl">{list.emoji}</div>
                      <div>
                        <h3 className="font-bold text-xl text-white mb-2">{list.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-white/70">
                          <span className="flex items-center gap-2">
                            <Music className="w-4 h-4" />
                            {list.entries?.length || 0} songs
                          </span>
                          <span className="flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            Live voting
                          </span>
                        </div>
                      </div>
                    </div>
                    <Badge className="bg-green-600/80 text-green-100 border-green-600/50 text-sm px-3 py-1">
                      Active
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Top 3 Songs with Voting - Exact Code from community-lists-preview */}
                  {list.entries && list.entries.length > 0 ? (
                    <>
                      <div className="space-y-3">
                        {list.entries
                          .sort((a, b) => b.voteCount - a.voteCount)
                          .slice(0, 3)
                          .map((entry, entryIndex) => (
                            <motion.div 
                              key={entry.id} 
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.4, delay: entryIndex * 0.1 }}
                              className="flex items-center gap-4 p-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/10 transition-all duration-200"
                            >
                              <div className="flex items-center gap-3 min-w-0 flex-1">
                                <div className="flex items-center gap-2">
                                  {entryIndex === 0 && <Crown className="w-5 h-5 text-yellow-400 flex-shrink-0" />}
                                  <span className={`text-sm font-bold flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                                    entryIndex === 0 ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white' :
                                    entryIndex === 1 ? 'bg-gradient-to-r from-gray-400 to-gray-500 text-white' :
                                    'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                                  }`}>
                                    {entryIndex + 1}
                                  </span>
                                </div>
                                {entry.albumArt && (
                                  <img 
                                    src={entry.albumArt} 
                                    alt={entry.trackTitle}
                                    className="w-10 h-10 rounded-lg object-cover flex-shrink-0 shadow-md"
                                  />
                                )}
                                <div className="min-w-0 flex-1">
                                  <p className="font-semibold text-sm truncate text-white mb-1">{entry.trackTitle}</p>
                                  <p className="text-xs text-white/70 truncate">{entry.artistName}</p>
                                </div>
                              </div>
                              <div className="text-right flex-shrink-0">
                                <div className="font-bold text-lg text-purple-300">
                                  {entry.voteCount > 0 ? `+${entry.voteCount}` : entry.voteCount}
                                </div>
                                <div className="text-xs text-white/50">votes</div>
                              </div>
                            </motion.div>
                          ))}
                      </div>
                      
                      <Button
                        onClick={() => setLocation(`/community-lists/${list.slug}`)}
                        className="w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 transition-all duration-200 py-3 font-semibold shadow-lg hover:shadow-xl"
                      >
                        <Vote className="w-5 h-5 mr-2" />
                        Vote & Submit Songs
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </>
                  ) : (
                    <div className="text-center py-8">
                      <div className="text-4xl mb-4 p-4 bg-white/10 rounded-full inline-block">🎵</div>
                      <p className="text-base text-white/70 mb-6 font-medium">No songs yet - be the first!</p>
                      <Button
                        onClick={() => setLocation(`/community-lists/${list.slug}`)}
                        className="bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 px-6 py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                      >
                        Submit First Song
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* View All Lists Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mb-8"
        >
          <Button
            onClick={() => setShowAllLists(true)}
            size="lg"
            className="bg-gradient-to-r from-slate-700 to-slate-600 text-white hover:from-slate-600 hover:to-slate-500 shadow-lg transform hover:scale-105 transition-all duration-200 px-8 py-3"
          >
            <Grid3X3 className="w-4 h-4 mr-2" />
            View All {listsWithEntries.length} Community Lists
          </Button>
        </motion.div>

        {/* Community Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center"
        >
          <p className="text-white/80 text-base sm:text-lg mb-2">
            <strong className="text-xl sm:text-2xl font-bold text-white bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {listsWithEntries.reduce((total, list) => total + (list.entries?.length || 0), 0)}
            </strong> 
            <span className="ml-2">songs elevating the community</span>
          </p>
          <p className="text-white/60 text-sm">Join thousands creating the ultimate playlists</p>
        </motion.div>
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
                className="bg-gradient-to-br from-slate-800/80 via-purple-900/60 to-slate-800/80 backdrop-blur-sm rounded-lg p-4 hover:bg-gradient-to-br hover:from-slate-700/80 hover:via-purple-800/60 hover:to-slate-700/80 transition-all duration-200 cursor-pointer border border-white/20 hover:border-purple-400/50"
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
                      <p className="text-white/70 text-sm mt-1">{list.description}</p>
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
                        <div key={entry.id} className="flex items-center gap-2 bg-black/40 rounded px-2 py-1 text-xs border border-white/10">
                          <span className={`font-bold ${
                            idx === 0 ? 'text-yellow-400' :
                            idx === 1 ? 'text-gray-300' :
                            'text-orange-400'
                          }`}>#{idx + 1}</span>
                          <span className="text-white/90 truncate max-w-[150px]">{entry.trackTitle}</span>
                        </div>
                      ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
import { useState, useEffect } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, Vote, ArrowRight, Music, Crown } from "lucide-react";
import { motion } from "framer-motion";

interface CommunityList {
  id: number;
  title: string;
  description: string;
  slug: string;
  emoji: string;
  isActive: boolean;
  isWeeklyChallenge: boolean;
  createdAt: string;
}

interface ListEntry {
  id: number;
  listId: number;
  spotifyTrackId: string;
  songTitle: string;
  artistName: string;
  albumName: string | null;
  imageUrl: string | null;
  contextReason: string;
  submitterName: string | null;
  voteScore: number;
  createdAt: string;
}

interface ListWithTopEntries extends CommunityList {
  topEntries: ListEntry[];
  totalEntries: number;
}

export function CommunityListsPreview() {
  const { data: lists, isLoading } = useQuery({
    queryKey: ["/api/community-lists"],
    queryFn: async () => {
      const response = await fetch("/api/community-lists");
      if (!response.ok) throw new Error("Failed to fetch community lists");
      return response.json() as Promise<CommunityList[]>;
    },
    refetchInterval: 30000, // Refresh every 30 seconds for live data
  });

  // Fetch top entries for each list
  const { data: listsWithEntries } = useQuery({
    queryKey: ["/api/community-lists", "with-entries"],
    queryFn: async () => {
      if (!lists) return [];
      
      const listsWithEntries = await Promise.all(
        lists.map(async (list) => {
          try {
            const response = await fetch(`/api/community-lists/${list.id}/entries`);
            if (!response.ok) return { ...list, topEntries: [], totalEntries: 0 };
            
            const entries = await response.json() as ListEntry[];
            return {
              ...list,
              topEntries: entries.slice(0, 3), // Top 3 entries
              totalEntries: entries.length,
            };
          } catch {
            return { ...list, topEntries: [], totalEntries: 0 };
          }
        })
      );
      
      return listsWithEntries;
    },
    enabled: !!lists,
    refetchInterval: 30000,
  });

  if (isLoading) {
    return (
      <Card className="max-w-6xl mx-auto bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-lg border border-white/20">
        <CardContent className="p-8">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-400"></div>
            <span className="ml-3 text-white/80">Loading community lists...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!listsWithEntries || listsWithEntries.length === 0) {
    return (
      <Card className="max-w-6xl mx-auto bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-lg border border-white/20">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-2xl text-white">
            <Users className="w-6 h-6 text-purple-400" />
            Community Lists Coming Soon
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center pb-8">
          <p className="text-white/70 mb-6">
            Be the first to create viral music lists and get the community voting!
          </p>
          <Link href="/community-lists">
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700">
              Create First List
            </Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-7xl mx-auto bg-gradient-to-br from-slate-900/80 via-purple-900/80 to-slate-900/80 backdrop-blur-xl border border-white/20 shadow-2xl">
      <CardHeader className="text-center pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <CardTitle className="flex items-center justify-center gap-3 text-3xl font-bold text-white mb-4">
            <TrendingUp className="w-8 h-8 text-purple-400" />
            Have Your Say
          </CardTitle>
          <p className="text-white/80 text-xl max-w-2xl mx-auto leading-relaxed">
            Vote for your favorite songs. Shape the playlists that define music moments.
          </p>
        </motion.div>
      </CardHeader>
      
      <CardContent className="space-y-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {listsWithEntries.slice(0, 4).map((list, index) => (
            <motion.div
              key={list.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group"
            >
              <Card className="bg-white/5 backdrop-blur-lg hover:bg-white/10 transition-all duration-300 h-full border border-white/30 hover:border-purple-400/50 shadow-lg hover:shadow-xl group-hover:scale-[1.02]">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-4">
                      <div className="text-3xl p-2 bg-white/10 rounded-xl">{list.emoji}</div>
                      <div>
                        <h3 className="font-bold text-xl text-white mb-2">{list.title}</h3>
                        <div className="flex items-center gap-6 text-sm text-white/70">
                          <span className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full">
                            <Music className="w-4 h-4" />
                            {list.totalEntries} songs
                          </span>
                          <span className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full">
                            <Vote className="w-4 h-4" />
                            Live voting
                          </span>
                        </div>
                      </div>
                    </div>
                    {list.isWeeklyChallenge ? (
                      <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0 text-sm px-3 py-1 shadow-lg">
                        Weekly Challenge
                      </Badge>
                    ) : (
                      <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 text-sm px-3 py-1 shadow-lg">
                        Active
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {list.topEntries.length > 0 ? (
                    <>
                      <div className="space-y-3">
                        {list.topEntries.map((entry, entryIndex) => (
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
                              {entry.imageUrl && (
                                <img 
                                  src={entry.imageUrl} 
                                  alt={entry.songTitle}
                                  className="w-10 h-10 rounded-lg object-cover flex-shrink-0 shadow-md"
                                />
                              )}
                              <div className="min-w-0 flex-1">
                                <p className="font-semibold text-sm truncate text-white mb-1">{entry.songTitle}</p>
                                <p className="text-xs text-white/70 truncate">{entry.artistName}</p>
                              </div>
                            </div>
                            <div className="text-right flex-shrink-0">
                              <div className="font-bold text-lg text-purple-300">
                                {entry.voteScore > 0 ? `+${entry.voteScore}` : entry.voteScore}
                              </div>
                              <div className="text-xs text-white/50">votes</div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                      
                      <Link href={`/community-lists/${list.slug}`}>
                        <Button className="w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 transition-all duration-200 py-3 font-semibold shadow-lg hover:shadow-xl">
                          <Vote className="w-5 h-5 mr-2" />
                          Vote & Submit Songs
                          <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                      </Link>
                    </>
                  ) : (
                    <div className="text-center py-8">
                      <div className="text-4xl mb-4 p-4 bg-white/10 rounded-full inline-block">🎵</div>
                      <p className="text-base text-white/70 mb-6 font-medium">No songs yet - be the first!</p>
                      <Link href={`/community-lists/${list.slug}`}>
                        <Button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 px-6 py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-200">
                          Submit First Song
                        </Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        
        {/* Call to Action */}
        <div className="text-center pt-8 border-t border-white/30">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <div className="text-center sm:text-left">
              <p className="text-white/80 text-lg">
                <strong className="text-2xl font-bold text-white bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {listsWithEntries.reduce((total, list) => total + list.totalEntries, 0)}
                </strong> 
                <span className="ml-2">songs elevating the community</span>
              </p>
              <p className="text-white/60 text-sm mt-1">Join thousands creating the ultimate playlists</p>
            </div>
            <Link href="/community-lists">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <TrendingUp className="w-5 h-5 mr-3" />
                Explore All Playlists
                <ArrowRight className="w-5 h-5 ml-3" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </CardContent>
    </Card>
  );
}
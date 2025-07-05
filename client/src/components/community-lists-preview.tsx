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
    <Card className="max-w-6xl mx-auto bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-lg border border-white/20">
      <CardHeader className="text-center pb-4">
        <CardTitle className="flex items-center justify-center gap-2 text-2xl text-white">
          <TrendingUp className="w-6 h-6 text-purple-400" />
          Community Playlists
        </CardTitle>
        <p className="text-white/80 text-lg">
          Vote for your favorite songs. Shape the playlists that define music moments.
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {listsWithEntries.slice(0, 4).map((list, index) => (
            <motion.div
              key={list.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-white/10 backdrop-blur-sm hover:bg-white/15 transition-all duration-200 h-full border border-white/20">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{list.emoji}</div>
                      <div>
                        <h3 className="font-bold text-lg text-white">{list.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-white/60">
                          <span className="flex items-center gap-1">
                            <Music className="w-3 h-3" />
                            {list.totalEntries} songs
                          </span>
                          <span className="flex items-center gap-1">
                            <Vote className="w-3 h-3" />
                            Live voting
                          </span>
                        </div>
                      </div>
                    </div>
                    {list.isWeeklyChallenge ? (
                      <Badge className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white border-0">
                        Weekly Challenge
                      </Badge>
                    ) : (
                      <Badge className="bg-gradient-to-r from-green-600 to-teal-600 text-white border-0">
                        Active
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-3">
                  {list.topEntries.length > 0 ? (
                    <>
                      <div className="space-y-2">
                        {list.topEntries.map((entry, entryIndex) => (
                          <div key={entry.id} className="flex items-center gap-3 p-2 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
                            <div className="flex items-center gap-2 min-w-0">
                              {entryIndex === 0 && <Crown className="w-4 h-4 text-yellow-400 flex-shrink-0" />}
                              <span className="text-sm font-medium text-white/50 flex-shrink-0">
                                #{entryIndex + 1}
                              </span>
                              {entry.imageUrl && (
                                <img 
                                  src={entry.imageUrl} 
                                  alt={entry.songTitle}
                                  className="w-8 h-8 rounded object-cover flex-shrink-0"
                                />
                              )}
                              <div className="min-w-0 flex-1">
                                <p className="font-medium text-sm truncate text-white">{entry.songTitle}</p>
                                <p className="text-xs text-white/60 truncate">{entry.artistName}</p>
                              </div>
                            </div>
                            <div className="text-right flex-shrink-0">
                              <div className="font-bold text-sm text-purple-400">
                                {entry.voteScore > 0 ? `+${entry.voteScore}` : entry.voteScore}
                              </div>
                              <div className="text-xs text-white/40">votes</div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <Link href={`/community-lists/${list.slug}`}>
                        <Button className="w-full mt-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20">
                          <Vote className="w-4 h-4 mr-2" />
                          Vote & Submit Songs
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </>
                  ) : (
                    <div className="text-center py-4">
                      <div className="text-2xl mb-2">🎵</div>
                      <p className="text-sm text-white/60 mb-3">No songs yet - be the first!</p>
                      <Link href={`/community-lists/${list.slug}`}>
                        <Button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700">
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
        <div className="text-center pt-4 border-t border-white/20">
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <p className="text-white/70">
              <strong className="text-white">{listsWithEntries.reduce((total, list) => total + list.totalEntries, 0)}</strong> songs elevating the community
            </p>
            <Link href="/community-lists">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700">
                <TrendingUp className="w-4 h-4 mr-2" />
                Explore All Playlists
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
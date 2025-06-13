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
      <Card className="max-w-6xl mx-auto bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 border-purple-200">
        <CardContent className="p-8">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
            <span className="ml-3 text-purple-600">Loading community lists...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!listsWithEntries || listsWithEntries.length === 0) {
    return (
      <Card className="max-w-6xl mx-auto bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 border-purple-200">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-2xl">
            <Users className="w-6 h-6 text-purple-600" />
            Community Lists Coming Soon
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center pb-8">
          <p className="text-gray-600 mb-6">
            Be the first to create viral music lists and get the community voting!
          </p>
          <Link href="/community-lists">
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90">
              Create First List
            </Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-6xl mx-auto bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 border-purple-200">
      <CardHeader className="text-center pb-4">
        <CardTitle className="flex items-center justify-center gap-2 text-2xl">
          <TrendingUp className="w-6 h-6 text-purple-600" />
          Have Your Say
        </CardTitle>
        <p className="text-gray-600 text-lg">
          Vote for your favourite songs and share the tracks that matter to you. See what the community thinks.
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
              <Card className="bg-white/80 hover:bg-white transition-all duration-200 h-full">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{list.emoji}</div>
                      <div>
                        <h3 className="font-bold text-lg text-gray-800">{list.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
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
                      <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                        This Week
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
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
                          <div key={entry.id} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-2 min-w-0">
                              {entryIndex === 0 && <Crown className="w-4 h-4 text-yellow-500 flex-shrink-0" />}
                              <span className="text-sm font-medium text-gray-500 flex-shrink-0">
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
                                <p className="font-medium text-sm truncate">{entry.songTitle}</p>
                                <p className="text-xs text-gray-500 truncate">{entry.artistName}</p>
                              </div>
                            </div>
                            <div className="text-right flex-shrink-0">
                              <div className="font-bold text-sm text-purple-600">
                                {entry.voteScore > 0 ? `+${entry.voteScore}` : entry.voteScore}
                              </div>
                              <div className="text-xs text-gray-400">votes</div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <Link href={`/community-lists/${list.slug}`}>
                        <Button variant="outline" className="w-full mt-3 border-purple-200 text-purple-700 hover:bg-purple-50">
                          <Vote className="w-4 h-4 mr-2" />
                          Vote & Submit Songs
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </>
                  ) : (
                    <div className="text-center py-4">
                      <div className="text-2xl mb-2">🎵</div>
                      <p className="text-sm text-gray-500 mb-3">No songs yet - be the first!</p>
                      <Link href={`/community-lists/${list.slug}`}>
                        <Button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90">
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
        <div className="text-center pt-4 border-t border-purple-200">
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <p className="text-gray-600">
              <strong>{listsWithEntries.reduce((total, list) => total + list.totalEntries, 0)}</strong> songs submitted by the community
            </p>
            <Link href="/community-lists">
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90">
                <TrendingUp className="w-4 h-4 mr-2" />
                View All Lists & Vote
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
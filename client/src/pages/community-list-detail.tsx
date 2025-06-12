import { useState, useEffect } from "react";
import { Link, useRoute } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ChevronUp, ChevronDown, Plus, Music, ExternalLink, Share2, Vote, Users, ListMusic } from "lucide-react";
import { SongSearch } from "@/components/song-search";
import { useToast } from "@/hooks/use-toast";

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

interface SpotifyTrack {
  id: string;
  title: string;
  artist: string;
  album: string;
  imageUrl: string | null;
  spotifyUrl: string;
  previewUrl: string | null;
}

const submissionSchema = z.object({
  contextReason: z.string().min(10, "Please tell us why this song fits the theme (at least 10 characters)"),
  submitterName: z.string().optional()
});

export default function CommunityListDetail() {
  const [, params] = useRoute("/community-lists/:slug");
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false);
  const [selectedSong, setSelectedSong] = useState<SpotifyTrack | null>(null);
  const [guestSessionId] = useState(() => `guest_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof submissionSchema>>({
    resolver: zodResolver(submissionSchema),
    defaultValues: {
      contextReason: "",
      submitterName: ""
    }
  });

  // Fetch list details
  const { data: list, isLoading: listLoading } = useQuery({
    queryKey: ["/api/community-lists", params?.slug],
    queryFn: async () => {
      const response = await fetch(`/api/community-lists`);
      if (!response.ok) throw new Error("Failed to fetch lists");
      const lists = await response.json() as CommunityList[];
      return lists.find(l => l.slug === params?.slug);
    },
    enabled: !!params?.slug,
  });

  // Fetch list entries
  const { data: entries, isLoading: entriesLoading } = useQuery<ListEntry[]>({
    queryKey: ["/api/community-lists", list?.id, "entries"],
    queryFn: async () => {
      const response = await fetch(`/api/community-lists/${list!.id}/entries`);
      if (!response.ok) throw new Error("Failed to fetch entries");
      return response.json();
    },
    enabled: !!list?.id,
    refetchInterval: 5000,
  });

  // Spotify playlist creation mutation
  const createPlaylistMutation = useMutation({
    mutationFn: async () => {
      if (!entries || entries.length === 0) throw new Error("No songs to add to playlist");
      if (!list) throw new Error("List not found");
      
      const trackIds = entries.map((entry: ListEntry) => entry.spotifyTrackId);
      const response = await fetch('/api/spotify/create-playlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${list.title} - Community Picks`,
          description: `${list.description} - Created from Uptune community votes`,
          trackIds
        })
      });
      
      if (!response.ok) throw new Error('Failed to create playlist');
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Playlist Created!",
        description: "Your Spotify playlist has been created successfully",
      });
      if (data.playlistUrl) {
        window.open(data.playlistUrl, '_blank');
      }
    },
    onError: () => {
      toast({
        title: "Playlist Creation Failed",
        description: "Please connect your Spotify account and try again",
        variant: "destructive",
      });
    }
  });

  // Submit entry mutation
  const submitEntryMutation = useMutation({
    mutationFn: async (data: { contextReason: string; submitterName?: string }) => {
      if (!selectedSong || !list) throw new Error("Missing song or list");
      
      const response = await fetch(`/api/community-lists/${list.id}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          spotifyTrackId: selectedSong.id,
          songTitle: selectedSong.title,
          artistName: selectedSong.artist,
          albumName: selectedSong.album,
          imageUrl: selectedSong.imageUrl,
          contextReason: data.contextReason,
          submitterName: data.submitterName || null,
          guestSessionId
        })
      });
      
      if (!response.ok) throw new Error('Failed to submit entry');
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Song Submitted!",
        description: "Your song has been added to the community list",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/community-lists", list?.id, "entries"] });
      setIsSubmitDialogOpen(false);
      setSelectedSong(null);
      form.reset();
    },
    onError: () => {
      toast({
        title: "Submission Failed",
        description: "Please try again",
        variant: "destructive",
      });
    }
  });

  // Vote mutation
  const voteMutation = useMutation({
    mutationFn: async ({ entryId, voteType }: { entryId: number; voteType: 'up' | 'down' }) => {
      const response = await fetch(`/api/community-lists/entries/${entryId}/vote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ voteType, guestSessionId })
      });
      
      if (!response.ok) throw new Error('Failed to vote');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/community-lists", list?.id, "entries"] });
    }
  });

  const handleSongSelect = (song: SpotifyTrack) => {
    setSelectedSong(song);
  };

  const onSubmit = (data: z.infer<typeof submissionSchema>) => {
    submitEntryMutation.mutate(data);
  };

  const createSpotifyPlaylist = () => {
    createPlaylistMutation.mutate();
  };

  if (listLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
          <p className="text-white mt-4">Loading community list...</p>
        </div>
      </div>
    );
  }

  if (!list) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">List Not Found</h1>
          <p className="text-white/80 mb-6">The community list you're looking for doesn't exist.</p>
          <Link href="/community-lists">
            <Button className="bg-white text-purple-600 hover:bg-white/90">
              Back to Community Lists
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-sm border-b border-white/20">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/community-lists">
              <Button variant="ghost" className="text-white hover:bg-white/20">
                ← Back to Lists
              </Button>
            </Link>
            <div className="text-white font-bold text-xl">Uptune Community</div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* List Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">{list.emoji}</div>
          <h1 className="text-4xl font-bold text-white mb-4">{list.title}</h1>
          <p className="text-xl text-white/90 mb-6 max-w-2xl mx-auto">{list.description}</p>
          
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-wrap justify-center gap-4">
              <Dialog open={isSubmitDialogOpen} onOpenChange={setIsSubmitDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-white text-purple-600 hover:bg-white/90 text-lg px-8 py-3">
                    <Plus className="w-5 h-5 mr-2" />
                    Submit Your Song
                  </Button>
                </DialogTrigger>
                
                <DialogContent className="max-w-2xl w-[95vw] sm:w-auto mx-auto max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Submit a Song to {list.title}</DialogTitle>
                  </DialogHeader>
                  
                  <div className="space-y-6">
                    {!selectedSong ? (
                      <div>
                        <h3 className="font-semibold mb-3">Step 1: Search for a song</h3>
                        <SongSearch
                          onSongSelect={handleSongSelect}
                          placeholder="Search for the perfect song..."
                        />
                      </div>
                    ) : (
                      <div>
                        <h3 className="font-semibold mb-3">Selected Song:</h3>
                        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                          {selectedSong.imageUrl && (
                            <img 
                              src={selectedSong.imageUrl} 
                              alt={selectedSong.title}
                              className="w-16 h-16 rounded-lg object-cover"
                            />
                          )}
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{selectedSong.title}</h4>
                            <p className="text-gray-600">{selectedSong.artist}</p>
                            <p className="text-gray-500 text-sm">{selectedSong.album}</p>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setSelectedSong(null)}
                          >
                            Change Song
                          </Button>
                        </div>

                        <Form {...form}>
                          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                              control={form.control}
                              name="contextReason"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Why does this song fit "{list.title}"?</FormLabel>
                                  <FormControl>
                                    <Textarea 
                                      placeholder="Tell us why this song belongs on this list..."
                                      className="min-h-[100px]"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="submitterName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Your Name (Optional)</FormLabel>
                                  <FormControl>
                                    <Input placeholder="How should we credit you?" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <div className="flex gap-4">
                              <Button 
                                type="submit" 
                                className="flex-1"
                                disabled={submitEntryMutation.isPending}
                              >
                                {submitEntryMutation.isPending ? "Submitting..." : "Submit Song"}
                              </Button>
                              <Button 
                                type="button" 
                                variant="outline"
                                onClick={() => {
                                  setIsSubmitDialogOpen(false);
                                  setSelectedSong(null);
                                  form.reset();
                                }}
                              >
                                Cancel
                              </Button>
                            </div>
                          </form>
                        </Form>
                      </div>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
              
              <Link href={`/game-room?theme=${encodeURIComponent(list.title)}`}>
                <Button variant="outline" className="border-white text-white hover:bg-white/20 text-lg px-6 py-3">
                  <Users className="w-5 h-5 mr-2" />
                  Create Private List with Friends
                </Button>
              </Link>
              
              {entries && entries.length > 0 && (
                <Button 
                  variant="outline" 
                  className="border-white text-white hover:bg-white/20 text-lg px-6 py-3"
                  onClick={createSpotifyPlaylist}
                  disabled={createPlaylistMutation.isPending}
                >
                  <ListMusic className="w-5 h-5 mr-2" />
                  {createPlaylistMutation.isPending ? "Creating..." : "Create Spotify Playlist"}
                </Button>
              )}
            </div>
            
            <div className="flex items-center gap-6 text-white/80 text-sm justify-center mt-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Live voting</span>
              </div>
              <div className="flex items-center gap-2">
                <Vote className="w-4 h-4" />
                <span>Vote on every song</span>
              </div>
              <div className="flex items-center gap-2">
                <Music className="w-4 h-4" />
                <span>Real community picks</span>
              </div>
            </div>
          </div>
        </div>

        {/* Entries List */}
        <div className="space-y-4">
          {entriesLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
              <p className="text-white mt-4">Loading songs...</p>
            </div>
          ) : entries && entries.length > 0 ? (
            entries
              .sort((a: ListEntry, b: ListEntry) => b.voteScore - a.voteScore)
              .map((entry: ListEntry, index: number) => (
                <Card key={entry.id} className="bg-white/95 backdrop-blur-sm hover:bg-white transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => voteMutation.mutate({ entryId: entry.id, voteType: 'up' })}
                          className="text-gray-600 hover:text-green-600 p-1"
                          disabled={voteMutation.isPending}
                        >
                          <ChevronUp className="w-5 h-5" />
                        </Button>
                        <span className="font-bold text-lg text-gray-700">{entry.voteScore}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => voteMutation.mutate({ entryId: entry.id, voteType: 'down' })}
                          className="text-gray-600 hover:text-red-600 p-1"
                          disabled={voteMutation.isPending}
                        >
                          <ChevronDown className="w-5 h-5" />
                        </Button>
                      </div>
                      
                      <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                        {entry.imageUrl ? (
                          <img 
                            src={entry.imageUrl} 
                            alt={entry.albumName || entry.songTitle}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Music className="w-8 h-8 text-gray-400" />
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-900 truncate">{entry.songTitle}</h3>
                            <p className="text-gray-600 truncate">{entry.artistName}</p>
                            {entry.albumName && (
                              <p className="text-gray-500 text-sm truncate">{entry.albumName}</p>
                            )}
                          </div>
                          <div className="flex items-center gap-2 ml-4">
                            {index < 3 && (
                              <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                                #{index + 1}
                              </Badge>
                            )}
                          </div>
                        </div>
                        
                        <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                          <p className="text-gray-700 text-sm">{entry.contextReason}</p>
                          {entry.submitterName && (
                            <p className="text-gray-500 text-xs mt-2">— {entry.submitterName}</p>
                          )}
                        </div>
                        
                        <div className="mt-3 flex items-center gap-4">
                          <a
                            href={`https://open.spotify.com/track/${entry.spotifyTrackId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-green-600 hover:text-green-700 text-sm font-medium flex items-center gap-1"
                          >
                            <ExternalLink className="w-4 h-4" />
                            Open in Spotify
                          </a>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
          ) : (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">🎵</div>
              <h3 className="text-2xl font-bold text-white mb-2">No Songs Yet</h3>
              <p className="text-white/80 mb-6">
                Be the first to submit a song to this community list!
              </p>
              <Button 
                className="bg-white text-purple-600 hover:bg-white/90"
                onClick={() => setIsSubmitDialogOpen(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Submit First Song
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
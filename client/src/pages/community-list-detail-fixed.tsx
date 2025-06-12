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
import { ChevronUp, ChevronDown, Plus, Music, ExternalLink, Share2, Vote } from "lucide-react";
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
  submitterName: z.string().min(1, "Name is required"),
  contextReason: z.string().min(10, "Please explain why this song fits (at least 10 characters)"),
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
      submitterName: "",
      contextReason: "",
    },
  });

  // Fetch community list details
  const { data: list, isLoading: listLoading } = useQuery({
    queryKey: ["/api/community-lists", params?.slug],
    queryFn: async () => {
      const response = await fetch(`/api/community-lists/${params?.slug}`);
      if (!response.ok) throw new Error("Failed to fetch community list");
      return response.json() as Promise<CommunityList>;
    },
    enabled: !!params?.slug,
  });

  // Fetch list entries
  const { data: entries, isLoading: entriesLoading } = useQuery({
    queryKey: ["/api/community-lists", list?.id, "entries"],
    queryFn: async () => {
      const response = await fetch(`/api/community-lists/${list?.id}/entries`);
      if (!response.ok) throw new Error("Failed to fetch entries");
      return response.json() as Promise<ListEntry[]>;
    },
    enabled: !!list?.id,
  });

  // Submit entry mutation
  const submitEntryMutation = useMutation({
    mutationFn: async (data: z.infer<typeof submissionSchema>) => {
      if (!selectedSong || !list) throw new Error("Song and list required");
      
      const response = await fetch(`/api/community-lists/${list.id}/entries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          spotifyTrackId: selectedSong.id,
          songTitle: selectedSong.title,
          artistName: selectedSong.artist,
          albumName: selectedSong.album,
          imageUrl: selectedSong.imageUrl,
          submitterName: data.submitterName,
          contextReason: data.contextReason,
        }),
      });
      
      if (!response.ok) throw new Error("Failed to submit entry");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/community-lists", list?.id, "entries"] });
      setIsSubmitDialogOpen(false);
      setSelectedSong(null);
      form.reset();
      toast({
        title: "Song submitted!",
        description: "Your song has been added to the community list.",
      });
    },
    onError: () => {
      toast({
        title: "Submission failed",
        description: "Please try again.",
        variant: "destructive",
      });
    },
  });

  // Vote mutation
  const voteMutation = useMutation({
    mutationFn: async ({ entryId, direction }: { entryId: number; direction: number }) => {
      const response = await fetch(`/api/community-lists/entries/${entryId}/vote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          voteDirection: direction,
          guestSessionId,
        }),
      });
      
      if (!response.ok) throw new Error("Failed to cast vote");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/community-lists", list?.id, "entries"] });
    },
  });

  const handleVote = (entryId: number, direction: number) => {
    voteMutation.mutate({ entryId, direction });
  };

  const handleSongSelect = (song: SpotifyTrack) => {
    setSelectedSong(song);
  };

  const onSubmit = (data: z.infer<typeof submissionSchema>) => {
    submitEntryMutation.mutate(data);
  };

  // Add Google Tag Manager tracking
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).gtag && list) {
      (window as any).gtag('event', 'page_view', {
        page_title: `${list.title} - Community List`,
        page_location: window.location.href
      });
    }
  }, [list]);

  if (listLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
            <p className="text-white mt-4">Loading community list...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!list) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-20">
            <div className="text-6xl mb-4">😅</div>
            <h2 className="text-3xl font-bold text-white mb-4">List Not Found</h2>
            <p className="text-white/80 mb-6">This community list doesn't exist or has been removed.</p>
            <Link href="/community-lists">
              <Button className="bg-white text-purple-600 hover:bg-white/90">
                Browse All Lists
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-sm border-b border-white/20">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/community-lists">
              <Button variant="ghost" className="text-white hover:bg-white/20">
                ← Back to Community Lists
              </Button>
            </Link>
            <Button
              variant="ghost"
              className="text-white hover:bg-white/20"
              onClick={() => {
                navigator.share?.({
                  title: `${list.title} - Uptune Community`,
                  text: list.description,
                  url: window.location.href,
                }) || navigator.clipboard.writeText(window.location.href);
                toast({ title: "Link copied to clipboard!" });
              }}
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
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
            <Dialog open={isSubmitDialogOpen} onOpenChange={setIsSubmitDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-white text-purple-600 hover:bg-white/90 text-lg px-8 py-3">
                  <Plus className="w-5 h-5 mr-2" />
                  Submit Your Song
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
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
                          <h4 className="font-semibold">{selectedSong.title}</h4>
                          <p className="text-gray-600">{selectedSong.artist}</p>
                          <p className="text-sm text-gray-500">{selectedSong.album}</p>
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
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-6">
                          <FormField
                            control={form.control}
                            name="submitterName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Your Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter your name" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="contextReason"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Why does this song fit?</FormLabel>
                                <FormControl>
                                  <Textarea 
                                    placeholder="Tell the community why this song belongs on this list..."
                                    className="min-h-[100px]"
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <div className="flex gap-3">
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
            entries.map((entry, index) => (
              <Card key={entry.id} className="bg-white/95 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="text-2xl font-bold text-purple-600">
                      #{index + 1}
                    </div>
                    
                    {entry.imageUrl && (
                      <img 
                        src={entry.imageUrl} 
                        alt={entry.songTitle}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                    )}
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-bold text-lg">{entry.songTitle}</h3>
                          <p className="text-gray-600">{entry.artistName}</p>
                          {entry.albumName && (
                            <p className="text-sm text-gray-500">{entry.albumName}</p>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <div className="flex flex-col items-center bg-gray-50 rounded-lg p-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-10 w-10 p-0 hover:bg-green-100 hover:scale-110 transition-all"
                              onClick={() => handleVote(entry.id, 1)}
                              disabled={voteMutation.isPending}
                            >
                              <ChevronUp className="w-5 h-5 text-green-600" />
                            </Button>
                            <div className="text-center py-1">
                              <div className="font-bold text-xl text-gray-800">
                                {entry.voteScore}
                              </div>
                              <div className="text-xs text-gray-500">votes</div>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-10 w-10 p-0 hover:bg-red-100 hover:scale-110 transition-all"
                              onClick={() => handleVote(entry.id, -1)}
                              disabled={voteMutation.isPending}
                            >
                              <ChevronDown className="w-5 h-5 text-red-600" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-gray-700 mb-3">{entry.contextReason}</p>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>
                          Submitted by {entry.submitterName || "Anonymous"}
                        </span>
                        <a
                          href={`https://open.spotify.com/track/${entry.spotifyTrackId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-green-600 hover:text-green-700"
                        >
                          <ExternalLink className="w-3 h-3" />
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
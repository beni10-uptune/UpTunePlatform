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
  contextReason: z.string().optional(),
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
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        if (response.status === 401) {
          throw new Error('NEED_AUTH');
        }
        throw new Error(errorData.error || 'Failed to create playlist');
      }
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
    onError: (error) => {
      if (error.message === 'NEED_AUTH') {
        // Redirect to Spotify auth
        window.location.href = '/api/spotify/auth';
      } else {
        toast({
          title: "Playlist Creation Failed",
          description: "There was an issue creating your playlist. Please try again.",
          variant: "destructive",
        });
      }
    }
  });

  // Submit entry mutation
  const submitEntryMutation = useMutation({
    mutationFn: async (data: { contextReason?: string; submitterName?: string }) => {
      if (!selectedSong || !list) throw new Error("Missing song or list");
      
      const response = await fetch(`/api/community-lists/${list.id}/entries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          spotifyTrackId: selectedSong.id,
          songTitle: selectedSong.title,
          artistName: selectedSong.artist,
          albumName: selectedSong.album,
          imageUrl: selectedSong.imageUrl,
          contextReason: data.contextReason || "",
          submitterName: data.submitterName || null,
          guestSessionId
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Failed to submit entry' }));
        console.error('Submission error:', errorData);
        throw errorData;
      }
      return response.json();
    },
    onSuccess: (data) => {
      if (data.isDuplicate) {
        toast({
          title: "Musical Twin Found!",
          description: data.message,
        });
      } else {
        toast({
          title: "Song Submitted!",
          description: "Your song has been added to the community list",
        });
      }
      queryClient.invalidateQueries({ queryKey: ["/api/community-lists", list?.id, "entries"] });
      setIsSubmitDialogOpen(false);
      setSelectedSong(null);
      form.reset();
    },
    onError: (error: any) => {
      if (error.isDuplicate) {
        toast({
          title: "Musical Twin Found!",
          description: error.message,
        });
        queryClient.invalidateQueries({ queryKey: ["/api/community-lists", list?.id, "entries"] });
        setIsSubmitDialogOpen(false);
        setSelectedSong(null);
        form.reset();
      } else {
        toast({
          title: "Submission Failed",
          description: error.message || "Please try again",
          variant: "destructive",
        });
      }
    }
  });

  // Vote mutation
  const voteMutation = useMutation({
    mutationFn: async ({ entryId, voteType }: { entryId: number; voteType: 'up' | 'down' }) => {
      const response = await fetch(`/api/community-lists/entries/${entryId}/vote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ voteDirection: voteType === 'up' ? 1 : -1, guestSessionId })
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Failed to vote' }));
        throw errorData;
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/community-lists", list?.id, "entries"] });
    },
    onError: (error: any) => {
      toast({
        title: "Vote Not Counted",
        description: error.error || "You've already voted for this song",
        variant: "destructive",
      });
    }
  });

  const handleSongSelect = (song: SpotifyTrack) => {
    setSelectedSong(song);
  };

  const onSubmit = (data: z.infer<typeof submissionSchema>) => {
    submitEntryMutation.mutate({
      contextReason: data.contextReason || "",
      submitterName: data.submitterName || ""
    });
  };

  const createSpotifyPlaylist = () => {
    createPlaylistMutation.mutate();
  };

  const shareList = () => {
    if (navigator.share) {
      navigator.share({
        title: `${list?.title} - Uptune Community`,
        text: `Check out this community music list and add your opinion: ${list?.title}`,
        url: window.location.href
      }).catch(() => {
        // Fallback to clipboard
        copyToClipboard();
      });
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      toast({
        title: "Link Copied!",
        description: "Share this link to get your friends' opinions",
      });
    }).catch(() => {
      toast({
        title: "Share this list",
        description: window.location.href,
      });
    });
  };

  if (listLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-200 via-pink-200 to-cyan-200 flex items-center justify-center p-4">
        <div className="text-center bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rotate-2">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-black border-t-transparent mx-auto"></div>
          <p className="text-black font-black mt-4" style={{ fontFamily: "'Arial Black', sans-serif" }}>LOADING...</p>
        </div>
      </div>
    );
  }

  if (!list) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-200 via-pink-200 to-cyan-200 flex items-center justify-center p-4">
        <div className="text-center bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] -rotate-1 max-w-md">
          <h1 className="text-4xl font-black text-black mb-4 bg-gradient-to-r from-purple-400 to-pink-400 px-4 py-2 inline-block border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] rotate-2" style={{ fontFamily: "'Arial Black', sans-serif" }}>LIST NOT FOUND</h1>
          <p className="text-black/80 font-bold mb-6">This community list doesn't exist 😢</p>
          <Link href="/community-lists">
            <Button className="bg-gradient-to-r from-purple-400 to-pink-400 text-white hover:from-purple-500 hover:to-pink-500 font-black border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all" style={{ fontFamily: "'Arial Black', sans-serif" }}>
              BACK TO LISTS
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-200 via-pink-200 to-cyan-200">
      {/* Header */}
      <div className="relative z-10 bg-white border-b-4 border-black">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/community-lists">
              <Button className="bg-cyan-300 hover:bg-cyan-400 text-black font-black border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all" style={{ fontFamily: "'Arial Black', sans-serif" }}>
                ← BACK
              </Button>
            </Link>
            <div className="text-black font-black text-xl" style={{ fontFamily: "'Arial Black', sans-serif" }}>UPTUNE COMMUNITY</div>
            <div className="w-32"></div>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">
        {/* List Header */}
        <div className="text-center mb-12 bg-white border-4 border-black p-8 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] -rotate-1">
          <div className="text-6xl mb-6 bg-yellow-300 border-4 border-black p-4 inline-block shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rotate-6">{list.emoji}</div>
          <h1 className="text-4xl md:text-5xl font-black text-black mb-6" style={{ fontFamily: "'Arial Black', sans-serif", textTransform: 'uppercase' }}>{list.title}</h1>
          <p className="text-xl text-black/80 font-bold mb-8 max-w-3xl mx-auto leading-relaxed">{list.description} 🎵</p>

          <div className="flex flex-col items-center gap-6">
            <div className="flex flex-wrap justify-center gap-4">
              <Dialog open={isSubmitDialogOpen} onOpenChange={setIsSubmitDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-purple-400 to-pink-400 text-white hover:from-purple-500 hover:to-pink-500 font-black border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all text-lg px-8 py-3" style={{ fontFamily: "'Arial Black', sans-serif" }}>
                    <Plus className="w-5 h-5 mr-2" />
                    SUBMIT YOUR SONG
                  </Button>
                </DialogTrigger>
                
                <DialogContent className="max-w-2xl w-[calc(100vw-2rem)] sm:w-auto mx-auto max-h-[90vh] overflow-y-auto p-4 sm:p-6 bg-gradient-to-br from-yellow-100 to-pink-100 border-4 border-black">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-black text-black" style={{ fontFamily: "'Arial Black', sans-serif" }}>SUBMIT TO {list.title.toUpperCase()}</DialogTitle>
                  </DialogHeader>

                  <div className="space-y-6">
                    {!selectedSong ? (
                      <div>
                        <h3 className="font-black mb-3 text-black bg-cyan-300 px-3 py-2 inline-block border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] rotate-1" style={{ fontFamily: "'Arial Black', sans-serif" }}>
                          {list.title.toLowerCase().includes('favourite album')
                            ? "STEP 1: SEARCH ALBUM"
                            : "STEP 1: SEARCH SONG"
                          }
                        </h3>
                        <SongSearch
                          onSongSelect={handleSongSelect}
                          placeholder={
                            list.title.toLowerCase().includes('favourite album')
                              ? "Search for your favourite album..."
                              : "Search for the perfect song..."
                          }
                          searchMode={
                            list.title.toLowerCase().includes('favourite album')
                              ? 'albums'
                              : 'songs'
                          }
                        />
                      </div>
                    ) : (
                      <div>
                        <h3 className="font-black mb-3 text-black bg-green-300 px-3 py-2 inline-block border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] rotate-1" style={{ fontFamily: "'Arial Black', sans-serif" }}>
                          {list.title.toLowerCase().includes('favourite album')
                            ? "SELECTED ALBUM:"
                            : "SELECTED SONG:"
                          }
                        </h3>
                        <div className="flex items-center gap-4 p-4 bg-white border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                          {selectedSong.imageUrl && (
                            <img
                              src={selectedSong.imageUrl}
                              alt={selectedSong.title}
                              className="w-16 h-16 border-2 border-black object-cover shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                            />
                          )}
                          <div className="flex-1">
                            <h4 className="font-black text-black">{selectedSong.title}</h4>
                            <p className="text-black/70 font-bold">{selectedSong.artist}</p>
                            <p className="text-black/50 text-sm font-bold">{selectedSong.album}</p>
                          </div>
                          <Button
                            size="sm"
                            onClick={() => setSelectedSong(null)}
                            className="bg-yellow-400 hover:bg-yellow-500 text-black font-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                            style={{ fontFamily: "'Arial Black', sans-serif" }}
                          >
                            {list.title.toLowerCase().includes('favourite album')
                              ? "CHANGE"
                              : "CHANGE"
                            }
                          </Button>
                        </div>

                        <Form {...form}>
                          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                              control={form.control}
                              name="contextReason"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>
                                    {list.title.toLowerCase().includes('movie') || list.title.toLowerCase().includes('soundtrack') 
                                      ? "What film was it from? (Optional)" 
                                      : list.title.toLowerCase().includes('favourite album')
                                      ? `Why is this your favourite album? (Optional)`
                                      : `Why does this song fit "${list.title}"? (Optional)`}
                                  </FormLabel>
                                  <FormControl>
                                    <Textarea 
                                      placeholder={
                                        list.title.toLowerCase().includes('movie') || list.title.toLowerCase().includes('soundtrack')
                                          ? "e.g., Pulp Fiction, The Matrix, Top Gun..."
                                          : list.title.toLowerCase().includes('favourite album')
                                          ? "Tell us what makes this album special to you..."
                                          : "Tell us why this song belongs on this list..."
                                      }
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
                                className="flex-1 bg-gradient-to-r from-purple-400 to-pink-400 text-white hover:from-purple-500 hover:to-pink-500 font-black border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
                                style={{ fontFamily: "'Arial Black', sans-serif" }}
                                disabled={submitEntryMutation.isPending}
                              >
                                {submitEntryMutation.isPending ? "SUBMITTING..." : "SUBMIT SONG"}
                              </Button>
                              <Button
                                type="button"
                                onClick={() => {
                                  setIsSubmitDialogOpen(false);
                                  setSelectedSong(null);
                                  form.reset();
                                }}
                                className="bg-gray-300 hover:bg-gray-400 text-black font-black border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
                                style={{ fontFamily: "'Arial Black', sans-serif" }}
                              >
                                CANCEL
                              </Button>
                            </div>
                          </form>
                        </Form>
                      </div>
                    )}
                  </div>
                </DialogContent>
              </Dialog>

              <Link href={`/?gameType=soundtrack&theme=${encodeURIComponent(list.title)}`}>
                <Button className="bg-cyan-300 hover:bg-cyan-400 text-black font-black border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all text-lg px-6 py-3" style={{ fontFamily: "'Arial Black', sans-serif" }}>
                  <Users className="w-5 h-5 mr-2" />
                  BUILD WITH FRIENDS
                </Button>
              </Link>

              {entries && entries.length > 0 && (
                <Button
                  className="bg-green-400 hover:bg-green-500 text-white font-black border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all text-lg px-6 py-3"
                  style={{ fontFamily: "'Arial Black', sans-serif" }}
                  onClick={createSpotifyPlaylist}
                  disabled={createPlaylistMutation.isPending}
                >
                  <ListMusic className="w-5 h-5 mr-2" />
                  {createPlaylistMutation.isPending ? "CREATING..." : "CREATE PLAYLIST"}
                </Button>
              )}

              <Button
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-black border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all text-lg px-6 py-3"
                style={{ fontFamily: "'Arial Black', sans-serif" }}
                onClick={shareList}
              >
                <Share2 className="w-5 h-5 mr-2" />
                SHARE LIST
              </Button>
            </div>

            <div className="flex items-center gap-6 text-black font-bold text-sm justify-center mt-4 flex-wrap">
              <div className="flex items-center gap-2 bg-green-200 px-3 py-2 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse border border-black"></div>
                <span>Live voting</span>
              </div>
              <div className="flex items-center gap-2 bg-pink-200 px-3 py-2 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <Vote className="w-4 h-4" />
                <span>Vote on every song</span>
              </div>
              <div className="flex items-center gap-2 bg-cyan-200 px-3 py-2 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <Music className="w-4 h-4" />
                <span>Real community picks</span>
              </div>
            </div>
          </div>
        </div>

        {/* Entries List */}
        <div className="space-y-4">
          {entriesLoading ? (
            <div className="text-center py-12 bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rotate-1">
              <div className="animate-spin rounded-full h-8 w-8 border-4 border-black border-t-transparent mx-auto"></div>
              <p className="text-black font-black mt-4" style={{ fontFamily: "'Arial Black', sans-serif" }}>LOADING SONGS...</p>
            </div>
          ) : entries && entries.length > 0 ? (
            entries
              .sort((a: ListEntry, b: ListEntry) => b.voteScore - a.voteScore)
              .map((entry: ListEntry, index: number) => (
                <Card key={entry.id} className={`bg-gradient-to-br from-cyan-200 to-purple-200 border-4 border-black hover:from-cyan-300 hover:to-purple-300 transition-all duration-300 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] ${index % 2 === 0 ? 'rotate-1' : '-rotate-1'}`}>
                  <CardContent className="p-6 bg-white">
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col items-center gap-2 bg-yellow-100 border-3 border-black p-2 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                        <Button
                          size="sm"
                          onClick={() => voteMutation.mutate({ entryId: entry.id, voteType: 'up' })}
                          className="bg-green-400 hover:bg-green-500 text-white p-1 h-8 w-8 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                          disabled={voteMutation.isPending}
                        >
                          <ChevronUp className="w-5 h-5" />
                        </Button>
                        <span className="font-black text-lg text-black" style={{ fontFamily: "'Arial Black', sans-serif" }}>{entry.voteScore > 0 ? `+${entry.voteScore}` : entry.voteScore}</span>
                        <Button
                          size="sm"
                          onClick={() => voteMutation.mutate({ entryId: entry.id, voteType: 'down' })}
                          className="bg-red-400 hover:bg-red-500 text-white p-1 h-8 w-8 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                          disabled={voteMutation.isPending}
                        >
                          <ChevronDown className="w-5 h-5" />
                        </Button>
                      </div>

                      <div className="w-16 h-16 border-3 border-black flex items-center justify-center overflow-hidden flex-shrink-0 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] bg-gray-200">
                        {entry.imageUrl ? (
                          <img
                            src={entry.imageUrl}
                            alt={entry.albumName || entry.songTitle}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Music className="w-8 h-8 text-black/40" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-black text-black truncate" style={{ fontFamily: "'Arial Black', sans-serif" }}>{entry.songTitle}</h3>
                            <p className="text-black/70 font-bold truncate">{entry.artistName}</p>
                            {entry.albumName && (
                              <p className="text-black/50 text-sm font-bold truncate">{entry.albumName}</p>
                            )}
                          </div>
                          <div className="flex items-center gap-2 ml-4">
                            {index < 3 && (
                              <Badge className={`${
                                index === 0 ? 'bg-yellow-400' :
                                index === 1 ? 'bg-gray-300' :
                                'bg-pink-400'
                              } text-black border-3 border-black font-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]`} style={{ fontFamily: "'Arial Black', sans-serif" }}>
                                #{index + 1}
                              </Badge>
                            )}
                          </div>
                        </div>

                        <div className="mt-3 p-3 bg-pink-100 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                          <p className="text-black/80 text-sm font-bold">{entry.contextReason}</p>
                          {entry.submitterName && (
                            <p className="text-black/60 text-xs font-bold mt-2">— {entry.submitterName}</p>
                          )}
                        </div>

                        <div className="mt-3 flex items-center gap-4">
                          <a
                            href={`https://open.spotify.com/track/${entry.spotifyTrackId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-black bg-green-400 hover:bg-green-500 px-3 py-1 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all text-sm font-black flex items-center gap-1"
                            style={{ fontFamily: "'Arial Black', sans-serif" }}
                          >
                            <ExternalLink className="w-4 h-4" />
                            SPOTIFY
                          </a>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
          ) : (
            <div className="text-center py-12 bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] -rotate-1">
              <div className="text-4xl mb-4 bg-yellow-300 border-4 border-black p-4 inline-block shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] rotate-6">🎵</div>
              <h3 className="text-2xl font-black text-black mb-2" style={{ fontFamily: "'Arial Black', sans-serif" }}>NO SONGS YET</h3>
              <p className="text-black/80 font-bold mb-6">
                Be the first to submit a song! 🚀
              </p>
              <Button
                className="bg-gradient-to-r from-purple-400 to-pink-400 text-white hover:from-purple-500 hover:to-pink-500 font-black border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
                style={{ fontFamily: "'Arial Black', sans-serif" }}
                onClick={() => setIsSubmitDialogOpen(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                SUBMIT FIRST SONG
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
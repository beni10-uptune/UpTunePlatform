import { useParams, Link } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Play, Pause, Heart, Share2, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { Journey, CommunityMixtape, MixtapeSubmission, PollVote } from "@shared/schema";

interface JourneyContent {
  sections: Array<{
    type: 'intro' | 'content' | 'spotify_preview' | 'poll' | 'community_mixtape';
    title?: string;
    content?: string;
    track_id?: string;
    artist?: string;
    context?: string;
    id?: string;
    question?: string;
    options?: string[];
    description?: string;
    prompt?: string;
  }>;
}

interface SpotifyTrack {
  id: string;
  name: string;
  artists: Array<{ name: string }>;
  external_urls: { spotify: string };
  preview_url: string | null;
}

export default function JourneyPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [currentSection, setCurrentSection] = useState(0);
  const [pollVotes, setPollVotes] = useState<Record<string, string>>({});
  const [audioPlaying, setAudioPlaying] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTrack, setSelectedTrack] = useState<SpotifyTrack | null>(null);

  // Fetch journey data
  const { data: journey, isLoading } = useQuery({
    queryKey: ['/api/journeys', slug],
    queryFn: async () => {
      const response = await fetch(`/api/journeys/${slug}`);
      if (!response.ok) throw new Error('Journey not found');
      return response.json() as Promise<Journey>;
    }
  });

  // Parse journey content
  const content: JourneyContent = journey?.content ? JSON.parse(journey.content) : { sections: [] };
  const totalSections = content.sections.length;
  const progress = totalSections > 0 ? ((currentSection + 1) / totalSections) * 100 : 0;

  // Fetch mixtapes for this journey
  const { data: mixtapes } = useQuery({
    queryKey: ['/api/journeys', journey?.id, 'mixtapes'],
    queryFn: async () => {
      if (!journey?.id) return [];
      const response = await fetch(`/api/journeys/${journey.id}/mixtapes`);
      return response.json() as Promise<CommunityMixtape[]>;
    },
    enabled: !!journey?.id
  });

  // Search Spotify tracks
  const { data: searchResults } = useQuery({
    queryKey: ['/api/spotify/search', searchTerm],
    queryFn: async () => {
      if (!searchTerm.trim()) return [];
      const response = await fetch(`/api/spotify/search?q=${encodeURIComponent(searchTerm)}&limit=10`);
      return response.json() as Promise<SpotifyTrack[]>;
    },
    enabled: searchTerm.length > 2
  });

  // Submit to mixtape mutation
  const submitToMixtape = useMutation({
    mutationFn: async ({ mixtapeId, track }: { mixtapeId: number, track: SpotifyTrack }) => {
      const response = await fetch(`/api/mixtapes/${mixtapeId}/submissions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          spotifyTrackId: track.id,
          trackTitle: track.name,
          trackArtist: track.artists[0]?.name || 'Unknown Artist',
          spotifyUrl: track.external_urls.spotify,
          reason: `Added from "${journey?.title}" journey`
        })
      });
      return response.json();
    },
    onSuccess: () => {
      toast({ title: "Song added to mixtape!", description: "Your contribution has been added." });
      setSelectedTrack(null);
      setSearchTerm("");
      queryClient.invalidateQueries({ queryKey: ['/api/mixtapes'] });
    },
    onError: (error: any) => {
      toast({ 
        title: "Failed to add song", 
        description: error.message || "Something went wrong",
        variant: "destructive"
      });
    }
  });

  // Poll vote mutation
  const votePoll = useMutation({
    mutationFn: async ({ pollId, option }: { pollId: string, option: string }) => {
      const response = await fetch(`/api/polls/${pollId}/vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chosenOption: option,
          guestSessionId: `guest_${Date.now()}_${Math.random()}`
        })
      });
      return response.json();
    },
    onSuccess: () => {
      toast({ title: "Vote recorded!", description: "Thank you for participating." });
    }
  });

  const handlePollVote = (pollId: string, option: string) => {
    setPollVotes(prev => ({ ...prev, [pollId]: option }));
    votePoll.mutate({ pollId, option });
  };

  const handleAudioToggle = (trackId: string, previewUrl: string | null) => {
    if (!previewUrl) {
      toast({ title: "No preview available", description: "This track doesn't have a preview.", variant: "destructive" });
      return;
    }

    if (audioPlaying === trackId) {
      setAudioPlaying(null);
    } else {
      setAudioPlaying(trackId);
      // In a real implementation, you'd play the audio here
      setTimeout(() => setAudioPlaying(null), 30000); // Auto-stop after 30 seconds
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-6">
        <div className="container mx-auto max-w-4xl">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
            <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!journey) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-6">
        <div className="container mx-auto max-w-4xl text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Journey Not Found</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">The musical journey you're looking for doesn't exist.</p>
          <Link href="/journeys">
            <Button>Back to Journeys</Button>
          </Link>
        </div>
      </div>
    );
  }

  const currentSectionData = content.sections[currentSection];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-6">
          <Link href="/journeys">
            <Button variant="ghost" className="mb-4 text-purple-700 dark:text-purple-300">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Journeys
            </Button>
          </Link>
          
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {journey.title}
            </h1>
            <div className="flex gap-2">
              <Button size="sm" variant="outline">
                <Heart className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button size="sm" variant="outline">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
          
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {journey.introduction}
          </p>
          
          {/* Progress */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
              <span>Progress</span>
              <span>{currentSection + 1} of {totalSections}</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        {/* Current Section Content */}
        {currentSectionData && (
          <Card className="mb-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardContent className="p-8">
              {/* Intro/Content Section */}
              {(currentSectionData.type === 'intro' || currentSectionData.type === 'content') && (
                <div>
                  {currentSectionData.title && (
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      {currentSectionData.title}
                    </h2>
                  )}
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                    {currentSectionData.content}
                  </p>
                </div>
              )}

              {/* Spotify Preview Section */}
              {currentSectionData.type === 'spotify_preview' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Featured Track
                  </h2>
                  <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-6 rounded-lg border border-green-200 dark:border-green-700">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                          {currentSectionData.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          by {currentSectionData.artist}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleAudioToggle(currentSectionData.track_id!, null)}
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          {audioPlaying === currentSectionData.track_id ? (
                            <Pause className="w-4 h-4 mr-2" />
                          ) : (
                            <Play className="w-4 h-4 mr-2" />
                          )}
                          {audioPlaying === currentSectionData.track_id ? 'Pause' : 'Preview'}
                        </Button>
                        <Button variant="outline" asChild>
                          <a 
                            href={`https://open.spotify.com/track/${currentSectionData.track_id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Spotify
                          </a>
                        </Button>
                      </div>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">
                      {currentSectionData.context}
                    </p>
                  </div>
                </div>
              )}

              {/* Poll Section */}
              {currentSectionData.type === 'poll' && currentSectionData.id && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Your Opinion
                  </h2>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      {currentSectionData.question}
                    </h3>
                    <RadioGroup
                      value={pollVotes[currentSectionData.id] || ""}
                      onValueChange={(value) => handlePollVote(currentSectionData.id!, value)}
                    >
                      {currentSectionData.options?.map((option) => (
                        <div key={option} className="flex items-center space-x-2">
                          <RadioGroupItem value={option} id={option} />
                          <Label htmlFor={option} className="text-gray-700 dark:text-gray-300">
                            {option}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                    {pollVotes[currentSectionData.id] && (
                      <Badge className="mt-4 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                        Vote recorded!
                      </Badge>
                    )}
                  </div>
                </div>
              )}

              {/* Community Mixtape Section */}
              {currentSectionData.type === 'community_mixtape' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {currentSectionData.title}
                  </h2>
                  <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg border border-purple-200 dark:border-purple-700">
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      {currentSectionData.description}
                    </p>
                    
                    <div className="space-y-4">
                      <Input
                        placeholder="Search for a song to add..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="bg-white dark:bg-gray-800"
                      />
                      
                      {searchResults && searchResults.length > 0 && (
                        <div className="max-h-48 overflow-y-auto space-y-2">
                          {searchResults.map((track) => (
                            <div key={track.id} className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded border">
                              <div>
                                <div className="font-medium text-gray-900 dark:text-white">
                                  {track.name}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                  {track.artists[0]?.name}
                                </div>
                              </div>
                              <Button
                                size="sm"
                                onClick={() => {
                                  const mixtape = mixtapes?.[0];
                                  if (mixtape) {
                                    submitToMixtape.mutate({ mixtapeId: mixtape.id, track });
                                  }
                                }}
                                disabled={submitToMixtape.isPending}
                              >
                                Add
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
            disabled={currentSection === 0}
          >
            Previous
          </Button>
          <Button
            onClick={() => setCurrentSection(Math.min(totalSections - 1, currentSection + 1))}
            disabled={currentSection === totalSections - 1}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
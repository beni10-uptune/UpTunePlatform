import { useState } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, Music, Users, ExternalLink, Sparkles } from "lucide-react";
import { SiSpotify } from "react-icons/si";
import { motion } from "framer-motion";
import type { Journey } from "@shared/schema";

export function FeaturedMusicalJourney() {
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);
  const [playingTrack, setPlayingTrack] = useState<string | null>(null);

  // Get published journeys
  const { data: journeys, isLoading } = useQuery<Journey[]>({
    queryKey: ["/api/journeys"],
    queryFn: async () => {
      const response = await fetch("/api/journeys");
      if (!response.ok) throw new Error("Failed to fetch journeys");
      return response.json();
    },
  });

  // Select featured journey (for now, pick the first published one)
  const featuredJourney = journeys?.find(j => j.isPublished) || journeys?.[0];

  const playTrack = (trackId: string, previewUrl?: string) => {
    if (currentAudio) {
      currentAudio.pause();
    }

    if (playingTrack === trackId) {
      setPlayingTrack(null);
      setCurrentAudio(null);
      return;
    }

    if (previewUrl) {
      const audio = new Audio(previewUrl);
      audio.play();
      setCurrentAudio(audio);
      setPlayingTrack(trackId);

      audio.onended = () => {
        setPlayingTrack(null);
        setCurrentAudio(null);
      };
    }
  };

  if (isLoading || !featuredJourney) {
    return (
      <div className="max-w-6xl mx-auto">
        <Card className="bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 text-white border-none overflow-hidden">
          <CardContent className="p-8">
            <div className="animate-pulse">
              <div className="h-8 bg-white/20 rounded mb-4 w-1/3"></div>
              <div className="h-4 bg-white/20 rounded mb-2 w-2/3"></div>
              <div className="h-4 bg-white/20 rounded w-1/2"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Parse journey content for featured tracks
  let featuredTracks: any[] = [];
  try {
    const content = JSON.parse(featuredJourney.content);
    featuredTracks = content.sections?.filter((section: any) => section.type === "spotify_preview").slice(0, 3) || [];
  } catch (error) {
    console.error("Failed to parse journey content:", error);
  }

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Card className="bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 text-white border-none overflow-hidden relative">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10"></div>
          </div>
          
          <CardHeader className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <Badge className="bg-white/20 text-white border-white/30 px-3 py-1">
                <Sparkles className="w-4 h-4 mr-2" />
                Featured Musical Journey
              </Badge>
              <Link href="/journeys">
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                  View All Journeys
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
            
            <CardTitle className="text-3xl md:text-4xl font-bold mb-4">
              {featuredJourney.title}
            </CardTitle>
            
            <p className="text-white/90 text-lg leading-relaxed mb-6 max-w-4xl">
              {featuredJourney.introduction}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-sm text-white/70">
              <div className="flex items-center gap-2">
                <Music className="w-4 h-4" />
                <span>{featuredTracks.length} Featured Tracks</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>Immersive Experience</span>
              </div>
            </div>
          </CardHeader>

          <CardContent className="relative z-10 pt-0">
            {/* Featured Tracks */}
            {featuredTracks.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 text-white/90">Featured Tracks</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {featuredTracks.map((track: any, index: number) => (
                    <div
                      key={index}
                      className="bg-black/20 backdrop-blur-sm rounded-lg p-4 hover:bg-black/30 transition-colors"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                          <SiSpotify className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-white font-medium truncate">{track.title}</h4>
                          <p className="text-white/70 text-sm truncate">{track.artist}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700 text-white flex-1"
                          onClick={() => playTrack(track.track_id, track.preview_url)}
                        >
                          {playingTrack === track.track_id ? (
                            <Pause className="w-4 h-4 mr-2" />
                          ) : (
                            <Play className="w-4 h-4 mr-2" />
                          )}
                          {playingTrack === track.track_id ? 'Playing' : 'Preview'}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-white/30 text-white hover:bg-white/10"
                          onClick={() => window.open(`https://open.spotify.com/track/${track.track_id}`, '_blank')}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Call to Action */}
            <div className="text-center">
              <Link href={`/journeys/${featuredJourney.slug}`}>
                <Button
                  size="lg"
                  className="bg-white text-gray-900 hover:bg-white/90 font-semibold px-8 py-3"
                >
                  <Music className="w-5 h-5 mr-2" />
                  Explore This Journey
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
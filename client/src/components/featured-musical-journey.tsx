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
        <Card className="bg-gradient-to-r from-purple-300 to-pink-300 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rotate-1 overflow-hidden">
          <CardContent className="p-8 bg-white">
            <div className="animate-pulse">
              <div className="h-8 bg-black/20 border-2 border-black mb-4 w-1/3"></div>
              <div className="h-4 bg-black/10 border-2 border-black mb-2 w-2/3"></div>
              <div className="h-4 bg-black/10 border-2 border-black w-1/2"></div>
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
        <Card className="bg-gradient-to-br from-purple-300 via-pink-300 to-yellow-300 border-4 border-black overflow-hidden relative shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] -rotate-1">

          <CardHeader className="relative z-10 bg-white border-b-4 border-black">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 gap-4">
              <Badge className="bg-yellow-400 text-black border-3 border-black px-4 py-2 font-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]" style={{ fontFamily: "'Arial Black', sans-serif" }}>
                <Sparkles className="w-4 h-4 mr-2" />
                FEATURED JOURNEY
              </Badge>
              <Link href="/discover">
                <Button size="sm" className="bg-cyan-400 hover:bg-cyan-500 text-black font-bold border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  View All Journeys
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>

            <CardTitle className="text-4xl md:text-5xl font-black mb-4 text-black" style={{ fontFamily: "'Arial Black', sans-serif", textTransform: 'uppercase' }}>
              {featuredJourney.title}
            </CardTitle>

            <p className="text-black/80 font-bold text-lg leading-relaxed mb-6 max-w-4xl">
              {featuredJourney.introduction} 🎵
            </p>

            <div className="flex flex-wrap items-center gap-3 text-sm">
              <div className="flex items-center gap-2 bg-blue-300 px-3 py-2 border-2 border-black font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <Music className="w-4 h-4 text-black" />
                <span className="text-black">{featuredTracks.length} Featured Tracks</span>
              </div>
              <div className="flex items-center gap-2 bg-pink-300 px-3 py-2 border-2 border-black font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <Users className="w-4 h-4 text-black" />
                <span className="text-black">Immersive Experience</span>
              </div>
            </div>
          </CardHeader>

          <CardContent className="relative z-10 pt-6 bg-white">
            {/* Featured Tracks */}
            {featuredTracks.length > 0 && (
              <div className="mb-8">
                <h3 className="text-2xl font-black mb-4 text-black bg-gradient-to-r from-green-300 to-cyan-300 px-4 py-2 inline-block border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] rotate-1" style={{ fontFamily: "'Arial Black', sans-serif" }}>
                  FEATURED TRACKS
                </h3>
                <div className="space-y-4 mt-6">
                  {featuredTracks.map((track: any, index: number) => (
                    <div
                      key={index}
                      className="bg-gradient-to-r from-yellow-200 to-pink-200 border-3 border-black p-4 hover:from-yellow-300 hover:to-pink-300 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                          <div className="w-12 h-12 bg-green-400 border-3 border-black flex items-center justify-center flex-shrink-0 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] rotate-6">
                            <SiSpotify className="w-6 h-6 text-white" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h4 className="text-black font-black truncate" style={{ fontFamily: "'Arial Black', sans-serif" }}>{track.title}</h4>
                            <p className="text-black/70 text-sm font-bold truncate">{track.artist}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 flex-shrink-0 flex-wrap">
                          <Button
                            size="sm"
                            className="bg-green-400 hover:bg-green-500 text-white font-black border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] min-w-[100px]"
                            style={{ fontFamily: "'Arial Black', sans-serif" }}
                            onClick={() => playTrack(track.track_id, track.preview_url)}
                          >
                            {playingTrack === track.track_id ? (
                              <>
                                <Pause className="w-4 h-4 mr-2" />
                                PLAYING
                              </>
                            ) : (
                              <>
                                <Play className="w-4 h-4 mr-2" />
                                PREVIEW
                              </>
                            )}
                          </Button>
                          <Button
                            size="sm"
                            className="bg-cyan-400 hover:bg-cyan-500 text-white font-black border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hidden sm:flex"
                            style={{ fontFamily: "'Arial Black', sans-serif" }}
                            onClick={() => window.open(`https://open.spotify.com/search/${encodeURIComponent(track.artist + ' ' + track.title)}`, '_blank')}
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            SPOTIFY
                          </Button>
                          <Button
                            size="sm"
                            className="bg-cyan-400 hover:bg-cyan-500 text-white font-black border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:hidden"
                            onClick={() => window.open(`https://open.spotify.com/search/${encodeURIComponent(track.artist + ' ' + track.title)}`, '_blank')}
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Call to Action */}
            <div className="text-center">
              <Link href={`/discover/journeys/${featuredJourney.slug}`}>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-400 to-pink-400 text-white hover:from-purple-500 hover:to-pink-500 font-black px-8 py-4 text-lg border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-4px] hover:translate-y-[-4px] transition-all"
                  style={{ fontFamily: "'Arial Black', sans-serif" }}
                >
                  <Music className="w-5 h-5 mr-2" />
                  EXPLORE THIS JOURNEY
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
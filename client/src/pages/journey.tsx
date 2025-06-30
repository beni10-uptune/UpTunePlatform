import { useParams, Link } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Play, Pause, Heart, Share2, ExternalLink, Music, Youtube, ChevronDown, Users, Headphones, Volume2, ChevronLeft, ChevronRight } from "lucide-react";
import { SiSpotify } from "react-icons/si";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import type { Journey, CommunityMixtape, MixtapeSubmission, PollVote, CommunityList, ListEntry } from "@shared/schema";

export default function JourneyPage() {
  const { slug } = useParams();
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);
  const [playingTrack, setPlayingTrack] = useState<string | null>(null);
  const [pollAnswers, setPollAnswers] = useState<Record<string, string>>({});
  const [mixtapeEntries, setMixtapeEntries] = useState<Record<number, { track: any; reasoning: string }>>({});
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("story");
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  const { data: journey, isLoading } = useQuery<Journey>({
    queryKey: [`/api/journeys/${slug}`],
    enabled: !!slug,
  });

  const { data: mixtapes = [] } = useQuery<CommunityMixtape[]>({
    queryKey: [`/api/journeys/${journey?.id}/mixtapes`],
    enabled: !!journey?.id,
  });

  // Map journey slugs to community list slugs
  const journeyCommunityListMap: Record<string, string> = {
    'disco-underground-revolution': 'disco-classics',
    'acid-house-second-summer-love': 'acid-house-classics',
    'berlin-electronic-post-wall-revolution': 'berlin-electronic-revolution',
    'detroit-techno-birth-future': 'detroit-techno-pioneers',
    'madchester-factory-floor-dance-floor': 'madchester-anthem'
  };

  const communityListSlug = journey ? journeyCommunityListMap[journey.slug] : null;

  const { data: communityList } = useQuery<CommunityList>({
    queryKey: [`/api/community-lists/${communityListSlug}`],
    enabled: !!communityListSlug,
  });

  const { data: communityEntries = [] } = useQuery<ListEntry[]>({
    queryKey: [`/api/community-lists/${communityList?.id}/entries`],
    enabled: !!communityList?.id,
  });

  // Mutations for interactions
  const pollVoteMutation = useMutation({
    mutationFn: async (vote: { pollId: string; option: string; guestSessionId: string }) => {
      const response = await fetch('/api/poll-votes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(vote),
      });
      return response.json();
    },
    onSuccess: () => {
      toast({ title: "Vote recorded!", description: "Thanks for participating in the poll." });
    },
  });

  // Mock gallery images for demonstration
  const galleryImages = [
    journey?.headlineImageUrl,
    "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&h=600",
    "https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&w=1200&h=600",
    "https://images.unsplash.com/photo-1574169208507-84376144848b?auto=format&fit=crop&w=1200&h=600"
  ];

  // Auto-rotate gallery images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [galleryImages.length]);

  const playTrack = (trackId: string, previewUrl: string) => {
    if (currentAudio) {
      currentAudio.pause();
    }

    if (playingTrack === trackId) {
      setPlayingTrack(null);
      setCurrentAudio(null);
      return;
    }

    const audio = new Audio(previewUrl);
    audio.play();
    setCurrentAudio(audio);
    setPlayingTrack(trackId);

    audio.onended = () => {
      setPlayingTrack(null);
      setCurrentAudio(null);
    };
  };

  const handlePollVote = (pollId: string, option: string) => {
    setPollAnswers({ ...pollAnswers, [pollId]: option });
    pollVoteMutation.mutate({
      pollId,
      option,
      guestSessionId: `guest_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    });
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="text-center">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full mx-auto mb-6"
          />
          <p className="text-white/80 text-xl">Loading musical journey...</p>
        </div>
      </div>
    );
  }

  if (!journey) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Journey Not Found</h1>
          <p className="text-white/80 mb-8 text-xl">The musical journey you're looking for doesn't exist.</p>
          <Link href="/journeys">
            <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Journeys
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  let content;
  try {
    content = JSON.parse(journey.content);
  } catch (error) {
    console.error("Failed to parse journey content:", error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Journey Content Error</h1>
          <p className="text-white/80 mb-8 text-xl">There was an error loading this journey's content.</p>
          <Link href="/journeys">
            <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Journeys
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Fixed Navigation */}
      <motion.div 
        style={{ opacity: headerOpacity }}
        className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/journeys">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Journeys
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <Link href="/">
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                  <Users className="w-4 h-4 mr-2" />
                  Start Session
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Rolling Gallery Header */}
      <section className="relative h-[60vh] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${galleryImages[currentImageIndex]})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
          </motion.div>
        </AnimatePresence>

        {/* Gallery Navigation */}
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20">
          <Button 
            size="sm" 
            variant="ghost" 
            onClick={prevImage}
            className="text-white hover:bg-white/20 p-2"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
        </div>
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20">
          <Button 
            size="sm" 
            variant="ghost" 
            onClick={nextImage}
            className="text-white hover:bg-white/20 p-2"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>
        </div>

        {/* Header Content */}
        <div className="relative h-full flex items-center justify-center text-center text-white px-6 z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="max-w-4xl"
          >
            <Badge className="mb-6 bg-white/20 text-white border-white/30 text-lg px-4 py-2">
              <Music className="w-5 h-5 mr-2" />
              Musical Journey
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
              {journey.title}
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed mb-12">
              {journey.introduction}
            </p>

            {/* Gallery Indicators */}
            <div className="flex justify-center gap-2">
              {galleryImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/40'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Three-Tab Layout */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-white/10 border border-white/20">
            <TabsTrigger 
              value="story" 
              className="journey-tab text-white data-[state=active]:bg-purple-600 data-[state=active]:text-white"
            >
              Story
            </TabsTrigger>
            <TabsTrigger 
              value="playlist" 
              className="journey-tab text-white data-[state=active]:bg-purple-600 data-[state=active]:text-white"
            >
              Playlist
            </TabsTrigger>
            <TabsTrigger 
              value="gallery" 
              className="journey-tab text-white data-[state=active]:bg-purple-600 data-[state=active]:text-white"
            >
              Gallery
            </TabsTrigger>
          </TabsList>

          {/* Story Tab */}
          <TabsContent value="story" className="mt-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-12"
            >
              {content.sections?.map((section: any, index: number) => (
                <div key={index}>
                  {section.type === "intro" && (
                    <motion.div
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8 }}
                      className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20"
                    >
                      <h2 className="text-3xl font-bold text-white mb-6">{section.title}</h2>
                      <p className="text-white/80 text-lg leading-relaxed">{section.content}</p>
                    </motion.div>
                  )}

                  {section.type === "content" && (
                    <motion.div
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8 }}
                      className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10"
                    >
                      <h2 className="text-2xl font-bold text-white mb-6">{section.title}</h2>
                      <p className="text-white/80 text-lg leading-relaxed">{section.content}</p>
                    </motion.div>
                  )}

                  {section.type === "spotify_preview" && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.8 }}
                      className="bg-gradient-to-r from-green-600/20 to-green-400/20 backdrop-blur-lg rounded-2xl p-6 border border-green-400/20"
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <SiSpotify className="w-8 h-8 text-green-400" />
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-white">{section.title}</h3>
                          <p className="text-green-200">{section.artist}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => playTrack(section.track_id, section.preview_url || "")}
                          >
                            {playingTrack === section.track_id ? (
                              <Pause className="w-4 h-4" />
                            ) : (
                              <Play className="w-4 h-4" />
                            )}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-green-400 text-green-400 hover:bg-green-400 hover:text-black"
                            onClick={() => window.open(`https://open.spotify.com/track/${section.track_id}`, '_blank')}
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Play in Spotify
                          </Button>
                        </div>
                      </div>
                      <p className="text-white/80 leading-relaxed">{section.context}</p>
                    </motion.div>
                  )}

                  {section.type === "youtube_video" && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.8 }}
                      className="bg-gradient-to-r from-red-600/20 to-red-400/20 backdrop-blur-lg rounded-2xl p-6 border border-red-400/20"
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <Youtube className="w-8 h-8 text-red-400" />
                        <div>
                          <h3 className="text-xl font-bold text-white">{section.title}</h3>
                          <p className="text-red-200">Watch Documentary</p>
                        </div>
                        <Button
                          size="sm"
                          className="ml-auto bg-red-600 hover:bg-red-700"
                          onClick={() => window.open(`https://youtube.com/watch?v=${section.video_id}`, '_blank')}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                      <p className="text-white/80 leading-relaxed">{section.description}</p>
                    </motion.div>
                  )}

                  {section.type === "poll" && (
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8 }}
                      className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
                    >
                      <h3 className="text-xl font-bold text-white mb-4">{section.question}</h3>
                      <RadioGroup 
                        value={pollAnswers[section.id] || ""} 
                        onValueChange={(value) => handlePollVote(section.id, value)}
                      >
                        {section.options?.map((option: string, optionIndex: number) => (
                          <div key={optionIndex} className="flex items-center space-x-2">
                            <RadioGroupItem value={option} id={`${section.id}-${optionIndex}`} />
                            <Label htmlFor={`${section.id}-${optionIndex}`} className="text-white/80">
                              {option}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </motion.div>
                  )}

                  {section.type === "community_mixtape" && (
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8 }}
                      className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-lg rounded-2xl p-6 border border-purple-400/20"
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <Users className="w-8 h-8 text-purple-400" />
                        <div>
                          <h3 className="text-xl font-bold text-white">{section.title}</h3>
                          <p className="text-purple-200">Community Contribution</p>
                        </div>
                      </div>
                      <p className="text-white/80 mb-4">{section.description}</p>
                      <p className="text-white/60 italic">{section.prompt}</p>
                    </motion.div>
                  )}
                </div>
              ))}
            </motion.div>
          </TabsContent>

          {/* Playlist Tab */}
          <TabsContent value="playlist" className="mt-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {/* Ultimate Playlist Section */}
              <div className="bg-gradient-to-r from-green-600/20 to-green-400/20 backdrop-blur-lg rounded-2xl p-8 border border-green-400/20">
                <div className="flex items-center gap-4 mb-6">
                  <SiSpotify className="w-10 h-10 text-green-400" />
                  <div>
                    <h2 className="text-3xl font-bold text-white">Ultimate {journey?.title?.split(' - ')[0]} Playlist</h2>
                    <p className="text-green-200">Curated tracks that defined the movement</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {content.sections?.filter((section: any) => section.type === "spotify_preview").map((section: any, index: number) => (
                    <div key={index} className="bg-black/20 rounded-xl p-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex items-center gap-4 min-w-0 flex-1">
                          <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Music className="w-6 h-6 text-white" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h4 className="text-white font-semibold truncate">{section.title}</h4>
                            <p className="text-green-200 truncate">{section.artist}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3 flex-shrink-0">
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700 min-w-[80px]"
                            onClick={() => playTrack(section.track_id, section.preview_url || "")}
                          >
                            {playingTrack === section.track_id ? (
                              <>
                                <Pause className="w-4 h-4 mr-2" />
                                Playing
                              </>
                            ) : (
                              <>
                                <Play className="w-4 h-4 mr-2" />
                                Preview
                              </>
                            )}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-green-400 text-green-400 hover:bg-green-400 hover:text-black hidden sm:flex"
                            onClick={() => window.open(`https://open.spotify.com/track/${section.track_id}`, '_blank')}
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Play in Spotify
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-green-400 text-green-400 hover:bg-green-400 hover:text-black sm:hidden"
                            onClick={() => window.open(`https://open.spotify.com/track/${section.track_id}`, '_blank')}
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Community Playlist Section */}
              <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-lg rounded-2xl p-8 border border-purple-400/20">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <Users className="w-10 h-10 text-purple-400" />
                    <div>
                      <h2 className="text-3xl font-bold text-white">Community Playlist</h2>
                      <p className="text-purple-200">Songs submitted by the Uptune community</p>
                    </div>
                  </div>
                  {communityList && (
                    <Link href={`/community-lists/${communityList.slug}`}>
                      <Button variant="outline" className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-black">
                        View Full List
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  )}
                </div>
                
                {communityEntries.length > 0 ? (
                  <div className="space-y-4">
                    {communityEntries.slice(0, 5).map((entry: any, index: number) => (
                      <div key={entry.id} className="bg-black/20 rounded-xl p-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold">#{index + 1}</span>
                          </div>
                          <div>
                            <h4 className="text-white font-semibold">{entry.title}</h4>
                            <p className="text-purple-200">{entry.artist}</p>
                            {entry.reasoning && (
                              <p className="text-white/60 text-sm mt-1 italic">"{entry.reasoning}"</p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1 text-purple-300">
                            <Heart className="w-4 h-4" />
                            <span className="text-sm">{entry.votes || 0}</span>
                          </div>
                          {entry.spotifyTrackId && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-black"
                              onClick={() => window.open(`https://open.spotify.com/track/${entry.spotifyTrackId}`, '_blank')}
                            >
                              <ExternalLink className="w-4 h-4 mr-2" />
                              Play in Spotify
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                    {communityEntries.length > 5 && (
                      <div className="text-center pt-4">
                        <p className="text-purple-200">and {communityEntries.length - 5} more songs...</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-white/70 mb-4">No community submissions yet</p>
                    {communityList && (
                      <Link href={`/community-lists/${communityList.slug}`}>
                        <Button className="bg-purple-600 hover:bg-purple-700">
                          Be the first to contribute!
                        </Button>
                      </Link>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </TabsContent>

          {/* Gallery Tab */}
          <TabsContent value="gallery" className="mt-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {galleryImages.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative overflow-hidden rounded-2xl aspect-square cursor-pointer group"
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url(${image})` }}
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                  {index === currentImageIndex && (
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-white/20 text-white border-white/30">
                        Active
                      </Badge>
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
}
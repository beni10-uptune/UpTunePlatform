import { useParams, Link } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Play, Pause, Heart, Share2, ExternalLink, Music, Youtube, ChevronDown, Users, Headphones } from "lucide-react";
import { SiSpotify } from "react-icons/si";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Journey, CommunityMixtape, MixtapeSubmission, PollVote } from "@shared/schema";

export default function JourneyPage() {
  const { slug } = useParams();
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);
  const [playingTrack, setPlayingTrack] = useState<string | null>(null);
  const [pollAnswers, setPollAnswers] = useState<Record<string, string>>({});
  const [mixtapeEntries, setMixtapeEntries] = useState<Record<number, { track: any; reasoning: string }>>({});
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);

  const { data: journey, isLoading } = useQuery({
    queryKey: [`/api/journeys/${slug}`],
    enabled: !!slug,
  });

  const { data: mixtapes = [] } = useQuery({
    queryKey: [`/api/journeys/${journey?.id}/mixtapes`],
    enabled: !!journey?.id,
  });

  // Mutations for interactions
  const pollVoteMutation = useMutation({
    mutationFn: async (vote: { pollId: string; option: string; guestSessionId: string }) => {
      return apiRequest(`/api/poll-votes`, {
        method: 'POST',
        body: JSON.stringify(vote),
      });
    },
    onSuccess: () => {
      toast({ title: "Vote recorded!", description: "Thanks for participating in the poll." });
    },
  });

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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <div className="text-center">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full mx-auto mb-6"
          />
          <p className="text-white/80 text-xl">Loading your musical journey...</p>
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

  const content = JSON.parse(journey.content);

  return (
    <div ref={containerRef} className="relative">
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
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                <Heart className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Immersive Hero Section */}
      <motion.section 
        style={{ scale: heroScale }}
        className="relative h-screen overflow-hidden"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: `url(${journey.headlineImageUrl})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
        
        <div className="relative h-full flex items-center justify-center text-center text-white px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="max-w-4xl"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="mb-6"
            >
              <Badge className="mb-6 bg-white/20 text-white border-white/30 text-lg px-4 py-2">
                <Music className="w-5 h-5 mr-2" />
                Musical Journey
              </Badge>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold mb-8 leading-tight"
            >
              {journey.title}
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-white/90 leading-relaxed mb-12"
            >
              {journey.introduction}
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button size="lg" className="bg-white text-black hover:bg-gray-100 text-lg px-8 py-4">
                <Play className="w-5 h-5 mr-2" />
                Start Journey
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8 py-4">
                <SiSpotify className="w-5 h-5 mr-2" />
                Open Playlist
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center"
          >
            <span className="text-sm mb-2">Scroll to explore</span>
            <ChevronDown className="w-6 h-6" />
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Ultimate Playlist Section */}
      <section className="py-20 bg-gradient-to-r from-green-900 via-green-800 to-emerald-900 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <Badge className="mb-6 bg-green-400 text-green-900 text-lg px-4 py-2">
              <SiSpotify className="w-5 h-5 mr-2" />
              Curated by Uptune
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">The Ultimate {journey.title} Playlist</h2>
            <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
              Our music experts have curated the definitive collection of tracks that tell this story. 
              Listen on Spotify and follow for updates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-green-400 text-green-900 hover:bg-green-300 text-lg px-8 py-4">
                <SiSpotify className="w-5 h-5 mr-2" />
                Listen on Spotify
              </Button>
              <Button size="lg" variant="outline" className="border-green-400 text-green-400 hover:bg-green-400/10 text-lg px-8 py-4">
                <Heart className="w-5 h-5 mr-2" />
                Follow Playlist
              </Button>
            </div>
          </motion.div>

          {/* Sample tracks preview */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur rounded-xl p-6 hover:bg-white/20 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-green-400 rounded-lg flex items-center justify-center">
                    <Music className="w-6 h-6 text-green-900" />
                  </div>
                  <Button size="sm" variant="ghost" className="text-white hover:bg-white/10">
                    <Play className="w-4 h-4" />
                  </Button>
                </div>
                <h4 className="font-semibold mb-1">Track Title {i}</h4>
                <p className="text-green-200 text-sm">Artist Name</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Content Sections */}
      <div className="bg-gradient-to-b from-gray-50 to-white">
        {content.sections?.map((section: any, index: number) => (
          <motion.section
            key={index}
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            className="py-16 border-b border-gray-100 last:border-b-0"
          >
            <div className="max-w-6xl mx-auto px-6">
              {section.type === 'intro' && (
                <div className="text-center max-w-4xl mx-auto">
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">{section.title}</h2>
                  <p className="text-xl text-gray-700 leading-relaxed">{section.content}</p>
                </div>
              )}

              {section.type === 'content' && (
                <div className="text-center max-w-4xl mx-auto">
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">{section.title}</h2>
                  <p className="text-xl text-gray-700 leading-relaxed">{section.content}</p>
                </div>
              )}

              {section.type === 'youtube_video' && (
                <div className="max-w-4xl mx-auto">
                  <div className="text-center mb-8">
                    <Badge className="mb-4 bg-red-100 text-red-800 text-lg px-4 py-2">
                      <Youtube className="w-5 h-5 mr-2" />
                      Featured Video
                    </Badge>
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">{section.title}</h3>
                    <p className="text-gray-600">{section.description}</p>
                  </div>
                  <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl">
                    <iframe
                      src={`https://www.youtube.com/embed/${section.video_id}`}
                      title={section.title}
                      className="w-full h-full"
                      frameBorder="0"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}

              {section.type === 'spotify_preview' && (
                <div className="max-w-4xl mx-auto">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-200 shadow-lg"
                  >
                    <div className="flex flex-col md:flex-row items-center gap-8">
                      <div className="w-32 h-32 bg-green-200 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Music className="w-16 h-16 text-green-700" />
                      </div>
                      <div className="flex-1 text-center md:text-left">
                        <Badge className="mb-4 bg-green-100 text-green-800">
                          Featured Track
                        </Badge>
                        <h3 className="text-3xl font-bold text-gray-900 mb-2">{section.title}</h3>
                        <p className="text-green-700 text-lg mb-4">by {section.artist}</p>
                        <p className="text-gray-700 leading-relaxed mb-6">{section.context}</p>
                        <div className="flex flex-col sm:flex-row gap-3">
                          <Button 
                            onClick={() => playTrack(section.track_id, `https://p.scdn.co/mp3-preview/${section.track_id}`)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            {playingTrack === section.track_id ? <Pause className="w-5 h-5 mr-2" /> : <Play className="w-5 h-5 mr-2" />}
                            {playingTrack === section.track_id ? 'Pause' : 'Play Preview'}
                          </Button>
                          <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                            <SiSpotify className="w-5 h-5 mr-2" />
                            Open in Spotify
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              )}

              {section.type === 'poll' && (
                <div className="max-w-3xl mx-auto">
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200 shadow-lg"
                  >
                    <div className="text-center mb-8">
                      <Badge className="mb-4 bg-blue-100 text-blue-800 text-lg px-4 py-2">
                        <Users className="w-5 h-5 mr-2" />
                        Community Poll
                      </Badge>
                      <h3 className="text-3xl font-bold text-gray-900">{section.question}</h3>
                    </div>
                    <RadioGroup 
                      value={pollAnswers[section.id] || ""} 
                      onValueChange={(value) => handlePollVote(section.id, value)}
                      className="space-y-4"
                    >
                      {section.options.map((option: string, optionIndex: number) => (
                        <motion.div 
                          key={optionIndex}
                          whileHover={{ scale: 1.02 }}
                          className="flex items-center space-x-4 p-4 rounded-xl hover:bg-blue-50 transition-all duration-200 border border-blue-100"
                        >
                          <RadioGroupItem value={option} id={`${section.id}-${optionIndex}`} />
                          <Label htmlFor={`${section.id}-${optionIndex}`} className="text-gray-700 cursor-pointer flex-1 text-lg">
                            {option}
                          </Label>
                        </motion.div>
                      ))}
                    </RadioGroup>
                    {pollAnswers[section.id] && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mt-6 text-center"
                      >
                        <Badge className="bg-blue-100 text-blue-800 text-lg px-4 py-2">
                          ✓ Vote recorded: {pollAnswers[section.id]}
                        </Badge>
                      </motion.div>
                    )}
                  </motion.div>
                </div>
              )}

              {section.type === 'community_mixtape' && (
                <div className="max-w-4xl mx-auto">
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-200 shadow-lg"
                  >
                    <div className="text-center mb-8">
                      <Badge className="mb-4 bg-purple-100 text-purple-800 text-lg px-4 py-2">
                        <Headphones className="w-5 h-5 mr-2" />
                        Community Mixtape
                      </Badge>
                      <h3 className="text-3xl font-bold text-gray-900 mb-4">{section.title}</h3>
                      <p className="text-gray-700 text-lg leading-relaxed">{section.description}</p>
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <Label className="text-lg font-medium text-gray-700 mb-3 block">Search for a song</Label>
                        <Input
                          placeholder="Search for songs on Spotify..."
                          className="w-full h-12 text-lg"
                        />
                      </div>
                      
                      <div>
                        <Label className="text-lg font-medium text-gray-700 mb-3 block">Why does this song belong here?</Label>
                        <Textarea
                          placeholder={section.prompt}
                          className="w-full min-h-32 text-lg"
                        />
                      </div>
                      
                      <Button size="lg" className="w-full bg-purple-600 hover:bg-purple-700 text-lg py-4">
                        <Music className="w-5 h-5 mr-2" />
                        Add to Community Mixtape
                      </Button>
                    </div>
                  </motion.div>
                </div>
              )}
            </div>
          </motion.section>
        ))}
      </div>
    </div>
  );
}
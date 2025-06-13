import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { SongSearch } from '@/components/song-search';
import { Navigation } from '@/components/navigation';
import { 
  ArrowLeft,
  Calendar,
  Clock,
  Users,
  TrendingUp,
  Heart,
  Trophy,
  Award,
  Music,
  ExternalLink,
  Headphones
} from 'lucide-react';

interface SpotifyTrack {
  id: string;
  title: string;
  artist: string;
  album: string;
  imageUrl: string | null;
  spotifyUrl: string;
  previewUrl: string | null;
}

interface Challenge {
  id: number;
  title: string;
  description: string;
  emoji: string;
  endDate: string;
}

interface Submission {
  id: number;
  challengeId: number;
  nickname: string;
  songTitle: string;
  songArtist: string;
  album: string;
  spotifyId: string;
  imageUrl: string;
  previewUrl: string;
  story: string;
  votes: number;
  createdAt: string;
}

const WeeklyChallenge = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [showSubmissionForm, setShowSubmissionForm] = useState(false);
  const [selectedSong, setSelectedSong] = useState<SpotifyTrack | null>(null);
  const [formData, setFormData] = useState({
    nickname: '',
    story: ''
  });

  // Get current weekly challenge
  const { data: challenge } = useQuery<Challenge>({
    queryKey: ['/api/weekly-challenge'],
  });

  // Get challenge submissions
  const { data: submissions = [] } = useQuery<Submission[]>({
    queryKey: ['/api/weekly-challenge/submissions'],
  });

  // Submit challenge entry
  const submitMutation = useMutation({
    mutationFn: async (data: { nickname: string; story: string }) => {
      if (!selectedSong || !challenge) return;
      
      const response = await apiRequest('POST', '/api/challenge-submissions', {
        ...data,
        challengeId: (challenge as any).id,
        songTitle: selectedSong.title,
        songArtist: selectedSong.artist,
        album: selectedSong.album,
        spotifyId: selectedSong.id,
        imageUrl: selectedSong.imageUrl || '',
        previewUrl: selectedSong.previewUrl || ''
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/weekly-challenge/${(challenge as any)?.id}/submissions`] });
      setShowSubmissionForm(false);
      setSelectedSong(null);
      setFormData({ nickname: '', story: '' });
      toast({
        title: "Submission Successful!",
        description: "Your song has been added to this week's challenge.",
      });
    },
    onError: () => {
      toast({
        title: "Submission Failed",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  });

  const handleSubmit = () => {
    if (!selectedSong || !formData.nickname.trim()) return;
    submitMutation.mutate(formData);
  };

  // Vote for submission
  const voteMutation = useMutation({
    mutationFn: async (submissionId: number) => {
      const response = await apiRequest('POST', `/api/challenge-submissions/${submissionId}/vote`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/weekly-challenge/submissions'] });
      toast({
        title: "Vote Cast!",
        description: "Thanks for voting on this submission.",
      });
    }
  });



  const getDaysLeft = () => {
    if (!challenge?.endDate) return 0;
    const end = new Date(challenge.endDate);
    const now = new Date();
    const diffTime = Math.abs(end.getTime() - now.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const pastWinners = [
    {
      emoji: '🎬',
      theme: 'Movie Soundtrack Masterpiece',
      winner: 'Eye of the Tiger - Survivor',
      submissions: '2,156'
    },
    {
      emoji: '😭',
      theme: 'Songs That Make You Cry',
      winner: 'Hurt - Johnny Cash',
      submissions: '1,893'
    },
    {
      emoji: '🚗',
      theme: 'Perfect Road Trip Song',
      winner: "Don't Stop Believin' - Journey",
      submissions: '2,341'
    }
  ];

  if (!challenge) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <Music className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Loading challenge...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Header */}
      <header className="px-6 py-4">
        <nav className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center">
              <Music className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold gradient-text">Uptune</span>
          </div>
          
          <Navigation variant="header" className="text-gray-600" />
          <Navigation variant="mobile" className="text-gray-600" />
        </nav>
      </header>

      <div className="px-6 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <Badge className="gradient-bg text-white px-4 py-2 mb-6">
              <Calendar className="w-4 h-4 mr-2" />
              Weekly Challenge
            </Badge>
            
            <div className="text-6xl mb-6">{challenge.emoji}</div>
            
            <h1 className="text-5xl font-bold mb-6">
              {challenge.title}
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              {challenge.description}
            </p>
            
            <div className="flex items-center justify-center space-x-8 text-sm text-gray-600 mb-8">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>{getDaysLeft()} days left</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span>{submissions.length} submissions</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>June 9 - June 15, 2024</span>
              </div>
            </div>

            <Button 
              onClick={() => setShowSubmissionForm(true)}
              className="gradient-bg text-white px-12 py-6 text-xl font-medium hover:opacity-90 transition-opacity"
            >
              <Trophy className="w-6 h-6 mr-3" />
              Join This Challenge
            </Button>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Trending Songs */}
            <div className="lg:col-span-2">
              <Card className="game-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5" />
                    <span>Trending This Week</span>
                  </CardTitle>
                  <CardDescription>
                    Most popular submissions so far
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  {submissions.length === 0 ? (
                    <div className="text-center py-12">
                      <Music className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">No submissions yet. Be the first!</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {submissions.slice(0, 5).map((submission, index) => (
                        <motion.div
                          key={submission.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="flex items-center space-x-4 p-4 bg-white/50 rounded-lg hover:bg-white/70 transition-colors"
                        >
                          <div className={`w-8 h-8 ${index === 0 ? 'bg-yellow-100 text-yellow-700' : index === 1 ? 'bg-gray-100 text-gray-700' : index === 2 ? 'bg-orange-100 text-orange-700' : 'bg-purple-100 text-purple-700'} rounded-full flex items-center justify-center font-bold text-sm`}>
                            {index + 1}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-gray-900 truncate">{submission.songTitle}</div>
                            <div className="text-sm text-gray-600 truncate">{submission.songArtist}</div>
                            <div className="text-xs text-gray-500">by {submission.nickname}</div>
                          </div>
                          <Button
                            onClick={() => voteMutation.mutate(submission.id)}
                            variant="ghost"
                            size="sm"
                            disabled={voteMutation.isPending}
                            className="flex items-center space-x-2 text-sm text-gray-600 hover:text-red-600"
                          >
                            <Heart className="w-4 h-4" />
                            <span>{submission.votes}</span>
                          </Button>
                        </motion.div>
                      ))}
                    </div>
                  )}
                  
                  {submissions.length > 5 && (
                    <Button variant="outline" className="w-full mt-6">
                      View All Submissions
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Challenge Progress */}
              <Card className="game-card">
                <CardHeader>
                  <CardTitle>This Week's Progress</CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Submissions</span>
                      <span>{submissions.length} / 2,000</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="gradient-bg h-2 rounded-full transition-all duration-500" 
                        style={{ width: `${Math.min((submissions.length / 2000) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>{getDaysLeft()} days remaining</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Trophy className="w-4 h-4" />
                      <span>Winner announced June 16</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Past Winners */}
              <Card className="game-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Award className="w-5 h-5" />
                    <span>Past Winners</span>
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {pastWinners.map((winner, index) => (
                    <div key={index} className="border-l-4 border-purple-400 pl-4">
                      <div className="text-sm text-gray-600 flex items-center space-x-2">
                        <span>{winner.emoji}</span>
                        <span>{winner.theme}</span>
                      </div>
                      <div className="font-semibold">{winner.winner}</div>
                      <div className="text-xs text-gray-500">{winner.submissions} submissions</div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Submission Form Modal */}
      <Dialog open={showSubmissionForm} onOpenChange={setShowSubmissionForm}>
        <DialogContent className="max-w-lg w-[95vw] max-h-[90vh] overflow-y-auto mx-4">
          <DialogHeader>
            <div className="text-center">
              <div className="text-4xl mb-4">{challenge.emoji}</div>
              <DialogTitle className="text-xl sm:text-2xl">{challenge.title}</DialogTitle>
              <DialogDescription className="text-sm sm:text-base">
                {challenge.description}
              </DialogDescription>
            </div>
          </DialogHeader>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Your nickname</label>
              <Input
                placeholder="Enter your nickname..."
                value={formData.nickname}
                onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select your song</label>
              {selectedSong ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <div className="flex items-center space-x-3 min-w-0">
                      <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center overflow-hidden flex-shrink-0">
                        {selectedSong.imageUrl ? (
                          <img 
                            src={selectedSong.imageUrl} 
                            alt={selectedSong.album}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Music className="w-6 h-6 text-gray-400" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 truncate">{selectedSong.title}</h4>
                        <p className="text-sm text-gray-600 truncate">{selectedSong.artist}</p>
                        <p className="text-xs text-gray-500 truncate">{selectedSong.album}</p>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:flex-shrink-0">
                      <Badge className="bg-green-100 text-green-800 text-center">✓ Selected</Badge>
                      <Button
                        onClick={() => setSelectedSong(null)}
                        variant="outline"
                        size="sm"
                        className="text-sm"
                      >
                        Change Song
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <SongSearch
                  onSongSelect={setSelectedSong}
                  placeholder="Search for your perfect song..."
                />
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Why this song? (optional)</label>
              <Textarea
                placeholder="Tell us why this song fits the challenge..."
                value={formData.story}
                onChange={(e) => setFormData({ ...formData, story: e.target.value })}
                rows={3}
              />
            </div>
            
            <div className="flex gap-3 pt-4">
              <Button
                onClick={() => setShowSubmissionForm(false)}
                variant="outline"
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={submitMutation.isPending || !selectedSong || !formData.nickname.trim()}
                className="flex-1 gradient-bg text-white"
              >
                <Trophy className="w-5 h-5 mr-2" />
                Submit My Song
              </Button>
            </div>
            
            <p className="text-xs text-gray-500 text-center">
              Your submission will be added to this week's challenge
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WeeklyChallenge;

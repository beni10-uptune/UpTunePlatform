import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Progress } from './ui/progress';
import { 
  Music, 
  Trophy, 
  Clock, 
  Users,
  ArrowLeft,
  Play,
  Heart,
  Share2,
  Calendar,
  Sparkles,
  TrendingUp,
  Award,
  Star
} from 'lucide-react';

const WeeklyChallenge = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);
  const [showSubmissionForm, setShowSubmissionForm] = useState(false);

  // Current week's challenge (would come from API in real app)
  const currentChallenge = {
    id: 'week-24-2025',
    title: 'Your Ultimate High School Anthem',
    description: 'What song perfectly captures your high school experience? The track that takes you right back to those hallways, friendships, and unforgettable moments.',
    emoji: '🎓',
    startDate: 'June 9, 2025',
    endDate: 'June 15, 2025',
    daysLeft: 5,
    totalSubmissions: 1247,
    trending: [
      { song: 'Mr. Brightside', artist: 'The Killers', submissions: 89 },
      { song: 'Hey Ya!', artist: 'OutKast', submissions: 76 },
      { song: 'Since U Been Gone', artist: 'Kelly Clarkson', submissions: 64 },
      { song: 'Hips Don\'t Lie', artist: 'Shakira', submissions: 58 },
      { song: 'Crazy', artist: 'Gnarls Barkley', submissions: 52 }
    ]
  };

  // Previous challenges
  const pastChallenges = [
    {
      id: 'week-23-2025',
      title: 'Movie Soundtrack Masterpiece',
      emoji: '🎬',
      winner: 'Eye of the Tiger - Survivor',
      submissions: 2156
    },
    {
      id: 'week-22-2025', 
      title: 'Songs That Make You Cry',
      emoji: '😭',
      winner: 'Hurt - Johnny Cash',
      submissions: 1893
    },
    {
      id: 'week-21-2025',
      title: 'Perfect Road Trip Song',
      emoji: '🚗',
      winner: 'Don\'t Stop Believin\' - Journey',
      submissions: 2341
    }
  ];

  const handleSubmitSong = () => {
    if (nickname.trim()) {
      setHasSubmitted(true);
      setShowSubmissionForm(false);
      // In real app, this would submit to backend
    }
  };

  const handleJoinChallenge = () => {
    setShowSubmissionForm(true);
  };

  const shareChallenge = () => {
    if (navigator.share) {
      navigator.share({
        title: `${currentChallenge.title} - Uptune Weekly Challenge`,
        text: currentChallenge.description,
        url: window.location.href
      });
    } else {
      // Fallback to copy link
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (showSubmissionForm) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="game-card p-8">
            <CardHeader className="text-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSubmissionForm(false)}
                className="absolute top-4 left-4 p-2"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              
              <div className="text-4xl mb-4">{currentChallenge.emoji}</div>
              <CardTitle className="text-xl">{currentChallenge.title}</CardTitle>
              <CardDescription className="text-base">
                {currentChallenge.description}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Your nickname
                </label>
                <Input
                  placeholder="Enter your nickname..."
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  className="text-center"
                  maxLength={20}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Your song choice
                </label>
                <div className="p-4 border-2 border-dashed border-purple-200 rounded-lg text-center">
                  <Music className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">
                    Search and select your song
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    (Spotify integration coming soon)
                  </p>
                </div>
              </div>
              
              <Button 
                className="w-full gradient-bg text-white text-lg py-6"
                onClick={handleSubmitSong}
                disabled={!nickname.trim()}
              >
                <Trophy className="w-5 h-5 mr-2" />
                Submit My Song
              </Button>
              
              <p className="text-xs text-gray-500 text-center">
                Your submission will be added to this week's challenge
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Header */}
      <header className="px-6 py-4">
        <nav className="max-w-6xl mx-auto flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Button>
          
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center">
              <Music className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Uptune
            </span>
          </div>
          
          <Button 
            variant="outline" 
            onClick={shareChallenge}
            className="border-purple-200 text-purple-700 hover:bg-purple-50"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="px-6 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <Badge className="gradient-bg text-white border-0 px-4 py-2 mb-6">
              <Calendar className="w-4 h-4 mr-2" />
              Weekly Challenge
            </Badge>
            
            <div className="text-6xl mb-6">{currentChallenge.emoji}</div>
            
            <h1 className="text-5xl font-bold mb-6">
              {currentChallenge.title}
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              {currentChallenge.description}
            </p>
            
            <div className="flex items-center justify-center space-x-8 text-sm text-gray-600 mb-8">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>{currentChallenge.daysLeft} days left</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span>{currentChallenge.totalSubmissions.toLocaleString()} submissions</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>{currentChallenge.startDate} - {currentChallenge.endDate}</span>
              </div>
            </div>

            {!hasSubmitted ? (
              <Button 
                size="lg" 
                className="gradient-bg text-white hover:opacity-90 transition-opacity text-xl px-12 py-8"
                onClick={handleJoinChallenge}
              >
                <Trophy className="w-6 h-6 mr-3" />
                Join This Challenge
              </Button>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-center space-x-2 text-green-600">
                  <Trophy className="w-5 h-5" />
                  <span className="font-semibold">You've submitted your song!</span>
                </div>
                <Button 
                  variant="outline"
                  onClick={() => navigate('/games')}
                  className="border-purple-200 text-purple-700 hover:bg-purple-50"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Play Music Games
                </Button>
              </div>
            )}
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Trending Songs */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <Card className="game-card h-full">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5" />
                    <span>Trending This Week</span>
                  </CardTitle>
                  <CardDescription>
                    Most popular submissions so far
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {currentChallenge.trending.map((song, index) => (
                    <motion.div
                      key={song.song}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="flex items-center space-x-4 p-4 bg-white/50 rounded-lg hover:bg-white/70 transition-colors"
                    >
                      <div className="flex-shrink-0">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                          index === 0 ? 'bg-yellow-100 text-yellow-700' :
                          index === 1 ? 'bg-gray-100 text-gray-700' :
                          index === 2 ? 'bg-orange-100 text-orange-700' :
                          'bg-purple-100 text-purple-700'
                        }`}>
                          {index + 1}
                        </div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-gray-900 truncate">
                          {song.song}
                        </div>
                        <div className="text-sm text-gray-600 truncate">
                          {song.artist}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Heart className="w-4 h-4" />
                        <span>{song.submissions}</span>
                      </div>
                    </motion.div>
                  ))}
                  
                  <div className="text-center pt-4">
                    <Button variant="outline" className="w-full">
                      View All Submissions
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Challenge Stats & Past Winners */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6"
            >
              {/* Progress */}
              <Card className="game-card">
                <CardHeader>
                  <CardTitle className="text-lg">Challenge Progress</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-1">
                      {currentChallenge.totalSubmissions.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">submissions so far</div>
                  </div>
                  
                  <Progress value={75} className="h-2" />
                  
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Started {currentChallenge.startDate}</span>
                    <span>{currentChallenge.daysLeft} days left</span>
                  </div>
                </CardContent>
              </Card>

              {/* Past Challenges */}
              <Card className="game-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-lg">
                    <Award className="w-5 h-5" />
                    <span>Past Winners</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {pastChallenges.map((challenge, index) => (
                    <div key={challenge.id} className="p-3 bg-white/50 rounded-lg">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-lg">{challenge.emoji}</span>
                        <span className="font-medium text-sm">{challenge.title}</span>
                      </div>
                      <div className="text-xs text-gray-600 mb-1">
                        🏆 {challenge.winner}
                      </div>
                      <div className="text-xs text-gray-500">
                        {challenge.submissions.toLocaleString()} submissions
                      </div>
                    </div>
                  ))}
                  
                  <Button variant="outline" size="sm" className="w-full">
                    View All Past Challenges
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* How It Works */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <Card className="game-card">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">How Weekly Challenges Work</CardTitle>
                <CardDescription className="text-base">
                  Join thousands of music lovers in our global weekly themes
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="grid md:grid-cols-4 gap-6">
                  {[
                    {
                      step: '1',
                      title: 'New Theme',
                      description: 'Every Monday, we reveal a new musical theme',
                      icon: Sparkles
                    },
                    {
                      step: '2', 
                      title: 'Submit Song',
                      description: 'Choose your perfect song and share why it fits',
                      icon: Music
                    },
                    {
                      step: '3',
                      title: 'Community Votes',
                      description: 'Discover others\' choices and see what\'s trending',
                      icon: Heart
                    },
                    {
                      step: '4',
                      title: 'Winner Crowned',
                      description: 'The most popular song becomes the weekly champion',
                      icon: Trophy
                    }
                  ].map((step, index) => (
                    <div key={step.step} className="text-center">
                      <div className="w-12 h-12 gradient-bg rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">
                        {step.step}
                      </div>
                      <step.icon className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                      <h3 className="font-semibold mb-2">{step.title}</h3>
                      <p className="text-sm text-gray-600">{step.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default WeeklyChallenge;


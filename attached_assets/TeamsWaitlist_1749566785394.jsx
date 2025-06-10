import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { 
  Music, 
  ArrowLeft,
  Building2,
  Users,
  Zap,
  Shield,
  BarChart3,
  MessageSquare,
  CheckCircle,
  Sparkles,
  Calendar,
  Settings,
  Crown,
  Rocket
} from 'lucide-react';

const TeamsWaitlist = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    teamSize: '',
    role: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.company) {
      setIsSubmitted(true);
      // In real app, this would submit to backend/CRM
    }
  };

  const teamSizes = [
    '10-50 employees',
    '50-200 employees', 
    '200-500 employees',
    '500+ employees'
  ];

  const roles = [
    'HR/People Operations',
    'Team Lead/Manager',
    'Executive/C-Suite',
    'Office Manager',
    'Other'
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md text-center"
        >
          <Card className="game-card p-8">
            <CardContent className="space-y-6">
              <div className="w-20 h-20 gradient-bg rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">You're on the list! 🎉</h2>
                <p className="text-gray-600">
                  Thanks for your interest in Uptune for Teams. We'll be in touch soon with early access details.
                </p>
              </div>
              
              <div className="space-y-3">
                <Button 
                  className="w-full gradient-bg text-white"
                  onClick={() => navigate('/games')}
                >
                  <Music className="w-4 h-4 mr-2" />
                  Try Uptune Now (Free)
                </Button>
                
                <Button 
                  variant="outline"
                  className="w-full"
                  onClick={() => navigate('/')}
                >
                  Back to Home
                </Button>
              </div>
              
              <p className="text-sm text-gray-500">
                In the meantime, try our free consumer app to see the magic in action!
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
            onClick={() => navigate('/games')}
            className="border-purple-200 text-purple-700 hover:bg-purple-50"
          >
            Try Free Version
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
            className="text-center mb-16"
          >
            <Badge className="gradient-bg text-white border-0 px-6 py-3 mb-8 text-lg">
              <Crown className="w-5 h-5 mr-2" />
              Coming Soon
            </Badge>
            
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              Uptune for{' '}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Teams
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
              Transform your workplace culture with the power of music. Build stronger teams, 
              boost engagement, and create lasting connections through collaborative musical experiences.
            </p>
            
            <div className="flex items-center justify-center space-x-8 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4" />
                <span>Private & Secure</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4" />
                <span>Slack Integration</span>
              </div>
              <div className="flex items-center space-x-2">
                <BarChart3 className="w-4 h-4" />
                <span>Analytics Dashboard</span>
              </div>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Features */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <h2 className="text-3xl font-bold">
                  Everything you love about Uptune,{' '}
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    supercharged for work
                  </span>
                </h2>
                
                <div className="space-y-6">
                  {[
                    {
                      icon: Building2,
                      title: 'Private Company Environment',
                      description: 'All games and challenges stay within your organization. Create a safe, internal "watercooler" for your team.',
                      color: 'purple'
                    },
                    {
                      icon: MessageSquare,
                      title: 'Workplace Integrations',
                      description: 'Start games directly from Slack, Microsoft Teams, or Google Chat with simple commands.',
                      color: 'pink'
                    },
                    {
                      icon: Sparkles,
                      title: 'Advanced Game Library',
                      description: 'Access exclusive workplace games like "Meeting Icebreakers" and productivity-focused Soundtrack Sessions.',
                      color: 'indigo'
                    },
                    {
                      icon: Rocket,
                      title: 'AI-Powered Connection',
                      description: 'Get proactive suggestions for icebreakers and team activities based on shared musical tastes.',
                      color: 'purple'
                    },
                    {
                      icon: Calendar,
                      title: 'Company-Wide Adventures',
                      description: 'Run large-scale, structured musical events quarterly or annually to bring the whole company together.',
                      color: 'pink'
                    },
                    {
                      icon: BarChart3,
                      title: 'Analytics & Insights',
                      description: 'Track team engagement, participation rates, and measure the impact on company culture.',
                      color: 'indigo'
                    }
                  ].map((feature, index) => (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                      className="flex space-x-4"
                    >
                      <div className={`w-12 h-12 bg-${feature.color}-100 rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <feature.icon className={`w-6 h-6 text-${feature.color}-600`} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                        <p className="text-gray-600">{feature.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Column - Waitlist Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="sticky top-8"
            >
              <Card className="game-card p-8">
                <CardHeader className="text-center pb-6">
                  <CardTitle className="text-2xl">Join the Waitlist</CardTitle>
                  <CardDescription className="text-base">
                    Be among the first to transform your workplace culture with music
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                          Your Name *
                        </label>
                        <Input
                          placeholder="John Smith"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                          Work Email *
                        </label>
                        <Input
                          type="email"
                          placeholder="john@company.com"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Company Name *
                      </label>
                      <Input
                        placeholder="Your Company"
                        value={formData.company}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Team Size
                      </label>
                      <select
                        className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        value={formData.teamSize}
                        onChange={(e) => handleInputChange('teamSize', e.target.value)}
                      >
                        <option value="">Select team size</option>
                        {teamSizes.map(size => (
                          <option key={size} value={size}>{size}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Your Role
                      </label>
                      <select
                        className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        value={formData.role}
                        onChange={(e) => handleInputChange('role', e.target.value)}
                      >
                        <option value="">Select your role</option>
                        {roles.map(role => (
                          <option key={role} value={role}>{role}</option>
                        ))}
                      </select>
                    </div>
                    
                    <Button 
                      type="submit"
                      className="w-full gradient-bg text-white text-lg py-6"
                      disabled={!formData.name || !formData.email || !formData.company}
                    >
                      <Users className="w-5 h-5 mr-2" />
                      Join Waitlist
                    </Button>
                    
                    <p className="text-xs text-gray-500 text-center">
                      We'll contact you when Uptune for Teams is ready for early access
                    </p>
                  </form>
                </CardContent>
              </Card>
              
              {/* Pricing Preview */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="mt-8"
              >
                <Card className="game-card">
                  <CardHeader>
                    <CardTitle className="text-lg">Expected Pricing</CardTitle>
                    <CardDescription>
                      Simple, transparent pricing when we launch
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">£5</div>
                        <div className="text-sm text-gray-600">per user/month</div>
                        <div className="text-xs text-gray-500 mt-1">Team Plan</div>
                      </div>
                      <div className="p-4 bg-pink-50 rounded-lg">
                        <div className="text-2xl font-bold text-pink-600">£8</div>
                        <div className="text-sm text-gray-600">per user/month</div>
                        <div className="text-xs text-gray-500 mt-1">Business Plan</div>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 text-center">
                      Early access members get special launch pricing
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TeamsWaitlist;


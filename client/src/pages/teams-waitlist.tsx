import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
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
  Crown,
  Rocket
} from 'lucide-react';

const TeamsWaitlist = () => {
  const { toast } = useToast();
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

  const submitMutation = useMutation({
    mutationFn: async (data) => {
      const response = await apiRequest('POST', '/api/teams-waitlist', data);
      return response.json();
    },
    onSuccess: () => {
      setIsSubmitted(true);
    },
    onError: () => {
      toast({
        title: "Submission Failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.company) {
      submitMutation.mutate(formData);
    } else {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
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
                <Link href="/games">
                  <Button className="w-full gradient-bg text-white">
                    <Music className="w-4 h-4 mr-2" />
                    Try Uptune Now (Free)
                  </Button>
                </Link>
                
                <Link href="/">
                  <Button variant="outline" className="w-full">
                    Back to Home
                  </Button>
                </Link>
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
          <Link href="/">
            <Button
              variant="ghost"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Button>
          </Link>
          
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center">
              <Music className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold gradient-text">
              Uptune
            </span>
          </div>
          
          <Link href="/games">
            <Button 
              variant="outline" 
              className="border-purple-200 text-purple-700 hover:bg-purple-50"
            >
              Try Free Version
            </Button>
          </Link>
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
              <span className="gradient-text">
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
                  <span className="gradient-text">
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
                      <Select value={formData.teamSize} onValueChange={(value) => handleInputChange('teamSize', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select team size" />
                        </SelectTrigger>
                        <SelectContent>
                          {teamSizes.map((size) => (
                            <SelectItem key={size} value={size}>
                              {size}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Your Role
                      </label>
                      <Select value={formData.role} onValueChange={(value) => handleInputChange('role', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your role" />
                        </SelectTrigger>
                        <SelectContent>
                          {roles.map((role) => (
                            <SelectItem key={role} value={role}>
                              {role}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <Button 
                      type="submit" 
                      disabled={submitMutation.isPending}
                      className="w-full gradient-bg text-white py-4 text-lg font-medium"
                    >
                      <Rocket className="w-5 h-5 mr-2" />
                      Join Waitlist
                    </Button>
                    
                    <p className="text-xs text-gray-500 text-center">
                      We'll be in touch within 48 hours with early access details
                    </p>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TeamsWaitlist;

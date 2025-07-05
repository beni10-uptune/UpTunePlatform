import { useState, useEffect } from 'react';
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
import { Navigation } from '@/components/navigation';
import { 
  Music, 
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
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    teamSize: '',
    role: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const submitMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const response = await fetch('/api/teams-waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to submit');
      return response.json();
    },
    onSuccess: () => {
      setIsSubmitted(true);
      toast({
        title: "Success!",
        description: "Thanks for your interest! We'll be in touch soon.",
      });
    },
    onError: (error) => {
      console.error('Submit error:', error);
      toast({
        title: "Submission failed",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    }
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.companyName || !formData.contactName || !formData.email || !formData.teamSize) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    submitMutation.mutate(formData);
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
                <Link href="/">
                  <Button className="w-full gradient-bg text-white">
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 pt-16">

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
              <span className="gradient-text">Teams</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Music has always brought people together. Now, imagine that magic in your workplace - 
              where every team member's musical story creates a symphony of connection and understanding.
            </p>
          </motion.div>

          {/* Form Section */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="game-card">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center">
                    <Rocket className="w-6 h-6 mr-3 text-purple-600" />
                    Join the Waitlist
                  </CardTitle>
                  <CardDescription>
                    Be among the first to experience the future of team building
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Company Name *</label>
                        <Input
                          value={formData.companyName}
                          onChange={(e) => handleInputChange('companyName', e.target.value)}
                          placeholder="Your company"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Your Name *</label>
                        <Input
                          value={formData.contactName}
                          onChange={(e) => handleInputChange('contactName', e.target.value)}
                          placeholder="Your full name"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Email *</label>
                        <Input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="your@company.com"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Phone</label>
                        <Input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Team Size *</label>
                      <Select value={formData.teamSize} onValueChange={(value) => handleInputChange('teamSize', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your team size" />
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
                      <label className="text-sm font-medium">Your Role</label>
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

                    <div className="space-y-2">
                      <label className="text-sm font-medium">What are you hoping to achieve?</label>
                      <Textarea
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        placeholder="Tell us about your team building goals..."
                        className="h-24"
                      />
                    </div>

                    <Button 
                      type="submit"
                      className="w-full gradient-bg text-white"
                      disabled={submitMutation.isPending}
                    >
                      {submitMutation.isPending ? 'Submitting...' : 'Join Waitlist'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Right Column - Features */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-6"
            >
              <div className="space-y-6">
                <Card className="game-card p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 gradient-bg rounded-lg flex items-center justify-center flex-shrink-0">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Musical Team Experiences</h3>
                      <p className="text-gray-600">
                        Everyone has a soundtrack to their life. Share yours, discover theirs, and watch magic happen
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="game-card p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 gradient-bg rounded-lg flex items-center justify-center flex-shrink-0">
                      <BarChart3 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Musical Connections Map</h3>
                      <p className="text-gray-600">
                        See how music brings your team together with beautiful visualizations of shared tastes and discoveries
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="game-card p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 gradient-bg rounded-lg flex items-center justify-center flex-shrink-0">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Safe & Inclusive Space</h3>
                      <p className="text-gray-600">
                        Everyone feels comfortable sharing their musical soul with thoughtful privacy and respect for all
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="game-card p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 gradient-bg rounded-lg flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Play Anytime, Anywhere</h3>
                      <p className="text-gray-600">
                        Perfect for offsites, virtual hangouts, or those spontaneous moments when you just want to connect
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TeamsWaitlist;
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Users, Play } from "lucide-react";
import type { Journey } from "@shared/schema";

export default function JourneysPage() {
  const { data: journeys, isLoading } = useQuery({
    queryKey: ['/api/journeys', { published: true }],
    queryFn: async () => {
      const response = await fetch('/api/journeys?published=true');
      return response.json() as Promise<Journey[]>;
    }
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-6">
        <div className="container mx-auto max-w-6xl">
          <div className="animate-pulse space-y-6">
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg w-1/3"></div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Musical Journeys
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Immersive musical experiences that blend storytelling, interactive content, and community participation. 
            Discover the stories behind the music.
          </p>
        </div>

        {/* Journeys Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {journeys?.map((journey) => (
            <Card key={journey.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              {/* Header Image */}
              {journey.headlineImageUrl && (
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={journey.headlineImageUrl} 
                    alt={journey.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              
              <CardHeader className="pb-3">
                <CardTitle className="text-xl text-gray-900 dark:text-white leading-tight">
                  {journey.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="pt-0">
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                  {journey.introduction}
                </p>
                
                {/* Metadata */}
                <div className="flex items-center gap-3 mb-4 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>25 min</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>Interactive</span>
                  </div>
                </div>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary" className="text-xs bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300">
                    Story
                  </Badge>
                  <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                    Community
                  </Badge>
                  <Badge variant="secondary" className="text-xs bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                    Spotify
                  </Badge>
                </div>
                
                {/* Action Button */}
                <Link href={`/journeys/${journey.slug}`}>
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white">
                    <Play className="w-4 h-4 mr-2" />
                    Start Journey
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {journeys && journeys.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎵</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No Journeys Available
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Musical journeys are being prepared. Check back soon for immersive music experiences!
            </p>
          </div>
        )}
        
        {/* Footer */}
        <div className="mt-12 text-center">
          <Link href="/">
            <Button variant="outline" className="border-purple-200 dark:border-purple-700 text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
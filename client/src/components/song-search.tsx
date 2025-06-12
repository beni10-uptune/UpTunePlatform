import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Search, Music, Play, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SpotifyTrack {
  id: string;
  title: string;
  artist: string;
  album: string;
  imageUrl: string | null;
  spotifyUrl: string;
  previewUrl: string | null;
}

interface SongSearchProps {
  onSongSelect: (song: SpotifyTrack) => void;
  placeholder?: string;
  className?: string;
}

export function SongSearch({ onSongSelect, placeholder = "Search for a song...", className }: SongSearchProps) {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [showResults, setShowResults] = useState(true);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  const { data: tracks = [], isLoading, error } = useQuery({
    queryKey: ['/api/spotify/search', debouncedQuery],
    queryFn: async () => {
      if (!debouncedQuery.trim()) return [];
      const response = await fetch(`/api/spotify/search?q=${encodeURIComponent(debouncedQuery)}`);
      if (!response.ok) throw new Error('Search failed');
      return response.json();
    },
    enabled: debouncedQuery.length > 2,
  });

  return (
    <div className={cn("space-y-4", className)}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowResults(true);
          }}
          className="pl-10"
        />
      </div>

      {error && (
        <Card className="border-red-200">
          <CardContent className="p-4 text-center">
            <Music className="w-8 h-8 text-red-400 mx-auto mb-2" />
            <p className="text-red-600 text-sm">Failed to search songs. Please try again.</p>
          </CardContent>
        </Card>
      )}

      {isLoading && debouncedQuery && (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="p-4">
              <div className="flex items-center space-x-4">
                <Skeleton className="w-12 h-12 rounded" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
                <Skeleton className="h-8 w-20" />
              </div>
            </Card>
          ))}
        </div>
      )}

      {tracks.length > 0 && showResults && (
        <div className="space-y-3 max-h-64 sm:max-h-80 overflow-y-auto overscroll-contain w-full">
          {tracks.map((track: SpotifyTrack) => (
            <Card key={track.id} className="transition-colors hover:bg-gray-50 cursor-pointer w-full overflow-hidden">
              <CardContent className="p-2 sm:p-4 w-full">
                <div className="grid grid-cols-[auto_1fr_auto] gap-2 items-start w-full">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 rounded flex items-center justify-center overflow-hidden flex-shrink-0">
                    {track.imageUrl ? (
                      <img 
                        src={track.imageUrl} 
                        alt={track.album}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Music className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
                    )}
                  </div>
                  
                  <div className="min-w-0 overflow-hidden">
                    <h4 className="font-medium text-gray-900 text-sm leading-tight break-words" style={{
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>{track.title}</h4>
                    <p className="text-xs text-gray-600 truncate mt-1">{track.artist}</p>
                    <p className="text-xs text-gray-500 truncate hidden sm:block">{track.album}</p>
                  </div>
                  
                  <div className="flex flex-col gap-1 items-end flex-shrink-0">
                    {track.previewUrl && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          const audio = new Audio(track.previewUrl!);
                          audio.play().catch(() => {
                            // Handle play failure silently
                          });
                        }}
                        className="text-gray-600 hover:text-gray-800 p-1 hidden sm:flex h-6 w-6"
                      >
                        <Play className="w-3 h-3" />
                      </Button>
                    )}
                    
                    <Button
                      onClick={() => {
                        onSongSelect(track);
                        setQuery('');
                        setDebouncedQuery('');
                        setShowResults(false);
                      }}
                      size="sm"
                      className="gradient-bg text-white hover:opacity-90 px-2 py-1 text-xs h-7 min-w-[50px] whitespace-nowrap"
                    >
                      <Plus className="w-3 h-3 mr-1" />
                      Add
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {debouncedQuery && !isLoading && tracks.length === 0 && !error && (
        <Card className="border-gray-200">
          <CardContent className="p-6 text-center">
            <Music className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-600 text-sm">No songs found for "{debouncedQuery}"</p>
            <p className="text-gray-500 text-xs mt-1">Try a different search term</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
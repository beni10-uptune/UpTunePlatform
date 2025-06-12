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
    <div className={cn("space-y-4 w-full", className)}>
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
          className="pl-10 w-full"
        />
      </div>

      {error && (
        <div className="border border-red-200 rounded-md p-4 text-center bg-red-50">
          <Music className="w-8 h-8 text-red-400 mx-auto mb-2" />
          <p className="text-red-600 text-sm">Failed to search songs. Please try again.</p>
        </div>
      )}

      {isLoading && debouncedQuery && (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-4 border rounded-md">
              <div className="flex items-center space-x-4">
                <Skeleton className="w-12 h-12 rounded" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
                <Skeleton className="h-8 w-20" />
              </div>
            </div>
          ))}
        </div>
      )}

      {tracks.length > 0 && showResults && (
        <div className="w-full max-w-full overflow-hidden">
          <div className="max-h-60 overflow-y-auto border rounded-md bg-white shadow-sm">
            {tracks.map((track: SpotifyTrack) => (
              <div 
                key={track.id} 
                className="p-3 border-b last:border-b-0 hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => {
                  onSongSelect(track);
                  setShowResults(false);
                  setQuery('');
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center overflow-hidden flex-shrink-0">
                    {track.imageUrl ? (
                      <img 
                        src={track.imageUrl} 
                        alt={track.album}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Music className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 truncate text-sm">{track.title}</h4>
                    <p className="text-xs text-gray-600 truncate">{track.artist}</p>
                    <p className="text-xs text-gray-500 truncate hidden sm:block">{track.album}</p>
                  </div>
                  
                  <div className="flex-shrink-0">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSongSelect(track);
                        setQuery('');
                        setDebouncedQuery('');
                        setShowResults(false);
                      }}
                      className="text-xs px-2 py-1 h-8"
                    >
                      <Plus className="w-3 h-3 mr-1" />
                      Add
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {debouncedQuery && !isLoading && tracks.length === 0 && !error && (
        <div className="p-6 text-center border rounded-md bg-gray-50">
          <Music className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-600 text-sm">No songs found for "{debouncedQuery}"</p>
          <p className="text-gray-500 text-xs mt-1">Try a different search term</p>
        </div>
      )}
    </div>
  );
}
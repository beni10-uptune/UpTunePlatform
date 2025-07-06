import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface AuthSuggestionProps {
  title?: string;
  description?: string;
  benefits?: string[];
  onDismiss?: () => void;
  compact?: boolean;
}

export function AuthSuggestion({
  title = "Save Your Musical Journey",
  description = "Create a free account to unlock these benefits:",
  benefits = [
    "Save your game rooms and playlists",
    "Get updates on new Musical Journeys",
    "Receive curated playlist recommendations",
    "Track your musical taste evolution",
  ],
  onDismiss,
  compact = false,
}: AuthSuggestionProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const handleDismiss = () => {
    setDismissed(true);
    onDismiss?.();
  };

  if (compact) {
    return (
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1">
          <p className="text-sm text-white/80">
            {title} • <span className="text-white/60">{description}</span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="ghost"
            className="text-white/70 hover:text-white hover:bg-white/10"
            onClick={() => window.location.href = '/api/login'}
          >
            Sign In
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="text-white/50 hover:text-white/70 hover:bg-white/10 p-1"
            onClick={handleDismiss}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-sm border border-white/10 rounded-xl p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
          <p className="text-white/70 text-sm">{description}</p>
        </div>
        <Button
          size="sm"
          variant="ghost"
          className="text-white/50 hover:text-white/70 hover:bg-white/10 -mt-2 -mr-2"
          onClick={handleDismiss}
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      {benefits.length > 0 && (
        <ul className="space-y-2 mb-4">
          {benefits.map((benefit, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-purple-400 mt-0.5">✓</span>
              <span className="text-white/80 text-sm">{benefit}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="flex gap-3">
        <Button
          size="sm"
          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700"
          onClick={() => window.location.href = '/api/login'}
        >
          Create Free Account
        </Button>
        <Button
          size="sm"
          variant="ghost"
          className="text-white/70 hover:text-white hover:bg-white/10"
          onClick={handleDismiss}
        >
          Maybe Later
        </Button>
      </div>
    </div>
  );
}
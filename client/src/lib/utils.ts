import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateRoomCode(): string {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

export function formatTimeRemaining(endDate: string): string {
  const end = new Date(endDate);
  const now = new Date();
  const diffTime = Math.abs(end.getTime() - now.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 1) {
    return "1 day left";
  } else if (diffDays > 1) {
    return `${diffDays} days left`;
  } else {
    const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
    if (diffHours === 1) {
      return "1 hour left";
    } else {
      return `${diffHours} hours left`;
    }
  }
}

export function getPlayerEmoji(index: number): string {
  const emojis = ['🎵', '🎶', '🎼', '🎤', '🎧', '🎸', '🥁', '🎺'];
  return emojis[index % emojis.length];
}

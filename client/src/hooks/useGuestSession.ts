import { useState, useEffect } from 'react';

const GUEST_SESSION_KEY = 'uptune_guest_session';

interface GuestSession {
  playerId: string;
  playerName: string;
  createdAt: string;
  lastUsed: string;
}

export function useGuestSession() {
  const [guestSession, setGuestSession] = useState<GuestSession | null>(null);

  // Load guest session from localStorage on mount
  useEffect(() => {
    const storedSession = localStorage.getItem(GUEST_SESSION_KEY);
    if (storedSession) {
      try {
        const session = JSON.parse(storedSession) as GuestSession;
        // Update last used timestamp
        session.lastUsed = new Date().toISOString();
        localStorage.setItem(GUEST_SESSION_KEY, JSON.stringify(session));
        setGuestSession(session);
      } catch (error) {
        console.error('Failed to parse guest session:', error);
      }
    }
  }, []);

  const createGuestSession = (playerName: string) => {
    const session: GuestSession = {
      playerId: `guest_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      playerName,
      createdAt: new Date().toISOString(),
      lastUsed: new Date().toISOString(),
    };
    
    localStorage.setItem(GUEST_SESSION_KEY, JSON.stringify(session));
    setGuestSession(session);
    return session;
  };

  const updateGuestName = (playerName: string) => {
    if (guestSession) {
      const updatedSession = {
        ...guestSession,
        playerName,
        lastUsed: new Date().toISOString(),
      };
      localStorage.setItem(GUEST_SESSION_KEY, JSON.stringify(updatedSession));
      setGuestSession(updatedSession);
    } else {
      createGuestSession(playerName);
    }
  };

  const clearGuestSession = () => {
    localStorage.removeItem(GUEST_SESSION_KEY);
    setGuestSession(null);
  };

  return {
    guestSession,
    createGuestSession,
    updateGuestName,
    clearGuestSession,
    playerName: guestSession?.playerName || '',
    playerId: guestSession?.playerId || '',
  };
}
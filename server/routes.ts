import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertGameRoomSchema, insertPlayerSchema, insertSongSchema, insertChallengeSubmissionSchema, insertTeamsWaitlistSchema } from "@shared/schema";
import { sendTeamContactEmail } from "./email";

export async function registerRoutes(app: Express): Promise<Server> {
  // Game Rooms
  app.post("/api/game-rooms", async (req, res) => {
    try {
      const gameRoomData = insertGameRoomSchema.parse(req.body);
      const gameRoom = await storage.createGameRoom(gameRoomData);
      res.json(gameRoom);
    } catch (error: any) {
      console.error("Game room creation error:", error);
      res.status(400).json({ error: "Invalid game room data" });
    }
  });

  app.get("/api/game-rooms/:code", async (req, res) => {
    try {
      const gameRoom = await storage.getGameRoomByCode(req.params.code);
      if (!gameRoom) {
        return res.status(404).json({ error: "Game room not found" });
      }
      res.json(gameRoom);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch game room" });
    }
  });

  // Players
  app.post("/api/players", async (req, res) => {
    try {
      const playerData = insertPlayerSchema.parse(req.body);
      const player = await storage.addPlayer(playerData);
      res.json(player);
    } catch (error) {
      res.status(400).json({ error: "Invalid player data" });
    }
  });

  app.get("/api/game-rooms/:gameRoomId/players", async (req, res) => {
    try {
      const gameRoomId = parseInt(req.params.gameRoomId);
      const players = await storage.getPlayersByGameRoom(gameRoomId);
      res.json(players);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch players" });
    }
  });

  // Songs
  app.post("/api/songs", async (req, res) => {
    try {
      const songData = insertSongSchema.parse(req.body);
      const song = await storage.addSong(songData);
      res.json(song);
    } catch (error) {
      res.status(400).json({ error: "Invalid song data" });
    }
  });

  app.get("/api/game-rooms/:gameRoomId/songs", async (req, res) => {
    try {
      const gameRoomId = parseInt(req.params.gameRoomId);
      const songs = await storage.getSongsByGameRoom(gameRoomId);
      res.json(songs);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch songs" });
    }
  });

  // Weekly Challenge
  app.get("/api/weekly-challenge", async (req, res) => {
    try {
      const challenge = await storage.getCurrentChallenge();
      if (!challenge) {
        return res.status(404).json({ error: "No active challenge found" });
      }
      res.json(challenge);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch weekly challenge" });
    }
  });

  // Challenge Submissions
  app.post("/api/challenge-submissions", async (req, res) => {
    try {
      const submissionData = insertChallengeSubmissionSchema.parse(req.body);
      const submission = await storage.addChallengeSubmission(submissionData);
      res.json(submission);
    } catch (error) {
      res.status(400).json({ error: "Invalid submission data" });
    }
  });

  app.get("/api/weekly-challenge/:challengeId/submissions", async (req, res) => {
    try {
      const challengeId = parseInt(req.params.challengeId);
      const submissions = await storage.getChallengeSubmissions(challengeId);
      res.json(submissions);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch submissions" });
    }
  });

  app.post("/api/challenge-submissions/:submissionId/vote", async (req, res) => {
    try {
      const submissionId = parseInt(req.params.submissionId);
      await storage.voteForSubmission(submissionId);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to vote for submission" });
    }
  });

  // Teams Waitlist
  app.post("/api/teams-waitlist", async (req, res) => {
    try {
      const waitlistData = insertTeamsWaitlistSchema.parse(req.body);
      const entry = await storage.addToTeamsWaitlist(waitlistData);
      res.json(entry);
    } catch (error) {
      res.status(400).json({ error: "Invalid waitlist data" });
    }
  });

  // Spotify API endpoints
  app.get("/api/spotify/search", async (req, res) => {
    try {
      const query = req.query.q as string;
      if (!query) {
        return res.status(400).json({ error: "Query parameter required" });
      }

      const { spotifyService } = await import("./spotify");
      const tracks = await spotifyService.searchTracks(query);
      const formattedTracks = tracks.map(track => spotifyService.formatTrackForClient(track));
      
      res.json(formattedTracks);
    } catch (error) {
      console.error("Spotify search error:", error);
      res.status(500).json({ error: "Failed to search tracks" });
    }
  });

  app.get("/api/spotify/track/:id", async (req, res) => {
    try {
      const { spotifyService } = await import("./spotify");
      const track = await spotifyService.getTrack(req.params.id);
      
      if (!track) {
        return res.status(404).json({ error: "Track not found" });
      }
      
      res.json(spotifyService.formatTrackForClient(track));
    } catch (error) {
      console.error("Spotify track error:", error);
      res.status(500).json({ error: "Failed to get track" });
    }
  });

  // Spotify OAuth endpoints
  app.get("/api/spotify/auth", async (req, res) => {
    try {
      const { spotifyService } = await import("./spotify");
      const redirectUri = `${req.protocol}://${req.get('host')}/api/spotify/callback`;
      const state = Math.random().toString(36).substring(7);
      
      // Store state in session for verification
      (req.session as any).spotifyState = state;
      
      const authUrl = spotifyService.generateAuthUrl(redirectUri, state);
      res.json({ authUrl });
    } catch (error) {
      console.error("Spotify auth error:", error);
      res.status(500).json({ error: "Failed to generate auth URL" });
    }
  });

  app.get("/api/spotify/callback", async (req, res) => {
    try {
      const { code, state } = req.query;
      
      if (!code || !state || state !== (req.session as any).spotifyState) {
        return res.status(400).send("Invalid callback parameters");
      }
      
      const { spotifyService } = await import("./spotify");
      const redirectUri = `${req.protocol}://${req.get('host')}/api/spotify/callback`;
      const tokens = await spotifyService.exchangeCodeForToken(code as string, redirectUri);
      
      // Store tokens in session
      (req.session as any).spotifyAccessToken = tokens.access_token;
      (req.session as any).spotifyRefreshToken = tokens.refresh_token;
      
      // Redirect to success page
      res.redirect('/?spotify=connected');
    } catch (error) {
      console.error("Spotify callback error:", error);
      res.redirect('/?spotify=error');
    }
  });

  app.post("/api/spotify/create-playlist", async (req, res) => {
    try {
      const { name, description, trackIds } = req.body;
      const accessToken = (req.session as any).spotifyAccessToken;
      
      if (!accessToken) {
        return res.status(401).json({ error: "Not authenticated with Spotify" });
      }
      
      if (!trackIds || !Array.isArray(trackIds) || trackIds.length === 0) {
        return res.status(400).json({ error: "No tracks provided" });
      }
      
      const { spotifyService } = await import("./spotify");
      const playlistUrl = await spotifyService.createPlaylistFromTracks(
        accessToken,
        name || "Uptune Playlist",
        trackIds,
        description
      );
      
      res.json({
        success: true,
        playlistUrl,
        message: `Playlist "${name}" created successfully!`
      });
    } catch (error) {
      console.error("Create playlist error:", error);
      res.status(500).json({ error: "Failed to create playlist" });
    }
  });

  // Get playlist data for room
  app.get("/api/game-rooms/:gameRoomId/playlist", async (req, res) => {
    try {
      const gameRoomId = parseInt(req.params.gameRoomId);
      const songs = await storage.getSongsByGameRoom(gameRoomId);
      const room = await storage.getGameRoom(gameRoomId);
      
      if (!room) {
        return res.status(404).json({ error: "Game room not found" });
      }
      
      const playlist = {
        name: `${room.theme} - ${room.gameType}`,
        description: `Collaborative playlist created in Uptune`,
        tracks: songs.filter(song => song.spotifyId).map(song => ({
          id: song.spotifyId,
          title: song.title,
          artist: song.artist,
          album: song.album,
          imageUrl: song.imageUrl
        }))
      };
      
      res.json(playlist);
    } catch (error) {
      console.error("Get playlist error:", error);
      res.status(500).json({ error: "Failed to get playlist data" });
    }
  });

  // Teams contact form
  app.post("/api/teams/contact", async (req, res) => {
    try {
      const { companyName, contactName, email, phone, teamSize, message } = req.body;
      
      if (!companyName || !contactName || !email || !teamSize || !message) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const success = await sendTeamContactEmail({
        companyName,
        contactName,
        email,
        phone,
        teamSize,
        message
      });

      if (success) {
        res.json({ success: true, message: "Contact form submitted successfully" });
      } else {
        res.status(500).json({ error: "Failed to send email" });
      }
    } catch (error) {
      console.error("Teams contact error:", error);
      res.status(500).json({ error: "Failed to process contact form" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

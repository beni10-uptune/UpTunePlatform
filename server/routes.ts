import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertGameRoomSchema, insertPlayerSchema, insertSongSchema, insertChallengeSubmissionSchema, insertTeamsWaitlistSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Game Rooms
  app.post("/api/game-rooms", async (req, res) => {
    try {
      const gameRoomData = insertGameRoomSchema.parse(req.body);
      const gameRoom = await storage.createGameRoom(gameRoomData);
      res.json(gameRoom);
    } catch (error) {
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

  const httpServer = createServer(app);
  return httpServer;
}

import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertGameRoomSchema, insertPlayerSchema, insertSongSchema, insertChallengeSubmissionSchema, insertTeamsWaitlistSchema, insertListEntrySchema, insertEntryVoteSchema, type AiConversation } from "@shared/schema";
import { sendTeamContactEmail } from "./email";
import { analyzePlaylist, enhanceStory, generateSongRecommendations, suggestGameMode, generateAiHostQuestion, generateSongSuggestionsFromResponse } from "./ai";

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
      console.error("Weekly challenge error:", error);
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

  app.get("/api/weekly-challenge/submissions", async (req, res) => {
    try {
      const challenge = await storage.getCurrentChallenge();
      if (!challenge) {
        return res.status(404).json({ error: "No active challenge found" });
      }
      const submissions = await storage.getChallengeSubmissions(challenge.id);
      res.json(submissions);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch submissions" });
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
      
      // Use environment-appropriate redirect URI
      const isDev = process.env.NODE_ENV === 'development';
      const host = req.get('host');
      const protocol = req.protocol;
      
      let redirectUri;
      if (isDev && host?.includes('localhost')) {
        redirectUri = `${protocol}://${host}/api/spotify/callback`;
      } else {
        redirectUri = 'https://uptune.xyz/api/spotify/callback';
      }
      
      const state = Math.random().toString(36).substring(7);
      
      // Store state in session for verification
      (req.session as any).spotifyState = state;
      
      const authUrl = spotifyService.generateAuthUrl(redirectUri, state);
      res.redirect(authUrl);
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
      
      // Use same redirect URI logic as auth endpoint
      const isDev = process.env.NODE_ENV === 'development';
      const host = req.get('host');
      const protocol = req.protocol;
      
      let redirectUri;
      if (isDev && host?.includes('localhost')) {
        redirectUri = `${protocol}://${host}/api/spotify/callback`;
      } else {
        redirectUri = 'https://uptune.xyz/api/spotify/callback';
      }
      
      const tokens = await spotifyService.exchangeCodeForToken(code as string, redirectUri);
      
      // Store tokens in session
      (req.session as any).spotifyAccessToken = tokens.access_token;
      (req.session as any).spotifyRefreshToken = tokens.refresh_token;
      
      // Redirect back to community lists with success indicator
      res.redirect('/community-lists?spotify=connected');
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

  // AI-powered features
  app.post("/api/ai/analyze-playlist", async (req, res) => {
    try {
      const { gameRoomId } = req.body;
      const songs = await storage.getSongsByGameRoom(gameRoomId);
      
      if (songs.length === 0) {
        return res.json({
          mood: 'Getting started',
          description: 'Add some songs to see AI analysis!',
          recommendations: []
        });
      }

      const songsForAI = songs.map(song => ({
        title: song.title,
        artist: song.artist,
        album: song.album || undefined,
        story: song.story || undefined
      }));
      
      const analysis = await analyzePlaylist(songsForAI);
      res.json(analysis);
    } catch (error) {
      console.error("AI playlist analysis error:", error);
      res.status(500).json({ error: "Failed to analyze playlist" });
    }
  });

  app.post("/api/ai/enhance-story", async (req, res) => {
    try {
      const { song, currentStory } = req.body;
      
      if (!song || !currentStory) {
        return res.status(400).json({ error: "Song and story are required" });
      }

      const enhancement = await enhanceStory(song, currentStory);
      res.json(enhancement);
    } catch (error) {
      console.error("AI story enhancement error:", error);
      res.status(500).json({ error: "Failed to enhance story" });
    }
  });

  // AI Host Game Mode Routes
  app.post("/api/ai/host-question", async (req, res) => {
    try {
      const { gameRoomId, playerId } = req.body;
      
      if (!gameRoomId || !playerId) {
        return res.status(400).json({ error: "Game room ID and player ID are required" });
      }

      // Get player info
      const players = await storage.getPlayersByGameRoom(gameRoomId);
      const player = players.find(p => p.id === playerId);
      
      // Get conversation history
      const conversations = await storage.getAiConversations(gameRoomId, playerId);
      
      // Get previous songs
      const songs = await storage.getSongsByGameRoom(gameRoomId);
      const playerSongs = songs.filter(s => s.playerId === playerId).map(s => ({
        title: s.title,
        artist: s.artist,
        album: s.album || undefined,
        story: s.story || undefined
      }));
      
      const question = await generateAiHostQuestion({
        playerName: player?.nickname,
        previousSongs: playerSongs,
        conversationHistory: conversations.map(c => `Q: ${c.question}\nA: ${c.response || 'No response'}`),
        questionNumber: conversations.length + 1
      });
      
      // Save the question to conversation history
      await storage.addAiConversation({
        gameRoomId,
        playerId,
        question: question.question,
        questionNumber: conversations.length + 1
      });
      
      res.json(question);
    } catch (error) {
      console.error("AI host question error:", error);
      res.status(500).json({ error: "Failed to generate question" });
    }
  });

  app.post("/api/ai/host-response", async (req, res) => {
    try {
      const { gameRoomId, playerId, response, conversationId } = req.body;
      
      if (!gameRoomId || !playerId || !response) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      // Get the latest conversation
      const conversations = await storage.getAiConversations(gameRoomId, playerId);
      const latestConversation = conversations[conversations.length - 1];
      
      if (!latestConversation) {
        return res.status(400).json({ error: "No conversation found" });
      }

      // Get player info and songs for context
      const players = await storage.getPlayersByGameRoom(gameRoomId);
      const player = players.find(p => p.id === playerId);
      const songs = await storage.getSongsByGameRoom(gameRoomId);
      const playerSongs = songs.filter(s => s.playerId === playerId).map(s => ({
        title: s.title,
        artist: s.artist,
        album: s.album || undefined,
        story: s.story || undefined
      }));
      
      // Generate song suggestions based on response
      const suggestions = await generateSongSuggestionsFromResponse(response, {
        question: latestConversation.question,
        playerName: player?.nickname,
        previousSongs: playerSongs
      });
      
      // Update conversation with response and suggestions
      await storage.updateAiConversation(latestConversation.id, {
        response,
        suggestions: suggestions.suggestions,
        reasoning: suggestions.reasoning
      });
      
      res.json(suggestions);
    } catch (error) {
      console.error("AI host response error:", error);
      res.status(500).json({ error: "Failed to process response" });
    }
  });

  app.get("/api/ai/conversations/:gameRoomId/:playerId", async (req, res) => {
    try {
      const { gameRoomId, playerId } = req.params;
      
      const conversations = await storage.getAiConversations(
        parseInt(gameRoomId), 
        parseInt(playerId)
      );
      
      res.json(conversations);
    } catch (error) {
      console.error("AI conversations fetch error:", error);
      res.status(500).json({ error: "Failed to fetch conversations" });
    }
  });

  app.post("/api/ai/song-recommendations", async (req, res) => {
    try {
      const { gameRoomId, gameType } = req.body;
      const songs = await storage.getSongsByGameRoom(gameRoomId);
      
      const songsForAI = songs.map(song => ({
        title: song.title,
        artist: song.artist,
        album: song.album || undefined,
        story: song.story || undefined
      }));
      
      const recommendations = await generateSongRecommendations(songsForAI, gameType);
      res.json({ recommendations });
    } catch (error) {
      console.error("AI recommendations error:", error);
      res.status(500).json({ error: "Failed to get recommendations" });
    }
  });

  app.post("/api/ai/suggest-game", async (req, res) => {
    try {
      const { playerCount, context } = req.body;
      const suggestion = await suggestGameMode(playerCount, context);
      res.json(suggestion);
    } catch (error) {
      console.error("AI game suggestion error:", error);
      res.status(500).json({ error: "Failed to suggest game mode" });
    }
  });

  // Community Lists API
  app.get("/api/community-lists", async (req, res) => {
    try {
      const lists = await storage.getAllCommunityLists();
      res.json(lists);
    } catch (error) {
      console.error("Community lists fetch error:", error);
      res.status(500).json({ error: "Failed to fetch community lists" });
    }
  });

  app.get("/api/community-lists/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const list = await storage.getCommunityListBySlug(slug);
      
      if (!list) {
        return res.status(404).json({ error: "List not found" });
      }
      
      res.json(list);
    } catch (error) {
      console.error("Community list fetch error:", error);
      res.status(500).json({ error: "Failed to fetch community list" });
    }
  });

  app.get("/api/community-lists/:listId/entries", async (req, res) => {
    try {
      const listId = parseInt(req.params.listId);
      const entries = await storage.getListEntries(listId);
      res.json(entries);
    } catch (error) {
      console.error("List entries fetch error:", error);
      res.status(500).json({ error: "Failed to fetch list entries" });
    }
  });

  app.post("/api/community-lists/:listId/entries", async (req, res) => {
    try {
      const listId = parseInt(req.params.listId);
      console.log("Submission data:", req.body);
      
      const entryData = insertListEntrySchema.parse({
        ...req.body,
        listId,
        contextReason: req.body.contextReason || null
      });
      
      const entry = await storage.submitToList(entryData);
      res.json(entry);
    } catch (error: any) {
      console.error("List entry submission error:", error);
      console.error("Request body:", req.body);
      if (error.issues) {
        console.error("Validation issues:", error.issues);
      }
      res.status(400).json({ 
        error: "Invalid entry data",
        details: error.issues || error.message 
      });
    }
  });

  app.post("/api/community-lists/entries/:entryId/vote", async (req, res) => {
    try {
      const entryId = parseInt(req.params.entryId);
      const { voteDirection, userId, guestSessionId } = req.body;
      
      const voteData = insertEntryVoteSchema.parse({
        entryId,
        voteDirection,
        userId,
        guestSessionId
      });
      
      await storage.castVote(voteData);
      res.json({ success: true });
    } catch (error: any) {
      console.error("Vote casting error:", error);
      res.status(400).json({ error: "Invalid vote data" });
    }
  });

  app.get("/api/community-lists/entries/:entryId/vote", async (req, res) => {
    try {
      const entryId = parseInt(req.params.entryId);
      const { userId, guestSessionId } = req.query;
      
      const vote = await storage.getUserVote(
        entryId, 
        userId ? parseInt(userId as string) : undefined, 
        guestSessionId as string
      );
      
      res.json(vote || null);
    } catch (error) {
      console.error("Vote fetch error:", error);
      res.status(500).json({ error: "Failed to fetch vote" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

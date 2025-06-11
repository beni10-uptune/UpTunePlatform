import { 
  type GameRoom, 
  type InsertGameRoom,
  type Player,
  type InsertPlayer,
  type Song,
  type InsertSong,
  type WeeklyChallenge,
  type ChallengeSubmission,
  type InsertChallengeSubmission,
  type TeamsWaitlist,
  type InsertTeamsWaitlist,
  type ContactSubmission,
  type InsertContactSubmission,
  type AiConversation,
  type InsertAiConversation,
  gameRooms,
  players,
  songs,
  challengeSubmissions,
  teamsWaitlist,
  weeklyChallenge,
  contactSubmissions,
  aiConversations
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and } from "drizzle-orm";

export interface IStorage {
  // Game Rooms
  createGameRoom(gameRoom: InsertGameRoom): Promise<GameRoom>;
  getGameRoomByCode(code: string): Promise<GameRoom | undefined>;
  getGameRoom(id: number): Promise<GameRoom | undefined>;
  
  // Players
  addPlayer(player: InsertPlayer): Promise<Player>;
  getPlayersByGameRoom(gameRoomId: number): Promise<Player[]>;
  
  // Songs
  addSong(song: InsertSong): Promise<Song>;
  getSongsByGameRoom(gameRoomId: number): Promise<Song[]>;
  
  // Weekly Challenge
  getCurrentChallenge(): Promise<WeeklyChallenge | undefined>;
  
  // Challenge Submissions
  addChallengeSubmission(submission: InsertChallengeSubmission): Promise<ChallengeSubmission>;
  getChallengeSubmissions(challengeId: number): Promise<ChallengeSubmission[]>;
  voteForSubmission(submissionId: number): Promise<void>;
  
  // Teams Waitlist
  addToTeamsWaitlist(entry: InsertTeamsWaitlist): Promise<TeamsWaitlist>;
  
  // Contact Submissions
  addContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  getContactSubmissions(): Promise<ContactSubmission[]>;
  
  // AI Conversations
  addAiConversation(conversation: InsertAiConversation): Promise<AiConversation>;
  getAiConversations(gameRoomId: number, playerId: number): Promise<AiConversation[]>;
  updateAiConversation(id: number, updates: Partial<Pick<AiConversation, 'response' | 'suggestions' | 'reasoning'>>): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  private generateGameCode(): string {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  }

  async createGameRoom(gameRoom: InsertGameRoom): Promise<GameRoom> {
    const code = this.generateGameCode();
    const [room] = await db
      .insert(gameRooms)
      .values({
        ...gameRoom,
        code,
        isActive: gameRoom.isActive ?? true
      })
      .returning();
    return room;
  }

  async getGameRoomByCode(code: string): Promise<GameRoom | undefined> {
    const [room] = await db
      .select()
      .from(gameRooms)
      .where(eq(gameRooms.code, code));
    return room || undefined;
  }

  async getGameRoom(id: number): Promise<GameRoom | undefined> {
    const [room] = await db
      .select()
      .from(gameRooms)
      .where(eq(gameRooms.id, id));
    return room || undefined;
  }

  async addPlayer(player: InsertPlayer): Promise<Player> {
    const [newPlayer] = await db
      .insert(players)
      .values({
        ...player,
        isHost: player.isHost ?? false
      })
      .returning();
    return newPlayer;
  }

  async getPlayersByGameRoom(gameRoomId: number): Promise<Player[]> {
    return await db
      .select()
      .from(players)
      .where(eq(players.gameRoomId, gameRoomId));
  }

  async addSong(song: InsertSong): Promise<Song> {
    const [newSong] = await db
      .insert(songs)
      .values({
        ...song,
        story: song.story ?? null
      })
      .returning();
    return newSong;
  }

  async getSongsByGameRoom(gameRoomId: number): Promise<Song[]> {
    return await db
      .select()
      .from(songs)
      .where(eq(songs.gameRoomId, gameRoomId));
  }

  async getCurrentChallenge(): Promise<WeeklyChallenge | undefined> {
    const [challenge] = await db
      .select()
      .from(weeklyChallenge)
      .where(eq(weeklyChallenge.isActive, true))
      .orderBy(desc(weeklyChallenge.startDate))
      .limit(1);
    return challenge || undefined;
  }

  async addChallengeSubmission(submission: InsertChallengeSubmission): Promise<ChallengeSubmission> {
    const [newSubmission] = await db
      .insert(challengeSubmissions)
      .values({
        ...submission,
        story: submission.story ?? null,
        votes: submission.votes ?? 0
      })
      .returning();
    return newSubmission;
  }

  async getChallengeSubmissions(challengeId: number): Promise<ChallengeSubmission[]> {
    return await db
      .select()
      .from(challengeSubmissions)
      .where(eq(challengeSubmissions.challengeId, challengeId))
      .orderBy(desc(challengeSubmissions.votes));
  }

  async voteForSubmission(submissionId: number): Promise<void> {
    const [submission] = await db
      .select()
      .from(challengeSubmissions)
      .where(eq(challengeSubmissions.id, submissionId));
    
    if (submission) {
      await db
        .update(challengeSubmissions)
        .set({ votes: submission.votes + 1 })
        .where(eq(challengeSubmissions.id, submissionId));
    }
  }

  async addToTeamsWaitlist(entry: InsertTeamsWaitlist): Promise<TeamsWaitlist> {
    const [newEntry] = await db
      .insert(teamsWaitlist)
      .values({
        ...entry,
        teamSize: entry.teamSize ?? null,
        role: entry.role ?? null
      })
      .returning();
    return newEntry;
  }

  async addContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission> {
    const [newSubmission] = await db
      .insert(contactSubmissions)
      .values(submission)
      .returning();
    return newSubmission;
  }

  async getContactSubmissions(): Promise<ContactSubmission[]> {
    return await db
      .select()
      .from(contactSubmissions)
      .orderBy(desc(contactSubmissions.submittedAt));
  }

  async addAiConversation(conversation: InsertAiConversation): Promise<AiConversation> {
    const [newConversation] = await db
      .insert(aiConversations)
      .values(conversation)
      .returning();
    return newConversation;
  }

  async getAiConversations(gameRoomId: number, playerId: number): Promise<AiConversation[]> {
    return await db
      .select()
      .from(aiConversations)
      .where(and(eq(aiConversations.gameRoomId, gameRoomId), eq(aiConversations.playerId, playerId)))
      .orderBy(aiConversations.questionNumber);
  }

  async updateAiConversation(id: number, updates: Partial<Pick<AiConversation, 'response' | 'suggestions' | 'reasoning'>>): Promise<void> {
    await db
      .update(aiConversations)
      .set(updates)
      .where(eq(aiConversations.id, id));
  }
}

export const storage = new DatabaseStorage();

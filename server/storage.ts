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
  type CommunityList,
  type InsertCommunityList,
  type ListEntry,
  type InsertListEntry,
  type EntryVote,
  type InsertEntryVote,
  gameRooms,
  players,
  songs,
  challengeSubmissions,
  teamsWaitlist,
  weeklyChallenge,
  contactSubmissions,
  aiConversations,
  communityLists,
  listEntries,
  entryVotes
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, lte, gte, lt, gt, sql } from "drizzle-orm";

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
  
  // Community Lists
  getAllCommunityLists(): Promise<CommunityList[]>;
  getCommunityListBySlug(slug: string): Promise<CommunityList | undefined>;
  submitToList(entry: InsertListEntry): Promise<ListEntry>;
  getListEntries(listId: number): Promise<ListEntry[]>;
  castVote(vote: InsertEntryVote): Promise<void>;
  getUserVote(entryId: number, userId?: number, guestSessionId?: string): Promise<EntryVote | undefined>;
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
    const now = new Date();
    const [challenge] = await db
      .select()
      .from(weeklyChallenge)
      .where(
        and(
          lte(weeklyChallenge.startDate, now),
          gte(weeklyChallenge.endDate, now)
        )
      )
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

  // Community Lists methods
  async getAllCommunityLists(): Promise<CommunityList[]> {
    return await db
      .select({
        id: communityLists.id,
        title: communityLists.title,
        description: communityLists.description,
        slug: communityLists.slug,
        emoji: communityLists.emoji,
        isActive: communityLists.isActive,
        isWeeklyChallenge: communityLists.isWeeklyChallenge,
        endDate: communityLists.endDate,
        displayOrder: communityLists.displayOrder,
        createdAt: communityLists.createdAt,
      })
      .from(communityLists)
      .where(eq(communityLists.isActive, true))
      .orderBy(
        desc(communityLists.isWeeklyChallenge),
        asc(communityLists.displayOrder),
        desc(communityLists.createdAt)
      );
  }

  async getCommunityListBySlug(slug: string): Promise<CommunityList | undefined> {
    const [list] = await db
      .select()
      .from(communityLists)
      .where(and(eq(communityLists.slug, slug), eq(communityLists.isActive, true)));
    return list || undefined;
  }

  async submitToList(entry: InsertListEntry): Promise<ListEntry> {
    const [newEntry] = await db
      .insert(listEntries)
      .values(entry)
      .returning();
    return newEntry;
  }

  async getListEntries(listId: number): Promise<ListEntry[]> {
    return await db
      .select()
      .from(listEntries)
      .where(eq(listEntries.listId, listId))
      .orderBy(desc(listEntries.voteScore), desc(listEntries.createdAt));
  }

  async castVote(vote: InsertEntryVote): Promise<void> {
    await db.transaction(async (tx) => {
      // Insert or update the vote
      await tx
        .insert(entryVotes)
        .values(vote)
        .onConflictDoUpdate({
          target: [entryVotes.entryId, entryVotes.userId, entryVotes.guestSessionId],
          set: {
            voteDirection: vote.voteDirection,
            votedAt: new Date(),
          },
        });

      // Recalculate vote score for the entry
      const voteSum = await tx
        .select({ sum: sql`SUM(${entryVotes.voteDirection})` })
        .from(entryVotes)
        .where(eq(entryVotes.entryId, vote.entryId));

      const newScore = Number(voteSum[0]?.sum) || 0;

      await tx
        .update(listEntries)
        .set({ voteScore: newScore })
        .where(eq(listEntries.id, vote.entryId));
    });
  }

  async getUserVote(entryId: number, userId?: number, guestSessionId?: string): Promise<EntryVote | undefined> {
    const conditions = [eq(entryVotes.entryId, entryId)];
    
    if (userId) {
      conditions.push(eq(entryVotes.userId, userId));
    } else if (guestSessionId) {
      conditions.push(eq(entryVotes.guestSessionId, guestSessionId));
    } else {
      return undefined;
    }

    const [vote] = await db
      .select()
      .from(entryVotes)
      .where(and(...conditions));
    
    return vote || undefined;
  }
}

export const storage = new DatabaseStorage();

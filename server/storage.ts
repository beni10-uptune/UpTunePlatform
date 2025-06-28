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
  type Journey,
  type InsertJourney,
  type CommunityMixtape,
  type InsertCommunityMixtape,
  type MixtapeSubmission,
  type InsertMixtapeSubmission,
  type PollVote,
  type InsertPollVote,
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
  entryVotes,
  journeys,
  communityMixtapes,
  mixtapeSubmissions,
  pollVotes
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, asc, and, lte, gte, lt, gt, sql } from "drizzle-orm";
import { count } from "drizzle-orm";

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
  findExistingEntry(listId: number, spotifyTrackId: string): Promise<ListEntry | undefined>;
  getListEntries(listId: number): Promise<ListEntry[]>;
  castVote(vote: InsertEntryVote): Promise<void>;
  getUserVote(entryId: number, userId?: number, guestSessionId?: string): Promise<EntryVote | undefined>;
  
  // Musical Journeys
  getAllJourneys(): Promise<Journey[]>;
  getPublishedJourneys(): Promise<Journey[]>;
  getJourneyBySlug(slug: string): Promise<Journey | undefined>;
  createJourney(journey: InsertJourney): Promise<Journey>;
  updateJourney(id: number, updates: Partial<InsertJourney>): Promise<Journey>;
  publishJourney(id: number): Promise<void>;
  
  // Community Mixtapes
  getJourneyMixtapes(journeyId: number): Promise<CommunityMixtape[]>;
  createCommunityMixtape(mixtape: InsertCommunityMixtape): Promise<CommunityMixtape>;
  getCommunityMixtapeById(id: number): Promise<CommunityMixtape | undefined>;
  
  // Mixtape Submissions
  submitToMixtape(submission: InsertMixtapeSubmission): Promise<MixtapeSubmission>;
  getMixtapeSubmissions(mixtapeId: number): Promise<MixtapeSubmission[]>;
  findExistingMixtapeEntry(mixtapeId: number, spotifyTrackId: string): Promise<MixtapeSubmission | undefined>;
  voteForMixtapeSubmission(submissionId: number): Promise<void>;
  
  // Poll Votes
  castPollVote(vote: InsertPollVote): Promise<void>;
  getPollResults(pollId: string): Promise<{ option: string; count: number }[]>;
  getUserPollVote(pollId: string, userId?: number, guestSessionId?: string): Promise<PollVote | undefined>;
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
    // Use the automated challenge manager for consistent challenge rotation
    const { challengeManager } = await import("./weekly-challenge-manager.js");
    const challenge = await challengeManager.getCurrentChallenge();
    return challenge ? challenge : undefined;
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
    // Get all lists with vote counts
    const listsWithVotes = await db
      .select({
        id: communityLists.id,
        title: communityLists.title,
        description: communityLists.description,
        slug: communityLists.slug,
        emoji: communityLists.emoji,
        isActive: communityLists.isActive,
        isWeeklyChallenge: communityLists.isWeeklyChallenge,
        createdAt: communityLists.createdAt,
        totalVotes: sql<number>`COALESCE(SUM(${listEntries.voteScore}), 0)`.as('totalVotes')
      })
      .from(communityLists)
      .leftJoin(listEntries, eq(communityLists.id, listEntries.listId))
      .where(eq(communityLists.isActive, true))
      .groupBy(communityLists.id)
      .orderBy(
        desc(communityLists.isWeeklyChallenge),
        desc(sql`COALESCE(SUM(${listEntries.voteScore}), 0)`),
        desc(communityLists.createdAt)
      );

    return listsWithVotes.map(list => ({
      id: list.id,
      title: list.title,
      description: list.description,
      slug: list.slug,
      emoji: list.emoji,
      isActive: list.isActive,
      isWeeklyChallenge: list.isWeeklyChallenge,
      createdAt: list.createdAt
    }));
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

  async findExistingEntry(listId: number, spotifyTrackId: string): Promise<ListEntry | undefined> {
    const [entry] = await db
      .select()
      .from(listEntries)
      .where(and(eq(listEntries.listId, listId), eq(listEntries.spotifyTrackId, spotifyTrackId)));
    return entry || undefined;
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
      // Check if user has already voted for this entry
      const existingVote = await tx
        .select()
        .from(entryVotes)
        .where(and(
          eq(entryVotes.entryId, vote.entryId),
          vote.userId ? eq(entryVotes.userId, vote.userId) : eq(entryVotes.guestSessionId, vote.guestSessionId!)
        ));

      if (existingVote.length > 0) {
        // User has already voted, don't allow duplicate votes
        throw new Error('You have already voted for this song');
      }

      // Insert the vote
      await tx
        .insert(entryVotes)
        .values(vote);

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

  // Musical Journeys implementation
  async getAllJourneys(): Promise<Journey[]> {
    return await db.select().from(journeys).orderBy(desc(journeys.createdAt));
  }

  async getPublishedJourneys(): Promise<Journey[]> {
    return await db.select()
      .from(journeys)
      .where(eq(journeys.isPublished, true))
      .orderBy(desc(journeys.createdAt));
  }

  async getJourneyBySlug(slug: string): Promise<Journey | undefined> {
    const [journey] = await db.select()
      .from(journeys)
      .where(eq(journeys.slug, slug))
      .limit(1);
    return journey;
  }

  async createJourney(journey: InsertJourney): Promise<Journey> {
    const [newJourney] = await db.insert(journeys)
      .values(journey)
      .returning();
    return newJourney;
  }

  async updateJourney(id: number, updates: Partial<InsertJourney>): Promise<Journey> {
    const [updatedJourney] = await db.update(journeys)
      .set(updates)
      .where(eq(journeys.id, id))
      .returning();
    return updatedJourney;
  }

  async publishJourney(id: number): Promise<void> {
    await db.update(journeys)
      .set({ isPublished: true })
      .where(eq(journeys.id, id));
  }

  // Community Mixtapes implementation
  async getJourneyMixtapes(journeyId: number): Promise<CommunityMixtape[]> {
    return await db.select()
      .from(communityMixtapes)
      .where(eq(communityMixtapes.journeyId, journeyId))
      .orderBy(desc(communityMixtapes.createdAt));
  }

  async createCommunityMixtape(mixtape: InsertCommunityMixtape): Promise<CommunityMixtape> {
    const [newMixtape] = await db.insert(communityMixtapes)
      .values(mixtape)
      .returning();
    return newMixtape;
  }

  async getCommunityMixtapeById(id: number): Promise<CommunityMixtape | undefined> {
    const [mixtape] = await db.select()
      .from(communityMixtapes)
      .where(eq(communityMixtapes.id, id))
      .limit(1);
    return mixtape;
  }

  // Mixtape Submissions implementation
  async submitToMixtape(submission: InsertMixtapeSubmission): Promise<MixtapeSubmission> {
    const [newSubmission] = await db.insert(mixtapeSubmissions)
      .values(submission)
      .returning();
    return newSubmission;
  }

  async getMixtapeSubmissions(mixtapeId: number): Promise<MixtapeSubmission[]> {
    return await db.select()
      .from(mixtapeSubmissions)
      .where(eq(mixtapeSubmissions.mixtapeId, mixtapeId))
      .orderBy(desc(mixtapeSubmissions.voteScore), desc(mixtapeSubmissions.createdAt));
  }

  async findExistingMixtapeEntry(mixtapeId: number, spotifyTrackId: string): Promise<MixtapeSubmission | undefined> {
    const [entry] = await db.select()
      .from(mixtapeSubmissions)
      .where(and(
        eq(mixtapeSubmissions.mixtapeId, mixtapeId),
        eq(mixtapeSubmissions.spotifyTrackId, spotifyTrackId)
      ))
      .limit(1);
    return entry;
  }

  async voteForMixtapeSubmission(submissionId: number): Promise<void> {
    await db.update(mixtapeSubmissions)
      .set({ 
        voteScore: sql`${mixtapeSubmissions.voteScore} + 1`
      })
      .where(eq(mixtapeSubmissions.id, submissionId));
  }

  // Poll Votes implementation
  async castPollVote(vote: InsertPollVote): Promise<void> {
    await db.insert(pollVotes)
      .values(vote)
      .onConflictDoUpdate({
        target: [pollVotes.pollId, pollVotes.userId, pollVotes.guestSessionId],
        set: { chosenOption: vote.chosenOption }
      });
  }

  async getPollResults(pollId: string): Promise<{ option: string; count: number }[]> {
    const results = await db.select({
      option: pollVotes.chosenOption,
      count: count(pollVotes.chosenOption)
    })
    .from(pollVotes)
    .where(eq(pollVotes.pollId, pollId))
    .groupBy(pollVotes.chosenOption);

    return results.map(r => ({ option: r.option, count: Number(r.count) }));
  }

  async getUserPollVote(pollId: string, userId?: number, guestSessionId?: string): Promise<PollVote | undefined> {
    const conditions = [eq(pollVotes.pollId, pollId)];
    
    if (userId) {
      conditions.push(eq(pollVotes.userId, userId));
    } else if (guestSessionId) {
      conditions.push(eq(pollVotes.guestSessionId, guestSessionId));
    } else {
      return undefined;
    }

    const [vote] = await db.select()
      .from(pollVotes)
      .where(and(...conditions))
      .limit(1);
    
    return vote;
  }
}

export const storage = new DatabaseStorage();

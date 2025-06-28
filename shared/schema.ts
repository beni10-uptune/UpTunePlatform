import { pgTable, text, serial, integer, boolean, timestamp, varchar, unique } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const gameRooms = pgTable("game_rooms", {
  id: serial("id").primaryKey(),
  code: text("code").notNull().unique(),
  gameType: text("game_type").notNull(),
  theme: text("theme").notNull(),
  hostNickname: text("host_nickname").notNull(),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const players = pgTable("players", {
  id: serial("id").primaryKey(),
  nickname: text("nickname").notNull(),
  gameRoomId: integer("game_room_id").notNull(),
  isHost: boolean("is_host").notNull().default(false),
  joinedAt: timestamp("joined_at").defaultNow().notNull(),
});

export const songs = pgTable("songs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  artist: text("artist").notNull(),
  spotifyId: text("spotify_id"),
  album: text("album"),
  imageUrl: text("image_url"),
  previewUrl: text("preview_url"),
  gameRoomId: integer("game_room_id").notNull(),
  playerId: integer("player_id").notNull(),
  story: text("story"),
  addedAt: timestamp("added_at").defaultNow().notNull(),
});

export const weeklyChallenge = pgTable("weekly_challenges", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  emoji: text("emoji").notNull(),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  isActive: boolean("is_active").notNull().default(true),
});

export const challengeSubmissions = pgTable("challenge_submissions", {
  id: serial("id").primaryKey(),
  challengeId: integer("challenge_id").notNull(),
  nickname: text("nickname").notNull(),
  songTitle: text("song_title").notNull(),
  songArtist: text("song_artist").notNull(),
  spotifyId: text("spotify_id"),
  album: text("album"),
  imageUrl: text("image_url"),
  previewUrl: text("preview_url"),
  story: text("story"),
  votes: integer("votes").notNull().default(0),
  submittedAt: timestamp("submitted_at").defaultNow().notNull(),
});

export const teamsWaitlist = pgTable("teams_waitlist", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  company: text("company").notNull(),
  teamSize: text("team_size"),
  role: text("role"),
  submittedAt: timestamp("submitted_at").defaultNow().notNull(),
});

export const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  companyName: text("company_name").notNull(),
  contactName: text("contact_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  teamSize: text("team_size").notNull(),
  message: text("message").notNull(),
  submittedAt: timestamp("submitted_at").defaultNow().notNull(),
});

export const aiConversations = pgTable("ai_conversations", {
  id: serial("id").primaryKey(),
  gameRoomId: integer("game_room_id").notNull(),
  playerId: integer("player_id").notNull(),
  question: text("question").notNull(),
  response: text("response"),
  suggestions: text("suggestions").array(),
  reasoning: text("reasoning"),
  questionNumber: integer("question_number").notNull().default(1),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertGameRoomSchema = createInsertSchema(gameRooms).omit({
  id: true,
  code: true,
  createdAt: true,
}).partial({
  isActive: true,
});

export const insertPlayerSchema = createInsertSchema(players).omit({
  id: true,
  joinedAt: true,
});

export const insertSongSchema = createInsertSchema(songs).omit({
  id: true,
  addedAt: true,
});

export const insertChallengeSubmissionSchema = createInsertSchema(challengeSubmissions).omit({
  id: true,
  submittedAt: true,
});

export const insertTeamsWaitlistSchema = createInsertSchema(teamsWaitlist).omit({
  id: true,
  submittedAt: true,
});

export const insertContactSubmissionSchema = createInsertSchema(contactSubmissions).omit({
  id: true,
  submittedAt: true,
});

export type GameRoom = typeof gameRooms.$inferSelect;
export type InsertGameRoom = z.infer<typeof insertGameRoomSchema>;

export type Player = typeof players.$inferSelect;
export type InsertPlayer = z.infer<typeof insertPlayerSchema>;

export type Song = typeof songs.$inferSelect;
export type InsertSong = z.infer<typeof insertSongSchema>;

export type WeeklyChallenge = typeof weeklyChallenge.$inferSelect;

export type ChallengeSubmission = typeof challengeSubmissions.$inferSelect;
export type InsertChallengeSubmission = z.infer<typeof insertChallengeSubmissionSchema>;

export type TeamsWaitlist = typeof teamsWaitlist.$inferSelect;
export type InsertTeamsWaitlist = z.infer<typeof insertTeamsWaitlistSchema>;

export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type InsertContactSubmission = z.infer<typeof insertContactSubmissionSchema>;

export const insertAiConversationSchema = createInsertSchema(aiConversations).omit({
  id: true,
  createdAt: true,
});

export type AiConversation = typeof aiConversations.$inferSelect;
export type InsertAiConversation = z.infer<typeof insertAiConversationSchema>;

// Community Lists tables
export const communityLists = pgTable("community_lists", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull().unique(),
  description: text("description"),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  emoji: varchar("emoji", { length: 10 }).notNull().default("🎵"),
  isActive: boolean("is_active").default(true),
  isWeeklyChallenge: boolean("is_weekly_challenge").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const listEntries = pgTable("list_entries", {
  id: serial("id").primaryKey(),
  listId: integer("list_id").notNull().references(() => communityLists.id),
  userId: integer("user_id"),
  guestSessionId: text("guest_session_id"),
  spotifyTrackId: varchar("spotify_track_id", { length: 255 }).notNull(),
  songTitle: varchar("song_title", { length: 255 }).notNull(),
  artistName: varchar("artist_name", { length: 255 }).notNull(),
  albumName: varchar("album_name", { length: 255 }),
  imageUrl: text("image_url"),
  contextReason: text("context_reason"),
  voteScore: integer("vote_score").notNull().default(1),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => ({
  uniqueTrackPerList: unique().on(table.listId, table.spotifyTrackId),
}));

export const entryVotes = pgTable("entry_votes", {
  id: serial("id").primaryKey(),
  entryId: integer("entry_id").notNull().references(() => listEntries.id, { onDelete: "cascade" }),
  userId: integer("user_id"),
  guestSessionId: text("guest_session_id"),
  voteDirection: integer("vote_direction").notNull(),
  votedAt: timestamp("voted_at").defaultNow().notNull(),
}, (table) => ({
  uniqueVotePerEntry: unique().on(table.entryId, table.userId, table.guestSessionId),
}));

// Community Lists insert schemas
export const insertCommunityListSchema = createInsertSchema(communityLists, {
  title: z.string().min(1),
  slug: z.string().min(1),
  emoji: z.string().min(1),
}).omit({
  id: true,
  createdAt: true,
});

export const insertListEntrySchema = createInsertSchema(listEntries, {
  spotifyTrackId: z.string().min(1),
  songTitle: z.string().min(1),
  artistName: z.string().min(1),
}).omit({
  id: true,
  voteScore: true,
  createdAt: true,
});

export const insertEntryVoteSchema = createInsertSchema(entryVotes, {
  voteDirection: z.number().min(-1).max(1),
}).omit({
  id: true,
  votedAt: true,
});

// Community Lists types
export type CommunityList = typeof communityLists.$inferSelect;
export type InsertCommunityList = z.infer<typeof insertCommunityListSchema>;

export type ListEntry = typeof listEntries.$inferSelect;
export type InsertListEntry = z.infer<typeof insertListEntrySchema>;

export type EntryVote = typeof entryVotes.$inferSelect;
export type InsertEntryVote = z.infer<typeof insertEntryVoteSchema>;

// Musical Journeys tables
export const journeys = pgTable("journeys", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  headlineImageUrl: text("headline_image_url"),
  introduction: text("introduction"),
  content: text("content").notNull(), // JSON string for flexibility
  isPublished: boolean("is_published").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const communityMixtapes = pgTable("community_mixtapes", {
  id: serial("id").primaryKey(),
  journeyId: integer("journey_id").references(() => journeys.id),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const mixtapeSubmissions = pgTable("mixtape_submissions", {
  id: serial("id").primaryKey(),
  mixtapeId: integer("mixtape_id").notNull().references(() => communityMixtapes.id),
  userId: integer("user_id"),
  guestSessionId: text("guest_session_id"),
  spotifyTrackId: varchar("spotify_track_id", { length: 255 }).notNull(),
  songTitle: varchar("song_title", { length: 255 }).notNull(),
  artistName: varchar("artist_name", { length: 255 }).notNull(),
  albumName: varchar("album_name", { length: 255 }),
  imageUrl: text("image_url"),
  contextReason: text("context_reason"),
  voteScore: integer("vote_score").notNull().default(1),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => ({
  uniqueTrackPerMixtape: unique().on(table.mixtapeId, table.spotifyTrackId),
}));

export const pollVotes = pgTable("poll_votes", {
  id: serial("id").primaryKey(),
  pollId: varchar("poll_id", { length: 255 }).notNull(),
  userId: integer("user_id"),
  guestSessionId: text("guest_session_id"),
  chosenOption: varchar("chosen_option", { length: 255 }).notNull(),
  votedAt: timestamp("voted_at").defaultNow().notNull(),
}, (table) => ({
  uniqueVotePerPoll: unique().on(table.pollId, table.userId, table.guestSessionId),
}));

// Musical Journeys insert schemas
export const insertJourneySchema = createInsertSchema(journeys, {
  title: z.string().min(1),
  slug: z.string().min(1),
  content: z.string().min(1),
}).omit({
  id: true,
  createdAt: true,
});

export const insertCommunityMixtapeSchema = createInsertSchema(communityMixtapes, {
  title: z.string().min(1),
}).omit({
  id: true,
  createdAt: true,
});

export const insertMixtapeSubmissionSchema = createInsertSchema(mixtapeSubmissions, {
  songTitle: z.string().min(1),
  artistName: z.string().min(1),
  spotifyTrackId: z.string().min(1),
}).omit({
  id: true,
  createdAt: true,
});

export const insertPollVoteSchema = createInsertSchema(pollVotes, {
  pollId: z.string().min(1),
  chosenOption: z.string().min(1),
}).omit({
  id: true,
  votedAt: true,
});

// Musical Journeys types
export type Journey = typeof journeys.$inferSelect;
export type InsertJourney = z.infer<typeof insertJourneySchema>;

export type CommunityMixtape = typeof communityMixtapes.$inferSelect;
export type InsertCommunityMixtape = z.infer<typeof insertCommunityMixtapeSchema>;

export type MixtapeSubmission = typeof mixtapeSubmissions.$inferSelect;
export type InsertMixtapeSubmission = z.infer<typeof insertMixtapeSubmissionSchema>;

export type PollVote = typeof pollVotes.$inferSelect;
export type InsertPollVote = z.infer<typeof insertPollVoteSchema>;

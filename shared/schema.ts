import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
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

export const insertGameRoomSchema = createInsertSchema(gameRooms).omit({
  id: true,
  createdAt: true,
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

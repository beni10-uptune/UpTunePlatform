-- Uptune Database Migration for Supabase
-- Generated: 2025-10-17
-- This migration creates all tables and seeds initial data

-- Enable UUID extension for Supabase auth
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- AUTH & USER TABLES
-- =====================================================

-- Auth users table (integrates with Supabase Auth)
CREATE TABLE IF NOT EXISTS auth_users (
  id VARCHAR PRIMARY KEY NOT NULL,
  email VARCHAR UNIQUE,
  first_name VARCHAR,
  last_name VARCHAR,
  profile_image_url VARCHAR,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Sessions table (for Express session compatibility)
CREATE TABLE IF NOT EXISTS sessions (
  sid VARCHAR PRIMARY KEY,
  sess JSONB NOT NULL,
  expire TIMESTAMP NOT NULL
);

CREATE INDEX IF NOT EXISTS IDX_session_expire ON sessions(expire);

-- =====================================================
-- GAME TABLES
-- =====================================================

CREATE TABLE IF NOT EXISTS game_rooms (
  id SERIAL PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  game_type TEXT NOT NULL,
  theme TEXT NOT NULL,
  host_nickname TEXT NOT NULL,
  user_id VARCHAR REFERENCES auth_users(id),
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS players (
  id SERIAL PRIMARY KEY,
  nickname TEXT NOT NULL,
  game_room_id INTEGER NOT NULL,
  is_host BOOLEAN NOT NULL DEFAULT false,
  joined_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS songs (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  artist TEXT NOT NULL,
  spotify_id TEXT,
  album TEXT,
  image_url TEXT,
  preview_url TEXT,
  game_room_id INTEGER NOT NULL,
  player_id INTEGER NOT NULL,
  story TEXT,
  added_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS ai_conversations (
  id SERIAL PRIMARY KEY,
  game_room_id INTEGER NOT NULL,
  player_id INTEGER NOT NULL,
  question TEXT NOT NULL,
  response TEXT,
  suggestions TEXT[],
  reasoning TEXT,
  question_number INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL
);

-- =====================================================
-- COMMUNITY LISTS TABLES
-- =====================================================

CREATE TABLE IF NOT EXISTS community_lists (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  slug VARCHAR(255) NOT NULL UNIQUE,
  emoji VARCHAR(10) NOT NULL DEFAULT '🎵',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS list_entries (
  id SERIAL PRIMARY KEY,
  list_id INTEGER NOT NULL REFERENCES community_lists(id),
  user_id INTEGER,
  guest_session_id TEXT,
  submitter_name VARCHAR(100),
  spotify_track_id VARCHAR(255) NOT NULL,
  song_title VARCHAR(255) NOT NULL,
  artist_name VARCHAR(255) NOT NULL,
  album_name VARCHAR(255),
  image_url TEXT,
  context_reason TEXT,
  vote_score INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  UNIQUE(list_id, spotify_track_id)
);

CREATE TABLE IF NOT EXISTS entry_votes (
  id SERIAL PRIMARY KEY,
  entry_id INTEGER NOT NULL REFERENCES list_entries(id) ON DELETE CASCADE,
  user_id INTEGER,
  guest_session_id TEXT,
  vote_direction INTEGER NOT NULL,
  voted_at TIMESTAMP DEFAULT NOW() NOT NULL,
  UNIQUE(entry_id, user_id, guest_session_id)
);

-- =====================================================
-- MUSICAL JOURNEYS TABLES
-- =====================================================

CREATE TABLE IF NOT EXISTS journeys (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  headline_image_url TEXT,
  introduction TEXT,
  content TEXT NOT NULL,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS community_mixtapes (
  id SERIAL PRIMARY KEY,
  journey_id INTEGER REFERENCES journeys(id),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS mixtape_submissions (
  id SERIAL PRIMARY KEY,
  mixtape_id INTEGER NOT NULL REFERENCES community_mixtapes(id),
  user_id INTEGER,
  guest_session_id TEXT,
  spotify_track_id VARCHAR(255) NOT NULL,
  song_title VARCHAR(255) NOT NULL,
  artist_name VARCHAR(255) NOT NULL,
  album_name VARCHAR(255),
  image_url TEXT,
  context_reason TEXT,
  vote_score INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  UNIQUE(mixtape_id, spotify_track_id)
);

CREATE TABLE IF NOT EXISTS poll_votes (
  id SERIAL PRIMARY KEY,
  poll_id VARCHAR(255) NOT NULL,
  user_id INTEGER,
  guest_session_id TEXT,
  chosen_option VARCHAR(255) NOT NULL,
  voted_at TIMESTAMP DEFAULT NOW() NOT NULL,
  UNIQUE(poll_id, user_id, guest_session_id)
);

-- =====================================================
-- BUSINESS TABLES
-- =====================================================

CREATE TABLE IF NOT EXISTS teams_waitlist (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT NOT NULL,
  team_size TEXT,
  role TEXT,
  submitted_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS contact_submissions (
  id SERIAL PRIMARY KEY,
  company_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  team_size TEXT NOT NULL,
  message TEXT NOT NULL,
  submitted_at TIMESTAMP DEFAULT NOW() NOT NULL
);

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_game_rooms_code ON game_rooms(code);
CREATE INDEX IF NOT EXISTS idx_game_rooms_user_id ON game_rooms(user_id);
CREATE INDEX IF NOT EXISTS idx_players_game_room_id ON players(game_room_id);
CREATE INDEX IF NOT EXISTS idx_songs_game_room_id ON songs(game_room_id);
CREATE INDEX IF NOT EXISTS idx_list_entries_list_id ON list_entries(list_id);
CREATE INDEX IF NOT EXISTS idx_list_entries_vote_score ON list_entries(vote_score DESC);
CREATE INDEX IF NOT EXISTS idx_entry_votes_entry_id ON entry_votes(entry_id);
CREATE INDEX IF NOT EXISTS idx_journeys_slug ON journeys(slug);
CREATE INDEX IF NOT EXISTS idx_journeys_published ON journeys(is_published);
CREATE INDEX IF NOT EXISTS idx_mixtape_submissions_mixtape_id ON mixtape_submissions(mixtape_id);

-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES FOR SUPABASE
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE auth_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE players ENABLE ROW LEVEL SECURITY;
ALTER TABLE songs ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_lists ENABLE ROW LEVEL SECURITY;
ALTER TABLE list_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE entry_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE journeys ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_mixtapes ENABLE ROW LEVEL SECURITY;
ALTER TABLE mixtape_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE poll_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE teams_waitlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Public read access for community features
CREATE POLICY "Community lists are viewable by everyone" ON community_lists FOR SELECT USING (true);
CREATE POLICY "List entries are viewable by everyone" ON list_entries FOR SELECT USING (true);
CREATE POLICY "Journeys are viewable by everyone" ON journeys FOR SELECT USING (true);
CREATE POLICY "Mixtapes are viewable by everyone" ON community_mixtapes FOR SELECT USING (true);
CREATE POLICY "Mixtape submissions are viewable by everyone" ON mixtape_submissions FOR SELECT USING (true);

-- Guest users can create/insert (Uptune's guest-first model)
CREATE POLICY "Anyone can create game rooms" ON game_rooms FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can join as player" ON players FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can add songs" ON songs FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can submit to lists" ON list_entries FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can vote on entries" ON entry_votes FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can vote on polls" ON poll_votes FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can submit to mixtapes" ON mixtape_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can join teams waitlist" ON teams_waitlist FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can submit contact form" ON contact_submissions FOR INSERT WITH CHECK (true);

-- Read access for game data
CREATE POLICY "Game rooms are viewable by everyone" ON game_rooms FOR SELECT USING (true);
CREATE POLICY "Players are viewable by everyone" ON players FOR SELECT USING (true);
CREATE POLICY "Songs are viewable by everyone" ON songs FOR SELECT USING (true);

-- Update policies (for voting, etc.)
CREATE POLICY "Anyone can update entry votes" ON entry_votes FOR UPDATE USING (true);
CREATE POLICY "Anyone can update list entry votes" ON list_entries FOR UPDATE USING (true);
CREATE POLICY "Anyone can update mixtape submission votes" ON mixtape_submissions FOR UPDATE USING (true);

-- Users can view their own data
CREATE POLICY "Users can view their own profile" ON auth_users FOR SELECT USING (auth.uid()::text = id);
CREATE POLICY "Users can update their own profile" ON auth_users FOR UPDATE USING (auth.uid()::text = id);
CREATE POLICY "Users can view their own game rooms" ON game_rooms FOR SELECT USING (auth.uid()::text = user_id);

-- =====================================================
-- SEED DATA - COMMUNITY LISTS
-- =====================================================

INSERT INTO community_lists (id, title, description, slug, emoji, is_active, created_at) VALUES
(1, 'The Greatest Songs of All Time', 'The ultimate collection of the most legendary tracks ever recorded', 'greatest-songs-all-time', '🌟', true, '2025-06-12T13:56:00.300Z'),
(2, 'The Best Movie Soundtrack Moments', 'Iconic songs that defined unforgettable movie scenes', 'best-movie-soundtrack-moments', '🎬', true, '2025-06-12T13:56:00.300Z'),
(3, 'The Most Epic Guitar Riffs', 'The guitar riffs that changed music forever', 'most-epic-guitar-riffs', '🎸', true, '2025-06-12T13:56:00.300Z'),
(4, 'The Best Live Performances', 'Concert moments that became legend', 'best-live-performances', '🎤', true, '2025-06-12T13:56:00.300Z'),
(5, 'The Ultimate Love Songs', 'Songs that capture the essence of love and romance', 'ultimate-love-songs', '❤️', true, '2025-06-12T13:56:00.300Z'),
(6, 'Road Trip Essentials', 'The ultimate songs for your next adventure on the open road. Share the tracks that make every mile memorable.', 'road-trip-essentials', '🚗', true, '2025-06-12T14:03:56.027Z'),
(7, 'Workout Motivation', 'High-energy songs that push you through your toughest workouts. What gets your heart pumping?', 'workout-motivation', '💪', true, '2025-06-12T14:03:56.027Z'),
(8, 'Rainy Day Vibes', 'Perfect songs for cozy, contemplative moments when the weather keeps you inside.', 'rainy-day-vibes', '🌧️', true, '2025-06-12T14:03:56.027Z'),
(9, 'Songs That Make You Cry', 'Emotional tracks that hit you right in the feels. Warning: tissues may be required.', 'songs-that-make-you-cry', '😭', true, '2025-06-12T14:03:56.027Z'),
(10, 'Confidence Boosters', 'Songs that make you feel unstoppable and ready to take on the world.', 'confidence-boosters', '✨', true, '2025-06-12T14:03:56.027Z'),
(11, 'Nostalgia Hits', 'Songs that instantly transport you back to simpler times and cherished memories.', 'nostalgia-hits', '📼', true, '2025-06-12T14:03:56.027Z'),
(12, 'Favourite Song of the 60s', 'Share the iconic tracks that defined the swinging sixties - from The Beatles to The Rolling Stones', 'favourite-song-60s', '🎭', true, '2025-06-12T15:14:15.336Z'),
(13, 'Favourite Song of the 70s', 'The decade of disco, rock, and soul - what''s your ultimate 70s anthem?', 'favourite-song-70s', '🕺', true, '2025-06-12T15:14:15.336Z'),
(14, 'Favourite Song of the 80s', 'Neon lights, synthesizers, and unforgettable hooks - pick your definitive 80s classic', 'favourite-song-80s', '🎹', true, '2025-06-12T15:14:15.336Z'),
(15, 'Favourite Song of the 90s', 'Grunge, Britpop, and hip-hop evolution - what song captures the 90s spirit for you?', 'favourite-song-90s', '📻', true, '2025-06-12T15:14:15.336Z'),
(16, 'Favourite Song of the 2000s', 'The millennium''s biggest hits - from pop-punk to R&B, what defined your 2000s?', 'favourite-song-2000s', '💿', true, '2025-06-12T15:14:15.336Z'),
(17, 'Favourite Song of the 2010s', 'The streaming decade - EDM drops, indie hits, and viral sensations', 'favourite-song-2010s', '📱', true, '2025-06-12T15:14:15.336Z'),
(18, 'Favourite Song of the 2020s', 'TikTok anthems, pandemic playlists, and the sounds of now', 'favourite-song-2020s', '🎧', true, '2025-06-12T15:14:15.336Z'),
(19, 'Madchester Anthem', 'The baggy beats and swagger of Manchester''s legendary music scene - Stone Roses, Happy Mondays and beyond', 'madchester-anthem', '🏭', true, '2025-06-12T15:14:15.336Z'),
(20, 'Disco Classics', 'Saturday Night Fever lives on - share the disco tracks that still get everyone on the dancefloor', 'disco-classics', '🕺', true, '2025-06-12T15:14:15.336Z'),
(23, 'Favourite Album of All Time', 'The one album you would take to a desert island - share your most treasured complete musical experience', 'favourite-album-all-time', '💿', true, '2025-06-14T06:39:47.384Z'),
(24, 'Favourite Lyrics', 'The words that speak to your soul - share songs with lyrics that move, inspire, or perfectly capture how you feel', 'favourite-lyrics', '✍️', true, '2025-06-14T06:39:47.384Z'),
(25, 'Acid House Classics', 'The underground UK rave scene that changed everything - from warehouse parties to the Second Summer of Love', 'acid-house-classics', '🏠', true, '2025-06-30T14:58:47.869Z'),
(26, 'Berlin Electronic Revolution', 'The electronic sounds that emerged from post-wall Berlin - techno, minimal, and underground club culture', 'berlin-electronic-revolution', '🔊', true, '2025-06-30T14:58:47.869Z'),
(27, 'Detroit Techno Pioneers', 'The Belleville Three and the birth of techno - Juan Atkins, Derrick May, Kevin Saunderson and beyond', 'detroit-techno-pioneers', '🏭', true, '2025-06-30T14:58:47.869Z')
ON CONFLICT (id) DO NOTHING;

-- Reset sequence for community_lists
SELECT setval('community_lists_id_seq', (SELECT MAX(id) FROM community_lists));

-- =====================================================
-- COMPLETION MESSAGE
-- =====================================================

-- Migration complete!
-- Next steps:
-- 1. Run this file in your Supabase SQL editor
-- 2. Configure Supabase Auth in your project settings
-- 3. Update environment variables to point to Supabase
-- 4. Test the migration with sample data inserts

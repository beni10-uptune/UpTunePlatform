-- Uptune Seed Data - Musical Journeys & Community Lists
-- Run this AFTER the main migration to populate your database

-- =====================================================
-- MUSICAL JOURNEYS (5 Editorial Pieces)
-- =====================================================

INSERT INTO journeys (id, title, slug, headline_image_url, introduction, content, is_published, created_at) VALUES

-- Journey 1: Disco
(3,
'Disco - The Underground Revolution That Conquered and Fell',
'disco-underground-revolution',
'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&h=600',
'In the early 1970s, as America reeled from Vietnam, Watergate, and economic recession, something extraordinary was happening in the underground clubs of New York City. In converted warehouses and abandoned lofts, in spaces where society''s outcasts gathered to escape the harsh realities of urban decay, a new form of musical expression was being born. This wasn''t just another genre—it was a revolution disguised as a party.',
'{"sections": [
  {"type": "intro", "title": "The Underground Revolution Begins", "content": "In the early 1970s, as America reeled from Vietnam, Watergate, and economic recession, something extraordinary was happening in the underground clubs of New York City. In converted warehouses and abandoned lofts, in spaces where society''s outcasts gathered to escape the harsh realities of urban decay, a new form of musical expression was being born. This wasn''t just another genre—it was a revolution disguised as a party."},
  {"type": "spotify_preview", "track_id": "7w87IxuO7BDcJ3YUqCyMTT", "artist": "MFSB", "title": "Love Is the Message", "context": "This instrumental masterpiece by Philadelphia''s house band MFSB (Mother Father Sister Brother) became the blueprint for disco production. With its soaring strings, driving bass, and euphoric build-ups, it established the template that would influence everything from ''Dancing Queen'' to modern house music. The track''s message was simple but revolutionary: love is universal, and music is its language."},
  {"type": "content", "title": "David Mancuso''s Sacred Space", "content": "The story begins with David Mancuso, a soft-spoken visionary who transformed his Manhattan loft into a sacred space called The Loft. Mancuso wasn''t interested in profit or fame; he was interested in transcendence. His parties, which began in 1970, were invitation-only gatherings where the music was carefully curated, the sound system was pristine, and the atmosphere was one of pure, unadulterated joy."},
  {"type": "spotify_preview", "track_id": "4ePVtEHCRfSYg5YKzl6pIz", "artist": "Manu Dibango", "title": "Soul Makossa", "context": "This Cameroonian jazz-funk track became an unlikely anthem at The Loft, proving Mancuso''s genius for finding transcendent music from anywhere in the world. The song''s hypnotic groove and African polyrhythms introduced New York dancers to global sounds, while its chant ''mama-say mama-sa mama-makossa'' would later be sampled by Michael Jackson."},
  {"type": "community_mixtape", "title": "Essential Disco Classics", "description": "Contribute to our collection of disco classics that defined an era. From David Mancuso''s Loft to Studio 54''s glamour, what tracks capture disco''s revolutionary spirit?", "prompt": "What disco song perfectly captures the liberation and joy of the dance floor revolution?"},
  {"type": "poll", "id": "disco-legacy", "question": "What was disco''s most revolutionary aspect?", "options": ["Breaking down social barriers", "Creating DJ culture", "Empowering marginalized communities", "Pioneering remix culture", "Transforming nightlife forever"]},
  {"type": "spotify_preview", "track_id": "1WkMMavIMc4JZ8cfMmxHkI", "artist": "Gloria Gaynor", "title": "I Will Survive", "context": "Originally the B-side of a ballad, ''I Will Survive'' became disco''s greatest anthem of empowerment. Gloria Gaynor''s powerhouse vocals transformed a song about romantic rejection into a universal declaration of resilience."}
]}',
true,
'2025-06-30T14:26:14.332Z'),

-- Journey 2: Acid House
(4,
'Acid House - The Second Summer of Love',
'acid-house-second-summer-love',
'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=1200&h=600',
'A squelching synthesizer sound from Chicago''s underground sparked Britain''s biggest youth revolution since the 1960s, transforming nightlife forever through the power of the TB-303 and MDMA.',
'{"sections": [
  {"type": "intro", "title": "Chicago 1985 - The TB-303 Mistake", "content": "In a small studio on Chicago''s South Side in 1985, three young musicians were about to accidentally create a sound that would change the world. DJ Pierre, Herb J, and Spanky - collectively known as Phuture - had gotten their hands on a Roland TB-303 Bass Line, a small silver box that Roland had designed to help guitarists practice."},
  {"type": "spotify_preview", "track_id": "4uLU6hMCjMI75M1A2tKUQC", "artist": "Phuture", "title": "Acid Tracks", "context": "The first acid house record, created in 1985 but not released until 1987, defining the entire genre."},
  {"type": "community_mixtape", "title": "Acid House Classics", "description": "Contribute to our collection of acid house tracks that defined the Second Summer of Love.", "prompt": "What acid house track perfectly captures the euphoric spirit of the Second Summer of Love?"},
  {"type": "poll", "id": "acid-house-impact", "question": "What was acid house''s biggest cultural impact?", "options": ["Breaking down social barriers", "Creating rave culture", "Introducing electronic music to Britain", "The MDMA consciousness revolution", "Inspiring the Criminal Justice Act"]}
]}',
true,
'2025-06-30T14:27:13.255Z'),

-- Journey 3: Berlin Electronic
(5,
'Berlin Electronic - Soundtrack of Freedom',
'berlin-electronic-soundtrack-freedom',
'https://images.unsplash.com/photo-1574618071533-b6dfd83e0d10?auto=format&fit=crop&w=1200&h=600',
'From the ruins of the Berlin Wall rose an electronic revolution that transformed a divided city into the global capital of techno culture, where liberation found its voice in hypnotic four-four beats.',
'{"sections": [
  {"type": "intro", "title": "November 9, 1989 - Liberation Day", "content": "The night the Berlin Wall fell, something extraordinary happened beyond the political reunification of a divided city."},
  {"type": "spotify_preview", "track_id": "5fTJBPsZJlWThBgqrO9J4i", "artist": "Cybotron", "title": "Clear", "context": "This Detroit techno classic became an anthem in early Berlin clubs."},
  {"type": "community_mixtape", "title": "Berlin Techno Essentials", "description": "Contribute to our collection of tracks that defined Berlin''s electronic revolution.", "prompt": "What electronic track perfectly captures Berlin''s transformation from divided city to techno capital?"},
  {"type": "poll", "id": "berlin-era", "question": "Which era of Berlin electronic music resonates most with you?", "options": ["Early 90s Underground", "Love Parade Peak Years", "Minimal Techno Evolution", "Modern Berghain Era", "Post-Pandemic Revival"]}
]}',
true,
'2025-06-30T14:28:24.957Z'),

-- Journey 4: Detroit Techno
(6,
'Detroit Techno - The Sound of Post-Industrial Resurrection',
'detroit-techno-post-industrial-resurrection',
'https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&w=1200&h=600',
'In the ruins of America''s Motor City, three young men created a new sound that would transform electronic music forever, proving that from the ashes of industrial decline could rise the music of the future.',
'{"sections": [
  {"type": "intro", "title": "The Belleville Three - Prophets of the Future", "content": "In the suburbs of Detroit, in the early 1980s, three young Black men were creating the sound of the future in their bedrooms and basements."},
  {"type": "spotify_preview", "track_id": "1pP3g7L2C5oB9yLOTqYHbJ", "artist": "Derrick May", "title": "Strings of Life", "context": "Derrick May''s masterpiece became the emotional center of Detroit techno."},
  {"type": "community_mixtape", "title": "Detroit Techno Pioneers", "description": "Contribute to our collection of Detroit techno classics that defined a genre.", "prompt": "What Detroit techno track perfectly captures the city''s transformation from industrial decay to electronic innovation?"},
  {"type": "poll", "id": "detroit-evolution", "question": "What aspect of Detroit techno resonates most with you?", "options": ["Afrofuturistic vision", "Post-industrial aesthetics", "Revolutionary politics", "Technical innovation", "Emotional depth"]}
]}',
true,
'2025-06-30T14:29:16.241Z'),

-- Journey 5: Madchester
(7,
'Madchester - When the Factory Floor Became a Dance Floor',
'madchester-factory-floor-dance-floor',
'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&h=600',
'Manchester in the 1980s was a city in ruins, but in its abandoned warehouses and crumbling buildings, a new generation transformed post-industrial decay into the most exciting cultural revolution since the 1960s.',
'{"sections": [
  {"type": "intro", "title": "From Cottonopolis to Cultural Capital", "content": "Manchester in the 1980s was a city in ruins. The industrial powerhouse that had once been called ''Cottonopolis''—the first industrial city in the world—lay broken and bleeding."},
  {"type": "spotify_preview", "track_id": "4wCmqSrbyCgxEXROQE6vtV", "artist": "Joy Division", "title": "Love Will Tear Us Apart", "context": "Released after Ian Curtis''s tragic death, this song became Factory Records'' biggest hit."},
  {"type": "spotify_preview", "track_id": "4WgQOjU2ZW6ABWRjrcw3nZ", "artist": "The Stone Roses", "title": "Fools Gold", "context": "This hypnotic groove became the anthem of Madchester."},
  {"type": "community_mixtape", "title": "Madchester Classics", "description": "Contribute to our collection of Madchester anthems that transformed post-industrial Manchester into a global cultural phenomenon.", "prompt": "What Madchester track perfectly captures the transformation of industrial decay into cultural revolution?"},
  {"type": "poll", "id": "madchester-transformation", "question": "What transformed Manchester''s music scene most dramatically?", "options": ["MDMA and acid house culture", "Factory Records'' artistic vision", "Post-industrial urban decay", "Working-class creativity", "The Haçienda nightclub"]}
]}',
true,
'2025-06-30T14:30:12.002Z')

ON CONFLICT (id) DO NOTHING;

-- Reset sequence
SELECT setval('journeys_id_seq', (SELECT MAX(id) FROM journeys));

-- =====================================================
-- Success message
-- =====================================================
DO $$
BEGIN
  RAISE NOTICE '✅ Seed data loaded successfully!';
  RAISE NOTICE '   - 5 Musical Journeys';
  RAISE NOTICE '   - 27 Community Lists (from migration)';
  RAISE NOTICE '';
  RAISE NOTICE '🎵 Your Uptune database is ready!';
END $$;

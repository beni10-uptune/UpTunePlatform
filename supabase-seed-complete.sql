-- Uptune Complete Seed Data
-- Generated from JSON exports
-- Run this AFTER the migration to populate all tables with real data

SET client_encoding = 'UTF8';

-- =====================================================
-- CLEAR EXISTING DATA (prevents duplicate key errors)
-- =====================================================

TRUNCATE TABLE entry_votes CASCADE;
TRUNCATE TABLE list_entries CASCADE;
TRUNCATE TABLE community_lists CASCADE;
TRUNCATE TABLE community_mixtapes CASCADE;
TRUNCATE TABLE songs CASCADE;
TRUNCATE TABLE players CASCADE;
TRUNCATE TABLE game_rooms CASCADE;
TRUNCATE TABLE teams_waitlist CASCADE;
TRUNCATE TABLE journeys CASCADE;

-- =====================================================
-- JOURNEYS (5 records)
-- =====================================================

INSERT INTO journeys (id, title, slug, headline_image_url, introduction, content, is_published, created_at) VALUES
(3, 'Disco - The Underground Revolution That Conquered and Fell', 'disco-underground-revolution', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&h=600', 'In the early 1970s, as America reeled from Vietnam, Watergate, and economic recession, something extraordinary was happening in the underground clubs of New York City. In converted warehouses and abandoned lofts, in spaces where society''s outcasts gathered to escape the harsh realities of urban decay, a new form of musical expression was being born. This wasn''t just another genre—it was a revolution disguised as a party.', '{"sections": [
  {"type": "intro", "title": "The Underground Revolution Begins", "content": "In the early 1970s, as America reeled from Vietnam, Watergate, and economic recession, something extraordinary was happening in the underground clubs of New York City. In converted warehouses and abandoned lofts, in spaces where society''s outcasts gathered to escape the harsh realities of urban decay, a new form of musical expression was being born. This wasn''t just another genre—it was a revolution disguised as a party."},
  {"type": "spotify_preview", "track_id": "7w87IxuO7BDcJ3YUqCyMTT", "artist": "MFSB", "title": "Love Is the Message", "context": "This instrumental masterpiece by Philadelphia''s house band MFSB (Mother Father Sister Brother) became the blueprint for disco production. With its soaring strings, driving bass, and euphoric build-ups, it established the template that would influence everything from ''Dancing Queen'' to modern house music. The track''s message was simple but revolutionary: love is universal, and music is its language."},
  {"type": "content", "title": "David Mancuso''s Sacred Space", "content": "The story begins with David Mancuso, a soft-spoken visionary who transformed his Manhattan loft into a sacred space called The Loft. Mancuso wasn''t interested in profit or fame; he was interested in transcendence. His parties, which began in 1970, were invitation-only gatherings where the music was carefully curated, the sound system was pristine, and the atmosphere was one of pure, unadulterated joy."},
  {"type": "spotify_preview", "track_id": "4ePVtEHCRfSYg5YKzl6pIz", "artist": "Manu Dibango", "title": "Soul Makossa", "context": "This Cameroonian jazz-funk track became an unlikely anthem at The Loft, proving Mancuso''s genius for finding transcendent music from anywhere in the world. The song''s hypnotic groove and African polyrhythms introduced New York dancers to global sounds, while its chant ''mama-say mama-sa mama-makossa'' would later be sampled by Michael Jackson."},
  {"type": "content", "title": "Paradise Garage: The Cathedral of Sound", "content": "If The Loft was disco''s birthplace, then Paradise Garage was its cathedral. Located in a former truck garage in SoHo, the club opened in 1977 under the guidance of Larry Levan, a DJ whose sets would become the stuff of legend. Levan wasn''t just playing records—he was conducting symphonies of sound that could transport dancers to otherworldly realms."},
  {"type": "spotify_preview", "track_id": "2BoWzwakrYFeaXqkwXenuQ", "artist": "Donna Summer", "title": "Love to Love You Baby", "context": "The commercial breakthrough came with this seventeen-minute odyssey of desire that Time magazine described as containing ''22 different orgasms.'' Producer Giorgio Moroder''s synthesizer work created an otherworldly soundscape while Donna Summer''s vocals ranged from whispers to ecstatic moans, establishing the template for the extended dance mix."},
  {"type": "community_mixtape", "title": "Essential Disco Classics", "description": "Contribute to our collection of disco classics that defined an era. From David Mancuso''s Loft to Studio 54''s glamour, what tracks capture disco''s revolutionary spirit?", "prompt": "What disco song perfectly captures the liberation and joy of the dance floor revolution?"},
  {"type": "youtube_video", "video_id": "k_IXzU-lnLU", "title": "Studio 54 Documentary", "description": "Experience the glamour and excess of Studio 54, where disco reached its cultural peak and celebrities danced with construction workers in Andy Warhol''s ''dictatorship at the door and democracy on the dance floor.''"},
  {"type": "spotify_preview", "track_id": "5QjPX8BHGgvzkAQQm5qYfO", "artist": "Chic", "title": "Le Freak", "context": "Born from rejection—Nile Rodgers and Bernard Edwards were refused entry to Studio 54—''Le Freak'' became disco''s biggest-selling single. The song''s infectious ''freak out'' chant and Rodgers'' crystalline guitar work created a perfect fusion of street credibility and dancefloor sophistication."},
  {"type": "poll", "id": "disco-legacy", "question": "What was disco''s most revolutionary aspect?", "options": ["Breaking down social barriers", "Creating DJ culture", "Empowering marginalized communities", "Pioneering remix culture", "Transforming nightlife forever"]},
  {"type": "content", "title": "The Night They Tried to Kill Disco", "content": "But disco''s very success contained the seeds of its destruction. On July 12, 1979, the Chicago White Sox hosted ''Disco Demolition Night'' at Comiskey Park. What happened that night was more than just a promotional stunt gone wrong—it was a cultural explosion that revealed the deep racial and sexual anxieties that disco had always provoked."},
  {"type": "spotify_preview", "track_id": "1WkMMavIMc4JZ8cfMmxHkI", "artist": "Gloria Gaynor", "title": "I Will Survive", "context": "Originally the B-side of a ballad, ''I Will Survive'' became disco''s greatest anthem of empowerment. Gloria Gaynor''s powerhouse vocals transformed a song about romantic rejection into a universal declaration of resilience."},
  {"type": "spotify_preview", "track_id": "1Az7Sn4Wb2x6g7zIlCLjlU", "artist": "Daft Punk ft. Nile Rodgers", "title": "Get Lucky", "context": "The ultimate vindication came when Nile Rodgers collaborated with Daft Punk on this global hit, proving that disco''s core message—that music should make you move, that dancing is a form of liberation, that joy is a revolutionary act—was as relevant as ever."}
]}', true, '2025-06-30T14:26:14.332Z'),
(4, 'Acid House - The Second Summer of Love', 'acid-house-second-summer-love', 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=1200&h=600', 'A squelching synthesizer sound from Chicago''s underground sparked Britain''s biggest youth revolution since the 1960s, transforming nightlife forever through the power of the TB-303 and MDMA.', '{"sections": [
  {"type": "intro", "title": "Chicago 1985 - The TB-303 Mistake", "content": "In a small studio on Chicago''s South Side in 1985, three young musicians were about to accidentally create a sound that would change the world. DJ Pierre, Herb J, and Spanky - collectively known as Phuture - had gotten their hands on a Roland TB-303 Bass Line, a small silver box that Roland had designed to help guitarists practice. The machine had been a commercial failure, dismissed as too limited and too weird-sounding to be useful. But what sounded wrong to traditional musicians sounded revolutionary to these Chicago house music pioneers."},
  {"type": "spotify_preview", "track_id": "4uLU6hMCjMI75M1A2tKUQC", "artist": "Phuture", "title": "Acid Tracks", "context": "The first acid house record, created in 1985 but not released until 1987, defining the entire genre. ''We were just messing around,'' DJ Pierre would later recall, ''but when we heard those sounds coming out of the 303, we knew we had something special.'' The track''s squelching, gurgling, almost liquid tones seemed to breathe and evolve with each repetition, proving that electronic music could be both experimental and deeply moving."},
  {"type": "content", "title": "Summer 1987 - Four DJs and a Revelation", "content": "In the summer of 1987, four young London DJs embarked on what they thought would be a simple holiday to celebrate Paul Oakenfold''s 24th birthday. Paul Oakenfold, Danny Rampling, Nicky Holloway, and Johnny Walker had no idea that their week in Ibiza would spark a cultural revolution that would transform British youth culture forever. The revelation came at Amnesia, a club built into the ruins of an old farmhouse in the hills above San Antonio."},
  {"type": "spotify_preview", "track_id": "1LY6DbJb7dNfMZvdBp0Qe2", "artist": "Sueno Latino", "title": "Sueno Latino", "context": "This Balearic classic bridged the gap between Ibiza''s eclectic style and acid house, featuring samples of Manuel Göttsching''s ambient work. The track showed how electronic music could incorporate diverse influences while maintaining dancefloor power, becoming an anthem for the Ibiza experience that the four London DJs would bring back to transform British nightlife."},
  {"type": "youtube_video", "video_id": "uq2vIfR0hsA", "title": "The Story of Acid House", "description": "Explore the origins of acid house from Chicago''s South Side to the clubs of London, featuring interviews with the pioneers who created the sound that changed youth culture forever."},
  {"type": "content", "title": "Shoom - The London Laboratory", "content": "On a cold December night in 1987, in the basement of a fitness center in Southwark, South London, Danny Rampling and his wife Jenni opened the doors to Shoom. The club adopted the yellow smiley face as its logo, a simple symbol that perfectly captured the euphoric, loved-up atmosphere that MDMA and the music created together. Shoom wasn''t just a nightclub; it was a laboratory for a new kind of consciousness."},
  {"type": "spotify_preview", "track_id": "4MzJMcHQBl9SIYSjwWn8QD", "artist": "A Guy Called Gerald", "title": "Voodoo Ray", "context": "This Manchester-produced acid house classic became a Shoom anthem, showing how the sound was spreading across the UK. Gerald Simpson''s innovative use of the TB-303 and sampled vocals created a track that was both otherworldly and deeply grooving, demonstrating that British producers could create acid house that was both authentic and innovative."},
  {"type": "poll", "id": "acid-house-impact", "question": "What was acid house''s biggest cultural impact?", "options": ["Breaking down social barriers", "Creating rave culture", "Introducing electronic music to Britain", "The MDMA consciousness revolution", "Inspiring the Criminal Justice Act"]},
  {"type": "content", "title": "The Haçienda Transformation", "content": "While London was discovering acid house through clubs like Shoom, 200 miles north in Manchester, a different kind of transformation was taking place. The Haçienda, Factory Records'' ambitious nightclub project, had been struggling since its opening in 1982. But in 1988, everything changed. The arrival of acid house and MDMA transformed the Haçienda from an expensive folly into the most important nightclub in Britain."},
  {"type": "spotify_preview", "track_id": "3v7qhWoTBsxX0xVeqo8bZK", "artist": "808 State", "title": "Pacific State", "context": "This Manchester acid house classic perfectly captured the euphoric, oceanic feeling of the Haçienda experience. The track''s soaring melodies and hypnotic beats showed how acid house could evolve beyond its Chicago origins to create distinctly British sounds, becoming an anthem for the transformative power of the scene."},
  {"type": "community_mixtape", "title": "Acid House Classics", "description": "Contribute to our collection of acid house tracks that defined the Second Summer of Love. From Chicago''s TB-303 experiments to Manchester''s euphoric anthems, what tracks capture the revolutionary spirit?", "prompt": "What acid house track perfectly captures the euphoric spirit of the Second Summer of Love?"},
  {"type": "content", "title": "The Moral Panic", "content": "By the summer of 1988, acid house had exploded into mainstream British consciousness, and the reaction from the establishment was swift and severe. The tabloid press launched a sustained campaign with headlines like ''EVIL OF ECSTASY'' and ''ACID HOUSE HORROR.'' But the establishment''s reaction had an unintended consequence: it made acid house seem even more attractive to young people who were already alienated from mainstream society."},
  {"type": "spotify_preview", "track_id": "6MR7zrXJzIhWNKCKGbP8RJ", "artist": "Orbital", "title": "Chime", "context": "Named after the M25 motorway that circles London, this track became the anthem of the illegal rave scene. Its hypnotic arpeggios evoked the lights of the motorway and the anticipation of the party ahead, perfectly capturing the experience of driving through the night toward an unknown destination in search of transcendent musical experiences."},
  {"type": "content", "title": "The Second Summer of Love Legacy", "content": "By 1992, the initial explosion of acid house culture had evolved into something more complex and diverse, but its impact on British society was undeniable and permanent. What had begun as a small underground movement had transformed youth culture, influenced fashion and art, changed the music industry, and even affected British politics. The ''Second Summer of Love'' had created changes that would ripple through British society for decades to come."}
]}', true, '2025-06-30T14:27:13.255Z'),
(5, 'Berlin Electronic - Soundtrack of Freedom', 'berlin-electronic-soundtrack-freedom', 'https://images.unsplash.com/photo-1574618071533-b6dfd83e0d10?auto=format&fit=crop&w=1200&h=600', 'From the ruins of the Berlin Wall rose an electronic revolution that transformed a divided city into the global capital of techno culture, where liberation found its voice in hypnotic four-four beats.', '{"sections": [
  {"type": "intro", "title": "November 9, 1989 - Liberation Day", "content": "The night the Berlin Wall fell, something extraordinary happened beyond the political reunification of a divided city. As sledgehammers struck concrete and families embraced across the death strip, a new sound began to pulse through the abandoned buildings of East Berlin. It wasn''t planned, it wasn''t organized, and it certainly wasn''t sanctioned by any government. It was pure, raw liberation expressed through the relentless four-four beat of techno music."},
  {"type": "spotify_preview", "track_id": "5fTJBPsZJlWThBgqrO9J4i", "artist": "Cybotron", "title": "Clear", "context": "This Detroit techno classic became an anthem in early Berlin clubs, its futuristic vision perfectly matching the city''s transformation. Juan Atkins and Richard Davis''s vision of technological liberation found perfect resonance in post-Wall Berlin, bridging the gap between Detroit''s Afrofuturist vision and Berlin''s post-Wall optimism."},
  {"type": "content", "title": "Tresor - The Vault of Sound", "content": "In March 1991, eighteen months after the Wall''s fall, Dimitri Hegemann descended into the basement vault of a bombed-out department store near Potsdamer Platz and created something that would become legendary. Tresor opened its doors as Berlin''s first dedicated techno club, establishing the template for everything that would follow. The concrete walls, scarred by history, provided the perfect acoustic environment for the pounding rhythms of techno."},
  {"type": "spotify_preview", "track_id": "1pP3g7L2C5oB9yLOTqYHbJ", "artist": "Derrick May", "title": "Strings of Life", "context": "This Detroit classic became a Tresor anthem, its emotional strings and driving beat epitomizing the connection between Detroit and Berlin. Derrick May''s masterpiece demonstrated how techno could be both mechanical and deeply emotional, capturing the spirit of two post-industrial cities finding new life through electronic music."},
  {"type": "youtube_video", "video_id": "uOv_rJOD2DE", "title": "Berlin Techno Documentary", "description": "Experience the transformation of Berlin from divided city to techno capital, featuring the legendary clubs and DJs who created the soundtrack to German reunification."},
  {"type": "content", "title": "The Underground Network", "content": "As Tresor established itself as Berlin''s techno ground zero, a network of underground venues began spreading across the city like mycelium through fertile soil. E-Werk, housed in a former power station, became known for its massive industrial spaces and cutting-edge sound systems. Planet developed a more experimental approach, while WMF occupied former air raid shelters, creating multiple environments within a single space."},
  {"type": "spotify_preview", "track_id": "4r1NqczJReLQXN7PLQyuq7", "artist": "Joey Beltram", "title": "Energy Flash", "context": "This Belgian-American producer''s track became a Berlin underground anthem, its relentless energy perfectly capturing the scene''s intensity. The track showed how techno was becoming truly international, with artists from different countries contributing to Berlin''s evolving sound, creating a global language of electronic liberation."},
  {"type": "poll", "id": "berlin-era", "question": "Which era of Berlin electronic music resonates most with you?", "options": ["Early 90s Underground", "Love Parade Peak Years", "Minimal Techno Evolution", "Modern Berghain Era", "Post-Pandemic Revival"]},
  {"type": "content", "title": "Love Parade - From Protest to Phenomenon", "content": "On July 1, 1989, four months before the Berlin Wall would fall, a young DJ named Dr. Motte organized something unprecedented. He called it the Love Parade, and it began as a political demonstration disguised as a street party. With just 150 participants dancing behind a single truck playing electronic music, it would grow into the world''s largest techno festival, attracting over 1.5 million people at its peak in 1999."},
  {"type": "spotify_preview", "track_id": "6I9NzKl6OdQ9hDNHsU0Gqj", "artist": "Underworld", "title": "Born Slippy (Nuxx)", "context": "Though British, this track became a Love Parade anthem, its euphoric build perfectly matching the parade''s emotional intensity. The song demonstrated how Berlin''s techno culture was influencing and being influenced by electronic music worldwide, creating a global community united by rhythm and liberation."},
  {"type": "community_mixtape", "title": "Berlin Techno Essentials", "description": "Contribute to our collection of tracks that defined Berlin''s electronic revolution. From Tresor''s concrete bunker to Berghain''s cathedral-like space, what tracks capture the spirit of freedom through technology?", "prompt": "What electronic track perfectly captures Berlin''s transformation from divided city to techno capital?"},
  {"type": "content", "title": "The Berghain Era", "content": "In 2004, thirteen years after Tresor opened its vault doors, Berlin''s techno scene reached a new level of international recognition with the opening of Berghain. Built in a former East German power plant, the club quickly established itself as the most famous techno venue in the world, a place where the music had evolved from rebellion into something approaching religious experience."},
  {"type": "spotify_preview", "track_id": "2xLFLO6YjDBPP6GEHhvXfI", "artist": "Ben Klock", "title": "Subzero", "context": "This Berghain resident''s track epitomizes the deep, hypnotic sound that made the club legendary. Klock''s production showcases the evolution of Berlin techno into something both minimal and maximal, mechanical yet spiritual, demonstrating how the city''s electronic music continued to push boundaries decades after the Wall fell."},
  {"type": "content", "title": "The Global Revolution", "content": "Today, Berlin''s influence on electronic music is immeasurable. The city that once symbolized division has become the global center of electronic music culture, attracting DJs, producers, and music lovers from around the world. The abandoned buildings that housed the first techno parties have given way to purpose-built clubs, but the spirit remains the same: music as liberation, technology as freedom, and the dance floor as a space where anything is possible."}
]}', true, '2025-06-30T14:28:24.957Z'),
(6, 'Detroit Techno - The Sound of Post-Industrial Resurrection', 'detroit-techno-post-industrial-resurrection', 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&w=1200&h=600', 'In the ruins of America''s Motor City, three young men created a new sound that would transform electronic music forever, proving that from the ashes of industrial decline could rise the music of the future.', '{"sections": [
  {"type": "intro", "title": "The Belleville Three - Prophets of the Future", "content": "In the suburbs of Detroit, in the early 1980s, three young Black men were creating the sound of the future in their bedrooms and basements. Juan Atkins, Derrick May, and Kevin Saunderson—collectively known as the Belleville Three—would create Detroit techno, a genre that fused the mechanical rhythms of Kraftwerk with the soul of Black American music, producing something entirely new: Afrofuturistic electronic music that spoke to both the promise and the peril of technological advancement."},
  {"type": "spotify_preview", "track_id": "4BzY6dEJ7VtGF3J3XL0P1Q", "artist": "Juan Atkins", "title": "No UFOs", "context": "Juan Atkins, working under the Cybotron moniker, created this early Detroit techno classic that perfectly encapsulated the genre''s Afrofuturistic vision. The track''s robotic funk and space-age themes established the template for techno''s combination of technological sophistication and emotional depth, proving that electronic music could be both cerebral and deeply soulful."},
  {"type": "content", "title": "The Motor City''s New Machine Music", "content": "Detroit in the 1980s was a city in crisis. The automotive industry that had made it the ''Motor City'' was in decline, leaving behind abandoned factories and empty lots. But for the Belleville Three, this post-industrial landscape was not a symbol of defeat but a canvas for reimagining what music could be. They took the mechanical precision that had once built cars and applied it to rhythm, creating a new form of electronic music that was simultaneously futuristic and deeply rooted in Detroit''s musical heritage."},
  {"type": "spotify_preview", "track_id": "1pP3g7L2C5oB9yLOTqYHbJ", "artist": "Derrick May", "title": "Strings of Life", "context": "Derrick May''s masterpiece became the emotional center of Detroit techno, proving that machine music could be profoundly moving. The track''s soaring strings and driving rhythm created a template for techno that was both uplifting and melancholic, capturing the complex emotions of a city in transition. Its influence extends far beyond techno, inspiring everything from rave anthems to modern EDM."},
  {"type": "youtube_video", "video_id": "NugRZGDbPFU", "title": "Detroit Techno Documentary", "description": "Experience the story of how three young men from Detroit created a global musical revolution, transforming post-industrial decay into the sound of the future through electronic innovation and Afrofuturistic vision."},
  {"type": "content", "title": "Underground Resistance - Music as Weapon", "content": "By the late 1980s, Detroit techno had evolved beyond the bedroom studios of the Belleville Three. Underground Resistance, founded by ''Mad'' Mike Banks and Jeff Mills, transformed techno from dance music into a form of sonic warfare against social oppression. Their militant aesthetic and revolutionary rhetoric positioned techno as a tool for consciousness-raising and social change."},
  {"type": "spotify_preview", "track_id": "5QZVtFG0l0QoD8H5k3o9nF", "artist": "Underground Resistance", "title": "Nation 2 Nation", "context": "Underground Resistance''s anthem captured the revolutionary spirit that made Detroit techno more than just dance music. The track''s aggressive beats and militant messaging transformed the dance floor into a space of political awakening, proving that electronic music could be both entertaining and consciousness-raising. UR''s influence on global electronic music continues today."},
  {"type": "poll", "id": "detroit-evolution", "question": "What aspect of Detroit techno resonates most with you?", "options": ["Afrofuturistic vision", "Post-industrial aesthetics", "Revolutionary politics", "Technical innovation", "Emotional depth"]},
  {"type": "content", "title": "The Second Wave - Deepening the Sound", "content": "As Detroit techno gained international recognition, a second wave of producers emerged to deepen and expand the sound. Carl Craig, Kenny Larkin, and Stacey Pullen brought new sophistication and emotional complexity to techno, proving that the genre could evolve while maintaining its essential character. Their work established Detroit as the undisputed capital of techno innovation."},
  {"type": "spotify_preview", "track_id": "3kQ1KgP8jh4mT6x2OqJ5nE", "artist": "Carl Craig", "title": "Bug in the Bassbin", "context": "Carl Craig''s innovative approach to techno production created new possibilities for electronic music. This track''s complex arrangements and emotional depth showed how techno could incorporate elements from jazz, classical, and ambient music while maintaining its essential drive and energy. Craig''s influence on modern electronic music is immeasurable."},
  {"type": "community_mixtape", "title": "Detroit Techno Pioneers", "description": "Contribute to our collection of Detroit techno classics that defined a genre and transformed electronic music forever. From the Belleville Three''s early experiments to Underground Resistance''s militant anthems, what tracks capture Detroit''s revolutionary spirit?", "prompt": "What Detroit techno track perfectly captures the city''s transformation from industrial decay to electronic innovation?"},
  {"type": "content", "title": "Global Impact - From Detroit to the World", "content": "Today, Detroit techno''s influence can be heard in electronic music worldwide. The genre''s emphasis on technological innovation, emotional depth, and social consciousness has inspired countless producers and DJs from Berlin to Tokyo. Annual festivals like Movement in Detroit celebrate the genre''s continuing vitality, while new generations of producers carry forward the revolutionary spirit of the Belleville Three."},
  {"type": "spotify_preview", "track_id": "7KJq4nP8K9mR2xH1F5G3qA", "artist": "Jeff Mills", "title": "The Bells", "context": "Jeff Mills'' hypnotic masterpiece became one of techno''s most recognizable tracks, its relentless energy and industrial precision capturing the essence of Detroit''s musical revolution. The track''s enduring popularity proves that great techno transcends temporal boundaries, continuing to move dance floors decades after its creation. Mills'' vision of techno as ''music for the 21st century'' remains as relevant today as ever."}
]}', true, '2025-06-30T14:29:16.241Z'),
(7, 'Madchester - When the Factory Floor Became a Dance Floor', 'madchester-factory-floor-dance-floor', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&h=600', 'Manchester in the 1980s was a city in ruins, but in its abandoned warehouses and crumbling buildings, a new generation transformed post-industrial decay into the most exciting cultural revolution since the 1960s.', '{"sections": [
  {"type": "intro", "title": "From Cottonopolis to Cultural Capital", "content": "Manchester in the 1980s was a city in ruins. The industrial powerhouse that had once been called ''Cottonopolis''—the first industrial city in the world—lay broken and bleeding, its factories shuttered, its workers unemployed, its future uncertain. The Conservative government of Margaret Thatcher had written off the North, viewing places like Manchester as relics of a bygone era. But in the abandoned warehouses and crumbling Victorian buildings, something extraordinary was stirring."},
  {"type": "spotify_preview", "track_id": "6zWoWOwZpZQrbvXS4s6cTy", "artist": "Buzzcocks", "title": "Ever Fallen in Love (With Someone You Shouldn''t''ve)", "context": "Pete Shelley''s perfect pop song about impossible love became a template for Manchester bands to follow. Its combination of punk energy and irresistible melody showed that aggressive music could still be beautiful. The song''s influence can be heard in everything from The Smiths to Oasis, proving that great songwriting transcends genre boundaries."},
  {"type": "content", "title": "Tony Wilson''s Revolutionary Vision", "content": "The story begins with Anthony H. Wilson—known to everyone simply as Tony—a Cambridge-educated television presenter who had fallen in love with punk rock and seen in it the seeds of something greater. In 1978, he founded Factory Records with a revolutionary philosophy: the record company should serve the artists, not exploit them. Wilson''s vision was radical in its simplicity—complete creative control for artists, no restrictive contracts, treating music as art rather than commodity."},
  {"type": "spotify_preview", "track_id": "4wCmqSrbyCgxEXROQE6vtV", "artist": "Joy Division", "title": "Love Will Tear Us Apart", "context": "Released after Ian Curtis''s tragic death, this song became Factory Records'' biggest hit and a blueprint for emotional intensity in popular music. The combination of Curtis''s vulnerable vocals and the band''s driving rhythm created a template that would influence everyone from The Cure to Interpol, proving that audiences craved authenticity over artifice."},
  {"type": "youtube_video", "video_id": "1uhl4zZJ8AM", "title": "24 Hour Party People - The Haçienda Story", "description": "Experience the rise and fall of Manchester''s legendary Haçienda nightclub, where Factory Records'' vision of cultural democracy met the chemical revolution of acid house and MDMA, transforming a struggling venue into the epicenter of British youth culture."},
  {"type": "content", "title": "New Order - From Darkness to Light", "content": "After Ian Curtis''s death, the remaining members of Joy Division formed New Order, gradually incorporating electronic elements and dance rhythms into their sound. Their evolution from post-punk to dance-rock pioneers would prove crucial to the Madchester sound that followed, showing how electronic music could be both experimental and emotionally resonant."},
  {"type": "spotify_preview", "track_id": "6sy3LkhNFjJWlaeSMNgEDB", "artist": "New Order", "title": "Blue Monday", "context": "The best-selling 12-inch single of all time, ''Blue Monday'' bridged the gap between underground and mainstream, rock and dance, emotion and euphoria. Bernard Sumner''s robotic vocals and the song''s hypnotic electronic pulse created a new template for popular music, proving that experimental music could be commercially viable and paving the way for the dance-rock fusion that would define Madchester."},
  {"type": "content", "title": "The Smiths - Poetry in Motion", "content": "While Factory Records was building its empire, another Manchester band was conquering hearts and minds across Britain. The Smiths, led by Morrissey''s literate lyrics and Johnny Marr''s jangly guitar work, proved that Manchester could produce bands of international significance. Though not technically part of the Madchester scene, their influence was enormous, inspiring a generation of local musicians to believe in their own potential."},
  {"type": "spotify_preview", "track_id": "5eBOc10cBp0MWUuOPNHxbz", "artist": "The Smiths", "title": "This Charming Man", "context": "Johnny Marr''s cascading guitar riff and Morrissey''s witty wordplay created one of the most perfect pop songs ever recorded. The track''s combination of musical sophistication and lyrical intelligence showed that indie music could be both cerebral and emotionally affecting, proving that Manchester bands could compete with anyone, anywhere."},
  {"type": "poll", "id": "madchester-transformation", "question": "What transformed Manchester''s music scene most dramatically?", "options": ["MDMA and acid house culture", "Factory Records'' artistic vision", "Post-industrial urban decay", "Working-class creativity", "The Haçienda nightclub"]},
  {"type": "content", "title": "The Stone Roses - Channeling a Generation", "content": "At the center of this revolution were the Stone Roses, four young men who had absorbed punk, psychedelia, and dance music and synthesized them into something entirely new. Their 1989 debut album was a masterpiece that seemed to channel the collective unconscious of a generation. Ian Brown''s swagger, John Squire''s guitar genius, and the rhythm section''s groove created a sound that was both timeless and utterly contemporary."},
  {"type": "spotify_preview", "track_id": "4WgQOjU2ZW6ABWRjrcw3nZ", "artist": "The Stone Roses", "title": "Fools Gold", "context": "This hypnotic groove became the anthem of Madchester, blending indie rock with dance rhythms in a way that had never been heard before. Built around a simple but irresistible bass line and featuring John Squire''s wah-wah guitar work, the track captured the euphoric spirit of the times. Its success showed that the boundaries between rock and dance music were dissolving."},
  {"type": "content", "title": "Happy Mondays - Democratizing Performance", "content": "Happy Mondays embodied the movement''s more anarchic impulses. Led by Shaun Ryder''s stream-of-consciousness lyrics and featuring the legendary dancer Bez, they created music that was simultaneously brilliant and completely unhinged. Their collaboration with producer Paul Oakenfold brought Balearic beats to Manchester, creating a sound that was both local and global."},
  {"type": "spotify_preview", "track_id": "7KDXZM6cUO0MQaSsyGNJ5h", "artist": "Happy Mondays", "title": "Step On", "context": "Built on a sample from John Kongos'' ''He''s Gonna Step on You Again,'' this became the perfect fusion of rock attitude and dance floor euphoria. Bez''s manic dancing in the video captured the spirit of an entire movement—pure, uninhibited joy. The song''s success proved that you didn''t need traditional musical skills to create great music; you just needed passion, creativity, and the right attitude."},
  {"type": "community_mixtape", "title": "Madchester Classics", "description": "Contribute to our collection of Madchester anthems that transformed post-industrial Manchester into a global cultural phenomenon. From Factory Records'' vision to the Haçienda''s euphoria, what tracks capture the spirit of the movement?", "prompt": "What Madchester track perfectly captures the transformation of industrial decay into cultural revolution?"},
  {"type": "content", "title": "The Legacy Lives On", "content": "Despite its ultimate commercial failure, Madchester''s influence cannot be overstated. The movement proved that regional scenes could have global impact, that underground culture could reshape mainstream consciousness. The fusion of rock and dance music that began in Manchester continues to influence artists today, while the city''s cultural confidence paved the way for Britpop and beyond. More importantly, Madchester demonstrated the transformative power of community and shared experience."}
]}', true, '2025-06-30T14:30:12.002Z');

-- Reset sequence
SELECT setval('journeys_id_seq', (SELECT MAX(id) FROM journeys));

-- =====================================================
-- COMMUNITY_LISTS (25 records)
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
(27, 'Detroit Techno Pioneers', 'The Belleville Three and the birth of techno - Juan Atkins, Derrick May, Kevin Saunderson and beyond', 'detroit-techno-pioneers', '🏭', true, '2025-06-30T14:58:47.869Z');

-- Reset sequence
SELECT setval('community_lists_id_seq', (SELECT MAX(id) FROM community_lists));

-- =====================================================
-- COMMUNITY_MIXTAPES (5 records)
-- =====================================================

INSERT INTO community_mixtapes (id, journey_id, title, description, created_at) VALUES
(4, 3, 'Essential Disco Classics', 'Contribute to our collection of disco classics that defined an era. From David Mancuso''s Loft to Studio 54''s glamour, what tracks capture disco''s revolutionary spirit?', '2025-06-30T14:26:28.877Z'),
(5, 4, 'Acid House Classics', 'Contribute to our collection of acid house tracks that defined the Second Summer of Love. From Chicago''s TB-303 experiments to Manchester''s euphoric anthems, what tracks capture the revolutionary spirit?', '2025-06-30T14:27:47.831Z'),
(6, 5, 'Berlin Techno Essentials', 'Contribute to our collection of tracks that defined Berlin''s electronic revolution. From Tresor''s concrete bunker to Berghain''s cathedral-like space, what tracks capture the spirit of freedom through technology?', '2025-06-30T14:28:35.253Z'),
(7, 6, 'Detroit Techno Pioneers', 'Contribute to our collection of Detroit techno classics that defined a genre and transformed electronic music forever. From the Belleville Three''s early experiments to Underground Resistance''s militant anthems, what tracks capture Detroit''s revolutionary spirit?', '2025-06-30T14:29:27.027Z'),
(8, 7, 'Madchester Classics', 'Contribute to our collection of Madchester anthems that transformed post-industrial Manchester into a global cultural phenomenon. From Factory Records'' vision to the Haçienda''s euphoria, what tracks capture the spirit of the movement?', '2025-06-30T14:30:43.138Z');

-- Reset sequence
SELECT setval('community_mixtapes_id_seq', (SELECT MAX(id) FROM community_mixtapes));

-- =====================================================
-- LIST_ENTRIES (54 records)
-- =====================================================

INSERT INTO list_entries (id, list_id, user_id, guest_session_id, spotify_track_id, song_title, artist_name, album_name, image_url, context_reason, vote_score, created_at, submitter_name) VALUES
(7, 1, NULL, NULL, '4CWgqHRJjDLd2PCedMz8eY', 'Waterfall - Remastered 2009', 'The Stone Roses', 'The Stone Roses', 'https://i.scdn.co/image/ab67616d0000b273cf1f6466a493eb73d6d9d280', 'Makes me happy :)', 3, '2025-06-12T15:16:37.581Z', NULL),
(8, 2, NULL, 'guest_1749742448613_japu9pxq6', '4CWgqHRJjDLd2PCedMz8eY', 'Waterfall - Remastered 2009', 'The Stone Roses', 'The Stone Roses', 'https://i.scdn.co/image/ab67616d0000b273cf1f6466a493eb73d6d9d280', 'Jimmy Grimble', 1, '2025-06-12T15:34:41.858Z', NULL),
(9, 4, NULL, 'guest_1749743124187_p99mfww3y', '7uv632EkfwYhXoqf8rhYrg', 'Angel', 'Massive Attack, Horace Andy', 'Mezzanine', 'https://i.scdn.co/image/ab67616d0000b2732fcb0a3c7a66e516b11cd26e', 'Beautiful, spine tingling ', 1, '2025-06-12T15:46:01.487Z', NULL),
(10, 3, NULL, 'guest_1749743176006_vc3l6lh3q', '2gQaQUhDCNGfBVXTvxAmXQ', 'Shout', 'Tears For Fears', 'Songs From The Big Chair', 'https://i.scdn.co/image/ab67616d0000b2739565c4df27be4aee5edc8009', 'Love the guitar solo around 3min. Kids play air guitar in the living room', 1, '2025-06-12T15:47:16.843Z', NULL),
(11, 2, NULL, 'guest_1749743265850_uo7k753k0', '4mjLAbsWBCuqSOqMvaPkXd', 'Pure Shores', 'All Saints', 'Pure Shores', 'https://i.scdn.co/image/ab67616d0000b2738722929540f0b99a7a7efc88', 'Beach', 1, '2025-06-12T15:48:19.454Z', NULL),
(13, 14, NULL, 'guest_1749743999251_47y2a8w7u', '34iOH7LY3vme5rQxsVILZ4', 'Love Will Tear Us Apart - 2020 Remaster', 'Joy Division', 'Love Will Tear Us Apart', 'https://i.scdn.co/image/ab67616d0000b2731e0fdc2906851e29d09320c3', NULL, 5, '2025-06-12T16:00:15.061Z', NULL),
(14, 14, NULL, 'guest_1749744867652_vcfr3t5v9', '1w6R4C1WQYRHCKLq1FBuIs', 'Agadoo', 'Black Lace', 'What a Party!', 'https://i.scdn.co/image/ab67616d0000b2736e0448c2e88c3e01788d9e9a', 'It''s a banger', -6, '2025-06-12T16:15:50.158Z', NULL),
(15, 1, NULL, 'guest_1749745955071_wpsfob9yh', '6l8GvAyoUZwWDgF1e4822w', 'Bohemian Rhapsody', 'Queen', 'Stone Cold Classics', 'https://i.scdn.co/image/ab67616d0000b2735a7602f0e508660b2ba40f8c', 'Banger', 1, '2025-06-12T16:33:01.469Z', NULL),
(16, 14, NULL, 'guest_1749746964918_yam897bda', '3NYCaxkggl0Hh8vQptSUvV', 'Enola Gay - Remastered 2003', 'Orchestral Manoeuvres In The Dark', 'Organisation', 'https://i.scdn.co/image/ab67616d0000b273a3bc94f95c99c3ad2f40740a', NULL, 2, '2025-06-12T16:49:55.277Z', NULL),
(17, 14, NULL, 'guest_1749747779903_yr9cjduva', '3dmobvDw495SmioxUaDJt7', 'In Dulce Decorum', 'The Damned', 'Anything', 'https://i.scdn.co/image/ab67616d0000b2738c61507bfd668b1b932468e5', 'It''s ace.. ', 2, '2025-06-12T17:03:50.444Z', NULL),
(18, 14, NULL, 'guest_1749747642810_28zioi6s7', '2K22nUTdyr48JDwI5t906t', 'Relax (Come Fighting)', 'Frankie Goes To Hollywood', 'Welcome To The Pleasuredome', 'https://i.scdn.co/image/ab67616d0000b273275774501f737e10d92adaca', NULL, 3, '2025-06-12T17:04:18.478Z', NULL),
(19, 14, NULL, 'guest_1749747779903_yr9cjduva', '6hHc7Pks7wtBIW8Z6A0iFq', 'Blue Monday', 'New Order', 'Substance', 'https://i.scdn.co/image/ab67616d0000b2733c182241fcd86aeca2c68a63', NULL, 2, '2025-06-12T17:13:05.678Z', NULL),
(20, 14, NULL, 'guest_1749748485717_l7zh5hkpd', '2CfqGS6D9piBWM3SAjbUJM', 'To Cut A Long Story Short', 'Spandau Ballet', 'Gold - The Best of Spandau Ballet', 'https://i.scdn.co/image/ab67616d0000b27357051c7a61d037d4f2ddaeb4', NULL, 1, '2025-06-12T17:16:23.445Z', NULL),
(21, 14, NULL, 'guest_1749748485717_l7zh5hkpd', '43eBgYRTmu5BJnCJDBU5Hb', 'Rio - 2009 Remaster', 'Duran Duran', 'Rio (Collector''s Edition)', 'https://i.scdn.co/image/ab67616d0000b27316c75e2dd2654d7d03f2c556', NULL, 1, '2025-06-12T17:16:56.401Z', NULL),
(22, 1, NULL, 'guest_1749748652397_rgtirv6ol', '0Bo5fjMtTfCD8vHGebivqc', 'Axel F', 'Crazy Frog', 'Crazy Frog presents Crazy Hits', 'https://i.scdn.co/image/ab67616d0000b273d283768954643034b25fde78', NULL, 0, '2025-06-12T17:18:02.910Z', NULL),
(23, 14, NULL, 'guest_1749749982229_o1unxmd3k', '3gsIAou7LjiL3ayF9dR46V', 'The Reflex', 'Duran Duran', 'Seven and the Ragged Tiger', 'https://i.scdn.co/image/ab67616d0000b273ea4f5f9d01c5d226d98213f9', 'The wave in the video is so cool ', 1, '2025-06-12T17:41:04.418Z', NULL),
(24, 14, NULL, 'guest_1749750189797_kgty98l9f', '2v7qe4TkWOM0upTIDcSnd3', 'Smuggler''s Blues', 'Glenn Frey', 'Solo Collection', 'https://i.scdn.co/image/ab67616d0000b2737f419c947cfa0a5f8292d76d', NULL, 1, '2025-06-12T17:43:21.938Z', NULL),
(25, 14, NULL, 'guest_1749750189797_kgty98l9f', '3TnJ7M6in8Pb5EyGBUK02Y', 'Crockett''s Theme', 'Jan Hammer', 'Escape From Television', 'https://i.scdn.co/image/ab67616d0000b273a641b32019d779543f24f39d', NULL, 2, '2025-06-12T17:43:45.468Z', NULL),
(26, 14, NULL, 'guest_1749750349762_up9nzyexc', '7FwBtcecmlpc1sLySPXeGE', 'Dancing In the Dark', 'Bruce Springsteen', 'Born In The U.S.A.', 'https://i.scdn.co/image/ab67616d0000b273a7865e686c36a4adda6c9978', NULL, 1, '2025-06-12T17:46:12.806Z', NULL),
(27, 5, NULL, 'guest_1749750364635_ngf7hykuc', '1JO1xLtVc8mWhIoE3YaCL0', 'Happy Together', 'The Turtles', 'Happy Together', 'https://i.scdn.co/image/ab67616d0000b27372649ad8e79d1e8bdd54c929', NULL, 1, '2025-06-12T17:46:23.256Z', NULL),
(28, 6, NULL, 'guest_1749750392853_tj3hfgyw6', '7Gpr3kKk4BMgItz6UbI73q', 'Road Trippin''', 'Red Hot Chili Peppers', 'Californication', 'https://i.scdn.co/image/ab67616d0000b273a9249ebb15ca7a5b75f16a90', NULL, 1, '2025-06-12T17:46:43.951Z', NULL),
(29, 19, NULL, 'guest_1749750420775_unaz2gxo4', '0MmezuFIfxZQSyUVC5NAKa', 'Wrote for Luck - Remastered Version', 'Happy Mondays', 'Bummed (Collector''s Edition)', 'https://i.scdn.co/image/ab67616d0000b27340e5df6a7c6bb67435816a95', 'Love the aaaaaaaaaahhhhhhhhh', 1, '2025-06-12T17:47:35.699Z', NULL),
(30, 20, NULL, 'guest_1749750468268_w5hzxoddt', '0iYtGebtnGzemwehimWusQ', 'Rock Your Baby', 'George McCrae', 'Rock Your Baby', 'https://i.scdn.co/image/ab67616d0000b2736d37ac3d3e7079c6ccaa35f6', 'Unbelievable! Melody gets me every time!', 1, '2025-06-12T17:48:18.059Z', NULL),
(32, 14, NULL, 'guest_1749750491514_lh3drqtdl', '2WfaOiMkCvy7F5fcp2zZ8L', 'Take on Me', 'a-ha', 'Hunting High and Low', 'https://i.scdn.co/image/ab67616d0000b273e8dd4db47e7177c63b0b7d53', 'Comic video is iconic ', 1, '2025-06-12T17:49:20.174Z', NULL),
(33, 14, NULL, 'guest_1749750651658_q3o4k8nvu', '1JSTJqkT5qHq8MDJnJbRE1', 'Every Breath You Take', 'The Police', 'Synchronicity (Remastered 2003)', 'https://i.scdn.co/image/ab67616d0000b273c8e97cafeb2acb85b21a777e', NULL, 1, '2025-06-12T17:51:06.015Z', NULL),
(34, 14, NULL, 'guest_1749750687077_opainfu6a', '4y1LsJpmMti1PfRQV9AWWe', 'Girls Just Want to Have Fun', 'Cyndi Lauper', 'She''s So Unusual', 'https://i.scdn.co/image/ab67616d0000b27352f532df7ba3269b0242fed9', 'She is hilarious ', 1, '2025-06-12T17:51:46.401Z', NULL),
(35, 1, NULL, 'guest_1749789490298_w3sawjbp5', '1VuBmEauSZywQVtqbxNqka', 'Beautiful Day', 'U2', 'All That You Can''t Leave Behind', 'https://i.scdn.co/image/ab67616d0000b273e3f4221446f724b575a9aafb', NULL, 1, '2025-06-13T04:38:41.948Z', NULL),
(36, 4, NULL, 'guest_1749792012916_it9xlemo5', '7FwBtcecmlpc1sLySPXeGE', 'Dancing In the Dark', 'Bruce Springsteen', 'Born In The U.S.A.', 'https://i.scdn.co/image/ab67616d0000b273a7865e686c36a4adda6c9978', 'Sheer presence ', 1, '2025-06-13T05:20:42.653Z', NULL),
(37, 12, NULL, 'guest_1749792065303_pomi8z1er', '2G2YzndIA6jeWFPBXhUjh5', 'Be My Baby', 'The Ronettes', 'Be My Baby: The Very Best of The Ronettes', 'https://i.scdn.co/image/ab67616d0000b2734694c5b97d3a88efb5fc71b5', NULL, 1, '2025-06-13T05:21:17.034Z', NULL),
(38, 12, NULL, 'guest_1749792065303_pomi8z1er', '5UgT7w6zVZjP3oyawMzbiK', 'The End', 'The Doors', 'The Doors', 'https://i.scdn.co/image/ab67616d0000b2735b96a8c5d61be8878452f8f1', 'Enchanting melody', 1, '2025-06-13T05:21:48.714Z', NULL),
(39, 14, NULL, 'guest_1749804229097_8ai5pnhej', '2374M0fQpWi3dLnB54qaLX', 'Africa', 'TOTO', 'Toto IV', 'https://i.scdn.co/image/ab67616d0000b2734a052b99c042dc15f933145b', 'Karaoke Riga best moment of my life!', 2, '2025-06-13T08:44:55.635Z', NULL),
(40, 14, NULL, 'guest_1749817031069_wdlz0f98y', '29H6RfbiTvLCA4YIGBHLRn', 'Restless Heart', 'Sun City', 'Restless Heart', 'https://i.scdn.co/image/ab67616d0000b27365b716de82afa10b44aa4c9c', 'Saxophone ', 1, '2025-06-13T12:18:40.702Z', NULL),
(46, 14, NULL, 'guest_1749835507847_znpvf0phf', '5GLYtND9tYHCEdIQ1i1JH3', 'The Things That Dreams Are Made Of - Remaster 2002', 'The Human League', 'Dare!', 'https://i.scdn.co/image/ab67616d0000b2735579d8a505c727349a203074', 'Heard at festival!', 1, '2025-06-13T17:25:53.245Z', NULL),
(47, 4, NULL, 'guest_1749841502697_q6fnvtu9x', '1auX4gkGe7hbrOH0BXdpV4', 'Firestarter', 'The Prodigy', 'The Fat of the Land', 'https://i.scdn.co/image/ab67616d0000b2737bb4dd1d02346ec2321a41d6', 'Wild', 1, '2025-06-13T19:05:29.672Z', NULL),
(48, 1, NULL, 'guest_1749877547401_8340mte4s', '7Jh1bpe76CNTCgdgAdBw4Z', 'Heroes - 2017 Remaster', 'David Bowie', '"Heroes" (2017 Remaster)', 'https://i.scdn.co/image/ab67616d0000b273204f41d52743c6a9efd62985', NULL, 1, '2025-06-14T05:06:17.322Z', NULL),
(49, 12, NULL, 'guest_1749877592614_jmqx6ezdi', '7pcg5HSoWI1Yg5Yt8rixG1', 'Sympathy For The Devil', 'The Rolling Stones', 'Hot Rocks 1964-1971', 'https://i.scdn.co/image/ab67616d0000b273b11b3fc3c89477a7dd473bd7', 'Great Lyrics ', 1, '2025-06-14T05:06:50.019Z', NULL),
(50, 23, NULL, 'guest_1749883374754_gfzaad8dt', '5dmYtZVJ1bG9RyrZBRrkOA', 'Moon Safari', 'Air', 'Moon Safari', 'https://i.scdn.co/image/ab67616d0000b2731216e4f7e84af70ef18146ed', NULL, 1, '2025-06-14T06:43:14.063Z', NULL),
(51, 19, NULL, 'guest_1749883831818_u9oc6bkxc', '7j5Q3zhjvpQvMeoPSZwdsa', 'Temptation', 'New Order', 'Substance', 'https://i.scdn.co/image/ab67616d0000b2733c182241fcd86aeca2c68a63', NULL, 1, '2025-06-14T06:50:56.754Z', NULL),
(52, 14, NULL, 'guest_1749938970196_4vq5xwhr4', '18AXbzPzBS8Y3AkgSxzJPb', 'In The Air Tonight - 2015 Remastered', 'Phil Collins', 'Face Value (Deluxe Editon)', 'https://i.scdn.co/image/ab67616d0000b273f6954c1f074f66907a8c5483', NULL, 1, '2025-06-14T22:09:46.500Z', NULL),
(53, 14, NULL, 'guest_1750180970630_hkbd3eaoj', '1YrnDTqvcnUKxAIeXyaEmU', 'How Soon Is Now? - 2011 Remaster', 'The Smiths', 'Hatful of Hollow', 'https://i.scdn.co/image/ab67616d0000b273786b44c75ebf915866523f5b', NULL, 1, '2025-06-17T17:24:50.185Z', NULL),
(54, 14, NULL, 'guest_1750256749810_wjnxmjkz9', '3qDibdWbOVhDK39Klc2dvI', 'Love Is a Stranger', 'Eurythmics, Annie Lennox, Dave Stewart', 'Sweet Dreams (Are Made Of This)', 'https://i.scdn.co/image/ab67616d0000b2730d3ddf8a300b5e135b6b32aa', NULL, 3, '2025-06-18T14:26:07.958Z', NULL),
(55, 14, NULL, 'guest_1751733827457_ypq3jik8t', '1z3ugFmUKoCzGsI6jdY4Ci', 'Like a Prayer', 'Madonna', 'Celebration (double disc version)', 'https://i.scdn.co/image/ab67616d0000b2736b44fa8f5415cc4c945117be', NULL, 1, '2025-07-05T16:44:20.868Z', NULL),
(56, 15, NULL, 'guest_1751744871916_ig2l3yb2o', '6ggJ6MceyHGWtUg1KLp3M1', 'Risingson', 'Massive Attack', 'Mezzanine', 'https://i.scdn.co/image/ab67616d0000b2732fcb0a3c7a66e516b11cd26e', NULL, 1, '2025-07-05T19:48:11.944Z', NULL),
(57, 19, NULL, 'guest_1751994974917_binlkufff', '433EQGQOsQjWvD5eImXkHf', 'This Is the One - Remastered 2009', 'The Stone Roses', 'The Stone Roses', 'https://i.scdn.co/image/ab67616d0000b273cf1f6466a493eb73d6d9d280', NULL, 1, '2025-07-08T17:16:35.762Z', NULL),
(58, 26, NULL, 'guest_1751995189686_3duiocqnw', '5l3TZLe5uEk7vdXbHghZZW', 'Rej', 'Âme', 'Rej EP', 'https://i.scdn.co/image/ab67616d0000b27322484b80ddc3b99e81fc328a', NULL, 1, '2025-07-08T17:20:30.951Z', NULL),
(59, 20, NULL, 'guest_1752088584509_1f77ilbvk', '4rS63BySQrdWuTswkkZ5iS', 'I Feel Love', 'Donna Summer', 'The Dance Collection', 'https://i.scdn.co/image/ab67616d0000b2731c3465800b6c039e4b18adad', NULL, 1, '2025-07-09T19:16:34.696Z', NULL),
(60, 19, NULL, 'guest_1752088629664_pktmm50rf', '6hHc7Pks7wtBIW8Z6A0iFq', 'Blue Monday', 'New Order', 'Substance', 'https://i.scdn.co/image/ab67616d0000b2733c182241fcd86aeca2c68a63', NULL, 1, '2025-07-09T19:17:21.127Z', NULL),
(61, 19, NULL, 'guest_1752088629664_pktmm50rf', '1YrnDTqvcnUKxAIeXyaEmU', 'How Soon Is Now? - 2011 Remaster', 'The Smiths', 'Hatful of Hollow', 'https://i.scdn.co/image/ab67616d0000b273786b44c75ebf915866523f5b', NULL, 1, '2025-07-09T19:18:29.251Z', NULL),
(62, 14, NULL, 'guest_1752657943633_aarngwgvy', '52s6Ea6aSZMvPUIH0dSpk4', 'Mirror Man', 'The Human League', 'Fascination!', 'https://i.scdn.co/image/ab67616d0000b2737c7b937a98ff68bcf7fc24a8', NULL, 1, '2025-07-16T09:26:13.802Z', 'Lynda'),
(63, 4, NULL, 'guest_1753125965105_uk8nfgkvu', '6EMynpZ10GVcwVqiLZj6Ye', 'Champagne Supernova', 'Oasis', '(What''s The Story) Morning Glory?', 'https://i.scdn.co/image/ab67616d0000b2732f2eeee9b405f4d00428d84c', 'heaton park 2025', 2, '2025-07-21T19:26:53.813Z', 'Beni amsterdam'),
(64, 14, NULL, 'guest_1753296103052_ug58h5ehg', '4v2rkl1mC3zVAz0nXMx9r4', 'Heart Of Glass', 'Blondie', 'Parallel Lines', 'https://i.scdn.co/image/ab67616d0000b273ace2bedb8e6cfa04207d5c0f', NULL, 1, '2025-07-23T18:42:06.264Z', 'Dylan Manchester '),
(65, 14, NULL, 'guest_1755719105227_d67co1zzh', '5t09SnxOR2AelOghumKkXO', 'Connected', 'Stereo MC''s', 'Connected', 'https://i.scdn.co/image/ab67616d0000b273b9806cefeba4eb43842e05ab', NULL, 1, '2025-08-20T20:36:08.984Z', 'Graham, Burnley'),
(66, 1, NULL, 'guest_1755722226092_i63gtkep1', '4QpRPgaXc5GmAb32VFUm8p', 'All Together Now', 'The Farm', 'Spartacus', 'https://i.scdn.co/image/ab67616d0000b273b422ae99c55ca88ff01bf139', 'incre3dible', 2, '2025-08-20T20:37:36.001Z', 'Bneni, Amsterdam'),
(67, 1, NULL, 'guest_1755962163958_i4gc6611n', '1CS7Sd1u5tWkstBhpssyjP', 'Take Me to Church', 'Hozier', 'Hozier (Expanded Edition)', 'https://i.scdn.co/image/ab67616d0000b2734ca68d59a4a29c856a4a39c2', 'On the boat', 1, '2025-08-23T15:16:47.978Z', 'Mau Amsterdam ');

-- Reset sequence
SELECT setval('list_entries_id_seq', (SELECT MAX(id) FROM list_entries));

-- =====================================================
-- ENTRY_VOTES (69 records)
-- =====================================================

INSERT INTO entry_votes (id, entry_id, user_id, guest_session_id, vote_direction, voted_at) VALUES
(1, 7, NULL, 'guest_1749741369809_pwid40uxj', 1, '2025-06-12T15:16:42.451Z'),
(2, 7, NULL, 'guest_1749741369809_pwid40uxj', 1, '2025-06-12T15:16:45.750Z'),
(4, 13, NULL, 'guest_1749743999251_47y2a8w7u', 1, '2025-06-12T16:00:17.141Z'),
(5, 13, NULL, 'guest_1749743999251_47y2a8w7u', 1, '2025-06-12T16:00:22.244Z'),
(6, 13, NULL, 'guest_1749744867652_vcfr3t5v9', 1, '2025-06-12T16:14:41.453Z'),
(7, 13, NULL, 'guest_1749744867652_vcfr3t5v9', -1, '2025-06-12T16:14:43.829Z'),
(8, 13, NULL, 'guest_1749744867652_vcfr3t5v9', -1, '2025-06-12T16:14:44.849Z'),
(9, 13, NULL, 'guest_1749744867652_vcfr3t5v9', -1, '2025-06-12T16:14:45.825Z'),
(10, 13, NULL, 'guest_1749744867652_vcfr3t5v9', 1, '2025-06-12T16:14:47.886Z'),
(11, 13, NULL, 'guest_1749744867652_vcfr3t5v9', 1, '2025-06-12T16:14:49.103Z'),
(12, 14, NULL, 'guest_1749744867652_vcfr3t5v9', 1, '2025-06-12T16:15:54.103Z'),
(13, 14, NULL, 'guest_1749744867652_vcfr3t5v9', 1, '2025-06-12T16:15:55.157Z'),
(14, 13, NULL, 'guest_1749744867652_vcfr3t5v9', 1, '2025-06-12T16:15:55.674Z'),
(15, 14, NULL, 'guest_1749744867652_vcfr3t5v9', 1, '2025-06-12T16:15:56.341Z'),
(16, 14, NULL, 'guest_1749745062652_kt6u6gdqg', 1, '2025-06-12T16:17:48.695Z'),
(17, 14, NULL, 'guest_1749747779903_yr9cjduva', -1, '2025-06-12T17:03:56.818Z'),
(18, 14, NULL, 'guest_1749747779903_yr9cjduva', -1, '2025-06-12T17:03:57.323Z'),
(19, 13, NULL, 'guest_1749747779903_yr9cjduva', -1, '2025-06-12T17:03:58.474Z'),
(20, 14, NULL, 'guest_1749747779903_yr9cjduva', -1, '2025-06-12T17:03:59.807Z'),
(21, 13, NULL, 'guest_1749747779903_yr9cjduva', -1, '2025-06-12T17:04:00.579Z'),
(22, 17, NULL, 'guest_1749747779903_yr9cjduva', -1, '2025-06-12T17:04:02.217Z'),
(23, 17, NULL, 'guest_1749747779903_yr9cjduva', 1, '2025-06-12T17:04:06.188Z'),
(24, 17, NULL, 'guest_1749747779903_yr9cjduva', 1, '2025-06-12T17:04:07.944Z'),
(25, 14, NULL, 'guest_1749747779903_yr9cjduva', -1, '2025-06-12T17:04:11.573Z'),
(26, 17, NULL, 'guest_1749747779903_yr9cjduva', 1, '2025-06-12T17:04:15.818Z'),
(27, 14, NULL, 'guest_1749747779903_yr9cjduva', -1, '2025-06-12T17:04:21.316Z'),
(28, 14, NULL, 'guest_1749747779903_yr9cjduva', -1, '2025-06-12T17:04:24.434Z'),
(29, 18, NULL, 'guest_1749747779903_yr9cjduva', 1, '2025-06-12T17:12:26.580Z'),
(30, 18, NULL, 'guest_1749747779903_yr9cjduva', 1, '2025-06-12T17:12:34.927Z'),
(31, 16, NULL, 'guest_1749747779903_yr9cjduva', 1, '2025-06-12T17:12:39.461Z'),
(32, 13, NULL, 'guest_1749747779903_yr9cjduva', 1, '2025-06-12T17:12:41.687Z'),
(33, 22, NULL, 'guest_1749748652397_rgtirv6ol', 1, '2025-06-12T17:18:04.765Z'),
(34, 22, NULL, 'guest_1749748652397_rgtirv6ol', 1, '2025-06-12T17:18:07.230Z'),
(35, 22, NULL, 'guest_1749748652397_rgtirv6ol', 1, '2025-06-12T17:18:09.584Z'),
(36, 22, NULL, 'guest_1749750174429_8f6xibqw3', -1, '2025-06-12T17:42:58.959Z'),
(37, 25, NULL, 'guest_1749750189797_kgty98l9f', 1, '2025-06-12T17:43:49.445Z'),
(38, 25, NULL, 'guest_1749750189797_kgty98l9f', 1, '2025-06-12T17:43:53.651Z'),
(39, 24, NULL, 'guest_1749750189797_kgty98l9f', 1, '2025-06-12T17:43:59.563Z'),
(40, 14, NULL, 'guest_1749751673859_ad2qzbeq9', -1, '2025-06-12T18:08:16.935Z'),
(41, 7, NULL, 'guest_1749754296866_ldnjbcyq4', 1, '2025-06-12T18:51:42.108Z'),
(42, 22, NULL, 'guest_1749754296866_ldnjbcyq4', -1, '2025-06-12T18:51:45.933Z'),
(43, 13, NULL, 'guest_1749758998908_qahi1f9km', 1, '2025-06-12T20:11:09.206Z'),
(44, 13, NULL, 'guest_1749758998908_qahi1f9km', -1, '2025-06-12T20:11:10.041Z'),
(45, 13, NULL, 'guest_1749758998908_qahi1f9km', 1, '2025-06-12T20:11:15.380Z'),
(46, 14, NULL, 'guest_1749758998908_qahi1f9km', -1, '2025-06-12T20:11:32.864Z'),
(47, 19, NULL, 'guest_1749758998908_qahi1f9km', 1, '2025-06-12T20:11:37.223Z'),
(54, 13, NULL, 'guest_1749843761161_yntzxe79d', 1, '2025-06-13T19:42:57.191Z'),
(55, 39, NULL, 'guest_1749843761161_yntzxe79d', 1, '2025-06-13T19:43:04.615Z'),
(56, 21, NULL, 'guest_1749843761161_yntzxe79d', 1, '2025-06-13T19:43:15.264Z'),
(57, 19, NULL, 'guest_1749843761161_yntzxe79d', 1, '2025-06-13T19:43:25.544Z'),
(58, 14, NULL, 'guest_1749843761161_yntzxe79d', -1, '2025-06-13T19:43:41.112Z'),
(59, 22, NULL, 'guest_1750105351323_ii6hi0qmv', -1, '2025-06-16T20:22:36.145Z'),
(60, 16, NULL, 'guest_1750180970630_hkbd3eaoj', 1, '2025-06-17T17:23:37.099Z'),
(61, 13, NULL, 'guest_1750180970630_hkbd3eaoj', 1, '2025-06-17T17:23:40.942Z'),
(62, 53, NULL, 'guest_1750180970630_hkbd3eaoj', 1, '2025-06-17T17:25:00.516Z'),
(63, 7, NULL, 'guest_1750181156370_fcswm5jsy', 1, '2025-06-17T17:25:57.675Z'),
(64, 48, NULL, 'guest_1750181156370_fcswm5jsy', 1, '2025-06-17T17:25:59.396Z'),
(65, 54, NULL, 'guest_1750256749810_wjnxmjkz9', 1, '2025-06-18T14:26:14.714Z'),
(66, 46, NULL, 'guest_1750256749810_wjnxmjkz9', 1, '2025-06-18T14:26:19.763Z'),
(67, 39, NULL, 'guest_1750256749810_wjnxmjkz9', 1, '2025-06-18T14:26:25.064Z'),
(68, 14, NULL, 'guest_1751312946749_fphobzgdu', -1, '2025-06-30T19:49:21.282Z'),
(69, 18, NULL, 'guest_1751733827457_ypq3jik8t', 1, '2025-07-05T16:44:24.485Z'),
(70, 54, NULL, 'guest_1751733827457_ypq3jik8t', 1, '2025-07-05T16:44:29.634Z'),
(71, 54, NULL, 'guest_1751746429528_ju3ld1za8', 1, '2025-07-05T20:13:57.347Z'),
(72, 63, NULL, 'guest_1753125965105_uk8nfgkvu', 1, '2025-07-21T19:27:04.030Z'),
(73, 63, NULL, 'guest_1753126029556_rcjxmy53g', 1, '2025-07-21T19:27:10.990Z'),
(74, 66, NULL, 'guest_1755722226092_i63gtkep1', 1, '2025-08-20T20:37:40.319Z'),
(75, 66, NULL, 'guest_1755722263163_akcfocq3p', 1, '2025-08-20T20:37:46.030Z'),
(76, 7, NULL, 'guest_1755722263163_akcfocq3p', -1, '2025-08-20T20:37:52.306Z');

-- Reset sequence
SELECT setval('entry_votes_id_seq', (SELECT MAX(id) FROM entry_votes));

-- =====================================================
-- GAME_ROOMS (75 records)
-- =====================================================

INSERT INTO game_rooms (id, code, game_type, theme, host_nickname, is_active, created_at, user_id) VALUES
(1, 'Y3GIIC', 'mixtape', 'Road Trip', 'TestHost', true, '2025-06-10T16:54:30.161Z', NULL),
(2, 'PIIKP0', 'mixtape', 'Guilty Pleasures', 'Host', true, '2025-06-10T16:58:55.697Z', NULL),
(3, 'S1XKTR', 'jam-session', 'Focus Time', 'Host', true, '2025-06-10T17:01:23.718Z', NULL),
(4, 'W3TH5O', 'mixtape', 'Guilty Pleasures', 'Host', true, '2025-06-10T18:36:26.246Z', NULL),
(5, 'OFJ1DE', 'jam-session', 'Focus Time', 'Host', true, '2025-06-10T19:39:45.129Z', NULL),
(6, 'VC6228', 'mixtape', 'Road Trip Classics', 'Host', true, '2025-06-10T19:45:03.971Z', NULL),
(7, 'DNY0VJ', 'desert-island', 'Life Soundtrack', 'Host', true, '2025-06-10T19:47:12.251Z', NULL),
(8, '6SI09V', 'desert-island', 'My Musical DNA', 'Host', true, '2025-06-10T20:06:58.818Z', NULL),
(9, 'QK1490', 'desert-island', 'Musical Essentials', 'Host', true, '2025-06-10T20:11:46.106Z', NULL),
(10, 'DS6N17', 'mixtape', '90s Hits', 'Host', true, '2025-06-10T20:24:04.584Z', NULL),
(11, 'NPNPYQ', 'mixtape', 'Guilty Pleasures', 'Host', true, '2025-06-10T20:25:27.557Z', NULL),
(12, '3SOY0K', 'mixtape', 'Road Trip Classics', 'Host', true, '2025-06-10T20:27:26.792Z', NULL),
(13, 'ECBJVG', 'mixtape', 'Guilty Pleasures', 'Host', true, '2025-06-10T20:31:49.348Z', NULL),
(14, '8B4D39', 'desert-island', 'My Musical DNA', 'TestUser', true, '2025-06-10T20:37:26.698Z', NULL),
(15, 'H2XQC4', 'mixtape', 'Road Trip Classics', 'Host', true, '2025-06-10T21:16:44.137Z', NULL),
(16, '8CARCW', 'mixtape', 'Guilty Pleasures', 'Host', true, '2025-06-11T05:20:36.204Z', NULL),
(17, 'CPV3B5', 'desert-island', 'Musical Essentials', 'Host', true, '2025-06-11T13:31:36.271Z', NULL),
(18, '9LBP6E', 'mixtape', 'Guilty Pleasures', 'Host', true, '2025-06-11T13:40:26.976Z', NULL),
(19, '0O7LJN', 'mixtape', 'Guilty Pleasures', 'Host', true, '2025-06-11T16:55:27.180Z', NULL),
(20, 'Q15XLG', 'ai-host', 'AI Music Discovery', 'Host', true, '2025-06-11T17:48:55.439Z', NULL),
(21, 'Y326MY', 'ai-host', 'Perfect Moment Together', 'Host', true, '2025-06-11T17:59:22.154Z', NULL),
(22, 'ICM1CG', 'mixtape', '90s Nostalgia', 'Host', true, '2025-06-11T19:05:02.985Z', NULL),
(23, 'LUD9EE', 'mixtape', 'Musical Essentials', 'Host', true, '2025-06-11T19:07:43.897Z', NULL),
(24, '55PTRX', 'mixtape', 'Musical Essentials', 'Host', true, '2025-06-11T19:07:53.510Z', NULL),
(25, 'EXI6J7', 'desert-island', 'Musical Essentials', 'Host', true, '2025-06-11T19:28:19.117Z', NULL),
(26, 'WU8MYL', 'mixtape', 'Songs That Make Us Unstoppable', 'Host', true, '2025-06-11T19:31:49.845Z', NULL),
(27, 'GNMR22', 'jam-session', 'Victory Celebration', 'Ben', true, '2025-06-11T19:32:56.389Z', NULL),
(28, 'BK6ILX', 'jam-session', 'Workout Motivation', 'Host', true, '2025-06-11T20:39:09.188Z', NULL),
(29, 'ACP10Q', 'mixtape', 'Guilty Pleasures', 'Host', true, '2025-06-11T22:08:00.285Z', NULL),
(30, 'P9B5P4', 'mixtape', 'Road Trip Vibes', 'Host', true, '2025-06-11T22:12:20.903Z', NULL),
(31, '7U41AK', 'mixtape', 'Road Trip Vibes', 'Host', true, '2025-06-12T08:10:37.370Z', NULL),
(32, 'ZEMJL0', 'mixtape', 'Guilty Pleasures', 'Host', true, '2025-06-12T08:11:23.255Z', NULL),
(33, '06RYV3', 'mixtape', 'Guilty Pleasures', 'Host', true, '2025-06-12T11:59:48.228Z', NULL),
(34, 'BMWUTL', 'mixtape', 'Guilty Pleasures', 'Host', true, '2025-06-12T12:10:12.294Z', NULL),
(35, 'VOSUOJ', 'mixtape', 'Songs That Make You Dance', 'Host', true, '2025-06-12T12:10:43.946Z', NULL),
(36, '8SDRGI', 'desert-island', 'Musical Essentials', 'Host', true, '2025-06-12T12:53:30.127Z', NULL),
(37, 'EV0ZHQ', 'mixtape', 'Road Trip Vibes', 'Host', true, '2025-06-12T13:23:33.721Z', NULL),
(38, '3KRHN9', 'mixtape', 'Road Trip Vibes', 'Host', true, '2025-06-12T16:33:50.745Z', NULL),
(39, '8II8NZ', 'mixtape', 'Guilty Pleasures', 'Host', true, '2025-06-12T16:34:06.253Z', NULL),
(40, '4J5NU8', 'desert-island', 'Musical Essentials', 'Host', true, '2025-06-12T18:21:52.135Z', NULL),
(41, '74YEWJ', 'mixtape', 'Guilty Pleasures', 'Host', true, '2025-06-12T18:52:22.014Z', NULL),
(42, 'O5O1JC', 'mixtape', 'Guilty Pleasures', 'Host', true, '2025-06-13T05:22:36.412Z', NULL),
(43, '3E465G', 'guess-who', 'Secret Favorites', 'Host', true, '2025-06-13T16:53:42.754Z', NULL),
(44, '0A139B', 'guess-who', 'Guilty Pleasures', 'Host', true, '2025-06-13T17:04:51.937Z', NULL),
(45, 'RXEIR7', 'desert-island', 'Musical Essentials', 'Host', true, '2025-06-13T17:15:02.652Z', NULL),
(46, 'L16B6R', 'desert-island', 'Musical Essentials', 'Host', true, '2025-06-13T17:17:02.865Z', NULL),
(47, 'BKWPIO', 'desert-island', 'Musical Essentials', 'Host', true, '2025-06-13T19:05:59.847Z', NULL),
(48, '9W6DIN', 'desert-island', 'Musical Essentials', 'Host', true, '2025-06-13T19:10:27.524Z', NULL),
(49, 'T8YYOF', 'jam-session', 'Road trip', 'Host', true, '2025-06-14T08:54:52.321Z', NULL),
(50, 'R34KRL', 'jam-session', 'Road trip', 'Host', true, '2025-06-14T14:05:09.499Z', NULL),
(51, 'KKLTNK', 'desert-island', 'Musical Essentials', 'Host', true, '2025-06-14T18:12:12.131Z', NULL),
(52, '6VFDY4', 'desert-island', 'Musical Essentials', 'Host', true, '2025-06-14T18:12:14.244Z', NULL),
(53, 'TEJ7Z9', 'desert-island', 'Musical Essentials', 'Host', true, '2025-06-14T18:12:16.225Z', NULL),
(54, '8H8VDQ', 'guess-who', 'Guilty Pleasures', 'Host', true, '2025-06-16T20:23:11.714Z', NULL),
(55, '1P81ZC', 'guess-who', 'Decade Mix', 'Host', true, '2025-06-29T08:21:03.549Z', NULL),
(56, 'RQ779G', 'guess-who', 'Guilty Pleasures', 'Host', true, '2025-06-30T19:36:48.870Z', NULL),
(57, 'J3XJPL', 'desert-island', 'Musical Essentials', 'Host', true, '2025-07-05T16:42:46.056Z', NULL),
(58, 'WUFB89', 'jam-session', 'Favourite 80s songs', 'Host', true, '2025-07-05T16:43:17.263Z', NULL),
(59, '8BAJY9', 'jam-session', '90s Hip Hop', 'Host', true, '2025-07-05T16:53:53.556Z', NULL),
(60, 'V151RL', 'soundtrack', '90s hip hop', 'Host', true, '2025-07-05T16:54:30.289Z', NULL),
(61, 'Q1MAM9', 'jam-session', '90s hip hop', 'Host', true, '2025-07-05T16:54:56.150Z', NULL),
(62, 'JCIKVL', 'jam-sessions', 'Sunday morning chillers', 'Host', true, '2025-07-06T11:10:01.650Z', NULL),
(63, 'UT9O9N', 'jam-sessions', 'Road trip', 'Host', true, '2025-07-06T11:10:30.143Z', NULL),
(64, 'NAM492', 'jam-sessions', 'Sunday morning chillers', 'Host', true, '2025-07-06T11:13:23.416Z', NULL),
(65, '68KUI8', 'jam-sessions', 'Test Game for Dashboard', 'TestHost', true, '2025-07-06T11:16:55.426Z', NULL),
(66, '7U6OQU', 'jam-sessions', 'Road trip', 'Host', true, '2025-07-06T11:21:12.600Z', NULL),
(67, '3TR2EL', 'jam-sessions', 'Road trip', 'Host', true, '2025-07-06T11:30:14.904Z', NULL),
(68, 'LLWHH7', 'desert-island', 'Musical Essentials', 'Host', true, '2025-07-06T13:59:48.784Z', NULL),
(69, 'AJ7G1J', 'jam-sessions', '90s dance anthems', 'Host', true, '2025-07-08T17:17:25.006Z', NULL),
(70, 'JS7JEM', 'jam-sessions', 'Road trip vibes', 'Host', true, '2025-07-08T17:22:23.528Z', NULL),
(71, 'X4PZ23', 'desert-island', 'Musical Essentials', 'Host', true, '2025-07-08T17:22:37.014Z', NULL),
(72, '9F7RQQ', 'jam-sessions', '80s classics ', 'Host', true, '2025-07-23T18:40:03.819Z', NULL),
(73, '7VYJZS', 'jam-sessions', '89s', 'Host', true, '2025-08-01T14:55:01.849Z', NULL),
(74, 'RJZ9MZ', 'jam-sessions', 'Road trip', 'Host', true, '2025-08-23T15:12:31.725Z', NULL),
(75, '59L9DK', 'jam-sessions', 'Road trip', 'Host', true, '2025-10-01T11:44:48.062Z', NULL);

-- Reset sequence
SELECT setval('game_rooms_id_seq', (SELECT MAX(id) FROM game_rooms));

-- =====================================================
-- PLAYERS (60 records)
-- =====================================================

INSERT INTO players (id, nickname, game_room_id, is_host, joined_at) VALUES
(1, 'ben', 3, true, '2025-06-10T17:01:28.996Z'),
(2, 'Ben', 4, true, '2025-06-10T18:36:36.900Z'),
(3, 'Ben', 4, true, '2025-06-10T18:37:06.439Z'),
(4, 'Suki', 4, true, '2025-06-10T18:37:22.069Z'),
(5, 'Ben', 6, true, '2025-06-10T19:45:08.393Z'),
(6, 'Ben', 7, true, '2025-06-10T19:47:16.915Z'),
(7, 'Ben', 4, true, '2025-06-10T20:06:20.619Z'),
(8, 'Ben', 8, true, '2025-06-10T20:07:02.592Z'),
(9, 'Be', 9, true, '2025-06-10T20:11:49.902Z'),
(10, 'Beni', 11, true, '2025-06-10T20:25:31.243Z'),
(11, 'Ben', 12, true, '2025-06-10T20:27:30.140Z'),
(12, 'Gobi', 13, true, '2025-06-10T20:31:57.284Z'),
(13, 'UXTester', 14, true, '2025-06-10T20:37:48.841Z'),
(14, 'Simon Trowel', 15, true, '2025-06-10T21:17:01.259Z'),
(15, 'Beni', 16, true, '2025-06-11T05:20:40.424Z'),
(16, 'Dylan', 17, true, '2025-06-11T13:31:40.107Z'),
(17, 'Ben', 18, true, '2025-06-11T13:40:29.763Z'),
(18, 'beni', 19, true, '2025-06-11T16:55:31.580Z'),
(19, 'ben', 20, true, '2025-06-11T17:49:01.230Z'),
(20, 'Ben', 21, true, '2025-06-11T17:59:24.848Z'),
(21, 'Donnie', 22, true, '2025-06-11T19:05:07.157Z'),
(22, 'ben', 23, true, '2025-06-11T19:07:47.431Z'),
(23, 'ben', 25, true, '2025-06-11T19:28:22.666Z'),
(24, 'Ben', 26, true, '2025-06-11T19:31:53.103Z'),
(25, 'ROnnie', 28, true, '2025-06-11T20:39:13.138Z'),
(26, 'Billie', 28, true, '2025-06-11T20:39:40.875Z'),
(27, 'Bobbie', 28, true, '2025-06-11T20:40:22.441Z'),
(28, 'Richard Spring', 29, true, '2025-06-11T22:08:25.174Z'),
(29, 'Jonny Rotten', 30, true, '2025-06-11T22:12:40.253Z'),
(30, 'Ben', 31, true, '2025-06-12T08:10:41.446Z'),
(31, 'bemn', 32, true, '2025-06-12T08:11:26.330Z'),
(32, 'Ben', 31, true, '2025-06-12T11:40:34.116Z'),
(33, 'Carrie', 35, true, '2025-06-12T12:10:48.270Z'),
(34, 'Ben', 37, true, '2025-06-12T13:23:36.360Z'),
(35, 'Ben', 38, true, '2025-06-12T16:33:53.724Z'),
(36, 'Jon', 39, true, '2025-06-12T16:34:09.520Z'),
(37, 'Beni', 40, true, '2025-06-12T18:21:57.819Z'),
(38, 'Ben', 42, true, '2025-06-13T05:22:39.636Z'),
(39, 'Ben', 44, true, '2025-06-13T17:04:55.002Z'),
(40, 'Ben', 45, true, '2025-06-13T17:15:05.975Z'),
(41, 'Doris Johnson', 49, true, '2025-06-14T08:55:13.031Z'),
(42, 'Daan', 50, true, '2025-06-14T14:05:14.500Z'),
(43, 'Beni', 54, true, '2025-06-16T20:23:16.425Z'),
(44, 'Beni', 54, true, '2025-06-18T14:25:38.205Z'),
(45, 'Beni', 55, true, '2025-06-29T08:21:06.966Z'),
(46, 'Beni', 56, true, '2025-06-30T19:36:51.777Z'),
(47, 'beni', 57, true, '2025-07-05T16:42:51.210Z'),
(48, 'beni', 58, true, '2025-07-05T16:43:20.320Z'),
(49, 'eric', 59, true, '2025-07-05T16:53:58.332Z'),
(50, 'Beni', 61, true, '2025-07-05T16:55:02.622Z'),
(51, 'Eric', 61, true, '2025-07-05T16:56:22.144Z'),
(52, 'Ben', 61, true, '2025-07-05T19:34:48.622Z'),
(53, 'Ben', 62, true, '2025-07-06T11:10:06.392Z'),
(54, 'Kat', 68, true, '2025-07-06T13:59:53.975Z'),
(55, 'Kat', 68, true, '2025-07-06T14:00:02.710Z'),
(56, 'beni', 69, true, '2025-07-08T17:17:28.594Z'),
(57, 'Ben', 72, true, '2025-07-23T18:40:08.149Z'),
(58, 'Benu', 73, true, '2025-08-01T14:55:06.664Z'),
(59, 'Ben', 74, true, '2025-08-23T15:12:35.334Z'),
(60, 'Ben', 75, true, '2025-10-01T11:44:52.692Z');

-- Reset sequence
SELECT setval('players_id_seq', (SELECT MAX(id) FROM players));

-- =====================================================
-- SONGS (57 records)
-- =====================================================

INSERT INTO songs (id, title, artist, game_room_id, player_id, story, added_at, spotify_id, album, image_url, preview_url) VALUES
(1, 'Pure Shores', 'All Saints', 3, 1, '', '2025-06-10T17:02:30.025Z', '3kiWQEyFtBysjZwj6PtrDu', 'Fredagsmys', 'https://i.scdn.co/image/ab67616d0000b2732161da99efcc352cf8cc5534', ''),
(2, 'Ice Ice Baby', 'Vanilla Ice', 3, 1, '', '2025-06-10T17:02:49.065Z', '3XVozq1aeqsJwpXrEZrDJ9', 'Vanilla Ice Is Back! - Hip Hop Classics', 'https://i.scdn.co/image/ab67616d0000b2730d441bd2334134eca6761fc4', ''),
(3, 'Road Trippin''', 'Red Hot Chili Peppers', 6, 5, '', '2025-06-10T19:45:31.920Z', '7Gpr3kKk4BMgItz6UbI73q', 'Californication', 'https://i.scdn.co/image/ab67616d0000b273a9249ebb15ca7a5b75f16a90', ''),
(4, 'Be My Baby', 'The Ronettes', 6, 5, '', '2025-06-10T19:45:49.641Z', '2G2YzndIA6jeWFPBXhUjh5', 'Be My Baby: The Very Best of The Ronettes', 'https://i.scdn.co/image/ab67616d0000b2734694c5b97d3a88efb5fc71b5', ''),
(5, 'Road Trippin''', 'Red Hot Chili Peppers', 11, 10, '', '2025-06-10T20:25:41.833Z', '7Gpr3kKk4BMgItz6UbI73q', 'Californication', 'https://i.scdn.co/image/ab67616d0000b273a9249ebb15ca7a5b75f16a90', ''),
(6, 'не расслабляйся', 'Skryptonite', 12, 11, '', '2025-06-10T20:27:44.984Z', '6KBc9W1riUD5zXv29eIVop', 'не расслабляйся', 'https://i.scdn.co/image/ab67616d0000b273857e4905e57fb3aa33ba5717', ''),
(7, 'Pure Shores', 'All Saints', 13, 12, '', '2025-06-10T20:32:10.634Z', '4mjLAbsWBCuqSOqMvaPkXd', 'Pure Shores', 'https://i.scdn.co/image/ab67616d0000b2738722929540f0b99a7a7efc88', ''),
(8, 'Weird Fishes / Arpeggi', 'Radiohead', 15, 14, '', '2025-06-10T21:17:33.674Z', '4wajJ1o7jWIg62YqpkHC7S', 'In Rainbows', 'https://i.scdn.co/image/ab67616d0000b273de3c04b5fc750b68899b20a9', ''),
(9, 'I Still Haven''t Found What I''m Looking For', 'U2', 16, 15, '', '2025-06-11T05:20:59.107Z', '6wpGqhRvJGNNXwWlPmkMyO', 'The Joshua Tree (Super Deluxe)', 'https://i.scdn.co/image/ab67616d0000b273b7bea3d01f04e6d0408d2afe', ''),
(10, 'Like a Rolling Stone', 'Bob Dylan', 17, 16, 'A song for your head - something that makes you think: ', '2025-06-11T13:31:56.679Z', '3AhXZa8sUQht0UEdBJgpGc', 'Highway 61 Revisited', 'https://i.scdn.co/image/ab67616d0000b27341720ef0ae31e10d39e43ca2', ''),
(11, 'All Together Now', 'The Farm', 17, 16, 'A song for your heart - something that moves you emotionally: ', '2025-06-11T13:32:30.582Z', '4QpRPgaXc5GmAb32VFUm8p', 'Spartacus', 'https://i.scdn.co/image/ab67616d0000b273b422ae99c55ca88ff01bf139', ''),
(12, 'I Feel Love', 'Donna Summer', 17, 16, 'A song for your feet - something that makes you want to move: ', '2025-06-11T13:33:00.226Z', '4rS63BySQrdWuTswkkZ5iS', 'The Dance Collection', 'https://i.scdn.co/image/ab67616d0000b2731c3465800b6c039e4b18adad', ''),
(13, 'Love Is The Drug', 'Roxy Music', 18, 17, '', '2025-06-11T13:40:46.098Z', '3wtMkvedoWMQ3XTKv7tqcZ', 'Siren', 'https://i.scdn.co/image/ab67616d0000b27362568953d4c4141c140df9ba', ''),
(14, 'Never Ever', 'All Saints', 18, 17, '', '2025-06-11T13:41:06.121Z', '7ziHnshbknkpFLDW5yGBjO', 'All Saints', 'https://i.scdn.co/image/ab67616d0000b2734245f996f39eb4e9b2eefef8', ''),
(15, 'Never Ever', 'All Saints', 19, 18, '', '2025-06-11T16:55:41.286Z', '7ziHnshbknkpFLDW5yGBjO', 'All Saints', 'https://i.scdn.co/image/ab67616d0000b2734245f996f39eb4e9b2eefef8', ''),
(16, 'Love Is in the Air', 'John Paul Young', 19, 18, '', '2025-06-11T16:55:56.640Z', '4v2K1ZcRXUc87CLtEXI3Pf', 'Classic Hits', 'https://i.scdn.co/image/ab67616d0000b27394296e9c72ad8ba4c3ba7c56', ''),
(17, 'Never Ever', 'All Saints', 22, 21, '', '2025-06-11T19:05:17.850Z', '7ziHnshbknkpFLDW5yGBjO', 'All Saints', 'https://i.scdn.co/image/ab67616d0000b2734245f996f39eb4e9b2eefef8', ''),
(18, 'Creep', 'Radiohead', 25, 23, 'A song for your head - something that makes you think: ', '2025-06-11T19:28:37.352Z', '70LcF31zb1H0PyJoS1Sx1r', 'Pablo Honey', 'https://i.scdn.co/image/ab67616d0000b273ec548c00d3ac2f10be73366d', ''),
(19, 'Never Ever', 'All Saints', 25, 23, 'A song for your head - something that makes you think: ', '2025-06-11T19:28:54.447Z', '7ziHnshbknkpFLDW5yGBjO', 'All Saints', 'https://i.scdn.co/image/ab67616d0000b2734245f996f39eb4e9b2eefef8', ''),
(20, 'All Together Now', 'The Farm', 25, 23, 'A song for your heart - something that moves you emotionally: ', '2025-06-11T19:29:12.668Z', '4QpRPgaXc5GmAb32VFUm8p', 'Spartacus', 'https://i.scdn.co/image/ab67616d0000b273b422ae99c55ca88ff01bf139', ''),
(21, 'I Feel Love', 'Donna Summer', 25, 23, 'A song for your feet - something that makes you want to move: ', '2025-06-11T19:29:22.942Z', '4rS63BySQrdWuTswkkZ5iS', 'The Dance Collection', 'https://i.scdn.co/image/ab67616d0000b2731c3465800b6c039e4b18adad', ''),
(22, 'Pure Shores', 'All Saints', 25, 23, 'Your guilty pleasure - a song you love but might be embarrassed to admit: ', '2025-06-11T19:29:35.310Z', '3kiWQEyFtBysjZwj6PtrDu', 'Fredagsmys', 'https://i.scdn.co/image/ab67616d0000b2732161da99efcc352cf8cc5534', ''),
(23, 'DomeShuffle', 'STMG DemGuyz', 28, 26, '', '2025-06-11T20:39:51.125Z', '6PnyMfUwWslSSnup9ug9BO', 'DomeShuffle', 'https://i.scdn.co/image/ab67616d0000b273e107021984a749654f91aea9', ''),
(24, 'ballsack lessons freestyle', 'yung baseball', 28, 26, '', '2025-06-11T20:40:06.052Z', '63ORFXOdRAxUknUrkrFyhB', 'ballsack lessons freestyle', 'https://i.scdn.co/image/ab67616d0000b273e48cfd8fb93e98603c6406b9', ''),
(25, 'Mr Blobby', 'Kidzone', 29, 28, '', '2025-06-11T22:09:01.192Z', '2BuoGUyZjMqDbQj9jDub7E', 'Kidz Dance', 'https://i.scdn.co/image/ab67616d0000b27316cdf99cb2fb60fc63f6232a', ''),
(26, 'Agadoo', 'Black Lace', 29, 28, '', '2025-06-11T22:09:27.309Z', '7vpWDeKqM6sVTpt2WAdpY1', '20 All Time Party Favourites', 'https://i.scdn.co/image/ab67616d0000b273993345dc4acd6ce583937bde', ''),
(27, 'Jigsaw Falling Into Place', 'Radiohead', 30, 29, '', '2025-06-11T22:13:01.644Z', '0YJ9FWWHn9EfnN0lHwbzvV', 'In Rainbows', 'https://i.scdn.co/image/ab67616d0000b273de3c04b5fc750b68899b20a9', ''),
(28, 'Anarchy in the U.K.', 'Sex Pistols', 30, 29, '', '2025-06-11T22:13:14.229Z', '3LoDeIbiR12sAznmpNEmKA', 'Never Mind The Bollocks, Here''s The Sex Pistols', 'https://i.scdn.co/image/ab67616d0000b273d0f19de33459c832e50d6ecd', ''),
(29, 'Gimme Shelter', 'The Rolling Stones', 30, 29, '', '2025-06-11T22:14:16.688Z', '6H3kDe7CGoWYBabAeVWGiD', 'Let It Bleed', 'https://i.scdn.co/image/ab67616d0000b2732af30c881bb23cfb82a8cf99', ''),
(30, 'Wannabe', 'Spice Girls', 31, 30, '', '2025-06-12T08:10:55.474Z', '1Je1IMUlBXcx1Fz0WE7oPT', 'Spice', 'https://i.scdn.co/image/ab67616d0000b27363facc42e4a35eb3aa182b59', ''),
(31, 'It''s Like That', 'Run–D.M.C., Jason Nevins', 35, 33, '', '2025-06-12T12:11:22.970Z', '5bYN7ttTmfpZYDgEqRF9sT', '90s 100 Hits', 'https://i.scdn.co/image/ab67616d0000b273b212e660aec81b60a425d4f1', ''),
(32, 'Pure Shores', 'All Saints', 37, 34, '', '2025-06-12T13:24:01.208Z', '4mjLAbsWBCuqSOqMvaPkXd', 'Pure Shores', 'https://i.scdn.co/image/ab67616d0000b2738722929540f0b99a7a7efc88', ''),
(33, 'All The Way (feat. Bailey Zimmerman)', 'BigXthaPlug, Bailey Zimmerman', 42, 38, '', '2025-06-13T05:22:48.478Z', '73kIKvg65QWieOKXIwyLJP', 'All The Way (feat. Bailey Zimmerman)', 'https://i.scdn.co/image/ab67616d0000b273eedca2962d36208f21037d62', ''),
(34, 'Never Ever', 'All Saints', 44, 39, '', '2025-06-13T17:05:03.506Z', '7ziHnshbknkpFLDW5yGBjO', 'All Saints', 'https://i.scdn.co/image/ab67616d0000b2734245f996f39eb4e9b2eefef8', ''),
(35, 'No Surprises', 'Radiohead', 45, 40, 'A song for your head - something that makes you think: ', '2025-06-13T17:15:20.136Z', '10nyNJ6zNy2YVYLrcwLccB', 'OK Computer', 'https://i.scdn.co/image/ab67616d0000b273c8b444df094279e70d0ed856', ''),
(36, 'I Feel Love', 'Donna Summer', 45, 40, 'A song for your head - something that makes you think: ', '2025-06-13T17:15:29.668Z', '4rS63BySQrdWuTswkkZ5iS', 'The Dance Collection', 'https://i.scdn.co/image/ab67616d0000b2731c3465800b6c039e4b18adad', ''),
(37, 'Under The Moon Of Love', 'Showaddywaddy', 49, 41, '', '2025-06-14T08:55:43.571Z', '5gcyE6Ny8pPMwXzIudBYVy', 'Under The Moon Of Love (as featured in "Lesbian Vampire Killers" movie)', 'https://i.scdn.co/image/ab67616d0000b273806c3e809daf4f00931abf90', ''),
(38, 'Roadhouse Blues', 'The Doors', 50, 42, '', '2025-06-14T14:05:36.045Z', '1Q5kgpp4pmyGqPwNBzkSrw', 'Morrison Hotel', 'https://i.scdn.co/image/ab67616d0000b273f12a8a7e0b2cbe16d2bef4dc', ''),
(39, 'Never Ever', 'All Saints', 54, 43, 'fefee', '2025-06-16T20:23:30.010Z', '7ziHnshbknkpFLDW5yGBjO', 'All Saints', 'https://i.scdn.co/image/ab67616d0000b2734245f996f39eb4e9b2eefef8', ''),
(40, 'Love Is in the Air', 'John Paul Young', 54, 43, 'ffrfrf', '2025-06-16T20:23:44.740Z', '4v2K1ZcRXUc87CLtEXI3Pf', 'Classic Hits', 'https://i.scdn.co/image/ab67616d0000b27394296e9c72ad8ba4c3ba7c56', ''),
(41, 'PUNK TACTICS', 'Joey Valence & Brae', 54, 43, 'fef', '2025-06-16T20:24:07.836Z', '2jQ1P0aGT4WkNyJCeoQnb9', 'PUNK TACTICS', 'https://i.scdn.co/image/ab67616d0000b2736dfdabd8d791c3fc94baf463', ''),
(42, 'Love Will Tear Us Apart - 2020 Remaster', 'Joy Division', 55, 45, '', '2025-06-29T08:21:20.645Z', '34iOH7LY3vme5rQxsVILZ4', 'Love Will Tear Us Apart', 'https://i.scdn.co/image/ab67616d0000b2731e0fdc2906851e29d09320c3', ''),
(43, 'Pure Cocaine', 'Lil Baby', 56, 46, '', '2025-06-30T19:37:03.231Z', '577YBGuskWkVDCxZrLRB4v', 'Street Gossip', 'https://i.scdn.co/image/ab67616d0000b2737cb0c4f7761f6dd66aaca065', ''),
(44, 'Love Will Tear Us Apart - 2020 Remaster', 'Joy Division', 58, 48, '', '2025-07-05T16:43:33.347Z', '34iOH7LY3vme5rQxsVILZ4', 'Love Will Tear Us Apart', 'https://i.scdn.co/image/ab67616d0000b2731e0fdc2906851e29d09320c3', ''),
(45, 'Hypnotize - 2007 Remaster', 'The Notorious B.I.G.', 61, 50, '', '2025-07-05T16:55:36.533Z', '6Tsu3OsuMz4KEGKbOYd6A0', 'Greatest Hits', 'https://i.scdn.co/image/ab67616d0000b273639fea4197e676cfe9512e04', ''),
(46, 'All Eyez On Me (ft. Big Syke)', '2Pac, Big Syke', 61, 52, '', '2025-07-05T19:37:07.582Z', '4VQNCzfZ3MdHEwwErNXpBo', 'All Eyez On Me', 'https://i.scdn.co/image/ab67616d0000b273073aebff28f79959d2543596', ''),
(47, 'The Message', 'Grandmaster Flash, The Furious Five, The Sugarhill Gang', 61, 52, '', '2025-07-05T19:37:40.045Z', '32X0tTPXoWYNld9y1RRbFI', 'Rapper''s Delight', 'https://i.scdn.co/image/ab67616d0000b273deaf9a9d2374f7f449867265', ''),
(48, 'N.Y. State of Mind', 'Nas', 61, 52, '', '2025-07-05T19:37:58.212Z', '0trHOzAhNpGCsGBEu7dOJo', 'Illmatic', 'https://i.scdn.co/image/ab67616d0000b273045fc920ecf4f8094888ec26', ''),
(49, 'Endless Love', 'Lionel Richie, Diana Ross', 62, 53, '', '2025-07-06T11:10:21.789Z', '4lxURgzko5Jizais6YqF3p', 'Endless Love (Soundtrack)', 'https://i.scdn.co/image/ab67616d0000b27333aae2579a2816fe25b40bb5', ''),
(50, 'The Sound of Silence', 'Simon & Garfunkel', 62, 53, '', '2025-07-06T11:11:54.365Z', '3YfS47QufnLDFA71FUsgCM', 'The Singer', 'https://i.scdn.co/image/ab67616d0000b273dd9e17a2000252d6b79cf904', ''),
(51, 'Children', 'Robert Miles', 69, 56, '', '2025-07-08T17:17:38.729Z', '4wtR6HB3XekEengMX17cpc', 'Children (Dance Vault Mixes)', 'https://i.scdn.co/image/ab67616d0000b27385a2da83b5b340365ae7d8cd', ''),
(52, '9Pm (Till I Come)', 'ATB', 69, 56, '', '2025-07-08T17:17:55.160Z', '1CgbwsrNDlFrRuk2ebQ7zr', 'Movin'' Melodies', 'https://i.scdn.co/image/ab67616d0000b27326971635f39cfc30b37ecf05', ''),
(53, 'Insomnia', 'Faithless', 69, 56, '', '2025-07-08T17:18:02.651Z', '3XTefle3zvDkjgS1Fiq14A', 'Ultimate Insomnia', 'https://i.scdn.co/image/ab67616d0000b273ae4ee821be74164699522b8b', ''),
(54, 'Lazy (feat. David Byrne) - Mowgli Goes Deep Mix', 'X-Press 2, David Byrne', 72, 57, '', '2025-07-23T18:40:38.097Z', '2KFg8d03gnWcqAPoA7IrGr', 'Lazy (feat. David Byrne) [Remixes]', 'https://i.scdn.co/image/ab67616d0000b2730fb059750f1ea9f310b48bbb', ''),
(55, 'Ordinary World', 'Duran Duran', 73, 58, '', '2025-08-01T14:55:16.052Z', '0wokCRaKD0zPNhMRXAgVsr', 'Duran Duran', 'https://i.scdn.co/image/ab67616d0000b2735d11c2fe73a7d376d3b06107', ''),
(56, 'Three Little Birds', 'Bob Marley & The Wailers', 74, 59, '', '2025-08-23T15:12:47.744Z', '7vggqxNKwd6xdRoYS0pQtM', 'Legend - The Best Of Bob Marley And The Wailers', 'https://i.scdn.co/image/ab67616d0000b273413a6c2c7b296d98171e5e21', ''),
(57, 'Never Ever', 'All Saints', 75, 60, '', '2025-10-01T11:45:02.121Z', '7ziHnshbknkpFLDW5yGBjO', 'All Saints', 'https://i.scdn.co/image/ab67616d0000b2734245f996f39eb4e9b2eefef8', '');

-- Reset sequence
SELECT setval('songs_id_seq', (SELECT MAX(id) FROM songs));

-- =====================================================
-- TEAMS_WAITLIST (1 records)
-- =====================================================

INSERT INTO teams_waitlist (id, name, email, company, team_size, role, submitted_at) VALUES
(1, 'Ben Smith', 'b10smith5@gmail.com', 'Mindspark Digital Labs B.V.', '50-200 employees', 'HR/People Operations', '2025-06-10T17:32:57.164Z');

-- Reset sequence
SELECT setval('teams_waitlist_id_seq', (SELECT MAX(id) FROM teams_waitlist));

-- =====================================================
-- SEED COMPLETE
-- =====================================================

DO $$
BEGIN
  RAISE NOTICE '✅ All seed data loaded successfully!';
END $$;

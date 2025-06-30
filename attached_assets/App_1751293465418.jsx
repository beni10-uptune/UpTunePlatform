import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { Play, Pause, Music, Calendar, MapPin, Users, Headphones, Heart, Star, Volume2 } from 'lucide-react'
import './App.css'

// Import images
import studioFiftyFourDancing from './assets/images/disco/studio54_dancing.jpg'
import studioFiftyFourCelebration from './assets/images/disco/studio54_celebration.jpeg'
import discoFashion from './assets/images/disco/disco_fashion_70s.jpg'
import larryLevan from './assets/images/disco/larry_levan_paradise_garage.jpg'
import donnaSummer from './assets/images/disco/donna_summer_performance.jpg'

import haciendasInterior from './assets/images/madchester/hacienda_interior.jpg'
import haciendaDancefloor from './assets/images/madchester/hacienda_dancefloor_1989.jpg'
import stoneRosesHappyMondays from './assets/images/madchester/stone_roses_happy_mondays.jpg'
import madchesterScene from './assets/images/madchester/madchester_scene_90s.jpg'
import haciendasFactory from './assets/images/madchester/hacienda_factory_design.jpg'

import bellevilleThree from './assets/images/detroit_techno/belleville_three_pioneers.jpg'
import detroitTechnoEarly from './assets/images/detroit_techno/detroit_techno_early_days.jpeg'
import undergroundResistance from './assets/images/detroit_techno/underground_resistance.jpg'
import undergroundResistancePolitics from './assets/images/detroit_techno/underground_resistance_politics.jpg'

import tropicaliaAlbum from './assets/images/tropicalia/tropicalia_album_cover.jpg'
import gilbertoGil from './assets/images/tropicalia/gilberto_gil_experimentalism.jpeg'
import tropicaliaStory from './assets/images/tropicalia/tropicalia_story_brazil.jpg'
import caetanoVeloso from './assets/images/tropicalia/caetano_veloso_creativity.jpg'

import berlinTechnoScene from './assets/images/berlin_electronic/berlin_techno_scene.jpg'
import loveParadeBerlin from './assets/images/berlin_electronic/love_parade_berlin.jpg'
import tresorClub from './assets/images/berlin_electronic/tresor_club.jpg'

import acidHouseRaveCulture from './assets/images/acid_house/acid_house_rave_culture.jpg'
import shoomNightclub from './assets/images/acid_house/shoom_nightclub.jpg'
import tb303Synthesizer from './assets/images/acid_house/tb303_synthesizer.jpg'

const movements = [
  {
    id: 'disco',
    title: 'Disco',
    subtitle: 'Underground Revolution',
    period: '1970-1979',
    location: 'New York City',
    description: 'From marginalized communities to global phenomenon, disco was more than music—it was liberation.',
    sections: [
      {
        title: "The Underground Revolution Begins",
        content: "In the early 1970s, as America reeled from Vietnam, Watergate, and economic recession, something extraordinary was happening in the underground clubs of New York City. In converted warehouses and abandoned lofts, in spaces where society's outcasts gathered to escape the harsh realities of urban decay, a new form of musical expression was being born. The seeds were planted in the most unlikely places—gay clubs in Philadelphia, Black radio stations in New York, and the creative minds of producers who dared to imagine music that existed purely for the joy of dancing."
      },
      {
        title: "The Philadelphia Sound: Where It All Started",
        content: "Before disco conquered the world, it was born in Philadelphia through the genius of Kenny Gamble and Leon Huff. Their Philadelphia International Records became the laboratory where the disco sound was perfected, creating lush orchestral arrangements that would define the genre.",
        trackHighlight: {
          title: "Love Is the Message",
          artist: "MFSB",
          year: "1973",
          story: "This instrumental masterpiece by Philadelphia's house band MFSB (Mother Father Sister Brother) became the blueprint for disco production. With its soaring strings, driving bass, and euphoric build-ups, it established the template that would influence everything from 'Dancing Queen' to modern house music. The track's message was simple but revolutionary: love is universal, and music is its language."
        }
      },
      {
        title: "David Mancuso's Sacred Space",
        content: "The story begins with David Mancuso, a soft-spoken visionary who transformed his Manhattan loft into a sacred space called The Loft. Mancuso wasn't interested in profit or fame; he was interested in transcendence. His parties, which began in 1970, were invitation-only gatherings where the music was carefully curated, the sound system was pristine, and the atmosphere was one of pure, unadulterated joy. Mancuso's genius lay in his understanding that the right song at the right moment could create collective euphoria.",
        highlight: "The Loft was more than just a party—it was a sanctuary for New York's marginalized communities. On Mancuso's dance floor, social hierarchies dissolved. Wall Street executives danced next to drag queens, uptown socialites moved to the same rhythm as downtown hustlers.",
        trackHighlight: {
          title: "Soul Makossa",
          artist: "Manu Dibango",
          year: "1972",
          story: "This Cameroonian jazz-funk track became an unlikely anthem at The Loft, proving Mancuso's genius for finding transcendent music from anywhere in the world. The song's hypnotic groove and African polyrhythms introduced New York dancers to global sounds, while its chant 'mama-say mama-sa mama-makossa' would later be sampled by Michael Jackson in 'Wanna Be Startin' Somethin'.' It represented disco's power to unite cultures through rhythm."
        }
      },
      {
        title: "The Birth of the Remix Culture",
        content: "As disco evolved, DJs began extending songs to keep dancers moving longer. Tom Moulton, working in a Fire Island beach house, accidentally created the first disco remix when he spliced together different sections of a song to extend its most danceable parts. This innovation would revolutionize not just disco, but all of popular music.",
        trackHighlight: {
          title: "Do It ('Til You're Satisfied)",
          artist: "B.T. Express",
          year: "1974",
          story: "Tom Moulton's remix of this funk track became the first commercially successful 12-inch single, extending the song from 3 minutes to over 6 minutes of pure groove. The extended version allowed dancers to lose themselves completely in the rhythm, creating the template for club music that continues today. Moulton's innovation proved that songs could be living, breathing entities that evolved on the dance floor."
        }
      },
      {
        title: "Paradise Garage: The Cathedral of Sound",
        content: "If The Loft was disco's birthplace, then Paradise Garage was its cathedral. Located in a former truck garage in SoHo, the club opened in 1977 under the guidance of Larry Levan, a DJ whose sets would become the stuff of legend. Levan wasn't just playing records—he was conducting symphonies of sound that could transport dancers to otherworldly realms. His sets were spiritual journeys that could last 12 hours, taking dancers through every emotion imaginable.",
        trackHighlight: {
          title: "Love To Love You Baby",
          artist: "Donna Summer",
          year: "1975",
          story: "The commercial breakthrough came with this seventeen-minute odyssey of desire that Time magazine described as containing '22 different orgasms.' Producer Giorgio Moroder's synthesizer work created an otherworldly soundscape while Donna Summer's vocals ranged from whispers to ecstatic moans. The song was unlike anything that had ever been played on American radio, establishing the template for the extended dance mix and proving that disco could be both commercial and transgressive."
        }
      },
      {
        title: "The Chic Revolution",
        content: "Nile Rodgers and Bernard Edwards of Chic brought sophistication and musical complexity to disco, proving that dance music could be both intellectually stimulating and physically irresistible. Their guitar-and-bass interplay became the foundation for countless disco classics and influenced everyone from Madonna to Daft Punk.",
        trackHighlight: {
          title: "Le Freak",
          artist: "Chic",
          year: "1978",
          story: "Born from rejection—Rodgers and Edwards were refused entry to Studio 54—'Le Freak' became disco's biggest-selling single. The song's infectious 'freak out' chant and Rodgers' crystalline guitar work created a perfect fusion of street credibility and dancefloor sophistication. Its success proved that disco could be both underground and mainstream, rebellious and commercial. The irony wasn't lost on anyone: the song inspired by being shut out of disco's most exclusive club became its biggest anthem."
        }
      },
      {
        title: "Studio 54: Democracy on the Dance Floor",
        content: "Studio 54, opened in 1977, became the most famous nightclub in the world. Andy Warhol captured its essence perfectly: 'a dictatorship at the door and a democracy on the dance floor.' The club represented disco's transformation from underground movement to cultural phenomenon. Inside, celebrities danced with construction workers, drag queens vogued next to socialites, and the music never stopped.",
        trackHighlight: {
          title: "I Will Survive",
          artist: "Gloria Gaynor",
          year: "1978",
          story: "Originally the B-side of a ballad, 'I Will Survive' became disco's greatest anthem of empowerment. Gloria Gaynor's powerhouse vocals transformed a song about romantic rejection into a universal declaration of resilience. At Studio 54, the song became a rallying cry for everyone who had ever been marginalized—gay men facing persecution, women asserting independence, minorities demanding respect. The song's message transcended its disco origins to become a timeless statement of human dignity."
        }
      },
      {
        title: "The Bee Gees Phenomenon",
        content: "The Australian brothers' transformation from soft rock crooners to disco superstars seemed unlikely, but their falsetto harmonies and sophisticated songwriting elevated disco to new artistic heights. Their work on the Saturday Night Fever soundtrack didn't just capture disco's essence—it defined it for the world.",
        trackHighlight: {
          title: "Stayin' Alive",
          artist: "Bee Gees",
          year: "1977",
          story: "With its iconic opening bass line and urgent lyrics, 'Stayin' Alive' became disco's most recognizable song and a metaphor for urban survival. The Bee Gees wrote it in just two hours, but its impact lasted decades. The song's driving rhythm matched the heartbeat of a city that never slept, while its lyrics spoke to everyone trying to make it in an unforgiving world. When John Travolta strutted down the Brooklyn street to this song in Saturday Night Fever, disco became more than music—it became a lifestyle."
        }
      },
      {
        title: "The Underground Resistance",
        content: "Even as disco conquered the mainstream, its underground roots remained vital. Clubs like The Gallery and Better Days kept the original spirit alive, while DJs like Frankie Knuckles and David Morales pushed the sound in new directions. These underground spaces remained sanctuaries for those who needed disco's message of acceptance and joy.",
        trackHighlight: {
          title: "I Feel Love",
          artist: "Donna Summer",
          year: "1977",
          story: "Giorgio Moroder's entirely synthesized production created the future of dance music in one song. 'I Feel Love' was revolutionary—no live instruments except Donna Summer's voice floating over a hypnotic electronic pulse. Brian Eno called it 'the sound of the future,' and he was right. The track's influence can be heard in everything from New Order to modern EDM. It proved that disco wasn't just about orchestras and strings—it was about pure, electronic euphoria."
        }
      },
      {
        title: "The Night They Tried to Kill Disco",
        content: "But disco's very success contained the seeds of its destruction. On July 12, 1979, the Chicago White Sox hosted 'Disco Demolition Night' at Comiskey Park. What happened that night was more than just a promotional stunt gone wrong—it was a cultural explosion that revealed the deep racial and sexual anxieties that disco had always provoked. The violence wasn't really about music—it was about power, identity, and the changing face of American culture.",
        highlight: "More than 5,000 fans stormed the field after DJ Steve Dahl exploded a pile of disco records, creating a riot that had to be dispersed by police. As Rolling Stone's Dave Marsh observed, 'White males, eighteen to thirty-four are the most likely to see disco as the product of homosexuals, blacks, and Latins.' Nile Rodgers of Chic said it felt 'like a Nazi book-burning.'"
      },
      {
        title: "The Phoenix Rises",
        content: "But you cannot kill an idea whose time has come. While the commercial disco industry collapsed, the underground culture that had given birth to it continued to evolve. In Chicago, DJs like Frankie Knuckles began experimenting with drum machines to create house music. In Detroit, young producers created techno. In New York, hip-hop pioneers built their art form on disco's rhythmic innovations.",
        trackHighlight: {
          title: "Get Lucky",
          artist: "Daft Punk ft. Nile Rodgers",
          year: "2013",
          story: "The ultimate vindication came when Nile Rodgers collaborated with Daft Punk on this global hit, proving that disco's core message—that music should make you move, that dancing is a form of liberation, that joy is a revolutionary act—was as relevant as ever. The song topped charts worldwide, introducing disco's sophisticated groove to a new generation. Rodgers' guitar work, unchanged after 35 years, proved that great music is timeless. 'Get Lucky' wasn't just a comeback—it was a victory lap for an entire movement that refused to die."
        }
      }
    ],
    color: 'from-purple-600 to-pink-600',
    images: [studioFiftyFourDancing, studioFiftyFourCelebration, discoFashion, larryLevan, donnaSummer],
    keyFigures: ['David Mancuso', 'Larry Levan', 'Donna Summer', 'Gloria Gaynor', 'Village People'],
    keyVenues: ['The Loft', 'Studio 54', 'Paradise Garage'],
    playlist: [
      { title: 'Love To Love You Baby', artist: 'Donna Summer', year: '1975' },
      { title: 'Never Can Say Goodbye', artist: 'Gloria Gaynor', year: '1974' },
      { title: 'Y.M.C.A.', artist: 'Village People', year: '1978' },
      { title: 'Le Freak', artist: 'Chic', year: '1978' },
      { title: 'Stayin\' Alive', artist: 'Bee Gees', year: '1977' }
    ]
  },
  {
    id: 'madchester',
    title: 'Madchester',
    subtitle: 'Post-Industrial Renaissance',
    period: '1988-1992',
    location: 'Manchester, UK',
    description: 'When post-industrial decay became the sound of the future, Manchester danced its way to cultural revolution.',
    sections: [
      {
        title: "From Cottonopolis to Cultural Capital",
        content: "Manchester in the 1980s was a city in ruins. The industrial powerhouse that had once been called 'Cottonopolis'—the first industrial city in the world—lay broken and bleeding, its factories shuttered, its workers unemployed, its future uncertain. But in the abandoned warehouses and crumbling Victorian buildings of this post-industrial wasteland, something extraordinary was stirring. The city's industrial heritage would become its greatest asset, providing the perfect backdrop for a musical revolution that would transform decay into beauty."
      },
      {
        title: "The Punk Foundations",
        content: "Before Madchester, there was punk. The Buzzcocks, formed in Bolton in 1976, showed that Manchester could produce music that mattered. Their DIY ethos and melodic sensibility would influence everything that followed, proving that the North could compete with London's cultural dominance.",
        trackHighlight: {
          title: "Ever Fallen in Love (With Someone You Shouldn't've)",
          artist: "Buzzcocks",
          year: "1978",
          story: "Pete Shelley's perfect pop song about impossible love became a template for Manchester bands to follow. Its combination of punk energy and irresistible melody showed that aggressive music could still be beautiful. The song's influence can be heard in everything from The Smiths to Oasis, proving that great songwriting transcends genre boundaries."
        }
      },
      {
        title: "Tony Wilson's Revolutionary Vision",
        content: "The story begins with Anthony H. Wilson—known to everyone simply as Tony—a Cambridge-educated television presenter who had fallen in love with punk rock and seen in it the seeds of something greater. In 1978, he founded Factory Records with a revolutionary philosophy: the record company should serve the artists, not exploit them. Wilson's vision extended beyond music to encompass art, design, and cultural transformation.",
        highlight: "Wilson's vision was radical in its simplicity—complete creative control for artists, no restrictive contracts, treating music as art rather than commodity. He famously said, 'We're not in the music business, we're in the culture business.'"
      },
      {
        title: "Joy Division: Beauty from Despair",
        content: "Factory Records' first masterpiece came from Joy Division, a band that transformed post-punk's nihilism into transcendent art. Ian Curtis's haunting vocals and the band's hypnotic rhythms created a sound that was both deeply personal and universally resonant, laying the groundwork for everything that would follow.",
        trackHighlight: {
          title: "Love Will Tear Us Apart",
          artist: "Joy Division",
          year: "1980",
          story: "Released after Ian Curtis's tragic death, this song became Factory Records' biggest hit and a blueprint for emotional intensity in popular music. The song's combination of Curtis's vulnerable vocals and the band's driving rhythm created a template that would influence everyone from The Cure to Interpol. Its success proved that audiences craved authenticity over artifice, depth over surface."
        }
      },
      {
        title: "New Order: From Darkness to Light",
        content: "After Ian Curtis's death, the remaining members of Joy Division formed New Order, gradually incorporating electronic elements and dance rhythms into their sound. Their evolution from post-punk to dance-rock pioneers would prove crucial to the Madchester sound that followed.",
        trackHighlight: {
          title: "Blue Monday",
          artist: "New Order",
          year: "1983",
          story: "The best-selling 12-inch single of all time, 'Blue Monday' bridged the gap between underground and mainstream, rock and dance, emotion and euphoria. Bernard Sumner's robotic vocals and the song's hypnotic electronic pulse created a new template for popular music. The track's success proved that experimental music could be commercially viable, paving the way for the dance-rock fusion that would define Madchester."
        }
      },
      {
        title: "The Hacienda: An Experiment in Cultural Democracy",
        content: "Wilson's most audacious project was the Hacienda, a nightclub opened in 1982 in a converted yacht showroom. Designed by Ben Kelly with exposed brick, yellow and black hazard stripes, and a sound system that could shake the building's foundations, the Hacienda was more than just a club—it was an experiment in cultural democracy. The club's early years were marked by violence and financial losses, but it would eventually become the epicenter of a cultural revolution.",
        highlight: "The early years were a struggle. The Hacienda was losing money at an alarming rate—eventually £6 million over its lifetime, contributing to Factory Records' bankruptcy in 1992. But Wilson persisted, believing that culture was more important than profit."
      },
      {
        title: "The Smiths: Poetry in Motion",
        content: "While Factory Records was building its empire, another Manchester band was conquering hearts and minds across Britain. The Smiths, led by Morrissey's literate lyrics and Johnny Marr's jangly guitar work, proved that Manchester could produce bands of international significance. Though not technically part of the Madchester scene, their influence was enormous.",
        trackHighlight: {
          title: "This Charming Man",
          artist: "The Smiths",
          year: "1983",
          story: "Johnny Marr's cascading guitar riff and Morrissey's witty wordplay created one of the most perfect pop songs ever recorded. The track's combination of musical sophistication and lyrical intelligence showed that indie music could be both cerebral and emotionally affecting. Its success proved that Manchester bands could compete with anyone, anywhere, inspiring a generation of local musicians to believe in their own potential."
        }
      },
      {
        title: "The MDMA Revolution",
        content: "The transformation came with MDMA—ecstasy—arriving in Manchester in the late 1980s. The drug was unlike anything that had come before. Where alcohol encouraged aggression and cocaine fueled paranoia, MDMA promoted empathy, connection, and overwhelming love. The chemical revolution would transform not just the Hacienda, but the entire city's cultural landscape.",
        highlight: "At the Hacienda, the club that had once been plagued by violence became a cathedral of unity. Indie kids danced next to football hooligans, middle-class students embraced working-class ravers. The drug didn't just change behavior—it changed consciousness."
      },
      {
        title: "The Stone Roses: Channeling a Generation",
        content: "At the center of this revolution were the Stone Roses, four young men who had absorbed punk, psychedelia, and dance music and synthesized them into something entirely new. Their 1989 debut album was a masterpiece that seemed to channel the collective unconscious of a generation. Ian Brown's swagger, John Squire's guitar genius, and the rhythm section's groove created a sound that was both timeless and utterly contemporary.",
        trackHighlight: {
          title: "Fools Gold",
          artist: "The Stone Roses",
          year: "1989",
          story: "This hypnotic groove became the anthem of Madchester, blending indie rock with dance rhythms in a way that had never been heard before. The song's extended dance mix proved that rock bands could create music for the club. Built around a simple but irresistible bass line and featuring John Squire's wah-wah guitar work, the track captured the euphoric spirit of the times. Its success showed that the boundaries between rock and dance music were dissolving."
        }
      },
      {
        title: "The Inspirational Carpets: Organ-Driven Euphoria",
        content: "While the Stone Roses got most of the attention, Inspiral Carpets were equally important to the Madchester sound. Their organ-driven psychedelia and working-class anthems provided a different but equally valid vision of what Manchester music could be.",
        trackHighlight: {
          title: "This Is How It Feels",
          artist: "Inspiral Carpets",
          year: "1990",
          story: "Tom Hingley's passionate vocals and the band's swirling organ sound created an anthem for the dispossessed and disillusioned. The song's lyrics about unemployment and social alienation resonated with young people across Britain who felt left behind by Thatcher's economic policies. Its success proved that Madchester wasn't just about hedonism—it was also about social consciousness and working-class pride."
        }
      },
      {
        title: "Happy Mondays: Democratizing Performance",
        content: "Happy Mondays embodied the movement's more anarchic impulses. Led by Shaun Ryder's stream-of-consciousness lyrics and featuring the legendary dancer Bez, they created music that was simultaneously brilliant and completely unhinged. Their collaboration with producer Paul Oakenfold brought Balearic beats to Manchester, creating a sound that was both local and global.",
        trackHighlight: {
          title: "Step On",
          artist: "Happy Mondays",
          year: "1990",
          story: "Built on a sample from John Kongos' 'He's Gonna Step on You Again,' this became the perfect fusion of rock attitude and dance floor euphoria. Bez's manic dancing in the video captured the spirit of an entire movement—pure, uninhibited joy. The song's success proved that you didn't need traditional musical skills to create great music; you just needed passion, creativity, and the right attitude. It became the soundtrack to countless nights at the Hacienda."
        }
      },
      {
        title: "808 State: Electronic Pioneers",
        content: "While the guitar bands got most of the media attention, 808 State were quietly revolutionizing electronic music. Their combination of acid house beats and melodic sophistication created a uniquely Manchester take on dance music that influenced producers worldwide.",
        trackHighlight: {
          title: "Pacific State",
          artist: "808 State",
          year: "1989",
          story: "This ambient house classic featured a saxophone sample that floated over hypnotic beats, creating a sound that was both futuristic and deeply emotional. The track's success on both underground and mainstream charts proved that electronic music could be both experimental and accessible. Its influence can be heard in everything from The Orb to modern EDM, showing that Manchester's electronic pioneers were ahead of their time."
        }
      },
      {
        title: "Spike Island: The Gathering of the Tribes",
        content: "The culmination came on May 27, 1990, at Spike Island—27,000 people descended on industrial wasteland in Widnes for what was widely considered a disaster. The sound was appalling, the organization chaotic, but none of that mattered. The Stone Roses' performance was more about the event than the music, creating a sense of generational unity that transcended the technical problems.",
        highlight: "For the young people who attended, it represented something far more significant than a concert—it was a gathering of the tribes, a moment when an entire generation came together. Many described it as their Woodstock, a defining moment that would shape their identities for decades to come."
      },
      {
        title: "The Charlatans: Keeping the Faith",
        content: "As the original Madchester bands began to falter, The Charlatans emerged to carry the torch forward. Their Hammond organ-driven sound and Tim Burgess's distinctive vocals kept the spirit of the movement alive even as the scene began to fragment.",
        trackHighlight: {
          title: "The Only One I Know",
          artist: "The Charlatans",
          year: "1990",
          story: "This organ-driven anthem became a late addition to the Madchester canon, proving that the movement still had life in it. The song's combination of psychedelic swirl and dance floor groove captured the essence of what made Manchester music special. Its success showed that new bands could still emerge from the scene and make their mark on the wider world."
        }
      },
      {
        title: "The Legacy Lives On",
        content: "Despite its ultimate commercial failure, Madchester's influence cannot be overstated. The movement proved that regional scenes could have global impact, that underground culture could reshape mainstream consciousness. The fusion of rock and dance music that began in Manchester continues to influence artists today, while the city's cultural confidence paved the way for Britpop and beyond.",
        highlight: "More importantly, Madchester demonstrated the transformative power of community and shared experience—at its best, creating spaces where young people could transcend their circumstances and imagine new futures. The movement showed that music could be a force for social change, bringing people together across class and cultural divides."
      }
    ],
    color: 'from-blue-600 to-cyan-600',
    images: [haciendasInterior, haciendaDancefloor, stoneRosesHappyMondays, madchesterScene, haciendasFactory],
    keyFigures: ['Tony Wilson', 'The Stone Roses', 'Happy Mondays', 'New Order', 'Ben Kelly'],
    keyVenues: ['The Hacienda', 'Factory Records', 'Dry Bar'],
    playlist: [
      { title: 'Fools Gold', artist: 'The Stone Roses', year: '1989' },
      { title: 'Step On', artist: 'Happy Mondays', year: '1990' },
      { title: 'Blue Monday', artist: 'New Order', year: '1983' },
      { title: 'Kinky Afro', artist: 'Happy Mondays', year: '1990' },
      { title: 'I Wanna Be Adored', artist: 'The Stone Roses', year: '1989' }
    ]
  },
  {
    id: 'detroit-techno',
    title: 'Detroit Techno',
    subtitle: 'Afrofuturist Visions',
    period: '1985-1995',
    location: 'Detroit, Michigan',
    sections: [
      {
        title: "The Ruins of the Motor City",
        content: "By 1980, Detroit was a city in ruins. The Motor City that had once powered America's industrial might lay broken and abandoned, its factories shuttered, its population fleeing, its future uncertain. The city that had given birth to Motown and the assembly line was now a symbol of post-industrial decay. But in the abandoned warehouses and empty lots of this urban wasteland, something extraordinary was stirring. Three young Black men from the suburb of Belleville would take the sounds of the city's industrial past and transform them into the soundtrack of the future."
      },
      {
        title: "The Belleville Three: Suburban Visionaries",
        content: "Juan Atkins, Derrick May, and Kevin Saunderson met as teenagers at Belleville High School, a predominantly white suburban school where they were among the few Black students. Their shared love of music—from Parliament-Funkadelic to Kraftwerk, from Prince to Yellow Magic Orchestra—would form the foundation of a musical revolution. These weren't inner-city kids making music about street life; they were suburban intellectuals creating sonic visions of possible futures.",
        highlight: "The Belleville Three's suburban background was crucial to their vision. Unlike their inner-city contemporaries who were creating hip-hop, they had the distance and perspective to imagine Detroit's industrial decay not as tragedy, but as opportunity—a blank canvas on which to paint Afrofuturist dreams."
      },
      {
        title: "Juan Atkins: The Originator",
        content: "Juan Atkins was the first to envision what would become Detroit techno. Influenced by Alvin Toffler's book 'Future Shock' and the electronic sounds of Kraftwerk, Atkins began creating music that imagined what the future might sound like. His early recordings under the name Cybotron, created with Rick Davis, were the first to fuse the mechanical rhythms of European electronic music with the soul and funk of Detroit's musical heritage.",
        trackHighlight: {
          title: "Clear",
          artist: "Cybotron",
          year: "1983",
          story: "This track was the birth certificate of Detroit techno, the first recording to fully realize Atkins' vision of Afrofuturist electronic music. The song's robotic vocals and mechanical rhythms painted a picture of a future where humans and machines had merged into something new. The track's success in both Detroit and Europe proved that this new sound could speak to audiences across racial and cultural boundaries, establishing the template for techno's global appeal."
        }
      },
      {
        title: "The Electrifying Mojo: Radio Prophet",
        content: "The spiritual godfather of Detroit techno was Charles Johnson, known on the radio as The Electrifying Mojo. Broadcasting on WJLB, Mojo created a sonic landscape that perfectly captured Detroit's post-industrial moment. His shows mixed Parliament-Funkadelic with Kraftwerk, Prince with Gary Numan, creating a musical dialogue between Black and white, American and European, past and future. For the Belleville Three and countless other young Detroiters, Mojo's radio show was a revelation.",
        highlight: "Mojo's genius was his understanding that Detroit's musical future lay not in choosing between Black and white musical traditions, but in synthesizing them into something entirely new. His radio show became the laboratory where Detroit techno's aesthetic was first imagined and tested."
      },
      {
        title: "Model 500: The Sound of the Future",
        content: "In 1985, Juan Atkins launched his Model 500 project, creating tracks that would define the Detroit techno sound for decades to come. These weren't just dance tracks—they were sonic blueprints for a post-human future, where the boundaries between organic and mechanical, human and machine, had dissolved into something beautiful and strange.",
        trackHighlight: {
          title: "No UFO's",
          artist: "Model 500",
          year: "1985",
          story: "This track became Detroit techno's first underground anthem, a hypnotic journey through electronic soundscapes that seemed to come from another planet. The song's title was both a joke and a statement—there were no UFOs because the aliens were already here, making music in Detroit. Atkins' use of the Roland TR-909 drum machine and TB-303 bass synthesizer created a sound that was simultaneously futuristic and deeply rooted in Detroit's industrial heritage."
        }
      },
      {
        title: "Derrick May: The Innovator",
        content: "If Juan Atkins was techno's originator, Derrick May was its innovator, the artist who took the basic template and pushed it into new emotional and musical territories. May's tracks were more than just functional dance music—they were symphonies of electronic sound that could move dancers to tears as easily as they could move their feet. His approach to techno was deeply influenced by his classical music training and his understanding of jazz improvisation.",
        trackHighlight: {
          title: "Strings of Life",
          artist: "Rhythim Is Rhythim",
          year: "1987",
          story: "This track became Detroit techno's 'Stairway to Heaven,' a seven-minute epic that proved electronic music could be as emotionally powerful as any rock anthem. May's use of piano samples and string arrangements created a sound that was simultaneously mechanical and deeply human. The track's success in European clubs established Detroit techno as a global phenomenon and proved that electronic music could carry the same emotional weight as traditional soul and jazz."
        }
      },
      {
        title: "Kevin Saunderson: The Elevator",
        content: "Kevin Saunderson was the most commercially minded of the Belleville Three, the artist who figured out how to take Detroit techno from underground clubs to mainstream radio. His Inner City project, created with vocalist Paris Grey, proved that techno could be both experimental and accessible, both futuristic and deeply soulful. Saunderson's genius lay in his ability to maintain techno's essential character while making it speak to broader audiences.",
        trackHighlight: {
          title: "Good Life",
          artist: "Inner City",
          year: "1988",
          story: "This track became Detroit techno's biggest mainstream hit, reaching the top 10 in multiple countries and introducing millions of listeners to the Detroit sound. Paris Grey's vocals transformed Saunderson's mechanical rhythms into an anthem of urban optimism, proving that techno could carry messages of hope as well as alienation. The song's success opened doors for countless other Detroit techno artists and established the city as the undisputed capital of electronic music."
        }
      },
      {
        title: "Underground Resistance: The Revolution",
        content: "By the early 1990s, a new generation of Detroit techno artists had emerged, led by the collective known as Underground Resistance. Founded by 'Mad' Mike Banks and Jeff Mills, UR took Detroit techno in a more explicitly political direction, using the music as a weapon in the struggle for Black liberation. Their tracks were harder, faster, and more aggressive than the Belleville Three's work, reflecting the increasing desperation of Detroit's urban crisis.",
        trackHighlight: {
          title: "Riot",
          artist: "Underground Resistance",
          year: "1991",
          story: "This track was Underground Resistance's most explicit political statement, a sonic call to arms that used the language of techno to express rage at systemic racism and economic inequality. The track's relentless rhythms and aggressive textures created a sound that was both danceable and dangerous, proving that electronic music could be a vehicle for political resistance as well as escapist fantasy."
        }
      },
      {
        title: "Jeff Mills: The Wizard",
        content: "Jeff Mills, known as 'The Wizard' for his supernatural DJ skills, became the most internationally recognized face of Detroit techno's second generation. His DJ sets were legendary marathons of sonic intensity, three-hour journeys through electronic soundscapes that left dancers exhausted and transformed. Mills' approach to techno was deeply influenced by his background in radio and his understanding of how electronic music could manipulate time and space.",
        trackHighlight: {
          title: "The Bells",
          artist: "Jeff Mills",
          year: "1997",
          story: "This minimalist masterpiece became one of techno's most recognizable tracks, a hypnotic loop that seemed to go on forever while constantly evolving. Mills' use of a simple bell sample, processed through various electronic effects, created a sound that was simultaneously ancient and futuristic. The track's success proved that techno didn't need complex arrangements to be powerful—sometimes the most profound statements came from the simplest elements."
        }
      },
      {
        title: "The Music Institute: Temple of Techno",
        content: "The spiritual home of Detroit techno was the Music Institute, a club that operated from 1988 to 1989 in downtown Detroit. Unlike the glamorous discos of New York or the warehouse raves of Chicago, the Music Institute was a stripped-down space focused entirely on the music. The club's sound system was legendary, and its crowd was a mix of suburban kids, inner-city dancers, and European tourists who had traveled to Detroit specifically to experience techno in its birthplace.",
        highlight: "The Music Institute represented everything that made Detroit techno special—it was integrated, underground, and focused entirely on the transformative power of electronic music. The club's brief existence became the stuff of legend, a moment when Detroit's musical vision was perfectly realized."
      },
      {
        title: "Afrofuturism and Electronic Music",
        content: "Detroit techno was more than just a musical genre—it was a form of Afrofuturism, a way of imagining Black futures that transcended the limitations of the present. The Belleville Three and their followers used electronic music to create sonic visions of possible worlds where technology served liberation rather than oppression, where Black creativity could flourish without constraint.",
        trackHighlight: {
          title: "Galaxy 2 Galaxy",
          artist: "Underground Resistance",
          year: "1993",
          story: "This concept album represented the full flowering of Detroit techno's Afrofuturist vision, imagining a future where Black people had colonized space and created new forms of electronic music among the stars. The album's tracks told the story of interplanetary travel and cosmic consciousness, using the language of techno to explore themes of liberation and transcendence. It proved that electronic music could be a vehicle for the most ambitious forms of speculative fiction."
        }
      },
      {
        title: "The European Connection",
        content: "From its earliest days, Detroit techno had a special relationship with Europe, particularly Germany and the UK. European audiences understood and appreciated the music in ways that American audiences often didn't, providing Detroit artists with the international platform they needed to develop their vision. This transatlantic dialogue would prove crucial to techno's development as a global phenomenon.",
        trackHighlight: {
          title: "Jaguar",
          artist: "DJ Rolando",
          year: "1999",
          story: "This track became an anthem in European clubs while remaining relatively unknown in America, illustrating the strange geography of Detroit techno's success. DJ Rolando's hypnotic loops and driving rhythms created a sound that was unmistakably Detroit but spoke to global audiences. The track's success proved that Detroit techno had become a universal language, capable of moving dancers from Berlin to Tokyo."
        }
      },
      {
        title: "The Second Wave: Minimal Techno",
        content: "By the late 1990s, a new generation of Detroit techno artists had emerged, influenced by the minimal techno movement that was developing in Germany. Artists like Robert Hood and Plastikman (Richie Hawtin) stripped techno down to its essential elements, creating tracks that were simultaneously more abstract and more physical than their predecessors.",
        trackHighlight: {
          title: "Minimal Nation",
          artist: "Robert Hood",
          year: "1994",
          story: "This album title track became the manifesto for minimal techno, proving that electronic music could be powerful without being complex. Hood's use of simple, repetitive elements created a hypnotic effect that was both meditative and energizing. The track's influence extended far beyond Detroit, inspiring a generation of electronic music producers to embrace simplicity and focus on the essential elements of rhythm and texture."
        }
      },
      {
        title: "The Legacy: From Detroit to the World",
        content: "Detroit techno's influence on global electronic music cannot be overstated. From the superclubs of Ibiza to the underground scenes of Berlin, from the festivals of Europe to the warehouses of Asia, the sound that began in the ruins of the Motor City has become the soundtrack of global youth culture. But perhaps more importantly, Detroit techno proved that electronic music could be a vehicle for the most profound forms of cultural expression.",
        highlight: "Detroit techno's greatest achievement was showing that technology could be a tool of liberation rather than oppression, that electronic music could carry the same emotional and spiritual weight as any traditional form of cultural expression. In the hands of the Belleville Three and their followers, machines became instruments of the soul."
      },
      {
        title: "The Eternal Future",
        content: "Today, more than three decades after Juan Atkins first envisioned the sound of the future, Detroit techno continues to evolve and inspire. New generations of artists continue to explore the possibilities of electronic music, using the latest technology to create sounds that would have been unimaginable to the original pioneers. But the essential vision remains the same—electronic music as a form of liberation, a way of imagining better futures, a soundtrack for the ongoing struggle to create a more just and beautiful world.",
        trackHighlight: {
          title: "Spastik",
          artist: "Plastikman",
          year: "1993",
          story: "Richie Hawtin's minimal masterpiece became one of techno's most enduring tracks, a relentless loop that seemed to capture the essence of machine consciousness. The track's hypnotic repetition and subtle variations created a sound that was both inhuman and deeply emotional. Its continued popularity in clubs around the world proves that the best techno transcends time and place, speaking to something fundamental about the human relationship with technology."
        }
      }
    ],
    color: 'from-orange-600 to-red-600',
    images: [bellevilleThree, detroitTechnoEarly, undergroundResistance, undergroundResistancePolitics],
    keyFigures: ['Juan Atkins', 'Derrick May', 'Kevin Saunderson', 'Jeff Mills', 'Underground Resistance'],
    keyVenues: ['The Warehouse', 'Music Institute', 'Hart Plaza'],
    playlist: [
      { title: 'Strings of Life', artist: 'Derrick May', year: '1987' },
      { title: 'No UFO\'s', artist: 'Juan Atkins', year: '1985' },
      { title: 'Good Life', artist: 'Inner City', year: '1988' },
      { title: 'The Bells', artist: 'Jeff Mills', year: '1997' },
      { title: 'Galaxy 2 Galaxy', artist: 'Underground Resistance', year: '1993' }
    ]
  },
  {
    id: 'tropicalia',
    title: 'Tropicália',
    subtitle: 'Cultural Cannibalism',
    period: '1967-1969',
    location: 'Brazil',
    sections: [
      {
        title: "The Anthropophagic Manifesto: Devouring Culture",
        content: "The story of Tropicália begins not in 1967, but in 1928, with Oswald de Andrade's revolutionary Anthropophagic Manifesto. 'Only anthropophagy unites us,' he wrote, proposing that Brazilian culture should devour foreign influences like the Tupi cannibals devoured their enemies—not to destroy, but to absorb their strength and transform it into something uniquely Brazilian. This radical concept would lie dormant for nearly four decades until a new generation of artists, facing military dictatorship and cultural repression, would resurrect it as their weapon of resistance."
      },
      {
        title: "Brazil Under the Boot: The Context of Repression",
        content: "By 1964, Brazil was under military dictatorship. The generals who seized power promised order and progress, but delivered censorship, torture, and cultural suffocation. Traditional Brazilian music—samba, bossa nova—was either co-opted by the regime or pushed into safe, apolitical corners. Young Brazilian artists found themselves caught between two impossible choices: submit to cultural nationalism that served the dictatorship, or embrace international influences and be branded as traitors to Brazilian culture.",
        highlight: "The military government's cultural policy was clear: Brazilian music should be 'authentic' and 'pure,' free from foreign contamination. This created a perfect trap—any innovation could be branded as un-Brazilian, while stagnation served the regime's need for controllable, predictable culture."
      },
      {
        title: "Caetano Veloso: The Beautiful Rebel",
        content: "Into this suffocating atmosphere stepped Caetano Veloso, a young singer from Bahia whose beauty was matched only by his intellectual audacity. Veloso understood that the regime's demand for 'authentic' Brazilian music was itself a form of cultural colonialism—a way of keeping Brazilian artists trapped in the past while the world moved forward. His response would be to embrace contradiction itself, creating music that was simultaneously deeply Brazilian and radically international.",
        trackHighlight: {
          title: "Alegria, Alegria",
          artist: "Caetano Veloso",
          year: "1967",
          story: "Veloso's breakthrough song scandalized the Brazilian music establishment by incorporating electric guitars and international pop influences into Brazilian popular music. The lyrics, which mentioned Coca-Cola and Brigitte Bardot alongside Brazilian imagery, were seen as cultural treason by traditionalists. But Veloso understood that true Brazilian culture had always been hybrid, mixed, anthropophagic. The song's joyful embrace of contradiction became the anthem of a generation refusing to choose between being Brazilian and being modern."
        }
      },
      {
        title: "Gilberto Gil: The Mystic Revolutionary",
        content: "If Caetano was Tropicália's intellectual provocateur, Gilberto Gil was its mystic revolutionary. A master guitarist and songwriter from Bahia, Gil brought Afro-Brazilian spirituality and cosmic consciousness to the movement. His music fused traditional Brazilian rhythms with psychedelic rock, creating soundscapes that were simultaneously ancient and futuristic. Gil understood that Tropicália wasn't just about musical innovation—it was about expanding consciousness and imagining new possibilities for Brazilian identity.",
        trackHighlight: {
          title: "Bat Macumba",
          artist: "Gilberto Gil",
          year: "1968",
          story: "This explosive fusion of Afro-Brazilian religious chants with psychedelic rock became one of Tropicália's most radical statements. The title references macumba, an Afro-Brazilian spiritual practice that the white elite had long tried to suppress. By combining sacred chants with electric guitars and avant-garde arrangements, Gil was making a powerful statement about cultural authenticity—true Brazilian culture wasn't pure or European, but mixed, African, indigenous, and modern all at once."
        }
      },
      {
        title: "Os Mutantes: The Psychedelic Cannibals",
        content: "The most radical expression of Tropicália's anthropophagic philosophy came from Os Mutantes, a trio of young musicians who devoured every musical influence they could find—Beatles psychedelia, French chanson, Brazilian folk, electronic experimentation—and regurgitated it as something completely new. Led by the Baptista brothers and Rita Lee, Os Mutantes created music that was simultaneously playful and subversive, innocent and revolutionary.",
        trackHighlight: {
          title: "Panis et Circencis",
          artist: "Os Mutantes",
          year: "1968",
          story: "The title, Latin for 'bread and circuses,' referenced the Roman strategy of keeping the masses docile with entertainment and food. But Os Mutantes transformed this critique of mass culture into a psychedelic carnival that was both celebration and subversion. The song's collage of musical styles—from baroque arrangements to fuzz guitar to found sounds—embodied Tropicália's anthropophagic aesthetic, devouring high and low culture with equal appetite."
        }
      },
      {
        title: "The Manifesto Song: Tropicália",
        content: "In 1968, Caetano Veloso released the song that would give the movement its name. 'Tropicália' was a musical manifesto that laid out the movement's aesthetic and political program in three minutes of controlled chaos. The song was a sonic collage that juxtaposed traditional Brazilian instruments with electric guitars, classical arrangements with popular melodies, poetic imagery with commercial jingles.",
        trackHighlight: {
          title: "Tropicália",
          artist: "Caetano Veloso",
          year: "1968",
          story: "This song was Tropicália's manifesto in musical form, a deliberate provocation that challenged every assumption about Brazilian popular music. Veloso's lyrics painted a surreal portrait of Brazil as a tropical paradise built on contradictions—beautiful and violent, modern and primitive, sacred and profane. The song's arrangement, featuring everything from berimbau to electric guitar to orchestral flourishes, embodied the movement's anthropophagic aesthetic. It was Brazil devouring itself and the world simultaneously."
        }
      },
      {
        title: "Gal Costa: The Voice of Desire",
        content: "While the men of Tropicália got most of the attention, Gal Costa provided the movement with its most powerful voice. Her interpretations of Tropicália songs transformed them from intellectual exercises into expressions of raw emotion and desire. Costa understood that Tropicália wasn't just about cultural theory—it was about liberation, including sexual and emotional liberation that the conservative military regime found deeply threatening.",
        trackHighlight: {
          title: "Baby",
          artist: "Gal Costa",
          year: "1969",
          story: "Costa's sensual interpretation of this Caetano Veloso composition became one of Tropicália's most controversial and beloved recordings. Her breathy, intimate vocal style transformed the song into an expression of desire that was both personal and political. In a society where women's sexuality was strictly controlled, Costa's performance was a radical act of liberation. The song's blend of Brazilian and international influences—bossa nova rhythms with rock instrumentation—perfectly embodied Tropicália's anthropophagic aesthetic."
        }
      },
      {
        title: "Tom Zé: The Mad Scientist",
        content: "The most experimental member of the Tropicália constellation was Tom Zé, a composer and performer whose work pushed the movement's anthropophagic principles to their logical extreme. Zé created music that was simultaneously sophisticated and primitive, using found objects, prepared instruments, and unconventional recording techniques to create soundscapes that challenged every assumption about what music could be.",
        trackHighlight: {
          title: "Parque Industrial",
          artist: "Tom Zé",
          year: "1968",
          story: "This satirical anthem to Brazil's industrial development was Tom Zé's most pointed political statement, using irony and musical collage to critique the military government's development policies. The song's arrangement incorporated industrial sounds and mechanical rhythms, creating a sonic portrait of Brazil's transformation from agricultural to industrial society. Zé's use of found sounds and unconventional instruments embodied Tropicália's belief that art should devour everything—including the sounds of modern industrial life."
        }
      },
      {
        title: "The Television Revolution: Festival de Música Popular Brasileira",
        content: "Tropicália's most dramatic public moment came at the 1968 Festival de Música Popular Brasileira, broadcast live on television to millions of Brazilians. When Caetano Veloso performed 'É Proibido Proibir' (It Is Forbidden to Forbid), he was met with boos and jeers from an audience that expected traditional Brazilian music. His response was to stop the song mid-performance and deliver an improvised speech that became one of the most famous moments in Brazilian cultural history.",
        trackHighlight: {
          title: "É Proibido Proibir",
          artist: "Caetano Veloso",
          year: "1968",
          story: "The title, borrowed from a May 1968 Paris protest slogan, became Tropicália's most direct political statement. When the audience at the music festival booed the song's experimental arrangement, Veloso stopped performing and delivered an impassioned speech about artistic freedom and cultural authenticity. 'You are the same as those who were against the electric guitar in 1965!' he declared, comparing the audience to conservatives who had opposed Bob Dylan's electric transformation. The moment crystallized Tropicália's challenge to cultural orthodoxy."
        }
      },
      {
        title: "Hélio Oiticica: The Visual Revolutionary",
        content: "Tropicália wasn't just a musical movement—it was a complete aesthetic revolution that encompassed visual art, theater, and performance. The movement's visual dimension was largely defined by Hélio Oiticica, whose installations and environments provided the conceptual framework for Tropicália's anthropophagic aesthetic. Oiticica's work challenged the boundaries between high and low culture, art and life, Brazilian and international influences.",
        highlight: "Oiticica's 'Tropicália' installation, which gave the movement its name, was a labyrinthine environment that visitors could walk through and interact with. The installation combined elements of Brazilian popular culture—sand, plants, television screens showing soap operas—with avant-garde artistic techniques, creating a space that was simultaneously familiar and strange, Brazilian and universal."
      },
      {
        title: "The Collective Album: Tropicália ou Panis et Circencis",
        content: "In 1968, the key figures of Tropicália came together to record a collective album that would serve as the movement's definitive statement. 'Tropicália ou Panis et Circencis' was more than just a compilation—it was a manifesto in musical form, a demonstration of how Brazilian artists could devour global culture and transform it into something uniquely their own.",
        trackHighlight: {
          title: "Miserere Nobis",
          artist: "Gilberto Gil & Os Mutantes",
          year: "1968",
          story: "This collaboration between Gil and Os Mutantes created one of Tropicália's most haunting and beautiful recordings. The song combined Latin liturgical text with psychedelic arrangements, creating a sound that was simultaneously sacred and profane. The track's use of backwards recording, electronic effects, and unconventional instruments showed how Tropicália artists were using studio technology to create new forms of musical expression. It was anthropophagy in action—devouring religious tradition and transforming it into avant-garde art."
        }
      },
      {
        title: "The Backlash: Exile and Repression",
        content: "The military government's response to Tropicália was swift and brutal. In December 1968, the regime issued Institutional Act Number 5, which suspended civil liberties and gave the government unlimited power to censor and repress. Caetano Veloso and Gilberto Gil were arrested and imprisoned, then forced into exile in London. The movement that had promised to liberate Brazilian culture was crushed by the very forces it had challenged.",
        highlight: "The exile of Veloso and Gil marked the end of Tropicália as an organized movement, but also ensured its transformation into myth. From London, the two artists continued to create music that carried Tropicália's anthropophagic principles into new contexts, proving that the movement's ideas were stronger than any attempt at repression."
      },
      {
        title: "London Exile: The International Phase",
        content: "In London exile, Caetano Veloso and Gilberto Gil found themselves living the anthropophagic ideal in its purest form—Brazilian artists devouring international culture and transforming it through their unique perspective. Their London recordings showed how Tropicália's principles could work in reverse, with Brazilian artists influencing international music rather than just absorbing it.",
        trackHighlight: {
          title: "London, London",
          artist: "Caetano Veloso",
          year: "1971",
          story: "Recorded during his London exile, this song captured Veloso's complex relationship with international culture and Brazilian identity. The track's blend of English and Portuguese lyrics, folk and rock influences, showed how Tropicália's anthropophagic principles could work in any context. Veloso's homesick meditation on cultural displacement became a universal statement about the experience of exile and the possibility of cultural transformation through contact with the other."
        }
      },
      {
        title: "The Return and Transformation",
        content: "When Veloso and Gil returned to Brazil in 1972, they found a country transformed by years of economic growth and cultural repression. The Tropicália movement was over, but its influence was everywhere—in the work of new artists who had absorbed its lessons, in the changed relationship between Brazilian and international culture, in the very possibility of imagining Brazilian identity as something fluid and hybrid rather than fixed and pure.",
        trackHighlight: {
          title: "Transa",
          artist: "Caetano Veloso",
          year: "1972",
          story: "Veloso's first album after returning from exile showed how Tropicália's anthropophagic principles had evolved through contact with international culture. The album's title track combined Brazilian rhythms with rock instrumentation and English lyrics, creating a sound that was neither purely Brazilian nor purely international but something new. The song proved that Tropicália's vision of cultural cannibalism wasn't just a Brazilian phenomenon—it was a universal principle for cultural creation in a globalized world."
        }
      },
      {
        title: "The Eternal Legacy",
        content: "Though Tropicália lasted only a few years, its impact on Brazilian and world culture was permanent. The movement proved that cultural authenticity didn't require purity—that the most authentic expression of Brazilian identity might be its ability to devour and transform influences from around the world. This lesson would influence generations of Brazilian artists and provide a model for cultural resistance that could work in any context where artists faced pressure to choose between tradition and innovation.",
        highlight: "Tropicália's greatest achievement was showing that cultural cannibalism could be a form of liberation rather than colonization. By devouring international influences and transforming them through Brazilian sensibility, Tropicália artists created a new model for cultural authenticity that was based on transformation rather than preservation, mixture rather than purity, becoming rather than being."
      }
    ],
    color: 'from-green-600 to-yellow-600',
    images: [tropicaliaAlbum, gilbertoGil, tropicaliaStory, caetanoVeloso],
    keyFigures: ['Caetano Veloso', 'Gilberto Gil', 'Os Mutantes', 'Gal Costa', 'Hélio Oiticica'],
    keyVenues: ['Teatro Oficina', 'TV Record', 'Festival de Música Popular Brasileira'],
    playlist: [
      { title: 'Tropicália', artist: 'Caetano Veloso', year: '1968' },
      { title: 'Bat Macumba', artist: 'Gilberto Gil', year: '1968' },
      { title: 'É Proibido Proibir', artist: 'Caetano Veloso', year: '1968' },
      { title: 'Alegria, Alegria', artist: 'Caetano Veloso', year: '1967' },
      { title: 'Panis et Circencis', artist: 'Os Mutantes', year: '1968' }
    ]
  },
  {
    id: 'berlin',
    title: 'Berlin Electronic',
    subtitle: 'Soundtrack of Freedom',
    period: '1989-Present',
    location: 'Berlin, Germany',
    description: 'From the ruins of the Berlin Wall rose an electronic revolution that transformed a divided city into the global capital of techno culture.',
    sections: [
      {
        title: "November 9, 1989 - Liberation Day",
        content: "The night the Berlin Wall fell, something extraordinary happened beyond the political reunification of a divided city. As sledgehammers struck concrete and families embraced across the death strip, a new sound began to pulse through the abandoned buildings of East Berlin. It wasn't planned, it wasn't organized, and it certainly wasn't sanctioned by any government. It was pure, raw liberation expressed through the relentless four-four beat of techno music.",
        trackHighlight: {
          title: "Clear",
          artist: "Cybotron",
          year: "1983",
          story: "This Detroit techno classic became an anthem in early Berlin clubs, its futuristic vision perfectly matching the city's transformation from divided Cold War symbol to unified electronic music capital."
        }
      },
      {
        title: "March 1991 - The First Temple",
        content: "Dimitri Hegemann descended into the basement vault of a bombed-out department store near Potsdamer Platz and created Tresor - German for 'safe' or 'vault.' The concrete walls, scarred by history, provided the perfect acoustic environment for the pounding rhythms of techno. This wouldn't be a traditional nightclub with velvet ropes and dress codes. This would be a space where the music was everything.",
        trackHighlight: {
          title: "Strings of Life",
          artist: "Derrick May",
          year: "1987",
          story: "This Detroit classic became a Tresor anthem, its emotional strings and driving beat epitomizing the connection between Detroit's post-industrial landscape and Berlin's post-Wall transformation."
        }
      },
      {
        title: "The Underground Network",
        content: "As Tresor established itself as Berlin's techno ground zero, a network of underground venues began spreading across the city. E-Werk in a former power station, Planet in an East German youth center, WMF in connected basement air raid shelters. These weren't just entertainment spaces; they were laboratories for a new kind of social interaction where traditional barriers dissolved.",
        trackHighlight: {
          title: "Energy Flash",
          artist: "Joey Beltram",
          year: "1990",
          story: "This Belgian-American producer's track became a Berlin underground anthem, its relentless energy perfectly capturing the scene's intensity and showing how techno was becoming truly international."
        }
      },
      {
        title: "Love Parade - From Protest to Phenomenon",
        content: "On July 1, 1989, Dr. Motte organized the first Love Parade with just 150 participants. Registered as a political demonstration for 'Peace, Joy, Pancakes,' it grew to 1.5 million people by 1999. The parade embodied post-Cold War Berlin's transformation from conflict epicenter to celebration of unity through electronic music.",
        trackHighlight: {
          title: "Born Slippy (Nuxx)",
          artist: "Underworld",
          year: "1996",
          story: "Though British, this track became a Love Parade anthem, its euphoric build perfectly matching the parade's emotional intensity and demonstrating Berlin's global influence on electronic music."
        }
      },
      {
        title: "The Berghain Era",
        content: "In 2004, Berghain opened in a former East German power plant, establishing itself as the world's most famous techno venue. With its cathedral-like atmosphere, legendary door policy, and marathon DJ sets lasting eight hours or more, Berghain represents the maturation of Berlin's techno culture into a sophisticated art form.",
        trackHighlight: {
          title: "Spastik",
          artist: "Plastikman",
          year: "1993",
          story: "Richie Hawtin's minimal techno masterpiece became a Berghain classic, its hypnotic repetition perfect for the club's marathon sets, showing how techno could be both minimal and maximal."
        }
      },
      {
        title: "UNESCO Recognition",
        content: "On March 13, 2024, UNESCO inscribed Berlin's techno scene on Germany's Registry of Intangible Cultural Heritage. The recognition validated what participants had known for decades: this was more than entertainment, it was a cultural movement of global significance that had fundamentally shaped Berlin's identity.",
        highlight: "For more than 30 years, techno has been an important sound of our capital. Berlin's techno culture has stood for values such as diversity, respect and cosmopolitanism - it is part of the cultural wealth of our country."
      }
    ],
    color: 'from-gray-600 to-blue-600',
    images: [studioFiftyFourDancing, studioFiftyFourCelebration, discoFashion, larryLevan],
    keyFigures: ['Dimitri Hegemann', 'Dr. Motte', 'Ben Klock', 'Marcel Dettmann'],
    keyVenues: ['Tresor', 'Berghain', 'E-Werk', 'Love Parade'],
    playlist: [
      { title: 'Clear', artist: 'Cybotron', year: '1983' },
      { title: 'Strings of Life', artist: 'Derrick May', year: '1987' },
      { title: 'Energy Flash', artist: 'Joey Beltram', year: '1990' },
      { title: 'Born Slippy (Nuxx)', artist: 'Underworld', year: '1996' },
      { title: 'Spastik', artist: 'Plastikman', year: '1993' }
    ]
  },
  {
    id: 'acidhouse',
    title: 'Acid House',
    subtitle: 'Second Summer of Love',
    period: '1985-1992',
    location: 'Chicago to UK',
    description: 'A squelching synthesizer sound from Chicago\'s underground sparked Britain\'s biggest youth revolution since the 1960s, transforming nightlife forever.',
    sections: [
      {
        title: "Chicago 1985 - The TB-303 Mistake",
        content: "In a small studio on Chicago's South Side in 1985, three young musicians accidentally created a sound that would change the world. DJ Pierre, Herb J, and Spanky had gotten their hands on a Roland TB-303, a commercial failure that Roland had designed to help guitarists practice. But what sounded wrong to traditional musicians sounded revolutionary to these house music pioneers.",
        trackHighlight: {
          title: "Acid Tracks",
          artist: "Phuture",
          year: "1987",
          story: "The first acid house record, created in 1985 but not released until 1987. DJ Pierre's manipulation of the TB-303 created the squelching, evolving sounds that would define an entire genre and prove electronic music could be both experimental and deeply moving."
        }
      },
      {
        title: "Summer 1987 - Four DJs and a Revelation",
        content: "Paul Oakenfold, Danny Rampling, Nicky Holloway, and Johnny Walker went to Ibiza for a birthday celebration and discovered something that would transform British youth culture. At Amnesia club, DJ Alfredo's Balearic sets combined with MDMA created experiences that felt genuinely transformative. They returned to London determined to recreate the magic.",
        trackHighlight: {
          title: "Sueno Latino",
          artist: "Sueno Latino",
          year: "1989",
          story: "This Balearic classic bridged the gap between Ibiza's eclectic style and acid house, incorporating Manuel Göttsching's ambient textures with danceable rhythms, showing how electronic music could be both cerebral and physical."
        }
      },
      {
        title: "Shoom - The London Laboratory",
        content: "In December 1987, Danny and Jenni Rampling opened Shoom in a Southwark fitness center basement. The club adopted the yellow smiley face logo and created an atmosphere unlike anything London had seen. This wasn't just entertainment; it was meant to be transformative, a place where the Ibiza experience could be recreated and refined for British audiences.",
        trackHighlight: {
          title: "Voodoo Ray",
          artist: "A Guy Called Gerald",
          year: "1988",
          story: "Manchester producer Gerald Simpson's acid house masterpiece became a Shoom anthem, its hypnotic TB-303 lines and ethereal vocals perfectly capturing the spiritual dimension that made the club so special."
        }
      },
      {
        title: "The Haçienda Transformation",
        content: "Manchester's Haçienda had struggled since 1982, but acid house and MDMA transformed it overnight. Mike Pickering's sets, combined with the drug's consciousness-expanding effects, created an atmosphere that spawned the entire Madchester scene. The club installed a swimming pool on the dance floor, creating surreal experiences that participants would remember forever.",
        trackHighlight: {
          title: "Pacific State",
          artist: "808 State",
          year: "1989",
          story: "This Manchester acid house classic perfectly captured the euphoric, oceanic feeling of the Haçienda experience, with its flowing melodies and hypnotic rhythms creating a sense of weightless transcendence."
        }
      },
      {
        title: "The Moral Panic",
        content: "By summer 1988, acid house had exploded into mainstream consciousness, triggering a severe establishment backlash. Tabloids launched campaigns with headlines like 'EVIL OF ECSTASY,' while politicians called for emergency legislation. The moral panic inadvertently made acid house more attractive to alienated youth, transforming an apolitical movement into cultural resistance.",
        trackHighlight: {
          title: "Stakker Humanoid",
          artist: "Humanoid",
          year: "1988",
          story: "Brian Dougans' alien-sounding track became an anthem of resistance during the moral panic, its otherworldly sounds perfectly capturing the otherness that authorities feared and young people embraced."
        }
      },
      {
        title: "The Warehouse Revolution",
        content: "Government crackdowns forced acid house underground, where it evolved into the illegal rave scene. Warehouse parties required military-level organization, with phone trees and M25 convoys leading thousands to secret locations. These weren't just parties; they were experiments in alternative society, temporary autonomous zones where normal rules didn't apply.",
        trackHighlight: {
          title: "Chime",
          artist: "Orbital",
          year: "1989",
          story: "Named after the M25 motorway, this track became the anthem of the illegal rave scene, its hypnotic arpeggios evoking the lights of the motorway and the anticipation of unknown destinations."
        }
      },
      {
        title: "The Legacy: Transforming British Culture",
        content: "By 1992, acid house had permanently transformed British society. It opened ears to electronic music, introduced new values of inclusivity and community, revolutionized fashion, and demonstrated youth culture's power to create its own spaces. The PLUR philosophy influenced everything from fashion to politics, while the DIY ethos inspired new forms of cultural production.",
        highlight: "Acid house proved that youth culture could create genuine alternatives to mainstream society, that music and dancing could break down barriers of race and class, and that electronic technology could be a tool of liberation rather than control."
      }
    ],
    color: 'from-yellow-500 to-pink-600',
    images: [haciendasInterior, haciendaDancefloor, stoneRosesHappyMondays, madchesterScene],
    keyFigures: ['DJ Pierre', 'Danny Rampling', 'Paul Oakenfold', 'Mike Pickering'],
    keyVenues: ['Shoom', 'The Haçienda', 'Amnesia Ibiza', 'Warehouse Parties'],
    playlist: [
      { title: 'Acid Tracks', artist: 'Phuture', year: '1987' },
      { title: 'Voodoo Ray', artist: 'A Guy Called Gerald', year: '1988' },
      { title: 'Pacific State', artist: '808 State', year: '1989' },
      { title: 'Chime', artist: 'Orbital', year: '1989' },
      { title: 'Stakker Humanoid', artist: 'Humanoid', year: '1988' }
    ]
  }
]

function App() {
  const [selectedMovement, setSelectedMovement] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState(null)

  useEffect(() => {
    if (selectedMovement) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => 
          (prev + 1) % selectedMovement.images.length
        )
      }, 4000)
      return () => clearInterval(interval)
    }
  }, [selectedMovement])

  const playTrack = (track, movement) => {
    setCurrentTrack({ ...track, movement: movement.title })
    setIsPlaying(true)
    // In a real app, this would integrate with Spotify/YouTube API
    setTimeout(() => setIsPlaying(false), 3000) // Simulate playing
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10"></div>
      </div>
      
      {/* Header */}
      <header className="relative z-10 p-6 md:p-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <Music className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white">Musical Journeys</h1>
                <p className="text-purple-200 text-sm">Stories Worth Telling</p>
              </div>
            </div>
            
            {currentTrack && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center space-x-3 bg-black/20 backdrop-blur-sm rounded-full px-4 py-2"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  {isPlaying ? <Pause className="w-4 h-4 text-white" /> : <Play className="w-4 h-4 text-white" />}
                </div>
                <div className="text-white text-sm">
                  <div className="font-medium">{currentTrack.title}</div>
                  <div className="text-purple-200">{currentTrack.artist}</div>
                </div>
                <Volume2 className="w-4 h-4 text-purple-300" />
              </motion.div>
            )}
          </div>
        </motion.div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 px-6 md:px-8 py-12 md:py-20">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              Underground
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Movements</span>
              <br />That Changed the World
            </h2>
            <p className="text-xl md:text-2xl text-purple-200 mb-8 max-w-4xl mx-auto leading-relaxed">
              From marginalized communities to global phenomena, discover the revolutionary music movements 
              that transformed not just sound, but society itself.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="text-lg px-4 py-2">
                <Calendar className="w-4 h-4 mr-2" />
                1967-Present
              </Badge>
              <Badge variant="secondary" className="text-lg px-4 py-2">
                <MapPin className="w-4 h-4 mr-2" />
                6 Cities, 6 Revolutions
              </Badge>
              <Badge variant="secondary" className="text-lg px-4 py-2">
                <Users className="w-4 h-4 mr-2" />
                Countless Lives Changed
              </Badge>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Movements Grid */}
      <section className="relative z-10 px-6 md:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <motion.h3 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-3xl md:text-4xl font-bold text-white text-center mb-12"
          >
            Choose Your Journey
          </motion.h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {movements.map((movement, index) => (
              <motion.div
                key={movement.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="cursor-pointer"
                onClick={() => setSelectedMovement(movement)}
              >
                <Card className="bg-black/20 backdrop-blur-sm border-white/10 hover:border-white/30 transition-all duration-300 overflow-hidden group">
                  <div className={`h-48 bg-gradient-to-br ${movement.color} relative overflow-hidden`}>
                    <img 
                      src={movement.images[0]} 
                      alt={movement.title}
                      className="w-full h-full object-cover mix-blend-overlay opacity-60 group-hover:opacity-80 transition-opacity duration-300"
                    />
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-white/20 text-white border-white/30">
                        {movement.period}
                      </Badge>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h4 className="text-2xl font-bold text-white mb-1">{movement.title}</h4>
                      <p className="text-white/80 text-sm">{movement.subtitle}</p>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <p className="text-gray-300 text-sm leading-relaxed mb-4">
                      {movement.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-purple-300 text-sm font-medium">{movement.location}</span>
                      <Button size="sm" variant="ghost" className="text-purple-300 hover:text-white">
                        Explore <Play className="w-3 h-3 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Movement Detail Modal */}
      <AnimatePresence>
        {selectedMovement && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedMovement(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-slate-900 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                {/* Hero Image */}
                <div className={`h-64 md:h-80 bg-gradient-to-br ${selectedMovement.color} relative overflow-hidden`}>
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentImageIndex}
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.5 }}
                      src={selectedMovement.images[currentImageIndex]}
                      alt={selectedMovement.title}
                      className="w-full h-full object-cover mix-blend-overlay opacity-70"
                    />
                  </AnimatePresence>
                  <div className="absolute inset-0 bg-black/30"></div>
                  <button
                    onClick={() => setSelectedMovement(null)}
                    className="absolute top-4 right-4 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                  >
                    ×
                  </button>
                  <div className="absolute bottom-6 left-6 right-6">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">{selectedMovement.title}</h2>
                    <p className="text-xl text-white/90">{selectedMovement.subtitle}</p>
                    <div className="flex items-center space-x-4 mt-4">
                      <Badge className="bg-white/20 text-white border-white/30">
                        {selectedMovement.period}
                      </Badge>
                      <Badge className="bg-white/20 text-white border-white/30">
                        {selectedMovement.location}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8">
                  <Tabs defaultValue="story" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 mb-8">
                      <TabsTrigger value="story">Story</TabsTrigger>
                      <TabsTrigger value="playlist">Playlist</TabsTrigger>
                      <TabsTrigger value="gallery">Gallery</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="story" className="space-y-6">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-6">The Story</h3>
                        <div className="space-y-8">
                          {selectedMovement.sections?.map((section, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="space-y-4"
                            >
                              <h4 className="text-xl font-semibold text-purple-300 mb-3">{section.title}</h4>
                              <p className="text-gray-300 text-lg leading-relaxed">
                                {section.content}
                              </p>
                              
                              {section.highlight && (
                                <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 border-l-4 border-purple-400 p-4 rounded-r-lg">
                                  <p className="text-purple-100 italic leading-relaxed">
                                    {section.highlight}
                                  </p>
                                </div>
                              )}
                              
                              {section.trackHighlight && (
                                <div className="bg-gradient-to-r from-slate-800 to-slate-700 rounded-lg p-6 border border-slate-600">
                                  <div className="flex items-center space-x-3 mb-3">
                                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                                      <Music className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                      <h5 className="text-white font-semibold">{section.trackHighlight.title}</h5>
                                      <p className="text-gray-400 text-sm">{section.trackHighlight.artist} • {section.trackHighlight.year}</p>
                                    </div>
                                  </div>
                                  <p className="text-gray-300 leading-relaxed">
                                    {section.trackHighlight.story}
                                  </p>
                                </div>
                              )}
                            </motion.div>
                          )) || (
                            <p className="text-gray-300 text-lg leading-relaxed">
                              {selectedMovement.longDescription}
                            </p>
                          )}
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-xl font-semibold text-white mb-3">Key Figures</h4>
                          <div className="space-y-2">
                            {selectedMovement.keyFigures.map((figure, index) => (
                              <div key={index} className="flex items-center space-x-2">
                                <Star className="w-4 h-4 text-yellow-400" />
                                <span className="text-gray-300">{figure}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-xl font-semibold text-white mb-3">Key Venues</h4>
                          <div className="space-y-2">
                            {selectedMovement.keyVenues.map((venue, index) => (
                              <div key={index} className="flex items-center space-x-2">
                                <MapPin className="w-4 h-4 text-purple-400" />
                                <span className="text-gray-300">{venue}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="playlist" className="space-y-4">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-2xl font-bold text-white">Essential Tracks</h3>
                        <Button className="bg-green-600 hover:bg-green-700">
                          <Headphones className="w-4 h-4 mr-2" />
                          Listen on Spotify
                        </Button>
                      </div>
                      
                      <div className="space-y-3">
                        {selectedMovement.playlist.map((track, index) => (
                          <motion.div
                            key={index}
                            whileHover={{ scale: 1.02 }}
                            className="flex items-center justify-between p-4 bg-black/20 rounded-lg hover:bg-black/30 transition-colors cursor-pointer"
                            onClick={() => playTrack(track, selectedMovement)}
                          >
                            <div className="flex items-center space-x-4">
                              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                                <Play className="w-4 h-4 text-white" />
                              </div>
                              <div>
                                <div className="text-white font-medium">{track.title}</div>
                                <div className="text-gray-400 text-sm">{track.artist} • {track.year}</div>
                              </div>
                            </div>
                            <Heart className="w-5 h-5 text-gray-400 hover:text-red-400 transition-colors" />
                          </motion.div>
                        ))}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="gallery" className="space-y-4">
                      <h3 className="text-2xl font-bold text-white mb-6">Visual Journey</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {selectedMovement.images.map((image, index) => (
                          <motion.div
                            key={index}
                            whileHover={{ scale: 1.05 }}
                            className="aspect-square rounded-lg overflow-hidden cursor-pointer"
                            onClick={() => setCurrentImageIndex(index)}
                          >
                            <img
                              src={image}
                              alt={`${selectedMovement.title} ${index + 1}`}
                              className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                            />
                          </motion.div>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="relative z-10 px-6 md:px-8 py-12 mt-20">
        <div className="max-w-7xl mx-auto text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Music className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-4">The Beat Goes On</h3>
          <p className="text-purple-200 max-w-2xl mx-auto mb-8">
            These movements remind us that the most powerful cultural innovations often come from the most unexpected places. 
            The revolution continues, and somewhere, the next movement is already beginning.
          </p>
          <p className="text-gray-400 text-sm">
            © 2025 Musical Journeys. Stories worth telling, beats worth remembering.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App


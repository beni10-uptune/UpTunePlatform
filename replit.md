# Uptune - Musical Connection Platform

## Overview

Uptune is a modern web application that transforms music into a social experience through collaborative games and community interaction. Built as a guest-first platform, it allows users to create and join musical experiences without requiring sign-up, focusing on instant fun and connection.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state, React hooks for local state
- **UI Framework**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design system
- **Build Tool**: Vite for fast development and optimized builds
- **Animations**: Framer Motion for smooth transitions and micro-interactions

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Session Management**: Express sessions with PostgreSQL store
- **External APIs**: Spotify Web API for music search and data
- **AI Integration**: Anthropic Claude for playlist analysis and recommendations

### Database Design
- **ORM**: Drizzle with schema-first approach
- **Migration Strategy**: Drizzle Kit for database migrations
- **Connection**: Neon serverless PostgreSQL
- **Schema Location**: Shared between client and server (`/shared/schema.ts`)

## Key Components

### Game System
- **Game Types**: 
  - Jam Sessions: Collaborative themed playlists for any event or vibe
  - Desert Island Discs: Personal music sharing
  - Guess Who: Anonymous music sharing with reveals
- **Room Management**: Unique codes for game sessions
- **Real-time Features**: Live player joining and song submissions

### Community Features
- **Community Lists**: Public "Hall of Fame" style ranked lists
- **Voting System**: Upvote/downvote functionality for list entries
- **Weekly Challenges**: Rotating themed music challenges
- **Journeys**: Interactive musical storytelling experiences

### Spotify Integration
- **Search Functionality**: Real-time song and album search
- **Track Preview**: Audio preview support where available
- **Playlist Export**: Direct export to user's Spotify account
- **Rich Metadata**: Album art, artist info, and external links

### AI-Powered Features
- **Playlist Analysis**: Mood, genre, and theme detection
- **Story Enhancement**: AI-generated context and recommendations
- **Smart Suggestions**: Contextual song recommendations
- **Game Mode Suggestions**: AI-driven game recommendations

## Data Flow

### User Journey
1. **Landing**: Guest-first experience with instant game creation
2. **Game Creation**: Select game type and theme, generate room code
3. **Player Joining**: Share room code for others to join
4. **Song Submission**: Search and add songs with context/stories
5. **Playlist Generation**: Export to Spotify or continue playing

### Community Participation
1. **Browse Lists**: Discover community-curated music lists
2. **Submit Entries**: Add songs with reasoning/context
3. **Vote**: Influence rankings through voting
4. **Share**: Social sharing of favorite lists and entries

### Data Persistence
- **Game Sessions**: Temporary storage with cleanup
- **Community Content**: Permanent storage with version control
- **User Contributions**: Anonymous-friendly with optional attribution
- **Analytics**: Privacy-focused usage tracking

## External Dependencies

### Core Services
- **Neon Database**: Serverless PostgreSQL hosting
- **Spotify Web API**: Music search, metadata, and playlist management
- **Anthropic Claude**: AI-powered content analysis and generation
- **SendGrid**: Email notifications (optional)

### Development Tools
- **Vite**: Development server and build optimization
- **Drizzle Kit**: Database schema management and migrations
- **ESBuild**: Server-side code bundling for production

### UI Libraries
- **Radix UI**: Accessible component primitives
- **Tailwind CSS**: Utility-first styling framework
- **Lucide React**: Icon library
- **Framer Motion**: Animation library

## Deployment Strategy

### Development Environment
- **Hot Reload**: Vite HMR for instant feedback
- **Type Safety**: Full TypeScript coverage across stack
- **Database**: Local or remote PostgreSQL with Drizzle migrations
- **Environment Variables**: Local `.env` file management

### Production Build
- **Frontend**: Static asset generation via Vite
- **Backend**: ESBuild bundling for Node.js deployment
- **Database**: Automated migrations via Drizzle Kit
- **Assets**: CDN-ready static file output

### Hosting Requirements
- **Node.js**: ES module support required
- **PostgreSQL**: Compatible database with connection pooling
- **Environment Variables**: Secure handling of API keys and secrets
- **HTTPS**: Required for Spotify API integration

## Changelog

```
Changelog:
- June 28, 2025. Initial setup
- June 30, 2025. Enhanced Musical Journeys with comprehensive content from Manus design:
  * Added 5 detailed musical journeys: Disco, Acid House, Berlin Electronic, Detroit Techno, and Madchester
  * Integrated rich storytelling with track highlights, YouTube videos, community polls, and mixtapes
  * Enhanced immersive single-page scrollable experience with parallax effects and animations
  * Added curated "Ultimate Playlist" sections for each journey with Spotify integration
  * Improved mobile responsiveness and visual design with cutting-edge gradients and motion effects
- June 30, 2025. Major platform updates and rebranding:
  * Changed "Soundtrack" game mode to "Jam Sessions" throughout entire platform and database
  * Changed "Podcast" tab to "Playlist" tab in journey navigation with proper 3-tab Manus design
  * Replaced Weekly Challenge feature with Featured Musical Journey panel showcasing immersive content
  * Integrated community playlists into each journey with direct links to related community lists
  * Added "Play in Spotify" links for all songs in journeys and playlist sections
  * Enhanced navigation throughout site with proper "Back to Uptune" links and cross-navigation
  * Updated all AI context references and game descriptions to reflect new terminology
- June 30, 2025. World-class user experience improvements:
  * Fixed Musical Journey songs overflow on homepage with responsive vertical layout
  * Removed problematic white tab backgrounds in journey navigation (changed to purple active state)
  * Fixed all game button overflow issues on mobile with truncation and responsive design
  * Improved button text lengths for mobile compatibility (shortened "Create Playlist in Spotify" to "Create in Spotify")
  * Enhanced Guess Who reveal functionality to properly display player nicknames when revealed
  * Removed all Weekly Challenge references from platform per user request
  * Implemented comprehensive responsive design across all interactive elements
- June 30, 2025. Final cleanup and navigation improvements:
  * Removed "Songs That Make You Invincible" community list from homepage completely
  * Added Musical Journeys to main navigation menu for easy access
  * Applied enhanced CSS fixes for white button issue on journey pages with inline styles
  * Added redirect from /musicaljourneys to /journeys for URL compatibility
- July 5, 2025. Bug fixes and comprehensive site testing:
  * Fixed game room creation issue: changed 'jam-session' to 'jam-sessions' in game-room.tsx to match database schema
  * Fixed Madchester button 404 error: corrected journey routing from /journey/:slug to /journeys/:slug in App.tsx and journeys.tsx
  * FIXED white text on white background issue: Changed "Create Game" button on journeys page from outline variant to gradient background
  * Added comprehensive CSS overrides to prevent white text visibility issues across all buttons
  * Fixed Spotify button functionality: changed from direct track links to Spotify search links to ensure working functionality
  * Confirmed game type consistency across all components
  * Verified all musical journeys have associated community playlists:
    - Disco → "Disco Classics" (1 entry)
    - Acid House → "Acid House Classics" (0 entries, ready for community)
    - Berlin Electronic → "Berlin Electronic Revolution" (0 entries, ready for community)
    - Detroit Techno → "Detroit Techno Pioneers" (0 entries, ready for community)
    - Madchester → "Madchester Anthem" (2 entries)
  * Updated journey-to-community-list mapping to ensure proper linking
- July 5, 2025. Complete design system transformation and comprehensive improvement plan:
  * UNIFIED DESIGN LANGUAGE: Transformed entire platform to use Musical Journeys aesthetic consistently
  * Applied dark gradient backgrounds (slate-900 via purple-900) with glass-morphism effects across all pages
  * Standardized button design system: gradient primary buttons, glass-morphism secondary, proper contrast everywhere
  * Fixed all JSX structure issues and broken styling that was causing application failures
  * Created comprehensive strategic improvement roadmap covering traffic, engagement, and team conversions
  * Identified immediate priorities: social proof engine, SEO optimization, gamification elements
  * Planned 4-phase implementation: Foundation (Week 1), Engagement (Week 2), Teams Focus (Week 3), Growth (Week 4)
  * Documented specific success metrics and KPIs for tracking progress across all improvement areas
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```

## Improvement Roadmap (July 5, 2025)

### Immediate Priorities
1. Fix button styling consistency across site
2. Implement social proof on homepage
3. Add game templates for quick start
4. Optimize Teams conversion funnel

### Engagement Features
- Community leaderboards
- Achievement system
- Social sharing capabilities
- Email capture for playlist saving

### Technical Improvements
- Performance optimization
- Mobile responsive fixes
- Real-time updates via WebSocket
- Analytics implementation
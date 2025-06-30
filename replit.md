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
  - Soundtrack: Collaborative themed playlists
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
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```
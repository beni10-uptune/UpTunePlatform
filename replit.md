# Uptune - Musical Connection Platform

## Overview
Uptune is a modern web application designed to transform music into a social experience through collaborative games and community interaction. It is a guest-first platform, allowing users to create and join musical experiences instantly without requiring sign-up. The project aims to foster connection and fun through shared musical journeys and community-curated content, leveraging AI for recommendations and Spotify integration for music access.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter
- **State Management**: TanStack Query for server state, React hooks for local state
- **UI Framework**: shadcn/ui built on Radix UI
- **Styling**: Tailwind CSS with custom design system, glass-morphism effects, and consistent dark gradient aesthetic (slate-900 via purple-900)
- **Build Tool**: Vite
- **Animations**: Framer Motion

### Backend
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM (schema-first approach, Drizzle Kit for migrations)
- **Session Management**: Express sessions with PostgreSQL store
- **AI Integration**: Anthropic Claude for playlist analysis and recommendations

### Core Features
- **Game System**: Collaborative Jam Sessions, Desert Island Discs, Guess Who, with unique room codes and real-time interaction.
- **Community Features**: Public "Hall of Fame" style ranked lists (Community Playlists), voting system, and interactive Musical Journeys.
- **Spotify Integration**: Search, track preview, playlist export, and rich metadata.
- **AI-Powered Features**: Playlist analysis, story enhancement, smart song suggestions, and game mode recommendations.
- **Guest-First Experience**: Instant game creation and participation without mandatory sign-up; optional Replit OpenID Connect authentication for advanced features like saved games and user dashboards.
- **Universal Design**: Consistent dark gradient aesthetic and universal header across all pages, with responsive design for mobile.

## External Dependencies

- **Neon Database**: Serverless PostgreSQL hosting.
- **Spotify Web API**: Music search, metadata, and playlist management.
- **Anthropic Claude**: AI-powered content analysis and generation.
- **SendGrid**: Email notifications (optional).
- **Vite**: Development server and build optimization.
- **Drizzle Kit**: Database schema management and migrations.
- **Radix UI**: Accessible component primitives.
- **Tailwind CSS**: Utility-first styling framework.
- **Lucide React**: Icon library.
- **Framer Motion**: Animation library.
# Uptune - Complete Code & Styling Guide

## 🎨 Design System Overview

The refreshed Uptune experience features a modern, vibrant design system built around music and connection themes. Here's the complete breakdown:

### Color Palette
- **Primary Purple**: `oklch(0.6 0.2 280)` - Main brand color
- **Accent Pink**: `oklch(0.8 0.15 320)` - Secondary accent
- **Gradient**: Purple to Pink (`linear-gradient(135deg, oklch(0.6 0.2 280), oklch(0.8 0.15 320))`)
- **Background**: Soft gradient from purple-50 to pink-50
- **Text**: High contrast grays for accessibility

### Typography
- **Headings**: Bold, large scale (5xl-6xl for hero)
- **Body**: Clean, readable with good line spacing
- **Gradient Text**: Purple-to-pink gradient on key phrases

### Animation & Interactions
- **Framer Motion**: Smooth page transitions and micro-interactions
- **Hover Effects**: Subtle transforms and color changes
- **Pulse Animations**: For active elements
- **Music Wave**: Animated gradient bars

## 📁 Complete File Structure

```
uptune-app/
├── public/
├── src/
│   ├── components/
│   │   ├── ui/           # shadcn/ui components
│   │   ├── LandingPage.jsx
│   │   ├── GameMenu.jsx
│   │   ├── GameRoom.jsx
│   │   ├── WeeklyChallenge.jsx
│   │   └── TeamsWaitlist.jsx
│   ├── App.jsx
│   ├── App.css          # Main styling
│   └── main.jsx
├── index.html
└── package.json
```

## 🎯 Key Features Implemented

### 1. Guest-First Onboarding
- No signup required
- Nickname-only entry
- Instant game creation
- Shareable links

### 2. Three Core Games
- **The Mixtape**: Collaborative playlists
- **Soundtrack Session**: Event-based playlists  
- **Desert Island Discs**: Personal sharing

### 3. Weekly Challenge
- Global themed challenges
- Community voting
- Trending songs
- Past winners showcase

### 4. B2B Lead Capture
- Teams waitlist
- Feature comparison
- Pricing preview
- Professional design

## 🚀 Deployment

**Live URL**: https://nakifghe.manus.space

The application is fully deployed and ready for demonstration!


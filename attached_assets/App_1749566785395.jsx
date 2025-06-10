import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './App.css';

// Components
import LandingPage from './components/LandingPage';
import GameMenu from './components/GameMenu';
import GameRoom from './components/GameRoom';
import WeeklyChallenge from './components/WeeklyChallenge';
import TeamsWaitlist from './components/TeamsWaitlist';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/games" element={<GameMenu />} />
          <Route path="/game/:gameType" element={<GameRoom />} />
          <Route path="/challenge" element={<WeeklyChallenge />} />
          <Route path="/teams" element={<TeamsWaitlist />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


// Vercel serverless function entry point
// This file imports the built server and exports it for Vercel

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Import the built server app from dist directory
// The app will be initialized by the server/index.ts build output
let app;

try {
  // In production (Vercel), import from the built dist folder
  const { default: builtApp } = await import('../dist/index.js');
  app = builtApp || app;
} catch (error) {
  console.error('Failed to import built app:', error);
  // Fallback: create a minimal Express app for health checks
  const express = (await import('express')).default;
  app = express();
  app.use(express.json());
  app.get('/api/health', (req, res) => {
    res.json({ status: 'initializing', message: 'UpTune API' });
  });
}

export default app;

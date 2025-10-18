import type { Request, Response, NextFunction } from 'express';
import { getUserFromToken, supabaseAdmin } from '../lib/supabase';

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email?: string;
        user_metadata?: any;
      };
    }
  }
}

export async function authenticateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No authorization token provided' });
    }

    const token = authHeader.replace('Bearer ', '');

    // Validate token with Supabase
    const user = await getUserFromToken(token);

    if (!user) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }

    // Attach user to request
    req.user = {
      id: user.id,
      email: user.email,
      user_metadata: user.user_metadata
    };

    // Sync user to local database (if supabaseAdmin is available)
    if (supabaseAdmin) {
      await supabaseAdmin.from('auth_users').upsert({
        id: user.id,
        email: user.email,
        first_name: user.user_metadata?.first_name || user.user_metadata?.full_name?.split(' ')[0],
        last_name: user.user_metadata?.last_name || user.user_metadata?.full_name?.split(' ').slice(1).join(' '),
        profile_image_url: user.user_metadata?.avatar_url,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'id'
      });
    }

    next();
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({ message: 'Authentication failed' });
  }
}

// Alias for backwards compatibility
export const isAuthenticated = authenticateUser;

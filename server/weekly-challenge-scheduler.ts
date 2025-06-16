import { db } from "./db.js";
import { weeklyChallenge } from "../shared/schema.js";
import { eq, and, lte, gte, asc } from "drizzle-orm";

export class WeeklyChallengeScheduler {
  /**
   * Initialize and update all weekly challenge dates to start from the current week
   */
  static async initializeChallengeSchedule() {
    try {
      console.log("Initializing weekly challenge schedule...");
      
      // Get all challenges ordered by ID
      const challenges = await db.select()
        .from(weeklyChallenge)
        .orderBy(asc(weeklyChallenge.id));

      if (challenges.length === 0) {
        console.log("No challenges found to schedule");
        return;
      }

      // Calculate the start of current week (Sunday)
      const now = new Date();
      const currentWeekStart = new Date(now);
      currentWeekStart.setDate(now.getDate() - now.getDay());
      currentWeekStart.setHours(0, 0, 0, 0);

      // Update each challenge with consecutive weekly dates
      for (let i = 0; i < challenges.length; i++) {
        const challenge = challenges[i];
        const weekOffset = i;
        
        const startDate = new Date(currentWeekStart);
        startDate.setDate(currentWeekStart.getDate() + (weekOffset * 7));
        
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 6);
        endDate.setHours(23, 59, 59, 999);

        await db.update(weeklyChallenge)
          .set({
            startDate: startDate,
            endDate: endDate,
            isActive: weekOffset === 0 // Only current week is active
          })
          .where(eq(weeklyChallenge.id, challenge.id));

        if (weekOffset === 0) {
          console.log(`Active challenge: ${challenge.title} (${startDate.toDateString()} - ${endDate.toDateString()})`);
        }
      }

      console.log(`Scheduled ${challenges.length} weekly challenges`);
      return true;
    } catch (error) {
      console.error("Error initializing challenge schedule:", error);
      return false;
    }
  }

  /**
   * Check if we need to rotate to next week's challenge
   */
  static async checkAndRotateChallenge() {
    try {
      const now = new Date();
      
      // Find current active challenge
      const [activeChallenge] = await db.select()
        .from(weeklyChallenge)
        .where(eq(weeklyChallenge.isActive, true))
        .limit(1);

      if (!activeChallenge) {
        console.log("No active challenge found, initializing schedule");
        return await this.initializeChallengeSchedule();
      }

      // Check if current challenge has expired
      if (now > activeChallenge.endDate) {
        console.log(`Challenge "${activeChallenge.title}" has expired, rotating to next challenge`);
        
        // Deactivate current challenge
        await db.update(weeklyChallenge)
          .set({ isActive: false })
          .where(eq(weeklyChallenge.id, activeChallenge.id));

        // Find and activate next challenge
        const [nextChallenge] = await db.select()
          .from(weeklyChallenge)
          .where(
            and(
              lte(weeklyChallenge.startDate, now),
              gte(weeklyChallenge.endDate, now)
            )
          )
          .limit(1);

        if (nextChallenge) {
          await db.update(weeklyChallenge)
            .set({ isActive: true })
            .where(eq(weeklyChallenge.id, nextChallenge.id));
          
          console.log(`Activated next challenge: ${nextChallenge.title}`);
          return nextChallenge;
        } else {
          console.log("No next challenge available, re-initializing schedule");
          return await this.initializeChallengeSchedule();
        }
      }

      return activeChallenge;
    } catch (error) {
      console.error("Error checking/rotating challenge:", error);
      return null;
    }
  }

  /**
   * Get upcoming challenges for preview
   */
  static async getUpcomingChallenges(limit: number = 5) {
    try {
      const now = new Date();
      return await db.select()
        .from(weeklyChallenge)
        .where(gte(weeklyChallenge.startDate, now))
        .orderBy(asc(weeklyChallenge.startDate))
        .limit(limit);
    } catch (error) {
      console.error("Error fetching upcoming challenges:", error);
      return [];
    }
  }
}
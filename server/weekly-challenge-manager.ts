import { db } from "./db.js";
import { weeklyChallenge } from "../shared/schema.js";
import { eq, and, lte, gte } from "drizzle-orm";

export class WeeklyChallengeManager {
  private static instance: WeeklyChallengeManager;
  private intervalId: NodeJS.Timeout | null = null;

  private constructor() {}

  static getInstance(): WeeklyChallengeManager {
    if (!WeeklyChallengeManager.instance) {
      WeeklyChallengeManager.instance = new WeeklyChallengeManager();
    }
    return WeeklyChallengeManager.instance;
  }

  /**
   * Initialize the weekly challenge rotation system
   */
  async initialize() {
    // Check and update challenges immediately
    await this.updateActiveChallenge();
    
    // Set up automatic rotation every hour
    this.intervalId = setInterval(async () => {
      await this.updateActiveChallenge();
    }, 60 * 60 * 1000); // Check every hour

    console.log("Weekly challenge rotation system initialized");
  }

  /**
   * Stop the automatic rotation system
   */
  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  /**
   * Update the active challenge based on current date
   */
  async updateActiveChallenge() {
    try {
      const now = new Date();
      
      // First, deactivate all challenges
      await db.update(weeklyChallenge)
        .set({ isActive: false })
        .where(eq(weeklyChallenge.isActive, true));

      // Find and activate the current week's challenge
      const currentChallenge = await db.select()
        .from(weeklyChallenge)
        .where(
          and(
            lte(weeklyChallenge.startDate, now),
            gte(weeklyChallenge.endDate, now)
          )
        )
        .limit(1);

      if (currentChallenge.length > 0) {
        await db.update(weeklyChallenge)
          .set({ isActive: true })
          .where(eq(weeklyChallenge.id, currentChallenge[0].id));

        console.log(`Activated weekly challenge: ${currentChallenge[0].title}`);
        return currentChallenge[0];
      } else {
        console.log("No weekly challenge found for current date");
        return null;
      }
    } catch (error) {
      console.error("Error updating active challenge:", error);
      return null;
    }
  }

  /**
   * Get the current active challenge
   */
  async getCurrentChallenge() {
    try {
      const activeChallenge = await db.select()
        .from(weeklyChallenge)
        .where(eq(weeklyChallenge.isActive, true))
        .limit(1);

      if (activeChallenge.length === 0) {
        // If no active challenge, try to find and activate one
        return await this.updateActiveChallenge();
      }

      return activeChallenge[0];
    } catch (error) {
      console.error("Error fetching current challenge:", error);
      return null;
    }
  }

  /**
   * Force refresh the current challenge (useful for manual updates)
   */
  async forceRefresh() {
    return await this.updateActiveChallenge();
  }

  /**
   * Get challenge statistics
   */
  async getChallengeStats() {
    try {
      const [totalChallenges] = await db.select({
        count: db.$count(weeklyChallenge)
      }).from(weeklyChallenge);

      const [activeChallenges] = await db.select({
        count: db.$count(weeklyChallenge)
      }).from(weeklyChallenge)
      .where(eq(weeklyChallenge.isActive, true));

      return {
        total: totalChallenges.count,
        active: activeChallenges.count,
        lastUpdate: new Date().toISOString()
      };
    } catch (error) {
      console.error("Error fetching challenge stats:", error);
      return null;
    }
  }
}

export const challengeManager = WeeklyChallengeManager.getInstance();
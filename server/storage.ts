import { 
  type GameRoom, 
  type InsertGameRoom,
  type Player,
  type InsertPlayer,
  type Song,
  type InsertSong,
  type WeeklyChallenge,
  type ChallengeSubmission,
  type InsertChallengeSubmission,
  type TeamsWaitlist,
  type InsertTeamsWaitlist
} from "@shared/schema";

export interface IStorage {
  // Game Rooms
  createGameRoom(gameRoom: InsertGameRoom): Promise<GameRoom>;
  getGameRoomByCode(code: string): Promise<GameRoom | undefined>;
  getGameRoom(id: number): Promise<GameRoom | undefined>;
  
  // Players
  addPlayer(player: InsertPlayer): Promise<Player>;
  getPlayersByGameRoom(gameRoomId: number): Promise<Player[]>;
  
  // Songs
  addSong(song: InsertSong): Promise<Song>;
  getSongsByGameRoom(gameRoomId: number): Promise<Song[]>;
  
  // Weekly Challenge
  getCurrentChallenge(): Promise<WeeklyChallenge | undefined>;
  
  // Challenge Submissions
  addChallengeSubmission(submission: InsertChallengeSubmission): Promise<ChallengeSubmission>;
  getChallengeSubmissions(challengeId: number): Promise<ChallengeSubmission[]>;
  voteForSubmission(submissionId: number): Promise<void>;
  
  // Teams Waitlist
  addToTeamsWaitlist(entry: InsertTeamsWaitlist): Promise<TeamsWaitlist>;
}

export class MemStorage implements IStorage {
  private gameRooms: Map<number, GameRoom>;
  private players: Map<number, Player>;
  private songs: Map<number, Song>;
  private challengeSubmissions: Map<number, ChallengeSubmission>;
  private teamsWaitlist: Map<number, TeamsWaitlist>;
  private currentId: number;

  constructor() {
    this.gameRooms = new Map();
    this.players = new Map();
    this.songs = new Map();
    this.challengeSubmissions = new Map();
    this.teamsWaitlist = new Map();
    this.currentId = 1;

    // Seed current weekly challenge and some sample submissions
    this.seedInitialData();
  }

  private generateGameCode(): string {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  }

  private seedInitialData() {
    // Add some sample challenge submissions for the trending list
    const submissions = [
      { nickname: "MusicLover23", songTitle: "Mr. Brightside", songArtist: "The Killers", votes: 89 },
      { nickname: "RetroVibes", songTitle: "Hey Ya!", songArtist: "OutKast", votes: 76 },
      { nickname: "PopPrincess", songTitle: "Since U Been Gone", songArtist: "Kelly Clarkson", votes: 64 },
      { nickname: "DanceMachine", songTitle: "Hips Don't Lie", songArtist: "Shakira", votes: 58 },
      { nickname: "SoulSearcher", songTitle: "Crazy", songArtist: "Gnarls Barkley", votes: 52 },
    ];

    submissions.forEach(sub => {
      const submission: ChallengeSubmission = {
        id: this.currentId++,
        challengeId: 1,
        nickname: sub.nickname,
        songTitle: sub.songTitle,
        songArtist: sub.songArtist,
        story: null,
        votes: sub.votes,
        submittedAt: new Date(),
      };
      this.challengeSubmissions.set(submission.id, submission);
    });
  }

  async createGameRoom(gameRoom: InsertGameRoom): Promise<GameRoom> {
    const id = this.currentId++;
    const code = this.generateGameCode();
    const room: GameRoom = {
      ...gameRoom,
      id,
      code,
      createdAt: new Date(),
    };
    this.gameRooms.set(id, room);
    return room;
  }

  async getGameRoomByCode(code: string): Promise<GameRoom | undefined> {
    return Array.from(this.gameRooms.values()).find(room => room.code === code);
  }

  async getGameRoom(id: number): Promise<GameRoom | undefined> {
    return this.gameRooms.get(id);
  }

  async addPlayer(player: InsertPlayer): Promise<Player> {
    const id = this.currentId++;
    const newPlayer: Player = {
      ...player,
      id,
      joinedAt: new Date(),
    };
    this.players.set(id, newPlayer);
    return newPlayer;
  }

  async getPlayersByGameRoom(gameRoomId: number): Promise<Player[]> {
    return Array.from(this.players.values()).filter(player => player.gameRoomId === gameRoomId);
  }

  async addSong(song: InsertSong): Promise<Song> {
    const id = this.currentId++;
    const newSong: Song = {
      ...song,
      id,
      addedAt: new Date(),
    };
    this.songs.set(id, newSong);
    return newSong;
  }

  async getSongsByGameRoom(gameRoomId: number): Promise<Song[]> {
    return Array.from(this.songs.values()).filter(song => song.gameRoomId === gameRoomId);
  }

  async getCurrentChallenge(): Promise<WeeklyChallenge | undefined> {
    return {
      id: 1,
      title: "Your Ultimate High School Anthem",
      description: "What song perfectly captures your high school experience? The track that takes you right back to those hallways, friendships, and unforgettable moments.",
      emoji: "🎓",
      startDate: new Date("2024-06-09"),
      endDate: new Date("2024-06-15"),
      isActive: true,
    };
  }

  async addChallengeSubmission(submission: InsertChallengeSubmission): Promise<ChallengeSubmission> {
    const id = this.currentId++;
    const newSubmission: ChallengeSubmission = {
      ...submission,
      id,
      submittedAt: new Date(),
    };
    this.challengeSubmissions.set(id, newSubmission);
    return newSubmission;
  }

  async getChallengeSubmissions(challengeId: number): Promise<ChallengeSubmission[]> {
    return Array.from(this.challengeSubmissions.values())
      .filter(submission => submission.challengeId === challengeId)
      .sort((a, b) => b.votes - a.votes);
  }

  async voteForSubmission(submissionId: number): Promise<void> {
    const submission = this.challengeSubmissions.get(submissionId);
    if (submission) {
      submission.votes += 1;
      this.challengeSubmissions.set(submissionId, submission);
    }
  }

  async addToTeamsWaitlist(entry: InsertTeamsWaitlist): Promise<TeamsWaitlist> {
    const id = this.currentId++;
    const newEntry: TeamsWaitlist = {
      ...entry,
      id,
      submittedAt: new Date(),
    };
    this.teamsWaitlist.set(id, newEntry);
    return newEntry;
  }
}

export const storage = new MemStorage();

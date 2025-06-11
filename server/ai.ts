import Anthropic from '@anthropic-ai/sdk';

// the newest Anthropic model is "claude-sonnet-4-20250514" which was released May 14, 2025. Use this by default unless user has already selected claude-3-7-sonnet-20250219
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

interface Song {
  title: string;
  artist: string;
  album?: string;
  story?: string;
}

interface PlaylistAnalysis {
  mood: string;
  genres: string[];
  energy: 'low' | 'medium' | 'high';
  themes: string[];
  description: string;
  recommendations: string[];
}

interface StoryEnhancement {
  enhancedStory: string;
  suggestions: string[];
}

export async function analyzePlaylist(songs: Song[]): Promise<PlaylistAnalysis> {
  try {
    if (!process.env.ANTHROPIC_API_KEY) {
      throw new Error('Anthropic API key not available');
    }

    const songList = songs.map(song => 
      `"${song.title}" by ${song.artist}${song.story ? ` (Story: ${song.story})` : ''}`
    ).join('\n');

    const prompt = `Analyze this music playlist and provide insights:

${songList}

Please analyze the overall mood, energy level, genres, and themes. Then suggest 3 similar songs that would fit well with this playlist. 

Respond in JSON format with this structure:
{
  "mood": "brief mood description",
  "genres": ["genre1", "genre2"],
  "energy": "low|medium|high",
  "themes": ["theme1", "theme2"],
  "description": "2-sentence description of the playlist's vibe",
  "recommendations": ["Song Title - Artist", "Song Title - Artist", "Song Title - Artist"]
}`;

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      messages: [{ role: 'user', content: prompt }],
    });

    const content = response.content[0];
    if (content.type === 'text') {
      return JSON.parse(content.text);
    }
    
    throw new Error('Invalid response format');
  } catch (error) {
    console.error('AI playlist analysis error:', error);
    // Return fallback analysis
    return {
      mood: 'Eclectic mix',
      genres: ['Various'],
      energy: 'medium',
      themes: ['Personal favorites'],
      description: 'A diverse collection of meaningful songs that tell a story.',
      recommendations: []
    };
  }
}

export async function enhanceStory(song: Song, currentStory: string): Promise<StoryEnhancement> {
  try {
    if (!process.env.ANTHROPIC_API_KEY) {
      throw new Error('Anthropic API key not available');
    }

    const prompt = `Help enhance this song story to be more engaging and personal:

Song: "${song.title}" by ${song.artist}
Current story: "${currentStory}"

Please:
1. Enhance the story to be more vivid and emotional while keeping the core meaning
2. Suggest 2-3 alternative ways to tell this story
3. Keep it authentic and personal

Respond in JSON format:
{
  "enhancedStory": "improved version of the story",
  "suggestions": ["alternative 1", "alternative 2", "alternative 3"]
}`;

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      messages: [{ role: 'user', content: prompt }],
    });

    const content = response.content[0];
    if (content.type === 'text') {
      return JSON.parse(content.text);
    }
    
    throw new Error('Invalid response format');
  } catch (error) {
    console.error('AI story enhancement error:', error);
    return {
      enhancedStory: currentStory,
      suggestions: []
    };
  }
}

export async function generateSongRecommendations(songs: Song[], gameType: string): Promise<string[]> {
  try {
    if (!process.env.ANTHROPIC_API_KEY) {
      throw new Error('Anthropic API key not available');
    }

    const songList = songs.map(song => 
      `"${song.title}" by ${song.artist}`
    ).join('\n');

    const gameContext = {
      'mixtape': 'collaborative mixtape where friends share their favorite songs',
      'soundtrack': 'movie soundtrack creation session',
      'desert-island': 'desert island discs - essential songs that define someone'
    };

    const prompt = `Based on this ${gameContext[gameType as keyof typeof gameContext]} playlist:

${songList}

Suggest 5 songs that would complement this collection perfectly. Consider the musical style, mood, and themes. 

Respond with just an array of strings in this format:
["Song Title - Artist", "Song Title - Artist", "Song Title - Artist", "Song Title - Artist", "Song Title - Artist"]`;

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 512,
      messages: [{ role: 'user', content: prompt }],
    });

    const content = response.content[0];
    if (content.type === 'text') {
      return JSON.parse(content.text);
    }
    
    throw new Error('Invalid response format');
  } catch (error) {
    console.error('AI song recommendations error:', error);
    return [];
  }
}

export async function suggestGameMode(playerCount: number, context?: string): Promise<{
  recommended: string;
  reason: string;
  alternatives: Array<{ mode: string; reason: string }>;
}> {
  try {
    if (!process.env.ANTHROPIC_API_KEY) {
      throw new Error('Anthropic API key not available');
    }

    const prompt = `Suggest the best UpTune game mode for a group of ${playerCount} people${context ? ` in this context: ${context}` : ''}.

Available modes:
- Collaborative Mixtape: Everyone adds favorite songs with stories
- Movie Soundtrack: Create soundtrack for a movie theme  
- Desert Island Discs: 5 essential songs (head, heart, feet, guilty pleasure, current obsession)

Consider group size, engagement level, and time commitment.

Respond in JSON:
{
  "recommended": "mode name",
  "reason": "why this mode works best",
  "alternatives": [
    {"mode": "alternative mode", "reason": "why this could also work"}
  ]
}`;

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 512,
      messages: [{ role: 'user', content: prompt }],
    });

    const content = response.content[0];
    if (content.type === 'text') {
      return JSON.parse(content.text);
    }
    
    throw new Error('Invalid response format');
  } catch (error) {
    console.error('AI game suggestion error:', error);
    return {
      recommended: 'Collaborative Mixtape',
      reason: 'Great for any group size and easy to get started',
      alternatives: []
    };
  }
}

// AI Host Game Mode Functions
export async function generateAiHostQuestion(context: {
  playerName?: string;
  previousSongs?: Song[];
  conversationHistory?: string[];
  questionNumber: number;
}): Promise<{
  question: string;
  followUpSuggestions: string[];
}> {
  try {
    if (!process.env.ANTHROPIC_API_KEY) {
      throw new Error('Anthropic API key not available');
    }

    const { playerName, previousSongs = [], conversationHistory = [], questionNumber } = context;
    
    const songContext = previousSongs.length > 0 
      ? `Previous songs chosen: ${previousSongs.map(s => `"${s.title}" by ${s.artist}`).join(', ')}`
      : 'No songs chosen yet';
    
    const historyContext = conversationHistory.length > 0
      ? `Previous conversation: ${conversationHistory.slice(-3).join('\n')}`
      : 'Starting fresh conversation';

    const prompt = `You're helping ${playerName || 'someone'} create the perfect shared music experience. 
    This is question #${questionNumber}.

    Context:
    ${songContext}
    ${historyContext}

    Your role is to help them discover what kind of moment they want to create with others, then guide the group toward that perfect experience.

    For early questions (1-2), focus on uncovering their vision:
    - What kind of experience are they trying to create?
    - What mood or feeling do they want to share?
    - What moments matter most to them?

    For later questions (3+), help them guide others:
    - How can the group contribute to this vision?
    - What would make this moment even more special?
    - How can everyone feel connected through the music?

    Examples of vision-discovery questions:
    - "What's a moment you've shared with others where the music made everything perfect?"
    - "If you could create the ideal soundtrack for time with your favorite people, what feeling would it capture?"
    - "What's a song that always brings people together when it comes on?"

    Respond with JSON:
    {
      "question": "your engaging question",
      "followUpSuggestions": ["3 follow-up prompts that help them think deeper about connection and shared experiences"]
    }`;

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 400,
      messages: [{ role: 'user', content: prompt }]
    });

    const content = response.content[0];
    if (content.type === 'text') {
      return JSON.parse(content.text);
    }
    
    throw new Error('Invalid response format');
  } catch (error) {
    console.error('AI host question generation error:', error);
    return {
      question: "What song always puts you in a great mood, no matter what?",
      followUpSuggestions: [
        "Tell me about the first time you heard it",
        "What memories does it bring back?",
        "How does it make you want to move or dance?"
      ]
    };
  }
}

export async function generateSongSuggestionsFromResponse(userResponse: string, context: {
  question: string;
  playerName?: string;
  previousSongs?: Song[];
}): Promise<{
  suggestions: string[];
  reasoning: string;
}> {
  try {
    if (!process.env.ANTHROPIC_API_KEY) {
      throw new Error('Anthropic API key not available');
    }

    const { question, playerName, previousSongs = [] } = context;
    
    const songContext = previousSongs.length > 0 
      ? `Previous songs: ${previousSongs.map(s => `"${s.title}" by ${s.artist}`).join(', ')}`
      : '';

    const prompt = `You're an AI music host. ${playerName || 'A player'} was asked: "${question}"
    
    Their response: "${userResponse}"
    ${songContext}

    Based on their response, suggest 3-5 specific songs that perfectly match their vibe, story, or emotion. 
    Consider their personality, the context they shared, and create a diverse but cohesive selection.

    Respond with JSON:
    {
      "suggestions": ["Song Title - Artist", "Song Title - Artist", "Song Title - Artist"],
      "reasoning": "brief explanation of why these songs fit their response"
    }`;

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 500,
      messages: [{ role: 'user', content: prompt }]
    });

    const content = response.content[0];
    if (content.type === 'text') {
      return JSON.parse(content.text);
    }
    
    throw new Error('Invalid response format');
  } catch (error) {
    console.error('Song suggestion generation error:', error);
    return {
      suggestions: [
        "Good Vibes - The Beach Boys",
        "Walking on Sunshine - Katrina and the Waves",
        "Don't Stop Me Now - Queen"
      ],
      reasoning: "Classic feel-good songs that lift anyone's mood"
    };
  }
}
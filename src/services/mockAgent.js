/**
 * @returns {import('../types/itinerary').Itinerary}
 */
function tokyoItinerary() {
  return {
    destination: 'Tokyo, Japan',
    totalBudget: 1500,
    days: [
      {
        date: 'Day 1 — Shibuya & Shinjuku',
        weather: 'Sunny, 24°C',
        activities: [
          { time: '09:00', location: 'Meiji Shrine', type: 'sightseeing', cost: 0, walkingTime: '~15 min' },
          { time: '11:00', location: 'Takeshita Street (Harajuku)', type: 'food', cost: 20, walkingTime: '~5 min' },
          { time: '13:00', location: 'Shibuya Crossing & Hachiko Statue', type: 'sightseeing', cost: 0, walkingTime: '~10 min' },
          { time: '15:00', location: 'Shibuya Sky Observation Deck', type: 'sightseeing', cost: 18, walkingTime: '~8 min' },
          { time: '19:00', location: 'Omoide Yokocho (Piss Alley)', type: 'food', cost: 35, walkingTime: '~12 min' },
        ],
      },
      {
        date: 'Day 2 — Tsukiji & Akihabara',
        weather: 'Partly cloudy, 22°C',
        activities: [
          { time: '07:00', location: 'Tsukiji Outer Market', type: 'food', cost: 25, walkingTime: '~10 min' },
          { time: '10:00', location: 'Senso-ji Temple (Asakusa)', type: 'sightseeing', cost: 0, walkingTime: '~20 min' },
          { time: '13:00', location: 'Akihabara Electric Town', type: 'sightseeing', cost: 0, walkingTime: '~15 min' },
          { time: '15:30', location: 'Tokyo Skytree', type: 'sightseeing', cost: 20, walkingTime: '~10 min' },
          { time: '18:00', location: 'Ramen Street (Tokyo Station)', type: 'food', cost: 15, walkingTime: '~5 min' },
        ],
      },
      {
        date: 'Day 3 — Culture & Departure',
        weather: 'Sunny, 26°C',
        activities: [
          { time: '09:00', location: 'Ueno Park & Museums', type: 'sightseeing', cost: 0, walkingTime: '~25 min' },
          { time: '12:00', location: 'Nakamise Shopping Street', type: 'food', cost: 15, walkingTime: '~10 min' },
          { time: '14:00', location: 'Narita Express to Airport', type: 'transport', cost: 35, walkingTime: '~5 min' },
        ],
      },
    ],
  };
}

/**
 * @returns {import('../types/itinerary').Itinerary}
 */
function parisItinerary() {
  return {
    destination: 'Paris, France',
    totalBudget: 1200,
    days: [
      {
        date: 'Day 1 — Iconic Landmarks',
        weather: 'Sunny, 21°C',
        activities: [
          { time: '09:00', location: 'Eiffel Tower (Champ de Mars)', type: 'sightseeing', cost: 25, walkingTime: '~10 min' },
          { time: '11:30', location: 'Croissant & Café at Rue Cler', type: 'food', cost: 12, walkingTime: '~5 min' },
          { time: '13:00', location: 'Seine River Cruise', type: 'sightseeing', cost: 15, walkingTime: '~8 min' },
          { time: '15:00', location: 'Arc de Triomphe & Champs-Élysées', type: 'sightseeing', cost: 13, walkingTime: '~15 min' },
          { time: '19:00', location: 'Dinner at Le Comptoir du Relais', type: 'food', cost: 55, walkingTime: '~10 min' },
        ],
      },
      {
        date: 'Day 2 — Art & History',
        weather: 'Partly cloudy, 19°C',
        activities: [
          { time: '09:00', location: 'Louvre Museum', type: 'sightseeing', cost: 17, walkingTime: '~20 min' },
          { time: '12:30', location: 'Lunch in Le Marais', type: 'food', cost: 20, walkingTime: '~10 min' },
          { time: '14:00', location: "Notre-Dame Cathedral & Île de la Cité", type: 'sightseeing', cost: 0, walkingTime: '~12 min' },
          { time: '16:00', location: 'Montmartre & Sacré-Cœur', type: 'sightseeing', cost: 0, walkingTime: '~25 min' },
          { time: '20:00', location: 'Moulin Rouge Area Night Walk', type: 'sightseeing', cost: 0, walkingTime: '~15 min' },
        ],
      },
      {
        date: 'Day 3 — Local Life & Departure',
        weather: 'Sunny, 23°C',
        activities: [
          { time: '09:00', location: 'Jardin du Luxembourg', type: 'sightseeing', cost: 0, walkingTime: '~20 min' },
          { time: '11:00', location: "Falafel at L'As du Fallafel", type: 'food', cost: 12, walkingTime: '~5 min' },
          { time: '13:00', location: 'Shopping at Saint-Germain', type: 'sightseeing', cost: 0, walkingTime: '~15 min' },
          { time: '15:30', location: 'RER B to CDG Airport', type: 'transport', cost: 12, walkingTime: '~5 min' },
        ],
      },
    ],
  };
}

const fallbackItinerary = {
  destination: 'Unknown Destination',
  totalBudget: 0,
  days: [],
};

/**
 * Simulates an AI agent that processes travel requests.
 * Matches keywords to return predefined itineraries.
 *
 * @param {string} userInput
 * @returns {Promise<import('../types/itinerary').AgentResponse>}
 */
export async function processUserInput(userInput) {
  const lower = userInput.toLowerCase();

  // Simulate network/thinking delay
  await new Promise((r) => setTimeout(r, 1500));

  if (lower.includes('tokyo')) {
    return {
      text: "Great choice! Here's your 3-day Tokyo adventure. You'll explore Shibuya's neon streets, taste fresh sushi at Tsukiji, and soak in the culture at Meiji Shrine. 🇯🇵",
      itinerary: tokyoItinerary(),
      thoughts: [
        'Analyzing budget constraints... Destination cost index suggests Tokyo requires ~$500/day for mid-range travel.',
        'Checking geographic proximity between attractions: Shibuya → Harajuku is ~800m — walkable. Tsukiji → Akihabara via Hibiya line, 15 min transit.',
        'Optimizing dining options based on 4.5+ star ratings on Google Maps and avoiding peak hours at Tsukiji (best before 8 AM).',
        'Factoring in jet lag recovery: scheduled lighter activities for Day 1 morning, cultural immersion for peak energy on Day 2.',
      ],
    };
  }

  if (lower.includes('paris')) {
    return {
      text: "Magnifique! Here's a 3-day Paris itinerary — from the Eiffel Tower at sunrise to hidden bistros in Le Marais. Bon voyage! 🥐",
      itinerary: parisItinerary(),
      thoughts: [
        'Analyzing budget constraints... Paris mid-range averages €150/day. Allocated $1,200 total with buffer for Seine cruise.',
        'Checking geographic proximity: Eiffel Tower → Rue Cler is 400m. Louvre → Notre-Dame is 1.2km along the Seine — walkable with photo stops.',
        'Cross-referencing Michelin Bib Gourmand and open-table availability: Le Comptoir du Relais books 3 weeks ahead — verifying simulated availability.',
        'Balancing free vs. paid attractions: Moulin Rouge walk, Jardin du Luxembourg, and Notre-Dame exterior are zero-cost, keeping budget healthy.',
      ],
    };
  }

  return {
    text: "I specialize in Tokyo and Paris trips right now! Try saying **Tokyo** or **Paris** and I'll build a full itinerary for you. 🌍",
    itinerary: fallbackItinerary,
    thoughts: [],
  };
}

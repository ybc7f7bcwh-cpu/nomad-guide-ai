// ─── Helpers ───────────────────────────────────────────────────────────────

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pickN(arr, n) {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
}

// ─── City Activity Pools ───────────────────────────────────────────────────

const cities = {
  tokyo: {
    destination: 'Tokyo, Japan',
    totalBudget: 1500,
    thoughtBase: [
      'Analyzing budget constraints… Tokyo mid-range averages ~$500/day including accommodation.',
      'Checking geographic proximity of attractions via JR Yamanote line connections.',
      'Optimizing dining from 4.5★ rated options while avoiding peak-hour waits.',
      'Balancing paid attractions with free cultural experiences.',
    ],
    days: [
      {
        title: 'Shibuya & Shinjuku',
        weather: ['Sunny, 24°C', 'Clear, 26°C', 'Mild breeze, 23°C'],
        slots: [
          { time: '09:00', pool: [
            { location: 'Meiji Shrine', type: 'sightseeing', cost: 0, walkingTime: '~15 min' },
            { location: 'Shinjuku Gyoen Garden', type: 'sightseeing', cost: 5, walkingTime: '~10 min' },
          ]},
          { time: '11:00', pool: [
            { location: 'Takeshita Street (Harajuku)', type: 'food', cost: 20, walkingTime: '~5 min' },
            { location: 'Omotesando Coffee & Crepe', type: 'food', cost: 15, walkingTime: '~8 min' },
            { location: 'Harajuku Gyoza King', type: 'food', cost: 12, walkingTime: '~4 min' },
          ]},
          { time: '13:00', pool: [
            { location: 'Shibuya Crossing & Hachiko Statue', type: 'sightseeing', cost: 0, walkingTime: '~10 min' },
            { location: 'Yoyogi Park Stroll', type: 'sightseeing', cost: 0, walkingTime: '~20 min' },
          ]},
          { time: '15:00', pool: [
            { location: 'Shibuya Sky Observation Deck', type: 'sightseeing', cost: 18, walkingTime: '~8 min' },
            { location: 'MoMA Design Store Shibuya', type: 'sightseeing', cost: 0, walkingTime: '~5 min' },
            { location: 'NHK Studio Park', type: 'sightseeing', cost: 15, walkingTime: '~10 min' },
          ]},
          { time: '19:00', pool: [
            { location: 'Omoide Yokocho (Piss Alley)', type: 'food', cost: 35, walkingTime: '~12 min' },
            { location: 'Ishikawa Sushi Bar', type: 'food', cost: 50, walkingTime: '~8 min' },
            { location: 'Ramen Nagi Shinjuku', type: 'food', cost: 18, walkingTime: '~5 min' },
          ]},
        ],
      },
      {
        title: 'Tsukiji & Akihabara',
        weather: ['Partly cloudy, 22°C', 'Sunny, 25°C', 'Light rain, 20°C'],
        slots: [
          { time: '07:00', pool: [
            { location: 'Tsukiji Outer Market', type: 'food', cost: 25, walkingTime: '~10 min' },
            { location: 'Tsukiji Sushi Dai', type: 'food', cost: 40, walkingTime: '~5 min' },
          ]},
          { time: '10:00', pool: [
            { location: 'Senso-ji Temple (Asakusa)', type: 'sightseeing', cost: 0, walkingTime: '~20 min' },
            { location: 'Imperial Palace East Gardens', type: 'sightseeing', cost: 0, walkingTime: '~15 min' },
          ]},
          { time: '13:00', pool: [
            { location: 'Akihabara Electric Town', type: 'sightseeing', cost: 0, walkingTime: '~15 min' },
            { location: 'Kappabashi Kitchen Street', type: 'sightseeing', cost: 0, walkingTime: '~10 min' },
          ]},
          { time: '15:30', pool: [
            { location: 'Tokyo Skytree', type: 'sightseeing', cost: 20, walkingTime: '~10 min' },
            { location: 'teamLab Planets Tokyo', type: 'sightseeing', cost: 25, walkingTime: '~8 min' },
          ]},
          { time: '18:00', pool: [
            { location: 'Ramen Street (Tokyo Station)', type: 'food', cost: 15, walkingTime: '~5 min' },
            { location: 'Ueno Yatai Food Stalls', type: 'food', cost: 22, walkingTime: '~10 min' },
          ]},
        ],
      },
      {
        title: 'Culture & Departure',
        weather: ['Sunny, 26°C', 'Cloudy, 21°C', 'Clear, 27°C'],
        slots: [
          { time: '09:00', pool: [
            { location: 'Ueno Park & Museums', type: 'sightseeing', cost: 0, walkingTime: '~25 min' },
            { location: 'Rikugien Garden', type: 'sightseeing', cost: 9, walkingTime: '~20 min' },
          ]},
          { time: '12:00', pool: [
            { location: 'Nakamise Shopping Street', type: 'food', cost: 15, walkingTime: '~10 min' },
            { location: 'Ginza Sushi Lunch', type: 'food', cost: 30, walkingTime: '~12 min' },
          ]},
          { time: '14:00', pool: [
            { location: 'Narita Express to Airport', type: 'transport', cost: 35, walkingTime: '~5 min' },
            { location: 'Keisei Skyliner to Narita', type: 'transport', cost: 28, walkingTime: '~5 min' },
          ]},
        ],
      },
    ],
  },

  paris: {
    destination: 'Paris, France',
    totalBudget: 1200,
    thoughtBase: [
      'Analyzing budget… Paris mid-range averages €120/day plus attractions.',
      'Checking Seine proximity: most Day 1 landmarks are within 2 km walkable radius.',
      'Cross-referencing Michelin Bib Gourmand and open-table availability.',
      'Balancing free landmarks (Notre-Dame exterior, parks) with paid museums.',
    ],
    days: [
      {
        title: 'Iconic Landmarks',
        weather: ['Sunny, 21°C', 'Clear, 23°C', 'Warm breeze, 24°C'],
        slots: [
          { time: '09:00', pool: [
            { location: 'Eiffel Tower (Champ de Mars)', type: 'sightseeing', cost: 25, walkingTime: '~10 min' },
            { location: 'Trocadéro Gardens Viewpoint', type: 'sightseeing', cost: 0, walkingTime: '~8 min' },
          ]},
          { time: '11:30', pool: [
            { location: 'Croissant & Café at Rue Cler', type: 'food', cost: 12, walkingTime: '~5 min' },
            { location: 'Boulangerie Poilâne Breakfast', type: 'food', cost: 10, walkingTime: '~6 min' },
          ]},
          { time: '13:00', pool: [
            { location: 'Seine River Cruise', type: 'sightseeing', cost: 15, walkingTime: '~8 min' },
            { location: 'Pont Alexandre III Walk', type: 'sightseeing', cost: 0, walkingTime: '~12 min' },
          ]},
          { time: '15:00', pool: [
            { location: 'Arc de Triomphe & Champs-Élysées', type: 'sightseeing', cost: 13, walkingTime: '~15 min' },
            { location: 'Grand Palais Exhibit', type: 'sightseeing', cost: 16, walkingTime: '~8 min' },
          ]},
          { time: '19:00', pool: [
            { location: 'Dinner at Le Comptoir du Relais', type: 'food', cost: 55, walkingTime: '~10 min' },
            { location: 'Bistrot Paul Bert', type: 'food', cost: 45, walkingTime: '~8 min' },
            { location: 'Café de Flore Dinner', type: 'food', cost: 35, walkingTime: '~5 min' },
          ]},
        ],
      },
      {
        title: 'Art & History',
        weather: ['Partly cloudy, 19°C', 'Overcast, 17°C', 'Sunny, 20°C'],
        slots: [
          { time: '09:00', pool: [
            { location: 'Louvre Museum', type: 'sightseeing', cost: 17, walkingTime: '~20 min' },
            { location: 'Musée d\'Orsay', type: 'sightseeing', cost: 16, walkingTime: '~15 min' },
          ]},
          { time: '12:30', pool: [
            { location: 'Lunch in Le Marais', type: 'food', cost: 20, walkingTime: '~10 min' },
            { location: 'Falafel at L\'As du Fallafel', type: 'food', cost: 12, walkingTime: '~5 min' },
          ]},
          { time: '14:00', pool: [
            { location: 'Notre-Dame Cathedral & Île de la Cité', type: 'sightseeing', cost: 0, walkingTime: '~12 min' },
            { location: 'Sainte-Chapelle & Conciergerie', type: 'sightseeing', cost: 12, walkingTime: '~8 min' },
          ]},
          { time: '16:00', pool: [
            { location: 'Montmartre & Sacré-Cœur', type: 'sightseeing', cost: 0, walkingTime: '~25 min' },
            { location: 'Palais Garnier Opera Tour', type: 'sightseeing', cost: 14, walkingTime: '~10 min' },
          ]},
          { time: '20:00', pool: [
            { location: 'Moulin Rouge Area Night Walk', type: 'sightseeing', cost: 0, walkingTime: '~15 min' },
            { location: 'Montmartre Evening Jazz Bar', type: 'food', cost: 30, walkingTime: '~10 min' },
          ]},
        ],
      },
      {
        title: 'Local Life & Departure',
        weather: ['Sunny, 23°C', 'Cloudy, 20°C', 'Clear, 22°C'],
        slots: [
          { time: '09:00', pool: [
            { location: 'Jardin du Luxembourg', type: 'sightseeing', cost: 0, walkingTime: '~20 min' },
            { location: 'Père Lachaise Cemetery', type: 'sightseeing', cost: 0, walkingTime: '~25 min' },
          ]},
          { time: '11:00', pool: [
            { location: 'Falafel at L\'As du Fallafel (Marais)', type: 'food', cost: 12, walkingTime: '~5 min' },
            { location: 'Breton Crêperie Lunch', type: 'food', cost: 18, walkingTime: '~8 min' },
          ]},
          { time: '13:00', pool: [
            { location: 'Shopping at Saint-Germain', type: 'sightseeing', cost: 0, walkingTime: '~15 min' },
            { location: 'Rue Mouffetard Market Walk', type: 'sightseeing', cost: 0, walkingTime: '~20 min' },
          ]},
          { time: '15:30', pool: [
            { location: 'RER B to CDG Airport', type: 'transport', cost: 12, walkingTime: '~5 min' },
            { location: 'Roissybus to Airport', type: 'transport', cost: 15, walkingTime: '~8 min' },
          ]},
        ],
      },
    ],
  },

  newyork: {
    destination: 'New York City, USA',
    totalBudget: 1800,
    thoughtBase: [
      'Evaluating Manhattan walkability — most attractions within 20-min walk or quick subway hop.',
      'Budgeting ~$300/day with high dining and attraction density.',
      'Scheduling around peak museum hours (Met is quieter after 2 PM).',
      'Factoring Broadway availability and Central Park timing for best light.',
    ],
    days: [
      {
        title: 'Manhattan Icons',
        weather: ['Sunny, 28°C', 'Clear, 30°C', 'Humid, 27°C'],
        slots: [
          { time: '08:00', pool: [
            { location: 'Statue of Liberty & Ellis Island', type: 'sightseeing', cost: 24, walkingTime: '~15 min' },
            { location: 'Battery Park Morning Walk', type: 'sightseeing', cost: 0, walkingTime: '~10 min' },
          ]},
          { time: '10:30', pool: [
            { location: 'Wall Street & Charging Bull', type: 'sightseeing', cost: 0, walkingTime: '~8 min' },
            { location: 'The Oculus & WTC Memorial', type: 'sightseeing', cost: 0, walkingTime: '~12 min' },
          ]},
          { time: '12:30', pool: [
            { location: 'Katz\'s Delicatessen', type: 'food', cost: 25, walkingTime: '~5 min' },
            { location: 'Joe\'s Pizza (Greenwich Village)', type: 'food', cost: 15, walkingTime: '~8 min' },
          ]},
          { time: '14:00', pool: [
            { location: 'Brooklyn Bridge Walk', type: 'sightseeing', cost: 0, walkingTime: '~25 min' },
            { location: 'High Line Park', type: 'sightseeing', cost: 0, walkingTime: '~30 min' },
          ]},
          { time: '19:00', pool: [
            { location: 'Times Square & Broadway', type: 'sightseeing', cost: 0, walkingTime: '~10 min' },
            { location: 'Dinner at Carbone', type: 'food', cost: 85, walkingTime: '~8 min' },
            { location: 'Korea Town BBQ', type: 'food', cost: 50, walkingTime: '~5 min' },
          ]},
        ],
      },
      {
        title: 'Museums & Central Park',
        weather: ['Sunny, 26°C', 'Partly cloudy, 24°C', 'Clear, 28°C'],
        slots: [
          { time: '09:00', pool: [
            { location: 'The Metropolitan Museum of Art', type: 'sightseeing', cost: 25, walkingTime: '~15 min' },
            { location: 'American Museum of Natural History', type: 'sightseeing', cost: 23, walkingTime: '~12 min' },
          ]},
          { time: '12:00', pool: [
            { location: 'Central Park Picnic Lunch', type: 'food', cost: 18, walkingTime: '~10 min' },
            { location: 'Le Pain Quotidien (Upper East)', type: 'food', cost: 22, walkingTime: '~5 min' },
          ]},
          { time: '14:00', pool: [
            { location: 'Central Park Rowboat & Bethesda Fountain', type: 'sightseeing', cost: 0, walkingTime: '~20 min' },
            { location: 'Fifth Avenue Window Shopping', type: 'sightseeing', cost: 0, walkingTime: '~15 min' },
          ]},
          { time: '16:00', pool: [
            { location: 'Rockefeller Center Top of the Rock', type: 'sightseeing', cost: 40, walkingTime: '~8 min' },
            { location: 'Empire State Building Observatory', type: 'sightseeing', cost: 44, walkingTime: '~10 min' },
          ]},
          { time: '20:00', pool: [
            { location: 'Dinner in Hell\'s Kitchen', type: 'food', cost: 55, walkingTime: '~12 min' },
            { location: 'Broadway Show Night', type: 'sightseeing', cost: 120, walkingTime: '~5 min' },
          ]},
        ],
      },
      {
        title: 'Brooklyn Vibe & Departure',
        weather: ['Cloudy, 22°C', 'Sunny, 25°C', 'Warm, 27°C'],
        slots: [
          { time: '09:00', pool: [
            { location: 'DUMBO & Brooklyn Bridge Park', type: 'sightseeing', cost: 0, walkingTime: '~20 min' },
            { location: 'Smorgasburg Food Market', type: 'food', cost: 25, walkingTime: '~10 min' },
          ]},
          { time: '11:30', pool: [
            { location: 'Grimaldi\'s Pizza (Brooklyn)', type: 'food', cost: 20, walkingTime: '~5 min' },
            { location: 'Brooklyn Roasting Company', type: 'food', cost: 12, walkingTime: '~4 min' },
          ]},
          { time: '13:00', pool: [
            { location: 'Williamsburg Vintage Shopping', type: 'sightseeing', cost: 0, walkingTime: '~15 min' },
            { location: 'Brooklyn Museum', type: 'sightseeing', cost: 16, walkingTime: '~20 min' },
          ]},
          { time: '15:30', pool: [
            { location: 'JFK AirTrain to Airport', type: 'transport', cost: 11, walkingTime: '~5 min' },
            { location: 'LGA Express Bus', type: 'transport', cost: 12, walkingTime: '~8 min' },
          ]},
        ],
      },
    ],
  },

  london: {
    destination: 'London, UK',
    totalBudget: 1400,
    thoughtBase: [
      'Budgeting £130/day for central London including attractions and Tube fares.',
      'Checking walking proximity between Westminster landmarks.',
      'Prioritizing free museums (British Museum, Natural History) to save budget.',
      'Scheduling around London rush hours (Tube less crowded after 10 AM).',
    ],
    days: [
      {
        title: 'Royal London',
        weather: ['Partly cloudy, 18°C', 'Sunny, 21°C', 'Light drizzle, 16°C'],
        slots: [
          { time: '09:00', pool: [
            { location: 'Buckingham Palace & Changing of the Guard', type: 'sightseeing', cost: 0, walkingTime: '~15 min' },
            { location: 'St James\'s Park Morning', type: 'sightseeing', cost: 0, walkingTime: '~10 min' },
          ]},
          { time: '11:00', pool: [
            { location: 'Big Ben & Houses of Parliament', type: 'sightseeing', cost: 0, walkingTime: '~8 min' },
            { location: 'Westminster Abbey Tour', type: 'sightseeing', cost: 25, walkingTime: '~5 min' },
          ]},
          { time: '12:30', pool: [
            { location: 'Borough Market Food Stalls', type: 'food', cost: 18, walkingTime: '~10 min' },
            { location: 'The Wolseley Afternoon', type: 'food', cost: 35, walkingTime: '~8 min' },
          ]},
          { time: '14:30', pool: [
            { location: 'Tower of London & Crown Jewels', type: 'sightseeing', cost: 30, walkingTime: '~15 min' },
            { location: 'Tower Bridge Exhibition', type: 'sightseeing', cost: 12, walkingTime: '~10 min' },
          ]},
          { time: '19:00', pool: [
            { location: 'Dinner in Covent Garden', type: 'food', cost: 45, walkingTime: '~8 min' },
            { location: 'Traditional Pub Dinner (Westminster)', type: 'food', cost: 28, walkingTime: '~5 min' },
          ]},
        ],
      },
      {
        title: 'Culture & Museums',
        weather: ['Cloudy, 17°C', 'Overcast, 15°C', 'Sunny, 20°C'],
        slots: [
          { time: '09:00', pool: [
            { location: 'The British Museum', type: 'sightseeing', cost: 0, walkingTime: '~15 min' },
            { location: 'Natural History Museum', type: 'sightseeing', cost: 0, walkingTime: '~20 min' },
          ]},
          { time: '12:00', pool: [
            { location: 'Southbank Centre Food Market', type: 'food', cost: 15, walkingTime: '~8 min' },
            { location: 'Dishoom Shoreditch Breakfast', type: 'food', cost: 20, walkingTime: '~5 min' },
          ]},
          { time: '14:00', pool: [
            { location: 'Camden Town & Markets', type: 'sightseeing', cost: 0, walkingTime: '~20 min' },
            { location: 'Notting Hill & Portobello Road', type: 'sightseeing', cost: 0, walkingTime: '~15 min' },
          ]},
          { time: '16:30', pool: [
            { location: 'Hyde Park & Kensington Palace', type: 'sightseeing', cost: 0, walkingTime: '~20 min' },
            { location: 'Sky Garden Viewing Deck', type: 'sightseeing', cost: 0, walkingTime: '~10 min' },
          ]},
          { time: '20:00', pool: [
            { location: 'West End Theatre Show', type: 'sightseeing', cost: 60, walkingTime: '~8 min' },
            { location: 'Soho Ramen Dinner', type: 'food', cost: 22, walkingTime: '~5 min' },
          ]},
        ],
      },
      {
        title: 'Greenwich & Departure',
        weather: ['Partly cloudy, 18°C', 'Sunny, 22°C', 'Light rain, 14°C'],
        slots: [
          { time: '09:00', pool: [
            { location: 'Greenwich Park & Royal Observatory', type: 'sightseeing', cost: 10, walkingTime: '~25 min' },
            { location: 'Cutty Sark & Maritime Museum', type: 'sightseeing', cost: 12, walkingTime: '~15 min' },
          ]},
          { time: '12:30', pool: [
            { location: 'Greenwich Market Lunch', type: 'food', cost: 18, walkingTime: '~5 min' },
            { location: 'The Gipsy Moth Pub', type: 'food', cost: 22, walkingTime: '~8 min' },
          ]},
          { time: '14:30', pool: [
            { location: 'Thames Clipper River Cruise', type: 'sightseeing', cost: 12, walkingTime: '~10 min' },
            { location: 'Canary Wharf Walk', type: 'sightseeing', cost: 0, walkingTime: '~15 min' },
          ]},
          { time: '16:30', pool: [
            { location: 'Heathrow Express to Airport', type: 'transport', cost: 25, walkingTime: '~5 min' },
            { location: 'Gatwick Express', type: 'transport', cost: 20, walkingTime: '~8 min' },
          ]},
        ],
      },
    ],
  },

  rome: {
    destination: 'Rome, Italy',
    totalBudget: 1100,
    thoughtBase: [
      'Budgeting €100/day — Rome offers abundant free ancient ruins and affordable trattorias.',
      'Checking walkability: Colosseum → Roman Forum → Pantheon is a 1.5 km straight line.',
      'Prioritizing early morning Vatican visit to avoid 2+ hour queues.',
      'Scheduling around the afternoon riposo (many shops close 13:00–15:30).',
    ],
    days: [
      {
        title: 'Ancient Rome',
        weather: ['Sunny, 30°C', 'Clear, 32°C', 'Hot, 34°C'],
        slots: [
          { time: '08:30', pool: [
            { location: 'Colosseum & Roman Forum', type: 'sightseeing', cost: 16, walkingTime: '~15 min' },
            { location: 'Palatine Hill Ruins', type: 'sightseeing', cost: 12, walkingTime: '~20 min' },
          ]},
          { time: '11:00', pool: [
            { location: 'Pantheon & Piazza della Rotonda', type: 'sightseeing', cost: 0, walkingTime: '~10 min' },
            { location: 'Largo di Torre Argentina', type: 'sightseeing', cost: 0, walkingTime: '~8 min' },
          ]},
          { time: '12:30', pool: [
            { location: 'Trattoria Da Enzo (Trastevere)', type: 'food', cost: 25, walkingTime: '~10 min' },
            { location: 'Pizza al Taglio near Piazza Navona', type: 'food', cost: 12, walkingTime: '~5 min' },
          ]},
          { time: '15:00', pool: [
            { location: 'Trevi Fountain & Spanish Steps', type: 'sightseeing', cost: 0, walkingTime: '~12 min' },
            { location: 'Villa Borghese Gardens', type: 'sightseeing', cost: 0, walkingTime: '~20 min' },
          ]},
          { time: '19:30', pool: [
            { location: 'Trastevere Evening Walk & Dinner', type: 'food', cost: 35, walkingTime: '~10 min' },
            { location: 'Gelato at Giolitti + Piazza Navona', type: 'food', cost: 8, walkingTime: '~5 min' },
          ]},
        ],
      },
      {
        title: 'Vatican & Art',
        weather: ['Sunny, 29°C', 'Clear, 31°C', 'Cloudy, 27°C'],
        slots: [
          { time: '08:00', pool: [
            { location: 'Vatican Museums & Sistine Chapel', type: 'sightseeing', cost: 17, walkingTime: '~20 min' },
            { location: 'St Peter\'s Basilica', type: 'sightseeing', cost: 0, walkingTime: '~10 min' },
          ]},
          { time: '12:00', pool: [
            { location: 'Pasta Fresca near Vatican', type: 'food', cost: 20, walkingTime: '~5 min' },
            { location: 'Panino & Salad near Borgo', type: 'food', cost: 14, walkingTime: '~8 min' },
          ]},
          { time: '14:00', pool: [
            { location: 'Castel Sant\'Angelo', type: 'sightseeing', cost: 12, walkingTime: '~8 min' },
            { location: 'Piazza Navona & Street Artists', type: 'sightseeing', cost: 0, walkingTime: '~10 min' },
          ]},
          { time: '16:30', pool: [
            { location: 'Borghese Gallery', type: 'sightseeing', cost: 15, walkingTime: '~15 min' },
            { location: 'Campo de\' Fiori Market', type: 'sightseeing', cost: 0, walkingTime: '~10 min' },
          ]},
          { time: '20:00', pool: [
            { location: 'Roman Carbonara at Roscioli', type: 'food', cost: 40, walkingTime: '~8 min' },
            { location: 'Trastevere Live Music Dinner', type: 'food', cost: 35, walkingTime: '~12 min' },
          ]},
        ],
      },
      {
        title: 'Trastevere & Departure',
        weather: ['Sunny, 28°C', 'Partly cloudy, 26°C', 'Clear, 30°C'],
        slots: [
          { time: '09:00', pool: [
            { location: 'Trastevere Morning Walk & Santa Maria', type: 'sightseeing', cost: 0, walkingTime: '~15 min' },
            { location: 'Janiculum Hill Viewpoint', type: 'sightseeing', cost: 0, walkingTime: '~20 min' },
          ]},
          { time: '11:00', pool: [
            { location: 'Jewish Ghetto & Artichokes Lunch', type: 'food', cost: 22, walkingTime: '~8 min' },
            { location: 'Supplì & Aperitivo in Trastevere', type: 'food', cost: 15, walkingTime: '~5 min' },
          ]},
          { time: '13:00', pool: [
            { location: 'Piazza del Popolo & Climbing the Pincio', type: 'sightseeing', cost: 0, walkingTime: '~15 min' },
            { location: 'Via Condotti Luxury Window Shop', type: 'sightseeing', cost: 0, walkingTime: '~10 min' },
          ]},
          { time: '15:00', pool: [
            { location: 'Leonardo Express to FCO', type: 'transport', cost: 14, walkingTime: '~5 min' },
            { location: 'Terravision Shuttle to Ciampino', type: 'transport', cost: 6, walkingTime: '~8 min' },
          ]},
        ],
      },
    ],
  },

  bangkok: {
    destination: 'Bangkok, Thailand',
    totalBudget: 800,
    thoughtBase: [
      'Budgeting ~฿2500/day — Bangkok offers incredible value with street food and affordable transport.',
      'Checking proximity via BTS Skytrain route to minimize tuk-tuk costs.',
      'Prioritizing temple visits early morning before heat peaks and crowds arrive.',
      'Balancing street food meals (cheap, authentic) with one rooftop dinner experience.',
    ],
    days: [
      {
        title: 'Temples & River',
        weather: ['Hot, 34°C', 'Humid, 33°C', 'Partly cloudy, 32°C'],
        slots: [
          { time: '07:00', pool: [
            { location: 'Grand Palace & Wat Phra Kaew', type: 'sightseeing', cost: 15, walkingTime: '~15 min' },
            { location: 'Wat Pho Reclining Buddha', type: 'sightseeing', cost: 5, walkingTime: '~10 min' },
          ]},
          { time: '09:00', pool: [
            { location: 'Wat Arun (Temple of Dawn)', type: 'sightseeing', cost: 3, walkingTime: '~8 min' },
            { location: 'Khlong (Canal) Boat Tour', type: 'sightseeing', cost: 6, walkingTime: '~5 min' },
          ]},
          { time: '12:00', pool: [
            { location: 'Pad Thai at Thip Samai', type: 'food', cost: 5, walkingTime: '~10 min' },
            { location: 'Or Tor Kor Market Lunch', type: 'food', cost: 8, walkingTime: '~8 min' },
          ]},
          { time: '14:00', pool: [
            { location: 'Jim Thompson House Museum', type: 'sightseeing', cost: 8, walkingTime: '~12 min' },
            { location: 'ICONSIAM Riverside Mall', type: 'sightseeing', cost: 0, walkingTime: '~10 min' },
          ]},
          { time: '19:00', pool: [
            { location: 'Khao San Road Night Market', type: 'food', cost: 12, walkingTime: '~8 min' },
            { location: 'Rooftop Dinner at Vertigo', type: 'food', cost: 45, walkingTime: '~5 min' },
          ]},
        ],
      },
      {
        title: 'Chinatown & Markets',
        weather: ['Partly cloudy, 33°C', 'Hot, 35°C', 'Humid, 31°C'],
        slots: [
          { time: '08:00', pool: [
            { location: 'Chatuchak Weekend Market', type: 'sightseeing', cost: 0, walkingTime: '~25 min' },
            { location: 'Siam Square Morning Stroll', type: 'sightseeing', cost: 0, walkingTime: '~15 min' },
          ]},
          { time: '11:00', pool: [
            { location: 'Yaowarat (Chinatown) Food Walk', type: 'food', cost: 10, walkingTime: '~10 min' },
            { location: 'Dim Sum at Shanghai Mansion', type: 'food', cost: 15, walkingTime: '~5 min' },
          ]},
          { time: '13:00', pool: [
            { location: 'Wat Traimit Golden Buddha', type: 'sightseeing', cost: 3, walkingTime: '~8 min' },
            { location: 'Lhong 1919 Heritage Walk', type: 'sightseeing', cost: 0, walkingTime: '~12 min' },
          ]},
          { time: '15:00', pool: [
            { location: 'Erawan Shrine & CentralWorld', type: 'sightseeing', cost: 0, walkingTime: '~10 min' },
            { location: 'Thai Massage (Health Land)', type: 'sightseeing', cost: 15, walkingTime: '~5 min' },
          ]},
          { time: '18:30', pool: [
            { location: 'Sukhumvit Soi 11 Nightlife', type: 'food', cost: 25, walkingTime: '~10 min' },
            { location: 'Asiatique Night Market Dinner', type: 'food', cost: 18, walkingTime: '~12 min' },
          ]},
        ],
      },
      {
        title: 'Ayutthaya Day & Departure',
        weather: ['Sunny, 34°C', 'Hot, 36°C', 'Partly cloudy, 33°C'],
        slots: [
          { time: '07:00', pool: [
            { location: 'Train to Ayutthaya Ancient City', type: 'sightseeing', cost: 12, walkingTime: '~5 min' },
            { location: 'Ayutthaya Historical Park', type: 'sightseeing', cost: 10, walkingTime: '~25 min' },
          ]},
          { time: '12:00', pool: [
            { location: 'Riverfront Lunch in Ayutthaya', type: 'food', cost: 12, walkingTime: '~8 min' },
            { location: 'Boat Noodles at Bang Pa-In', type: 'food', cost: 8, walkingTime: '~10 min' },
          ]},
          { time: '14:30', pool: [
            { location: 'Return to Bangkok via Train', type: 'transport', cost: 6, walkingTime: '~5 min' },
            { location: 'Suvarnabhumi Airport Link', type: 'transport', cost: 4, walkingTime: '~5 min' },
          ]},
        ],
      },
    ],
  },

  dubai: {
    destination: 'Dubai, UAE',
    totalBudget: 2000,
    thoughtBase: [
      'Budgeting AED 700/day — Dubai has free attraction windows (malls, beaches) and splurge options.',
      'Checking geographic clustering: Dubai Mall area has 5+ attractions within walking distance.',
      'Avoiding outdoor activities midday (heat peaks 12–3 PM, scheduling indoor/mall time).',
      'Balancing ultra-modern experiences with a touch of Old Dubai culture.',
    ],
    days: [
      {
        title: 'Modern Dubai',
        weather: ['Sunny, 38°C', 'Clear, 40°C', 'Very hot, 42°C'],
        slots: [
          { time: '09:00', pool: [
            { location: 'Burj Khalifa Observation Deck (At The Top)', type: 'sightseeing', cost: 40, walkingTime: '~10 min' },
            { location: 'Dubai Mall Morning Tour', type: 'sightseeing', cost: 0, walkingTime: '~15 min' },
          ]},
          { time: '11:00', pool: [
            { location: 'Dubai Aquarium & Underwater Zoo', type: 'sightseeing', cost: 30, walkingTime: '~5 min' },
            { location: 'Sky Views Glass Walk', type: 'sightseeing', cost: 25, walkingTime: '~8 min' },
          ]},
          { time: '13:00', pool: [
            { location: 'Lunch at Time Out Market Dubai', type: 'food', cost: 30, walkingTime: '~5 min' },
            { location: 'Café Bateel Dubai Mall', type: 'food', cost: 25, walkingTime: '~8 min' },
          ]},
          { time: '15:30', pool: [
            { location: 'Dubai Fountain Show (Inside Mall)', type: 'sightseeing', cost: 0, walkingTime: '~5 min' },
            { location: 'Souk Al Bahar & Old Dubai Views', type: 'sightseeing', cost: 0, walkingTime: '~10 min' },
          ]},
          { time: '19:00', pool: [
            { location: 'Desert Safari & BBQ Dinner', type: 'food', cost: 85, walkingTime: '~10 min' },
            { location: 'Pierchic Dinner (Al Qasr)', type: 'food', cost: 120, walkingTime: '~8 min' },
          ]},
        ],
      },
      {
        title: 'Beach & Marina',
        weather: ['Sunny, 37°C', 'Clear, 39°C', 'Hot, 41°C'],
        slots: [
          { time: '08:00', pool: [
            { location: 'JBR Beach Morning Swim', type: 'sightseeing', cost: 0, walkingTime: '~10 min' },
            { location: 'The Palm Monorail View', type: 'sightseeing', cost: 15, walkingTime: '~8 min' },
          ]},
          { time: '10:00', pool: [
            { location: 'Atlantis The Palm Aquaventure', type: 'sightseeing', cost: 55, walkingTime: '~12 min' },
            { location: 'Lost Chambers Aquarium', type: 'sightseeing', cost: 25, walkingTime: '~8 min' },
          ]},
          { time: '12:30', pool: [
            { location: 'Brunch at The Beach Canteen', type: 'food', cost: 40, walkingTime: '~5 min' },
            { location: 'Shawarma at Al Ijaza Cafeteria', type: 'food', cost: 12, walkingTime: '~8 min' },
          ]},
          { time: '15:00', pool: [
            { location: 'Marina Walk & Yacht Views', type: 'sightseeing', cost: 0, walkingTime: '~20 min' },
            { location: 'Ain Dubai View (Bluewaters)', type: 'sightseeing', cost: 0, walkingTime: '~10 min' },
          ]},
          { time: '18:30', pool: [
            { location: 'Dhow Cruise Dinner (Marina)', type: 'food', cost: 70, walkingTime: '~8 min' },
            { location: 'Zuma Dubai Dinner', type: 'food', cost: 95, walkingTime: '~10 min' },
          ]},
        ],
      },
      {
        title: 'Old & Gold',
        weather: ['Sunny, 36°C', 'Partly cloudy, 35°C', 'Clear, 38°C'],
        slots: [
          { time: '08:30', pool: [
            { location: 'Al Fahidi Historical District', type: 'sightseeing', cost: 0, walkingTime: '~15 min' },
            { location: 'Dubai Museum & Al Fahidi Fort', type: 'sightseeing', cost: 3, walkingTime: '~8 min' },
          ]},
          { time: '10:00', pool: [
            { location: 'Abra Ride Across Dubai Creek', type: 'sightseeing', cost: 2, walkingTime: '~5 min' },
            { location: 'Spice Souk & Gold Souk', type: 'sightseeing', cost: 0, walkingTime: '~15 min' },
          ]},
          { time: '12:30', pool: [
            { location: 'Arabian Tea House Lunch', type: 'food', cost: 25, walkingTime: '~5 min' },
            { location: 'Al Ustad Special Kebab', type: 'food', cost: 18, walkingTime: '~8 min' },
          ]},
          { time: '15:00', pool: [
            { location: 'DXB Airport Metro Link', type: 'transport', cost: 8, walkingTime: '~5 min' },
            { location: 'Airport Taxi Drop-off', type: 'transport', cost: 20, walkingTime: '~3 min' },
          ]},
        ],
      },
    ],
  },

  sydney: {
    destination: 'Sydney, Australia',
    totalBudget: 1600,
    thoughtBase: [
      'Budgeting AUD 250/day — Sydney\'s harbour attractions are walkable but dining adds up.',
      'Checking ferry schedules for optimal harbour views — Manly ferry is a must.',
      'Prioritizing free coastal walks (Bondi to Coogee) to balance paid attractions.',
      'Planning around sun position for best Opera House photo light.',
    ],
    days: [
      {
        title: 'Harbour Icons',
        weather: ['Sunny, 26°C', 'Clear, 28°C', 'Warm, 27°C'],
        slots: [
          { time: '09:00', pool: [
            { location: 'Sydney Opera House Tour', type: 'sightseeing', cost: 25, walkingTime: '~10 min' },
            { location: 'Mrs Macquarie\'s Chair Viewpoint', type: 'sightseeing', cost: 0, walkingTime: '~15 min' },
          ]},
          { time: '11:00', pool: [
            { location: 'The Rocks Weekend Market', type: 'sightseeing', cost: 0, walkingTime: '~8 min' },
            { location: 'Museum of Contemporary Art', type: 'sightseeing', cost: 0, walkingTime: '~5 min' },
          ]},
          { time: '12:30', pool: [
            { location: 'Fish Market Lunch (Sydney)', type: 'food', cost: 30, walkingTime: '~10 min' },
            { location: 'Quay Gourmet Bar & Grill', type: 'food', cost: 45, walkingTime: '~8 min' },
          ]},
          { time: '14:00', pool: [
            { location: 'Sydney Harbour Bridge Climb', type: 'sightseeing', cost: 168, walkingTime: '~8 min' },
            { location: 'Royal Botanic Garden Walk', type: 'sightseeing', cost: 0, walkingTime: '~20 min' },
          ]},
          { time: '18:00', pool: [
            { location: 'Manly Ferry & Dinner at Manly Wharf', type: 'food', cost: 40, walkingTime: '~12 min' },
            { location: 'Barangaroo House Dinner', type: 'food', cost: 55, walkingTime: '~8 min' },
          ]},
        ],
      },
      {
        title: 'Beaches & Coasts',
        weather: ['Sunny, 25°C', 'Clear, 27°C', 'Partly cloudy, 24°C'],
        slots: [
          { time: '08:00', pool: [
            { location: 'Bondi Beach Morning Surf', type: 'sightseeing', cost: 0, walkingTime: '~10 min' },
            { location: 'Coogee Beach Swim', type: 'sightseeing', cost: 0, walkingTime: '~8 min' },
          ]},
          { time: '10:00', pool: [
            { location: 'Bondi to Coogee Coastal Walk', type: 'sightseeing', cost: 0, walkingTime: '~60 min' },
            { location: 'Bronte Beach Iceberg Pool', type: 'sightseeing', cost: 5, walkingTime: '~5 min' },
          ]},
          { time: '12:30', pool: [
            { location: 'Bondi Trattoria Lunch', type: 'food', cost: 28, walkingTime: '~5 min' },
            { location: 'Icebergs Bar & Grill', type: 'food', cost: 45, walkingTime: '~5 min' },
          ]},
          { time: '14:30', pool: [
            { location: 'Tamarama Beach Sunbath', type: 'sightseeing', cost: 0, walkingTime: '~10 min' },
            { location: 'Surfing Lesson at Bondi', type: 'sightseeing', cost: 50, walkingTime: '~5 min' },
          ]},
          { time: '18:00', pool: [
            { location: 'North Bondi Rooftop Dinner', type: 'food', cost: 50, walkingTime: '~8 min' },
            { location: 'Fisch Bowl Bondi (Sushi)', type: 'food', cost: 30, walkingTime: '~5 min' },
          ]},
        ],
      },
      {
        title: 'Inner City & Departure',
        weather: ['Partly cloudy, 23°C', 'Sunny, 26°C', 'Clear, 24°C'],
        slots: [
          { time: '09:00', pool: [
            { location: 'Darling Harbour & SEA LIFE', type: 'sightseeing', cost: 35, walkingTime: '~10 min' },
            { location: 'Chinese Garden of Friendship', type: 'sightseeing', cost: 7, walkingTime: '~8 min' },
          ]},
          { time: '11:00', pool: [
            { location: 'Newtown & King Street Brunch', type: 'food', cost: 22, walkingTime: '~5 min' },
            { location: 'Paddington Markets & Café', type: 'food', cost: 18, walkingTime: '~10 min' },
          ]},
          { time: '13:00', pool: [
            { location: 'Art Gallery of NSW', type: 'sightseeing', cost: 0, walkingTime: '~12 min' },
            { location: 'The Strand Arcade Shopping', type: 'sightseeing', cost: 0, walkingTime: '~8 min' },
          ]},
          { time: '15:30', pool: [
            { location: 'Airport Link Train to SYD', type: 'transport', cost: 18, walkingTime: '~5 min' },
            { location: 'Airport Shuttle Bus', type: 'transport', cost: 15, walkingTime: '~5 min' },
          ]},
        ],
      },
    ],
  },

  barcelona: {
    destination: 'Barcelona, Spain',
    totalBudget: 1000,
    thoughtBase: [
      'Budgeting €90/day with great free attractions (beaches, Gothic Quarter, markets).',
      'Checking Gaudi sight proximity: Sagrada Família is a 20-min walk from Sant Pau.',
      'Planning around midday siesta for museum visits — indoor is better during peak heat.',
      'Prioritizing La Boqueria for lunch over dinner (stalls close by 4 PM).',
    ],
    days: [
      {
        title: 'Gaudí & Modernisme',
        weather: ['Sunny, 28°C', 'Clear, 30°C', 'Warm, 27°C'],
        slots: [
          { time: '09:00', pool: [
            { location: 'Sagrada Família Basilica', type: 'sightseeing', cost: 26, walkingTime: '~12 min' },
            { location: 'Casa Batlló (Passeig de Gràcia)', type: 'sightseeing', cost: 25, walkingTime: '~10 min' },
          ]},
          { time: '11:30', pool: [
            { location: 'La Boqueria Market Breakfast', type: 'food', cost: 15, walkingTime: '~8 min' },
            { location: 'Churros at Xurreria Laietana', type: 'food', cost: 8, walkingTime: '~5 min' },
          ]},
          { time: '13:00', pool: [
            { location: 'Park Güell', type: 'sightseeing', cost: 10, walkingTime: '~20 min' },
            { location: 'Hospital de Sant Pau', type: 'sightseeing', cost: 14, walkingTime: '~15 min' },
          ]},
          { time: '15:30', pool: [
            { location: 'Gothic Quarter & Barcelona Cathedral', type: 'sightseeing', cost: 0, walkingTime: '~15 min' },
            { location: 'El Born District Walk', type: 'sightseeing', cost: 0, walkingTime: '~12 min' },
          ]},
          { time: '19:00', pool: [
            { location: 'Tapas at La Pepita', type: 'food', cost: 30, walkingTime: '~8 min' },
            { location: 'Paella at Can Majó (Barceloneta)', type: 'food', cost: 35, walkingTime: '~10 min' },
          ]},
        ],
      },
      {
        title: 'Beach & Montjuïc',
        weather: ['Sunny, 29°C', 'Clear, 31°C', 'Partly cloudy, 26°C'],
        slots: [
          { time: '09:00', pool: [
            { location: 'Barceloneta Beach', type: 'sightseeing', cost: 0, walkingTime: '~10 min' },
            { location: 'La Barceloneta Promenade', type: 'sightseeing', cost: 0, walkingTime: '~15 min' },
          ]},
          { time: '11:00', pool: [
            { location: 'Montjuïc Castle & Gardens', type: 'sightseeing', cost: 5, walkingTime: '~20 min' },
            { location: 'Joan Miró Foundation', type: 'sightseeing', cost: 12, walkingTime: '~10 min' },
          ]},
          { time: '13:00', pool: [
            { location: 'Barceloneta Market Lunch', type: 'food', cost: 20, walkingTime: '~5 min' },
            { location: 'El Xampanyet (Born)', type: 'food', cost: 18, walkingTime: '~8 min' },
          ]},
          { time: '15:00', pool: [
            { location: 'Magic Fountain of Montjuïc', type: 'sightseeing', cost: 0, walkingTime: '~5 min' },
            { location: 'Poble Espanyol Open Air Museum', type: 'sightseeing', cost: 12, walkingTime: '~12 min' },
          ]},
          { time: '20:00', pool: [
            { location: 'Flamenco Show + Dinner', type: 'food', cost: 55, walkingTime: '~8 min' },
            { location: 'Carrer de Blai Pintxos Walk', type: 'food', cost: 20, walkingTime: '~10 min' },
          ]},
        ],
      },
      {
        title: 'Culture & Departure',
        weather: ['Sunny, 27°C', 'Cloudy, 24°C', 'Clear, 29°C'],
        slots: [
          { time: '09:00', pool: [
            { location: 'Picasso Museum (El Born)', type: 'sightseeing', cost: 12, walkingTime: '~10 min' },
            { location: 'Palau de la Música Catalana', type: 'sightseeing', cost: 14, walkingTime: '~8 min' },
          ]},
          { time: '11:30', pool: [
            { location: 'Brunch at Federal Café', type: 'food', cost: 18, walkingTime: '~5 min' },
            { location: 'Vermouth at Bodega La Palma', type: 'food', cost: 10, walkingTime: '~5 min' },
          ]},
          { time: '13:00', pool: [
            { location: 'El Raval Street Art & MACBA', type: 'sightseeing', cost: 0, walkingTime: '~12 min' },
            { location: 'Tibidabo Mountain Views', type: 'sightseeing', cost: 12, walkingTime: '~25 min' },
          ]},
          { time: '16:00', pool: [
            { location: 'Aerobus to BCN Airport', type: 'transport', cost: 8, walkingTime: '~5 min' },
            { location: 'Renfe Train to Airport', type: 'transport', cost: 5, walkingTime: '~5 min' },
          ]},
        ],
      },
    ],
  },

  istanbul: {
    destination: 'Istanbul, Turkey',
    totalBudget: 900,
    thoughtBase: [
      'Budgeting ₺1500/day — Istanbul offers rich history with affordable entry fees and street food.',
      'Checking tram connections between Sultanahmet sites (all within 1 km walk).',
      'Planning Bosphorus ferry timing for golden hour sunset views.',
      'Balancing mosques (free entry) with Topkapi and Grand Bazaar for cultural depth.',
    ],
    days: [
      {
        title: 'Sultanahmet & History',
        weather: ['Sunny, 30°C', 'Clear, 32°C', 'Partly cloudy, 28°C'],
        slots: [
          { time: '08:30', pool: [
            { location: 'Hagia Sophia Mosque', type: 'sightseeing', cost: 10, walkingTime: '~8 min' },
            { location: 'Basilica Cistern', type: 'sightseeing', cost: 12, walkingTime: '~5 min' },
          ]},
          { time: '10:00', pool: [
            { location: 'Blue Mosque (Sultanahmet)', type: 'sightseeing', cost: 0, walkingTime: '~5 min' },
            { location: 'Topkapi Palace & Harem', type: 'sightseeing', cost: 20, walkingTime: '~10 min' },
          ]},
          { time: '12:00', pool: [
            { location: 'Köfte at Sultanahmet Köftecisi', type: 'food', cost: 10, walkingTime: '~5 min' },
            { location: 'Döner & Ayran at Tarihi Dönerci', type: 'food', cost: 8, walkingTime: '~8 min' },
          ]},
          { time: '14:00', pool: [
            { location: 'Grand Bazaar & Spice Market', type: 'sightseeing', cost: 0, walkingTime: '~20 min' },
            { location: 'Süleymaniye Mosque & Views', type: 'sightseeing', cost: 0, walkingTime: '~15 min' },
          ]},
          { time: '19:00', pool: [
            { location: 'Galata Bridge Sunset & Fish Sandwiches', type: 'food', cost: 15, walkingTime: '~8 min' },
            { location: 'Bosphorus Dinner Cruise', type: 'food', cost: 40, walkingTime: '~10 min' },
          ]},
        ],
      },
      {
        title: 'Bosphorus & Beyoğlu',
        weather: ['Partly cloudy, 28°C', 'Sunny, 31°C', 'Clear, 29°C'],
        slots: [
          { time: '09:00', pool: [
            { location: 'Bosphorus Ferry to Anadolu Kavağı', type: 'sightseeing', cost: 10, walkingTime: '~5 min' },
            { location: 'Dolmabahçe Palace', type: 'sightseeing', cost: 15, walkingTime: '~12 min' },
          ]},
          { time: '11:30', pool: [
            { location: 'Kadıköy Breakfast (Çınaraltı)', type: 'food', cost: 12, walkingTime: '~8 min' },
            { location: 'Börek at Güllüoğlu', type: 'food', cost: 8, walkingTime: '~5 min' },
          ]},
          { time: '13:00', pool: [
            { location: 'Kadıköy Market Walk', type: 'sightseeing', cost: 0, walkingTime: '~15 min' },
            { location: 'Moda Seaside Stroll', type: 'sightseeing', cost: 0, walkingTime: '~20 min' },
          ]},
          { time: '15:30', pool: [
            { location: 'Galata Tower & Karaköy', type: 'sightseeing', cost: 8, walkingTime: '~10 min' },
            { location: 'İstiklal Street & Tünel', type: 'sightseeing', cost: 0, walkingTime: '~15 min' },
          ]},
          { time: '19:00', pool: [
            { location: 'Rooftop Dinner in Beyoğlu', type: 'food', cost: 35, walkingTime: '~8 min' },
            { location: 'Lokanta (&) by Refika', type: 'food', cost: 28, walkingTime: '~5 min' },
          ]},
        ],
      },
      {
        title: 'Asian Side & Departure',
        weather: ['Sunny, 29°C', 'Cloudy, 26°C', 'Clear, 30°C'],
        slots: [
          { time: '09:00', pool: [
            { location: 'Üsküdar & Maiden\'s Tower', type: 'sightseeing', cost: 5, walkingTime: '~10 min' },
            { location: 'Çamlıca Hill Viewpoint', type: 'sightseeing', cost: 0, walkingTime: '~15 min' },
          ]},
          { time: '11:00', pool: [
            { location: 'Kanaat Lokantası Üsküdar', type: 'food', cost: 15, walkingTime: '~5 min' },
            { location: 'Çengelköy Çay Bahçesi', type: 'food', cost: 8, walkingTime: '~8 min' },
          ]},
          { time: '13:00', pool: [
            { location: 'Beylerbeyi Palace Visit', type: 'sightseeing', cost: 10, walkingTime: '~12 min' },
            { location: 'Kuzguncuk Vintage Walk', type: 'sightseeing', cost: 0, walkingTime: '~15 min' },
          ]},
          { time: '15:30', pool: [
            { location: 'Havaist Airport Shuttle (IST)', type: 'transport', cost: 12, walkingTime: '~5 min' },
            { location: 'Marmaray + Metro to SAW', type: 'transport', cost: 8, walkingTime: '~8 min' },
          ]},
        ],
      },
    ],
  },
};

// ─── City keyword map ──────────────────────────────────────────────────────

const cityKeywords = [
  { keys: ['tokyo', 'japan'], id: 'tokyo', text: "Great choice! Your 3-day Tokyo adventure is ready — from Shibuya's neon energy to serene Meiji Shrine. 🇯🇵" },
  { keys: ['paris', 'france'], id: 'paris', text: "Magnifique! Here's a 3-day Paris plan — from the Eiffel Tower at dawn to hidden bistros in Le Marais. 🥐" },
  { keys: ['new york', 'nyc', 'new york city', 'manhattan'], id: 'newyork', text: "New York City awaits! Your 3-day itinerary covers Manhattan icons, Brooklyn vibes, and Central Park. 🗽" },
  { keys: ['london', 'uk', 'england', 'britain'], id: 'london', text: "London calling! Your 3-day itinerary blends royal landmarks, world-class museums, and pub culture. 🇬🇧" },
  { keys: ['rome', 'roma', 'italy', 'italian'], id: 'rome', text: "Benvenuto a Roma! Three days of ancient ruins, Vatican masterpieces, and carbonara. 🍝" },
  { keys: ['bangkok', 'thailand', 'thai'], id: 'bangkok', text: "Sawasdee! Your 3-day Bangkok trip features golden temples, sizzling street food, and canal boats. 🛶" },
  { keys: ['dubai', 'uae', 'emirates'], id: 'dubai', text: "Welcome to Dubai! Your 3-day plan mixes futuristic skyscrapers, desert safaris, and gold souks. ☀️" },
  { keys: ['sydney', 'australia', 'oz'], id: 'sydney', text: "G'day! Your Sydney itinerary covers the Opera House, Bondi surf, and harbour ferry rides. 🏄" },
  { keys: ['barcelona', 'spain', 'spanish', 'catalonia'], id: 'barcelona', text: "Bienvenido a Barcelona! Gaudí masterpieces, Mediterranean beaches, and tapas await. 🏖️" },
  { keys: ['istanbul', 'turkey', 'turkish', 'constantinople'], id: 'istanbul', text: "Istanbul emerges — a blend of Ottoman grandeur, Bosphorus breezes, and incredible street food. 🕌" },
];

// ─── Generator ─────────────────────────────────────────────────────────────

function generateItinerary(cityId) {
  const city = cities[cityId];
  const days = city.days.map((day) => {
    const weather = pick(day.weather);
    const activities = day.slots.map((slot) => ({
      time: slot.time,
      ...pick(slot.pool),
    }));
    return { date: day.title, weather, activities };
  });

  return {
    destination: city.destination,
    totalBudget: city.totalBudget,
    days,
  };
}

function pickThoughts(cityId) {
  const city = cities[cityId];
  if (!city) return [];
  // Pick 3 out of 4 thoughts
  return pickN(city.thoughtBase, 3);
}

// ─── Public API ────────────────────────────────────────────────────────────

export async function processUserInput(userInput) {
  const lower = userInput.toLowerCase();
  await new Promise((r) => setTimeout(r, 1500));

  const matched = cityKeywords.find((entry) =>
    entry.keys.some((key) => lower.includes(key))
  );

  if (matched) {
    return {
      text: matched.text,
      itinerary: generateItinerary(matched.id),
      thoughts: pickThoughts(matched.id),
    };
  }

  // Fallback — list available cities
  const cityNames = [
    'Tokyo', 'Paris', 'New York', 'London', 'Rome',
    'Bangkok', 'Dubai', 'Sydney', 'Barcelona', 'Istanbul',
  ];

  return {
    text: `I can plan a trip to any of these cities:\n\n${cityNames.map((c) => `• **${c}**`).join('\n')}\n\nJust mention one in your message! 🌍`,
    itinerary: { destination: 'Unknown', totalBudget: 0, days: [] },
    thoughts: [],
  };
}

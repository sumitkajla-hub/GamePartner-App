'use client';

const GAMES = [
  { id: 'chess', name: 'Chess', icon: '♟️', type: 'Indoor', players: '2 Players' },
  { id: 'carrom', name: 'Carrom', icon: '🎯', type: 'Indoor', players: '2-4 Players' },
  { id: 'cards', name: 'Cards', icon: '🃏', type: 'Indoor', players: '2-6 Players' },
  { id: 'badminton', name: 'Badminton', icon: '🏸', type: 'Outdoor', players: '2-4 Players' },
  { id: 'table-tennis', name: 'Table Tennis', icon: '🏓', type: 'Indoor', players: '2-4 Players' },
  { id: 'cricket', name: 'Cricket', icon: '🏏', type: 'Outdoor', players: '2-22 Players' },
  { id: 'football', name: 'Football', icon: '⚽', type: 'Outdoor', players: '2-22 Players' },
  { id: 'basketball', name: 'Basketball', icon: '🏀', type: 'Outdoor', players: '2-10 Players' },
  { id: 'ludo', name: 'Ludo', icon: '🎲', type: 'Indoor', players: '2-4 Players' },
  { id: 'snooker', name: 'Snooker', icon: '🎱', type: 'Indoor', players: '2 Players' },
];

const LOCATIONS = [
  'Home',
  'Society Clubhouse',
  'Local Ground',
  'Community Center',
  'Sports Complex',
  'Park',
  'Indoor Arena',
];

const SKILL_LEVELS = ['Beginner', 'Intermediate', 'Advanced'];

const AVAILABILITY_OPTIONS = [
  'Monday Morning', 'Monday Evening',
  'Tuesday Morning', 'Tuesday Evening',
  'Wednesday Morning', 'Wednesday Evening',
  'Thursday Morning', 'Thursday Evening',
  'Friday Morning', 'Friday Evening',
  'Saturday Morning', 'Saturday Afternoon', 'Saturday Evening',
  'Sunday Morning', 'Sunday Afternoon', 'Sunday Evening',
  'Weekdays', 'Weekends', 'Any Time',
];

const SAMPLE_USERS = [
  {
    id: 'user-1',
    name: 'Aarav Sharma',
    email: 'aarav@example.com',
    password: 'password123',
    phone: '+91 98765 43210',
    location: 'Sector 62, Noida',
    preferredLocation: 'Society Clubhouse',
    games: ['chess', 'carrom', 'badminton'],
    skillLevel: 'Intermediate',
    availability: ['Saturday Morning', 'Sunday Morning', 'Weekends'],
    bio: 'Passionate chess player and weekend badminton enthusiast. Always up for a friendly game!',
    joinedDate: '2025-12-15',
    matchesPlayed: 47,
    isOnline: true,
    role: 'user',
  },
  {
    id: 'user-2',
    name: 'Priya Patel',
    email: 'priya@example.com',
    password: 'password123',
    phone: '+91 87654 32109',
    location: 'Indirapuram, Ghaziabad',
    preferredLocation: 'Community Center',
    games: ['table-tennis', 'badminton', 'cards'],
    skillLevel: 'Advanced',
    availability: ['Monday Evening', 'Wednesday Evening', 'Friday Evening'],
    bio: 'Table tennis champion at district level. Love meeting new players!',
    joinedDate: '2025-11-20',
    matchesPlayed: 89,
    isOnline: true,
    role: 'user',
  },
  {
    id: 'user-3',
    name: 'Rohan Gupta',
    email: 'rohan@example.com',
    password: 'password123',
    phone: '+91 76543 21098',
    location: 'Dwarka, Delhi',
    preferredLocation: 'Local Ground',
    games: ['cricket', 'football', 'badminton'],
    skillLevel: 'Beginner',
    availability: ['Saturday Afternoon', 'Sunday Afternoon', 'Weekends'],
    bio: 'New to sports, eager to learn and make friends through games.',
    joinedDate: '2026-01-10',
    matchesPlayed: 12,
    isOnline: false,
    role: 'user',
  },
  {
    id: 'user-4',
    name: 'Sneha Reddy',
    email: 'sneha@example.com',
    password: 'password123',
    phone: '+91 65432 10987',
    location: 'Whitefield, Bangalore',
    preferredLocation: 'Indoor Arena',
    games: ['chess', 'ludo', 'carrom', 'cards'],
    skillLevel: 'Advanced',
    availability: ['Any Time'],
    bio: 'Board game enthusiast. I organize weekly game nights in my society.',
    joinedDate: '2025-10-05',
    matchesPlayed: 156,
    isOnline: true,
    role: 'user',
  },
  {
    id: 'user-5',
    name: 'Vikram Singh',
    email: 'vikram@example.com',
    password: 'password123',
    phone: '+91 54321 09876',
    location: 'Baner, Pune',
    preferredLocation: 'Sports Complex',
    games: ['basketball', 'football', 'cricket'],
    skillLevel: 'Intermediate',
    availability: ['Monday Morning', 'Wednesday Morning', 'Friday Morning'],
    bio: 'Morning sports person. Believe in fitness through fun games!',
    joinedDate: '2025-09-22',
    matchesPlayed: 73,
    isOnline: false,
    role: 'user',
  },
  {
    id: 'user-6',
    name: 'Ananya Mishra',
    email: 'ananya@example.com',
    password: 'password123',
    phone: '+91 43210 98765',
    location: 'Salt Lake, Kolkata',
    preferredLocation: 'Home',
    games: ['chess', 'cards', 'ludo', 'carrom'],
    skillLevel: 'Beginner',
    availability: ['Tuesday Evening', 'Thursday Evening', 'Weekdays'],
    bio: 'Looking for casual game partners in my neighborhood. Love indoor games!',
    joinedDate: '2026-02-14',
    matchesPlayed: 8,
    isOnline: true,
    role: 'user',
  },
  {
    id: 'user-7',
    name: 'Karthik Nair',
    email: 'karthik@example.com',
    password: 'password123',
    phone: '+91 32109 87654',
    location: 'Koramangala, Bangalore',
    preferredLocation: 'Society Clubhouse',
    games: ['snooker', 'table-tennis', 'chess'],
    skillLevel: 'Advanced',
    availability: ['Saturday Evening', 'Sunday Evening'],
    bio: 'Snooker and table tennis are my favorites. Come challenge me!',
    joinedDate: '2025-08-30',
    matchesPlayed: 201,
    isOnline: true,
    role: 'user',
  },
  {
    id: 'user-8',
    name: 'Meera Joshi',
    email: 'meera@example.com',
    password: 'password123',
    phone: '+91 21098 76543',
    location: 'Aundh, Pune',
    preferredLocation: 'Park',
    games: ['badminton', 'football'],
    skillLevel: 'Intermediate',
    availability: ['Saturday Morning', 'Sunday Morning'],
    bio: 'Weekend warrior! Love outdoor games. Looking for regular playing partners.',
    joinedDate: '2026-03-01',
    matchesPlayed: 34,
    isOnline: false,
    role: 'user',
  },
  {
    id: 'admin-1',
    name: 'Admin User',
    email: 'admin@gamepartner.com',
    password: 'admin123',
    phone: '+91 10987 65432',
    location: 'Delhi',
    preferredLocation: 'Community Center',
    games: ['chess'],
    skillLevel: 'Advanced',
    availability: ['Any Time'],
    bio: 'Platform administrator',
    joinedDate: '2025-06-01',
    matchesPlayed: 0,
    isOnline: true,
    role: 'admin',
  },
];

const SAMPLE_PLAY_REQUESTS = [
  {
    id: 'req-1',
    fromUserId: 'user-2',
    toUserId: 'user-1',
    gameType: 'badminton',
    message: 'Hey Aarav! Would you like to play badminton this weekend? I know a great court nearby.',
    preferredDate: '2026-06-28',
    preferredTime: '09:00 AM',
    location: 'Society Clubhouse',
    status: 'pending',
    createdAt: '2026-06-25T10:30:00Z',
  },
  {
    id: 'req-2',
    fromUserId: 'user-4',
    toUserId: 'user-1',
    gameType: 'chess',
    message: 'Looking for a challenging chess match. Are you free this Saturday?',
    preferredDate: '2026-06-28',
    preferredTime: '04:00 PM',
    location: 'Home',
    status: 'pending',
    createdAt: '2026-06-24T15:00:00Z',
  },
  {
    id: 'req-3',
    fromUserId: 'user-1',
    toUserId: 'user-7',
    gameType: 'chess',
    message: 'Hi Karthik! I heard you are great at chess. Would love a game!',
    preferredDate: '2026-06-29',
    preferredTime: '06:00 PM',
    location: 'Society Clubhouse',
    status: 'accepted',
    createdAt: '2026-06-23T09:00:00Z',
  },
  {
    id: 'req-4',
    fromUserId: 'user-3',
    toUserId: 'user-5',
    gameType: 'cricket',
    message: 'Want to practice cricket this Sunday? Bringing a few friends too!',
    preferredDate: '2026-06-29',
    preferredTime: '07:00 AM',
    location: 'Local Ground',
    status: 'accepted',
    createdAt: '2026-06-22T11:00:00Z',
  },
  {
    id: 'req-5',
    fromUserId: 'user-6',
    toUserId: 'user-4',
    gameType: 'carrom',
    message: 'Hi Sneha! Can we play carrom together sometime this week?',
    preferredDate: '2026-06-27',
    preferredTime: '07:00 PM',
    location: 'Home',
    status: 'declined',
    createdAt: '2026-06-21T14:30:00Z',
  },
];

const SAMPLE_COMMUNITIES = [
  {
    id: 'comm-1',
    name: 'DLF Phase 5 Sports Club',
    description: 'A vibrant community for sports enthusiasts in DLF Phase 5. We organize weekly games and tournaments.',
    location: 'DLF Phase 5, Gurgaon',
    games: ['badminton', 'cricket', 'football', 'table-tennis'],
    members: ['user-1', 'user-2', 'user-3', 'user-5'],
    createdBy: 'user-1',
    createdAt: '2025-11-01',
    isActive: true,
    upcomingEvents: 3,
  },
  {
    id: 'comm-2',
    name: 'Board Game Buddies',
    description: 'Love board games? Join us for weekly game nights featuring chess, carrom, ludo, and more!',
    location: 'Salt Lake, Kolkata',
    games: ['chess', 'carrom', 'ludo', 'cards'],
    members: ['user-4', 'user-6', 'user-7'],
    createdBy: 'user-4',
    createdAt: '2025-10-15',
    isActive: true,
    upcomingEvents: 2,
  },
  {
    id: 'comm-3',
    name: 'Weekend Warriors Pune',
    description: 'For people who live for weekend sports! Cricket, football, basketball - we play it all.',
    location: 'Baner, Pune',
    games: ['cricket', 'football', 'basketball', 'badminton'],
    members: ['user-5', 'user-8'],
    createdBy: 'user-5',
    createdAt: '2025-12-01',
    isActive: true,
    upcomingEvents: 1,
  },
  {
    id: 'comm-4',
    name: 'Bangalore TT League',
    description: 'Table tennis enthusiasts unite! Weekly practice sessions and friendly matches.',
    location: 'Koramangala, Bangalore',
    games: ['table-tennis', 'snooker'],
    members: ['user-2', 'user-7'],
    createdBy: 'user-7',
    createdAt: '2026-01-20',
    isActive: true,
    upcomingEvents: 4,
  },
];

// Storage helpers
function getFromStorage(key, defaultValue) {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const stored = localStorage.getItem(`gp_${key}`);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function setToStorage(key, value) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(`gp_${key}`, JSON.stringify(value));
  } catch (e) {
    console.error('Storage error:', e);
  }
}

// Initialize data if not present
function initializeData() {
  if (typeof window === 'undefined') return;
  if (!localStorage.getItem('gp_initialized')) {
    setToStorage('users', SAMPLE_USERS);
    setToStorage('playRequests', SAMPLE_PLAY_REQUESTS);
    setToStorage('communities', SAMPLE_COMMUNITIES);
    setToStorage('initialized', true);
  }
}

// ===== USER OPERATIONS =====
export function getUsers() {
  initializeData();
  return getFromStorage('users', SAMPLE_USERS);
}

export function getUserById(id) {
  const users = getUsers();
  return users.find(u => u.id === id) || null;
}

export function updateUser(id, updates) {
  const users = getUsers();
  const idx = users.findIndex(u => u.id === id);
  if (idx !== -1) {
    users[idx] = { ...users[idx], ...updates };
    setToStorage('users', users);
    return users[idx];
  }
  return null;
}

export function deleteUser(id) {
  const users = getUsers().filter(u => u.id !== id);
  setToStorage('users', users);
  return true;
}

export function createUser(userData) {
  const users = getUsers();
  const newUser = {
    id: `user-${Date.now()}`,
    ...userData,
    joinedDate: new Date().toISOString().split('T')[0],
    matchesPlayed: 0,
    isOnline: true,
    role: 'user',
  };
  users.push(newUser);
  setToStorage('users', users);
  return newUser;
}

export function authenticateUser(email, password) {
  const users = getUsers();
  return users.find(u => u.email === email && u.password === password) || null;
}

// ===== SEARCH / MATCHMAKING =====
export function searchPlayers({ game, location, availability, skillLevel, excludeUserId }) {
  let users = getUsers().filter(u => u.role !== 'admin');

  if (excludeUserId) {
    users = users.filter(u => u.id !== excludeUserId);
  }
  if (game) {
    users = users.filter(u => u.games.includes(game));
  }
  if (location) {
    users = users.filter(u =>
      u.location.toLowerCase().includes(location.toLowerCase()) ||
      u.preferredLocation.toLowerCase().includes(location.toLowerCase())
    );
  }
  if (availability) {
    users = users.filter(u =>
      u.availability.some(a => a.toLowerCase().includes(availability.toLowerCase())) ||
      u.availability.includes('Any Time')
    );
  }
  if (skillLevel) {
    users = users.filter(u => u.skillLevel === skillLevel);
  }
  return users;
}

// ===== PLAY REQUESTS =====
export function getPlayRequests(userId) {
  initializeData();
  const requests = getFromStorage('playRequests', SAMPLE_PLAY_REQUESTS);
  return requests.filter(r => r.fromUserId === userId || r.toUserId === userId);
}

export function getAllPlayRequests() {
  initializeData();
  return getFromStorage('playRequests', SAMPLE_PLAY_REQUESTS);
}

export function sendPlayRequest(fromUserId, toUserId, gameType, message, preferredDate, preferredTime, location) {
  const requests = getFromStorage('playRequests', SAMPLE_PLAY_REQUESTS);
  const newRequest = {
    id: `req-${Date.now()}`,
    fromUserId,
    toUserId,
    gameType,
    message,
    preferredDate,
    preferredTime,
    location,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };
  requests.push(newRequest);
  setToStorage('playRequests', requests);
  return newRequest;
}

export function updatePlayRequest(requestId, status) {
  const requests = getFromStorage('playRequests', SAMPLE_PLAY_REQUESTS);
  const idx = requests.findIndex(r => r.id === requestId);
  if (idx !== -1) {
    requests[idx].status = status;
    setToStorage('playRequests', requests);

    // If accepted, increment match count for both users
    if (status === 'accepted') {
      const req = requests[idx];
      const fromUser = getUserById(req.fromUserId);
      const toUser = getUserById(req.toUserId);
      if (fromUser) updateUser(fromUser.id, { matchesPlayed: (fromUser.matchesPlayed || 0) + 1 });
      if (toUser) updateUser(toUser.id, { matchesPlayed: (toUser.matchesPlayed || 0) + 1 });
    }

    return requests[idx];
  }
  return null;
}

// ===== PLAY HISTORY =====
export function getPlayHistory(userId) {
  const requests = getFromStorage('playRequests', SAMPLE_PLAY_REQUESTS);
  return requests.filter(
    r => (r.fromUserId === userId || r.toUserId === userId) && r.status === 'accepted'
  );
}

// ===== COMMUNITIES =====
export function getCommunities() {
  initializeData();
  return getFromStorage('communities', SAMPLE_COMMUNITIES);
}

export function getCommunityById(id) {
  const communities = getCommunities();
  return communities.find(c => c.id === id) || null;
}

export function createCommunity(communityData) {
  const communities = getCommunities();
  const newCommunity = {
    id: `comm-${Date.now()}`,
    ...communityData,
    createdAt: new Date().toISOString().split('T')[0],
    isActive: true,
    upcomingEvents: 0,
    members: [communityData.createdBy],
  };
  communities.push(newCommunity);
  setToStorage('communities', communities);
  return newCommunity;
}

export function joinCommunity(communityId, userId) {
  const communities = getCommunities();
  const idx = communities.findIndex(c => c.id === communityId);
  if (idx !== -1 && !communities[idx].members.includes(userId)) {
    communities[idx].members.push(userId);
    setToStorage('communities', communities);
    return communities[idx];
  }
  return communities[idx] || null;
}

export function leaveCommunity(communityId, userId) {
  const communities = getCommunities();
  const idx = communities.findIndex(c => c.id === communityId);
  if (idx !== -1) {
    communities[idx].members = communities[idx].members.filter(m => m !== userId);
    setToStorage('communities', communities);
    return communities[idx];
  }
  return null;
}

// ===== GAME CATEGORIES =====
export function getGameCategories() {
  return GAMES;
}

export function getGameById(id) {
  return GAMES.find(g => g.id === id) || null;
}

// ===== CONSTANTS EXPORTS =====
export { LOCATIONS, SKILL_LEVELS, AVAILABILITY_OPTIONS, GAMES };

// ===== ADMIN STATS =====
export function getAdminStats() {
  const users = getUsers().filter(u => u.role !== 'admin');
  const requests = getAllPlayRequests();
  const communities = getCommunities();

  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.isOnline).length;
  const totalRequests = requests.length;
  const pendingRequests = requests.filter(r => r.status === 'pending').length;
  const acceptedRequests = requests.filter(r => r.status === 'accepted').length;
  const declinedRequests = requests.filter(r => r.status === 'declined').length;
  const totalCommunities = communities.length;
  const totalGames = GAMES.length;

  const matchRate = totalRequests > 0
    ? Math.round((acceptedRequests / totalRequests) * 100)
    : 0;

  // Game popularity
  const gamePopularity = {};
  users.forEach(u => {
    u.games.forEach(g => {
      gamePopularity[g] = (gamePopularity[g] || 0) + 1;
    });
  });

  // Location distribution
  const locationDist = {};
  users.forEach(u => {
    const loc = u.preferredLocation || 'Unknown';
    locationDist[loc] = (locationDist[loc] || 0) + 1;
  });

  return {
    totalUsers,
    activeUsers,
    totalRequests,
    pendingRequests,
    acceptedRequests,
    declinedRequests,
    totalCommunities,
    totalGames,
    matchRate,
    gamePopularity,
    locationDist,
  };
}

// ===== RESET DATA =====
export function resetData() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('gp_users');
  localStorage.removeItem('gp_playRequests');
  localStorage.removeItem('gp_communities');
  localStorage.removeItem('gp_initialized');
  initializeData();
}

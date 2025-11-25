// Demo credentials
export const DEMO_CREDENTIALS = {
  email: 'admin@venueproximity.com',
  password: 'Admin123!',
  twoFactorCode: '123456'
};

// Mock Bars Data
export const mockBars = [
  {
    id: '1',
    name: 'The Blue Moon Bar',
    location: '123 Main St, New York, NY 10001',
    lat: 40.7489,
    lng: -73.9680,
    todayOpenVotes: 45,
    todayCloseVotes: 12,
    status: 'open' as const,
    totalVotes: 1250
  },
  {
    id: '2',
    name: 'Sunset Lounge',
    location: '456 Park Ave, New York, NY 10022',
    lat: 40.7614,
    lng: -73.9776,
    todayOpenVotes: 8,
    todayCloseVotes: 34,
    status: 'closed' as const,
    totalVotes: 892
  },
  {
    id: '3',
    name: 'The Golden Gate Pub',
    location: '789 Broadway, New York, NY 10003',
    lat: 40.7336,
    lng: -73.9910,
    todayOpenVotes: 67,
    todayCloseVotes: 5,
    status: 'open' as const,
    totalVotes: 2103
  },
  {
    id: '4',
    name: 'Riverside Tavern',
    location: '321 River Rd, Brooklyn, NY 11201',
    lat: 40.7033,
    lng: -73.9903,
    todayOpenVotes: 23,
    todayCloseVotes: 28,
    status: 'closed' as const,
    totalVotes: 567
  },
  {
    id: '5',
    name: 'Downtown Sports Bar',
    location: '654 5th Ave, New York, NY 10019',
    lat: 40.7580,
    lng: -73.9855,
    todayOpenVotes: 89,
    todayCloseVotes: 3,
    status: 'open' as const,
    totalVotes: 3421
  },
];

// Mock Users Data
export const mockUsers = [
  {
    id: '1',
    fullName: 'John Smith',
    username: 'johnsmith',
    email: 'john.smith@email.com',
    active: true,
    lastActiveMinutes: 0,
    totalVotes: 156,
    joinedDate: '2024-01-15'
  },
  {
    id: '2',
    fullName: 'Sarah Johnson',
    username: 'sarahj',
    email: 'sarah.j@email.com',
    active: true,
    lastActiveMinutes: 12,
    totalVotes: 243,
    joinedDate: '2024-02-20'
  },
  {
    id: '3',
    fullName: 'Mike Davis',
    username: 'miked',
    email: 'mike.davis@email.com',
    active: true,
    lastActiveMinutes: 45,
    totalVotes: 87,
    joinedDate: '2024-03-10'
  },
  {
    id: '4',
    fullName: 'Emily Brown',
    username: 'emilybrown',
    email: 'emily.b@email.com',
    active: true,
    lastActiveMinutes: 2,
    totalVotes: 312,
    joinedDate: '2024-01-08'
  },
  {
    id: '5',
    fullName: 'David Wilson',
    username: 'davidw',
    email: 'david.wilson@email.com',
    active: true,
    lastActiveMinutes: 30,
    totalVotes: 198,
    joinedDate: '2024-02-14'
  },
];

// Mock Ads Data
export const mockAds = [
  {
    id: '1',
    title: 'Happy Hour Special',
    description: 'Join us for 50% off all drinks from 5-7 PM',
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b',
    barId: '1',
    barName: 'The Blue Moon Bar',
    startDate: '2024-11-20',
    endDate: '2024-12-20',
    status: 'running' as const,
    impressions: 12450,
    clicks: 876,
    ctr: 7.04
  },
  {
    id: '2',
    title: 'Live Music Night',
    description: 'Local bands every Friday and Saturday',
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3',
    barId: '3',
    barName: 'The Golden Gate Pub',
    startDate: '2024-11-25',
    endDate: '2024-12-25',
    status: 'running' as const,
    impressions: 8930,
    clicks: 623,
    ctr: 6.98
  },
  {
    id: '3',
    title: 'Trivia Night',
    description: 'Test your knowledge every Wednesday at 8 PM',
    image: 'https://images.unsplash.com/photo-1528495612343-9ca9f4a4de28',
    barId: '2',
    barName: 'Sunset Lounge',
    startDate: '2024-12-01',
    endDate: '2024-12-31',
    status: 'stopped' as const,
    impressions: 5620,
    clicks: 287,
    ctr: 5.11
  },
];

// Mock Notifications
export const mockNotifications = [
  {
    id: '1',
    type: 'new_location' as const,
    title: 'New Location Added',
    message: 'John Smith added "The Craft Beer House" to the app',
    timestamp: '5 minutes ago',
    read: false
  },
  {
    id: '2',
    type: 'high_activity' as const,
    title: 'High Voting Activity',
    message: 'Downtown Sports Bar received 50+ votes in the last hour',
    timestamp: '12 minutes ago',
    read: false
  },
  {
    id: '3',
    type: 'new_user' as const,
    title: 'New User Registered',
    message: 'Emma Thompson just joined the platform',
    timestamp: '1 hour ago',
    read: false
  },
  {
    id: '4',
    type: 'ad_performance' as const,
    title: 'Ad Performance Alert',
    message: 'Happy Hour Special ad reached 10,000 impressions',
    timestamp: '2 hours ago',
    read: true
  },
  {
    id: '5',
    type: 'system' as const,
    title: 'System Update',
    message: 'Platform maintenance scheduled for tonight at 2 AM',
    timestamp: '3 hours ago',
    read: true
  },
];

// Mock Recent Locations
export const mockRecentLocations = [
  {
    id: '1',
    barName: 'The Craft Beer House',
    location: '234 West St, New York, NY 10014',
    addedBy: 'John Smith',
    timestamp: '2 hours ago'
  },
  {
    id: '2',
    barName: 'Moonlight Cocktail Bar',
    location: '567 East Ave, Brooklyn, NY 11215',
    addedBy: 'Sarah Johnson',
    timestamp: '5 hours ago'
  },
  {
    id: '3',
    barName: 'The Irish Pub',
    location: '890 Madison Ave, New York, NY 10021',
    addedBy: 'Mike Davis',
    timestamp: '1 day ago'
  },
  {
    id: '4',
    barName: 'Rooftop Lounge',
    location: '432 Lexington Ave, New York, NY 10017',
    addedBy: 'Emily Brown',
    timestamp: '2 days ago'
  },
];

// Mock Recent Activities
export const mockRecentActivities = [
  {
    id: '1',
    userName: 'John Smith',
    action: 'voted open' as const,
    barName: 'The Blue Moon Bar',
    timestamp: '5 minutes ago'
  },
  {
    id: '2',
    userName: 'Sarah Johnson',
    action: 'voted closed' as const,
    barName: 'Sunset Lounge',
    timestamp: '12 minutes ago'
  },
  {
    id: '3',
    userName: 'Mike Davis',
    action: 'voted open' as const,
    barName: 'The Golden Gate Pub',
    timestamp: '30 minutes ago'
  },
  {
    id: '4',
    userName: 'Emily Brown',
    action: 'voted open' as const,
    barName: 'Downtown Sports Bar',
    timestamp: '1 hour ago'
  },
  {
    id: '5',
    userName: 'David Wilson',
    action: 'voted closed' as const,
    barName: 'Riverside Tavern',
    timestamp: '2 hours ago'
  },
];
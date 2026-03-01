// Sanctuary App State Store
// Simple in-memory store for demo purposes — in production, this would connect to a database

export interface User {
  id: string
  name: string
  email: string
  phone: string
  department: string
  avatar?: string
  joinDate: string
  isAdmin: boolean
}

export interface Sermon {
  id: string
  title: string
  pastor: string
  series: string
  date: string
  duration: string
  notes: string
  bookmarked?: boolean
}

export interface Event {
  id: string
  name: string
  date: string
  time: string
  location: string
  description: string
  maxCapacity?: number
  attendees: string[]
}

export interface Devotional {
  id: string
  date: string
  verse: string
  reference: string
  reflection: string
  reactions: { fire: number; heart: number; pray: number; lightbulb: number }
  comments: { id: string; userId: string; userName: string; text: string; time: string }[]
}

export interface Announcement {
  id: string
  title: string
  content: string
  priority: 'urgent' | 'normal' | 'info'
  category: 'events' | 'general' | 'urgent'
  timestamp: string
}

export interface AttendanceRecord {
  date: string
  checkedIn: boolean
}

// Demo data
export const demoUser: User = {
  id: '1',
  name: 'Daniel Okafor',
  email: 'daniel@sanctuary.church',
  phone: '+234 812 345 6789',
  department: 'Media',
  joinDate: '2024-09-15',
  isAdmin: true,
}

export const sermons: Sermon[] = [
  {
    id: '1',
    title: 'The Weight of Grace',
    pastor: 'Pastor Adebayo',
    series: 'The Joseph Series',
    date: '2026-02-22',
    duration: '42:15',
    notes: 'Grace is not a theological abstraction — it is the lived reality of being held by something greater than our failures. In this sermon, we explore how Joseph, despite betrayal and imprisonment, carried a posture of grace that eventually positioned him for divine purpose.\n\nKey Points:\n\n1. Grace does not eliminate difficulty — it transforms our response to it\n2. The pit was not the end of Joseph\'s story, and your current struggle is not yours\n3. Every delay in God\'s timing is a setup for a greater reveal\n\nReflection: Where in your life are you being asked to carry grace you don\'t feel you have?',
  },
  {
    id: '2',
    title: 'Identity Before Assignment',
    pastor: 'Pastor Funmi',
    series: 'Love & Identity',
    date: '2026-02-15',
    duration: '38:30',
    notes: 'Before God gives you an assignment, He establishes your identity. You are not defined by what you do — you are defined by whose you are.',
  },
  {
    id: '3',
    title: 'Built to Last',
    pastor: 'Pastor Adebayo',
    series: 'Faith Foundations',
    date: '2026-02-08',
    duration: '45:00',
    notes: 'Foundations are invisible, but they determine everything. What are you building your life upon?',
  },
  {
    id: '4',
    title: 'The Art of Surrender',
    pastor: 'Pastor Funmi',
    series: 'The Joseph Series',
    date: '2026-02-01',
    duration: '36:45',
    notes: 'Surrender is not weakness — it is the highest form of spiritual strength.',
  },
  {
    id: '5',
    title: 'Beyond the Surface',
    pastor: 'Pastor Chidi',
    series: 'Love & Identity',
    date: '2026-01-25',
    duration: '41:20',
    notes: 'God sees beyond our masks. The question is: can we?',
  },
  {
    id: '6',
    title: 'When God Redirects',
    pastor: 'Pastor Adebayo',
    series: 'Faith Foundations',
    date: '2026-01-18',
    duration: '39:55',
    notes: 'Sometimes a closed door is the kindest thing God can do for you.',
  },
]

export const events: Event[] = [
  {
    id: '1',
    name: 'Youth Night: Unfiltered',
    date: '2026-03-06',
    time: '6:00 PM',
    location: 'Main Hall, Lekki Campus',
    description: 'An evening of raw worship, honest conversations, and community. No filters, no pretense — just us and God.',
    maxCapacity: 200,
    attendees: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
  },
  {
    id: '2',
    name: 'Sunday Service',
    date: '2026-03-01',
    time: '9:00 AM',
    location: 'Sanctuary Auditorium',
    description: 'Our weekly gathering. Come expectant.',
    attendees: ['1', '2', '3'],
  },
  {
    id: '3',
    name: 'Creative Arts Workshop',
    date: '2026-03-14',
    time: '2:00 PM',
    location: 'Media Room',
    description: 'A hands-on workshop for the media, choir, and creative teams. Bring your instruments, laptops, and ideas.',
    maxCapacity: 50,
    attendees: ['1'],
  },
]

export const devotionals: Devotional[] = [
  {
    id: '1',
    date: '2026-03-01',
    verse: '"For I know the plans I have for you," declares the Lord, "plans to prosper you and not to harm you, plans to give you hope and a future."',
    reference: 'Jeremiah 29:11',
    reflection: 'In a world that constantly demands you define yourself by your achievements, your follows, your grades, or your salary — God whispers something radically different. He says: I already know. I already have a plan. And it is good.\n\nThis verse is not a promise that life will be easy. It is a promise that life will be purposeful. Even when the path is unclear, the Planner is not confused.\n\nToday, release the anxiety of not knowing. Trust the One who does.',
    reactions: { fire: 24, heart: 45, pray: 18, lightbulb: 12 },
    comments: [
      { id: '1', userId: '2', userName: 'Amaka N.', text: 'Needed this today. God is intentional about us.', time: '8:30 AM' },
      { id: '2', userId: '3', userName: 'Tunde O.', text: 'This hit different. Releasing my need to control everything.', time: '9:15 AM' },
    ],
  },
  {
    id: '2',
    date: '2026-02-28',
    verse: '"Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go."',
    reference: 'Joshua 1:9',
    reflection: 'Courage is not the absence of fear — it is action in the presence of it. God did not promise Joshua a life without challenges. He promised presence. And presence changes everything.',
    reactions: { fire: 31, heart: 52, pray: 22, lightbulb: 8 },
    comments: [],
  },
]

export const announcements: Announcement[] = [
  {
    id: '1',
    title: 'Venue Change: Youth Night moved to Main Hall',
    content: 'Due to the overwhelming response, Youth Night: Unfiltered has been moved from the Media Room to the Main Hall at Lekki Campus. Same time, bigger space, same energy. See you there.',
    priority: 'urgent',
    category: 'events',
    timestamp: '2026-02-28T14:00:00',
  },
  {
    id: '2',
    title: 'New Sermon Series Starting March 8th',
    content: 'Pastor Adebayo begins a powerful new series called "The Wilderness" — exploring what God does in the in-between seasons of life. You don\'t want to miss this.',
    priority: 'normal',
    category: 'general',
    timestamp: '2026-02-27T10:00:00',
  },
  {
    id: '3',
    title: 'Choir Auditions Open',
    content: 'Think you\'ve got the voice? The Sanctuary Choir is looking for new members. Auditions hold on Saturday, March 15th at 10 AM in the Music Room. All voice types welcome.',
    priority: 'normal',
    category: 'general',
    timestamp: '2026-02-26T09:00:00',
  },
  {
    id: '4',
    title: 'Midweek Prayer — Every Wednesday at 7 PM',
    content: 'A reminder that our midweek prayer sessions are ongoing. This is a space to pause, breathe, and reconnect. Virtual option available on Zoom.',
    priority: 'info',
    category: 'general',
    timestamp: '2026-02-25T08:00:00',
  },
]

export const attendanceHistory: AttendanceRecord[] = [
  { date: '2026-03-01', checkedIn: true },
  { date: '2026-02-22', checkedIn: true },
  { date: '2026-02-15', checkedIn: true },
  { date: '2026-02-08', checkedIn: true },
  { date: '2026-02-01', checkedIn: true },
  { date: '2026-01-25', checkedIn: false },
  { date: '2026-01-18', checkedIn: true },
  { date: '2026-01-11', checkedIn: true },
  { date: '2026-01-04', checkedIn: false },
  { date: '2025-12-28', checkedIn: true },
  { date: '2025-12-21', checkedIn: true },
  { date: '2025-12-14', checkedIn: true },
]

export const allSeries = ['The Joseph Series', 'Faith Foundations', 'Love & Identity']
export const departments = ['General', 'Choir', 'Ushers', 'Media', 'Prayers']

export const members: User[] = [
  { id: '1', name: 'Daniel Okafor', email: 'daniel@sanctuary.church', phone: '+234 812 345 6789', department: 'Media', joinDate: '2024-09-15', isAdmin: true },
  { id: '2', name: 'Amaka Nwosu', email: 'amaka@sanctuary.church', phone: '+234 803 456 7890', department: 'Choir', joinDate: '2024-10-01', isAdmin: false },
  { id: '3', name: 'Tunde Ogunlade', email: 'tunde@sanctuary.church', phone: '+234 815 678 9012', department: 'Ushers', joinDate: '2024-08-20', isAdmin: false },
  { id: '4', name: 'Chidinma Eze', email: 'chidinma@sanctuary.church', phone: '+234 907 890 1234', department: 'Prayers', joinDate: '2025-01-05', isAdmin: false },
  { id: '5', name: 'Femi Adeyemi', email: 'femi@sanctuary.church', phone: '+234 816 012 3456', department: 'Media', joinDate: '2025-02-14', isAdmin: false },
  { id: '6', name: 'Zainab Mohammed', email: 'zainab@sanctuary.church', phone: '+234 809 234 5678', department: 'General', joinDate: '2025-03-01', isAdmin: false },
  { id: '7', name: 'Obiora Chukwu', email: 'obiora@sanctuary.church', phone: '+234 818 456 7890', department: 'Choir', joinDate: '2024-11-12', isAdmin: false },
  { id: '8', name: 'Aisha Bello', email: 'aisha@sanctuary.church', phone: '+234 802 678 9012', department: 'Ushers', joinDate: '2025-01-20', isAdmin: false },
]
